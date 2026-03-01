interface GoalProgressBarProps {
  percentage: number;
}

function getBarColor(percentage: number): string {
  if (percentage >= 90) return "bg-red-500/85";
  if (percentage >= 70) return "bg-amber-500";
  return "bg-green-500";
}

export default function GoalProgressBar({ percentage }: GoalProgressBarProps) {
  const clamped = Math.min(percentage, 100);

  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${getBarColor(percentage)}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
