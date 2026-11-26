
// Lista de usuários cadastrados durante a execução do aplicativo
let usuarios = [];

// Retorna todos os usuários cadastrados
export function listarUsuarios() {
  return [...usuarios];
}

// Procura um usuário pelo e-mail
export function buscarUsuario(email) {
  const emailBusca = email.trim().toLowerCase();

  return usuarios.find(
    (usuario) => usuario.email.toLowerCase() === emailBusca
  );
}

// Cadastra um novo usuário
export function salvarUsuario(dados) {
  const emailExiste = buscarUsuario(dados.email);

  if (emailExiste) {
    return {
      sucesso: false,
      mensagem: 'Este e-mail já está cadastrado.',
    };
  }

  const novoUsuario = {
    id: Date.now().toString(),
    nome: dados.nome,
    email: dados.email.trim().toLowerCase(),
    senha: dados.senha,
    celular: dados.celular || '',
    cpf: dados.cpf || '',
    endereco: dados.endereco || '',
    cidade: dados.cidade || '',
    foto: null,
  };

  usuarios.push(novoUsuario);

  return {
    sucesso: true,
    usuario: novoUsuario,
  };
}

// Atualiza os dados de um usuário
export function atualizarUsuarioSalvo(id, novosDados) {
  const indice = usuarios.findIndex(
    (usuario) => usuario.id === id
  );

  if (indice === -1) {
    return false;
  }

  usuarios[indice] = {
    ...usuarios[indice],
    ...novosDados,
    id: usuarios[indice].id,
  };

  return true;
}
