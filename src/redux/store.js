import {configureStore} from '@reduxjs/toolkit';
import categoriaSlice from './categoriaReducer';
import produtoSlice from './produtoReducer';
import fornecedorSlice from './fornecedorReducer';
import clienteSlice from './clienteReducer';
import usuarioSlice from './usuarioReducer'

const store = configureStore({
    reducer:{
        categoria: categoriaSlice,
        produto: produtoSlice,
        fornecedor: fornecedorSlice,
        cliente: clienteSlice,
        usuario: usuarioSlice,
    }
});

export default store;