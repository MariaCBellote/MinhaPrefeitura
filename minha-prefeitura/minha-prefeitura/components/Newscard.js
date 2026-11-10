import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryTag from './Categorytag';

// Card de notícia (reutilizável na Início e na tela Notícias)
export default function NewsCard({ noticia, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(noticia)}>
      <Image source={{ uri: noticia.imagem }} style={styles.imagem} />
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
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imagem: { width: 70, height: 70, borderRadius: 8, backgroundColor: '#e5e7eb' },
  info: { flex: 1, marginLeft: 10, justifyContent: 'space-between' },
  titulo: { fontSize: 12, fontWeight: 'bold', color: '#1f2937' },
  data: { fontSize: 10, color: '#9ca3af' },
});