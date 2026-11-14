// The shape of the assistant's answer, matching the "Mock response shape"
// section of the card spec. `cardType` tells the chat which card to draw.

export type StayDetails = {
  destination: string;
  listingTitle: string;
  checkIn: string; // ISO date, e.g. "2025-04-11"
  checkOut: string;
  nightlyPriceUsd: number;
  description: string;
};

export type ExperienceDetails = {
  activityName: string;
  duration: string;
  dayPlan: { day: string; plan: string }[];
};

export type FoodDetails = {
  restaurantName: string;
  mealType: string;
  priceRange: string;
  description: string;
};

export type TripCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; kind: "text"; text: string }
  | { id: string; role: "assistant"; kind: "thinking" }
  | { id: string; role: "assistant"; kind: "cards"; intro: string; cards: TripCard[] }
  | { id: string; role: "assistant"; kind: "error"; retryText: string };
