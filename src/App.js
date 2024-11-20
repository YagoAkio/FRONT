import React, { useState, createContext,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import TelaCadastroProduto from "./telasCadastro/TelaCadastroProduto";
import Tela404 from "./telasCadastro/Tela404";
import TelaMenu from "./telasCadastro/TelaMenu";
import TelaCadastroCategoria from "./telasCadastro/TelaCadastroCategoria";
import TelaCadastroFornecedor from "./telasCadastro/TelaCadastroFornecedor";
import TelaCadastroCliente from "./telasCadastro/TelaCadastroCliente";
import TelaCadastroUsuario from "./telasCadastro/TelaCadastroUsuario";
import TelaLogin from "./telasCadastro/TelaLogin";

export const ContextoUsuario = createContext();

function App() {
  const [user, setUser] = useState({
    "usuario": "",
    "privilegio": 0,
    "logado": false
  });

  useEffect(() => {
    console.log("Estado atualizado:", user);
  }, [user]);

  return (
    <Provider store={store}>
      <ContextoUsuario.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div className="App">
            {user.logado ? (
              <Routes>
                <Route path="/clientes" element={<TelaCadastroCliente />} />
                <Route path="/produtos" element={<TelaCadastroProduto />} />
                <Route path="/" element={<TelaMenu />} />
                <Route path="*" element={<Tela404 />} />
                {
                  user.privilegio > 1 ? (
                    <>
                      <Route path="/categorias" element={<TelaCadastroCategoria />} />
                      <Route path="/fornecedores" element={<TelaCadastroFornecedor />} />
                      {
                        user.privilegio > 2 ? (
                          <>                        
                            <Route path="/usuarios" element={<TelaCadastroUsuario />} />
                          </>
                        ):(
                          <>
                            <Route path="/usuarios" element={<Tela404 mensagem="Você não tem permissão" />} />
                          </>
                        )
                      }
                    </>
                  ) : (
                  <>
                    <Route path="/categorias" element={<Tela404 mensagem="Você não tem permissão" />} />
                    <Route path="/fornecedores" element={<Tela404 mensagem="Você não tem permissão" />} />
                    <Route path="/usuarios" element={<Tela404 mensagem="Você não tem permissão" />} />
                  </>
                  )
                }
              </Routes>
            ) : (
              <TelaLogin />
            )}
            <ToastContainer />
          </div>
        </BrowserRouter>
      </ContextoUsuario.Provider>
    </Provider>
  );
}

export default App;