import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Ícone e cor por categoria da notificação
const ESTILOS = {
  Notícias: { icone: 'newspaper-outline', cor: '#1d4ed8', fundo: '#dbeafe' },
  Serviços: { icone: 'grid-outline', cor: '#15803d', fundo: '#dcfce7' },
  Avisos: { icone: 'alert-circle-outline', cor: '#b91c1c', fundo: '#fee2e2' },
  Obras: { icone: 'construct-outline', cor: '#b45309', fundo: '#fef3c7' },
  Eventos: { icone: 'calendar-outline', cor: '#7e22ce', fundo: '#f3e8ff' },
};

export default function NotificationCard({ notificacao, onPress }) {
  const estilo = ESTILOS[notificacao.categoria] || ESTILOS['Notícias'];
  return (
    <TouchableOpacity
      style={[styles.card, !notificacao.lida && styles.cardNaoLida]}
      onPress={() => onPress(notificacao)}>
      <View style={[styles.iconBox, { backgroundColor: estilo.fundo }]}>
        <Ionicons name={estilo.icone} size={20} color={estilo.cor} />
      </View>
      <View style={styles.info}>
        <View style={styles.linhaTitulo}>
          <Text style={styles.titulo} numberOfLines={1}>
            {notificacao.titulo}
          </Text>
          {!notificacao.lida && <View style={styles.ponto} />}
        </View>
        <Text style={styles.mensagem} numberOfLines={2}>
          {notificacao.mensagem}
        </Text>
        <Text style={styles.data}>{notificacao.data}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardNaoLida: { borderColor: '#bfdbfe', backgroundColor: '#f8fbff' },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  info: { flex: 1, gap: 2 },
  linhaTitulo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  titulo: { fontSize: 13, fontWeight: 'bold', color: '#1f2937', flexShrink: 1 },
  ponto: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444' },
  mensagem: { fontSize: 12, color: '#4b5563' },
  data: { fontSize: 10, color: '#9ca3af', marginTop: 2 },
});