import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useQuery } from "react-query";
import { qtdServidores } from '../api'; // Importe a função correta

function Grafico_Sistemas_Operacionais() {
    const chartRef = useRef(null);

    const { data, isLoading, error } = useQuery(
        "query-qtd-servidores",
        qtdServidores,
        {
            retry: 5,
            refetchInterval: 120000,
        }
    );

    useEffect(() => {
        if (!data) return; // Retorna se não houver dados ainda

        // Processar os dados para o gráfico
        const sistemasOperacionais = [
            { nome_sistema_operacional: 'Linux', qtd: data.Linux_Hosts },
            { nome_sistema_operacional: 'Windows', qtd: data.Windows_Hosts },
        ];

        // Configurar e atualizar o gráfico com os novos dados
        const myChart = echarts.init(chartRef.current);
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                show: true,
                top: '85%',
                orient: 'horizontal',
                bottom: 0,
                left: 'center',
            },
            series: [
                {
                    name: 'Total de Sistemas Operacionais',
                    type: 'pie',
                    radius: ['35%', '65%'],
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
                    data: sistemasOperacionais.map(item => ({
                        value: item.qtd,
                        name: item.nome_sistema_operacional,
                    }))
                }
            ]
        };
        myChart.setOption(option);

        // Limpar o gráfico ao desmontar o componente
        return () => {
            myChart.dispose();
        };

    }, [data]); // Executar o useEffect sempre que 'data' mudar

    return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}

export default Grafico_Sistemas_Operacionais;