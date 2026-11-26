
import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { UsuarioContext } from '../context/UsuarioContext';

export default function Perfil() {
  const {
    usuario: usuarioAutenticado,
    atualizarUsuario,
    sair,
  } = useContext(UsuarioContext);

  const [usuario, setUsuario] = useState(usuarioAutenticado);
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [modalSaidaVisivel, setModalSaidaVisivel] = useState(false);

  // Sincroniza os dados do usuário
  useEffect(() => {
    setUsuario(usuarioAutenticado);
    setEditando(false);
  }, [usuarioAutenticado]);

  if (!usuario) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

  // Atualizar campos
  function atualizarCampo(campo, valor) {
    setUsuario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  }

  // Escolher foto na galeria
  async function escolherFoto() {
    if (!editando) return;

    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para escolher uma foto.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        atualizarCampo('foto', resultado.assets[0].uri);
      }
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível selecionar a foto.');
    }
  }

  // Salvar alterações
  function salvarAlteracoes() {
    if (!usuario.nome?.trim() || !usuario.email?.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha pelo menos seu nome e e-mail.'
      );
      return;
    }

    setSalvando(true);

    const resultado = atualizarUsuario({
      nome: usuario.nome.trim(),
      email: usuario.email.trim(),
      celular: usuario.celular,
      endereco: usuario.endereco,
      cidade: usuario.cidade,
      foto: usuario.foto,
    });

    setSalvando(false);

    if (resultado?.sucesso === false) {
      Alert.alert('Erro', resultado.mensagem);
      return;
    }

    setEditando(false);

    Alert.alert(
      'Perfil atualizado',
      'Seus dados foram atualizados com sucesso!'
    );
  }

  // Cancelar edição
  function cancelarEdicao() {
    setUsuario({ ...usuarioAutenticado });
    setEditando(false);
  }

  // Abre uma confirmação própria, compatível com celular e navegador.
  function confirmarSaida() {
    setModalSaidaVisivel(true);
  }

  // Encerra a sessão somente após a confirmação do usuário.
  function executarSaida() {
    setModalSaidaVisivel(false);
    setEditando(false);
    sair();
  }

  // Campo reutilizável
  function CampoPerfil({
    titulo,
    campo,
    placeholder,
    teclado = 'default',
    editavel = true,
  }) {
    return (
      <View style={styles.campoContainer}>
        <Text style={styles.campoTitulo}>{titulo}</Text>

        <TextInput
          style={[
            styles.input,
            (!editando || !editavel) && styles.inputDesabilitado,
          ]}
          value={usuario[campo] || ''}
          onChangeText={(valor) => atualizarCampo(campo, valor)}
          placeholder={placeholder}
          keyboardType={teclado}
          editable={editando && editavel}
          placeholderTextColor="#9ca3af"
          autoCapitalize={
            teclado === 'email-address' ? 'none' : 'sentences'
          }
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Meu Perfil</Text>

        <Text style={styles.headerSubtitulo}>
          Gerencie suas informações pessoais
        </Text>
      </View>

      {/* Foto e nome */}
      <View style={styles.cardPerfil}>
        <TouchableOpacity
          style={styles.fotoContainer}
          onPress={escolherFoto}
          disabled={!editando}
          activeOpacity={0.8}
        >
          {usuario.foto ? (
            <Image
              source={{ uri: usuario.foto }}
              style={styles.foto}
            />
          ) : (
            <View style={styles.fotoPadrao}>
              <Ionicons
                name="person"
                size={48}
                color="#9ca3af"
              />
            </View>
          )}

          {editando && (
            <View style={styles.iconeCamera}>
              <Ionicons name="camera" size={19} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.nomePerfil}>
          {usuario.nome || 'Usuário'}
        </Text>

        <Text style={styles.emailPerfil}>
          {usuario.email}
        </Text>

        {editando && (
          <Text style={styles.dicaFoto}>
            Toque na foto para escolher uma imagem da galeria
          </Text>
        )}
      </View>

      {/* Informações pessoais */}
      <View style={styles.secao}>
        <View style={styles.secaoTituloContainer}>
          <Ionicons
            name="person-circle-outline"
            size={23}
            color="#1d4ed8"
          />

          <Text style={styles.secaoTitulo}>
            Informações pessoais
          </Text>
        </View>

        <CampoPerfil
          titulo="Nome completo"
          campo="nome"
          placeholder="Digite seu nome"
        />

        <CampoPerfil
          titulo="E-mail"
          campo="email"
          placeholder="Digite seu e-mail"
          teclado="email-address"
        />

        <CampoPerfil
          titulo="Celular"
          campo="celular"
          placeholder="Digite seu celular"
          teclado="phone-pad"
        />

        <CampoPerfil
          titulo="CPF"
          campo="cpf"
          placeholder="CPF"
          editavel={false}
        />
      </View>

      {/* Endereço */}
      <View style={styles.secao}>
        <View style={styles.secaoTituloContainer}>
          <Ionicons
            name="location-outline"
            size={23}
            color="#1d4ed8"
          />

          <Text style={styles.secaoTitulo}>
            Endereço
          </Text>
        </View>

        <CampoPerfil
          titulo="Endereço"
          campo="endereco"
          placeholder="Digite seu endereço"
        />

        <CampoPerfil
          titulo="Cidade"
          campo="cidade"
          placeholder="Digite sua cidade"
        />
      </View>

      {/* Botões de edição */}
      <View style={styles.acoes}>
        {editando ? (
          <>
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvarAlteracoes}
              disabled={salvando}
            >
              {salvando ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color="#fff"
                  />

                  <Text style={styles.textoBotaoSalvar}>
                    Salvar alterações
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={cancelarEdicao}
            >
              <Text style={styles.textoBotaoCancelar}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => setEditando(true)}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#fff"
            />

            <Text style={styles.textoBotaoEditar}>
              Editar perfil
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sair da conta */}
      <TouchableOpacity
        style={styles.botaoSair}
        onPress={confirmarSaida}
        activeOpacity={0.7}
      >
        <Ionicons
          name="log-out-outline"
          size={21}
          color="#dc2626"
        />

        <Text style={styles.textoSair}>
          Sair da conta
        </Text>
      </TouchableOpacity>

      <Text style={styles.versao}>
        Minha Prefeitura
      </Text>

      <Modal
        visible={modalSaidaVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSaidaVisivel(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCartao}>
            <View style={styles.modalIcone}>
              <Ionicons name="log-out-outline" size={30} color="#dc2626" />
            </View>

            <Text style={styles.modalTitulo}>Sair da conta?</Text>
            <Text style={styles.modalMensagem}>
              Tem certeza de que deseja encerrar sua sessão?
            </Text>

            <View style={styles.modalAcoes}>
              <TouchableOpacity
                style={styles.modalBotaoCancelar}
                onPress={() => setModalSaidaVisivel(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalTextoCancelar}>Continuar conectado</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBotaoSair}
                onPress={executarSaida}
                activeOpacity={0.8}
              >
                <Text style={styles.modalTextoSair}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  conteudo: {
    paddingBottom: 35,
  },

  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#1746B0',
    paddingTop: 48,
    paddingBottom: 38,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitulo: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '800',
  },

  headerSubtitulo: {
    color: '#dbeafe',
    fontSize: 14,
    marginTop: 5,
  },

  cardPerfil: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#173b70',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  fotoContainer: {
    position: 'relative',
    marginBottom: 12,
  },

  foto: {
    width: 105,
    height: 105,
    borderRadius: 55,
  },

  fotoPadrao: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconeCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1746B0',
    padding: 8,
    borderRadius: 20,
  },

  nomePerfil: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },

  emailPerfil: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },

  dicaFoto: {
    fontSize: 12,
    color: '#1d4ed8',
    marginTop: 8,
    textAlign: 'center',
  },

  secao: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#173b70',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  secaoTituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  secaoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 9,
  },

  campoContainer: {
    marginBottom: 15,
  },

  campoTitulo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },

  inputDesabilitado: {
    backgroundColor: '#f5f7fb',
    color: '#6b7280',
  },

  acoes: {
    marginHorizontal: 16,
    marginTop: 18,
    gap: 10,
  },

  botaoEditar: {
    backgroundColor: '#1746B0',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  textoBotaoEditar: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botaoSalvar: {
    backgroundColor: '#16a34a',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  textoBotaoSalvar: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  botaoCancelar: {
    backgroundColor: '#e5e7eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotaoCancelar: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },

  botaoSair: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#fff7f7',
    borderWidth: 1,
    borderColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 9,
  },

  textoSair: {
    color: '#dc2626',
    fontSize: 15,
    fontWeight: 'bold',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalCartao: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },

  modalIcone: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 8,
  },

  modalMensagem: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 22,
  },

  modalAcoes: {
    width: '100%',
    gap: 10,
  },

  modalBotaoCancelar: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbe3ee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  modalTextoCancelar: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
  },

  modalBotaoSair: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },

  modalTextoSair: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },

  versao: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 22,
  },
});
