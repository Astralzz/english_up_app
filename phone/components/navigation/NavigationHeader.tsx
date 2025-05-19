import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { ColorsAppType } from "@/theme/colors";
import { useThemeApp } from "@/hooks/useThemeApp";
import { DrawerHeaderProps } from "@react-navigation/drawer";

/**
 * Menu - Navigation component
 *
 * @return {TSX.Component}
 */
const NavigationHeader: React.FC<DrawerHeaderProps> = (props) => {
  // Hooks
  const {
    state: { colors },
  } = useThemeApp();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title} variant="titleLarge">
        {props?.route?.name ?? "EnglishUp"}
      </Text>

      {/* Botones adicionales */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="account-circle" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Botón del menú hamburguesa */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.menuButton}
      >
        <Icon
          name="menu"
          size={28}
          color={colors.text.primary}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      backgroundColor: colors.background.secondary,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[300] + "33",
      paddingHorizontal: 16,
      elevation: 4,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    menuButton: {
      padding: 8,
      marginLeft: 12,
    },
    title: {
      flex: 1,
      color: colors.text.primary,
      fontWeight: "800",
      letterSpacing: 0.5,
      marginLeft: 8,
    },
    rightContainer: {
      flexDirection: "row",
      gap: 16,
    },
    iconButton: {
      padding: 4,
    },
    icon: {
      marginTop: 2,
    },
  });

export default NavigationHeader;
