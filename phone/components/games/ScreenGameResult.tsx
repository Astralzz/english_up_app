import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ColorsAppType } from '@/theme/colors';
import { UseGuestGamingVerbResult } from '@/services/ListVerbsService';
import { TFunction } from 'i18next';
import ScreenWrapper from '../screens/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Props
interface ScreenGameResultProps {
  results: UseGuestGamingVerbResult;
  onRestart: () => void;
  colors: ColorsAppType;
  isThemeDark: boolean;
  t: TFunction<'translation', undefined>;
  hiddenIcon?: boolean;
}

/**
 * Componente que muestra el resultado de un juego.
 *
 * @param {ScreenGameResultProps} props - Props del componente.
 * @returns {JSX.Element} Elemento JSX que representa el componente.
 */
const ScreenGameResult: React.FC<ScreenGameResultProps> = ({
  results,
  onRestart,
  colors,
  isThemeDark,
  t,
  hiddenIcon = false,
}) => {
  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        {/* Icon */}
        {!hiddenIcon && (
          <Icon
            name={results.isWin ? 'trophy' : 'emoticon-sad'}
            size={94}
            color={results.isWin ? colors.alert.success : colors.alert.error}
          />
        )}
        <Text style={styles.title}>{results.title || t('Game Over')}</Text>
        <Text style={styles.description}>{results.description}</Text>
      </View>
      {/* Result */}
      <View>
        <Text style={styles.result}>
          {t('Correct')}: {results.successCount} | {t('Fails')}:{' '}
          {results.failsCount}
        </Text>
        {/* Points */}
        <Text style={styles.points}>
          {t('Total Points')}: {results.totalPoints}
        </Text>
      </View>
      {/* Footer */}
      <View>
        {/* Button */}
        <Button
          mode='contained'
          onPress={onRestart}
          style={[
            styles.button,
            {
              backgroundColor: results.isWin
                ? colors.alert.success
                : colors.alert.error,
            },
          ]}
          textColor={'#fff'}
        >
          {t('Play Again')}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

/**
 * Genera los estilos del componente.
 *
 * @param {ColorsAppType} colors - Objeto con los colores de la aplicación.
 * @param {boolean} isThemeDark - Indica si el tema es oscuro.
 * @returns {StyleSheet} Objeto StyleSheet con los estilos del componente.
 */
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12,
      color: colors.text.primary,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      color: colors.text.secondary,
    },

    // Result
    result: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 8,
      color: colors.text.primary,
    },
    points: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 32,
      color: colors.text.primary,
    },

    // Button
    button: {
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      color: isThemeDark ? colors.text.primary : '#fff',
    },
  });

export default ScreenGameResult;
