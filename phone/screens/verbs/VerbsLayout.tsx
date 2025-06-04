import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import FloatingButtonMenu, {
  FabActionButtonType,
} from "@/components/buttons/FloatingButtonMenu";
import ListVerbsService from "@/services/ListVerbsService";
import ScreenLoading from "@/components/screens/ScreenLoading";
import ScreenError from "@/components/screens/ScreenError";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VerbsStackParamList } from "./VerbsStack";
import { Text } from "react-native-paper";
import { ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";

// Props
type VerbsLayoutProps = {
  children: React.ReactNode;
  service?: ListVerbsService | null;
  isPending?: {
    loading: boolean;
    message?: string;
  };
  error?: string;
  floatButtonActions?: {
    refresh: () => void | Promise<void>;
  };
  options?: {
    title?: string;
  };
  styleWrapper?: ViewStyle;
};

/**
 * Verbs layout
 *
 * @param {VerbsLayoutProps} props
 * @return {TSX.Component}
 */
const VerbsLayout: React.FC<VerbsLayoutProps> = ({
  children,
  service,
  isPending,
  error,
  floatButtonActions,
  options,
  styleWrapper,
}) => {
  // Hooks
  const navigation =
    useNavigation<NativeStackNavigationProp<VerbsStackParamList>>();
  const route = useRoute();
  const { t } = useTranslation();

  // Obtener acciones
  const getFloatingButtons = React.useMemo((): Array<FabActionButtonType> => {
    // Lista de acciones completas
    const allActionsButtons: Array<{
      icon: string;
      label: string;
      routeName?: keyof VerbsStackParamList;
      onPress?: () => void | Promise<void>;
    }> = [
      {
        icon: "microsoft-xbox-controller",
        label: t("verbs.floatButton.labels.games"),
        routeName: "VerbGames",
      },
      {
        icon: "magnify",
        label: t("verbs.floatButton.labels.search"),
        routeName: "VerbSearch",
      },
      {
        icon: "format-list-bulleted-square",
        label: t("verbs.floatButton.labels.all"),
        routeName: "VerbsList",
      },
      // Acciones
      {
        icon: "refresh",
        label: t("verbs.floatButton.labels.refresh"),
        onPress: floatButtonActions?.refresh,
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
  }, [floatButtonActions, route, navigation, t]);

  return (
    <ScreenWrapper style={styleWrapper}>
      {/* Titulo */}
      {options?.title && (
        <Text
          style={{
            fontSize: 18,
            paddingTop: 14,
            paddingBottom: 5,
          }}
        >
          {options.title}
        </Text>
      )}

      {/* Cargando */}
      {isPending?.loading ? (
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
          mainIcon="plus"
          color="white"
        />
      )}
    </ScreenWrapper>
  );
};

export default VerbsLayout;
