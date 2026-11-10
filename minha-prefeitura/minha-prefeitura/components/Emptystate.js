import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyState({ mensagem }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={32} color="#9ca3af" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 40 },
  texto: { marginTop: 8, fontSize: 13, color: '#6b7280' },
});