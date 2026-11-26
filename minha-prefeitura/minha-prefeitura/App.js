
import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';

import { ComunicadosProvider } from './components/ComunicadosContext';

import {
  UsuarioProvider,
  UsuarioContext,
} from './context/UsuarioContext';

// Importação das telas principais
import Inicio from './telas/Inicio';
import Perfil from './telas/Perfil';
import Noticias from './telas/Noticias';
import Servicos from './telas/Servicos';

// Importação das telas de serviços
import Vacinacao from './telas/Servicos/Vacinacao';

// Importação das telas de notificações
import Notificacao from './telas/Notificacao';
import DetalhesNotificacao from './telas/DetalhesNotificacao';
import DetalhesNoticia from './telas/DetalhesNoticia';

// Importação das telas de autenticação
import Login from './telas/Login';
import Cadastro from './telas/Cadastro';

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
          height: 66,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          elevation: 12,
          shadowColor: '#0f172a',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -3 },
        },
      }}
    >
      <Tab.Screen
        name="Início"
        component={Inicio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Serviços"
        component={Servicos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="grid-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notícias"
        component={Noticias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="newspaper-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegação de acordo com o estado de autenticação
function NavegacaoApp() {
  const { usuario } = useContext(UsuarioContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={usuario ? 'sessao-autenticada' : 'sessao-anonima'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!usuario ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
            />

            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Principal"
              component={NavegacaoPrincipal}
            />

            <Stack.Screen
              name="Notificacoes"
              component={Notificacao}
            />

            <Stack.Screen
              name="DetalhesNotificacao"
              component={DetalhesNotificacao}
            />

            <Stack.Screen
              name="DetalhesNoticia"
              component={DetalhesNoticia}
            />

            {/* Tela de vacinação */}
            <Stack.Screen
              name="Vacinacao"
              component={Vacinacao}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Aplicativo
export default function App() {
  return (
    <ComunicadosProvider>
      <UsuarioProvider>
        <NavegacaoApp />
      </UsuarioProvider>
    </ComunicadosProvider>
  );
}
