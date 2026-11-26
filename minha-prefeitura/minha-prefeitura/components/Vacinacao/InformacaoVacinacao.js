
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function InformacaoVacinacao({
  titulo,
  descricao,
  icone,
  itens,
  cor = '#1746B0',
  fundo = '#EFF6FF',
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <View
          style={[
            styles.iconeContainer,
            { backgroundColor: fundo },
          ]}
        >
          <Ionicons
            name={icone}
            size={22}
            color={cor}
          />
        </View>

        <Text style={styles.titulo}>
          {titulo}
        </Text>
      </View>

      {descricao ? (
        <Text style={styles.descricao}>
          {descricao}
        </Text>
      ) : null}

      {itens?.map((item, index) => (
        <View key={index} style={styles.item}>
          <Ionicons
            name="checkmark-circle"
            size={17}
            color="#16845B"
          />

          <Text style={styles.itemTexto}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7EDF5',
    padding: 16,
    marginBottom: 12,
  },

  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },

  iconeContainer: {
    width: 39,
    height: 39,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },

  descricao: {
    fontSize: 12,
    lineHeight: 19,
    color: '#64748B',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginTop: 9,
  },

  itemTexto: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
});
