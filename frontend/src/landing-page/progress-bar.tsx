import { Progress } from "flowbite-react";

interface ProgressBarProps {
  average: number;
}

export default function ProgressBar({ average }: ProgressBarProps) {
  return (
    <Progress
      progress={average}
      progressLabelPosition="inside"
      size="lg"
      color="lime"
      labelProgress
      className="shadow-sm"
    />
  );
}
