import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuthStore } from '../stores/authStore';

export default function LoginScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp, isLoading, error, isAuthenticated, profile, signOut } = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) return;
    try {
      if (isSignUp) {
        await signUp(email, password, fullName || 'Utilizador Lotae');
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      // Error handled in store
    }
  };

  if (isAuthenticated) {
    return (
      <View style={styles.container} testID="dashboard-home">
        <Text style={styles.title}>Bem-vindo ao Lotae, {profile?.full_name || 'Passageiro'}!</Text>
        <Text style={styles.subtitle}>Perfil: {profile?.role || 'passenger'}</Text>
        <TouchableOpacity
          style={styles.button}
          testID="botao-sair"
          onPress={() => signOut()}
        >
          <Text style={styles.buttonText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card} testID="login-container">
        <Text style={styles.headerTitle}>Lotae - Gestão de Lotações</Text>
        <Text style={styles.headerSubtitle}>{isSignUp ? 'Criar Conta' : 'Iniciar Sessão'}</Text>

        {error ? <Text style={styles.errorText} testID="text-error">{error}</Text> : null}

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
            testID="input-nome"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          testID="input-email"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          testID="input-senha"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}
          testID="botao-entrar"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isSignUp ? 'Cadastrar' : 'Entrar'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsSignUp(!isSignUp)}
          testID="btn-toggle-mode"
        >
          <Text style={styles.switchText}>
            {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  },
  button: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    alignItems: 'center',
    padding: 8,
  },
  switchText: {
    color: '#2563eb',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorText: {
    color: '#dc2626',
    marginBottom: 16,
    textAlign: 'center',
  },
});
