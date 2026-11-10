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
  container: { paddingHorizontal: 16, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipAtivo: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  texto: { fontSize: 12, fontWeight: '600', color: '#374151' },
  textoAtivo: { color: '#fff' },
});