import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import { ColorsAppType } from '@/theme/colors';
import Verb from '@/models/Verb';
import { TFunction } from 'i18next';

// Levels type
export type GuestTheVerbGameLevelType = {
  name: string;
  count: number;
  key: string;
};

// Key verbs type
export type GuestTheVerbGameKeyVerbsType = {
  question: keyof Verb;
  answers: keyof Verb;
};

// Props
interface ScreenGameSelectedLevelProps {
  title: string;
  colors: ColorsAppType;
  isThemeDark: boolean;
  levels: GuestTheVerbGameLevelType[];
  selectLevel: (
    level: GuestTheVerbGameLevelType,
    keyVerbs: GuestTheVerbGameKeyVerbsType,
  ) => void;
  translation: {
    t: TFunction<'translation', undefined>;
    path: string;
  };
}

/**
 * Screen selected level
 *
 * @return {TSX.Component}
 */
const ScreenGameSelectedLevel: React.FC<ScreenGameSelectedLevelProps> = ({
  title,
  colors,
  isThemeDark,
  levels,
  selectLevel,
  translation: { t, path },
}) => {
  // Get theme
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  // Get icon
  const getIcon = React.useCallback(
    (level: GuestTheVerbGameLevelType) => {
      switch (level.key) {
        case 'easy':
          return {
            name: 'emoticon-happy-outline',
            color: colors.alert.success,
          };
        case 'medium':
          return {
            name: 'emoticon-neutral-outline',
            color: colors.alert.warning,
          };
        case 'hard':
          return {
            name: 'emoticon-angry-outline',
            color: colors.alert.error,
          };
        default:
          return {
            name: 'emoticon-neutral-outline',
            color: colors.text.primary,
          };
      }
    },
    [colors],
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Levels */}
        <View style={styles.levelsContainer}>
          {levels.map((level) => {
            // Color
            const colorIcon = getIcon(level);

            return (
              <TouchableOpacity
                key={level.key}
                onPress={() =>
                  selectLevel(level, { question: 'gerund', answers: 'meaning' })
                }
              >
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    {/* Icon */}
                    <Icon
                      name={colorIcon.name}
                      size={40}
                      color={colorIcon.color}
                    />
                    {/* Text */}
                    <Text
                      variant='titleMedium'
                      style={{
                        marginTop: 4,
                        color: colorIcon.color,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      {level.name}
                    </Text>
                    {/* Text */}
                    <Text variant='bodyMedium' style={styles.textContent}>
                      {t(`${path}.no_questions`)}: {level.count}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isThemeDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text.primary,
    },
    levelsContainer: {
      flexDirection: 'column',
      gap: 15,
    },
    card: {
      borderRadius: 12,
      elevation: 4,
      backgroundColor: colors.primary[isThemeDark ? 800 : 100],
    },
    cardContent: {
      alignItems: 'center',
    },
    textContent: {
      color: colors.text.primary,
      fontWeight: 'semibold',
    },
  });

export default ScreenGameSelectedLevel;
