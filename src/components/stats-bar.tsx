import { Building2, Users, MessageSquare, Star } from "lucide-react";

interface StatsBarProps {
  universityCount: number;
  professorCount: number;
  reviewCount: number;
}

export function StatsBar({
  universityCount,
  professorCount,
  reviewCount,
}: StatsBarProps) {
  const stats = [
    {
      icon: Building2,
      value: universityCount,
      label: "Universitas",
    },
    {
      icon: Users,
      value: professorCount,
      label: "Dosen Terdaftar",
    },
    {
      icon: MessageSquare,
      value: reviewCount,
      label: "Ulasan",
    },
    {
      icon: Star,
      value: "4.2",
      label: "Rating Rata-rata",
    },
  ];

  return (
    <section className="border-y border-border/50 bg-card/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-foreground sm:text-3xl">
              {typeof stat.value === "number"
                ? stat.value.toLocaleString("id-ID")
                : stat.value}
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
