import React from "react";
import Verb from "@/models/Verb";
import { ColorsAppType } from "@/theme/colors";
import { View, Text, StyleSheet } from "react-native";
import { Card, Chip, Tooltip } from "react-native-paper";
import { useTranslation } from "react-i18next";

// Path translation
const PATH_TRANSLATION = "verbs.modal.details";

// Props
interface VerbDetailsProps {
  verb: Verb | null;
  onClose: () => void;
  colors: ColorsAppType;
  isThemeDark: boolean;
}

/**
 * Componente que muestra los detalles de un verbo.
 *
 * @param {Object} props - Props del componente.
 * @param {Verb} props.verb - Verbo a mostrar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {ColorsAppType} props.colors - Colores de la aplicación.
 * @param {boolean} props.isThemeDark - Tema oscuro.
 * @returns {TSX.Element} Componente VerbDetails.
 */
const VerbDetails: React.FC<VerbDetailsProps> = ({
  verb,
  onClose,
  colors,
  isThemeDark,
}) => {
  // Translation
  const { t } = useTranslation();

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark]
  );

  // ? Verb null
  if (!verb) return null;

  return (
    <Card style={styles.container}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{verb.simple_form}</Text>
          <Text style={styles.verbType}>
            {verb.type === "I"
              ? t(`${PATH_TRANSLATION}.header.type_irregular`)
              : t(`${PATH_TRANSLATION}.header.type_regular`)}
          </Text>
        </View>

        {/* Verb Forms */}
        <View style={styles.cards}>
          {/* 3rd Person */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              {t(`${PATH_TRANSLATION}.cards.third_person`)}
            </Text>
            <Text style={styles.cardValue}>{verb.third_person}</Text>
          </View>
          {/* Simple Past */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              {t(`${PATH_TRANSLATION}.cards.simple_past`)}
            </Text>
            <Text style={styles.cardValue}>{verb.simple_past}</Text>
          </View>
          {/* Past Participle */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              {t(`${PATH_TRANSLATION}.cards.past_participle`)}
            </Text>
            <Text style={styles.cardValue}>{verb.past_participle}</Text>
          </View>
          {/* Gerund */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>
              {t(`${PATH_TRANSLATION}.cards.gerund`)}
            </Text>
            <Text style={styles.cardValue}>{verb.gerund}</Text>
          </View>
        </View>

        {/* Meanings */}
        <View style={styles.meaningSection}>
          {/* Title */}
          <Text style={styles.meaningTitle}>
            {t(`${PATH_TRANSLATION}.meaning.title`)}
          </Text>
          {/* Chips */}
          <View style={styles.meaningChipsContainer}>
            {verb.meaning.map((item, index) => (
              <View key={index} style={styles.chipWrapper}>
                <Tooltip title={item}>
                  <Chip
                    mode="flat"
                    style={styles.chip}
                    textStyle={styles.chipText}
                  >
                    <Text numberOfLines={0} style={styles.chipText}>
                      {item}
                    </Text>
                  </Chip>
                </Tooltip>
              </View>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: colors.modal.container,
      borderRadius: 0,
      elevation: 0,
      shadowColor: "transparent",
      shadowOpacity: 0,
    },
    // Header
    header: {
      alignItems: "center",
      marginBottom: 22,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text.primary,
      marginBottom: 4,
    },
    verbType: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    // Cards
    cards: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    card: {
      width: "48%",
      backgroundColor: colors.primary[isDark ? 800 : 200],
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
      elevation: 2,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    cardLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    cardValue: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text.primary,
    },
    // Meanings
    meaningSection: {
      justifyContent: "center",
      alignItems: "center",
    },
    meaningTitle: {
      fontSize: 18,
      fontWeight: "semibold",
      marginBottom: 12,
      color: colors.text.primary,
    },
    meaningChipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 2,
    },
    chipWrapper: {
      width: "48%",
      marginBottom: 4,
      alignItems: "center",
    },
    chip: {
      backgroundColor: colors.primary[isDark ? 800 : 200],
      justifyContent: "flex-start",
      borderRadius: 12,
    },
    chipText: {
      fontSize: 14,
      color: colors.text.primary,
    },
  });

export default VerbDetails;
