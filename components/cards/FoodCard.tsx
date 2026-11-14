import type { FoodDetails } from "@/lib/types";
import ImagePlaceholder from "./ImagePlaceholder";

export default function FoodCard({ details }: { details: FoodDetails }) {
  return (
    <article
      aria-label={`Food: ${details.restaurantName}`}
      className="flex items-start gap-4 squircle-16 border border-line bg-white p-4"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-xl font-semibold leading-snug tracking-tight">{details.restaurantName}</h3>
        <p className="inline-block rounded-md bg-amber-tint px-1.5 py-0.5 text-xs font-semibold text-amber">
          {details.mealType} · {details.priceRange}
        </p>
        <p className="pt-1 text-sm">{details.description}</p>
      </div>
      <ImagePlaceholder className="size-16 shrink-0 squircle-12 sm:size-20" />
    </article>
  );
}
