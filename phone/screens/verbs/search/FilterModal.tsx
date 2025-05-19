import React from "react";
import { View, Modal, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  Button,
  IconButton,
  SegmentedButtons,
  Checkbox,
} from "react-native-paper";
import Verb, { VerbTypeType } from "@/models/Verb";
import { ColorsAppType } from "@/theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  verbType: VerbTypeType | "";
  onVerbTypeChange: (value: VerbTypeType | "") => void;
  searchKey: keyof Verb;
  onSearchKeyChange: (key: keyof Verb) => void;
  colors: ColorsAppType;
};

const FilterModal: React.FC<Props> = ({
  visible,
  onClose,
  verbType,
  onVerbTypeChange,
  searchKey,
  onSearchKeyChange,
  colors,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: colors.background.overlay },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.background.secondary },
          ]}
        >
          <View style={styles.modalHeader}>
            <IconButton
              icon="close"
              onPress={onClose}
              iconColor={colors.text.primary}
            />
            <Button
              onPress={onClose}
              mode="contained"
              style={styles.applyButton}
            >
              Aplicar
            </Button>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
              Tipo de verbo
            </Text>
            <SegmentedButtons
              value={verbType}
              onValueChange={(v) => onVerbTypeChange(v as VerbTypeType | "")}
              buttons={[
                { value: "", label: "Todos", icon: "format-list-bulleted" },
                { value: "R", label: "Regulares", icon: "chart-bell-curve" },
                {
                  value: "I",
                  label: "Irregulares",
                  icon: "chart-bell-curve-cumulative",
                },
              ]}
              density="regular"
              theme={{ colors: { primary: colors.primary[500] } }}
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
              Buscar por
            </Text>
            {Object.entries({
              simple_form: "Forma simple",
              past_participle: "Participio",
              gerund: "Gerundio",
              meaning: "Significado",
            }).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={styles.filterOption}
                onPress={() => onSearchKeyChange(key as keyof Verb)}
              >
                <Checkbox.Android
                  status={searchKey === key ? "checked" : "unchecked"}
                  color={colors.primary[500]}
                />
                <Text style={{ color: colors.text.primary, marginLeft: 8 }}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  applyButton: {
    borderRadius: 8,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
});

export default FilterModal;
