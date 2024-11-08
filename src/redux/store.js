import {configureStore} from '@reduxjs/toolkit';
import categoriaSlice from './categoriaReducer';
import produtoSlice from './produtoReducer';


const store = configureStore({
    reducer:{
        categoria: categoriaSlice,
        produto: produtoSlice,
    }
});

export default store;