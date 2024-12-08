import React, { useState, useEffect } from 'react';
import Barra_de_Navegacao from '../components/Navbar'
import "../css/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHardDrive, faDesktop } from '@fortawesome/free-solid-svg-icons';
import Grafico_Sistemas_Operacionais from '../components/Grafico_Sistemas_Operacionais';
import Grafico_Servidores from '../components/Grafico_Servidores';
import Grafico_Servidores_Ambiente from '../components/Grafico_Servidores_Ambiente';
import { useQuery } from "react-query";
import { listarHosts, qtdHardware, getMediaCpu } from '../api';
import { qtdLinux, qtdWindows, totalServidoresVirtuais } from '../services/servidoresService';
import CPUsageDashboard from '../components/CPU_Usage_Dashboard';
import HostsDropdown from '../components/HostsDropDown';

function Home() {

    const [linux, setLinux] = useState(null);
    const [windows, setWindows] = useState(null);

    useEffect(() => {
        const fetchLinux = async () => {
            const result = await qtdLinux();
            setLinux(result);
        };

        fetchLinux();
    }, []);

    useEffect(() => {
        const fetchWindows = async () => {
            const result = await qtdWindows();
            setWindows(result);
        };

        fetchWindows();
    }, []);

    const { data } = useQuery(
        "query-hosts",
        listarHosts,
        {
            retry: 5,
            refetchInterval: 120000,
        }
    );

    const { data: dataHardware } = useQuery(
        "query-qtd-hardware",
        qtdHardware,
        {
            retry: 5,
            refetchInterval: 120000,
        }
    );

    const { data: data_cpu } = useQuery(
        "query-dashboard",
        getMediaCpu,
        {
            retry: 5,
            refetchInterval: 120000,
        }
    );

    console.log(data_cpu?.MEMORY_MEAN)


    return (
        <div className='home'>
            <Barra_de_Navegacao />

            <div className='servidores'>
                <div className='servidores-windows'>
                    <div className='x'>
                        <p className='valor'>{windows}</p>
                        <img src="./assets/windows.png" className='serverIcon'/> 
                    </div>
                    <p className='chave'>Windows</p>
                    <p className='texto'>Total de Servidores Windows</p>
                </div>
                <div className='servidores-linux'>
                    <div className='x'>
                        <p className='valor'>{linux}</p>
                        <img src="./assets/linux.png" className='serverIcon'/>
                    </div>
                    <p className='chave'>Linux</p>
                    <p className='texto'>Total de Servidores Linux</p>
                </div>
                <div className='total-servidores'>
                    <div className='x'>
                        <p className='valor'>{linux + windows}</p>
                        <FontAwesomeIcon icon={faDesktop} id='icon'/>
                    </div>
                    <p className='chave'>Servidores</p>
                    <p className='texto'>Total de Servidores Virtuais</p>
                </div>
                <div className='servidores-fisicos'>
                    <div className='x'> 
                        <p className='valor'>{dataHardware?.Hardware_Count}</p>
                        <FontAwesomeIcon icon={faHardDrive} id='icon'/>
                    </div>
                    <p className='chave'>Hardwares</p>
                    <p className='texto'>Total de Servidores Físicos</p>
                </div>
            </div>
            <div className='graficos'>
                <div className='grafico-so'>
                    <h4>Total de Sistemas Operacionais</h4>
                    <Grafico_Sistemas_Operacionais />
                </div>
                <div className='grafico-site'>
                    <h4>Total de Servidores por Site</h4>
                    <Grafico_Servidores />
                </div>
                <div className='grafico-ambiente'>
                    <h4>Total de Servidores por Ambiente</h4>
                    <Grafico_Servidores_Ambiente />
                </div>
            </div>

            <div className='graficos'>
                <div className='dashboard-graph'>
                    <h4>Média de Uso de CPU</h4>
                    {data_cpu?.MEMORY_MEAN ? (
                        <CPUsageDashboard memoryMeans={data_cpu?.MEMORY_MEAN} />
                    ) : (
                        <div>Carregando dados do gráfico...</div>
                    )}
                </div>

                <div className='dashboard-dropdowns'>
                    <h4>Status de Hosts</h4>
                    {data_cpu?.HOSTS ? (
                        <HostsDropdown hosts={data_cpu.HOSTS} />
                    ) : (
                        <div>Carregando lista de hosts...</div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Home;