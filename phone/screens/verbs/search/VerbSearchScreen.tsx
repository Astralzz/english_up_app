import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FilterModal from "./FilterModal";
import VerbList from "../components/VerbList";
import VerbsLayout from "../layouts/VerbsLayout";
import { useThemeApp } from "@/hooks/useThemeApp";
import useVerbSearch from "../hooks/useVerbSearch";
import InputDefault from "@/components/inputs/InputDefault";
import { useTranslation } from "react-i18next";


// Transitions
const PATH_TRASNSITION = "verbs.search";

/**
 *
 * Verb search screen
 *
 * @return {TSX.Component}
 */
const VerbSearchScreen: React.FC = () => {
  // Hooks
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
  const { t } = useTranslation();
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  return (
    <VerbsLayout service={service} styleWrapper={styles.layoutWrapper}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <InputDefault
          initialValue={textSearch}
          onChangeText={setTextSearch}
          label={t(`${PATH_TRASNSITION}.input.label`)}
          placeholder={t(`${PATH_TRASNSITION}.input.placeholder`)}
          iconRight={{
            icon: "tune",
            onPress: () => setShowFilters(true),
          }}
        />

        {/* Filter modal */}
        <FilterModal
          visible={showFilters}
          onClose={() => setShowFilters(false)}
          verbType={verbTypeFilter}
          onVerbTypeChange={setVerbTypeFilter}
          searchKey={searchKey}
          onSearchKeyChange={setSearchKey}
          colors={colors}
          translation={{
            t,
            path: PATH_TRASNSITION,
          }}
        />
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <VerbList verbs={verbs} colors={colors} isThemeDark={isThemeDark} />
      </View>
    </VerbsLayout>
  );
};

// Styles
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
  listContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
});

export default VerbSearchScreen;
