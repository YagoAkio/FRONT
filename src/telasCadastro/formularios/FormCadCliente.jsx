import { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import { adicionarCliente, atualizarCliente } from '../../redux/clienteReducer';
import { useSelector, useDispatch } from 'react-redux';
import ESTADO from '../../recursos/estado';

export default function FormCadClientes(props) {

    const clienteVazio = {
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
    }

    const estadoInicialCliente = props.clienteParaEdicao ;
    const [cliente, setCliente] = useState(estadoInicialCliente);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, clientes } = useSelector((state) => state.cliente);
    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setCliente({ ...cliente, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarCliente(cliente));
            }
            else {
                dispatch(atualizarCliente(cliente));
                props.setModoEdicao(false);
                props.setClienteParaEdicao(clienteVazio);
            }
            setCliente(clienteVazio); // ou sair da tela de formulário 
            setFormValidado(false);
        }
        else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    if (estado === ESTADO.ERRO) {
        toast.error(({ closeToast }) =>
            <div>
                <p>{mensagem}</p>
            </div>
            , { toastId: estado });
    }
    else if (estado === ESTADO.PENDENTE) {
        toast(({ closeToast }) =>
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <p>Processando a requisição...</p>
            </div>
            , { toastId: estado });
    }
    else {
        toast.dismiss();
        return (
            <Container>
                <h2>Cadastro de Clientes</h2>
                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="CPF:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o CPF"
                                        id="cpf"
                                        name="cpf"
                                        value={cliente.cpf}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o CPF do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Nome:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o nome do cliente"
                                        id="nome"
                                        name="nome"
                                        value={cliente.nome}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o nome do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="E-mail:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="email"
                                        placeholder="Informe o e-mail do cliente"
                                        id="email"
                                        name="email"
                                        value={cliente.email}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o e-mail do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Telefone:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o telefone"
                                        id="telefone"
                                        name="telefone"
                                        value={cliente.telefone}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o telefone do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Endereço:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o endereço"
                                        id="endereco"
                                        name="endereco"
                                        value={cliente.endereco}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o endereço do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Bairro:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o bairro"
                                        id="bairro"
                                        name="bairro"
                                        value={cliente.bairro}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o bairro do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Cidade:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe a cidade"
                                        id="cidade"
                                        name="cidade"
                                        value={cliente.cidade}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe a cidade do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="Estado (UF):"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o estado (UF)"
                                        id="uf"
                                        name="uf"
                                        value={cliente.uf}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o estado (UF) do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <FloatingLabel
                                    label="CEP:"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o CEP"
                                        id="cep"
                                        name="cep"
                                        value={cliente.cep}
                                        onChange={manipularMudancas}
                                        required />
                                </FloatingLabel>
                                <Form.Control.Feedback type="invalid">Informe o CEP do cliente!</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} offset={5} className="d-flex justify-content-end">
                            <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                        </Col>
                        <Col md={6} offset={5}>
                            <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                            }>Voltar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}
