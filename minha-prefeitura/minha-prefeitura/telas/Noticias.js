import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/Searchbar';
import CategoryChips from '../components/Categorychips';
import NewsCard from '../components/Newscard';
import EmptyState from '../components/Emptystate';
import { noticiasMock, categoriasNoticiasMock } from '../data/mockData';

export default function Noticias() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  const noticiasFiltradas = useMemo(
    () =>
      noticiasMock.filter((n) => {
        const okCategoria = categoria === 'Todas' || n.categoria === categoria;
        const okBusca = n.titulo.toLowerCase().includes(busca.toLowerCase());
        return okCategoria && okBusca;
      }),
    [busca, categoria]
  );

  const abrirDetalhes = (noticia) => navigation.navigate('DetalhesNoticia', { noticia });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader titulo="Notícias" subtitulo="Fique por dentro da cidade">
          <SearchBar value={busca} onChangeText={setBusca} placeholder="Buscar notícias..." />
        </ScreenHeader>

        <View style={styles.chips}>
          <CategoryChips
            categorias={categoriasNoticiasMock}
            selecionada={categoria}
            onSelect={setCategoria}
          />
        </View>

        <View style={styles.lista}>
          {noticiasFiltradas.length === 0 ? (
            <EmptyState mensagem="Nenhuma notícia encontrada." />
          ) : (
            noticiasFiltradas.map((n) => <NewsCard key={n.id} noticia={n} onPress={abrirDetalhes} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  scroll: { paddingBottom: 80 },
  chips: { marginTop: 16 },
  lista: { paddingHorizontal: 16, marginTop: 16, gap: 10 },
});