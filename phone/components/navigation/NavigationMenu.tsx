import React, { useCallback } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text, Avatar, Divider, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Animated, Modal } from 'react-native';
import ROUTES_MENU_APP from '@/router/routerlist';
import { ColorsAppType } from '@/theme/colors';
import { useThemeApp } from '@/hooks/useThemeApp';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import FooterMenu from './menu/FooterMenu';
import ModalDefault from '../modals/ModalDefault';
import AboutScreen from '@/screens/about/AboutScreen';


// Path translation
const PATH_TRASNSITION = "menu";

/**
 * Menu - Navigation component
 *
 * @return {TSX.Component}
 */
const NavigationMenu: React.FC<DrawerContentComponentProps> = (props) => {
  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();
  const { t } = useTranslation();

  // Variables
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const currentRoute = props.state.routeNames[props.state.index];

  // Modal
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark]
  );

  // Functions modal
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  // Animates
  const animateIcon = useCallback(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Interpolación
  const rotateInterpolation = React.useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '15deg'],
      }),
    []
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollView}
    >
      {/* Header */}
      <LinearGradient
        colors={[colors.primary[600], colors.primary[400]]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <Avatar.Icon
            size={72}
            icon="book-open-page-variant-outline"
            style={styles.avatar}
            color={colors.text.secondary}
          />
        </Animated.View>
        <Text style={styles.title} variant="headlineMedium">
          {t(`${PATH_TRASNSITION}.header.title`)}
        </Text>
        <Text style={styles.subtitle}>{t(`${PATH_TRASNSITION}.header.body`)}</Text>
      </LinearGradient>

      {/* Divisor */}
      <Divider style={styles.divider} />

      {/* Menú */}
      <Drawer.Section style={styles.menuSection}>
        {ROUTES_MENU_APP.map(({ label, name, icon }, i) => {
          // Get label
          const labelMenu = label || t(`${PATH_TRASNSITION}.routes.${name.toLowerCase()}`);

          return (
            <Drawer.Item
              key={i}
              label={labelMenu}
              icon={({ size }) => (
                <Icon
                  name={icon || 'circle-medium'}
                  size={size + 2}
                  color={
                    currentRoute === name
                      ? colors.text.secondary
                      : colors.icons.primary
                  }
                  style={styles.icon}
                />
              )}
              onPress={() => {
                animateIcon();
                props.navigation.navigate(name);
              }}
              style={[
                styles.menuItem,
                currentRoute === name && {
                  backgroundColor: colors.primary[400],
                },
              ]}
              theme={{
                colors: {
                  onSurfaceVariant: colors.text.primary, // Primario
                  onSecondaryContainer: colors.text.secondary, // Active
                },
              }}
              active={currentRoute === name}
              rippleColor={colors.primary[300] + '33'}
            />
          );
        })}
      </Drawer.Section>

      {/* Footer */}
      <FooterMenu t={t} openModalAbout={openModal} />

      {/* Modal about */}
      <ModalDefault
        visible={isModalVisible}
        onClose={closeModal}
        title={t(`about.title`)}
        maxHeight={80}
      >
        <AboutScreen t={t} colors={colors} />
      </ModalDefault>
    </DrawerContentScrollView>
  );
};

// Estilos
const getStyles = (colors: ColorsAppType, isDark: boolean) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
      paddingTop: 0,
      backgroundColor: colors.background.primary,
      borderLeftWidth: isDark ? 1 : 0,
      borderLeftColor: isDark ? colors.primary[400] + '44' : 'transparent',
    },
    header: {
      marginTop: 0,
      padding: 24,
      paddingBottom: 32,
      alignItems: 'center',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 4,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    },
    avatar: {
      backgroundColor: colors.primary[500] + '33',
      marginBottom: 16,
      borderWidth: 2,
      borderColor: colors.text.secondary,
    },
    title: {
      color: colors.text.secondary,
      fontWeight: '800',
      letterSpacing: 1,
      marginBottom: 2,
      textShadowColor: colors.neutral[900] + '33',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    subtitle: {
      color: colors.text.secondary + 'BB',
      fontSize: 13,
      fontStyle: 'italic',
    },
    divider: {
      backgroundColor: colors.neutral[300] + '66',
      marginVertical: 12,
      marginHorizontal: 14,
    },
    menuSection: {
      marginHorizontal: 8,
    },
    menuItem: {
      borderRadius: 14,
      marginVertical: 4,
      paddingHorizontal: 4,
      color: colors.text.primary,
    },
    icon: {
      marginRight: 8,
    },
  });

export default NavigationMenu;
