
import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { UsuarioContext } from '../context/UsuarioContext';

export default function Cadastro({ navigation }) {
  const { cadastrar } = useContext(UsuarioContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');

  const [erros, setErros] = useState({});
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Validação dos campos do formulário
  const validarCampos = () => {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'Informe seu nome completo.';
    } else if (nome.trim().length < 3) {
      novosErros.nome = 'O nome deve possuir pelo menos 3 caracteres.';
    }

    const emailLimpo = email.trim();

    if (!emailLimpo) {
      novosErros.email = 'Informe seu endereço de e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailLimpo)) {
      novosErros.email = 'Digite um e-mail válido. Exemplo: nome@email.com';
    }

    if (!senha) {
      novosErros.senha = 'Informe uma senha.';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve possuir pelo menos 6 caracteres.';
    }

    const numeroCelular = celular.replace(/\D/g, '');

    if (
      numeroCelular &&
      numeroCelular.length !== 10 &&
      numeroCelular.length !== 11
    ) {
      novosErros.celular = 'Informe um celular com DDD válido.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const fazerCadastro = () => {
    setMensagemErro('');
    setMensagemSucesso('');

    if (!validarCampos()) {
      setMensagemErro('Verifique os campos destacados e tente novamente.');
      return;
    }

    try {
      const resultado = cadastrar({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        celular: celular.replace(/\D/g, ''),
        cpf: cpf.replace(/\D/g, '').slice(0, 11),
        endereco: endereco.trim(),
        cidade: cidade.trim(),
      });

      if (!resultado || !resultado.sucesso) {
        setMensagemErro(
          resultado?.mensagem || 'Não foi possível realizar o cadastro.'
        );
        return;
      }

      setMensagemSucesso('Cadastro realizado com sucesso!');
    } catch (erro) {
      setMensagemErro(
        erro.message || 'Ocorreu um erro ao realizar seu cadastro.'
      );
    }
  };

  // Componente reutilizável para os campos
  const campo = (
    titulo,
    valor,
    alterar,
    placeholder,
    icone,
    teclado = 'default',
    nomeCampo,
    opcional = false,
    seguro = false
  ) => (
    <View style={styles.campo}>
      <Text style={styles.label}>
        {titulo}
        {opcional && <Text style={styles.opcional}> (opcional)</Text>}
      </Text>

      <View
        style={[
          styles.inputContainer,
          erros[nomeCampo] && styles.inputErro,
        ]}
      >
        <Ionicons
          name={icone}
          size={19}
          color={erros[nomeCampo] ? '#dc2626' : '#64748b'}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={valor}
          onChangeText={(texto) => {
            // CPF aceita somente números e no máximo 11 dígitos
            const valorFinal =
              nomeCampo === 'cpf'
                ? texto.replace(/\D/g, '').slice(0, 11)
                : texto;

            alterar(valorFinal);

            if (erros[nomeCampo]) {
              setErros((anteriores) => ({
                ...anteriores,
                [nomeCampo]: '',
              }));
            }

            setMensagemErro('');
          }}
          keyboardType={
            nomeCampo === 'cpf' ? 'numeric' : teclado
          }
          maxLength={nomeCampo === 'cpf' ? 11 : undefined}
          autoCapitalize={
            teclado === 'email-address' ? 'none' : 'words'
          }
          secureTextEntry={seguro && !mostrarSenha}
          autoCorrect={false}
        />

        {seguro && (
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#64748b"
            />
          </TouchableOpacity>
        )}
      </View>

      {erros[nomeCampo] ? (
        <View style={styles.erroCampo}>
          <Ionicons
            name="alert-circle-outline"
            size={14}
            color="#dc2626"
          />
          <Text style={styles.textoErroCampo}>
            {erros[nomeCampo]}
          </Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#173b70" />
          <Text style={styles.textoVoltar}>Voltar ao login</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Criar conta</Text>

        <Text style={styles.subtitulo}>
          Preencha seus dados para acessar os serviços da prefeitura.
        </Text>

        <View style={styles.card}>
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

          {mensagemSucesso ? (
            <View style={styles.alertaSucesso}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#15803d"
              />
              <Text style={styles.textoAlertaSucesso}>
                {mensagemSucesso}
              </Text>
            </View>
          ) : null}

          {campo(
            'Nome completo *',
            nome,
            setNome,
            'Digite seu nome',
            'person-outline',
            'default',
            'nome'
          )}

          {campo(
            'E-mail *',
            email,
            setEmail,
            'seuemail@email.com',
            'mail-outline',
            'email-address',
            'email'
          )}

          {campo(
            'Celular',
            celular,
            setCelular,
            '(00) 00000-0000',
            'call-outline',
            'phone-pad',
            'celular',
            true
          )}

          {campo(
            'CPF',
            cpf,
            setCpf,
            'Digite os 11 números do CPF',
            'card-outline',
            'numeric',
            'cpf',
            true
          )}

          {campo(
            'Endereço',
            endereco,
            setEndereco,
            'Rua, número e bairro',
            'location-outline',
            'default',
            'endereco',
            true
          )}


          {campo(
            'Senha *',
            senha,
            setSenha,
            'Mínimo de 6 caracteres',
            'lock-closed-outline',
            'default',
            'senha',
            false,
            true
          )}

          <Text style={styles.observacao}>
            * Campos obrigatórios
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={fazerCadastro}
          >
            <Text style={styles.textoBotao}>
              Criar minha conta
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color="#fff"
            />
          </TouchableOpacity>
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
    padding: 22,
    paddingTop: 45,
    paddingBottom: 35,
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 25,
  },
  textoVoltar: {
    color: '#173b70',
    fontSize: 14,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#173b70',
  },
  subtitulo: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 7,
    marginBottom: 22,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e7edf5',
    elevation: 3,
    shadowColor: '#173b70',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  opcional: {
    fontSize: 11,
    fontWeight: 'normal',
    color: '#94a3b8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbe3ee',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 12,
    gap: 10,
  },
  inputErro: {
    borderColor: '#dc2626',
    backgroundColor: '#fffafa',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
    outlineStyle: 'none',
  },
  erroCampo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  textoErroCampo: {
    color: '#dc2626',
    fontSize: 11,
    flex: 1,
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
    marginBottom: 18,
  },
  textoAlertaErro: {
    color: '#b91c1c',
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  alertaSucesso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginBottom: 18,
  },
  textoAlertaSucesso: {
    color: '#15803d',
    fontSize: 12,
    flex: 1,
  },
  observacao: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#1746B0',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textoBotao: {
    color: '#fff',
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
