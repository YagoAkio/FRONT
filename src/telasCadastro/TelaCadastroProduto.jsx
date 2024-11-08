import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./formularios/FormCadProduto";
import TabelaProdutos from "./tabelas/TabelaProdutos";
import { useState } from "react";

export default function TelaCadastroProduto(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [produtoParaEdicao, setProdutoParaEdicao] = useState({
        codigo: '0',
        descricao: '',
        precoCusto: '',
        precoVenda: '',
        qtdEstoque: '',
        categoria: {
            codigo:0,
            descricao:''
        },
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    return (
        <Container>
            <Pagina>
                {
                    //dinâmica em que o usuário irá alternar entre o formulário de cadastro
                    //e a visualização do registros já cadastrados.
                    exibirFormulario ? 
                    <FormCadProduto exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    produtoParaEdicao={produtoParaEdicao}
                                    setProdutoParaEdicao={setProdutoParaEdicao}/> 
                    : 
                    <TabelaProdutos exibirFormulario={setExibirFormulario}
                                    setExibirFormulario={setExibirFormulario}
                                    modoEdicao={modoEdicao}
                                    setModoEdicao={setModoEdicao}
                                    setProdutoParaEdicao={setProdutoParaEdicao}/>
                }
            </Pagina>
        </Container>
    )
}