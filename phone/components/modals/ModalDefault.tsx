import { useThemeApp } from '@/hooks/useThemeApp';
import { ColorsAppType } from '@/theme/colors';
import React from 'react';
import { Pressable } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
} from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Props
interface ModalDefaultProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  title?: string;
  maxHeight?: number;
  animation?: 'slide' | 'fade' | 'none';
  closeOnPressOutside?: boolean;
}

/**
 * Componente que muestra un modal por defecto.
 *
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Contenido del modal.
 * @param {boolean} props.visible - Visibilidad del modal.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título del modal.
 * @returns {TSX.Element} Componente ModalDefault.
 */
const ModalDefault: React.FC<ModalDefaultProps> = ({
  children,
  visible,
  onClose,
  title,
  maxHeight,
  animation = 'fade',
  closeOnPressOutside = true,
}) => {
  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, maxHeight, isThemeDark),
    [colors, maxHeight, isThemeDark],
  );

  return (
    <Modal
      animationType={animation}
      transparent={true}
      visible={visible}
      onDismiss={onClose}
    >
      <View style={[styles.overlay]}>
        {/* Pressable */}
        {closeOnPressOutside && (
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        )}

        {/* Container */}
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name='close' size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.containerChildren}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const getStyles = (
  colors: ColorsAppType,
  maxHeight?: number,
  isThemeDark?: boolean,
) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.modal.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%',
    },
    container: {
      backgroundColor: colors.modal.container,
      borderRadius: 16,
      maxHeight: maxHeight ? `${maxHeight}%` : '90%',
      height: 'auto',
      maxWidth: '90%',
      width: '100%',
      bottom: 0,
      left: 0,
      right: 0,
    },
    header: {
      backgroundColor: colors.modal.header,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.modal.header,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    containerChildren: {
      paddingHorizontal: 16,
      paddingTop: 12,
    },
  });

export default ModalDefault;
