import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';

// Filtro horizontal de categorias
export default function CategoryChips({ categorias, selecionada, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categorias.map((cat) => {
        const ativa = cat === selecionada;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            style={[styles.chip, ativa && styles.chipAtivo]}>
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 18, gap: 9, paddingVertical: 2 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chipAtivo: { backgroundColor: '#1746B0', borderColor: '#1746B0', elevation: 2 },
  texto: { fontSize: 12, fontWeight: '700', color: '#374151' },
  textoAtivo: { color: '#fff' },
});