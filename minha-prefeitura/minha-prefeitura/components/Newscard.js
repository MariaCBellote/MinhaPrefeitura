import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryTag from './Categorytag';

// Card de notícia (reutilizável na Início e na tela Notícias)
export default function NewsCard({ noticia, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(noticia)}>
      {noticia.imagem ? <Image source={{ uri: noticia.imagem }} style={styles.imagem} /> : <View style={[styles.imagem, styles.imagemVazia]}><Ionicons name="newspaper-outline" size={27} color="#7890b8" /></View>}
      <View style={styles.info}>
        <CategoryTag categoria={noticia.categoria} />
        <Text style={styles.titulo} numberOfLines={2}>
          {noticia.titulo}
        </Text>
        <Text style={styles.data}>
          <Ionicons name="time-outline" size={12} color="#9ca3af" /> {noticia.tempo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 17,
    padding: 11,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 2,
    shadowColor: '#173b70',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  imagem: { width: 94, height: 94, borderRadius: 12, backgroundColor: '#e5e7eb' },
  info: { flex: 1, marginLeft: 13, justifyContent: 'space-between', paddingVertical: 2 },
  titulo: { fontSize: 13, fontWeight: '800', lineHeight: 18, color: '#1f2937' },
  data: { fontSize: 11, color: '#8492a6' },
  imagemVazia: { alignItems: 'center', justifyContent: 'center' },
});