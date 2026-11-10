import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { coresCategoriaMock } from '../data/mockData';

export default function CategoryTag({ categoria }) {
  const cor = coresCategoriaMock[categoria] || { fundo: '#dbeafe', texto: '#1d4ed8' };
  return (
    <View style={[styles.tag, { backgroundColor: cor.fundo }]}>
      <Text style={[styles.texto, { color: cor.texto }]}>{categoria}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  texto: { fontSize: 10, fontWeight: '600' },
});