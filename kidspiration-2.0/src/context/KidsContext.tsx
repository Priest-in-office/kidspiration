import { createContext, useState, useEffect, useContext, useCallback, type ReactNode } from "react";

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

const DEFAULT_STATE: KidsState = {
  playerName: "Explorer",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAolA6YUqOaldvT97ekPzBSdYDq58hce-NARSUCdF-vvh0qYrbAM0dlX7m263gW5lRDy-aL-6eb6bmiJ92CT7sQTqztdeadOt2KNghZ95NPJj32v5KVZ8yVYQr66aM6wwHV3zKYM8Ojn97G0casH09DLDKEd41GM6OckqmiNJLOFxm7JaDKFlRt7MVcRYk2TI-lWfLJxAiMHYIcGh3QWzy0WdwfNerlpMlFZvLVL4GR1e10GfOKqsH5yZxFUQyaOAcYj4ydQaQn1oCl",
  sparks: 0,
  streak: 0,
  lastActiveDate: null,
  unlockedRewards: [],
  completedChallenges: [],
  weeklyProgress: {},
  gameScores: {},
}

const STORAGE_KEY = "kidspiration_kids_state";

// - Context type -
export interface KidsContextType extends KidsState {
  addSparks: (n: number) => void;
  spendSparks: (n: number) => boolean; // return false if insufficient
  unlockReward: (reward: string) => void;
  completeChallenge: (challenge: string, sparksReward: number) => void;
  setAvatar: (url: string) => void;
  setPlayerName: (name: string) => void;
  updateDailyProgress: (progress: number) => void;
  recordGameScore: (gameId: string, score: number) => void;
}

const KidsContext = createContext<KidsContextType | null>(null);

// Helpers
const loadState = (): KidsState => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(savedState) };
  } catch (error) {
    console.error("Failed to load state:", error);
    return DEFAULT_STATE;
  }
}

const saveState = (state: KidsState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const todayKey = () => {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
}

const todayDateStr = (): string => {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// Provider
export function KidsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KidsState>(loadState);

  // Persist every change
  useEffect(() => {
    saveState(state)
  }, [state]);

  // Check streak on mount
  useEffect(() => {
    const today = todayDateStr();
    if (!state.lastActiveDate) {
      setState(s => ({ ...s, lastActiveDate: today, streak: 1 }));
      return;
    }

    const last = new Date(state.lastActiveDate);
    const diff = Math.floor((new Date(today).getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diff > 1) {
      setState(s => ({ ...s, lastActiveDate: today, streak: 1 }));
    } else if (diff === 1) {
      // Consecutive day
      setState(s => ({ ...s, lastActiveDate: today, streak: s.streak + 1 }));
    } 
  }, []);

  const addSparks = useCallback((n: number) => {
    setState(s => ({ ...s, sparks: s.sparks + n }));
  }, []);

  const spendSparks = useCallback((n: number): boolean => {
    if (state.sparks < n) return false;
    setState(s => ({ ...s, sparks: s.sparks - n }));
    return true;
  }, [state.sparks]);

  const unlockReward = useCallback((reward: string) => {
    setState(s => ({ ...s, unlockedRewards: s.unlockedRewards.includes(reward) ? s.unlockedRewards : [...s.unlockedRewards, reward] }));
  }, []);

  const completeChallenge = useCallback((challenge: string, sparksReward: number) => {
    setState(s => {
      if (s.completedChallenges.includes(challenge)) return s;
      return {
        ...s,
        sparks: s.sparks + sparksReward,
        completedChallenges: [...s.completedChallenges, challenge]
      }
    })
  }, []);

  const setAvatar = useCallback((url: string) => {
    setState(s => ({ ...s, avatar: url }));
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setState(s => ({ ...s, playerName: name }));
  }, []);

  const updateDailyProgress = useCallback((progress: number) => {
    const day = todayKey();
    setState(s => ({
      ...s, 
      weeklyProgress: { ...s.weeklyProgress, [day]: Math.min(progress, 100) },
    }))
  }, []);

  const recordGameScore = useCallback((gameId: string, score: number) => {
    setState((s) => {
      const best = s.gameScores[gameId] ?? 0;
      if (score <= best) return s;
      return {
        ...s,
        gameScores: { ...s.gameScores, [gameId]: score },
      }
    })
  }, []);

  return (
    <KidsContext.Provider 
      value={{
        ...state,
        addSparks,
        spendSparks,
        unlockReward,
        completeChallenge,
        setAvatar,
        setPlayerName,
        updateDailyProgress,
        recordGameScore,
      }}
    >
      {children}
    </KidsContext.Provider>
  );
}

export const useKids = () => {
  const ctx = useContext(KidsContext);
  if (!ctx) throw new Error("useKids must be used within KidsProvider");
  return ctx;
}