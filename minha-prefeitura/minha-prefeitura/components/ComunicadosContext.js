import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { listarNotificacoes } from '../data/API';

const ComunicadosContext = createContext(null);

export function ComunicadosProvider({ children }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      const dados = await listarNotificacoes();
      setNotificacoes((anteriores) =>
        dados.map((item) => ({
          ...item,
          lida: anteriores.find((n) => n.id === item.id)?.lida ?? false,
        }))
      );
    } catch (e) {
      setErro(e.message || 'Não foi possível carregar os comunicados.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
    const intervalo = setInterval(carregar, 60000);
    return () => clearInterval(intervalo);
  }, [carregar]);

  const marcarComoLida = (id) => {
    setNotificacoes((lista) =>
      lista.map((item) => item.id === id ? { ...item, lida: true } : item)
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((lista) => lista.map((item) => ({ ...item, lida: true })));
  };

  const alertas = notificacoes.filter((item) =>
    item.titulo?.toLocaleLowerCase('pt-BR').includes('alerta')
  );
  const naoLidas = notificacoes.filter((item) => !item.lida).length;

  return (
    <ComunicadosContext.Provider value={{
      notificacoes,
      alertas,
      alertaAtual: alertas[0] || null,
      naoLidas,
      carregando,
      erro,
      recarregar: carregar,
      marcarComoLida,
      marcarTodasComoLidas,
    }}>
      {children}
    </ComunicadosContext.Provider>
  );
}

export function useComunicados() {
  return useContext(ComunicadosContext);
}
