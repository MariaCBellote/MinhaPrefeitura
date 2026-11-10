
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CampoPerfil({
  titulo,
  valor,
  icone,
  editavel,
  onChangeText,
  teclado = 'default'
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.campo}>
        <Ionicons
          name={icone}
          size={19}
          color="#64748b"
        />

        <TextInput
          style={styles.input}
          value={valor}
          editable={editavel}
          onChangeText={onChangeText}
          keyboardType={teclado}
          placeholder={`Digite seu ${titulo.toLowerCase()}`}
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  titulo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 7
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: '#1f2937'
  }
});
