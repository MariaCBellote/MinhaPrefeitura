// Camada única de comunicação com a API pública Minha Prefeitura.
const BASE_URL = 'https://news-api.uat.i9tasks.com.br/api/v1';
export const TENANT_SLUG = 'vitoria';

async function get(path) {
  const resposta = await fetch(`${BASE_URL}${path}`);
  let json;
  try {
    json = await resposta.json();
  } catch {
    json = null;
  }

  if (!resposta.ok) {
    const mensagem = json?.error?.message || `Erro ${resposta.status} ao acessar a API`;
    throw new Error(mensagem);
  }
  return json;
}

const extrairLista = (json) =>
  Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
const extrairObjeto = (json) => json?.data ?? json;

function formatarData(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR');
}

function tempoRelativo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const minutos = Math.max(0, Math.floor((Date.now() - d.getTime()) / 60000));
  if (minutos < 1) return 'Agora';
  if (minutos < 60) return `Há ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `Há ${horas} hora${horas === 1 ? '' : 's'}`;
  const dias = Math.floor(horas / 24);
  return `Há ${dias} dia${dias === 1 ? '' : 's'}`;
}

// A API de notícias não fornece categoria. A classificação abaixo é local,
// baseada no título e resumo recebidos, sem criar ou substituir notícias.
export const CATEGORIAS_NOTICIAS = [
  'Todas', 'Saúde', 'Educação', 'Obras e infraestrutura',
  'Meio ambiente', 'Cultura e lazer', 'Esporte',
  'Mobilidade', 'Assistência social', 'Administração', 'Geral'
];

function classificarNoticia(n) {
  const categoriaApi = n?.categoria || n?.category;
  if (categoriaApi) return String(categoriaApi);

  const texto = `${n?.titulo || ''} ${n?.resumo || ''}`.toLocaleLowerCase('pt-BR');
  const regras = [
    ['Saúde', /saúde|vacina|vacinação|hospital|ubs|unidade de saúde|dengue|consulta|medic|doença/],
    ['Educação', /educaç|escola|aluno|matrícula|ensino|professor|creche|aula/],
    ['Obras e infraestrutura', /obra|reforma|recape|asfalto|pavimenta|construção|infraestrutura|ponte/],
    ['Meio ambiente', /meio ambiente|ambiental|árvore|plantio|reciclag|coleta seletiva|sustent|praia|parque/],
    ['Cultura e lazer', /cultura|festival|música|show|teatro|biblioteca|exposição|artesanato|lazer/],
    ['Esporte', /esporte|esportivo|campeonato|torneio|futebol|corrida|atleta/],
    ['Mobilidade', /trânsito|transporte|ônibus|mobilidade|rua interditada|interdição|ciclovia/],
    ['Assistência social', /assistência social|social|cras|creas|doação|família|idoso|moradia/],
    ['Administração', /prefeitura|secretaria|servidor|gestão|atendimento|concurso|tribut|imposto/],
  ];
  const encontrada = regras.find(([, regex]) => regex.test(texto));
  return encontrada ? encontrada[0] : 'Geral';
}

export function adaptarNoticia(n = {}) {
  const dataBruta = n.publicado_em || n.dataPublicacao || n.data_publicacao || n.publishedAt;
  return {
    ...n,
    id: String(n.id || n.noticiaId || ''),
    slug: n.slug || n.noticiaSlug || '',
    titulo: n.titulo || n.title || 'Notícia sem título',
    resumo: n.resumo || n.summary || '',
    conteudo: n.conteudo || n.content || n.resumo || '',
    imagem: n.imagem_capa_url || n.imagem || n.imagem_url || n.imageUrl || null,
    categoria: classificarNoticia(n),
    publicado_em: dataBruta || null,
    data: formatarData(dataBruta),
    tempo: tempoRelativo(dataBruta),
  };
}

export function adaptarNotificacao(n = {}) {
  const dataBruta = n.enviado_em || n.created_at || n.data || null;
  return {
    ...n,
    id: String(n.id || n.notificacaoId || ''),
    titulo: n.titulo || n.title || 'Notificação',
    mensagem: n.mensagem || n.message || '',
    detalhes: n.mensagem || n.detalhes || '',
    tipo: n.tipo || 'aviso',
    categoria: n.tipo || 'Avisos',
    link_acao: n.link_acao || null,
    enviado_em: dataBruta,
    expira_em: n.expira_em || null,
    data: formatarData(dataBruta),
    lida: false,
  };
}

export async function listarNoticias() {
  const json = await get(`/tenants/${TENANT_SLUG}/noticias?page=1&per_page=100`);
  return extrairLista(json).map(adaptarNoticia);
}

export async function buscarNoticia(slug) {
  const json = await get(`/tenants/${TENANT_SLUG}/noticias/${encodeURIComponent(slug)}`);
  return adaptarNoticia(extrairObjeto(json));
}

export async function listarNotificacoes() {
  const json = await get(`/tenants/${TENANT_SLUG}/notificacoes?page=1&per_page=100`);
  return extrairLista(json).map(adaptarNotificacao);
}

export async function buscarNotificacao(id) {
  const json = await get(`/tenants/${TENANT_SLUG}/notificacoes/${encodeURIComponent(id)}`);
  return adaptarNotificacao(extrairObjeto(json));
}
