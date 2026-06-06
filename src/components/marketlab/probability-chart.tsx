import type { ChartPoint } from "@/lib/markets/types";

type ProbabilityChartProps = {
  points: ChartPoint[];
  yesChance: number;
  isFlatFallback: boolean;
  width?: number;
  height?: number;
};

const PADDING = { top: 16, right: 16, bottom: 28, left: 36 };

function buildPath(
  points: ChartPoint[],
  width: number,
  height: number,
): string {
  if (points.length === 0) {
    return "";
  }

  const minTime = new Date(points[0].timestamp).getTime();
  const maxTime = new Date(points[points.length - 1].timestamp).getTime();
  const timeSpan = Math.max(maxTime - minTime, 1);
  const chartWidth = width - PADDING.left - PADDING.right;
  const chartHeight = height - PADDING.top - PADDING.bottom;

  return points
    .map((point, index) => {
      const x =
        PADDING.left +
        ((new Date(point.timestamp).getTime() - minTime) / timeSpan) *
          chartWidth;
      const y =
        PADDING.top + chartHeight - (point.yesChance / 100) * chartHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ProbabilityChart({
  points,
  yesChance,
  isFlatFallback,
  width = 640,
  height = 240,
}: ProbabilityChartProps) {
  const path = buildPath(points, width, height);
  const chartHeight = height - PADDING.top - PADDING.bottom;

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Yes probability</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isFlatFallback
              ? "Current market balance — no trading history yet."
              : "Historical Yes chance from market ledger activity."}
          </p>
        </div>
        <p className="text-2xl font-semibold text-chart-1">{yesChance}%</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Yes probability chart at ${yesChance} percent`}
          className="h-auto w-full min-w-[280px] text-chart-1"
        >
          <title>Yes probability chart</title>
          {[0, 25, 50, 75, 100].map((tick) => {
            const y = PADDING.top + chartHeight - (tick / 100) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={PADDING.left}
                  x2={width - PADDING.right}
                  y1={y}
                  y2={y}
                  className="stroke-border"
                  strokeWidth="1"
                />
                <text
                  x={PADDING.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground text-[10px]"
                >
                  {tick}%
                </text>
              </g>
            );
          })}
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
