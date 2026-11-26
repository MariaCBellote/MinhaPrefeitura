
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ServiceCard({ servico, onPress }) {
  if (!servico) return null;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() => onPress && onPress(servico)}
    >
      {/* Ícone do serviço */}
      <View
        style={[
          styles.iconeContainer,
          {
            backgroundColor: servico.fundo || '#EAF0FF',
          },
        ]}
      >
        <Ionicons
          name={servico.icone || 'apps-outline'}
          size={27}
          color={servico.cor || '#1746B0'}
        />
      </View>

      {/* Nome */}
      <Text style={styles.titulo} numberOfLines={2}>
        {servico.nome || 'Serviço'}
      </Text>

      {/* Descrição */}
      <Text style={styles.descricao}>
        {servico.descricao || 'Confira as informações deste serviço.'}
      </Text>

      {/* Acesso */}
      <View style={styles.acessar}>
        <Text style={styles.textoAcessar}>
          Acessar serviço
        </Text>

        <Ionicons
          name="arrow-forward"
          size={15}
          color="#1746B0"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 190,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7EDF5',
    elevation: 2,
    shadowColor: '#173B70',
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  iconeContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  titulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 7,
  },

  descricao: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 17,
    flex: 1,
  },

  acessar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 5,
  },

  textoAcessar: {
    color: '#1746B0',
    fontSize: 11,
    fontWeight: '700',
  },
});
