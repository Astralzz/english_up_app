import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWrapper from '@/components/screens/ScreenWrapper';
import FloatingButtonMenu, {
  FabActionButtonType,
} from '@/components/buttons/FloatingButtonMenu';
import ScreenLoading from '@/components/screens/ScreenLoading';
import ScreenError from '@/components/screens/ScreenError';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VerbsStackParamList } from '../VerbsStack';
import { Text } from 'react-native-paper';
import { ViewStyle } from 'react-native';
import { useThemeApp } from '@/hooks/useThemeApp';
import { TFunction } from 'i18next';
import useVerbs from '../hooks/useVerbs';

// Props
type VerbsLayoutProps = {
  children: React.ReactNode;
  isPending?: {
    loading: boolean;
    message?: string;
  };
  error?: string;
  floatButtonActions?: {
    refresh: () => void | Promise<void>;
  };
  styleWrapper?: ViewStyle;
  t: TFunction<'translation', undefined>;
  title?: string;
};

/**
 * Verbs layout
 *
 * @param {VerbsLayoutProps} props
 * @return {TSX.Component}
 */
const VerbsLayout: React.FC<VerbsLayoutProps> = ({
  children,
  isPending,
  error,
  floatButtonActions,
  styleWrapper,
  t,
  title,
}) => {
  // Hook
  const { listVerbsService: service, refreshVerbs, loading } = useVerbs();

  // Hooks
  const navigation =
    useNavigation<NativeStackNavigationProp<VerbsStackParamList>>();
  const route = useRoute();

  // Theme
  const {
    state: { colors },
  } = useThemeApp();

  // Función de refresh combinada
  const handleRefresh = React.useCallback(async () => {
    try {
      // Ejecutar la función de refresh personalizada si existe
      if (floatButtonActions?.refresh) {
        await floatButtonActions.refresh();
      }
      // Siempre refrescar los verbos
      await refreshVerbs();
    } catch (error) {
      console.error('Error al refrescar:', error);
    }
  }, [floatButtonActions, refreshVerbs]);

  // Obtener acciones
  const getFloatingButtons = React.useMemo((): FabActionButtonType[] => {
    // Lista de acciones completas
    const allActionsButtons: {
      icon: string;
      label: string;
      routeName?: keyof VerbsStackParamList;
      onPress?: () => void | Promise<void>;
      key_title?: string;
    }[] = [
      {
        icon: 'microsoft-xbox-controller',
        label: t('verbs.floatButton.labels.games'),
        routeName: 'VerbGames',
        key_title: 'games',
      },
      {
        icon: 'magnify',
        label: t('verbs.floatButton.labels.search'),
        routeName: 'VerbSearch',
        // key_title: 'search',
      },
      {
        icon: 'format-list-bulleted-square',
        label: t('verbs.floatButton.labels.all'),
        routeName: 'VerbsList',
        // key_title: 'list',
      },
      // Acciones
      {
        icon: 'refresh',
        label: t('verbs.floatButton.labels.refresh'),
        onPress: handleRefresh,
      },
    ];

    // Filtrar y mapear acciones visibles
    return allActionsButtons
      .filter(({ onPress, routeName }) => {
        // No tiene ninguna acción o ruta
        if (!onPress && !routeName) {
          return false;
        }

        // ? Tiene ruta
        if (routeName) {
          // Es la misma que donde se esta
          return routeName !== route.name;
        }

        return true;
      })
      .map((action) => {
        // ? Tiene nombre de ruta
        if (action?.routeName) {
          return {
            icon: action.icon,
            label: action.label,
            onPress: () =>
              action.routeName && navigation.navigate(action.routeName),
          };
        }
        // ? Tiene acción
        if (action?.onPress) {
          return {
            icon: action.icon,
            label: action.label,
            onPress: action.onPress,
          };
        }

        return null;
      })
      .filter((a): a is FabActionButtonType => a !== null);
  }, [navigation, route.name, t, handleRefresh]);

  return (
    <ScreenWrapper style={styleWrapper}>
      {/* Titulo */}
      {title && (
        <Text
          variant='titleLarge'
          style={{
            fontWeight: 'bold',
            marginTop: 4,
            marginBottom: 8,
            alignSelf: 'center',
            color: colors.text.primary,
          }}
        >
          {title}
        </Text>
      )}

      {/* Cargando */}
      {isPending?.loading || loading ? (
        <ScreenLoading message={isPending?.message} />
      ) : // Error
      error || !service ? (
        <ScreenError title={error} />
      ) : (
        children
      )}

      {/* Boton */}
      {service && (
        <FloatingButtonMenu
          actions={getFloatingButtons}
          mainIcon='plus'
          color='white'
        />
      )}
    </ScreenWrapper>
  );
};

export default VerbsLayout;
