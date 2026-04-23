"use client";

import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface PerfumeHoverEffectProps {
  product: Product;
}

export default function PerfumeHoverEffect({ product }: PerfumeHoverEffectProps) {
  const notes = [
    { label: "Topo", value: product.olfactoryNotes?.top || product.tags[0] || "" },
    { label: "Coração", value: product.olfactoryNotes?.heart || product.tags[1] || "" },
    { label: "Base", value: product.olfactoryNotes?.base || product.tags[2] || "" },
  ].filter((note) => note.value);

  const noteColors = [
    "rgba(190, 108, 53, 0.78)",
    "rgba(226, 174, 162, 0.76)",
    "rgba(48, 20, 31, 0.72)",
  ];

  const particlePlan = Array.from({ length: 15 }, (_, index) => {
    const noteIndex = notes.length > 0 ? index % notes.length : 0;
    const spread = index % 5;

    return {
      left: 14 + spread * 17 + (noteIndex * 4),
      bottom: 14 + ((index + noteIndex) % 4) * 11,
      size: 7 + (index % 4) * 4,
      delay: index * 90,
      drift: (index % 2 === 0 ? 1 : -1) * (8 + (index % 3) * 3),
      color: noteColors[noteIndex] || noteColors[0],
      noteIndex,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.28),transparent_36%),linear-gradient(180deg,rgba(48,20,31,0.02),rgba(48,20,31,0.18))]" />

      <div className="absolute inset-0 bg-linear-to-t from-[#f7efe7]/30 via-transparent to-transparent mix-blend-screen transition-opacity duration-700" />

      <div className="absolute inset-x-0 bottom-0 top-0">
        {particlePlan.map((particle, index) => (
          <span
            key={`${particle.noteIndex}-${index}`}
            className={cn(
              "absolute -translate-x-1/2 translate-y-3 rounded-full opacity-0 blur-[0.5px] transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100",
              index % 3 === 0 ? "group-hover:-translate-y-14" : "",
              index % 3 === 1 ? "group-hover:-translate-y-20" : "",
              index % 3 === 2 ? "group-hover:-translate-y-16" : ""
            )}
            style={{
              left: `${particle.left}%`,
              bottom: `${particle.bottom}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 18px ${particle.color}`,
              transitionDelay: `${particle.delay}ms`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 top-0">
        {notes.map((note, index) => (
          <span
            key={`${note.label}-${note.value}`}
            className="absolute -translate-x-1/2 translate-y-3 rounded-full border border-white/50 bg-white/20 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
            style={{
              left: `${24 + index * 22}%`,
              bottom: `${18 + index * 5}%`,
              width: `${34 + index * 10}px`,
              height: `${34 + index * 10}px`,
              borderColor: noteColors[index] || noteColors[0],
              boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 0 28px ${noteColors[index] || noteColors[0]}`,
              transitionDelay: `${index * 120}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
