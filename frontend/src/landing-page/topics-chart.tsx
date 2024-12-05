import { BarChart } from "@mui/x-charts/BarChart";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";
import { createTheme } from "flowbite-react";

type chartProps = {
  topicStats: { topicName: string; topicConfidence: number }[];
};

const saltPalette = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];

export default function TopicsChart({ topicStats }: chartProps) {
  const topicNames = topicStats.map((topic) => topic.topicName);
  const topicConfidence = topicStats.map((topic) => topic.topicConfidence);

  return (
    <div className="w-full max-w-4xl m-auto">
      <BarChart
        slotProps={{
          loadingOverlay: { message: "Loading data" },
          noDataOverlay: { message: "No data to display" },
        }}
        xAxis={[
          {
            colorMap: {
              type: "ordinal",
              colors: [
                "#640D5F",
                "#26547C",
                "#8B4E76",
                "#BD4B73",
                "#EF476F",
                "#F78C6B",
                "#FBAF69",
                "#AAB996",
              ],
            },
            id: "barCategories",
            data: topicNames,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: topicConfidence,
          },
        ]}
        height={300}
        borderRadius={8}
        colors={cheerfulFiestaPalette}
      />
    </div>
  );
}
