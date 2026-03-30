import { RatingBadge } from "./rating-badge";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ThumbsUp, ThumbsDown, BookOpen, Clock, PenTool } from "lucide-react";
import { cn } from "@/lib/utils";

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
  thumbsUp,
}: ReviewCardProps) {
  const relativeDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: id,
  });

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start h-full">
      {/* Metric Scores */}
      <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-32 shrink-0 bg-card/60 p-4 rounded-xl border border-border/50 shadow-inner">
        <div className="text-center group">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Kualitas
          </p>
          <RatingBadge value={rating} size="lg" className="w-full" />
        </div>

        <div className="hidden md:block w-full h-px bg-border/40 my-4" />

        <div className="text-center group">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Kesulitan
          </p>
          <RatingBadge value={difficulty} type="difficulty" size="md" className="w-full" />
        </div>
      </div>

      {/* Review Content */}
      <div className="flex-1 w-full space-y-4">
        {/* Header (Course, Semester, Grade, Would Take Again) */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-3 border-b border-border/40">
          {courseNameRaw && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20">
                {courseNameRaw}
              </span>
            </div>
          )}

          {wouldTakeAgain !== null && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-md",
                wouldTakeAgain
                  ? "text-green-400 bg-green-400/10 border border-green-400/20"
                  : "text-red-400 bg-red-400/10 border border-red-400/20"
              )}
            >
              {wouldTakeAgain ? (
                <>
                  <ThumbsUp className="h-4 w-4" />
                  Saran Mengambil Lagi
                </>
              ) : (
                <>
                  <ThumbsDown className="h-4 w-4" />
                  Tidak Disarankan
                </>
              )}
            </div>
          )}

          {gradeReceived && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-card/50 px-2 py-1 rounded-md border border-border/50">
              <PenTool className="h-3.5 w-3.5" />
              Nilai: <span className="font-semibold text-foreground">{gradeReceived}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border/60 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Review Body */}
        <p className="text-foreground/90 leading-relaxed sm:text-lg">
          "{body}"
        </p>

        {/* Footer (Author, Date) */}
        <div className="flex items-center justify-between pt-4 text-xs text-muted-foreground/80 mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-medium">{authorAlias || "Mahasiswa Anonim"}</span>
            {semester && (
              <>
                <span className="w-1 h-1 rounded-full bg-border/80" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {semester}
                </span>
              </>
            )}
          </div>
          <span>{relativeDate}</span>
        </div>
      </div>
    </div>
  );
}
