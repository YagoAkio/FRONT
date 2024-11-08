import { Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../recursos/estado";
import { buscarProdutos, removerProduto } from "../../redux/produtoReducer";

// Função para formatar a data
function formatarData(dataISO) {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

export default function TabelaProdutos(props) {
    const { estado, mensagem, produtos } = useSelector((state) => state.produto);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(buscarProdutos());
    }, [dispatch]);

    function excluirProduto(produto) {
        if (window.confirm('Deseja realmente excluir este fornecedor?')) {
            dispatch(removerProduto(produto));
        }
    }

    function editarProduto(produto) {
        props.setProdutoParaEdicao(produto);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }

    useEffect(() => {
        dispatch(buscarProdutos());
    }, [dispatch]);

    function apagarMensagens() {
        setTimeout(() => {
            toast.dismiss();
        }, 2000)
        return null;
    }

    if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Buscando produtos....</p>
            </div>
        ,{toastId:estado});
    } else if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>
            </div>
        , {toastId: estado});
    } else {
        toast.dismiss();
    return (
        <Container>
            {estado === ESTADO.ERRO ? 
                toast.error(({ closeToast }) =>
                    <div>
                        <p>{mensagem}</p>
                    </div>
                    , { toastId: estado })
                : null
            }
            {estado === ESTADO.PENDENTE ? 
                toast(({ closeToast }) =>
                    <div>
                        <Spinner animation="border" role="status"></Spinner>
                        <p>Processando a requisição...</p>
                    </div>
                    , { toastId: estado })
                : null
            }

            {estado === ESTADO.OCIOSO ? apagarMensagens() : null}
            <Button type="button" onClick={() => {
                props.exibirFormulario(true);
            }}>Novo Produto</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço de Custo</th>
                        <th>Preço de Venda</th>
                        <th>Qtd. Estoque</th>
                        <th>Url Imagem</th>
                        <th>Data Validade</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produtos.map((produto) => {
                            return (
                                <tr key={produto.codigo}>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.precoCusto}</td>
                                    <td>{produto.precoVenda}</td>
                                    <td>{produto.qtdEstoque}</td>
                                    <td>
                                        {produto.urlImagem ? (
                                            <img    
                                                src={produto.urlImagem} 
                                                alt="Produto" 
                                                style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                                            />
                                        ) : "Sem imagem"}
                                    </td>
                                    <td>{formatarData(produto.dataValidade)}</td> {/* Exibição da data formatada */}
                                    <td>{produto.categoria.descricao}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            excluirProduto(produto);
                                        }}>
                                           Excluir
                                        </Button> {' '}
                                        <Button onClick={() => {
                                            editarProduto(produto);
                                        }} variant="warning">
                                            Editar
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
    }
}
