import React, { useState } from 'react';
import { Navbar, Container, Form, FormControl, Button, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
import "../css/navbar_hosts.css";

const Filtro_Hosts = ({ onSearchChange, onFilterChange }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    const formattedDate = new Date(searchValue).toISOString(); 
    onSearchChange({ field: 'last_report_date', value: formattedDate });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary filtro">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex align-items-center search">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" style={{ color: 'gray' }} />
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => onSearchChange(e.target.value)} // Adicionado para capturar busca
              />
              <Dropdown>
                <Dropdown.Toggle className='filter' style={{ color: 'gray', backgroundColor: 'white', border: 'none' }}>
                  <FontAwesomeIcon icon={faFilter} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {['Hostname', 'Sistema Operacional', 'Ambiente', 'Hardware', 'Último Relatório', 'Descrição'].map((item) => (
                    <Dropdown.Item key={item} onClick={() => onFilterChange(item)}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
            <div className="ms-auto me-2">
              <Button className="me-2" variant="secondary" onClick={handleOpenModal}>Ação</Button>
              <Button className="me-2" variant="secondary">Exportar</Button>
              <Button variant="danger">Registrar Host</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selecione onde adicionar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {['Hardware', 'Ambiente', 'Organização', 'Site'].map((label) => (
              <Form.Group controlId={`dropdown-${label}`} key={label} className='dropdown-acao'>
                <Form.Label>{label}:</Form.Label>
                <div>
                  <Form.Control as="select" defaultValue="">
                    <option disabled value="">Selecione uma opção</option>
                    <option>Hardware Cadastrado</option>
                    <option>Organização Cadastrada</option>
                    <option>Ambiente Cadastrado</option>
                    <option>Site Cadastrado</option>
                  </Form.Control>
                </div>
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleCloseModal}>Enviar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Filtro_Hosts;
