import type { TripCard } from "@/lib/types";
import StayCard from "./StayCard";
import ExperienceCard from "./ExperienceCard";
import FoodCard from "./FoodCard";

const ORDER = { stay: 0, experience: 1, food: 2 } as const;

export default function CardStack({ cards }: { cards: TripCard[] }) {
  const sorted = [...cards].sort((a, b) => ORDER[a.cardType] - ORDER[b.cardType]);
  return (
    <div className="space-y-3">
      {sorted.map((card, i) => (
        <div key={card.cardType} className="animate-rise" style={{ animationDelay: `${i * 140}ms` }}>
          {card.cardType === "stay" && <StayCard details={card.details} />}
          {card.cardType === "experience" && <ExperienceCard details={card.details} />}
          {card.cardType === "food" && <FoodCard details={card.details} />}
        </div>
      ))}
    </div>
  );
}
