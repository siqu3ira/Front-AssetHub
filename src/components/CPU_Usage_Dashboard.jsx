import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

const CPUsageDashboard = ({ memoryMeans }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const barColors = memoryMeans.map((value) => {
      if (value < 50) return "#52c41a"; // Verde
      if (value < 90) return "#faad14"; // Amarelo
      return "#ff4d4f"; // Vermelho
    });

    const option = {
      title: {
        text: "Monitoramento de Uso de CPU",
        subtext: "Média por Hora",
        left: "center",
      },
      xAxis: {
        data: memoryMeans.map((_, index) => `Hora ${index + 1}`),
        axisLabel: {
          color: "#333",
          rotate: 45,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#aaa",
          },
        },
      },
      yAxis: {
        max: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: [
        {
          type: "bar",
          data: memoryMeans,
          itemStyle: {
            color: (params) => barColors[params.dataIndex],
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const { data, name } = params[0];
          return `${name}: ${data.toFixed(2)}%`;
        },
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Limpeza ao desmontar
    };
  }, [memoryMeans]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "400px",
        height: "400px",
        margin: "0 auto",
      }}
    />
  );
};

export default CPUsageDashboard;