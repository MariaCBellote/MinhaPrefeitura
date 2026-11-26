
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function AtalhoVacinacao({
  titulo,
  descricao,
  icone,
  cor,
  fundo,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconeContainer,
          { backgroundColor: fundo || '#EAF0FF' },
        ]}
      >
        <Ionicons
          name={icone}
          size={25}
          color={cor || '#1746B0'}
        />
      </View>

      <Text style={styles.titulo}>
        {titulo}
      </Text>

      <Text style={styles.descricao}>
        {descricao}
      </Text>

      <View style={styles.rodape}>
        <Text style={styles.acessar}>
          Acessar
        </Text>

        <Ionicons
          name="arrow-forward"
          size={14}
          color="#1746B0"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 170,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 13,
    borderWidth: 1,
    borderColor: '#E7EDF5',
    elevation: 2,
    shadowColor: '#173B70',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  iconeContainer: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },

  titulo: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 5,
  },

  descricao: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 15,
    flex: 1,
  },

  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
  },

  acessar: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1746B0',
  },
});
