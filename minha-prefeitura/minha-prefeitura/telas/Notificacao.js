import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

import ScreenHeader from '../components/ScreenHeader';
import NotificationCard from '../components/Notificationcard';
import EmptyState from '../components/Emptystate';
import { notificacoesMock, noticiasMock } from '../data/mockData';

export default function Notificacao({ navigation }) {
  const [notificacoes, setNotificacoes] = useState(notificacoesMock);
  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  const marcarTodasComoLidas = () =>
    setNotificacoes((lista) => lista.map((n) => ({ ...n, lida: true })));

  // Marca como lida e leva o usuário à tela correspondente
  const abrirNotificacao = (notificacao) => {
    setNotificacoes((lista) =>
      lista.map((n) => (n.id === notificacao.id ? { ...n, lida: true } : n))
    );

    const { destino } = notificacao;
    if (!destino) return;

    if (destino.tipo === 'noticia') {
      const noticia = noticiasMock.find((n) => n.id === destino.id);
      if (noticia) navigation.navigate('DetalhesNoticia', { noticia });
    } else if (destino.tipo === 'servico') {
      navigation.navigate('Principal', {
        screen: 'Serviços',
        params: { servicoId: destino.id },
      });
    } else if (destino.tipo === 'aba') {
      navigation.navigate('Principal', { screen: destino.nome });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader
          titulo="Notificações"
          subtitulo={naoLidas > 0 ? `${naoLidas} não lida(s)` : 'Tudo em dia'}
          onVoltar={() => navigation.goBack()}
        />

        <View style={styles.lista}>
          {naoLidas > 0 && (
            <TouchableOpacity onPress={marcarTodasComoLidas} style={styles.acao}>
              <Text style={styles.acaoTexto}>Marcar todas como lidas</Text>
            </TouchableOpacity>
          )}

          {notificacoes.length === 0 ? (
            <EmptyState mensagem="Você não tem notificações." />
          ) : (
            notificacoes.map((n) => (
              <NotificationCard key={n.id} notificacao={n} onPress={abrirNotificacao} />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scroll: { paddingBottom: 40 },
  lista: { paddingHorizontal: 16, marginTop: 16, gap: 10 },
  acao: { alignSelf: 'flex-end' },
  acaoTexto: { fontSize: 12, fontWeight: '600', color: '#1d4ed8' },
});