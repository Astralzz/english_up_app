import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import FilterModal from "./FilterModal";
import VerbList from "../components/VerbList";
import VerbsLayout from "../VerbsLayout";
import { useThemeApp } from "@/hooks/useThemeApp";
import useVerbSearch from "../hooks/useVerbSearch";

const VerbSearchScreen: React.FC = () => {
  const {
    verbs,
    textSearch,
    setTextSearch,
    verbTypeFilter,
    setVerbTypeFilter,
    searchKey,
    setSearchKey,
    service,
  } = useVerbSearch();

  // Hooks
  const [showFilters, setShowFilters] = useState(false);
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  return (
    <VerbsLayout service={service} styleWrapper={styles.layoutWrapper}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            label="Buscar verbo"
            value={textSearch}
            onChangeText={setTextSearch}
            mode="outlined"
            style={[
              styles.input,
              { backgroundColor: colors.background.secondary },
            ]}
            placeholder="Ej. run, eat, go..."
            left={
              <TextInput.Icon icon="magnify" color={colors.icons.primary} />
            }
            theme={{
              colors: {
                primary: colors.primary[500],
                background: colors.background.secondary,
                text: colors.text.primary,
                placeholder: colors.text.secondary,
              },
            }}
          />
          <IconButton
            icon="tune"
            onPress={() => setShowFilters(true)}
            iconColor={colors.primary[500]}
            style={styles.filterButton}
          />
        </View>

        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          verbType={verbTypeFilter}
          onVerbTypeChange={setVerbTypeFilter}
          searchKey={searchKey}
          onSearchKeyChange={setSearchKey}
          colors={colors}
        />
      </View>

      <View style={styles.listContainer}>
        <VerbList verbs={verbs} colors={colors} isThemeDark={isThemeDark} />
      </View>
    </VerbsLayout>
  );
};

const styles = StyleSheet.create({
  layoutWrapper: {
    paddingVertical: 16,
    gap: 16,
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#FFC10720",
    borderRadius: 8,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
});

export default VerbSearchScreen;
