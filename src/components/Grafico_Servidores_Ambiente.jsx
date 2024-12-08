import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function Grafico_Servidores_Ambiente() {
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
                    name: 'Total de Servidores por Ambiente',
                    type: 'pie',
                    radius: ['60%', '100%'],
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
                        { value: 5833, name: 'Produção' },
                        { value: 2084, name: 'Homologação' },
                        { value: 833, name: 'Desenvolvimento' },
                        { value: 1250, name: 'Teste Integrado' }
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

    return <div ref={chartRef} style={{ width: '55%', height: '500px' }} />;
}

export default Grafico_Servidores_Ambiente;
