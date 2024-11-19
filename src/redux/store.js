import {configureStore} from '@reduxjs/toolkit';
import categoriaSlice from './categoriaReducer';
import produtoSlice from './produtoReducer';
import fornecedorSlice from './fornecedorReducer';
import clienteSlice from './clienteReducer';


const store = configureStore({
    reducer:{
        categoria: categoriaSlice,
        produto: produtoSlice,
        fornecedor: fornecedorSlice,
        cliente: clienteSlice,
    }
});

export default store;