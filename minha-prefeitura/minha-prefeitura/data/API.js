// Camada de acesso à API. As telas NÃO chamam fetch direto: usam estas funções.
const BASE_URL = 'https://news-api.uat.i9tasks.com.br/api/v1';

// ⚠️ Pegue o slug da sua prefeitura em GET /api/v1/tenants (ou na tela /docs → Tenants → Try it out)
export const TENANT_SLUG = 'vitoria';

async function get(path) {
  const resposta = await fetch(`${BASE_URL}${path}`);
  if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao acessar a API`);
  return resposta.json();
}

// A resposta pode vir como array puro ou dentro de { data | items | results }
const extrairLista = (json) =>
  Array.isArray(json) ? json : json?.data ?? json?.items ?? json?.results ?? [];
const extrairObjeto = (json) => json?.data ?? json;

// Pega o primeiro campo existente (tolera snake_case / camelCase / PT / EN)
const pick = (obj, chaves, padrao) => {
  for (const k of chaves) if (obj?.[k] != null) return obj[k];
  return padrao;
};

function formatarData(iso) {
  const d = new Date(iso);
  if (!iso || isNaN(d)) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function tempoRelativo(iso) {
  const d = new Date(iso);
  if (!iso || isNaN(d)) return '';
  const min = Math.floor((Date.now() - d.getTime()) / 60000);
  if (min < 1) return 'Agora';
  if (min < 60) return `Há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Há ${h} hora${h > 1 ? 's' : ''}`;
  const dias = Math.floor(h / 24);
  return `Há ${dias} dia${dias > 1 ? 's' : ''}`;
}

// ===== ADAPTADORES: convertem o JSON da API para o formato que as telas já usam =====
// ⚠️ Os nomes dos campos abaixo são palpites. Veja o JSON real e ajuste a lista de chaves.
export function adaptarNoticia(n) {
  const dataBruta = pick(n, ['dataPublicacao', 'data_publicacao', 'publishedAt', 'publicadaEm', 'createdAt']);
  return {
    id: String(pick(n, ['id', 'noticiaId'], '')),
    slug: pick(n, ['slug', 'noticiaSlug']),
    titulo: pick(n, ['titulo', 'title'], ''),
    resumo: pick(n, ['resumo', 'subtitulo', 'summary'], ''),
    conteudo: pick(n, ['conteudo', 'corpo', 'texto', 'content', 'descricao'], ''),
    imagem: pick(n, ['imagem', 'imagemUrl', 'imagem_url', 'imageUrl', 'image', 'capa']),
    categoria: pick(n, ['categoria', 'category', 'tipo'], 'Geral'),
    data: formatarData(dataBruta),
    tempo: tempoRelativo(dataBruta),
  };
}

export function adaptarNotificacao(n) {
  const dataBruta = pick(n, ['dataPublicacao', 'data_publicacao', 'createdAt', 'data']);
  return {
    id: String(pick(n, ['id', 'notificacaoId'], '')),
    titulo: pick(n, ['titulo', 'title'], ''),
    mensagem: pick(n, ['mensagem', 'descricao', 'message', 'corpo'], ''),
    detalhes: pick(n, ['detalhes', 'conteudo', 'descricaoCompleta', 'descricao_completa', 'texto', 'descricao']),
    categoria: pick(n, ['categoria', 'tipo', 'category'], 'Avisos'),
    data: formatarData(dataBruta),
    lida: false,
    // se a notificação referenciar uma notícia, o toque abre o detalhe
    noticiaSlug: pick(n, ['noticiaSlug', 'noticia_slug', 'slugNoticia']),
  };
}

// ===== Funções públicas =====
export async function listarNoticias() {
  const json = await get(`/tenants/${TENANT_SLUG}/noticias`);
  return extrairLista(json).map(adaptarNoticia);
}

export async function buscarNoticia(slug) {
  const json = await get(`/tenants/${TENANT_SLUG}/noticias/${slug}`);
  return adaptarNoticia(extrairObjeto(json));
}

export async function listarNotificacoes() {
  const json = await get(`/tenants/${TENANT_SLUG}/notificacoes`);
  return extrairLista(json).map(adaptarNotificacao);
}

export async function buscarNotificacao(id) {
  const json = await get(`/tenants/${TENANT_SLUG}/notificacoes/${id}`);
  return adaptarNotificacao(extrairObjeto(json));
}