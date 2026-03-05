// import { createContext, useState, useEffect, useContext, useCallback, type ReactNode } from "react";

export interface KidsState {
  playerName: string;
  avatar: string;
  sparks: number;
  streak: number;
  lastActiveDate: string | null;
  unlockedRewards: string[];
  completedChallenges: string[];
  weeklyProgress: Record<string, number>;
  gameScores: Record<string, number>;
}