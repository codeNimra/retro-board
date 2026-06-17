import { Board, Card, ClusterResult } from '../types';

export const DEMO_BOARD_ID = 'sprint-42-retro_demo';

export function getDemoBoard(): Board {
  return {
    id: DEMO_BOARD_ID,
    title: 'Product Team — Sprint 42 Retro',
    createdAt: Date.now(),
    // Keep it active 1 hour relative to when it is accessed so judges can play with it
    expiresAt: Date.now() + 60 * 60 * 1000, 
    isExample: true,
  };
}

export const DEMO_CARDS: Card[] = [
  // Start
  {
    id: 's-1',
    boardId: DEMO_BOARD_ID,
    text: 'Run weekly async standups in Loom',
    emoji: '🚀',
    column: 'start',
    createdAt: Date.now() - 120000,
  },
  {
    id: 's-2',
    boardId: DEMO_BOARD_ID,
    text: 'Create a shared decision log in Notion',
    emoji: '💡',
    column: 'start',
    createdAt: Date.now() - 110000,
  },
  {
    id: 's-3',
    boardId: DEMO_BOARD_ID,
    text: 'Start doing proper story point estimation',
    emoji: '🤔',
    column: 'start',
    createdAt: Date.now() - 100000,
  },
  {
    id: 's-4',
    boardId: DEMO_BOARD_ID,
    text: 'Celebrate small wins in team channel',
    emoji: '🎉',
    column: 'start',
    createdAt: Date.now() - 90000,
  },

  // Stop
  {
    id: 'st-1',
    boardId: DEMO_BOARD_ID,
    text: 'Having meetings that could be emails',
    emoji: '❌',
    column: 'stop',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'st-2',
    boardId: DEMO_BOARD_ID,
    text: 'Skipping retros when we\'re busy',
    emoji: '⚠️',
    column: 'stop',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'st-3',
    boardId: DEMO_BOARD_ID,
    text: 'Merging PRs without review',
    emoji: '🐛',
    column: 'stop',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'st-4',
    boardId: DEMO_BOARD_ID,
    text: 'Context switching mid-sprint',
    emoji: '🔥',
    column: 'stop',
    createdAt: Date.now() - 50000,
  },

  // Continue
  {
    id: 'c-1',
    boardId: DEMO_BOARD_ID,
    text: 'Pair programming sessions — really helping',
    emoji: '✅',
    column: 'continue',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'c-2',
    boardId: DEMO_BOARD_ID,
    text: 'Friday demos are great for alignment',
    emoji: '👍',
    column: 'continue',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'c-3',
    boardId: DEMO_BOARD_ID,
    text: 'Open Slack channel for blockers',
    emoji: '💬',
    column: 'continue',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'c-4',
    boardId: DEMO_BOARD_ID,
    text: 'Shipping small, frequent releases',
    emoji: '🚀',
    column: 'continue',
    createdAt: Date.now() - 10000,
  },
];

export const DEMO_CLUSTER_RESULT: ClusterResult = {
  boardId: DEMO_BOARD_ID,
  generatedAt: Date.now(),
  themes: [
    {
      name: 'Process & Communication',
      confidence: 91,
      cards: [
        DEMO_CARDS[0], // Run weekly async standups in Loom
        DEMO_CARDS[1], // Create a shared decision log in Notion
        DEMO_CARDS[4], // Having meetings that could be emails
        DEMO_CARDS[5], // Skipping retros when we're busy
        DEMO_CARDS[10], // Open Slack channel for blockers
      ],
      sampleCards: [
        DEMO_CARDS[0],
        DEMO_CARDS[1],
        DEMO_CARDS[4],
      ],
      duplicates: [
        [
          {
            id: 'st-1-dup',
            boardId: DEMO_BOARD_ID,
            text: 'Too many meetings that should be email messages',
            emoji: '❌',
            column: 'stop',
            createdAt: Date.now() - 75000,
          },
          DEMO_CARDS[4],
        ]
      ],
      columnDistribution: { start: 2, stop: 2, continue: 1 },
      recommendedNextStep: 'Implement async check-ins via Loom for daily status and protect 2 hours of blocks in afternoon for focused work.',
    },
    {
      name: 'Engineering Practices',
      confidence: 78,
      cards: [
        DEMO_CARDS[2], // Start doing proper story point estimation
        DEMO_CARDS[6], // Merging PRs without review
        DEMO_CARDS[8], // Pair programming sessions — really helping
        DEMO_CARDS[11], // Shipping small, frequent releases
      ],
      sampleCards: [
        DEMO_CARDS[8],
        DEMO_CARDS[11],
        DEMO_CARDS[6],
      ],
      duplicates: [],
      columnDistribution: { start: 1, stop: 1, continue: 2 },
      recommendedNextStep: 'Automate PR checks to prevent merging unreviewed code, and schedule a 30-min backlog refinement meeting to agree on story pointing guidelines.',
    },
    {
      name: 'Team Culture & Morale',
      confidence: 65,
      cards: [
        DEMO_CARDS[3], // Celebrate small wins in team channel
        DEMO_CARDS[7], // Context switching mid-sprint
        DEMO_CARDS[9], // Friday demos are great for alignment
      ],
      sampleCards: [
        DEMO_CARDS[3],
        DEMO_CARDS[9],
        DEMO_CARDS[7],
      ],
      duplicates: [],
      columnDistribution: { start: 1, stop: 1, continue: 1 },
      recommendedNextStep: 'Introduce a Slack bot for weekly wins celebration and assign a rotation-based role to shield active developers from interrupts.',
    },
  ],
};
