
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ScreenHeader from '../../components/ScreenHeader';
import AtalhoVacinacao from '../../components/Vacinacao/AtalhoVacinacao';
import InformacaoVacinacao from '../../components/Vacinacao/InformacaoVacinacao';

const LINK_AGENDAMENTO = 'https://agendamento.vitoria.es.gov.br/';

const LINK_CALENDARIO =
  'https://www.vitoria.es.gov.br/saude/calendario-de-vacinacao';

const LINK_CARTA_SERVICOS =
  'https://cartadeservicos.vitoria.es.gov.br/areas/18-Saude/servicos/890-Vacinas-e-Imunizacao/';

export default function AgendamentoVacina() {
  const navigation = useNavigation();

  const abrirLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert(
        'Não foi possível abrir',
        'Verifique sua conexão e tente novamente.'
      );
    }
  };

  const atalhos = [
    {
      id: 'agendamento',
      titulo: 'Agendar vacinação',
      descricao: 'Escolha a vacina, unidade, data e horário.',
      icone: 'calendar-outline',
      cor: '#16845B',
      fundo: '#E5F5ED',
      onPress: () => abrirLink(LINK_AGENDAMENTO),
    },
    {
      id: 'unidades',
      titulo: 'Unidades de saúde',
      descricao: 'Consulte os locais que oferecem vacinação.',
      icone: 'location-outline',
      cor: '#2563EB',
      fundo: '#EAF1FF',
      onPress: () => abrirLink(LINK_CARTA_SERVICOS),
    },
    {
      id: 'calendario',
      titulo: 'Calendário vacinal',
      descricao: 'Consulte as vacinas recomendadas pelo SUS.',
      icone: 'calendar-number-outline',
      cor: '#8B5CF6',
      fundo: '#F1EAFE',
      onPress: () => abrirLink(LINK_CALENDARIO),
    },
    {
      id: 'orientacoes',
      titulo: 'Orientações',
      descricao: 'Veja documentos e informações para atendimento.',
      icone: 'document-text-outline',
      cor: '#D97706',
      fundo: '#FEF3E2',
      onPress: () => abrirLink(LINK_CARTA_SERVICOS),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7FB"
      />

      {/* Cabeçalho com botão de retorno */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#1E293B"
          />
        </TouchableOpacity>

        <View style={styles.tituloHeader}>
          <ScreenHeader titulo="Vacinação" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Apresentação */}
        <View style={styles.apresentacao}>
          <View style={styles.apresentacaoTexto}>
            <Text style={styles.apresentacaoTitulo}>
              Cuide da sua saúde!
            </Text>

            <Text style={styles.apresentacaoDescricao}>
              Encontre informações sobre vacinas, campanhas e
              atendimento nas unidades de saúde de Vitória.
            </Text>
          </View>

          <View style={styles.apresentacaoIcone}>
            <Ionicons
              name="medkit-outline"
              size={32}
              color="#16845B"
            />
          </View>
        </View>

        {/* Agendamento em destaque */}
        <View style={styles.agendamentoCard}>
          <View style={styles.agendamentoTopo}>
            <View style={styles.agendamentoIcone}>
              <Ionicons
                name="calendar-check"
                size={23}
                color="#16845B"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.agendamentoTitulo}>
                Agendamento online
              </Text>

              <Text style={styles.agendamentoDescricao}>
                Marque sua vacinação pelo portal oficial.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.botaoAgendar}
            onPress={() => abrirLink(LINK_AGENDAMENTO)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoAgendarTexto}>
              Acessar agendamento
            </Text>

            <Ionicons
              name="open-outline"
              size={17}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.avisoAgendamento}>
            O agendamento não é obrigatório. Também é possível
            procurar diretamente uma unidade de saúde.
          </Text>
        </View>

        {/* Atalhos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitulo}>
            O que você procura?
          </Text>

          <Text style={styles.sectionDescricao}>
            Acesse rapidamente os serviços de vacinação.
          </Text>

          <View style={styles.grid}>
            {atalhos.map((atalho) => (
              <AtalhoVacinacao
                key={atalho.id}
                titulo={atalho.titulo}
                descricao={atalho.descricao}
                icone={atalho.icone}
                cor={atalho.cor}
                fundo={atalho.fundo}
                onPress={atalho.onPress}
              />
            ))}
          </View>
        </View>

        {/* Informações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitulo}>
            Informações importantes
          </Text>

          <Text style={styles.sectionDescricao}>
            Saiba como funciona a vacinação no município.
          </Text>

          <InformacaoVacinacao
            titulo="Vacinação gratuita pelo SUS"
            descricao="As unidades de saúde de Vitória oferecem vacinas previstas no Programa Nacional de Imunizações."
            icone="shield-checkmark-outline"
            cor="#16845B"
            fundo="#E5F5ED"
          />

          <InformacaoVacinacao
            titulo="Documentos necessários"
            descricao="Para receber a vacina, leve:"
            icone="document-text-outline"
            cor="#2563EB"
            fundo="#EAF1FF"
            itens={[
              'Documento de identificação com foto.',
              'CPF e/ou Cartão Nacional de Saúde (Cartão SUS).',
              'Certidão de nascimento, no caso de crianças.',
              'Caderneta de vacinação, se possuir.',
            ]}
          />

          <InformacaoVacinacao
            titulo="Atendimento presencial"
            descricao="Você pode procurar uma unidade de saúde sem agendamento. A equipe avaliará sua situação vacinal e orientará sobre as vacinas indicadas."
            icone="people-outline"
            cor="#8B5CF6"
            fundo="#F1EAFE"
          />
        </View>

        {/* Rodapé informativo */}
        <TouchableOpacity
          style={styles.linkOficial}
          onPress={() => abrirLink(LINK_CARTA_SERVICOS)}
          activeOpacity={0.75}
        >
          <Ionicons
            name="information-circle-outline"
            size={21}
            color="#1746B0"
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitulo}>
              Consulte a Carta de Serviços
            </Text>

            <Text style={styles.linkDescricao}>
              Confira informações oficiais sobre vacinas e imunização.
            </Text>
          </View>

          <Ionicons
            name="open-outline"
            size={17}
            color="#1746B0"
          />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Ionicons
            name="heart-outline"
            size={15}
            color="#94A3B8"
          />

          <Text style={styles.footerTexto}>
            Prefeitura de Vitória • Saúde e bem-estar
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

  header: {
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  botaoVoltar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7EDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  tituloHeader: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 35,
  },

  apresentacao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 19,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E7EDF5',
  },

  apresentacaoTexto: {
    flex: 1,
    paddingRight: 12,
  },

  apresentacaoTitulo: {
    color: '#1E293B',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 7,
  },

  apresentacaoDescricao: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 19,
  },

  apresentacaoIcone: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: '#E5F5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  agendamentoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DCEFE5',
    marginBottom: 25,
  },

  agendamentoTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  agendamentoIcone: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#E5F5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  agendamentoTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },

  agendamentoDescricao: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },

  botaoAgendar: {
    backgroundColor: '#16845B',
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
    marginTop: 15,
  },

  botaoAgendarTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  avisoAgendamento: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 15,
    marginTop: 11,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitulo: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },

  sectionDescricao: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 14,
    lineHeight: 17,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  linkOficial: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    backgroundColor: '#EAF1FF',
    borderRadius: 14,
    padding: 14,
  },

  linkTitulo: {
    color: '#1746B0',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },

  linkDescricao: {
    color: '#64748B',
    fontSize: 10,
    lineHeight: 15,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 25,
  },

  footerTexto: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
