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
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  nome: { fontSize: 11, fontWeight: '500', color: '#374151', textAlign: 'center' },
});