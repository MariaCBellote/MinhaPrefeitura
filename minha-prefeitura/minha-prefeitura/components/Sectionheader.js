import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SectionHeader({ titulo, acao, onAcao }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {acao ? (
        <TouchableOpacity onPress={onAcao}>
          <Text style={styles.acao}>{acao}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titulo: { fontSize: 15, fontWeight: 'bold', color: '#1f2937' },
  acao: { fontSize: 12, color: '#1d4ed8', fontWeight: '600' },
});