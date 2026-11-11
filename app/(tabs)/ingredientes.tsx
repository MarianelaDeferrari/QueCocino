import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { useIngredientes } from '../../src/context/IngredientesContext';

const ingredientesValidos: Record<string, string> = {
  tomate: 'Tomate',
  papa: 'Papa',
  patata: 'Papa',
  cebolla: 'Cebolla',
  ajo: 'Ajo',
  zanahoria: 'Zanahoria',
  arroz: 'Arroz',
  huevo: 'Huevo',
  huevos: 'Huevo',
  leche: 'Leche',
  queso: 'Queso',
  manteca: 'Manteca',
  pollo: 'Pollo',
  carne: 'Carne',
  pescado: 'Pescado',
  atun: 'Atun',
  fideos: 'Fideos',
  pasta: 'Fideos',
  lechuga: 'Lechuga',
  espinaca: 'Espinaca',
  morron: 'Morron',
  pimiento: 'Morron',
  manzana: 'Manzana',
  banana: 'Banana',
  naranja: 'Naranja',
  limon: 'Limon',
  frutilla: 'Frutilla',
  palta: 'Palta',
  aceite: 'Aceite',
  azucar: 'Azucar',
  sal: 'Sal',
  lentejas: 'Lentejas',
  porotos: 'Porotos',
  garbanzos: 'Garbanzos',
  choclo: 'Choclo',
  brocoli: 'Brocoli',
  calabaza: 'Calabaza',
};

const ingredientesParaElegir = [
  ...new Set(Object.values(ingredientesValidos)),
];

const colores = ['#66856A', '#D9A77B', '#C98779', '#A99BC4'];

function normalizar(texto: string) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function IngredientesScreen() {
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [ingredienteEditando, setIngredienteEditando] = useState<string | null>(null);

  const {
    ingredientes,
    cargando,
    agregarIngrediente,
    agregarVariosIngredientes,
    eliminarIngrediente,
    editarIngrediente,
  } = useIngredientes();

  async function tomarFoto() {
    try {
      const permiso =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permiso.granted) {
        Alert.alert(
          'Permiso necesario',
          'Necesitamos permiso para utilizar la cámara del celular.'
        );
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        setFoto(resultado.assets[0].uri);
        setSeleccionados([]);
        setNombre('');
        setIngredienteEditando(null);
      }
    } catch {
      Alert.alert('Error', 'No se pudo abrir la cámara.');
    }
  }

  function seleccionarIngrediente(ingrediente: string) {
    setSeleccionados((actuales) =>
      actuales.includes(ingrediente)
        ? actuales.filter((item) => item !== ingrediente)
        : [...actuales, ingrediente]
    );
  }

  async function agregarSeleccionados() {
    if (seleccionados.length === 0) {
      Alert.alert(
        'Atención',
        'Seleccioná al menos un ingrediente.'
      );
      return;
    }

    const resultado = await agregarVariosIngredientes(seleccionados);

    if (resultado.agregados > 0) {
      setSeleccionados([]);
      setFoto(null);
    }

    Alert.alert(
      'Carga finalizada',
      `Se agregaron ${resultado.agregados} ingredientes.` +
        (resultado.repetidos > 0
          ? `\n${resultado.repetidos} ya estaban en tu lista.`
          : '')
    );
  }

  async function agregar() {
    const clave = normalizar(nombre);

    if (!clave) {
      Alert.alert('Atención', 'Escribí un ingrediente.');
      return;
    }

    const nombreCorrecto = ingredientesValidos[clave];

    if (!nombreCorrecto) {
      Alert.alert(
        'Ingrediente no reconocido',
        'Ese ingrediente no está en nuestra lista.'
      );
      return;
    }

    const agregado = await agregarIngrediente(nombreCorrecto);

    if (!agregado) {
      Alert.alert('Atención', 'Ese ingrediente ya está agregado.');
      return;
    }

    setNombre('');
  }

  function iniciarEdicion(nombreIngrediente: string) {
    setIngredienteEditando(nombreIngrediente);
    setNombre(nombreIngrediente);
  }

  function cancelarEdicion() {
    setIngredienteEditando(null);
    setNombre('');
  }

  async function guardarEdicion() {
    if (!ingredienteEditando) return;

    const clave = normalizar(nombre);

    if (!clave) {
      Alert.alert('Atención', 'Escribí el nuevo nombre.');
      return;
    }

    const nombreCorrecto = ingredientesValidos[clave];

    if (!nombreCorrecto) {
      Alert.alert(
        'Ingrediente no reconocido',
        'Ese ingrediente no está en nuestra lista.'
      );
      return;
    }

    const actualizado = await editarIngrediente(
      ingredienteEditando,
      nombreCorrecto
    );

    if (!actualizado) {
      Alert.alert(
        'No se pudo editar',
        'Ese ingrediente ya existe en tu lista o ocurrió un error al guardar.'
      );
      return;
    }

    setIngredienteEditando(null);
    setNombre('');

    Alert.alert('¡Listo!', 'El ingrediente se actualizó correctamente.');
  }

  async function eliminar(nombreIngrediente: string) {
    Alert.alert(
      'Eliminar ingrediente',
      `¿Querés eliminar ${nombreIngrediente} de tu lista?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarIngrediente(nombreIngrediente),
        },
      ]
    );
  }

  function quitarFoto() {
    setFoto(null);
    setSeleccionados([]);
  }

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Mis ingredientes</Text>

      <Text style={styles.descripcion}>
        Agregá lo que tenés en casa para descubrir qué podés cocinar.
      </Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder={
            ingredienteEditando
              ? 'Escribí el nuevo nombre...'
              : 'Ej.: tomate, arroz, huevo...'
          }
          placeholderTextColor="#999"
          value={nombre}
          onChangeText={setNombre}
        />

        <Pressable
          style={styles.botonAgregar}
          onPress={ingredienteEditando ? guardarEdicion : agregar}
        >
          <Text style={styles.textoBotonAgregar}>
            {ingredienteEditando
              ? 'Guardar cambios'
              : '+ Agregar ingrediente'}
          </Text>
        </Pressable>

        {ingredienteEditando !== null && (
          <Pressable
            style={styles.botonCancelar}
            onPress={cancelarEdicion}
          >
            <Text style={styles.textoBotonCancelar}>
              Cancelar edición
            </Text>
          </Pressable>
        )}

        <Pressable style={styles.botonCamara} onPress={tomarFoto}>
          <Text style={styles.textoBotonCamara}>
            📷 Fotografiar ingredientes
          </Text>
        </Pressable>

        {foto !== null && (
          <>
            <View style={styles.contenedorFoto}>
              <Image source={{ uri: foto }} style={styles.foto} />

              <Pressable onPress={quitarFoto}>
                <Text style={styles.quitarFoto}>Quitar foto</Text>
              </Pressable>
            </View>

            <View style={styles.opcionesFoto}>
              <Text style={styles.tituloOpcionesFoto}>
                ¿Qué ingredientes aparecen en la foto?
              </Text>

              <Text style={styles.descripcionSeleccion}>
                Seleccioná todos los alimentos que aparecen.
              </Text>

              <View style={styles.listaOpcionesFoto}>
                {ingredientesParaElegir.map((ingrediente) => {
                  const seleccionado =
                    seleccionados.includes(ingrediente);

                  return (
                    <Pressable
                      key={ingrediente}
                      style={[
                        styles.opcionFoto,
                        seleccionado && styles.opcionSeleccionada,
                      ]}
                      onPress={() =>
                        seleccionarIngrediente(ingrediente)
                      }
                    >
                      <Text
                        style={[
                          styles.textoOpcionFoto,
                          seleccionado && styles.textoSeleccionado,
                        ]}
                      >
                        {seleccionado ? '✓ ' : '+ '}
                        {ingrediente}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.contadorSeleccion}>
                {seleccionados.length} ingredientes seleccionados
              </Text>

              <Pressable
                style={styles.botonAgregarSeleccionados}
                onPress={agregarSeleccionados}
              >
                <Text style={styles.textoBotonAgregar}>
                  Agregar seleccionados
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>

      <Text style={styles.subtitulo}>
        Mi lista ({ingredientes.length})
      </Text>

      {cargando ? (
        <Text style={styles.mensaje}>
          Cargando ingredientes...
        </Text>
      ) : ingredientes.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.textoVacio}>🥕</Text>
          <Text style={styles.descripcionVacio}>
            Todavía no agregaste ingredientes.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ingredientes}
          scrollEnabled={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.lista}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View
                style={[
                  styles.indicador,
                  {
                    backgroundColor: colores[index % colores.length],
                  },
                ]}
              />

              <Text style={styles.nombreIngrediente}>
                {item}
              </Text>

              <View style={styles.accionesItem}>
                <Pressable onPress={() => iniciarEdicion(item)}>
                  <Text style={styles.editar}>Editar</Text>
                </Pressable>

                <Pressable onPress={() => eliminar(item)}>
                  <Text style={styles.eliminar}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  contenido: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EAE8E1',
  },
  input: {
    backgroundColor: '#FAF9F6',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
    color: '#333',
  },
  botonCamara: {
    backgroundColor: '#F8E9D9',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  textoBotonCamara: {
    color: '#805C42',
    fontWeight: '600',
  },
  botonAgregar: {
    backgroundColor: '#66856A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonAgregar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonCancelar: {
    backgroundColor: '#F0F0EC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotonCancelar: {
    color: '#666666',
    fontWeight: '600',
  },
  contenedorFoto: {
    alignItems: 'center',
    marginBottom: 12,
  },
  foto: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
  quitarFoto: {
    color: '#C45B52',
    marginTop: 8,
    fontWeight: '600',
  },
  opcionesFoto: {
    marginTop: 12,
    marginBottom: 15,
    padding: 14,
    backgroundColor: '#F0F4ED',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#66856A',
  },
  tituloOpcionesFoto: {
    color: '#405B45',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  descripcionSeleccion: {
    color: '#777',
    fontSize: 13,
    marginBottom: 12,
  },
  listaOpcionesFoto: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcionFoto: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D5DFD2',
  },
  opcionSeleccionada: {
    backgroundColor: '#405B45',
    borderColor: '#405B45',
  },
  textoOpcionFoto: {
    color: '#405B45',
    fontWeight: '600',
  },
  textoSeleccionado: {
    color: '#FFFFFF',
  },
  contadorSeleccion: {
    color: '#405B45',
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  botonAgregarSeleccionados: {
    backgroundColor: '#66856A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 12,
  },
  lista: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAE8E1',
  },
  indicador: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  nombreIngrediente: {
    flex: 1,
    fontSize: 15,
    color: '#405B45',
    fontWeight: '500',
  },
  accionesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editar: {
    color: '#66856A',
    fontSize: 13,
    fontWeight: '600',
  },
  eliminar: {
    color: '#C45B52',
    fontSize: 13,
    fontWeight: '600',
  },
  mensaje: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  vacio: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  textoVacio: {
    fontSize: 36,
    marginBottom: 10,
  },
  descripcionVacio: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});