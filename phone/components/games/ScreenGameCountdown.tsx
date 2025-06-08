import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeApp } from '@/hooks/useThemeApp';
import ScreenWrapper from '../screens/ScreenWrapper';
import { ColorsAppType } from '@/theme/colors';

// Props
interface ScreenGameCountdownProps {
  count: number;
  title?: string;
  hiddenIcon?: boolean;
  onFinish: () => void;
}

/**
 *
 * Screen countdown
 *
 * @return {TSX.Component}
 */
const ScreenGameCountdown: React.FC<ScreenGameCountdownProps> = ({
  count = 3,
  title,
  hiddenIcon = false,
  onFinish,
}) => {
  // State
  const [currentCount, setCurrentCount] = useState(count);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Hooks
  const {
    state: { colors },
  } = useThemeApp();

  // Styles
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  // Start countdown
  useEffect(() => {
    // Finish
    if (currentCount <= 0) {
      onFinish();
      return;
    }

    // Animation fade
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Timer
    const timer = setTimeout(() => {
      setCurrentCount((prev) => prev - 1);
    }, 1000);

    // Clear timer
    return () => clearTimeout(timer);
  }, [currentCount, fadeAnim, onFinish]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Icon */}
        {!hiddenIcon && (
          <Icon name='clock-outline' size={64} color={colors.primary[500]} />
        )}
        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}
        {/* Counter */}
        <Animated.Text style={[styles.counter, { opacity: fadeAnim }]}>
          {currentCount}
        </Animated.Text>
      </View>
    </ScreenWrapper>
  );
};

// Styles
const getStyles = (colors: ColorsAppType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      color: colors.text.primary,
    },
    counter: {
      fontSize: 72,
      fontWeight: 'bold',
      color: colors.primary[600],
    },
  });

export default ScreenGameCountdown;
