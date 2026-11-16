
import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import ScreenHeader from '../components/ScreenHeader';
import NotificationCard from '../components/Notificationcard';
import AlertaCard from '../components/AlertaCard';
import EmptyState from '../components/Emptystate';
import { useFetch, LoadingState, ErrorState } from '../components/ApiStates';
import { listarNotificacoes } from '../data/API';

export default function Notificacao({ navigation }) {
  const { data, loading, error, recarregar } = useFetch(listarNotificacoes);

  const [lidas, setLidas] = useState([]);

  // Adiciona o estado de leitura aos dados recebidos da API
  const notificacoes = useMemo(
    () => (data || []).map((n) => ({
      ...n,
      lida: lidas.includes(n.id)
    })),
    [data, lidas]
  );

  // Separa alertas e notificações pelo título
  const alertas = notificacoes.filter((n) =>
    n.titulo?.toLowerCase().includes('alerta')
  );

  const notificacoesComuns = notificacoes.filter((n) =>
    !n.titulo?.toLowerCase().includes('alerta')
  );

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  // Marca todas como lidas localmente
  const marcarTodasComoLidas = () => {
    setLidas(notificacoes.map((n) => n.id));
  };

  // Marca como lida e abre os detalhes
  const abrirNotificacao = (notificacao) => {
    setLidas((l) =>
      l.includes(notificacao.id) ? l : [...l, notificacao.id]
    );

    navigation.navigate('DetalhesNotificacao', {
      notificacao,
      notificacaoId: notificacao.id
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ScreenHeader
          titulo="Notificações"
          subtitulo={
            naoLidas > 0
              ? `${naoLidas} não lida(s)`
              : 'Tudo em dia'
          }
          onVoltar={() => navigation.goBack()}
        />

        {loading ? (
          <LoadingState mensagem="Carregando notificações..." />
        ) : error ? (
          <ErrorState
            mensagem={error}
            onTentarNovamente={recarregar}
          />
        ) : (
          <View style={styles.lista}>

            {naoLidas > 0 && (
              <TouchableOpacity
                onPress={marcarTodasComoLidas}
                style={styles.acao}
              >
                <Text style={styles.acaoTexto}>
                  Marcar todas como lidas
                </Text>
              </TouchableOpacity>
            )}

            {notificacoes.length === 0 ? (
              <EmptyState mensagem="Você não tem notificações." />
            ) : (
              <>
                {/* Quadro de alertas */}
                {alertas.length > 0 && (
                  <View style={styles.secao}>
                    <Text style={styles.secaoTitulo}>
                      Alertas
                    </Text>

                    {alertas.map((n) => (
                      <AlertaCard
                        key={n.id}
                        alerta={n}
                        onPress={() => abrirNotificacao(n)}
                      />
                    ))}
                  </View>
                )}

                {/* Quadro de notificações comuns */}
                {notificacoesComuns.length > 0 && (
                  <View style={styles.secao}>
                    <Text style={styles.secaoTitulo}>
                      Notificações
                    </Text>

                    {notificacoesComuns.map((n) => (
                      <NotificationCard
                        key={n.id}
                        notificacao={n}
                        onPress={abrirNotificacao}
                      />
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },
  scroll: {
    paddingBottom: 40
  },
  lista: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10
  },
  secao: {
    marginBottom: 16
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12
  },
  acao: {
    alignSelf: 'flex-end',
    marginBottom: 8
  },
  acaoTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8'
  }
});
