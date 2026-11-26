
import React, { createContext, useState } from 'react';

import {
  listarUsuarios,
  buscarUsuario,
  salvarUsuario,
  atualizarUsuarioSalvo,
} from '../data/InfoUsuarios';

export const UsuarioContext = createContext({});

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(() => listarUsuarios());

  // Cadastrar usuário
  const cadastrar = (dados) => {
    const resultado = salvarUsuario(dados);

    if (!resultado.sucesso) {
      return resultado;
    }

    // Atualiza a lista de usuários
    setUsuarios(listarUsuarios());

    // Entra automaticamente na conta recém-criada
    const dadosPerfil = { ...resultado.usuario };
    delete dadosPerfil.senha;

    setUsuario(dadosPerfil);

    return {
      sucesso: true,
      mensagem: 'Cadastro realizado com sucesso!',
    };
  };

  // Fazer login
  const entrar = (email, senha) => {
    const encontrado = buscarUsuario(email);

    if (!encontrado || encontrado.senha !== senha) {
      return {
        sucesso: false,
        mensagem: 'E-mail ou senha incorretos.',
      };
    }

    const dadosPerfil = { ...encontrado };
    delete dadosPerfil.senha;

    setUsuario(dadosPerfil);

    return {
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
    };
  };

  // Atualizar dados do perfil
  const atualizarUsuario = (dados) => {
    if (!usuario) {
      return {
        sucesso: false,
        mensagem: 'Nenhum usuário está conectado.',
      };
    }

    const atualizado = atualizarUsuarioSalvo(usuario.id, dados);

    if (!atualizado) {
      return {
        sucesso: false,
        mensagem: 'Não foi possível atualizar os dados.',
      };
    }

    const dadosAtualizados = listarUsuarios().find(
      (u) => u.id === usuario.id
    );

    const dadosPerfil = { ...dadosAtualizados };
    delete dadosPerfil.senha;

    setUsuario(dadosPerfil);
    setUsuarios(listarUsuarios());

    return {
      sucesso: true,
      mensagem: 'Dados atualizados com sucesso!',
    };
  };

  // Sair da conta
  const sair = () => {
    setUsuario(null);

    return {
      sucesso: true,
    };
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        usuarios,
        cadastrar,
        entrar,
        atualizarUsuario,
        sair,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
