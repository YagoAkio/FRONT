import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { adicionarProduto, atualizarProduto } from '../../redux/produtoReducer';
import { useSelector, useDispatch } from "react-redux";
import { buscarCategorias } from "../../redux/categoriaReducer";
import { buscarFornecedores } from "../../redux/fornecedorReducer";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';

export default function FormCadProduto(props) {
    const produtoVazio = {
        codigo: '0',
        descricao: '',
        precoCusto: '',
        precoVenda: '',
        qtdEstoque: '',
        urlImagem: '',
        dataValidade: '',
        categoria: {
            codigo: 0,  // Certifique-se de que isso está sendo tratado no backend como um valor válido ou inválido.
            descricao: ''
        },
        fornecedor: {
            cnpj: '',  // O mesmo vale para fornecedor
            nome: '',
            email:'',
            telefone:'',
            endereco:'',
            bairro:'',
            cidade:'',
            uf:'',
            cep:''
        }
    };

    const estadoInicialProduto = props.produtoParaEdicao || produtoVazio;
    const [produto, setProduto] = useState(estadoInicialProduto);
    const [formValidado, setFormValidado] = useState(false);

    const { estado: estadoCat, categorias } = useSelector((state) => state.categoria);
    const { estado: estadoForn, fornecedores } = useSelector((state) => state.fornecedor);
    const { estado, mensagem } = useSelector((state) => state.produto);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarCategorias());
        dispatch(buscarFornecedores());
    }, [dispatch]);

    function formatarData(dataISO) {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setProduto({ ...produto, [componente.name]: componente.value });
    }

    function selecionaCategoria(e) {
        const componente = e.currentTarget;
        setProduto({
            ...produto, categoria: {
                codigo: componente.value,
                descricao: componente.options[componente.selectedIndex].text
            }
        });
    }
    
    function selecionaFornecedor(e) {
        const componente = e.currentTarget;
        setProduto({
            ...produto, fornecedor: {
                ...produto.fornecedor, // garante que as propriedades anteriores sejam mantidas
                cnpj: componente.value,
                nome: componente.options[componente.selectedIndex].text
            }
        });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarProduto(produto));
            } else {
                dispatch(atualizarProduto(produto));
                props.setModoEdicao(false);
                props.setProdutoParaEdicao(produtoVazio);
            }
            setProduto(produtoVazio);
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    useEffect(() => {
        if (props.produtoParaEdicao && props.produtoParaEdicao.dataValidade) {
            setProduto({
                ...props.produtoParaEdicao,
                dataValidade: formatarData(props.produtoParaEdicao.dataValidade)
            });
        }
    }, [props.produtoParaEdicao]);

    return (
        <Container>
    {estado === ESTADO.ERRO && toast.error(<p>{mensagem}</p>, { toastId: estado })}
    {estado === ESTADO.PENDENTE && (
        <div className="text-center my-3">
            <Spinner animation="border" role="status" />
        </div>
    )}
    {estado === ESTADO.OCIOSO && setTimeout(() => toast.dismiss(), 2000)}

    <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
        <Row className="mb-4">
            <Col md={6}>
                <Form.Group>
                    <FloatingLabel label="Código:" className="mb-3">
                        <Form.Control
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={produto.codigo}
                            onChange={manipularMudancas}
                            disabled />
                    </FloatingLabel>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group>
                    <FloatingLabel label="Descrição:" className="mb-3">
                        <Form.Control
                            type="text"
                            id="descricao"
                            name="descricao"
                            placeholder="Digite a descrição do produto"
                            value={produto.descricao}
                            onChange={manipularMudancas}
                            required />
                    </FloatingLabel>
                </Form.Group>
            </Col>
        </Row>

        <Row className="mb-4">
            <Col md={6}>
                <FloatingLabel label="Preço de Custo:" className="mb-3">
                    <Form.Control
                        type="text"
                        id="precoCusto"
                        name="precoCusto"
                        placeholder="Preço de custo"
                        value={produto.precoCusto}
                        onChange={manipularMudancas}
                        required />
                </FloatingLabel>
            </Col>
            <Col md={6}>
                <FloatingLabel label="Preço de Venda:" className="mb-3">
                    <Form.Control
                        type="text"
                        id="precoVenda"
                        name="precoVenda"
                        placeholder="Preço de venda"
                        value={produto.precoVenda}
                        onChange={manipularMudancas}
                        required />
                </FloatingLabel>
            </Col>

            <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="Quantidade em Estoque:" className="mb-3">
                                <Form.Control
                                    type="number"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    placeholder="Quantidade de estoque"
                                    value={produto.qtdEstoque}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

        </Row>

        

        <Row className="mb-4">
            <Col md={6}>
                <FloatingLabel controlId="floatingSelect" label="Categoria:">
                    <Form.Select
                        id="categoria"
                        name="categoria"
                        onChange={selecionaCategoria}
                        value={produto.categoria.codigo || ''}
                        required>
                        <option value="0">Selecione uma categoria</option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.codigo} value={categoria.codigo}>
                                {categoria.descricao}
                            </option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col md={6}>
                <FloatingLabel controlId="floatingSelect" label="Fornecedor:">
                <Form.Select
    id="fornecedor"
    name="fornecedor"
    onChange={selecionaFornecedor}
    value={produto.fornecedor?.cnpj || ''} // Evita erro caso fornecedor seja undefined
    required>
    <option value="0">Selecione um fornecedor</option>
    {fornecedores?.map((fornecedor) => (
        <option key={fornecedor.cnpj} value={fornecedor.cnpj}>
            {fornecedor.cnpj}
        </option>
    ))}
</Form.Select>
                </FloatingLabel>
            </Col>
        </Row>

        <Row className="mb-4">
            <Col md={6}>
                <Form.Group>
                    <FloatingLabel label="URL da Imagem:" className="mb-3">
                        <Form.Control
                            type="text"
                            id="urlImagem"
                            name="urlImagem"
                            placeholder="URL da imagem do produto"
                            value={produto.urlImagem}
                            onChange={manipularMudancas} />
                    </FloatingLabel>
                </Form.Group>
                {produto.urlImagem && (
                    <div className="text-center my-2">
                        <img src={produto.urlImagem} alt="Produto" style={{ maxWidth: "100%", maxHeight: "150px" }} />
                    </div>
                )}
            </Col>
            <Col md={6}>
                <Form.Group controlId="dataValidade" className="mb-3">
                    <Form.Label>Data de Validade:</Form.Label>
                    <InputMask
                        mask="99/99/9999"
                        maskChar="_"
                        name="dataValidade"
                        onChange={manipularMudancas}
                        value={produto.dataValidade}
                        required
                        className="form-control"
                    />
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <Col md={5}>
                <Button type="submit" variant="primary" className="w-100">
                    {props.modoEdicao ? "Alterar" : "Cadastrar"}
                </Button>
            </Col>
            <Col md={5}>
                <Button type="button" variant="secondary" className="w-100" onClick={() => props.exibirFormulario(false)}>
                    Voltar
                </Button>
            </Col>
        </Row>
    </Form>
</Container>

    );
}
