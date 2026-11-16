import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Executa uma função async (ex.: listarNoticias) e controla loading / erro / dados
export function useFetch(funcao, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(() => {
    let cancelado = false;
    setLoading(true);
    setError(null);
    funcao()
      .then((r) => !cancelado && setData(r))
      .catch((e) => !cancelado && setError(e.message || 'Erro desconhecido'))
      .finally(() => !cancelado && setLoading(false));
    return () => {
      cancelado = true;
    };
  }, deps);

  useEffect(() => carregar(), [carregar]);

  return { data, loading, error, recarregar: carregar };
}

export function LoadingState({ mensagem = 'Carregando...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d4ed8" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

export function ErrorState({ mensagem, onTentarNovamente }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={32} color="#b91c1c" />
      <Text style={styles.texto}>Não foi possível carregar os dados.</Text>
      {mensagem ? <Text style={styles.detalhe}>{mensagem}</Text> : null}
      {onTentarNovamente && (
        <TouchableOpacity style={styles.botao} onPress={onTentarNovamente}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  texto: { marginTop: 10, fontSize: 13, color: '#6b7280', textAlign: 'center' },
  detalhe: { marginTop: 4, fontSize: 11, color: '#9ca3af', textAlign: 'center' },
  botao: { marginTop: 14, backgroundColor: '#1d4ed8', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontSize: 12, fontWeight: '600' },
});