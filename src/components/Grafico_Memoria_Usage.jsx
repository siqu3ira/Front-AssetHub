import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Grafico_Memoria_Usage = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('memory-chart');
    const myChart = echarts.init(chartDom);

    // Função para atualizar os dados no gráfico
    const atualizarGrafico = () => {
      const timeData = [];
      const dataMemory = [];

      if (data && Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          timeData.push(`${data.length - i - 1} min`);
          dataMemory.push(data[i]);
        }
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Uso de Memória (%)',
          textStyle: {
            color: '#fff',
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeData.reverse(),
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
          boundaryGap: [0, '100%'],
          name: 'Memória (%)',
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
            name: 'Uso de Memória',
            type: 'line',
            symbol: 'none',
            data: dataMemory,
            itemStyle: {
              color: 'rgb(255, 158, 68, 0.8)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 158, 68, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 70, 131, 0.1)'
                }
              ])
            }
          }
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
    };

    atualizarGrafico();

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="memory-chart" style={{ width: '40%', height: '300px' }}></div>;
};

export default Grafico_Memoria_Usage;