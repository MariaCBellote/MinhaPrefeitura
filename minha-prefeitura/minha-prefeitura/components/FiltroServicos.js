
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function FiltroServicos({
  pesquisa,
  setPesquisa,
  categoriaSelecionada,
  setCategoriaSelecionada,
  categorias,
  quantidadeResultados,
}) {
  return (
    <View style={styles.container}>

      {/* Campo de pesquisa */}
      <View style={styles.pesquisaContainer}>
        <Ionicons
          name="search-outline"
          size={21}
          color="#94A3B8"
        />

        <TextInput
          style={styles.input}
          placeholder="Buscar serviço..."
          placeholderTextColor="#94A3B8"
          value={pesquisa}
          onChangeText={setPesquisa}
          autoCapitalize="none"
        />

        {pesquisa.length > 0 && (
          <TouchableOpacity onPress={() => setPesquisa('')}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros por categoria */}
      <View style={styles.tituloFiltro}>
        <Text style={styles.textoTitulo}>
          Categorias
        </Text>

        <TouchableOpacity
          onPress={() => {
            setPesquisa('');
            setCategoriaSelecionada('Todas');
          }}
        >
          <Text style={styles.limpar}>
            Limpar filtros
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categorias}
      >
        {['Todas', ...categorias].map((categoria) => {
          const selecionada =
            categoriaSelecionada === categoria;

          return (
            <TouchableOpacity
              key={categoria}
              style={[
                styles.botaoCategoria,
                selecionada && styles.botaoSelecionado,
              ]}
              onPress={() => setCategoriaSelecionada(categoria)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  selecionada && styles.textoSelecionado,
                ]}
              >
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Quantidade de resultados */}
      <Text style={styles.resultados}>
        {quantidadeResultados}{' '}
        {quantidadeResultados === 1
          ? 'serviço encontrado'
          : 'serviços encontrados'}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginTop: 20,
  },

  pesquisaContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: '#1E293B',
  },

  tituloFiltro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },

  textoTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#173B70',
  },

  limpar: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1746B0',
  },

  categorias: {
    gap: 8,
    paddingRight: 10,
  },

  botaoCategoria: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  botaoSelecionado: {
    backgroundColor: '#1746B0',
    borderColor: '#1746B0',
  },

  textoCategoria: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },

  textoSelecionado: {
    color: '#FFFFFF',
  },

  resultados: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 13,
  },
});
