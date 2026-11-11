import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useUsuario } from '../../src/context/UsuarioContext';

export default function InicioScreen() {
  const router = useRouter();
  const { usuarioActivo } = useUsuario();

  return (
    <View style={styles.container}>
      <View style={styles.bienvenida}>
        <Text style={styles.etiqueta}>QUÉ COCINO</Text>

        <Text style={styles.saludo}>
          ¡Hola, {usuarioActivo?.nombre || 'usuario'}!
        </Text>

        <Text style={styles.subtitulo}>
          ¿Qué cocinamos hoy?
        </Text>

        <Text style={styles.descripcion}>
          Descubrí recetas según los ingredientes que tenés disponibles.
        </Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Comenzá por acá</Text>

        <Pressable
          style={styles.tarjeta}
          onPress={() => router.push('/(tabs)/ingredientes')}
        >
          <View style={styles.iconoIngredientes}>
            <Text style={styles.icono}>🥕</Text>
          </View>

          <View style={styles.textos}>
            <Text style={styles.tituloTarjeta}>Mis ingredientes</Text>
            <Text style={styles.descripcionTarjeta}>
              Administrá los ingredientes que tenés en casa.
            </Text>
            <Text style={styles.enlace}>Ver ingredientes →</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.tarjeta}
          onPress={() => router.push('/(tabs)/recetas')}
        >
          <View style={styles.iconoRecetas}>
            <Text style={styles.icono}>🍲</Text>
          </View>

          <View style={styles.textos}>
            <Text style={styles.tituloTarjeta}>Explorar recetas</Text>
            <Text style={styles.descripcionTarjeta}>
              Encontrá ideas para preparar tus comidas.
            </Text>
            <Text style={styles.enlace}>Ver recetas →</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.pie}>
        <View style={styles.linea} />
        <Text style={styles.textoPie}>
          Organizá, elegí y disfrutá tus comidas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 15,
  },
  bienvenida: {
    marginBottom: 42,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    color: '#66856A',
    marginBottom: 18,
  },
  saludo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#405B45',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 13,
  },
  descripcion: {
    fontSize: 14,
    color: '#777777',
    marginTop: 10,
    lineHeight: 22,
  },
  seccion: {
    gap: 17,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 2,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 19,
    borderWidth: 1,
    borderColor: '#EAE7DF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 125,
  },
  iconoIngredientes: {
    width: 58,
    height: 58,
    borderRadius: 15,
    backgroundColor: '#F8E9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoRecetas: {
    width: 58,
    height: 58,
    borderRadius: 15,
    backgroundColor: '#E5EDE3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icono: {
    fontSize: 28,
  },
  textos: {
    flex: 1,
  },
  tituloTarjeta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  descripcionTarjeta: {
    fontSize: 13,
    color: '#777777',
    marginTop: 6,
    lineHeight: 19,
  },
  enlace: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#66856A',
    marginTop: 11,
  },
  pie: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 25,
  },
  linea: {
    width: 42,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#D9B9A0',
    marginBottom: 13,
  },
  textoPie: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999999',
  },
});