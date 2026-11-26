
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import {
  useFetch,
  LoadingState,
  ErrorState,
} from '../components/ApiStates';

import { buscarNotificacao } from '../data/API';

export default function DetalhesNotificacao({ route, navigation }) {
  const { notificacao: inicial, notificacaoId } = route.params || {};
  const id = notificacaoId || inicial?.id;

  const { data, loading, error, recarregar } = useFetch(
    () => (id ? buscarNotificacao(id) : Promise.resolve(inicial)),
    [id]
  );

  const notificacao = data || inicial;

  const ehAlerta = notificacao?.titulo
    ?.toLowerCase()
    .includes('alerta');

  const dataFormatada = notificacao?.enviado_em
    ? new Date(notificacao.enviado_em).toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const abrirLink = async () => {
    if (!notificacao?.link_acao) return;

    try {
      await Linking.openURL(notificacao.link_acao);
    } catch (e) {
      console.log('Não foi possível abrir o link:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
  titulo="Notificação"
  subtitulo="Detalhes da notificação"
  onVoltar={() => navigation.goBack()}
/>

      {loading && !notificacao ? (
        <View style={styles.estadoContainer}>
          <LoadingState mensagem="Carregando notificação..." />
        </View>
      ) : error && !notificacao ? (
        <View style={styles.estadoContainer}>
          <ErrorState
            mensagem={error}
            onTentarNovamente={recarregar}
          />
        </View>
      ) : notificacao ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {/* Identificação */}
          <View style={styles.caminho}>
            <Text style={styles.caminhoTexto}>INÍCIO</Text>
            <Ionicons
              name="chevron-forward"
              size={13}
              color="#9ca3af"
            />
            <Text style={styles.caminhoAtual}>NOTIFICAÇÕES</Text>
          </View>

          {/* Cartão principal */}
          <View style={styles.card}>
            <View style={styles.cardTopo}>
              <View
                style={[
                  styles.iconeContainer,
                  ehAlerta && styles.iconeAlerta,
                ]}
              >
                <Ionicons
                  name={
                    ehAlerta
                      ? 'alert-circle-outline'
                      : 'notifications-outline'
                  }
                  size={25}
                  color={ehAlerta ? '#b42318' : '#24549a'}
                />
              </View>

              <View style={styles.identificacao}>
                <View
                  style={[
                    styles.tag,
                    ehAlerta ? styles.tagAlerta : styles.tagNormal,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagTexto,
                      ehAlerta
                        ? styles.tagTextoAlerta
                        : styles.tagTextoNormal,
                    ]}
                  >
                    {ehAlerta
                      ? 'ALERTA'
                      : (notificacao.tipo || 'NOTIFICAÇÃO').toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.documento}>
                  COMUNICADO OFICIAL
                </Text>
              </View>
            </View>

            <View style={styles.divisorTopo} />

            {/* Título */}
            <Text style={styles.titulo}>
              {notificacao.titulo || 'Sem título'}
            </Text>

            {/* Data */}
            {dataFormatada && (
              <View style={styles.dataContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color="#64748b"
                />
                <Text style={styles.data}>
                  Enviado em {dataFormatada}
                </Text>
              </View>
            )}

            <View style={styles.divisor} />

            {/* Mensagem */}
            <Text style={styles.secaoTitulo}>INFORMAÇÕES</Text>

            <Text style={styles.conteudo}>
              {notificacao.mensagem || 'Nenhuma mensagem disponível.'}
            </Text>

            {/* Link de ação */}
            {notificacao.link_acao ? (
              <View style={styles.acaoContainer}>
                <View style={styles.acaoInfo}>
                  <Ionicons
                    name="information-circle-outline"
                    size={19}
                    color="#24549a"
                  />
                  <Text style={styles.acaoDescricao}>
                    Consulte o endereço relacionado a esta notificação.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.botaoAcao}
                  onPress={abrirLink}
                  activeOpacity={0.85}
                >
                  <Text style={styles.botaoAcaoTexto}>
                    Acessar conteúdo relacionado
                  </Text>
                  <Ionicons
                    name="open-outline"
                    size={17}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          {/* Rodapé */}
          <View style={styles.rodape}>
            <Ionicons
              name="shield-checkmark-outline"
              size={16}
              color="#94a3b8"
            />
            <Text style={styles.rodapeTexto}>
              Informação disponibilizada pelo Portal da Prefeitura.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.vazio}>
          <Ionicons
            name="notifications-off-outline"
            size={42}
            color="#94a3b8"
          />
          <Text style={styles.vazioTitulo}>
            Notificação não encontrada
          </Text>
          <Text style={styles.vazioTexto}>
            Não foi possível localizar as informações desta notificação.
          </Text>

          <TouchableOpacity
            style={styles.botaoVoltarVazio}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botaoVoltarTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5f8',
  },

  // Cabeçalho
  header: {
    height: 76,
    backgroundColor: '#173B70',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 3,
  },
  botaoVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTextoContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitulo: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitulo: {
    color: '#d5e1f1',
    fontSize: 12,
    marginTop: 3,
  },
  headerIcone: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.13)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Conteúdo
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 35,
  },
  caminho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 17,
  },
  caminhoTexto: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  caminhoAtual: {
    fontSize: 10,
    color: '#24549a',
    fontWeight: '700',
    letterSpacing: 0.7,
  },

  // Cartão
  card: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 22,
    borderWidth: 1,
    borderColor: '#e8edf3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 7,
  },
  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconeContainer: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: '#eaf1fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeAlerta: {
    backgroundColor: '#fef0ee',
  },
  identificacao: {
    marginLeft: 12,
    gap: 5,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 5,
  },
  tagNormal: {
    backgroundColor: '#eaf1fb',
  },
  tagAlerta: {
    backgroundColor: '#fef0ee',
  },
  tagTexto: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagTextoNormal: {
    color: '#24549a',
  },
  tagTextoAlerta: {
    color: '#b42318',
  },
  documento: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  divisorTopo: {
    height: 1,
    backgroundColor: '#edf0f4',
    marginBottom: 20,
  },

  // Texto
  titulo: {
    color: '#1e293b',
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 31,
    marginBottom: 15,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  data: {
    fontSize: 12,
    color: '#64748b',
  },
  divisor: {
    height: 1,
    backgroundColor: '#edf0f4',
    marginVertical: 22,
  },
  secaoTitulo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  conteudo: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 26,
    textAlign: 'left',
  },

  // Ação
  acaoContainer: {
    marginTop: 25,
    paddingTop: 19,
    borderTopWidth: 1,
    borderTopColor: '#edf0f4',
  },
  acaoInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginBottom: 15,
  },
  acaoDescricao: {
    flex: 1,
    color: '#64748b',
    fontSize: 12,
    lineHeight: 19,
  },
  botaoAcao: {
    minHeight: 49,
    backgroundColor: '#24549a',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  botaoAcaoTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  // Rodapé
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  rodapeTexto: {
    color: '#94a3b8',
    fontSize: 10,
    textAlign: 'center',
  },

  // Estados
  estadoContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
  },
  vazioTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#334155',
    marginTop: 16,
  },
  vazioTexto: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
  botaoVoltarVazio: {
    marginTop: 22,
    backgroundColor: '#24549a',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botaoVoltarTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
