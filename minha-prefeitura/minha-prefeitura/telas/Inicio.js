import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useComunicados } from '../components/ComunicadosContext';
import AlertaCard from '../components/AlertaCard';
import SectionHeader from '../components/Sectionheader';
import ServiceCard from '../components/Servicecard';
import NewsCard from '../components/Newscard';
import { noticiasMock, servicosMock } from '../data/mockData';

export default function Inicio() {
  const { alertaAtual } = useComunicados();
  const navigation = useNavigation();

  // Abre a aba Serviços e já mostra o serviço tocado
  const abrirServico = (servico) =>
    navigation.navigate('Serviços', { servicoId: servico.id });

  const abrirNoticia = (noticia) =>
    navigation.navigate('DetalhesNoticia', { noticia });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Principal */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerBrand}>
              <View style={styles.logoIconContainer}>
                <FontAwesome5 name="city" size={18} color="#fff" />
              </View>
              <View>
                <Text style={styles.welcomeText}>Bem-vindo ao</Text>
                <Text style={styles.appTitle}>Minha Prefeitura</Text>
              </View>
            </View>

            {/* Sino: abre a tela de notificações */}
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={() => navigation.navigate('Notificacoes')}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Barra de Busca Rápida */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#9ca3af"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Buscar serviços ou notícias..."
              placeholderTextColor="#9ca3af"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Alerta / Comunicado Oficial Urgente */}
        <View style={styles.sectionContainer}>
          <AlertaCard alerta={alertaAtual} />
        </View>

        {/* Serviços e Utilidades */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            titulo="Serviços e Utilidades"
            acao="Ver todos"
            onAcao={() => navigation.navigate('Serviços')}
          />
          <View style={styles.utilitiesGrid}>
            {servicosMock.slice(0, 3).map((s) => (
              <ServiceCard key={s.id} servico={s} onPress={abrirServico} />
            ))}
          </View>
        </View>

        {/* Últimas Notícias */}
        <View style={styles.sectionContainer}>
          <SectionHeader
            titulo="Últimas Notícias"
            acao="Ver mais"
            onAcao={() => navigation.navigate('Notícias')}
          />
          <View style={styles.newsList}>
            {noticiasMock.slice(0, 2).map((n) => (
              <NewsCard key={n.id} noticia={n} onPress={abrirNoticia} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  welcomeText: {
    fontSize: 11,
    color: '#bfdbfe',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationBtn: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 10,
    paddingLeft: 38,
    paddingRight: 14,
    fontSize: 13,
    color: '#1f2937',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  utilitiesGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  newsList: {
    gap: 10,
  },
});