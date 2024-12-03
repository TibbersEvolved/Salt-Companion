import { BarChart } from "@mui/x-charts/BarChart";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

type chartProps = {
  topicName: string;
  topicConfidence: number;
};

export default function TopicsChart(props: chartProps) {
  return (
    <div className="w-full max-w-4xl m-auto">
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: [props.topicName],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [props.topicConfidence],
          },
        ]}
        height={300}
        borderRadius={8}
        // colors={cheerfulFiestaPalette}
      />
    </div>
  );
}
