import type { Challenge } from "../types/kids";

// 36 challenges — rotated daily based on date
export const CHALLENGES: Challenge[] = [
  // ── Math ──
  { id: "math-1",  title: "Solve 5 Math Puzzles",       description: "Test your arithmetic skills!",           target: 5,  sparksReward: 50,  type: "math" },
  { id: "math-2",  title: "Score 80+ in Math Blaster",   description: "Aim for a high score!",                  target: 80, sparksReward: 60,  type: "math" },
  { id: "math-3",  title: "Complete 3 Rounds of Math",   description: "Play 3 full rounds of Math Blaster.",    target: 3,  sparksReward: 40,  type: "math" },
  { id: "math-4",  title: "Get 10 Correct Answers",      description: "Answer 10 math questions correctly.",     target: 10, sparksReward: 55,  type: "math" },
  { id: "math-5",  title: "Perfect Math Round",           description: "Complete a math round with no mistakes!", target: 1,  sparksReward: 75,  type: "math" },
  { id: "math-6",  title: "Beat Your Math High Score",    description: "Score higher than your personal best.",   target: 1,  sparksReward: 65,  type: "math" },

  // ── Word ──
  { id: "word-1",  title: "Unscramble 5 Words",          description: "Rearrange letters to form words.",        target: 5,  sparksReward: 50,  type: "word" },
  { id: "word-2",  title: "Solve 3 Verse Scrambles",     description: "Put Bible verses in order!",              target: 3,  sparksReward: 55,  type: "word" },
  { id: "word-3",  title: "Fill In 5 Verses",            description: "Complete 5 Bible verses.",                target: 5,  sparksReward: 50,  type: "word" },
  { id: "word-4",  title: "Score 60+ in Word Scramble",  description: "Aim for a high word score!",              target: 60, sparksReward: 60,  type: "word" },
  { id: "word-5",  title: "Master 8 Words",              description: "Unscramble 8 words in one session.",      target: 8,  sparksReward: 70,  type: "word" },
  { id: "word-6",  title: "Speed Round: 3 Quick Words",  description: "Solve 3 words in under a minute each!",  target: 3,  sparksReward: 45,  type: "word" },

  // ── Reading ──
  { id: "read-1",  title: "Answer 5 Bible Trivia",       description: "Test your Bible knowledge!",              target: 5,  sparksReward: 50,  type: "reading" },
  { id: "read-2",  title: "Get 8 Trivia Right",          description: "Answer 8 trivia questions correctly.",    target: 8,  sparksReward: 65,  type: "reading" },
  { id: "read-3",  title: "Perfect Trivia Round",        description: "Get all questions right in one go!",      target: 1,  sparksReward: 80,  type: "reading" },
  { id: "read-4",  title: "Learn 3 Bible Facts",         description: "Discover 3 fun Bible facts!",             target: 3,  sparksReward: 40,  type: "reading" },
  { id: "read-5",  title: "Scripture Scholar",            description: "Complete 2 Fill the Verse rounds.",       target: 2,  sparksReward: 50,  type: "reading" },
  { id: "read-6",  title: "Bible Speedster",              description: "Answer 5 trivia in under 10s each!",     target: 5,  sparksReward: 70,  type: "reading" },

  // ── Art ──
  { id: "art-1",  title: "Match 6 Color Pairs",          description: "Find 6 matching pairs in Color Match.",  target: 6,  sparksReward: 50,  type: "art" },
  { id: "art-2",  title: "Complete Color Match Quickly",  description: "Finish Color Match in under 60s.",       target: 1,  sparksReward: 65,  type: "art" },
  { id: "art-3",  title: "Perfect Memory Game",           description: "Complete Color Match with min flips.",   target: 1,  sparksReward: 80,  type: "art" },
  { id: "art-4",  title: "Play 3 Different Games",        description: "Try 3 different games today!",           target: 3,  sparksReward: 55,  type: "art" },
  { id: "art-5",  title: "Color Champion",                description: "Score 50+ in Color Match.",              target: 50, sparksReward: 60,  type: "art" },
  { id: "art-6",  title: "Explorer Quest",                description: "Play Space Explorer and Dino Run.",      target: 2,  sparksReward: 45,  type: "art" },
];

// Maps challenge types to a game
export const TYPE_TO_GAME: Record<Challenge["type"], { gameId: string; gameName: string }> = {
  math:    { gameId: "math-blaster",    gameName: "Math Blaster" },
  word:    { gameId: "word-scramble",   gameName: "Word Scramble" },
  reading: { gameId: "bible-trivia",    gameName: "Bible Trivia" },
  art:     { gameId: "color-match",     gameName: "Color Match" },
};

export const TYPE_META: Record<Challenge["type"], { label: string; icon: string; color: string }> = {
  math:    { label: "Math",    icon: "calculate",    color: "kids-green" },
  word:    { label: "Words",   icon: "spellcheck",   color: "kids-blue" },
  reading: { label: "Bible",   icon: "menu_book",    color: "kids-orange" },
  art:     { label: "Creative",icon: "palette",       color: "kids-pink" },
};

/**
 * Deterministically pick today's challenge based on the current date.
 * Returns a different challenge each day, cycling through the pool.
 */
export function getTodayChallenge(completedIds: string[]): Challenge {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Pick from challenges the user hasn't completed — if all are done, allow repeats
  const available = CHALLENGES.filter((c) => !completedIds.includes(c.id));
  const pool = available.length > 0 ? available : CHALLENGES;

  return pool[dayOfYear % pool.length];
}

/**
 * How many seconds until midnight (challenge reset).
 */
export function secondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}
