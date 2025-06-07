import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

/**
 * Generar una clave única
 *
 * @param {string} key
 * @param {?number} lg
 *
 * @return {Promise<string>}
 */
export const generateNewSecureStoreKey = async (
  key: string,
  lg: number = 64,
): Promise<string> => {
  // Genera una clave aleatoria de bytes de longitud lg
  const randomCrypto = await Crypto.getRandomBytesAsync(lg);

  // Convierte a hexadecimal (2 caracteres por byte)
  const securityKey = Array.from(randomCrypto)
    .map((byte) => byte.toString(16).padStart(2, '0')) // Base16 (hex)
    .join('');

  console.log('La clave de ', key, ' es ', securityKey); // !DD BORRAR SI O SI

  // Almacena la clave de forma segura en SecureStore
  await SecureStore.setItemAsync(key, securityKey);
  return securityKey;
};

/**
 * Recuperar una clave
 *
 * @param {string} key
 *
 * @return {Promise<string> | null}
 */
export const getEncryptionSecureStoreKey = async (
  key: string,
): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};
