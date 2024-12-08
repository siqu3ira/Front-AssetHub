import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Grafico_CPU_Usage = ({ data }) => {
  useEffect(() => {
    var chartDom = document.getElementById('cpu-chart');
    var myChart = echarts.init(chartDom);

    console.log(data)

    // Verifica se há dados válidos para renderizar
    const chartData = data || [];
    const timeData = chartData.map((_, index) => {
      const minutes = index * 5; // Cada registro é 5 minutos
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
    });

    // Configuração do gráfico ECharts
    const option = {
      title: {
        text: 'Uso de CPU (últimas 24h)',
        left: 'center',
        textStyle: {
          color: '#fff',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeData,
        axisLabel: {
          color: '#aaa',
        },
        axisLine: {
          lineStyle: {
            color: '#555',
          },
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          color: '#aaa',
          formatter: '{value} %',
        },
        axisLine: {
          lineStyle: {
            color: '#555',
          },
        },
      },
      series: [
        {
          name: 'Uso de CPU',
          type: 'line',
          data: chartData,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 123, 255, 0.8)' },
              { offset: 1, color: 'rgba(0, 123, 255, 0.1)' },
            ]),
          },
          lineStyle: {
            color: 'rgba(0, 123, 255, 1)',
            width: 2,
          },
          itemStyle: {
            color: '#007bff',
          },
        },
      ],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      backgroundColor: '#1e1e1e',
    };

    myChart.setOption(option);
  }, [data]);

  return <div id="cpu-chart" style={{ width: '40%', height: '300px' }}></div>;
};

export default Grafico_CPU_Usage;
