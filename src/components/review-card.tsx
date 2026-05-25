import { formatDistanceToNow } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Quote, ThumbsDown, ThumbsUp } from "lucide-react";
import { ratingTone } from "@/lib/rating";

interface ReviewCardProps {
  id: string;
  body: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean | null;
  courseNameRaw: string | null;
  gradeReceived: string | null;
  semester: string | null;
  tags: string[] | null;
  createdAt: string;
  authorAlias: string | null;
  thumbsUp: number | null;
}

export function ReviewCard({
  body,
  rating,
  difficulty,
  wouldTakeAgain,
  courseNameRaw,
  gradeReceived,
  semester,
  tags,
  createdAt,
  authorAlias,
}: ReviewCardProps) {
  const relativeDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: idLocale,
  });
  const code =
    courseNameRaw
      ?.toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8) || "MK";
  const tone = ratingTone(rating);

  const metaBits = [
    `Difficulty ${difficulty.toFixed(1)}`,
    semester,
    gradeReceived ? `Nilai ${gradeReceived}` : null,
    relativeDate,
  ].filter(Boolean) as string[];

  return (
    <article className="rounded-xl bg-white p-6 lg:p-7 ring-1 ring-stone-200 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex sm:flex-col items-center gap-3 sm:gap-1.5 sm:w-20 shrink-0">
          <div
            className={`grid place-items-center size-20 rounded-xl ${tone.chip}`}
          >
            <span className="text-3xl font-bold tabular-nums leading-none">
              {rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-stone-500">
            Quality
          </span>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm font-bold tracking-wider text-emerald-700">
              {code}
            </span>
            <span className="text-sm text-stone-500">
              {metaBits.join(" · ")}
            </span>
            <span className="ml-auto text-sm font-medium text-stone-600">
              {authorAlias || "Anonim"}
            </span>
          </div>

          {wouldTakeAgain !== null && (
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                wouldTakeAgain
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                  : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
              }`}
            >
              {wouldTakeAgain ? (
                <ThumbsUp className="size-3.5" />
              ) : (
                <ThumbsDown className="size-3.5" />
              )}
              {wouldTakeAgain ? "Mau Diajar Lagi" : "Tidak Mau Lagi"}
            </div>
          )}

          <p className="text-[15px] leading-relaxed text-stone-700">
            <Quote
              className="inline size-4 text-stone-300 mr-1.5 -translate-y-px"
              aria-hidden
            />
            {body}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
