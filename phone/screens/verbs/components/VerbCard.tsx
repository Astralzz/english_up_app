import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ColorsAppType } from "@/theme/colors";
import Verb from "@/models/Verb";

// Props
interface VerbCardProps {
  verb: Verb;
  colors: ColorsAppType;
  viewVerb: (verb: Verb) => void;
}

/**
 * Componente que muestra una tarjeta con la información de un verbo.
 *
 * @param {Object} props - Props del componente.
 * @param {Verb} props.verb - Verbo a mostrar.
 * @param {ColorsAppType} props.colors - Colores de la aplicación.
 * @param {Function} props.viewVerb - Función para ver el verbo.
 * @returns {TSX.Element} Componente VerbCard.
 */
const VerbCard = ({ verb, colors, viewVerb }: VerbCardProps) => {
  return (
    <Card style={styles.card} onPress={() => viewVerb(verb)}>
      <LinearGradient
        colors={[colors.primary[200], colors.primary[400]]}
        style={styles.gradient}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.content}>
          <Icon
            name="book-open-page-variant"
            size={24}
            color={colors.text.primary}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.simpleForm, { color: colors.text.primary }]}>
              {verb.simple_form}
            </Text>
            <Text style={[styles.meaning, { color: colors.text.secondary }]}>
              {verb.meaning.join(", ")}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Card>
  );
};

/**
 * Estilos del componente VerbCard.
 */
const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
  },
  gradient: {
    padding: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  simpleForm: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meaning: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default VerbCard;
