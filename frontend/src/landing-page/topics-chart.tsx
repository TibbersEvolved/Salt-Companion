import { BarChart } from "@mui/x-charts/BarChart";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

export default function TopicsChart() {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: [
            "React",
            "Typescript",
            "Cloud",
            "SpringBoot",
            "Java",
            "JavaScript",
            "Database",
            "SQL",
            "HTML/CSS",
            "git",
          ],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: [2, 5, 3, 8, 4, 6, 7, 9, 10, 1],
        },
      ]}
      className="bg-slate-200"
      width={812}
      height={300}
      borderRadius={8}
      // colors={cheerfulFiestaPalette}
    />
  );
}
