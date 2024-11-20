import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContextoUsuario } from '../App';

export default function Menu(props) {
    const { setUser } = useContext(ContextoUsuario); // Acessa a função para atualizar o estado do usuário
    const navigate = useNavigate(); // Hook para navegação

    const handleLogout = () => {
        setUser({
            usuario: "",
            privilegio: 0,
            logado: false
        });
        navigate('/'); // Redireciona para a página de login
    };
    //a propriedade "to" do componente Link deve apontar para um path em Routes
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/clientes">Clientes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/fornecedores">Fornecedores</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/produtos">Produtos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/categorias">Categorias</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/usuarios">Usuarios</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}