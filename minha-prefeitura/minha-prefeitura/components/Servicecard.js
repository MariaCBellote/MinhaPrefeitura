import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Item do grid de serviços. servico.lib: 'ION' | 'MCI'
export default function ServiceCard({ servico, onPress }) {
  const Icone = servico.lib === 'MCI' ? MaterialCommunityIcons : Ionicons;
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(servico)}>
      <View style={[styles.iconBox, { backgroundColor: servico.fundo }]}>
        <Icone name={servico.icone} size={22} color={servico.cor} />
      </View>
      <Text style={styles.nome} numberOfLines={2}>
        {servico.nome}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '31%',
    minHeight: 112,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 2,
    shadowColor: '#173b70',
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
  },
  nome: { fontSize: 11, fontWeight: '700', color: '#374151', textAlign: 'center' },
});