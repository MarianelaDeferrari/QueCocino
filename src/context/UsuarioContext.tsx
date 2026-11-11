
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import { Usuario } from '../types/Usuario';

type UsuarioContextType = {
  usuarios: Usuario[];
  usuarioActivo: Usuario | null;
  cargando: boolean;
  registrar: (usuario: Usuario) => Promise<boolean>;
  iniciarSesion: (email: string, password: string) => boolean;
  cerrarSesion: () => void;
};

const UsuarioContext = createContext<UsuarioContextType | undefined>(
  undefined
);

const CLAVE_USUARIOS = '@quecocino/usuarios';
const CLAVE_SESION = '@quecocino/sesion';

export function UsuarioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const usuariosGuardados = await AsyncStorage.getItem(CLAVE_USUARIOS);
        const sesionGuardada = await AsyncStorage.getItem(CLAVE_SESION);

        if (usuariosGuardados) {
          setUsuarios(JSON.parse(usuariosGuardados));
        }

        if (sesionGuardada && usuariosGuardados) {
          const lista: Usuario[] = JSON.parse(usuariosGuardados);
          const usuario = lista.find((u) => u.id === sesionGuardada);

          if (usuario) {
            setUsuarioActivo(usuario);
          }
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  async function registrar(usuario: Usuario): Promise<boolean> {
    const emailExiste = usuarios.some(
      (u) => u.email.toLowerCase() === usuario.email.toLowerCase()
    );

    const nombreExiste = usuarios.some(
      (u) => u.nombreUsuario.toLowerCase() === usuario.nombreUsuario.toLowerCase()
    );

    if (emailExiste || nombreExiste) {
      return false;
    }

    const nuevaLista = [...usuarios, usuario];

    try {
      await AsyncStorage.setItem(CLAVE_USUARIOS, JSON.stringify(nuevaLista));
      setUsuarios(nuevaLista);
      return true;
    } catch (error) {
      console.error('Error al registrar:', error);
      return false;
    }
  }

  function iniciarSesion(email: string, password: string): boolean {
    const usuario = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!usuario) {
      return false;
    }

    setUsuarioActivo(usuario);
    AsyncStorage.setItem(CLAVE_SESION, usuario.id).catch((error) => {
      console.error('Error al guardar la sesión:', error);
    });

    return true;
  }

  function cerrarSesion() {
    setUsuarioActivo(null);
    AsyncStorage.removeItem(CLAVE_SESION).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuarios,
        usuarioActivo,
        cargando,
        registrar,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext);

  if (!contexto) {
    throw new Error('useUsuario debe utilizarse dentro de UsuarioProvider');
  }

  return contexto;
}
