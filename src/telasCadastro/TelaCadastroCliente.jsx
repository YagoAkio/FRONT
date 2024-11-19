import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadCliente from "./formularios/FormCadCliente";
import TabelaClientes from "./tabelas/TabelaClientes";
import { useState } from "react";

export default function TelaCadastroCliente(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [clienteParaEdicao, setClienteParaEdicao] = useState({
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep:'',

    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    //dinâmica em que o usuário irá alternar entre o formulário de cadastro
                    //e a visualização do registros já cadastrados.
                    exibirFormulario ? 
                    <FormCadCliente exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    clienteParaEdicao={clienteParaEdicao}
                                    setClienteParaEdicao={setClienteParaEdicao}/> 
                    : 
                    <TabelaClientes exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    setClienteParaEdicao={setClienteParaEdicao}/>
                }
            </Pagina>
        </Container>
    )
}