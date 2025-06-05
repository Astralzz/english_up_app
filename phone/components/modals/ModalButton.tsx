import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Button, IconButton, Modal, Portal } from "react-native-paper";
import { useThemeApp } from "@/hooks/useThemeApp";
import { ColorsAppType } from "@/theme/colors";

// Props
interface ModalButtonProps {
  children: React.ReactNode;
  scrollable?: boolean;
  visible: boolean;
  onClose: () => void;
  applyButton?: {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
  };
  extraStyles?: {
    container?: ViewStyle;
    content?: ViewStyle;
    header?: ViewStyle;
    containerChildren?: ViewStyle;
  };
}

/**
 * Modal con botón de aplicación
 *
 * @param {ModalButtonProps} props - Props del componente
 * @returns {TSX.Element} ModalButton
 */
const ModalButton: React.FC<ModalButtonProps> = ({
  children,
  scrollable = true,
  visible,
  onClose,
  applyButton,
  extraStyles,
}) => {
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark]
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.modalWrapper]}
      >
        <View style={[styles.container]}>
          {/* Header */}
          <View style={[styles.header, extraStyles?.header]}>
            <IconButton
              icon="close"
              onPress={onClose}
              iconColor={colors.text.primary}
              size={28}
            />
            {applyButton && (
              <Button
                mode="contained"
                onPress={applyButton.onPress}
                textColor={colors.text.primary}
                style={[styles.applyButton, applyButton.style]}
              >
                {applyButton.title}
              </Button>
            )}
          </View>

          {/* Scrollable Content */}
          {scrollable ? (
            <ScrollView
              style={[styles.containerChildren, extraStyles?.containerChildren]}
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View
              style={[styles.containerChildren, extraStyles?.containerChildren]}
            >
              {children}
            </View>
          )}
        </View>
      </Modal>
    </Portal>
  );
};

/**
 * Obtiene los estilos del modal
 *
 * @param {ColorsAppType} colors - Colores de la aplicación
 * @param {boolean} isDark - Modo oscuro
 * @returns {Object} Estilos del modal
 */
const getStyles = (colors: ColorsAppType, isDark: boolean) => {
  return StyleSheet.create({
    modalWrapper: {
      flex: 1,
      backgroundColor: colors.modal.overlay,
      justifyContent: "flex-end",
      alignItems: "center",
      height: "100%",
      maxHeight: "100%",
      width: "100%",
      maxWidth: "100%",
    },
    container: {
      backgroundColor: colors.modal.container,
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
      maxHeight: "60%",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    applyButton: {
      backgroundColor: colors.primary[500],
      color: colors.text.primary,
      borderRadius: 12,
    },
    containerChildren: {
      flexGrow: 1,
    },
  });
};

export default ModalButton;
