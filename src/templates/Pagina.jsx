import Cabecalho from "./Cabecalho";
import Menu from "./Menu";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Sistema de controle Gerencial" />
                <Menu />
                {
                    props.children
                }
            </Container>
        </>
        
    )
    
}

