import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ColorsAppType } from "@/theme/colors";
import Verb from "@/models/Verb";

interface VerbCardProps {
  verb: Verb;
  colors: ColorsAppType;
}

const VerbCard = ({ verb, colors }: VerbCardProps) => {
  return (
    <Card style={styles.card}>
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

interface VerbListProps {
  verbs: Verb[];
  colors: ColorsAppType;
}

const VerbList = ({ verbs, colors }: VerbListProps) => {
  return (
    <FlatList
      data={verbs}
      keyExtractor={(item) => item.no.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => <VerbCard verb={item} colors={colors} />}
    />
  );
};

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

export default VerbList;
