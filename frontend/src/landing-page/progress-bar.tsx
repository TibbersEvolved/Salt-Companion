import { Progress } from "flowbite-react";

interface ProgressBarProps {
  average: number;
}

export default function ProgressBar({ average }: ProgressBarProps) {
  return <Progress progress={average} size="lg" color="lime" />;
}
