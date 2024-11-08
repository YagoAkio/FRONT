import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { adicionarProduto, atualizarProduto } from '../../redux/produtoReducer';
import { useSelector, useDispatch } from "react-redux";
import { buscarCategorias } from "../../redux/categoriaReducer";
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
            codigo: 0,
            descricao: ''
        }
    };
    const estadoInicialProduto = props.produtoParaEdicao || produtoVazio;
    const [produto, setProduto] = useState(estadoInicialProduto);
    const [formValidado, setFormValidado] = useState(false);

    const { estado: estadoCat, mensagem: mensagemCat, categorias } = useSelector((state) => state.categoria);
    const { estado, mensagem } = useSelector((state) => state.produto);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarCategorias());
    }, [dispatch]);

    // Função para formatar a data no formato 'DD/MM/YYYY'
    function formatarData(dataISO) {
        if (!dataISO) return '';
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para manipular mudanças nos campos do formulário
    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setProduto({ ...produto, [componente.name]: componente.value });
    }

    // Função para selecionar a categoria
    function selecionaCategoria(e) {
        const componente = e.currentTarget;
        setProduto({
            ...produto, categoria: {
                codigo: componente.value,
                descricao: componente.options[componente.selectedIndex].text
            }
        });
    }

    // Função para manipular o envio do formulário
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

    // Formatar a data de validade quando o componente é renderizado
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
            {/* Feedback and loading spinner */}
            {estado === ESTADO.ERRO && toast.error(<p>{mensagem}</p>, { toastId: estado })}
            {estado === ESTADO.PENDENTE && toast(<Spinner animation="border" role="status" />, { toastId: estado })}
            {estado === ESTADO.OCIOSO && setTimeout(() => toast.dismiss(), 2000)}

            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    {/* Código */}
                    <Col>
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
                </Row>
                <Row>
                    {/* Descrição */}
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Descrição:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="descricao"
                                    name="descricao"
                                    value={produto.descricao}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/* Preço de Custo e Preço de Venda */}
                    <Col md={10}>
                        <Form.Group>
                            <FloatingLabel label="Preço de Custo:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="precoCusto"
                                    name="precoCusto"
                                    onChange={manipularMudancas}
                                    value={produto.precoCusto}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group>
                            <FloatingLabel label="Preço de Venda:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="precoVenda"
                                    name="precoVenda"
                                    onChange={manipularMudancas}
                                    value={produto.precoVenda}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/* Quantidade em estoque */}
                    <Col md={5}>
                        <Form.Group>
                            <FloatingLabel label="Quantidade em estoque:" className="mb-3">
                                <Form.Control
                                    type="number"
                                    id="qtdEstoque"
                                    name="qtdEstoque"
                                    onChange={manipularMudancas}
                                    value={produto.qtdEstoque}
                                    required />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    {/* Categoria */}
                    <Col md={3}>
                        <FloatingLabel controlId="floatingSelect" label="Categoria:">
                            <Form.Select
                                id='categoria'
                                name='categoria'
                                onChange={selecionaCategoria}
                                value={produto.categoria.codigo}
                                required>
                                <option value="0">Selecione uma categoria</option>
                                {categorias?.map(categoria => (
                                    <option key={categoria.codigo} value={categoria.codigo}>
                                        {categoria.descricao}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    {/* URL da Imagem */}
                    <Col md={6}>
                        <Form.Group>
                            <FloatingLabel label="URL da Imagem:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="urlImagem"
                                    name="urlImagem"
                                    placeholder="URL da imagem do produto"
                                    onChange={manipularMudancas}
                                    value={produto.urlImagem} />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/* Data de Validade */}
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
                {/* Botões */}
                <Row>
                    <Col md={6} className="d-flex justify-content-end">
                        <Button type="submit" variant="primary">
                            {props.modoEdicao ? "Alterar" : "Cadastrar"}
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button type="button" variant="secondary" onClick={() => props.exibirFormulario(false)}>
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
