# ENGLISH APP

App personal enfocada en mejorar mi ingles y ayudarme en mi aprendizaje

## COMANDOS

### COMANDOS CON NPM

- Instalar dependencias

    ```bash
    npm install
    npm install --legacy-peer-deps -> Para evitar problemas de compatibilidad
    npm install --force -> Para forzar la instalación ignorando las dependencias
    ```

- Borrar cache

    ```bash
    npm cache clean --force
    ```

- Borrar node_modules and package-lock.json

    ```bash
    Remove-Item -Recurse -Force .\node_modules
    Remove-Item -Force .\package-lock.json
    ```
 
- Verificar versiones disponibles de una librería

    ```bash
    npm show [libreria] versions
    ```

- Instalar una version específica de una librería

    ```bash
    npm install [libreria]@[version]
    ```

### COMANDOS CON NPX

- Iniciar app (desarrollo)

    ```bash
    npx expo start --reset-cache
    npx expo start --clear
    ```

- Verificar integridad y problemas en la application

    ```bash
    npx expo-doctor 
    ```

- Verificar integridad y problemas de las librerías expo

    ```bash
    npx expo install --check  
    ```

- Actualizar SDK y librerías

    ```bash
    npx expo upgrade
    ```

npx expo run:android

Configuraciones antes del build:

- Actualizar configuración de react-native-mmkv

    ```bash
    npx expo prebuild
    ```

## LIBRERÍAS

PROVIDERS

- [React Redux](https://react-redux.js.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Redux Persist](https://github.com/rt2zz/redux-persist#readme) > NOTE: Temporal, despues se usara react-native-mmkv

NAVIGATION

- [React navigator](https://reactnavigation.org)

REQUESTS

- [Axios](https://axios-http.com)

UI

- [React Native Paper](https://reactnativepaper.com)
- [Vector icons](https://github.com/oblador/react-native-vector-icons)
- [Expo LinearGradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient)

STORAGE

- [Async Storage](https://react-native-async-storage.github.io/async-storage)

SECURITY

- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore)
- [Expo Crypto](https://docs.expo.dev/versions/latest/sdk/crypto)

LENGUAJE

- [i18next](https://react.i18next.com)
- [React i18next](https://react.i18next.com)
- [Expo Localization](https://docs.expo.dev/versions/latest/sdk/localization)
