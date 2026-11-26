import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Cabeçalho azul das telas internas (mesmo estilo do header da Início)
// Props: titulo, subtitulo, onVoltar (opcional), children (ex.: SearchBar)
export default function ScreenHeader({ titulo, subtitulo, onVoltar, children }) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {onVoltar && (
          <TouchableOpacity style={styles.backBtn} onPress={onVoltar}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <View>
          {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
          <Text style={styles.titulo}>{titulo}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1746B0',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 27,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subtitulo: { fontSize: 11, color: '#dbeafe', marginBottom: 4, letterSpacing: 0.4 },
  titulo: { fontSize: 23, fontWeight: '800', color: '#fff', letterSpacing: -0.4 },
});