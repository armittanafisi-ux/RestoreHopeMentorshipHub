export type Role = "mentor" | "mentee";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const SLOTS = [
  { key: "morning", label: "Morning", hours: "7 AM – 12 PM" },
  { key: "afternoon", label: "Afternoon", hours: "12 PM – 5 PM" },
  { key: "evening", label: "Evening", hours: "5 PM – 8 PM" },
] as const;

export type Day = (typeof DAYS)[number];
export type SlotKey = (typeof SLOTS)[number]["key"];

// availability[day][slot] === true means "available"
export type Availability = Record<Day, Record<SlotKey, boolean>>;

export interface UserProfile {
  name: string;
  role: Role;
  location: string;
  favoriteColor: string;
  personality: string;
  interest: string;
  goals: string;
  hobbies: string;
  availability: Availability;
}

export const emptyAvailability = (): Availability =>
  Object.fromEntries(
    DAYS.map((d) => [d, { morning: false, afternoon: false, evening: false }])
  ) as Availability;