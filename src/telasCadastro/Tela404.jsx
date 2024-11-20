import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import { Alert } from "react-bootstrap";
import { useState } from "react";

export default function Tela404({ mensagem }) { // Recebe a prop mensagem
    return (
        <Container>
            <Pagina>
                <Alert variant="danger">
                    {mensagem || `O sistema não oferece acesso a essa página.
                    Utilize o Menu para acessar as opções válidas.`}
                </Alert>
            </Pagina>
        </Container>
    );
}
