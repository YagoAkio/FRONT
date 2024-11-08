//Componente que deve receber uma propriedade conteúdo
import { Alert } from "react-bootstrap";
export default function Cabecalho(props) {
    return (
        <Alert className={"text-center"} variant="light">
            <h1>
                {props.titulo || "Sistema de controle Gerencial"}
            </h1>
        </Alert>

    );
}