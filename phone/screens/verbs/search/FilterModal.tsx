import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SegmentedButtons, Checkbox } from 'react-native-paper';
import Verb, { VerbTypeType } from '@/models/Verb';
import { ColorsAppType } from '@/theme/colors';
import { TFunction } from 'i18next';
import ModalButton from '@/components/modals/ModalButton';

// Tipado de Props del modal
interface Props {
  visible: boolean;
  onClose: () => void;
  verbType: VerbTypeType | '';
  onVerbTypeChange: (value: VerbTypeType | '') => void;
  searchKey: keyof Verb;
  onSearchKeyChange: (key: keyof Verb) => void;
  colors: ColorsAppType;
  translation: {
    t: TFunction<'translation', undefined>;
    path: string;
  };
}

/**
 * Modal de filtro para búsqueda de verbos
 * @param props - Configuración del componente
 *
 * @returns {TSX.Element} FilterModal
 */
const FilterModal: React.FC<Props> = ({
  visible,
  onClose,
  verbType,
  onVerbTypeChange,
  searchKey,
  onSearchKeyChange,
  colors,
  translation: { t, path },
}) => {
  // Botones para tipo de verbo
  const verbTypeButtons = useMemo(
    () => [
      {
        value: '',
        label: t(`${path}.filter.types.all`),
        icon: 'format-list-bulleted',
      },
      {
        value: 'R',
        label: t(`${path}.filter.types.regular`),
        icon: 'chart-bell-curve',
      },
      {
        value: 'I',
        label: t(`${path}.filter.types.irregular`),
        icon: 'chart-bell-curve-cumulative',
      },
    ],
    [t, path],
  );

  /**
   * Opciones de búsqueda
   *
   * @type {Partial} - Permite que todas las propiedades sean opcionales
   * @type {Record<keyof Verb, string>} - Objeto cuyas claves tienen que ser las de Verb y sus valores son string
   *
   * @returns Objeto cuyas claves pueden ser cualquier clave de Verb, pero todas son opcionales y sus valores son string
   */
  const searchOptions: Partial<Record<keyof Verb, string>> = useMemo(() => {
    return {
      simple_form: t(`${path}.filter.queries.simple_form`),
      past_participle: t(`${path}.filter.queries.past_participle`),
      gerund: t(`${path}.filter.queries.gerund`),
      meaning: t(`${path}.filter.queries.meaning`),
      // no: t(`${path}.filter.queries.no`),
      // type: t(`${path}.filter.queries.type`),
      // third_person: t(`${path}.filter.queries.third_person`),
      // simple_past: t(`${path}.filter.queries.simple_past`),
    };
  }, [t, path]);

  // Style
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <ModalButton
      visible={visible}
      onClose={onClose}
      applyButton={{
        title: t(`${path}.filter.action`),
        onPress: onClose,
      }}
      extraStyles={{
        containerChildren: {
          gap: 16,
        },
      }}
    >
      {/* Filtro por tipo de verbo */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
          {t(`${path}.filter.types.title`)}
        </Text>
        <SegmentedButtons
          value={verbType}
          onValueChange={(v) => onVerbTypeChange(v as VerbTypeType | '')}
          buttons={verbTypeButtons}
          density="regular"
          style={styles.segmentedButtons}
          theme={{
            colors: {
              secondaryContainer: colors.primary[500],
              onSecondaryContainer: colors.text.primary,
              onSurface: colors.text.tertiary,
            },
          }}
        />
      </View>

      {/* Filtro por campo de búsqueda */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterTitle, { color: colors.text.primary }]}>
          {t(`${path}.filter.queries.title`)}
        </Text>
        {Object.entries(searchOptions).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={styles.filterOption}
            onPress={() => onSearchKeyChange(key as keyof Verb)}
          >
            <Checkbox.Android
              status={searchKey === key ? 'checked' : 'unchecked'}
              color={colors.primary[500]}
              uncheckedColor={colors.primary[500]}
              rippleColor={colors.primary[500]}
            />
            <Text style={{ color: colors.text.primary, marginLeft: 8 }}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ModalButton>
  );
};

// Estilos del modal
const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    filterSection: {
      marginBottom: 24,
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 12,
    },
    segmentedButtons: {},
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
  });

export default FilterModal;
