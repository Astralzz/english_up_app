import { useThemeApp } from "@/hooks/useThemeApp";
import { ColorsAppType } from "@/theme/colors";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

// Props
interface ModalDefaultProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  title?: string;
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
}) => {
  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark]
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalWrapper}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.text.primary} />
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
      </Modal>
    </Portal>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isDark: boolean) =>
  StyleSheet.create({
    modalWrapper: {
      flex: 1,
      backgroundColor: colors.modal.overlay,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      maxHeight: "100%",
      width: "100%",
      maxWidth: "100%",
    },
    container: {
      backgroundColor: colors.modal.container,
      borderRadius: 16,
      overflow: "hidden",
      width: "100%",
      maxWidth: "90%",
    },
    header: {
      backgroundColor: colors.modal.header,
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: colors.modal.header,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text.primary,
    },
    containerChildren: {
      paddingHorizontal: 16,
      paddingTop: 12,
    },
  });

export default ModalDefault;
