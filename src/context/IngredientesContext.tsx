import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useUsuario } from './UsuarioContext';

type ResultadoIngredientes = {
  agregados: number;
  repetidos: number;
};

type IngredientesContextType = {
  ingredientes: string[];
  cargando: boolean;
  agregarIngrediente: (nombre: string) => Promise<boolean>;
  agregarVariosIngredientes: (
    nombres: string[]
  ) => Promise<ResultadoIngredientes>;
  editarIngrediente: (
    nombreAnterior: string,
    nombreNuevo: string
  ) => Promise<boolean>;
  eliminarIngrediente: (nombre: string) => Promise<void>;
};

const IngredientesContext = createContext<
  IngredientesContextType | undefined
>(undefined);

export function IngredientesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuarioActivo } = useUsuario();

  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarIngredientes() {
      setCargando(true);
      setIngredientes([]);

      if (!usuarioActivo) {
        setCargando(false);
        return;
      }

      try {
        const clave = `@quecocino/ingredientes/${usuarioActivo.id}`;
        const datosGuardados = await AsyncStorage.getItem(clave);

        if (datosGuardados) {
          setIngredientes(JSON.parse(datosGuardados));
        }
      } catch (error) {
        console.error('Error al cargar ingredientes:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarIngredientes();
  }, [usuarioActivo]);

  async function agregarVariosIngredientes(
    nombres: string[]
  ): Promise<ResultadoIngredientes> {
    if (!usuarioActivo) {
      return { agregados: 0, repetidos: nombres.length };
    }

    const clave = `@quecocino/ingredientes/${usuarioActivo.id}`;

    try {
      const datosGuardados = await AsyncStorage.getItem(clave);
      const listaActual: string[] = datosGuardados
        ? JSON.parse(datosGuardados)
        : [];

      const nuevaLista = [...listaActual];
      let agregados = 0;
      let repetidos = 0;

      for (const nombre of nombres) {
        const limpio = nombre.trim();

        const yaExiste = nuevaLista.some(
          (item) => item.toLowerCase() === limpio.toLowerCase()
        );

        if (!limpio || yaExiste) {
          repetidos++;
        } else {
          nuevaLista.push(limpio);
          agregados++;
        }
      }

      await AsyncStorage.setItem(
        clave,
        JSON.stringify(nuevaLista)
      );

      setIngredientes(nuevaLista);

      return { agregados, repetidos };
    } catch (error) {
      console.error('Error al guardar ingredientes:', error);
      return { agregados: 0, repetidos: nombres.length };
    }
  }

  async function agregarIngrediente(nombre: string): Promise<boolean> {
    if (!nombre.trim()) {
      return false;
    }

    const resultado = await agregarVariosIngredientes([nombre]);
    return resultado.agregados > 0;
  }

  // NUEVA FUNCIÓN: EDITAR INGREDIENTE
  async function editarIngrediente(
    nombreAnterior: string,
    nombreNuevo: string
  ): Promise<boolean> {
    if (!usuarioActivo) {
      return false;
    }

    const limpio = nombreNuevo.trim();

    if (!limpio) {
      return false;
    }

    const yaExiste = ingredientes.some(
      (item) =>
        item.toLowerCase() === limpio.toLowerCase() &&
        item !== nombreAnterior
    );

    if (yaExiste) {
      return false;
    }

    const nuevaLista = ingredientes.map((ingrediente) =>
      ingrediente === nombreAnterior ? limpio : ingrediente
    );

    const clave = `@quecocino/ingredientes/${usuarioActivo.id}`;

    try {
      await AsyncStorage.setItem(clave, JSON.stringify(nuevaLista));
      setIngredientes(nuevaLista);
      return true;
    } catch (error) {
      console.error('Error al editar ingrediente:', error);
      return false;
    }
  }

  async function eliminarIngrediente(nombre: string): Promise<void> {
    if (!usuarioActivo) {
      return;
    }

    const nuevaLista = ingredientes.filter(
      (ingrediente) => ingrediente !== nombre
    );

    const clave = `@quecocino/ingredientes/${usuarioActivo.id}`;

    try {
      await AsyncStorage.setItem(clave, JSON.stringify(nuevaLista));
      setIngredientes(nuevaLista);
    } catch (error) {
      console.error('Error al eliminar ingrediente:', error);
    }
  }

  return (
    <IngredientesContext.Provider
      value={{
        ingredientes,
        cargando,
        agregarIngrediente,
        agregarVariosIngredientes,
        editarIngrediente,
        eliminarIngrediente,
      }}
    >
      {children}
    </IngredientesContext.Provider>
  );
}

export function useIngredientes() {
  const contexto = useContext(IngredientesContext);

  if (!contexto) {
    throw new Error(
      'useIngredientes debe utilizarse dentro de IngredientesProvider'
    );
  }

  return contexto;
}