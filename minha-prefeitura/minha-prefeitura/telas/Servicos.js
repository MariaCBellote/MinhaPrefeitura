import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '../components/ScreenHeader';

export default function Servicos() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader
          titulo="Serviços"
          subtitulo="Tudo que você precisa"
        />

        <View style={styles.card}>
          <View style={styles.icone}>
            <Ionicons name="construct-outline" size={30} color="#1746B0" />
          </View>
          <Text style={styles.titulo}>Catálogo em atualização</Text>
          <Text style={styles.descricao}>
            A API atualmente conectada disponibiliza notícias e notificações,
            mas ainda não possui um endpoint de serviços municipais.
          </Text>
          <Text style={styles.observacao}>
            Para evitar informações fictícias, esta área será preenchida quando
            a prefeitura disponibilizar os dados de serviços.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  scroll: { paddingBottom: 80 },
  card: {
    margin: 18,
    marginTop: 24,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 2,
    shadowColor: '#173b70',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icone: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: '#e8efff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  titulo: { fontSize: 19, fontWeight: '800', color: '#1e293b', textAlign: 'center' },
  descricao: { fontSize: 14, color: '#475569', lineHeight: 22, textAlign: 'center', marginTop: 10 },
  observacao: { fontSize: 12, color: '#8492a6', lineHeight: 19, textAlign: 'center', marginTop: 12 },
});
