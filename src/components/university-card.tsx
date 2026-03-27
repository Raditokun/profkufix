import { MapPin } from "lucide-react";
import Link from "next/link";

interface UniversityCardProps {
  name: string;
  shortName: string;
  city: string | null;
  slug: string;
  facultyCount: number;
}

export function UniversityCard({
  name,
  shortName,
  city,
  slug,
  facultyCount,
}: UniversityCardProps) {
  return (
    <Link href={`/universitas/${slug}`} className="block group">
      <div className="glass glass-hover rounded-2xl p-6 h-full">
        {/* Short Name Badge */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary font-bold text-lg transition-colors group-hover:bg-primary/25">
          {shortName}
        </div>

        {/* University Name */}
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 mb-2">
          {name}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {city}
            </span>
          )}
          <span>{facultyCount} Fakultas</span>
        </div>
      </div>
    </Link>
  );
}
