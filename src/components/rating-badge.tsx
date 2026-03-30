import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  value: number;
  type?: "rating" | "difficulty";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RatingBadge({
  value,
  type = "rating",
  className,
  size = "md",
}: RatingBadgeProps) {
  let colorClass = "";

  if (type === "rating") {
    if (value >= 4.0) colorClass = "bg-green-500/15 text-green-400 border-green-500/20";
    else if (value >= 2.5) colorClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    else colorClass = "bg-red-500/15 text-red-500 border-red-500/20";
  } else {
    // difficulty: higher is harder (red)
    if (value >= 4.0) colorClass = "bg-red-500/15 text-red-500 border-red-500/20";
    else if (value >= 2.5) colorClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
    else colorClass = "bg-green-500/15 text-green-400 border-green-500/20";
  }

  const sizeClass = {
    sm: "text-base font-bold min-w-[2.5rem] py-0.5 px-1.5",
    md: "text-lg font-bold min-w-[3rem] py-1 px-2",
    lg: "text-3xl font-extrabold min-w-[5rem] py-3 px-4",
  }[size];

  // If no value, return a muted badge
  if (!value || isNaN(value)) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-muted bg-muted/20 text-muted-foreground",
          sizeClass,
          className
        )}
      >
        --
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl border",
        colorClass,
        sizeClass,
        className
      )}
    >
      {value.toFixed(1)}
    </div>
  );
}
