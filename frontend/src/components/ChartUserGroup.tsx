import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getUserStatistics } from "../api/adminApi"; // Assuming this function fetches user group statistics

const CharUserGroup: React.FC = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [] });

  // Fetch the user group data and update the chart data
  const fetchChartData = async () => {
    try {
      const userGroups = await getUserStatistics(); // This API fetches user group statistics
      console.log('Chart userGroups', userGroups)
      const labels = userGroups.map((group: { _id: string }) => group._id); // Group names as labels
      const series = userGroups.map((group: { count: number }) => group.count); // User counts as series
      setChartData({ labels, series });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#F29C4E"],
    labels: chartData.labels,
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "light", // Set the tooltip background to white when hovering
      style: {
        fontSize: "14px",
        fontFamily: "Satoshi, sans-serif",
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default xl:col-span-5">
      <div className="mb-3 flex justify-between gap-4 sm:flex">
        <h5 className="text-xl font-semibold text-black">
          User Groups
        </h5>
      </div>

      <div className="mb-2 flex justify-center">
        {chartData.series.length > 0 ? (
          <ReactApexChart
            options={options}
            series={chartData.series}
            type="donut"
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default CharUserGroup;
