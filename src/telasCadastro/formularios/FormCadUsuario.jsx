import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel, Spinner } from "react-bootstrap";
import { adicionarUsuario, atualizarUsuario } from '../../redux/usuarioReducer';
import { useSelector, useDispatch } from "react-redux";
import ESTADO from "../../recursos/estado";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask';

export default function FormCadUsuario(props) {
    const usuarioVazio = {
        codigo: '0',
        email:'',
        senha:'',
        prioridade:'',
    };

    const estadoInicialUsuario = props.usuarioParaEdicao || usuarioVazio;
    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [formValidado, setFormValidado] = useState(false);

    const { estado, mensagem } = useSelector((state) => state.usuario);

    const dispatch = useDispatch();

    function manipularMudancas(e) {
        const componente = e.currentTarget;
        setUsuario({ ...usuario, [componente.name]: componente.value });
    }

    function manipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                dispatch(adicionarUsuario(usuario));
            } else {
                dispatch(atualizarUsuario(usuario));
                props.setModoEdicao(false);
                props.setUsuarioParaEdicao(usuarioVazio);
            }
            setUsuario(usuarioVazio);
            setFormValidado(false);
        } else {
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container className="p-4">
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                <Col md={6}>
                <Form.Group>
                    <FloatingLabel label="Código:" className="mb-3">
                        <Form.Control
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={usuario.codigo}
                            onChange={manipularMudancas}
                            disabled />
                    </FloatingLabel>
                </Form.Group>
            </Col>
                    <Form.Group as={Col} className="mb-4">
                        <FloatingLabel controlId="email" label="Email" className="mb-2">
                            <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite o email do usuário"
                                value={usuario.email}
                                onChange={manipularMudancas}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe o email do usuário!
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-4">
                        <FloatingLabel controlId="senha" label="Senha" className="mb-2">
                            <Form.Control
                                type="text"
                                id="senha"
                                name="senha"
                                placeholder="Digite a senha do usuário"
                                value={usuario.senha}
                                onChange={manipularMudancas}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a senha do usuário!
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-4">
                        <FloatingLabel controlId="prioridade" label="Prioridade" className="mb-2">
                            <Form.Control
                                type="text"
                                id="prioridade"
                                name="prioridade"
                                placeholder="Digite a prioridade do usuário"
                                value={usuario.prioridade}
                                onChange={manipularMudancas}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a prioridade do usuário!
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>

                <Row className="mt-4">
                    <Col md={6}>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                        >
                            {props.modoEdicao ? "Alterar" : "Cadastrar"}
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-100"
                            onClick={() => props.exibirFormulario(false)}
                        >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}