// Shared type definitions for the Kids section

export interface Reward {
  id: string;
  name: string;
  icon: string;       // Material Symbols icon name
  emoji: string;      // Fallback emoji
  cost: number;
  category: "badge" | "avatar" | "title" | "game-skin";
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  sparksReward: number;
  type: "math" | "word" | "art" | "reading";
}

export interface GameConfig {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  icon: string;
  gradient: string;
}
