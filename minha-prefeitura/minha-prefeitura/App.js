
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';

import {
  ComunicadosProvider
} from './components/ComunicadosContext';

// Importação das telas
import Inicio from './telas/Inicio';
import Perfil from './telas/Perfil';
import Noticias from './telas/Noticias';
import Servicos from './telas/Servicos';
import Notificacoes from './telas/Notificacao';
import DetalhesNoticia from './telas/DetalhesNoticia';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegação inferior
function NavegacaoPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >

      <Tab.Screen
        name="Início"
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Serviços"
        component={Servicos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Notícias"
        component={Noticias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}

// Navegação geral
export default function App() {
  return (
    <ComunicadosProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen
            name="Principal"
            component={NavegacaoPrincipal}
          />

          <Stack.Screen
            name="Notificacoes"
            component={Notificacoes}
          />

          <Stack.Screen
            name="DetalhesNoticia"
            component={DetalhesNoticia}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ComunicadosProvider>
  );
}
