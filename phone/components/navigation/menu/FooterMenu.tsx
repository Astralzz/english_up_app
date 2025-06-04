import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLanguageApp } from "@/hooks/useLanguageApp";
import { useThemeApp } from "@/hooks/useThemeApp";
import { ColorsAppType } from "@/theme/colors";
import { Divider, Switch, Avatar } from "react-native-paper";
import { TFunction } from "i18next";

// Flags images
import flagMx from "@/assets/images/flags/mx.png";
import flagEu from "@/assets/images/flags/eu.png";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";

// Props
interface FooterMenuProps {
  t: TFunction<"translation", undefined>;
}

/**
 * Footer menu component
 *
 * @param {FooterMenuProps} props
 * @return {TSX.Component}
 */
const FooterMenu: React.FC<FooterMenuProps> = ({ t }) => {
  // Hooks
  const {
    state: { colors, isThemeDark },
    toggleTheme,
  } = useThemeApp();
  const {
    updateLanguageApp,
    state: { language },
  } = useLanguageApp();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark]
  );

  return (
    <View style={styles.footer}>
      {/* Divider */}
      <Divider style={styles.divider} />

      {/* Switches */}
      <View style={styles.switchSection}>
        {/* Theme switch */}
        <View style={styles.switchContainer}>
          <Icon
            name="white-balance-sunny"
            size={22}
            color={colors.text.primary}
          />
          <Switch
            value={isThemeDark}
            onValueChange={toggleTheme}
            color={colors.primary[600]}
            style={styles.switch}
          />
          <Icon
            name="moon-waning-crescent"
            size={22}
            color={colors.icons.primary}
          />
        </View>

        {/* Language switch */}
        <View style={styles.switchContainer}>
          <Avatar.Image size={22} source={flagMx as AvatarImageSource} style={styles.flagEmoji} />
          <Switch
            value={language === "en"}
            onValueChange={(value) => updateLanguageApp(value ? "en" : "es")}
            color={colors.primary[600]}
            style={styles.switch}
          />
          <Avatar.Image size={22} source={flagEu as AvatarImageSource} style={styles.flagEmoji} />
        </View>
      </View>

      {/* About */}
      <TouchableOpacity style={styles.aboutButton}>
        <Icon name="information" size={18} color={colors.primary[600]} />
        <Text style={styles.aboutText}>{t("menu.footer.version")}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const getStyles = (colors: ColorsAppType, isDark: boolean) =>
  StyleSheet.create({
    divider: {
      backgroundColor: colors.neutral[300] + "66",
      marginVertical: 12,
      marginHorizontal: 14,
    },
    footer: {
      marginTop: "auto",
      paddingHorizontal: 18,
      paddingBottom: 28,
    },
    switchSection: {
      marginVertical: 12,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
    },
    switch: {
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    flagEmoji: {
      backgroundColor: "transparent",
    },
    aboutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: 10,
    },
    aboutText: {
      color: colors.text.tertiary,
      fontSize: 12,
      fontWeight: "500",
    },
  });

export default FooterMenu;
