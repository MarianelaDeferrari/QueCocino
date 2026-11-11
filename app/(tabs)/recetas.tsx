import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useIngredientes } from '../../src/context/IngredientesContext';
import { Receta, recetasIniciales } from '../../src/data/recetas';

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function coincideIngrediente(
  nombreReceta: string,
  ingredientesUsuario: string[]
) {
  const nombre = normalizar(nombreReceta);

  const equivalencias: Record<string, string[]> = {
    huevo: ['huevo', 'huevos'],
    papa: ['papa', 'papas', 'patata', 'patatas'],
    morron: ['morron', 'morrones', 'pimiento', 'pimientos'],
  };

  const nombresEquivalentes = equivalencias[nombre] ?? [nombre];

  return ingredientesUsuario.some((ingrediente) => {
    const ingredienteNormalizado = normalizar(ingrediente);

    return nombresEquivalentes.includes(ingredienteNormalizado);
  });
}

const colores = ['#66856A', '#D9A77B', '#A99BC4', '#C98779'];

export default function RecetasScreen() {
  const { ingredientes } = useIngredientes();

  const [recetaSeleccionada, setRecetaSeleccionada] =
    useState<Receta | null>(null);

  function obtenerDisponibles(receta: Receta) {
    return receta.ingredientes.filter((item) =>
      coincideIngrediente(item.nombre, ingredientes)
    );
  }

  function obtenerFaltantes(receta: Receta) {
    return receta.ingredientes.filter(
      (item) => !coincideIngrediente(item.nombre, ingredientes)
    );
  }

  // DETALLE DE RECETA
  if (recetaSeleccionada) {
    const disponibles = obtenerDisponibles(recetaSeleccionada);
    const faltantes = obtenerFaltantes(recetaSeleccionada);

    return (
      <ScrollView
        style={styles.contenedor}
        contentContainerStyle={styles.contenidoDetalle}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => setRecetaSeleccionada(null)}
          style={styles.botonVolver}
        >
          <Text style={styles.textoVolver}>‹ Volver a las recetas</Text>
        </Pressable>

        <View style={styles.encabezadoDetalle}>
          <Text style={styles.etiqueta}>DETALLE DE RECETA</Text>

          <Text style={styles.titulo}>
            {recetaSeleccionada.nombre}
          </Text>

          <Text style={styles.descripcion}>
            {recetaSeleccionada.descripcion}
          </Text>

          <View style={styles.informacion}>
            <View style={styles.dato}>
              <Text style={styles.datoEtiqueta}>TIEMPO</Text>
              <Text style={styles.datoValor}>
                {recetaSeleccionada.tiempo} min
              </Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.datoEtiqueta}>PORCIONES</Text>
              <Text style={styles.datoValor}>
                {recetaSeleccionada.porciones}
              </Text>
            </View>
          </View>
        </View>

        {/* INGREDIENTES */}
        <View style={styles.tarjeta}>
          <View style={styles.encabezadoTarjeta}>
            <Text style={styles.subtitulo}>Ingredientes</Text>

            <View style={styles.contador}>
              <Text style={styles.textoContador}>
                {disponibles.length}/{recetaSeleccionada.ingredientes.length}
              </Text>
            </View>
          </View>

          <Text style={styles.resumen}>
            Estos son los ingredientes que necesitás para preparar la receta.
          </Text>

          {recetaSeleccionada.ingredientes.map((item, index) => {
            const disponible = coincideIngrediente(
              item.nombre,
              ingredientes
            );

            return (
              <View
                key={index}
                style={[
                  styles.filaIngrediente,
                  index === recetaSeleccionada.ingredientes.length - 1 &&
                    styles.ultimaFila,
                ]}
              >
                <View style={styles.datosIngrediente}>
                  <Text style={styles.nombreIngrediente}>
                    {item.nombre}
                  </Text>

                  <Text style={styles.cantidad}>
                    {item.cantidad}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.estadoIngrediente,
                    disponible ? styles.disponible : styles.faltante,
                  ]}
                >
                  {disponible ? 'Disponible' : 'Te falta'}
                </Text>
              </View>
            );
          })}

          {faltantes.length === 0 ? (
            <View style={styles.mensajeCompleto}>
              <Text style={styles.textoCompleto}>
                ¡Tenés todos los ingredientes!
              </Text>
            </View>
          ) : (
            <Text style={styles.textoFaltantes}>
              Te faltan {faltantes.length}{' '}
              {faltantes.length === 1 ? 'ingrediente' : 'ingredientes'}.
            </Text>
          )}
        </View>

        {/* PREPARACIÓN */}
        <View style={styles.tarjeta}>
          <Text style={styles.subtitulo}>Preparación</Text>

          {recetaSeleccionada.preparacion.map((paso, index) => (
            <View key={index} style={styles.filaPaso}>
              <View style={styles.numeroCirculo}>
                <Text style={styles.numeroPaso}>{index + 1}</Text>
              </View>

              <Text style={styles.textoPaso}>{paso}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  // LISTA DE RECETAS
  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezadoLista}>
        <Text style={styles.etiqueta}>QUÉ COCINO</Text>

        <Text style={styles.titulo}>Recetas</Text>

        <Text style={styles.descripcion}>
          Encontrá comidas según los ingredientes que tenés.
        </Text>
      </View>

      <FlatList
        data={recetasIniciales}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const disponibles = obtenerDisponibles(item);
          const faltantes = obtenerFaltantes(item);

          return (
            <Pressable
              style={[
                styles.tarjetaReceta,
                { borderLeftColor: colores[index % colores.length] },
              ]}
              onPress={() => setRecetaSeleccionada(item)}
            >
              <Text style={styles.nombreReceta}>
                {item.nombre}
              </Text>

              <Text style={styles.descripcionReceta}>
                {item.descripcion}
              </Text>

              <View style={styles.datosLista}>
                <Text style={styles.datoLista}>
                  {item.tiempo} min
                </Text>

                <View style={styles.separador} />

                <Text style={styles.datoLista}>
                  {item.porciones}{' '}
                  {item.porciones === 1 ? 'porción' : 'porciones'}
                </Text>
              </View>

              <View style={styles.progresoIngredientes}>
                <Text style={styles.resumenLista}>
                  Ingredientes disponibles
                </Text>

                <Text style={styles.contadorLista}>
                  {disponibles.length} de {item.ingredientes.length}
                </Text>
              </View>

              <View style={styles.barraProgreso}>
                <View
                  style={[
                    styles.barraCompletada,
                    {
                      width: `${
                        item.ingredientes.length > 0
                          ? (disponibles.length / item.ingredientes.length) * 100
                          : 0
                      }%`,
                    },
                  ]}
                />
              </View>

              {faltantes.length === 0 ? (
                <Text style={styles.disponible}>
                  Tenés todos los ingredientes
                </Text>
              ) : (
                <Text style={styles.faltante}>
                  Te faltan {faltantes.length}{' '}
                  {faltantes.length === 1 ? 'ingrediente' : 'ingredientes'}
                </Text>
              )}

              <Text style={styles.verReceta}>
                Ver receta →
              </Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.mensajeVacio}>
            No hay recetas disponibles.
          </Text>
        }
      />
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
  encabezadoLista: {
    marginBottom: 23,
  },
  encabezadoDetalle: {
    marginBottom: 25,
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
    lineHeight: 21,
  },
  lista: {
    paddingBottom: 25,
    gap: 13,
  },
  tarjetaReceta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderLeftWidth: 4,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#EAE7DF',
  },
  nombreReceta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 7,
  },
  descripcionReceta: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 19,
    marginBottom: 15,
  },
  datosLista: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 17,
  },
  datoLista: {
    fontSize: 12,
    color: '#66856A',
    fontWeight: '600',
  },
  separador: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C9C9C9',
  },
  progresoIngredientes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resumenLista: {
    fontSize: 12,
    color: '#777777',
  },
  contadorLista: {
    fontSize: 12,
    color: '#444444',
    fontWeight: '600',
  },
  barraProgreso: {
    height: 6,
    backgroundColor: '#EAEDE7',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barraCompletada: {
    height: '100%',
    backgroundColor: '#66856A',
    borderRadius: 5,
  },
  disponible: {
    color: '#66856A',
    fontWeight: '600',
    fontSize: 13,
  },
  faltante: {
    color: '#B66A55',
    fontWeight: '600',
    fontSize: 13,
  },
  verReceta: {
    color: '#66856A',
    fontWeight: 'bold',
    marginTop: 14,
    fontSize: 13,
  },
  contenidoDetalle: {
    paddingBottom: 30,
  },
  botonVolver: {
    marginBottom: 22,
    paddingVertical: 6,
  },
  textoVolver: {
    color: '#66856A',
    fontWeight: '600',
    fontSize: 14,
  },
  informacion: {
    flexDirection: 'row',
    gap: 13,
    marginTop: 20,
  },
  dato: {
    backgroundColor: '#EAF0E8',
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 17,
    minWidth: 110,
  },
  datoEtiqueta: {
    fontSize: 10,
    color: '#66856A',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datoValor: {
    fontSize: 16,
    color: '#405B45',
    fontWeight: 'bold',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#EAE7DF',
  },
  encabezadoTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#405B45',
    marginBottom: 13,
  },
  contador: {
    backgroundColor: '#EAF0E8',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 13,
  },
  textoContador: {
    color: '#405B45',
    fontWeight: 'bold',
    fontSize: 12,
  },
  resumen: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 11,
    lineHeight: 19,
  },
  filaIngrediente: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 10,
  },
  ultimaFila: {
    borderBottomWidth: 0,
  },
  datosIngrediente: {
    flex: 1,
  },
  nombreIngrediente: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  cantidad: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  estadoIngrediente: {
    fontSize: 12,
    fontWeight: '600',
  },
  mensajeCompleto: {
    backgroundColor: '#EAF0E8',
    borderRadius: 9,
    padding: 13,
    marginTop: 15,
  },
  textoCompleto: {
    color: '#405B45',
    fontWeight: '600',
    fontSize: 13,
  },
  textoFaltantes: {
    color: '#B66A55',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 15,
  },
  filaPaso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 17,
    gap: 13,
  },
  numeroCirculo: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#EAF0E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroPaso: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#405B45',
  },
  textoPaso: {
    flex: 1,
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
    paddingTop: 3,
  },
  mensajeVacio: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 30,
  },
});