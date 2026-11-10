import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Alert } from 'react-native';

import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/Searchbar';
import CategoryChips from '../components/Categorychips';
import SectionHeader from '../components/Sectionheader';
import ServiceCard from '../components/Servicecard';
import EmptyState from '../components/Emptystate';
import { servicosMock, categoriasServicosMock } from '../data/mockData';

export default function Servicos() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const servicosFiltrados = useMemo(
    () =>
      servicosMock.filter((s) => {
        const okCategoria = categoria === 'Todos' || s.categoria === categoria;
        const okBusca = s.nome.toLowerCase().includes(busca.toLowerCase());
        return okCategoria && okBusca;
      }),
    [busca, categoria]
  );

  // Por enquanto mostra a descrição; depois navegue para a tela de cada módulo
  const abrirServico = (servico) => Alert.alert(servico.nome, servico.descricao);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ScreenHeader titulo="Serviços" subtitulo="Tudo que você precisa">
          <SearchBar value={busca} onChangeText={setBusca} placeholder="Buscar serviços..." />
        </ScreenHeader>

        <View style={styles.chips}>
          <CategoryChips
            categorias={categoriasServicosMock}
            selecionada={categoria}
            onSelect={setCategoria}
          />
        </View>

        <View style={styles.secao}>
          <SectionHeader titulo="Serviços e Utilidades" />
          {servicosFiltrados.length === 0 ? (
            <EmptyState mensagem="Nenhum serviço encontrado." />
          ) : (
            <View style={styles.grid}>
              {servicosFiltrados.map((s) => (
                <ServiceCard key={s.id} servico={s} onPress={abrirServico} />
              ))}
            </View>
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
  secao: { paddingHorizontal: 16, marginTop: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
});