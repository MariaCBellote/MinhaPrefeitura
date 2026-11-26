import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function CategoryTag({ categoria }) {
  const paleta = {
    'Saúde': ['#e0f2fe', '#0369a1'],
    'Educação': ['#f3e8ff', '#7e22ce'],
    'Obras e infraestrutura': ['#fef3c7', '#b45309'],
    'Meio ambiente': ['#dcfce7', '#15803d'],
    'Cultura e lazer': ['#fce7f3', '#be185d'],
    'Esporte': ['#ffedd5', '#c2410c'],
    'Mobilidade': ['#e0e7ff', '#4338ca'],
    'Assistência social': ['#fae8ff', '#a21caf'],
    'Administração': ['#dbeafe', '#1d4ed8'],
    'Geral': ['#e2e8f0', '#475569'],
  };
  const cores = paleta[categoria] || ['#dbeafe', '#1d4ed8'];
  const cor = { fundo: cores[0], texto: cores[1] };
  return (
    <View style={[styles.tag, { backgroundColor: cor.fundo }]}>
      <Text style={[styles.texto, { color: cor.texto }]}>{categoria}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: { alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 7 },
  texto: { fontSize: 10, fontWeight: '800' },
});