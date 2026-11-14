import type { TripCard } from "./types";

// Content comes from "Kyoto Weekend Prototype Content Pack.xlsx".
// Picks: Stays S1, Experiences E1, Food F1.
// Weekend total for two: $366 + $116 + $34 = $516, under the $600 budget.
// Skipped: E3 (sold out), E4 (row is missing its host name, so columns shifted),
// F4 (pushes the weekend to $662, over budget).
export const KYOTO_WEEKEND: TripCard[] = [
  {
    cardType: "stay",
    details: {
      destination: "Kyoto, Japan",
      listingTitle: "Restored machiya townhouse near Gion",
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
      nightlyPriceUsd: 168,
      description: "Private garden and cedar soaking tub. Hosted by Kenji, rated 4.92.",
    },
  },
  {
    cardType: "experience",
    details: {
      activityName: "Tea ceremony in a 100-year-old machiya",
      duration: "2 hours",
      dayPlan: [
        { day: "Sat 12 Apr", plan: "10:30 start. Meet outside Gion-Shijo Station, exit 6." },
        { day: "Sun 13 Apr", plan: "Check out of the townhouse." },
      ],
    },
  },
  {
    cardType: "food",
    details: {
      restaurantName: "Menya Inoichi",
      mealType: "Dinner",
      priceRange: "$",
      description: "Gion ramen, 8 min walk from your stay. No reservations, so arrive before 18:00.",
    },
  },
];

// A deliberately cut-off answer, used by the ?fail=once trigger.
export const BROKEN_RESPONSE = '[{ "cardType": "stay", "details": { "destination": "Kyo';
