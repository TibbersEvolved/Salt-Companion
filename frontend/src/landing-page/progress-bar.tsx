import { Progress } from "flowbite-react";

interface ProgressBarProps {
  average: number;
}

export default function ProgressBar({ average }: ProgressBarProps) {
  const roundedAverage = Math.round(average);

  return (
    <Progress
      progress={roundedAverage}
      progressLabelPosition="inside"
      size="lg"
      color="lime"
      labelProgress
      className="shadow-sm"
    />
  );
}
