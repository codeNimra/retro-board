import { Board, Card, ClusterResult } from '../types';
import { getDemoBoard, DEMO_CARDS, DEMO_CLUSTER_RESULT, DEMO_BOARD_ID } from './demo-data';

// Helper to check if localStorage is available (protect SSR/test envs)
const isBrowser = typeof window !== 'undefined';

export function initializeDemoData(): void {
  if (!isBrowser) return;
  
  const initialized = localStorage.getItem('retroboard_example_initialized');
  if (!initialized) {
    // 1. Storage of board list
    const existingBoardsJson = localStorage.getItem('retroboard_boards');
    let boards: Board[] = existingBoardsJson ? JSON.parse(existingBoardsJson) : [];
    
    // Add demo board if not already present
    if (!boards.some(b => b.id === DEMO_BOARD_ID)) {
      boards.push(getDemoBoard());
      localStorage.setItem('retroboard_boards', JSON.stringify(boards));
    }
    
    // 2. Storage of demo cards
    localStorage.setItem(`retroboard_cards_${DEMO_BOARD_ID}`, JSON.stringify(DEMO_CARDS));
    
    // 3. Storage of demo clusters
    localStorage.setItem(`retroboard_clusters_${DEMO_BOARD_ID}`, JSON.stringify(DEMO_CLUSTER_RESULT));
    
    // 4. Mark initialized flag
    localStorage.setItem('retroboard_example_initialized', 'true');
  } else {
    // Refresh demo board's expiration time so that judges always see an active countdown timer
    const existingBoardsJson = localStorage.getItem('retroboard_boards');
    if (existingBoardsJson) {
      try {
        const boards: Board[] = JSON.parse(existingBoardsJson);
        const demoBoardIdx = boards.findIndex(b => b.id === DEMO_BOARD_ID);
        if (demoBoardIdx !== -1) {
          boards[demoBoardIdx].expiresAt = Date.now() + 60 * 60 * 1000; // Extend by 1 hour
          localStorage.setItem('retroboard_boards', JSON.stringify(boards));
        }
      } catch (e) {
        console.error('Error refreshing demo board expiry', e);
      }
    }
  }
}

// Ensure demo data is set up when this module is loaded
if (isBrowser) {
  initializeDemoData();
}

export function getBoards(): Board[] {
  if (!isBrowser) return [];
  const boardsJson = localStorage.getItem('retroboard_boards');
  return boardsJson ? JSON.parse(boardsJson) : [];
}

export function saveBoard(board: Board): void {
  if (!isBrowser) return;
  const boards = getBoards();
  const idx = boards.findIndex(b => b.id === board.id);
  if (idx !== -1) {
    boards[idx] = board;
  } else {
    boards.push(board);
  }
  localStorage.setItem('retroboard_boards', JSON.stringify(boards));
}

export function getBoard(id: string): Board | undefined {
  if (!isBrowser) return undefined;
  
  // Always update countdown/expiresAt if it is the example board and expires in the past or close
  if (id === DEMO_BOARD_ID) {
    initializeDemoData();
  }
  
  const boards = getBoards();
  return boards.find(b => b.id === id);
}

export function getCards(boardId: string): Card[] {
  if (!isBrowser) return [];
  const cardsJson = localStorage.getItem(`retroboard_cards_${boardId}`);
  return cardsJson ? JSON.parse(cardsJson) : [];
}

export function saveCard(boardId: string, card: Card): void {
  if (!isBrowser) return;
  const cards = getCards(boardId);
  const idx = cards.findIndex(c => c.id === card.id);
  if (idx !== -1) {
    cards[idx] = card;
  } else {
    cards.push(card);
  }
  localStorage.setItem(`retroboard_cards_${boardId}`, JSON.stringify(cards));
}

export function saveCards(boardId: string, cards: Card[]): void {
  if (!isBrowser) return;
  localStorage.setItem(`retroboard_cards_${boardId}`, JSON.stringify(cards));
}

export function deleteCard(boardId: string, cardId: string): void {
  if (!isBrowser) return;
  const cards = getCards(boardId);
  const filtered = cards.filter(c => c.id !== cardId);
  localStorage.setItem(`retroboard_cards_${boardId}`, JSON.stringify(filtered));
}

export function getClusterResult(boardId: string): ClusterResult | undefined {
  if (!isBrowser) return undefined;
  const clusterJson = localStorage.getItem(`retroboard_clusters_${boardId}`);
  return clusterJson ? JSON.parse(clusterJson) : undefined;
}

export function saveClusterResult(boardId: string, cluster: ClusterResult): void {
  if (!isBrowser) return;
  localStorage.setItem(`retroboard_clusters_${boardId}`, JSON.stringify(cluster));
}

export function getUserName(): string {
  if (!isBrowser) return '';
  return localStorage.getItem('retroboard_user_name') || '';
}

export function saveUserName(name: string): void {
  if (!isBrowser) return;
  localStorage.setItem('retroboard_user_name', name);
}
