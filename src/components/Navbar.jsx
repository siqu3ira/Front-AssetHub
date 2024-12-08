import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartPie, faHardDrive, faCircleUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../css/navbar.css';

const Barra_de_Navegacao = () => {

    const handleLogout = () => {
        // Limpa o localStorage ao fazer logout
        localStorage.removeItem('authenticated');
        // Redireciona o usuário para a página de login
        window.location.href = '/';
    };

    const hostsVirtuais = () => {
        window.location.href = '/hosts-virtuais';
    };
    
    const hardware = () => {
        window.location.href = '/hardware';
    };
    
    const ambiente = () => {
        window.location.href = '/ambiente';
    };
    
    const site = () => {
        window.location.href = '/site';
    };

    const dashBoard = () => {
        window.location.href = '/home';
    };

    return (
        <>
            <Navbar expand={false} className="mb-3 navbar">
                <Container fluid className="d-flex align-items-center justify-content-start">
                    <Navbar.Toggle><img src='./assets/Expand_Tab.png'/></Navbar.Toggle>
                    <Navbar.Brand><h1 className='logo-navbar m-0'> <img src=".\assets\logo.png" alt="Logo" id="logo" /> ASSET HUB</h1></Navbar.Brand>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-false`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                        placement="start"
                        data-bs-theme="dark"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`} className='side-menu-title'>
                                MENU
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 side-menu-item">
                                <Nav.Link href="#action1" className="ms-2 side-menu-text" onClick={dashBoard}><FontAwesomeIcon icon={faChartPie} />  Dashboard</Nav.Link>
                                <NavDropdown
                                    title={<span className="ms-2 side-menu-text"><FontAwesomeIcon icon={faHardDrive} /> Hosts</span>}
                                    id={`offcanvasNavbarDropdown-hosts`}
                                >
                                    <NavDropdown.Item href="#action3" onClick={hostsVirtuais}>Hosts Virtuais</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4" onClick={hardware}>Hardware</NavDropdown.Item>
                                    <NavDropdown.Item href="#action5" onClick={ambiente}>Ambientes</NavDropdown.Item>
                                    <NavDropdown.Item href="#action5" onClick={site}>Sites</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title={<span className="ms-2 side-menu-text"><FontAwesomeIcon icon={faCog} /> Configurações</span>}
                                    id={`offcanvasNavbarDropdown-configuracoes`}
                                >
                                    <NavDropdown.Item href="#action3">Organizações</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Usuários</NavDropdown.Item>
                                    <NavDropdown.Item href="#action5">Grupos</NavDropdown.Item>
                                    <NavDropdown.Item href="#action5">Sobre</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                        <DropdownButton
                            title={<span className="ms-2 user"><FontAwesomeIcon icon={faCircleUser} className='icone-user'/>  Admin</span>}
                            id="user"
                            variant="secondary"
                            data-bs-theme="dark"
                            className='ms-auto'
                        >
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4" onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} />  Logout</Dropdown.Item>
                        </DropdownButton>
                </Container>
            </Navbar>
        </>
    );
}

export default Barra_de_Navegacao;
