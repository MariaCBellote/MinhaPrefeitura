
import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { usuarioMock } from '../data/mockData';
import CampoPerfil from '../components/CampoPerfil';

export default function Perfil() {

  const [usuario, setUsuario] = useState(usuarioMock);
  const [editando, setEditando] = useState(false);

  const atualizarCampo = (campo, valor) => {
    setUsuario({
      ...usuario,
      [campo]: valor
    });
  };

  // Selecionar foto da galeria
  const alterarFoto = async () => {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar sua galeria para alterar a foto.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!resultado.canceled) {
      atualizarCampo('foto', resultado.assets[0].uri);
    }
  };

  // Salvar alterações
  const salvarAlteracoes = () => {
    if (!usuario.nome.trim() || !usuario.email.trim()) {
      Alert.alert(
        'Atenção',
        'Nome e e-mail são obrigatórios.'
      );
      return;
    }

    setEditando(false);

    Alert.alert(
      'Sucesso',
      'Seus dados foram atualizados!'
    );
  };

  const cancelarEdicao = () => {
    setUsuario({ ...usuarioMock });
    setEditando(false);
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerTitulo}>Meu Perfil</Text>

          <Text style={styles.headerSubtitulo}>
            Gerencie suas informações pessoais
          </Text>
        </View>

        {/* Foto e informações */}
        <View style={styles.fotoContainer}>

          <View style={styles.fotoWrapper}>

            {usuario.foto ? (
              <Image
                source={{ uri: usuario.foto }}
                style={styles.foto}
              />
            ) : (
              <View style={styles.fotoPlaceholder}>
                <Ionicons
                  name="person"
                  size={55}
                  color="#94a3b8"
                />
              </View>
            )}

            <TouchableOpacity
              style={styles.botaoFoto}
              onPress={alterarFoto}
            >
              <Ionicons
                name="camera"
                size={17}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

          <Text style={styles.nomeUsuario}>
            {usuario.nome}
          </Text>

          <Text style={styles.emailUsuario}>
            {usuario.email}
          </Text>

        </View>

        {/* Dados pessoais */}
        <View style={styles.card}>

          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitulo}>
                Dados pessoais
              </Text>

              <Text style={styles.cardDescricao}>
                Suas informações cadastrais
              </Text>
            </View>

            <Ionicons
              name="person-circle-outline"
              size={25}
              color="#1d4ed8"
            />
          </View>

          <CampoPerfil
            titulo="Nome completo"
            icone="person-outline"
            valor={usuario.nome}
            editavel={editando}
            onChangeText={v => atualizarCampo('nome', v)}
          />

          <CampoPerfil
            titulo="E-mail"
            icone="mail-outline"
            valor={usuario.email}
            teclado="email-address"
            editavel={editando}
            onChangeText={v => atualizarCampo('email', v)}
          />

          <CampoPerfil
            titulo="Celular"
            icone="call-outline"
            valor={usuario.celular}
            teclado="phone-pad"
            editavel={editando}
            onChangeText={v => atualizarCampo('celular', v)}
          />

          <CampoPerfil
            titulo="CPF"
            icone="card-outline"
            valor={usuario.cpf}
            editavel={false}
          />

          <CampoPerfil
            titulo="Endereço"
            icone="location-outline"
            valor={usuario.endereco}
            editavel={editando}
            onChangeText={v => atualizarCampo('endereco', v)}
          />

          <CampoPerfil
            titulo="Cidade"
            icone="business-outline"
            valor={usuario.cidade}
            editavel={editando}
            onChangeText={v => atualizarCampo('cidade', v)}
          />

          {!editando ? (

            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => setEditando(true)}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />

              <Text style={styles.botaoTexto}>
                Editar informações
              </Text>
            </TouchableOpacity>

          ) : (

            <View style={styles.botoesEdicao}>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarEdicao}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarAlteracoes}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />

                <Text style={styles.botaoTexto}>
                  Salvar
                </Text>
              </TouchableOpacity>

            </View>

          )}

        </View>

        {/* Configurações */}
        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Configurações da conta
          </Text>

          <TouchableOpacity style={styles.opcao}>
            <Ionicons
              name="lock-closed-outline"
              size={21}
              color="#64748b"
            />

            <Text style={styles.opcaoTexto}>
              Alterar senha
            </Text>

            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.opcao}>
            <Ionicons
              name="notifications-outline"
              size={21}
              color="#64748b"
            />

            <Text style={styles.opcaoTexto}>
              Notificações
            </Text>

            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.opcao}>
            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color="#64748b"
            />

            <Text style={styles.opcaoTexto}>
              Privacidade
            </Text>

            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
          </TouchableOpacity>

        </View>

        {/* Sair */}
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() =>
            Alert.alert(
              'Sair da conta',
              'Deseja realmente sair?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Sair',
                  style: 'destructive',
                  onPress: () => Alert.alert(
                    'Aviso',
                    'A autenticação será implementada posteriormente.'
                  )
                }
              ]
            )
          }
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#dc2626"
          />

          <Text style={styles.textoSair}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        <Text style={styles.versao}>
          Minha Prefeitura • Versão 1.0.0
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f3f4f6'
  },

  scrollContent: {
    paddingBottom: 100
  },

  header: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 55,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },

  headerTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff'
  },

  headerSubtitulo: {
    fontSize: 12,
    color: '#bfdbfe',
    marginTop: 5
  },

  fotoContainer: {
    alignItems: 'center',
    marginTop: -45,
    marginBottom: 20
  },

  fotoWrapper: {
    position: 'relative'
  },

  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff'
  },

  fotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  botaoFoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },

  nomeUsuario: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 10
  },

  emailUsuario: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 3
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 15,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },

  cardTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937'
  },

  cardDescricao: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4
  },

  botaoEditar: {
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    borderRadius: 10,
    marginTop: 5
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 7
  },

  botoesEdicao: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5
  },

  botaoCancelar: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center'
  },

  textoCancelar: {
    color: '#475569',
    fontWeight: 'bold',
    fontSize: 13
  },

  botaoSalvar: {
    flex: 1,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },

  opcaoTexto: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: '#374151'
  },

  botaoSair: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 15,
    backgroundColor: '#fee2e2',
    borderRadius: 10
  },

  textoSair: {
    color: '#dc2626',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8
  },

  versao: {
    textAlign: 'center',
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 20
  }

});
