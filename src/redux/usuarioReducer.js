import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";
const urlBase = 'https://back-delta-gray.vercel.app/usuario';
//const urlBase = 'http://localhost:4000/usuario';
//Thunks
export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async (email) => {
    try {
        const resposta = await fetch(urlBase+"/"+email, { method: "GET" });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: dados.status,
                mensagem: "",
                listaUsuarios: dados.listaUsuarios
            }
        }
        else {
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                listaUsuarios: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: "Erro ao recuperar usuarios:" + erro.message,
            listaUsuarios: []
        }
    }
});

export const adicionarUsuario = createAsyncThunk('adicionarUsuario', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const dados = await resposta.json();
        if (dados.status){
            usuario.codigo = dados.codigoGerado
            return {
                status: dados.status,
                usuario,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar o usuario: " + erro.message
        }
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                usuario,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível atualizar o usuario: " + erro.message
        }
    }
});

export const removerUsuario = createAsyncThunk('removerUsuario', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const dados = await resposta.json();
        if (dados.status){
            return {
                status: dados.status,
                usuario,
                mensagem: dados.mensagem
            }
        }
        else{
            return {
                status: dados.status,
                mensagem: dados.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível excluir o usuario: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: []
}

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuarios.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Buscando usuarios...';
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = "Usuarios recuperados do backend!";
                    state.usuarios = action.payload.listaUsuarios;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = [];
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.usuarios = [];
            })
            .addCase(adicionarUsuario.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(adicionarUsuario.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.usuarios.push(action.payload.usuario);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(adicionarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(atualizarUsuario.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    const indice = state.usuarios.findIndex((usuario) => usuario.codigo === action.payload.usuario.codigo);
                    state.usuarios[indice]=action.payload.usuario;
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(removerUsuario.pending, (state, action) =>{
                state.estado = ESTADO.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(removerUsuario.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    //É preciso também atualizar o estado da aplicação e não somente o backend
                    state.usuarios = state.usuarios.filter((usuario) => usuario.codigo !== action.payload.usuario.codigo);
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(removerUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioSlice.reducer;
//