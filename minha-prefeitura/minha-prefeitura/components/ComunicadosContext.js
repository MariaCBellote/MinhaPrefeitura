
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import {
  alertasMock,
  notificacoesMock
} from '../data/mockData';

const ComunicadosContext = createContext();

export function ComunicadosProvider({ children }) {

  const [alertaAtual, setAlertaAtual] = useState(
    alertasMock[0]
  );

  const [notificacoes, setNotificacoes] = useState(
    notificacoesMock.slice(0, 2).map(item => ({
      ...item,
      lida: false
    }))
  );

  // Evita repetir o mesmo alerta consecutivamente
  const escolherAleatorio = (lista, atualId) => {
    const outrasOpcoes = lista.filter(
      item => item.id !== atualId
    );

    const indice = Math.floor(
      Math.random() * outrasOpcoes.length
    );

    return outrasOpcoes[indice];
  };

  useEffect(() => {

    const intervalo = setInterval(() => {

      // Alterna o aviso da tela inicial
      setAlertaAtual(atual => {
        return escolherAleatorio(
          alertasMock,
          atual.id
        );
      });

      // Adiciona uma nova notificação
      setNotificacoes(anteriores => {

        const nova = escolherAleatorio(
          notificacoesMock,
          null
        );

        return [
          {
            ...nova,
            id: `${nova.id}-${Date.now()}`,
            lida: false,
            data: new Date().toLocaleDateString('pt-BR')
          },
          ...anteriores
        ].slice(0, 20);

      });

    }, 30000); // 30 segundos para teste

    return () => clearInterval(intervalo);

  }, []);

  // Marcar uma notificação como lida
  const marcarComoLida = (id) => {
    setNotificacoes(anteriores =>
      anteriores.map(item =>
        item.id === id
          ? { ...item, lida: true }
          : item
      )
    );
  };

  // Marcar todas como lidas
  const marcarTodasComoLidas = () => {
    setNotificacoes(anteriores =>
      anteriores.map(item => ({
        ...item,
        lida: true
      }))
    );
  };

  const naoLidas = notificacoes.filter(
    item => !item.lida
  ).length;

  return (
    <ComunicadosContext.Provider
      value={{
        alertaAtual,
        notificacoes,
        naoLidas,
        marcarComoLida,
        marcarTodasComoLidas
      }}
    >
      {children}
    </ComunicadosContext.Provider>
  );
}

export function useComunicados() {
  return useContext(ComunicadosContext);
}
