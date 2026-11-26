
import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '../components/ScreenHeader';
import ServiceCard from '../components/Servicecard';
import FiltroServicos from '../components/FiltroServicos';

// Dados dos serviços organizados por categoria
const categorias = [
  {
    titulo: 'Saúde',
    descricao: 'Cuide de você e da sua família',
    servicos: [
      {
        nome: 'Vacinação',
        descricao: 'Consulte campanhas, vacinas e informações para agendamento.',
        icone: 'medkit-outline',
        cor: '#16845B',
        fundo: '#E5F5ED',
        tela: 'Vacinacao',
      },
    ],
  },

  {
    titulo: 'Cultura e Lazer',
    descricao: 'Descubra o que acontece na região',
    servicos: [
      {
        nome: 'Agenda de eventos',
        descricao: 'Shows, festivais, feiras, eventos gratuitos e programação cultural.',
        icone: 'ticket-outline',
        cor: '#8B5CF6',
        fundo: '#F1EAFE',
        tela: 'AgendaEventos',
      },
      {
        nome: 'Cursos e oficinas',
        descricao: 'Conheça cursos, oficinas e atividades gratuitas.',
        icone: 'school-outline',
        cor: '#8B5CF6',
        fundo: '#F1EAFE',
        tela: 'CursosOficinas',
      },
    ],
  },

  {
    titulo: 'Participação Cidadã',
    descricao: 'Sua opinião também transforma a cidade',
    servicos: [
      {
        nome: 'Enquetes',
        descricao: 'Vote a favor ou contra propostas e acompanhe os resultados.',
        icone: 'podium-outline',
        cor: '#D97706',
        fundo: '#FEF3E2',
        tela: 'Enquetes',
      },
    ],
  },

  {
    titulo: 'Serviços Urbanos',
    descricao: 'Informações úteis para o dia a dia',
    servicos: [
      {
        nome: 'Coleta e reciclagem',
        descricao: 'Consulte coleta de lixo, coleta seletiva e ecopontos.',
        icone: 'trash-outline',
        cor: '#0D9488',
        fundo: '#E0F5F2',
        tela: 'ColetaReciclagem',
      },
      {
        nome: 'Mobilidade urbana',
        descricao: 'Consulte informações de trânsito, transporte e ciclovias.',
        icone: 'bus-outline',
        cor: '#0D9488',
        fundo: '#E0F5F2',
        tela: 'MobilidadeUrbana',
      },
    ],
  },

  {
    titulo: 'Causa Animal',
    descricao: 'Proteção, cuidado e incentivo à adoção',
    servicos: [
      {
        nome: 'Adoção de animais',
        descricao: 'Encontre feiras de adoção e cadastre eventos para divulgar.',
        icone: 'paw-outline',
        cor: '#DB7A35',
        fundo: '#FFF0E5',
        tela: 'AdocaoAnimais',
      },
      {
        nome: 'Bem-estar animal',
        descricao: 'Conheça campanhas de castração, vacinação e proteção animal.',
        icone: 'heart-outline',
        cor: '#DB7A35',
        fundo: '#FFF0E5',
        tela: 'BemEstarAnimal',
      },
    ],
  },
];

export default function Servicos({ navigation }) {
  // Estados dos filtros
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  // Nomes das categorias disponíveis
  const nomesCategorias = categorias.map(
    (categoria) => categoria.titulo
  );

  // Aplica a pesquisa e o filtro de categoria
  const servicosFiltrados = categorias
    .map((categoria) => {
      const servicos = categoria.servicos.filter((servico) => {
        const texto = pesquisa.toLowerCase().trim();

        const correspondePesquisa =
          servico.nome.toLowerCase().includes(texto) ||
          servico.descricao.toLowerCase().includes(texto);

        const correspondeCategoria =
          categoriaSelecionada === 'Todas' ||
          categoria.titulo === categoriaSelecionada;

        return correspondePesquisa && correspondeCategoria;
      });

      return {
        ...categoria,
        servicos,
      };
    })
    .filter((categoria) => categoria.servicos.length > 0);

  // Calcula a quantidade de resultados
  const quantidadeResultados = servicosFiltrados.reduce(
    (total, categoria) => total + categoria.servicos.length,
    0
  );

  // Abre a tela do serviço selecionado
  const abrirServico = (servico) => {
    navigation.navigate(servico.tela);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <ScreenHeader
          titulo="Serviços"
          subtitulo="Tudo que você precisa"
        />

        {/* Apresentação */}
        <View style={styles.apresentacao}>
          <View style={styles.apresentacaoTexto}>
            <Text style={styles.apresentacaoTitulo}>
              O que você precisa hoje?
            </Text>

            <Text style={styles.apresentacaoDescricao}>
              Encontre serviços, participe da cidade e fique por dentro
              das oportunidades disponíveis.
            </Text>
          </View>

          <View style={styles.apresentacaoIcone}>
            <Ionicons
              name="grid-outline"
              size={30}
              color="#1746B0"
            />
          </View>
        </View>

        {/* Filtro de serviços */}
        <FiltroServicos
          pesquisa={pesquisa}
          setPesquisa={setPesquisa}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          categorias={nomesCategorias}
          quantidadeResultados={quantidadeResultados}
        />

        {/* Categorias e serviços filtrados */}
        {servicosFiltrados.map((categoria) => (
          <View
            key={categoria.titulo}
            style={styles.categoria}
          >
            <View style={styles.cabecalhoCategoria}>
              <Text style={styles.tituloCategoria}>
                {categoria.titulo}
              </Text>

              <Text style={styles.descricaoCategoria}>
                {categoria.descricao}
              </Text>
            </View>

            <View style={styles.grade}>
              {categoria.servicos.map((servico) => (
                <ServiceCard
                  key={servico.tela}
                  servico={servico}
                  onPress={abrirServico}
                />
              ))}
            </View>
          </View>
        ))}

        {/* Mensagem quando nenhum serviço é encontrado */}
        {quantidadeResultados === 0 && (
          <View style={styles.semResultados}>
            <Ionicons
              name="search-outline"
              size={38}
              color="#94A3B8"
            />

            <Text style={styles.semResultadosTitulo}>
              Nenhum serviço encontrado
            </Text>

            <Text style={styles.semResultadosDescricao}>
              Tente pesquisar com outro termo ou selecionar outra categoria.
            </Text>
          </View>
        )}

        {/* Rodapé */}
        <View style={styles.rodape}>
          <Ionicons
            name="information-circle-outline"
            size={17}
            color="#94A3B8"
          />

          <Text style={styles.textoRodape}>
            Alguns serviços estão em desenvolvimento e receberão novas
            funcionalidades nas próximas atualizações.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    paddingBottom: 100,
  },

  apresentacao: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
    backgroundColor: '#EAF0FF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  apresentacaoTexto: {
    flex: 1,
    paddingRight: 12,
  },

  apresentacaoTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#173B70',
  },

  apresentacaoDescricao: {
    fontSize: 12,
    color: '#526783',
    lineHeight: 19,
    marginTop: 6,
  },

  apresentacaoIcone: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoria: {
    marginTop: 24,
    marginHorizontal: 18,
  },

  cabecalhoCategoria: {
    marginBottom: 13,
  },

  tituloCategoria: {
    fontSize: 17,
    fontWeight: '800',
    color: '#173B70',
  },

  descricaoCategoria: {
    fontSize: 12,
    color: '#8492A6',
    marginTop: 4,
  },

  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  semResultados: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 45,
    marginHorizontal: 18,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7EDF5',
  },

  semResultadosTitulo: {
    fontSize: 15,
    fontWeight: '800',
    color: '#334155',
    marginTop: 12,
  },

  semResultadosDescricao: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },

  rodape: {
    marginHorizontal: 22,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },

  textoRodape: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 17,
  },
});
