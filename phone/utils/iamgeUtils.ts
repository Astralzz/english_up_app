import { ImageURISource } from 'react-native';

/**
 * Resolve image - Validate file name and search image source and finally return image source
 *
 * @param {string} filename
 * @return {ImageURISource | null}
 */
export const resolveImageForPathId = (
  filename: string,
): ImageURISource | null => {
  // ? Not string
  if (typeof filename !== 'string' || filename.trim() === '') {
    return null;
  }

  // ? Is absolute path
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return { uri: filename };
  }

  // Search image for id
  switch (filename) {
    case 'edain':
      return require('@/assets/images/about/edain.jpeg');
    default:
      return null;
  }
};
