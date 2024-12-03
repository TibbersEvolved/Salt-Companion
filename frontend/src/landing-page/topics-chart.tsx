import { BarChart } from "@mui/x-charts/BarChart";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

type chartProps = {
  topicStats: { topicName: string; topicConfidence: number }[];
};

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
        // colors={cheerfulFiestaPalette}
      />
    </div>
  );
}
