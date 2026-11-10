import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9ca3af" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative', justifyContent: 'center' },
  icon: { position: 'absolute', left: 12, zIndex: 1 },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    paddingLeft: 38,
    paddingRight: 14,
    fontSize: 13,
    color: '#1f2937',
  },
});