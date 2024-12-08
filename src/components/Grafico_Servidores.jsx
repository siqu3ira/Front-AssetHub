import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function Grafico_Servidores() {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: true,
                top: '85%',
                orient: 'horizontal', // Orientação da legenda
                bottom: 0, // Posição da legenda
                left: 'center',
            },
            series: [
                {
                    name: 'Total de Servidores por Site',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: false,
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 7083, name: 'Site A' },
                        { value: 2917, name: 'Site B' }
                    ]
                }
            ]
        };
        myChart.setOption(option);

        // Limpar o gráfico ao desmontar o componente
        return () => {
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '80%', height: '500px' }} />;
}

export default Grafico_Servidores;
