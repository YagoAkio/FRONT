import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ESTADO from "../../recursos/estado";
import { buscarUsuarios, removerUsuario } from "../../redux/usuarioReducer";

export default function TabelaUsuarios(props) {
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

    function excluirUsuario(usuario) {
        if (window.confirm("Deseja realmente excluir este usuário?")) {
            dispatch(removerUsuario(usuario));
        }
    }

    function editarUsuario(usuario) {
        props.setUsuarioParaEdicao(usuario);
        props.setModoEdicao(true);
        props.exibirFormulario(true);
    }

    // Função para mascarar a senha com a quantidade certa de asteriscos
    function mascaraSenha(senha) {
        return "*".repeat(senha.length);  // Cria uma string de asteriscos com o mesmo tamanho da senha
    }

    return (
        <Container>
            <Button
                type="button"
                onClick={() => {
                    props.exibirFormulario(true);
                }}
            >
                Novo Usuário
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Email</th>
                        <th>Senha</th>
                        <th>Prioridade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.codigo}>
                            <td>{usuario.codigo}</td>
                            <td>{usuario.email}</td>
                            <td>{mascaraSenha(usuario.senha)}</td> {/* Senha mascarada com o comprimento correto */}
                            <td>{usuario.prioridade}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => excluirUsuario(usuario)}
                                >
                                    Excluir
                                </Button>{" "}
                                <Button
                                    variant="warning"
                                    onClick={() => editarUsuario(usuario)}
                                >
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
