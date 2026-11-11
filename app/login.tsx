import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { useUsuario } from '../src/context/UsuarioContext';

export default function LoginScreen() {
  const router = useRouter();
  const { iniciarSesion } = useUsuario();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function ingresar() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Datos incompletos', 'Completá tu correo y contraseña.');
      return;
    }

    const ingresoExitoso = iniciarSesion(email, password);

    if (ingresoExitoso) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'El correo o la contraseña son incorrectos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qué Cocino</Text>
      <Text style={styles.subtitulo}>Ingresá a tu cuenta</Text>

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@correo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={ingresar}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/registro')}>
        <Text style={styles.registro}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    justifyContent: 'center',
    padding: 28,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#405B45',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 35,
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 13,
    marginBottom: 20,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#66856A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registro: {
    color: '#55765A',
    textAlign: 'center',
    marginTop: 22,
    fontSize: 15,
  },
});