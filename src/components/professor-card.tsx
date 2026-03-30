import Link from "next/link";
import { RatingBadge } from "./rating-badge";
import { Users, GraduationCap, MapPin } from "lucide-react";

interface Department {
  name: string;
  faculties: {
    universities: {
      name: string;
      short_name: string | null;
      city: string | null;
    } | null;
  } | null;
}

interface ProfessorCardProps {
  id: string;
  fullName: string;
  title: string | null;
  department: Department | null;
  avgRating: number | null;
  reviewCount: number | null;
}

export function ProfessorCard({
  id,
  fullName,
  title,
  department,
  avgRating,
  reviewCount,
}: ProfessorCardProps) {
  const uni = department?.faculties?.universities;

  return (
    <Link href={`/dosen/${id}`} className="block group">
      <div className="glass glass-hover rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start h-full">
        {/* Rating Column */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <RatingBadge value={avgRating || 0} size="lg" />
          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Users className="h-3 w-3" />
            {reviewCount || 0} Ulasan
          </span>
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-foreground truncate mb-1">
            {title ? `${fullName}, ${title}` : fullName}
          </h3>
          
          {department && (
            <div className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1 truncate">
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span className="truncate">{department.name}</span>
            </div>
          )}
          
          {uni && (
            <div className="text-sm font-medium text-primary/80 flex items-center gap-1.5 truncate">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{uni.name} {uni.city && `- ${uni.city}`}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
