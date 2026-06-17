import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client to prevent startup failure if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing. Please add it in your Secrets / Settings panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoint for AI retrospective theme clustering
app.post('/api/cluster', async (req, res) => {
  try {
    const { boardId, cards } = req.body;
    
    if (!cards || !Array.isArray(cards)) {
      return res.status(400).json({ error: 'Missing or invalid cards array' });
    }

    if (cards.length === 0) {
      return res.json({ themes: [] });
    }

    const ai = getGeminiClient();

    // Prepare text input representing the cards
    const cardsFormatted = cards.map((c, i) => 
      `Card ${i + 1} - Column: ${c.column}, Text: "${c.text}", Emoji: ${c.emoji || 'None'}, Id: ${c.id}`
    ).join('\n');

    const systemInstruction = 
      "You are a helpful and experienced Agile retrospective facilitator. " +
      "Your goal is to organize retrospective cards into 3 to 5 coherent and high-quality themes " +
      "that group ideas together. Duplicate or highly similar cards should be grouped " +
      "together in the same theme and clearly linked in the 'duplicates' array of that theme.";

    const userPrompt = 
      `Here are retrospective feedback cards from a team board. please cluster them into 3 to 5 meaningful themes.
For each theme provide:
1. A unique, short and professional theme name.
2. A confidence score between 0 and 100 on how cohesive the cards in this theme are.
3. The exact subset of original cards that belong to this theme.
4. Top 3 representative 'sampleCards' (exact cards from the cards array) that capture the core of the theme.
5. Identify any exact or highly similar duplicates, and return them grouped into the 'duplicates' array (each array of duplicates contains the similar/exact duplicate card items).
6. A 'recommendedNextStep' — a short action-oriented, professional, and practical recommendation based on these ideas.
7. Return the exact total count of start, stop, and continue cards inside the theme in the 'columnDistribution' object.

Original Cards Data:
${cardsFormatted}

Respond strictly with valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            themes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { 
                    type: Type.STRING,
                    description: 'The name of the theme'
                  },
                  confidence: { 
                    type: Type.INTEGER,
                    description: 'Confidence score from 0 to 100'
                  },
                  columnDistribution: {
                    type: Type.OBJECT,
                    properties: {
                      start: { type: Type.INTEGER },
                      stop: { type: Type.INTEGER },
                      continue: { type: Type.INTEGER }
                    },
                    required: ['start', 'stop', 'continue']
                  },
                  cards: {
                    type: Type.ARRAY,
                    description: 'All the cards that fit in this theme',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        boardId: { type: Type.STRING },
                        text: { type: Type.STRING },
                        emoji: { type: Type.STRING },
                        column: { type: Type.STRING },
                        createdAt: { type: Type.INTEGER }
                      },
                      required: ['id', 'boardId', 'text', 'column', 'createdAt']
                    }
                  },
                  sampleCards: {
                    type: Type.ARRAY,
                    description: 'Top 3 cards capturing the core of this theme',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        boardId: { type: Type.STRING },
                        text: { type: Type.STRING },
                        emoji: { type: Type.STRING },
                        column: { type: Type.STRING },
                        createdAt: { type: Type.INTEGER }
                      },
                      required: ['id', 'boardId', 'text', 'column', 'createdAt']
                    }
                  },
                  duplicates: {
                    type: Type.ARRAY,
                    description: 'List of arrays, with each sub-array containing 2 or more cards that are duplicates of each other',
                    items: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          boardId: { type: Type.STRING },
                          text: { type: Type.STRING },
                          emoji: { type: Type.STRING },
                          column: { type: Type.STRING },
                          createdAt: { type: Type.INTEGER }
                        },
                        required: ['id', 'boardId', 'text', 'column', 'createdAt']
                      }
                    }
                  },
                  recommendedNextStep: { 
                    type: Type.STRING,
                    description: 'Agile recommendation for next steps'
                  }
                },
                required: ['name', 'confidence', 'columnDistribution', 'cards', 'sampleCards', 'duplicates', 'recommendedNextStep']
              }
            }
          },
          required: ['themes']
        }
      }
    });

    const resultText = response.text || '{ "themes": [] }';
    const jsonResult = JSON.parse(resultText);
    
    // Supplement with boardId
    res.json({
      boardId,
      themes: jsonResult.themes || [],
      generatedAt: Date.now()
    });
  } catch (error: any) {
    console.error('Clustering error:', error);
    res.status(500).json({ error: error?.message || 'Failed to cluster retrospective cards' });
  }
});

// Configure Vite middleware / Serve client assets
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
