import { useThemeApp } from '@/hooks/useThemeApp';
import React from 'react';
import { FAB } from 'react-native-paper';

/**
 *
 * Icon - @link https://pictogrammers.com/library/mdi/
 */
export type FabActionButtonType = {
  icon: string;
  label: string;
  onPress: () => void | Promise<void>;
};

// Props
interface FloatingButtonMenuProps {
  actions: Array<FabActionButtonType>;
  mainIcon?: string;
  color?: string;
}

/**
 *
 * Verbs screen in the app
 *
 * @return {TSX.Component}
 */
const FloatingButtonMenu: React.FC<FloatingButtonMenuProps> = ({
  actions,
  mainIcon = 'plus',
  color,
}) => {
  // Status open
  const [open, setOpen] = React.useState<boolean>(false);

  // Hooks
  const {
    state: { colors },
  } = useThemeApp();

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? 'close' : mainIcon}
      actions={actions.map((action) => ({
        ...action,
        color: colors.text.secondary,
        style: {
          backgroundColor: colors.primary[500],
        },
      }))}
      onStateChange={({ open }) => setOpen(open)}
      color={colors.text.primary}
      fabStyle={{
        backgroundColor: colors.primary[600],
      }}
      // backdropColor={colors.background.overlay}
      accessibilityLabel='Floating button menu'
    />
  );
};

export default FloatingButtonMenu;
