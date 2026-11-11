Qué Cocino

Descripción

Qué Cocino es una aplicación móvil desarrollada con React Native, Expo y TypeScript. Permite administrar los ingredientes disponibles en casa y encontrar recetas a partir de ellos.

El objetivo es ayudar a organizar los alimentos y facilitar la elección de comidas según los ingredientes disponibles.

## Funcionalidades

- Registro e inicio de sesión: permite crear una cuenta e ingresar a la aplicación.
- Gestión de ingredientes: permite agregar, visualizar y eliminar ingredientes, además de editarlos.
- Cámara: permite tomar fotografías y seleccionar manualmente varios ingredientes de un catálogo.
- Recetas: muestra recetas según los ingredientes disponibles.
- Detalle de recetas: permite consultar los ingredientes necesarios, la preparación, el tiempo y las porciones.
- Perfil: permite consultar los datos del usuario y cerrar sesión.
- Guardado de información: los datos se conservan localmente en el dispositivo.

## Tecnologías utilizadas

- React Native
- Expo SDK 58
- TypeScript
- Expo Router
- React Hooks
- Context API
- AsyncStorage
- Expo Image Picker

Instalación y ejecución

Para ejecutar el proyecto:

1. Clonar el repositorio:

   `git clone https://github.com/MarianelaDeferrari/QueCocino.git`

2. Ingresar a la carpeta:

   `cd QueCocino`

3. Instalar las dependencias:

   `npm install`

4. Iniciar el proyecto:

   `npx expo start`

Se necesita tener Node.js y npm instalados. Para probar la aplicación en un celular Android se puede utilizar Expo Go.

 Estructura principal del proyecto

QueCocino/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── ingredientes.tsx
│   │   ├── perfil.tsx
│   │   └── recetas.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── registro.tsx
│   └── _layout.tsx
├── assets/
├── components/
├── constants/
├── src/
│   ├── context/
│   │   ├── IngredientesContext.tsx
│   │   └── UsuarioContext.tsx
│   ├── data/
│   │   └── recetas.ts
│   └── types/
│       └── Usuario.ts
├── package.json
└── README.md

 Almacenamiento de datos

La aplicación utiliza AsyncStorage para guardar localmente los datos de los usuarios y sus ingredientes.

La información se conserva en el dispositivo entre sesiones. El registro y el inicio de sesión también funcionan de manera local, sin utilizar un servidor externo ni una base de datos en la nube.

Uso de inteligencia artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo para comprender conceptos de programación, proponer soluciones, revisar código y resolver errores. La implementación, las pruebas y las modificaciones del proyecto se realizaron durante el proceso de desarrollo con asistencia de esta herramienta.
