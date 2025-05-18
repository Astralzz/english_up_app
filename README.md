# ENGLISH APP

App personal enfocada en mejorar mi ingles y ayudarme en mi aprendizaje

## COMANDOS

Básicos:

- Iniciar app (desarrollo)

    ```bash
    npx expo start --reset-cache  
    ```

- Verificar integridad y problemas en la application

    ```bash
    npx expo-doctor 
    ```

- Verificar integridad y problemas de las librerías expo

    ```bash
    npx expo install --check  
    ```

npx expo prebuild // Este comando creará la carpeta de Android en la raíz
npx expo prebuild --clean
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
