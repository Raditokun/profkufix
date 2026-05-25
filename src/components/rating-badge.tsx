import { chipBg, chipFg } from "@/lib/rating";

interface RatingBadgeProps {
  value: number | null | undefined;
  type?: "rating" | "difficulty";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const SIZES = {
  sm: { w: 56, h: 36, fontSize: 18 },
  md: { w: 90, h: 46, fontSize: 32 },
  lg: { w: 132, h: 90, fontSize: 56 },
};

export function RatingBadge({
  value,
  type = "rating",
  size = "md",
  className,
  style,
}: RatingBadgeProps) {
  const dims = SIZES[size];

  if (value == null || isNaN(value)) {
    return (
      <div
        className={className}
        style={{
          width: dims.w,
          height: dims.h,
          borderRadius: 5,
          background: "var(--pk-rose-tint)",
          color: "var(--pk-fg-3)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--pk-font-ui)",
          fontWeight: 400,
          fontSize: dims.fontSize,
          fontVariantNumeric: "tabular-nums",
          ...style,
        }}
      >
        --
      </div>
    );
  }

  // For difficulty, low = good (green); high = bad (red). Invert v for color.
  const colorValue = type === "difficulty" ? 6 - value : value;

  return (
    <div
      className={className}
      style={{
        width: dims.w,
        height: dims.h,
        borderRadius: 5,
        background: chipBg(colorValue),
        color: chipFg(colorValue),
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--pk-font-ui)",
        fontWeight: 400,
        fontSize: dims.fontSize,
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {value.toFixed(1)}
    </div>
  );
}
