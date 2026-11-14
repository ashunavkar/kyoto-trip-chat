import type { ExperienceDetails } from "@/lib/types";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ExperienceCard({ details }: { details: ExperienceDetails }) {
  return (
    <article
      aria-label={`Experience: ${details.activityName}`}
      className="flex overflow-hidden rounded-2xl border border-line bg-white"
    >
      <ImagePlaceholder className="w-24 shrink-0 sm:w-32" />
      <div className="min-w-0 space-y-1 p-4">
        <h3 className="text-xl font-semibold leading-snug tracking-tight">{details.activityName}</h3>
        <p className="text-sm text-ink-soft">{details.duration}</p>
        <ul className="space-y-2 pt-2">
          {details.dayPlan.map((item) => (
            <li key={item.day} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 rounded-md bg-teal-tint px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-teal">
                {item.day.split(" ")[0]}
              </span>
              <span>
                <span className="sr-only">{item.day}: </span>
                {item.plan}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
