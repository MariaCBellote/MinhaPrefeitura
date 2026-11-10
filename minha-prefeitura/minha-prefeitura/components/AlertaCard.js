
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function AlertaCard({ alerta }) {

  const [expandido, setExpandido] = useState(false);

  // Define a cor conforme o tipo do alerta
  const cores = {
  informativo: {
    fundo: '#bfdbfe',
    borda: '#1d4ed8',
    icone: '#1d4ed8',
    titulo: '#1e3a8a'
  },

  importante: {
    fundo: '#fed7aa',
    borda: '#ea580c',
    icone: '#c2410c',
    titulo: '#9a3412'
  },

  urgente: {
    fundo: '#fecaca',
    borda: '#dc2626',
    icone: '#b91c1c',
    titulo: '#7f1d1d'
  }
};

  const cor = cores[alerta.tipo] || cores.informativo;

  const icone = alerta.tipo === 'urgente'
    ? 'alert-circle'
    : alerta.tipo === 'importante'
      ? 'warning'
      : 'information-circle';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setExpandido(!expandido)}
      style={[
        styles.card,
        {
          backgroundColor: cor.fundo,
          borderLeftColor: cor.borda
        }
      ]}
    >

      {/* Conteúdo principal */}
      <View style={styles.linha}>

        <Ionicons
          name={icone}
          size={24}
          color={cor.icone}
          style={styles.icone}
        />

        <View style={styles.conteudo}>

          <Text
            style={[
              styles.titulo,
              { color: cor.titulo }
            ]}
          >
            {alerta.titulo}
          </Text>

          <Text style={styles.descricao}>
            {alerta.descricao}
          </Text>

        </View>

        <Ionicons
          name={expandido ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={cor.titulo}
        />

      </View>

      {/* Detalhes expansíveis */}
      {expandido && (

        <View style={styles.detalhes}>

          <View
            style={[
              styles.divisor,
              { backgroundColor: cor.borda }
            ]}
          />

          <Text style={styles.textoDetalhes}>
            {alerta.detalhes}
          </Text>

        </View>

      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    borderLeftWidth: 4,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icone: {
    marginRight: 10
  },

  conteudo: {
    flex: 1
  },

  titulo: {
    fontSize: 11,
    fontWeight: 'bold'
  },

  descricao: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4,
    lineHeight: 17
  },

  detalhes: {
    marginTop: 12
  },

  divisor: {
    height: 1,
    opacity: 0.3,
    marginBottom: 10
  },

  textoDetalhes: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 19
  }

});
