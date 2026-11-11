import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useUsuario } from '../../src/context/UsuarioContext';

export default function PerfilScreen() {
  const { usuarioActivo, cerrarSesion } = useUsuario();
  const router = useRouter();

  function confirmarCierreSesion() {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que querés cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            cerrarSesion();
            router.replace('/login');
          },
        },
      ]
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>QUÉ COCINO</Text>

      <Text style={styles.titulo}>Mi perfil</Text>

      <Text style={styles.descripcion}>
        Consultá los datos de tu cuenta.
      </Text>

      <View style={styles.tarjeta}>
        <View style={styles.avatar}>
          <Text style={styles.inicial}>
            {usuarioActivo?.nombreUsuario?.charAt(0).toUpperCase() ?? '?'}
          </Text>
        </View>

        <Text style={styles.nombre}>
          {usuarioActivo?.nombreUsuario ?? 'Usuario'}
        </Text>

        <Text style={styles.textoSecundario}>
          Tu cuenta de Qué Cocino
        </Text>

        <View style={styles.separador} />

        <Text style={styles.subtitulo}>Información personal</Text>

        <View style={styles.dato}>
          <Text style={styles.etiquetaDato}>Nombre y apellido</Text>
          <Text style={styles.valorDato}>
            {usuarioActivo
              ? `${usuarioActivo.nombre} ${usuarioActivo.apellido}`
              : 'No disponible'}
          </Text>
        </View>

        <View style={styles.dato}>
          <Text style={styles.etiquetaDato}>Nombre de usuario</Text>
          <Text style={styles.valorDato}>
            {usuarioActivo?.nombreUsuario ?? 'No disponible'}
          </Text>
        </View>

        <View style={styles.dato}>
          <Text style={styles.etiquetaDato}>Correo electrónico</Text>
          <Text style={styles.valorDato}>
            {usuarioActivo?.email ?? 'No disponible'}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.botonCerrar}
        onPress={confirmarCierreSesion}
      >
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#66856A',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 25,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE7DF',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EAF0E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  inicial: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#405B45',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 5,
  },
  textoSecundario: {
    fontSize: 13,
    color: '#888888',
  },
  separador: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 22,
  },
  subtitulo: {
    alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 10,
  },
  dato: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 14,
  },
  etiquetaDato: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  valorDato: {
    fontSize: 15,
    color: '#444444',
    fontWeight: '500',
  },
  botonCerrar: {
    backgroundColor: '#F5E5E1',
    borderRadius: 11,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBoton: {
    color: '#B66A55',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
