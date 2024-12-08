import React, { useState, useEffect } from 'react';
import Barra_de_Navegacao from '../components/Navbar';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "../css/host_details.css";
import Tabela_Details from '../components/Tabela_Details';
import Grafico_CPU_Usage from '../components/Grafico_CPU_Usage';
import Grafico_Memoria_Usage from '../components/Grafico_Memoria_Usage';
import { useLocation } from 'react-router-dom';
import { attDescHost, getHost } from '../api';
import { useQuery } from 'react-query';

function Host_Details() {
    const location = useLocation();
    const { uuid } = location.state || {};

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).replace(',', '');
    };

    // Busca os dados do host
    const { data, isLoading, error, refetch } = useQuery(
        ["query-hosts", uuid],
        () => getHost(uuid),
        {
            retry: 5,
            refetchInterval: 300000,
        }
    );

    const [desc, setDesc] = useState("");

    // Atualiza o estado `desc` com a descrição inicial da API
    useEffect(() => {
        if (data?.INFO?.description) {
            setDesc(data.INFO.description);
        }
    }, [data]);

    const handleCHangeDesc = async () => {
        try {
            if (!uuid) {
                console.error("UUID do host não encontrado.");
                return;
            }
            await attDescHost(uuid, desc); 
            alert("Descrição atualizada com sucesso!");
            
            refetch();
        } catch (error) {
            console.error("Erro ao atualizar a descrição:", error);
            alert("Erro ao salvar a descrição. Tente novamente.");
        }
    };

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os dados.</p>;

    const title2 = 'Usage';

    const data1 = {
        OS: data?.INFO?.os_pretty_name || ' -- ',
        Arquitetura: data?.INFO?.architecture || ' -- ',
        BootTime: data?.INFO?.boot_time || ' -- ',
        IPV4: data?.INFO?.ipv4 || ' -- ',
        CPUs: data?.CPU_DATA?.logical_cores || ' -- ',
        Memory: data?.MEMORY_DATA?.total_memory || ' -- ',
    };

    const data2 = {
        CPU: data?.CPU_DATA?.total_cpu_usage_percent + '%',
        Memory: data?.MEMORY_DATA?.memory_usage_percent + "%",
        Storage: [
            { Read: data?.DISK_USAGE?.disk_total_read },
            { Write: data?.DISK_USAGE?.disk_total_write },
        ],
        Network: [
            { Upload: data?.NETWORK_USAGE?.total_bytes_sent },
            { Download: data?.NETWORK_USAGE?.total_bytes_recv },
        ],
    };

    const data3 = data?.DISKS || [];
    const data4 = data?.NETWORK_INTERFACES || [];

    const hostVirtuais = () => {
        window.location.href = '/hosts-virtuais';
    };

    return (
        <div>
            <Barra_de_Navegacao />

            <div className='hosts'>
                <div className='top-part'>
                    <Button className='button-tabela' variant="secondary" onClick={hostVirtuais}>
                        <FontAwesomeIcon icon={faChevronLeft} className='button-icon' />
                    </Button>

                    <h2>{data?.INFO?.hostname}</h2>
                    <h4 style={{ color: "gray" }}>{formatDate(data?.INFO?.boot_time)}</h4>
                </div>

                <div className='middle-part'>
                    <Tabela_Details data={data1} />
                    <Grafico_CPU_Usage data={data?.CPU_DATA?.cpu_usage_percent_history} />
                    <Grafico_Memoria_Usage data={data?.MEMORY_DATA?.memory_usage_percent_history} />
                </div>

                <div className="bottom-part">
                    <Tabela_Details data={data2} title={title2} className={'tabela-usage'} />

                    <div className='desc-div'>
                        <h1>Descrição</h1>
                        <textarea
                            className='descInput'
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)} // Atualiza o estado
                        />
                        <Button variant="danger" className='button-desc' onClick={handleCHangeDesc}>
                            Salvar
                        </Button>
                    </div>
                </div>
                <Tabela data={data3} />
                <Tabela2 data={data4} />
            </div>
        </div>
    );
}

const Tabela = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <Table striped bordered hover className='tabela'>
            <thead>
                <tr>
                    <th className='label'>Partição</th>
                    <th className='label'>MountPoint</th>
                    <th className='label'>File System</th>
                    <th className='label'>Total</th>
                    <th className='label'>Utilizado</th>
                    <th className='label' style={{ display: "flex", justifyContent: "center" }}>Disponível</th>
                </tr>
            </thead>
            <tbody>
                {data.map((disco, index) => {
                    return (
                        <tr key={index}>
                            <td>{disco?.device}</td>
                            <td>{disco?.mountpoint}</td>
                            <td>{disco?.filesystem}</td>
                            <td>{disco?.disk_total_size}</td>
                            <td>{disco?.disk_used_size}</td>
                            <td>{disco?.disk_free_size}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const Tabela2 = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <Table striped bordered hover className='tabela'>
            <thead>
                <tr>
                    <th className='label'>Interface</th>
                    <th className='label'>Endereço</th>
                    <th className='label'>Máscara</th>
                </tr>
            </thead>
            <tbody>
                {data.map((inter, index) => {
                    return (
                        <tr key={index}>
                            <td>{inter?.Interface}</td>
                            <td>{" -- "}</td>
                            <td>{" -- "}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default Host_Details;