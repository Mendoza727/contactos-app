# 📱 Contactos App

![React](https://img.shields.io/badge/React-19-blue?logo=react) ![React
Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Android](https://img.shields.io/badge/Android-Supported-3DDC84?logo=android)
![iOS](https://img.shields.io/badge/iOS-Supported-000000?logo=apple)

Aplicación móvil desarrollada con React Native + Expo + TypeScript para
la gestión de contactos con almacenamiento local persistente.

------------------------------------------------------------------------

## 📌 Primer paso: Configurar tu entorno

Antes de ejecutar el proyecto, debes seguir la guía oficial de React
Native:

https://reactnative.dev/docs/environment-setup

Incluye:

-   Instalación de Node.js
-   Configuración de Android Studio
-   Creación de emuladores
-   Configuración de dispositivos físicos
-   Configuración de Xcode (macOS)

------------------------------------------------------------------------

## 🚀 Características

-   📋 Listado de contactos
-   🔎 Búsqueda en tiempo real
-   ➕ Crear contacto
-   ✏️ Editar contacto
-   🗑 Eliminar contacto con swipe gestures
-   👤 Modal reutilizable para ver detalles
-   💾 Persistencia local con AsyncStorage
-   🧠 Validaciones con Zod
-   📝 Formularios dinámicos con múltiples teléfonos
-   ⚡ Manejo de estado con React Query

------------------------------------------------------------------------

## 🧱 Arquitectura

Estructura modular basada en features:

src/ ├── app/ │ └── navigation/ ├── features/ │ └── contacts/ │ ├──
components/ │ ├── hooks/ │ ├── models/ │ ├── screens/ │ ├── services/ │
└── validations/ ├── shared/ │ ├── utils/ │ └── types/ └── storage/

Principios aplicados:

-   Separación de responsabilidades
-   Servicios desacoplados
-   Hooks personalizados
-   Componentes reutilizables
-   Inmutabilidad
-   Validación declarativa

------------------------------------------------------------------------

## 📦 Dependencias principales

Core: - react - react-native - expo

Estado y datos: - @tanstack/react-query -
@react-native-async-storage/async-storage

Formularios y validación: - react-hook-form - @hookform/resolvers - zod

UI: - react-native-paper - react-native-gesture-handler -
react-native-reanimated

------------------------------------------------------------------------

## 📥 Cómo clonar el proyecto

git clone https://github.com/Mendoza727/contactos-app.git cd
contactos-app npm install

------------------------------------------------------------------------

## ▶️ Cómo correr el proyecto

Iniciar servidor:

npx expo start

------------------------------------------------------------------------

## 📱 Ejecutar en Android

Android físico (USB):

1.  Activar depuración USB.
2.  Conectar el dispositivo.
3.  Ejecutar:

npx expo run:android

O presionar A en la consola de Expo.

Android por WiFi:

1.  Conectar PC y teléfono a la misma red.
2.  Instalar Expo Go.
3.  Escanear el QR.

Emulador Android:

1.  Abrir Android Studio.
2.  Iniciar AVD.
3.  Presionar A en Expo.

------------------------------------------------------------------------

## 🍎 Ejecutar en iOS

macOS con Xcode:

npx expo run:ios

Desde Windows:

Usar Expo Go en iPhone escaneando QR.

------------------------------------------------------------------------

## 🧪 Scripts disponibles

"start": "expo start" "android": "expo start --android" "ios": "expo
start --ios" "web": "expo start --web"

------------------------------------------------------------------------

## 🔐 Validaciones

Implementadas con Zod + React Hook Form:

-   Nombre mínimo 3 caracteres
-   Email válido
-   Teléfono mínimo 10 dígitos
-   Múltiples teléfonos dinámicos

------------------------------------------------------------------------

## 👨‍💻 Autor

Juan Mendoza\
https://github.com/Mendoza727

## imagenes aplicacion
https://imgur.com/a/private-r4afLU3
------------------------------------------------------------------------

## 📄 Licencia

MIT
