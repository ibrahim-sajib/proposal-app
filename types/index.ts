export type FlowStep =
  | "task1"
  | "longMessage"
  | "task2"
  | "proposal"
  | "date"
  | "place"
  | "food"
  | "time"
  | "summary"
  | "confirmation";

export interface PlaceOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface FoodOption {
  id: string;
  label: string;
  emoji: string;
}

export interface DateAnswers {
  date: string | null; // ISO date string yyyy-mm-dd
  place: string | null; // place id
  foods: string[]; // food ids
  time: string | null; // HH:mm
}

export interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

export interface SparkleParticle {
  id: number;
  top: number;
  left: number;
  delay: number;
  size: number;
}
