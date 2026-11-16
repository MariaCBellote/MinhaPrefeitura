
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function AlertaCard({ alerta, onPress }) {
  if (!alerta) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.faixa} />

      <View style={styles.conteudo}>
        <View style={styles.topo}>
          <View style={styles.identificacao}>
            <View style={styles.iconBox}>
              <Ionicons
                name="alert-circle"
                size={20}
                color="#dc2626"
              />
            </View>

            <Text style={styles.categoria}>
              COMUNICADO OFICIAL
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={19}
            color="#94a3b8"
          />
        </View>

        <Text style={styles.titulo}>
          {alerta.titulo}
        </Text>

        <Text style={styles.mensagem} numberOfLines={3}>
          {alerta.mensagem}
        </Text>

        <View style={styles.rodape}>
          <Text style={styles.abrir}>
            Ver comunicado completo
          </Text>

          <Ionicons
            name="arrow-forward"
            size={14}
            color="#b91c1c"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fee2e2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  faixa: {
    width: 5,
    backgroundColor: '#dc2626',
  },

  conteudo: {
    flex: 1,
    padding: 15,
  },

  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  identificacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoria: {
    fontSize: 9,
    fontWeight: '800',
    color: '#b91c1c',
    letterSpacing: 0.8,
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 22,
    marginBottom: 7,
  },

  mensagem: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 19,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },

  abrir: {
    fontSize: 11,
    fontWeight: '700',
    color: '#b91c1c',
  },
});
