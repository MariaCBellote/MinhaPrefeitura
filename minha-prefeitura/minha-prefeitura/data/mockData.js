
export const usuarioMock = [{
  id: '1',
  nome: 'João da Silva',
  email: 'joao@email.com',
  celular: '(27) 99999-9999',
  cpf: '000.000.000-00',
  endereco: 'Rua das Flores, 123',
  cidade: 'Cariacica - ES',
  foto: null
}];


export const alertasMock = [
  {
    id: 'a1',
    titulo: 'AVISO DE UTILIDADE PÚBLICA',
    descricao: 'Fique atento aos comunicados oficiais.',
    detalhes: 'A Prefeitura reforça a importância de acompanhar os canais oficiais para receber informações atualizadas sobre os serviços municipais.',
    tipo: 'informativo'
  },
  {
    id: 'a2',
    titulo: 'ATENÇÃO: MANUTENÇÃO NA REDE DE ÁGUA',
    descricao: 'Pode ocorrer interrupção temporária.',
    detalhes: 'Uma manutenção programada poderá afetar o abastecimento de água em alguns bairros. A previsão de normalização será divulgada pelos canais oficiais.',
    tipo: 'importante'
  },
  {
    id: 'a3',
    titulo: 'CAMPANHA DE VACINAÇÃO',
    descricao: 'Confira os locais de vacinação.',
    detalhes: 'As unidades de saúde municipais estão realizando ações de vacinação. Leve documento de identificação e carteira de vacinação.',
    tipo: 'informativo'
  },
  {
    id: 'a4',
    titulo: 'ATENÇÃO AO TRÂNSITO',
    descricao: 'Interdição temporária de uma via.',
    detalhes: 'Uma via municipal estará temporariamente interditada para execução de obras. Procure rotas alternativas.',
    tipo: 'importante'
  },

  {
  id: 'a5',
  titulo: 'ALERTA DE EMERGÊNCIA',
  descricao: 'Atenção: situação que exige cuidado imediato.',
  detalhes: 'A Defesa Civil orienta os moradores a acompanharem os comunicados oficiais e seguirem as recomendações de segurança.',
  tipo: 'urgente'
}
];

export const notificacoesMock = [
  {
    id: 'n1',
    titulo: 'Nova notícia publicada',
    mensagem: 'Confira as novidades sobre a campanha municipal de vacinação.',
    data: '10/11/2026',
    categoria: 'Notícias',
    lida: false,
    destino: { tipo: 'noticia', id: 'nt1' },
  },
  {
    id: 'n2',
    titulo: 'Atualização de serviços',
    mensagem: 'Consulte os horários de funcionamento dos serviços municipais.',
    data: '10/11/2026',
    categoria: 'Serviços',
    lida: false,
    destino: { tipo: 'aba', nome: 'Serviços' },
  },
  {
    id: 'n3',
    titulo: 'Comunicado importante',
    mensagem: 'Confira os telefones úteis e contatos de emergência da cidade.',
    data: '09/11/2026',
    categoria: 'Avisos',
    lida: true,
    destino: { tipo: 'servico', id: 's6' },
  },
  {
    id: 'n4',
    titulo: 'Obras na cidade',
    mensagem: 'Confira as informações sobre as obras em andamento.',
    data: '09/11/2026',
    categoria: 'Obras',
    lida: true,
    destino: { tipo: 'noticia', id: 'nt2' },
  },
  {
    id: 'n5',
    titulo: 'Campanha municipal',
    mensagem: 'Participe das ações promovidas pela Prefeitura.',
    data: '08/11/2026',
    categoria: 'Eventos',
    lida: true,
    destino: { tipo: 'noticia', id: 'nt5' },
  },
];


export const categoriasNoticiasMock = ['Todas', 'Saúde', 'Obras', 'Educação', 'Meio Ambiente', 'Cultura'];

export const noticiasMock = [
  {
    id: 'nt1',
    categoria: 'Saúde',
    titulo: 'Campanha de Vacinação municipal começa na próxima semana',
    resumo: 'Unidades de saúde atenderão de segunda a sexta, das 8h às 17h.',
    conteudo:
      'A Secretaria Municipal de Saúde inicia, na próxima segunda-feira, a campanha de vacinação em todas as unidades de saúde do município.\n\nO atendimento será de segunda a sexta, das 8h às 17h. Os cidadãos devem levar documento de identificação com foto e a carteira de vacinação.\n\nA prefeitura também organizará pontos extras de vacinação em escolas e praças nos fins de semana.',
    imagem: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    data: '10/11/2026',
    tempo: 'Há 2 horas',
  },
  {
    id: 'nt2',
    categoria: 'Obras',
    titulo: 'Manutenção e recapeamento asfáltico avançam em novas vias',
    resumo: 'Equipes trabalham em ruas de vários bairros; confira os trechos.',
    conteudo:
      'As obras de recapeamento asfáltico seguem em ritmo acelerado e já alcançam novas vias do município.\n\nDurante os serviços, poderá haver interdições parciais e desvios de trânsito. Agentes de trânsito estarão no local para orientar os motoristas.\n\nA previsão é concluir esta etapa nas próximas duas semanas, conforme as condições climáticas.',
    imagem: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    data: '10/11/2026',
    tempo: 'Há 5 horas',
  },
  {
    id: 'nt3',
    categoria: 'Educação',
    titulo: 'Matrículas para a rede municipal de ensino estão abertas',
    resumo: 'Pais e responsáveis podem fazer a pré-matrícula pela internet.',
    conteudo:
      'A Secretaria de Educação informa que as matrículas para o próximo ano letivo já estão abertas.\n\nÉ necessário apresentar certidão de nascimento, comprovante de residência e documento do responsável.\n\nHaverá atendimento presencial nas escolas e também na sede da Secretaria.',
    imagem: 'https://picsum.photos/seed/escola/800/500',
    data: '09/11/2026',
    tempo: 'Ontem',
  },
  {
    id: 'nt4',
    categoria: 'Meio Ambiente',
    titulo: 'Mutirão de plantio de árvores acontece no sábado',
    resumo: 'Voluntários são bem-vindos; mudas serão distribuídas.',
    conteudo:
      'A prefeitura realiza no sábado o mutirão de plantio de árvores nativas em áreas verdes da cidade.\n\nOs voluntários devem se encontrar às 8h no ponto de concentração. Serão distribuídas mudas e luvas.\n\nA ação faz parte do programa municipal de arborização urbana.',
    imagem: 'https://picsum.photos/seed/arvores/800/500',
    data: '08/11/2026',
    tempo: 'Há 2 dias',
  },
  {
    id: 'nt5',
    categoria: 'Cultura',
    titulo: 'Festival de música gratuito ocupa a praça central',
    resumo: 'Shows com artistas locais a partir das 18h.',
    conteudo:
      'A praça central recebe, no próximo fim de semana, um festival de música gratuito com artistas locais.\n\nA programação começa às 18h e inclui feira de artesanato e praça de alimentação.\n\nEntrada livre e acessível para pessoas com deficiência.',
    imagem: 'https://picsum.photos/seed/festival/800/500',
    data: '07/11/2026',
    tempo: 'Há 3 dias',
  },
];

export const servicosMock = [
  { id: 's1', nome: 'Coleta de Lixo', categoria: 'Utilidades', icone: 'trash-can-outline', lib: 'MCI', cor: '#15803d', fundo: '#dcfce7',
    descricao: 'Consulte dias e horários da coleta no seu bairro.' },
  { id: 's2', nome: 'Farmácias de Plantão', categoria: 'Saúde', icone: 'medkit-outline', lib: 'ION', cor: '#b91c1c', fundo: '#fee2e2',
    descricao: 'Veja quais farmácias estão abertas 24h.' },
  { id: 's3', nome: 'Ouvidoria', categoria: 'Atendimento', icone: 'chatbubble-ellipses-outline', lib: 'ION', cor: '#1d4ed8', fundo: '#dbeafe',
    descricao: 'Registre reclamações, sugestões e elogios.' },
  { id: 's4', nome: 'Agendamentos', categoria: 'Atendimento', icone: 'calendar-outline', lib: 'ION', cor: '#7e22ce', fundo: '#f3e8ff',
    descricao: 'Agende atendimento em postos e órgãos municipais.' },
  { id: 's5', nome: 'Transporte Público', categoria: 'Utilidades', icone: 'bus-outline', lib: 'ION', cor: '#b45309', fundo: '#fef3c7',
    descricao: 'Horários e itinerários das linhas de ônibus.' },
  { id: 's6', nome: 'Telefones Úteis', categoria: 'Utilidades', icone: 'call-outline', lib: 'ION', cor: '#0369a1', fundo: '#e0f2fe',
    descricao: 'Contatos de emergência e órgãos municipais.' },
  { id: 's7', nome: 'Coleta Seletiva', categoria: 'Utilidades', icone: 'recycle', lib: 'MCI', cor: '#047857', fundo: '#d1fae5',
    descricao: 'Pontos de descarte de recicláveis.' },
  { id: 's8', nome: 'Enquetes', categoria: 'Atendimento', icone: 'stats-chart-outline', lib: 'ION', cor: '#be185d', fundo: '#fce7f3',
    descricao: 'Opine sobre projetos e prioridades da cidade.' },
];

export const categoriasServicosMock = ['Todos', 'Utilidades', 'Saúde', 'Atendimento'];

// Cores das tags por categoria (usadas por NewsCard e DetalhesNoticia)
export const coresCategoriaMock = {
  Saúde: { fundo: '#dbeafe', texto: '#1d4ed8' },
  Obras: { fundo: '#fef3c7', texto: '#b45309' },
  Educação: { fundo: '#f3e8ff', texto: '#7e22ce' },
  'Meio Ambiente': { fundo: '#dcfce7', texto: '#15803d' },
  Cultura: { fundo: '#fce7f3', texto: '#be185d' },
};
