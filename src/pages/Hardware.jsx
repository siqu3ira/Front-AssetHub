import React, { useState } from 'react';
import Barra_de_Navegacao from '../components/Navbar';
import Filtro_Hardware from '../components/Filtro_Hardware';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../css/hosts_virtuais.css";
import { useQuery } from 'react-query';
import { listarHosts } from '../api';

function Hardware() {

    return (
        <div>
            <Barra_de_Navegacao />
            <div className='hosts'>
                <h1>Hardware</h1>
                <Filtro_Hardware />
                <Tabela />
            </div>
        </div>
    );
}

const Tabela = () => {

    const {data, isLoading, error} = useQuery(
        "query-hosts",
        listarHosts,
        {
            retry: 5,
            refetchInterval: 120000,
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    console.log(data);

    if (!data || !Array.isArray(data)) {
        return <div>No data available</div>;
    }

    return (
        <Table striped bordered hover className='tabela'>
            <thead>
                <tr>
                    <th className='label'>Hostname</th>
                    <th className='label' style={{display: "flex", justifyContent: "center"}}>Descrição</th>
                </tr>
            </thead>
            <tbody>
                {data.map((host, index) => (
                    <tr key={index}>
                        <td>{host[0]}</td> {/* Nome do host */}
                        <td className='descricao'>
                            <span className='texto'>Descrição {index + 1}</span>
                            <div className='button-table'>
                                <Button className='button-tabela'>
                                    <FontAwesomeIcon icon={faChevronRight} className='button-icon'/>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Hardware;
