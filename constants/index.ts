import { FoodOption, PlaceOption } from "@/types";

export const NO_ESCAPE_MESSAGES: string[] = [
  "Nice try 😜",
  "Nope 😏",
  "You can't reject me 😂",
  "Try YES ❤️",
  "Catch me if you can 💨",
  "Not happening, cutie 😘",
  "YES is right there 👉",
  "I dodged again 🙈",
  "Still too slow! 🏎️",
  "Almost had me! 🫣",
  "Click YES, it is destiny 😉",
  "My heart, my rules! 💖",
  "Nice try, but nope! 🦊",
  "Error 404: 'No' not found ❌",
  "You're stuck with me! 🥰",
  "Saying no is not allowed 🔒",
  "Give up and click YES! 💕",
];

export const PLACE_OPTIONS: PlaceOption[] = [
  { id: "restaurant", label: "Restaurant", emoji: "🌸", description: "Candlelit & cozy" },
  { id: "coffee", label: "Coffee Shop", emoji: "☕", description: "Warm & casual" },
  { id: "riverside", label: "Riverside", emoji: "🌊", description: "Calm evening walk" },
  { id: "movie", label: "Movie", emoji: "🎬", description: "Popcorn & cuddles" },
  { id: "park", label: "Park", emoji: "🌳", description: "Sunset picnic" },
  { id: "sushi", label: "Sushi Bar", emoji: "🍣", description: "Fancy & fresh" },
  { id: "pizza", label: "Pizzeria", emoji: "🍕", description: "Cheesy & fun" },
  { id: "ramen", label: "Ramen House", emoji: "🍜", description: "Cozy & warm" },
];

export const FOOD_OPTIONS: FoodOption[] = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "burger", label: "Burger", emoji: "🍔" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "icecream", label: "Ice Cream", emoji: "🍦" },
  { id: "steak", label: "Steak", emoji: "🥩" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "cake", label: "Cake", emoji: "🍰" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
];

export const HEART_EMOJIS = ["❤️", "💖", "💗", "💕", "💓", "💞"];

export const SENDER_NAME = "Sajib";
export const RECEIVER_NAME = "Maisha";

export const STEP_ORDER = [
  "task1",
  "longMessage",
  "task2",
  "proposal",
  "date",
  "place",
  "food",
  "time",
  "summary",
  "confirmation",
] as const;

export const STEP_TITLES: Record<string, string> = {
  task1: "Heart Game",
  longMessage: "A Letter For You",
  task2: "Fill My Heart",
  proposal: "A Big Question",
  date: "When are we going? ❤️",
  place: "Where shall we go?",
  food: "What should we eat?",
  time: "What time should we meet?",
  summary: "Let's confirm our date",
};
