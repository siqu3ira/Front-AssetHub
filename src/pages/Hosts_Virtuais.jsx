import React, { useState, useEffect } from 'react';
import Barra_de_Navegacao from '../components/Navbar';
import Filtro_Hosts from '../components/Filtro_Hosts';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../css/hosts_virtuais.css";
import { useQuery } from 'react-query';
import { listarHosts } from '../api';
import { useNavigate } from 'react-router-dom';

function Hosts_Virtuais() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filter) => {
    setFilterBy(filter);
  };

  return (
    <div>
      <Barra_de_Navegacao />
      <div className='hosts'>
        <h1>Hosts</h1>
        <Filtro_Hosts onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />
        <Tabela searchTerm={searchTerm} filterBy={filterBy} />
      </div>
    </div>
  );
}

const Tabela = ({ searchTerm, filterBy }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useQuery(
    "query-hosts",
    listarHosts,
    {
      retry: 5,
      refetchInterval: 120000,
      onSuccess: (data) => {
        setCheckboxes(new Array(data.length).fill(false));
      }
    }
  );

  useEffect(() => {
    if (data) {
      setCheckboxes(new Array(data.length).fill(false));
    }
  }, [data]);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  const handleSelectAllChange = () => {
    const newCheckboxes = checkboxes.map(() => !selectAll);
    setCheckboxes(newCheckboxes);
    setSelectAll(!selectAll);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao buscar dados: {error.message}</div>;
  }

  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  const filteredData = data.filter((host) => {
    if (!filterBy) return true;
    const field = filterBy.toLowerCase().replace(' ', '_');
    return host[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  const hostDetails = (uuid) => {
        navigate('/host-details', { state: { uuid } });
    };

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Table striped bordered hover className='tabela'>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Hostname</th>
            <th>Sistema Operacional</th>
            <th>Ambiente</th>
            <th>Hardware</th>
            <th>Último Relatório</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((host, index) => (
            <tr key={host.uuid}>
              <td>
                <input
                  type="checkbox"
                  checked={checkboxes[startIndex + index] || false}
                  onChange={() => handleCheckboxChange(startIndex + index)}
                />
              </td>
              <td>{host.hostname}</td>
              <td>{host.os_pretty_name || "Desconhecido"}</td>
              <td>{host.ambiente || "--"}</td>
              <td>{host.hardware || "--"}</td>
              <td>{host.last_report_date ? formatDate(host.last_report_date) : "--"}</td>
              <td className='descricao'>
                <span className='texto'>{host.description || "--"}</span>
                <div className='button-table'>
                  <Button className='button-tabela' variant="secondary" onClick={() => hostDetails(host.uuid)}>
                    <FontAwesomeIcon icon={faChevronRight} className='button-icon' />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-controls" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Anterior
        </Button>
        <span>
          Página 
          <strong>{` ${currentPage}`} </strong>
        de 
          <strong>{` ${totalPages}`}</strong>
        </span>
        <Button
          variant="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Próximo
        </Button>
      </div>
    </>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export default Hosts_Virtuais;