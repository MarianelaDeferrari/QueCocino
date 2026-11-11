
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';

import { useUsuario } from '../src/context/UsuarioContext';
import { Usuario } from '../src/types/Usuario';

export default function RegistroScreen() {
  const router = useRouter();
  const { registrar } = useUsuario();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function crearCuenta() {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !nombreUsuario.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert('Datos incompletos', 'Completá todos los campos.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Correo inválido', 'Ingresá un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      nombreUsuario: nombreUsuario.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    const registrado = await registrar(nuevoUsuario);

    if (registrado) {
      Alert.alert(
        '¡Cuenta creada!',
        'Ya podés ingresar con tu correo y contraseña.',
        [{ text: 'Aceptar', onPress: () => router.replace('/login') }]
      );
    } else {
      Alert.alert(
        'No se pudo registrar',
        'Ese correo o nombre de usuario ya está en uso.'
      );
    }
  }

  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Crear cuenta</Text>
      <Text style={styles.subtitulo}>
        Completá tus datos para comenzar
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu apellido"
        value={apellido}
        onChangeText={setApellido}
      />

      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Elegí un usuario"
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        autoCapitalize="none"
      />

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
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={crearCuenta}>
        <Text style={styles.textoBoton}>Crear cuenta</Text>
      </Pressable>

      <Pressable onPress={() => router.replace('/login')}>
        <Text style={styles.volver}>Ya tengo una cuenta</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#405B45',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
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
    marginBottom: 17,
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
  volver: {
    color: '#55765A',
    textAlign: 'center',
    marginTop: 22,
    fontSize: 15,
  },
});
