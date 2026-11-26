
import React, { useState, useEffect, useMemo } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ServiceCard from '../components/Servicecard';
import SectionHeader from '../components/Sectionheader';
import AlertaCard from '../components/AlertaCard';
import NewsCard from '../components/Newscard';
import SearchBar from '../components/Searchbar';

import {
  useFetch,
  LoadingState,
  ErrorState,
} from '../components/ApiStates';

import {
  listarNoticias,
  listarNotificacoes,
} from '../data/API';

// Serviços em destaque
const servicosDestaque = [
  {
    id: 'vacinação',
    nome: 'Vacinação',
    descricao: 'Consulte campanhas e informações sobre vacinas.',
    icone: 'medkit-outline',
    cor: '#16845B',
    fundo: '#E5F5ED',
  },
  {
    id: 'eventos',
    nome: 'Agenda de eventos',
    descricao: 'Confira shows, festivais e eventos da região.',
    icone: 'ticket-outline',
    cor: '#8B5CF6',
    fundo: '#F1EAFE',
  },
  {
    id: 'enquetes',
    nome: 'Enquetes',
    descricao: 'Participe das decisões e dê sua opinião.',
    icone: 'podium-outline',
    cor: '#D97706',
    fundo: '#FEF3E2',
  },
  {
    id: 'adocao',
    nome: 'Adoção de animais',
    descricao: 'Encontre feiras e eventos de adoção.',
    icone: 'paw-outline',
    cor: '#DB7A35',
    fundo: '#FFF0E5',
  },
];

// Normaliza o texto para facilitar a pesquisa
const normalizarTexto = (texto) => {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export default function Inicio() {
  const navigation = useNavigation();

  const [busca, setBusca] = useState('');

  const {
    data: noticias,
    loading,
    error,
    recarregar,
  } = useFetch(listarNoticias);

  const {
    data: notificacoes,
    loading: carregandoNotificacoes,
    error: erroNotificacoes,
    recarregar: recarregarNotificacoes,
  } = useFetch(listarNotificacoes);

  const termoBusca = normalizarTexto(busca);

  // Filtra os serviços
  const servicosFiltrados = useMemo(() => {
    if (!termoBusca) return servicosDestaque;

    return servicosDestaque.filter((servico) => {
      const texto = normalizarTexto(
        `${servico.nome} ${servico.descricao}`
      );

      return texto.includes(termoBusca);
    });
  }, [termoBusca]);

  // Filtra os comunicados que possuem "alerta" no título
  const alertas = useMemo(() => {
    const lista = (notificacoes || []).filter((n) =>
      n.titulo?.toLowerCase().includes('alerta')
    );

    if (!termoBusca) return lista;

    return lista.filter((alerta) => {
      const texto = normalizarTexto(
        `${alerta.titulo || ''} ${alerta.mensagem || ''} ${alerta.categoria || ''}`
      );

      return texto.includes(termoBusca);
    });
  }, [notificacoes, termoBusca]);

  // Filtra as notícias
  const noticiasFiltradas = useMemo(() => {
    const lista = noticias || [];

    if (!termoBusca) return lista.slice(0, 2);

    return lista.filter((noticia) => {
      const texto = normalizarTexto(
        `${noticia.titulo || ''} ${noticia.descricao || ''} ${noticia.resumo || ''} ${noticia.conteudo || ''}`
      );

      return texto.includes(termoBusca);
    });
  }, [noticias, termoBusca]);

  const [indiceAlerta, setIndiceAlerta] = useState(0);

  // Alternância automática dos alertas
  useEffect(() => {
    setIndiceAlerta(0);

    if (alertas.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceAlerta((atual) => (atual + 1) % alertas.length);
    }, 8000);

    return () => clearInterval(intervalo);
  }, [alertas]);

  const alertaAtual = alertas.length
    ? alertas[indiceAlerta % alertas.length]
    : null;

  const abrirNoticia = (noticia) => {
    navigation.navigate('DetalhesNoticia', { noticia });
  };

  const abrirAlerta = (alerta) => {
    navigation.navigate('DetalhesNotificacao', {
      notificacao: alerta,
      notificacaoId: alerta.id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1746B0"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <FontAwesome5
                  name="city"
                  size={19}
                  color="#fff"
                />
              </View>

              <View>
                <Text style={styles.welcomeText}>
                  PORTAL MUNICIPAL
                </Text>

                <Text style={styles.appTitle}>
                  Prefeitura de Vitória
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => navigation.navigate('Notificacoes')}
              activeOpacity={0.8}
            >
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#fff"
              />

              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeArea}>
            <Text style={styles.welcomeTitle}>
              Olá! Seja bem-vindo.
            </Text>

            <Text style={styles.welcomeSubtitle}>
              Informação e serviços públicos em um só lugar.
            </Text>
          </View>

          {/* Barra de pesquisa funcional */}
          <SearchBar
            value={busca}
            onChangeText={setBusca}
            placeholder="O que você está procurando?"
          />

          {busca.length > 0 && (
            <TouchableOpacity
              style={styles.limparBusca}
              onPress={() => setBusca('')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close-circle-outline"
                size={15}
                color="#DBEAFE"
              />

              <Text style={styles.limparBuscaTexto}>
                Limpar pesquisa
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>

          {/* Alertas */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTop}>
              <View>
                <Text style={styles.sectionTitle}>
                  Comunicados importantes
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Fique por dentro dos alertas da prefeitura
                </Text>
              </View>

              <View style={styles.alertIcon}>
                <Ionicons
                  name="alert-circle-outline"
                  size={21}
                  color="#dc2626"
                />
              </View>
            </View>

            {carregandoNotificacoes ? (
              <LoadingState mensagem="Carregando alertas..." />
            ) : erroNotificacoes ? (
              <ErrorState
                mensagem={erroNotificacoes}
                onTentarNovamente={recarregarNotificacoes}
              />
            ) : alertaAtual ? (
              <>
                <AlertaCard
                  alerta={alertaAtual}
                  onPress={() => abrirAlerta(alertaAtual)}
                />

                {alertas.length > 1 && (
                  <View style={styles.alertFooter}>
                    <View style={styles.dots}>
                      {alertas.map((a, index) => (
                        <View
                          key={a.id}
                          style={[
                            styles.dot,
                            index === indiceAlerta % alertas.length &&
                              styles.dotActive,
                          ]}
                        />
                      ))}
                    </View>

                    <Text style={styles.alertCounter}>
                      {indiceAlerta % alertas.length + 1} de {alertas.length}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.emptyAlert}>
                <Ionicons
                  name={
                    termoBusca
                      ? 'search-outline'
                      : 'checkmark-circle-outline'
                  }
                  size={24}
                  color={termoBusca ? '#64748B' : '#15803d'}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.emptyAlertTitle}>
                    {termoBusca
                      ? 'Nenhum comunicado encontrado'
                      : 'Nenhum alerta no momento'}
                  </Text>

                  <Text style={styles.emptyAlertText}>
                    {termoBusca
                      ? 'Tente pesquisar por outro termo.'
                      : 'Quando houver um comunicado importante, ele aparecerá aqui.'}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Serviços */}
          <View style={styles.sectionContainer}>
            <SectionHeader
              titulo="Serviços e utilidades"
              acao="Ver todos"
              onAcao={() => navigation.navigate('Serviços')}
            />

            <Text style={styles.sectionDescription}>
              Acesse rapidamente os principais serviços municipais.
            </Text>

            {servicosFiltrados.length > 0 ? (
              <View style={styles.servicesGrid}>
                {servicosFiltrados.map((servico) => (
                  <ServiceCard
                    key={servico.id}
                    servico={servico}
                    onPress={() => navigation.navigate('Serviços')}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyResult}>
                <Ionicons
                  name="search-outline"
                  size={23}
                  color="#94A3B8"
                />

                <Text style={styles.emptyResultText}>
                  Nenhum serviço encontrado.
                </Text>
              </View>
            )}
          </View>

          {/* Notícias */}
          <View style={styles.sectionContainer}>
            <SectionHeader
              titulo="Últimas notícias"
              acao="Ver todas"
              onAcao={() => navigation.navigate('Notícias')}
            />

            <Text style={styles.sectionDescription}>
              Acompanhe as novidades do município.
            </Text>

            {loading ? (
              <LoadingState mensagem="Carregando notícias..." />
            ) : error ? (
              <ErrorState
                mensagem={error}
                onTentarNovamente={recarregar}
              />
            ) : noticiasFiltradas.length > 0 ? (
              <View style={styles.newsList}>
                {noticiasFiltradas.map((noticia) => (
                  <NewsCard
                    key={noticia.id}
                    noticia={noticia}
                    onPress={abrirNoticia}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyNews}>
                <Ionicons
                  name="newspaper-outline"
                  size={25}
                  color="#94a3b8"
                />

                <Text style={styles.emptyNewsText}>
                  {termoBusca
                    ? 'Nenhuma notícia encontrada para essa pesquisa.'
                    : 'Nenhuma notícia disponível no momento.'}
                </Text>
              </View>
            )}
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <FontAwesome5
              name="city"
              size={16}
              color="#94a3b8"
            />

            <Text style={styles.footerText}>
              Prefeitura de Vitória • Informação e cidadania
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scrollContent: {
    paddingBottom: 35,
  },

  header: {
    backgroundColor: '#1746B0',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.17)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  welcomeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#bfdbfe',
    letterSpacing: 1.4,
    marginBottom: 3,
  },

  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  notificationBtn: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    backgroundColor: '#f87171',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1746B0',
  },

  welcomeArea: {
    marginTop: 28,
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },

  welcomeSubtitle: {
    fontSize: 13,
    color: '#dbeafe',
    lineHeight: 19,
  },

  limparBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
    marginTop: 9,
  },

  limparBuscaTexto: {
    fontSize: 11,
    color: '#DBEAFE',
  },

  content: {
    paddingTop: 5,
  },

  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 18,
  },

  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
  },

  sectionSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
  },

  alertIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 3,
  },

  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cbd5e1',
  },

  dotActive: {
    width: 18,
    backgroundColor: '#2563eb',
  },

  alertCounter: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },

  emptyAlert: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  emptyAlertTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#166534',
  },

  emptyAlertText: {
    fontSize: 11,
    color: '#4b5563',
    marginTop: 3,
    lineHeight: 16,
  },

  sectionDescription: {
    fontSize: 11,
    color: '#64748b',
    marginTop: -5,
    marginBottom: 13,
  },

  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  emptyResult: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 22,
    alignItems: 'center',
    gap: 8,
  },

  emptyResultText: {
    fontSize: 12,
    color: '#64748b',
  },

  newsList: {
    gap: 12,
  },

  emptyNews: {
    padding: 25,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 8,
  },

  emptyNewsText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },

  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 35,
  },

  footerText: {
    fontSize: 10,
    color: '#94a3b8',
  },
});
