import type { Reward } from "../types/kids";

export const REWARDS: Reward[] = [
  // ── Badges ──
  {
    id: "badge-math-whiz",
    name: "Math Whiz",
    icon: "calculate",
    emoji: "🧮",
    cost: 100,
    category: "badge",
    description: "Show everyone you're a numbers genius!",
  },
  {
    id: "badge-word-master",
    name: "Word Master",
    icon: "spellcheck",
    emoji: "📖",
    cost: 100,
    category: "badge",
    description: "You know all the words — officially!",
  },
  {
    id: "badge-artist",
    name: "Artist Badge",
    icon: "palette",
    emoji: "🎨",
    cost: 150,
    category: "badge",
    description: "A badge for creative minds.",
  },
  {
    id: "badge-explorer",
    name: "Space Explorer",
    icon: "rocket_launch",
    emoji: "🚀",
    cost: 200,
    category: "badge",
    description: "You've explored the cosmos!",
  },
  {
    id: "badge-champion",
    name: "Game Champion",
    icon: "emoji_events",
    emoji: "🏆",
    cost: 300,
    category: "badge",
    description: "Only the best gamers earn this trophy.",
  },

  // ── Avatars ──
  {
    id: "avatar-astronaut",
    name: "Astronaut Outfit",
    icon: "person",
    emoji: "👨‍🚀",
    cost: 250,
    category: "avatar",
    description: "Suit up in a spacesuit!",
  },
  {
    id: "avatar-superhero",
    name: "Superhero Cape",
    icon: "shield",
    emoji: "🦸",
    cost: 350,
    category: "avatar",
    description: "Every hero needs a cape.",
  },
  {
    id: "avatar-pirate",
    name: "Pirate Hat",
    icon: "sailing",
    emoji: "🏴‍☠️",
    cost: 200,
    category: "avatar",
    description: "Arrr! Set sail for adventure!",
  },
  {
    id: "avatar-crown",
    name: "Royal Crown",
    icon: "crown",
    emoji: "👑",
    cost: 500,
    category: "avatar",
    description: "Rule the dashboard like royalty.",
  },

  // ── Titles ──
  {
    id: "title-super-learner",
    name: "Super Learner",
    icon: "school",
    emoji: "🎓",
    cost: 150,
    category: "title",
    description: "A title that shows you love learning.",
  },
  {
    id: "title-speed-demon",
    name: "Speed Demon",
    icon: "speed",
    emoji: "⚡",
    cost: 200,
    category: "title",
    description: "Fast answers? This title is for you.",
  },
  {
    id: "title-night-owl",
    name: "Night Owl",
    icon: "dark_mode",
    emoji: "🦉",
    cost: 175,
    category: "title",
    description: "For those who study after dark.",
  },

  // ── Game Skins ──
  {
    id: "skin-cool-skateboard",
    name: "Cool Skateboard",
    icon: "skateboarding",
    emoji: "🛹",
    cost: 600,
    category: "game-skin",
    description: "Ride in style during Dino Run!",
  },
  {
    id: "skin-pet-dragon",
    name: "Pet Dragon",
    icon: "pets",
    emoji: "🐉",
    cost: 1200,
    category: "game-skin",
    description: "A fiery companion for your adventures.",
  },
  {
    id: "skin-rainbow-trail",
    name: "Rainbow Trail",
    icon: "colorize",
    emoji: "🌈",
    cost: 800,
    category: "game-skin",
    description: "Leave a rainbow behind when you run!",
  },
];

// Helpers
export const getRewardById = (id: string) => REWARDS.find((r) => r.id === id);

export const getRewardsByCategory = (category: Reward["category"]) =>
  REWARDS.filter((r) => r.category === category);

export const CATEGORY_META: Record<Reward["category"], { label: string; icon: string; color: string }> = {
  badge: { label: "Badges", icon: "military_tech", color: "kids-green" },
  avatar: { label: "Avatar Items", icon: "face", color: "kids-blue" },
  title: { label: "Titles", icon: "bookmark", color: "kids-pink" },
  "game-skin": { label: "Game Skins", icon: "deployed_code", color: "kids-orange" },
};
