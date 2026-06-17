export interface Board {
  id: string;
  title: string;
  createdAt: number;
  expiresAt: number; // timestamp when board becomes read-only
  isExample?: boolean;
}

export interface Card {
  id: string;
  boardId: string;
  text: string;
  emoji?: string;
  column: 'start' | 'stop' | 'continue';
  createdAt: number;
}

export interface Theme {
  name: string;
  confidence: number; // 0–100
  cards: Card[];
  sampleCards: Card[]; // top 3
  duplicates: Card[][];
  columnDistribution: { start: number; stop: number; continue: number };
  recommendedNextStep: string;
}

export interface ClusterResult {
  boardId: string;
  themes: Theme[];
  generatedAt: number;
}
