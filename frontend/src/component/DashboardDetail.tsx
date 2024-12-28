import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardDetail: React.FC = () => {
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
    ],
    datasets: [
      {
        label: "Time",
        data: [65, 59, 80, 81, 56, 55, 65, 50, 80, 81, 66, 55],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Registered Data",
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-[83vh]">
      <Card title="Dashboard Details." bordered={false} style={{ width: 700 }}>
        <Line data={chartData} options={chartOptions} />
      </Card>
    </div>
  );
};

export default DashboardDetail;
