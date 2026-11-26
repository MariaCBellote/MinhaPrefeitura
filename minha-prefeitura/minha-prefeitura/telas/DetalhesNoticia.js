import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '../components/ScreenHeader';
import CategoryTag from '../components/Categorytag';
import { useFetch, LoadingState, ErrorState } from '../components/ApiStates';
import { buscarNoticia } from '../data/API';

// Recebe { noticia } (vindo da lista) OU { noticiaSlug } (vindo de uma notificação).
// Sempre busca o detalhe completo na API pelo slug.
export default function DetalhesNoticia({ route, navigation }) {
  const { noticia: noticiaInicial, noticiaSlug } = route.params || {};
  const slug = noticiaSlug || noticiaInicial?.slug;

  const { data, loading, error, recarregar } = useFetch(
    () => (slug ? buscarNoticia(slug) : Promise.resolve(noticiaInicial)),
    [slug]
  );
  const noticia = data || noticiaInicial;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader
          titulo="Detalhes da notícia"
          subtitulo="Minha Prefeitura"
          onVoltar={() => navigation.goBack()}
        />

        {loading && !noticia ? (
          <LoadingState />
        ) : error && !noticia ? (
          <ErrorState mensagem={error} onTentarNovamente={recarregar} />
        ) : noticia ? (
          <View style={styles.card}>
            {noticia.imagem ? <Image source={{ uri: noticia.imagem }} style={styles.imagem} /> : null}
            <View style={styles.corpo}>
              <CategoryTag categoria={noticia.categoria} />
              <Text style={styles.titulo}>{noticia.titulo}</Text>
              <Text style={styles.data}>
                <Ionicons name="calendar-outline" size={12} color="#9ca3af" /> {noticia.data}
              </Text>
              <Text style={styles.conteudo}>{noticia.conteudo || noticia.resumo}</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  scroll: { paddingBottom: 40 },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 2,
    shadowColor: '#173b70',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    overflow: 'hidden',
  },
  imagem: { width: '100%', height: 220, backgroundColor: '#e5e7eb' },
  corpo: { padding: 20, gap: 11 },
  titulo: { fontSize: 21, fontWeight: '800', lineHeight: 28, color: '#1f2937' },
  data: { fontSize: 11, color: '#9ca3af' },
  conteudo: { fontSize: 15, color: '#475569', lineHeight: 25, marginTop: 7 },
});