import React, { useState } from 'react';
import { Navbar, Container, Form, FormControl, Button, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
import "../css/navbar_hosts.css";

const Filtro_Ambiente = () => {
  const [showModal, setShowModal] = useState(false);

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
              <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" style={{ color: 'gray'}}/>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ width: '400px' }}
              />
            </Form>
            <div className="ms-auto me-2">
              <Button variant="danger">Registrar Host</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Filtro_Ambiente;