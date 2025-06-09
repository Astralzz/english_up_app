import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ColorsAppType } from '@/theme/colors';
import { GameResulDefaultType } from '@/types/games';
import { TFunction } from 'i18next';
import ScreenWrapper from '../screens/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Props
interface ScreenGameResultProps {
  results: GameResulDefaultType;
  onRestart: () => void;
  colors: ColorsAppType;
  isThemeDark: boolean;
  translation: {
    t: TFunction<'translation', undefined>;
    path: string;
  };
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
  translation: { t, path },
  hiddenIcon = false,
}) => {
  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // ? Excelent
  const dataResult = React.useMemo(() => {
    // Excelent
    if (results.totalPoints === results.successCount * 10) {
      return {
        icon: 'trophy-outline',
        color: colors.alert.warning,
        title: t(`${path}.win_excelent`),
        description: t(`${path}.win_excelent_description`),
      };
    }

    // Win
    if (results.isWin) {
      return {
        icon: 'trophy-outline',
        color: colors.alert.success,
        title: t(`${path}.win`),
        description: t(`${path}.win_description`),
      };
    }

    // Lose
    return {
      icon: 'emoticon-sad-outline',
      color: colors.alert.error,
      title: t(`${path}.lose`),
      description: t(`${path}.lose_description`),
    };
  }, [results, t, path, colors]);

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={styles.header}>
        {/* Icon */}
        {!hiddenIcon && (
          <Icon name={dataResult.icon} size={94} color={dataResult.color} />
        )}
        {/* Title */}
        <Text style={styles.title}>{dataResult.title}</Text>
        {/* Description */}
        <Text style={styles.description}>{dataResult.description}</Text>
      </View>
      {/* Result */}
      <View>
        <Text style={styles.result}>
          {t(`${path}.corrects`)}: {results.successCount} | {t(`${path}.fails`)}
          : {results.failsCount}
        </Text>
        {/* Points */}
        <Text style={styles.points}>
          {t(`${path}.total_points`)}: {results.totalPoints}
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
              backgroundColor: dataResult.color,
            },
          ]}
          textColor={'#fff'}
        >
          {t(`${path}.play_again`)}
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
