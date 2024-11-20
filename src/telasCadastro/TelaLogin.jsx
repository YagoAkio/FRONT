import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef, useEffect } from "react";
import { ContextoUsuario } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { buscarUsuarios } from "../redux/usuarioReducer";
import ESTADO from "../recursos/estado";
import { toast } from "react-toastify";

export default function TelaLogin() {
    const nomeUsuario = useRef();
    const senha = useRef();
    const {user,setUser} = useContext(ContextoUsuario);
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(buscarUsuarios(""));
    }, [dispatch]);
    
    useEffect(() => {
        if (estado === ESTADO.PENDENTE) {
            toast.info("Buscando usuários...", { toastId: "pendente" });
        } else if (estado === ESTADO.ERRO) {
            toast.error(mensagem, { toastId: "erro" });
        } else if (estado === ESTADO.OCIOSO) {
            toast.dismiss();
        }
    }, [estado, mensagem]);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senha.current.value;

        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === usuarioDigitado
        );

        if (usuarioEncontrado) {
            if (usuarioEncontrado.senha === senhaDigitada) {
                setUser({
                    "usuario":usuarioDigitado,
                    "privilegio":usuarioEncontrado.prioridade,
                    "logado":true
                });
                toast.success("Login realizado com sucesso!");
                console.log("Usuário autenticado:", usuarioEncontrado);
            } else {
                toast.error("Senha incorreta!");
            }
        } else {
            toast.error("Usuário não encontrado!");
        }
    }
    /*
        3 - Admin - permisão para tudo
        2 - Gerente - CRUD de fornecedro, produto, cliente e categoria
        1 - Funcionario - CRUD de produto, cliente
    */
    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail">
                    <Form.Label>Usuário:</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="usuario"
                        name="usuario"
                        placeholder="Informe o usuário" 
                        ref={nomeUsuario}
                        />
                    <Form.Text className="text-muted">
                        Nunca compartilhe suas credenciais de acesso.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        id="senha"
                        name="senha"
                        ref={senha}
                         />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}