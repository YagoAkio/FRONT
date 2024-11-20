import { Container,Alert } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadUsuario from "./formularios/FormCadUsuario";
import TabelaUsuarios from "./tabelas/TabelaUsuarios";
import { useState } from "react";

export default function TelaCadastroUsuario(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [usuarioParaEdicao, setUsuarioParaEdicao] = useState({
        codigo: '0',
        email: '',
        senha: '',
        prioridade: '',
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Usuário
                    </h2>
                </Alert>
                {
                    //dinâmica em que o usuário irá alternar entre o formulário de cadastro
                    //e a visualização do registros já cadastrados.
                    exibirFormulario ? 
                    <FormCadUsuario exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    usuarioParaEdicao={usuarioParaEdicao}
                                    setUsuarioParaEdicao={setUsuarioParaEdicao}/> 
                    : 
                    <TabelaUsuarios exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    setUsuarioParaEdicao={setUsuarioParaEdicao}/>
                }
            </Pagina>
        </Container>
    )
}