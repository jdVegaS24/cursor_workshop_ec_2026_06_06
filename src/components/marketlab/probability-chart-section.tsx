"use client";

import { useMemo, useState } from "react";

import { ProbabilityChart } from "@/components/marketlab/probability-chart";
import { Button } from "@/components/ui/button";
import { filterChartPointsByRange } from "@/lib/markets/sentiment";
import type { ChartPoint } from "@/lib/markets/types";

type ChartRange = "all" | "7d" | "24h";

type ProbabilityChartSectionProps = {
  points: ChartPoint[];
  yesChance: number;
  isFlatFallback: boolean;
};

const RANGES: Array<{ id: ChartRange; label: string }> = [
  { id: "all", label: "All" },
  { id: "7d", label: "7d" },
  { id: "24h", label: "24h" },
];

export function ProbabilityChartSection({
  points,
  yesChance,
  isFlatFallback,
}: ProbabilityChartSectionProps) {
  const [range, setRange] = useState<ChartRange>("all");

  const filteredPoints = useMemo(
    () => filterChartPointsByRange(points, range),
    [points, range],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {RANGES.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={range === item.id ? "default" : "outline"}
            onClick={() => setRange(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <ProbabilityChart
        points={filteredPoints}
        yesChance={yesChance}
        isFlatFallback={isFlatFallback}
      />
    </div>
  );
}
