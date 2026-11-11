
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useUsuario } from '../src/context/UsuarioContext';

export default function EntradaScreen() {
  const router = useRouter();
  const { usuarioActivo, cargando } = useUsuario();

  useEffect(() => {
    if (!cargando) {
      if (usuarioActivo) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [cargando, usuarioActivo]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#66856A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
