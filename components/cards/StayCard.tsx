import type { StayDetails } from "@/lib/types";
import { formatStayDates } from "@/lib/format";
import ImagePlaceholder from "./ImagePlaceholder";

export default function StayCard({ details }: { details: StayDetails }) {
  return (
    <article
      aria-label={`Stay: ${details.listingTitle}`}
      className="overflow-hidden squircle-16 border border-line border-t-4 border-t-rose bg-white"
    >
      <ImagePlaceholder className="h-36 w-full sm:h-44" />
      <div className="space-y-1 p-4">
        <p className="text-2xl font-semibold tracking-tight">
          ${details.nightlyPriceUsd} USD <span className="text-base font-normal text-ink-soft">/ night</span>
        </p>
        <h3 className="text-[15px] font-medium">
          {details.listingTitle} <span className="font-normal text-ink-soft">· {details.destination}</span>
        </h3>
        <p className="text-sm text-ink-soft">{formatStayDates(details.checkIn, details.checkOut)}</p>
        <p className="pt-1 text-sm">{details.description}</p>
      </div>
    </article>
  );
}
