
import React, { useState, useEffect, useMemo } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import AlertaCard from '../components/AlertaCard';
import SectionHeader from '../components/Sectionheader';
import NewsCard from '../components/Newscard';

import { useFetch, LoadingState, ErrorState } from '../components/ApiStates';
import { listarNoticias, listarNotificacoes } from '../data/API';

export default function Inicio() {
  const navigation = useNavigation();

  const {
    data: noticias,
    loading,
    error,
    recarregar
  } = useFetch(listarNoticias);

  const {
    data: notificacoes,
    loading: carregandoNotificacoes,
    error: erroNotificacoes,
    recarregar: recarregarNotificacoes
  } = useFetch(listarNotificacoes);

  // Filtra os alertas pelo título
  const alertas = useMemo(
    () =>
      (notificacoes || []).filter((n) =>
        n.titulo?.toLowerCase().includes('alerta')
      ),
    [notificacoes]
  );

  const [indiceAlerta, setIndiceAlerta] = useState(0);

  // Alternância automática
  useEffect(() => {
    setIndiceAlerta(0);

    if (alertas.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceAlerta((atual) => (atual + 1) % alertas.length);
    }, 8000);

    return () => clearInterval(intervalo);
  }, [alertas.length]);

  const alertaAtual = alertas.length
    ? alertas[indiceAlerta % alertas.length]
    : null;

  const abrirServico = (servico) => {
    navigation.navigate('Serviços', { servicoId: servico.id });
  };

  const abrirNoticia = (noticia) => {
    navigation.navigate('DetalhesNoticia', { noticia });
  };

  const abrirAlerta = (alerta) => {
    navigation.navigate('DetalhesNotificacao', {
      notificacao: alerta,
      notificacaoId: alerta.id
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1746B0" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <FontAwesome5 name="city" size={19} color="#fff" />
              </View>

              <View>
                <Text style={styles.welcomeText}>PORTAL MUNICIPAL</Text>
                <Text style={styles.appTitle}>Prefeitura de Vitória</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => navigation.navigate('Notificacoes')}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={23} color="#fff" />
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

          {/* Busca */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#64748b" />

            <TextInput
              placeholder="O que você está procurando?"
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
            />

            <Ionicons name="options-outline" size={20} color="#64748b" />
          </View>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>

          {/* Alertas */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTop}>
              <View>
                <Text style={styles.sectionTitle}>Comunicados importantes</Text>
                <Text style={styles.sectionSubtitle}>
                  Fique por dentro dos alertas da prefeitura
                </Text>
              </View>

              <View style={styles.alertIcon}>
                <Ionicons name="alert-circle-outline" size={21} color="#dc2626" />
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
                              styles.dotActive
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
                  name="checkmark-circle-outline"
                  size={24}
                  color="#15803d"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.emptyAlertTitle}>
                    Nenhum alerta no momento
                  </Text>
                  <Text style={styles.emptyAlertText}>
                    Quando houver um comunicado importante, ele aparecerá aqui.
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
              Consulte os serviços municipais disponíveis.
            </Text>

            <View style={styles.servicesUnavailable}>
              <Ionicons name="construct-outline" size={24} color="#7890b8" />
              <Text style={styles.servicesUnavailableTitle}>Serviços em atualização</Text>
              <Text style={styles.servicesUnavailableText}>
                A API conectada ainda não disponibiliza o catálogo de serviços municipais.
              </Text>
            </View>
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
            ) : (noticias || []).length > 0 ? (
              <View style={styles.newsList}>
                {(noticias || []).slice(0, 2).map((n) => (
                  <NewsCard
                    key={n.id}
                    noticia={n}
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
                  Nenhuma notícia disponível no momento.
                </Text>
              </View>
            )}
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <FontAwesome5 name="city" size={16} color="#94a3b8" />
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

  searchContainer: {
    height: 49,
    backgroundColor: '#fff',
    borderRadius: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#1f2937',
    paddingVertical: 0,
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

  utilitiesGrid: {
    flexDirection: 'row',
    gap: 10,
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
