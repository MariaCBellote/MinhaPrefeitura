
import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { UsuarioContext } from '../context/UsuarioContext';

export default function Login({ navigation }) {
  const { entrar } = useContext(UsuarioContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [erros, setErros] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');

  const fazerLogin = () => {
    setMensagemErro('');

    const novosErros = {};

    if (!email.trim()) {
      novosErros.email = 'Informe seu endereço de e-mail.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    ) {
      novosErros.email = 'Digite um endereço de e-mail válido.';
    }

    if (!senha.trim()) {
      novosErros.senha = 'Informe sua senha.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagemErro('Preencha corretamente os campos destacados.');
      return;
    }

    try {
      const resultado = entrar(email.trim().toLowerCase(), senha);

      if (!resultado || !resultado.sucesso) {
        setMensagemErro(
          resultado?.mensagem ||
          'E-mail ou senha incorretos. Verifique seus dados e tente novamente.'
        );
      }
    } catch (erro) {
      setMensagemErro(
        erro.message || 'Ocorreu um erro ao tentar entrar na sua conta.'
      );
    }
  };

  const alterarCampo = (campo, valor) => {
    if (campo === 'email') {
      setEmail(valor);
    } else {
      setSenha(valor);
    }

    setErros((anteriores) => ({
      ...anteriores,
      [campo]: '',
    }));

    setMensagemErro('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logo}>
          <Ionicons name="business" size={42} color="#fff" />
        </View>

        <Text style={styles.titulo}>Minha Prefeitura</Text>

        <Text style={styles.subtitulo}>
          Acesse sua conta para continuar
        </Text>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Bem-vindo!</Text>

          {mensagemErro ? (
            <View style={styles.alertaErro}>
              <Ionicons
                name="alert-circle"
                size={20}
                color="#b91c1c"
              />
              <Text style={styles.textoAlertaErro}>
                {mensagemErro}
              </Text>
            </View>
          ) : null}

          <Text style={styles.label}>E-mail *</Text>

          <View
            style={[
              styles.inputContainer,
              erros.email && styles.inputErro,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={erros.email ? '#dc2626' : '#64748b'}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={(texto) => alterarCampo('email', texto)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {erros.email ? (
            <Text style={styles.textoErroCampo}>
              <Ionicons name="alert-circle-outline" size={13} />
              {' '}{erros.email}
            </Text>
          ) : null}

          <Text style={styles.label}>Senha *</Text>

          <View
            style={[
              styles.inputContainer,
              erros.senha && styles.inputErro,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={erros.senha ? '#dc2626' : '#64748b'}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#94a3b8"
              value={senha}
              onChangeText={(texto) => alterarCampo('senha', texto)}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={21}
                color="#64748b"
              />
            </TouchableOpacity>
          </View>

          {erros.senha ? (
            <Text style={styles.textoErroCampo}>
              <Ionicons name="alert-circle-outline" size={13} />
              {' '}{erros.senha}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.botao}
            onPress={fazerLogin}
          >
            <Text style={styles.textoBotao}>Entrar</Text>
            <Ionicons name="arrow-forward" size={19} color="#fff" />
          </TouchableOpacity>

          <View style={styles.divisor}>
            <View style={styles.linha} />
            <Text style={styles.ou}>OU</Text>
            <View style={styles.linha} />
          </View>

          <View style={styles.cadastroContainer}>
            <Text style={styles.textoCadastro}>
              Ainda não possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.linkCadastro}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.rodape}>
          Minha Prefeitura • Serviços públicos digitais
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
  },
  logo: {
    width: 78,
    height: 78,
    borderRadius: 22,
    backgroundColor: '#1746B0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#173b70',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 23,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 3,
    shadowColor: '#173b70',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tituloCard: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbe3ee',
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 52,
    marginBottom: 20,
    gap: 10,
  },
  inputErro: {
    borderColor: '#dc2626',
    backgroundColor: '#fffafa',
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    outlineStyle: 'none',
  },
  textoErroCampo: {
    color: '#dc2626',
    fontSize: 11,
    marginBottom: 15,
    marginTop: 5,
  },
  alertaErro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 20,
  },
  textoAlertaErro: {
    color: '#b91c1c',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  botao: {
    backgroundColor: '#1746B0',
    height: 53,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 23,
    gap: 12,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  ou: {
    color: '#94a3b8',
    fontSize: 11,
  },
  cadastroContainer: {
    alignItems: 'center',
    gap: 7,
  },
  textoCadastro: {
    color: '#64748b',
    fontSize: 13,
  },
  linkCadastro: {
    color: '#1746B0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rodape: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 25,
  },
});
