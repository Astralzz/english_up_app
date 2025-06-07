import { useThemeApp } from '@/hooks/useThemeApp';
import { ColorsAppType } from '@/theme/colors';
import { IconPropsApp } from '@/types/components';
import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import {
  IconButton,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

// Props
interface InputDefaultProps {
  initialValue?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  placeholder?: string;
  mode?: 'flat' | 'outlined';
  iconLeft?: IconPropsApp;
  iconRight?: IconPropsApp;
  extraProps?: TextInputProps;
  styleProps?: {
    content?: ViewStyle;
    label?: TextStyle;
    inputContent?: TextStyle;
    input?: TextStyle;
  };
  hiddenSpaces?: boolean;
}

/**
 * Componente que muestra un input por defecto.
 *
 * @param {InputDefaultProps} props - Props del componente.
 * @returns {TSX.Element} Componente InputDefault.
 */
const InputDefault: React.FC<InputDefaultProps> = ({
  initialValue = '',
  onChangeText,
  label = 'Buscar',
  placeholder = 'Hola mundo',
  mode = 'outlined',
  iconLeft,
  iconRight,
  extraProps,
  styleProps,
  hiddenSpaces = false,
}) => {
  // Hooks
  const {
    state: { colors, isThemeDark },
  } = useThemeApp();

  // State
  const [textSearch, setTextSearch] = React.useState<string>(initialValue);

  // On change
  const onChange = React.useCallback(
    (text: string) => {
      // Get value
      const value = hiddenSpaces ? text.replace(/\s/g, '') : text;

      setTextSearch(value);
      onChangeText?.(value);
    },
    [onChangeText, hiddenSpaces],
  );

  // Styles
  const styles = React.useMemo(
    () => getStyles(colors, isThemeDark),
    [colors, isThemeDark],
  );

  return (
    <View style={[styles.content, styleProps?.content]}>
      <TextInput
        label={<Text style={[styles.label, styleProps?.label]}>{label}</Text>}
        value={textSearch}
        onChangeText={onChange}
        mode={mode}
        contentStyle={[styles.inputContent, styleProps?.inputContent]}
        style={[styles.input, styleProps?.input]}
        outlineStyle={styles.inputOutline}
        placeholder={placeholder}
        textColor={colors.text.primary}
        placeholderTextColor={colors.text.tertiary}
        activeOutlineColor={colors.primary[500]}
        outlineColor={colors.primary[200]}
        cursorColor={colors.primary[500]}
        selectionColor={colors.primary[500]}
        selectionHandleColor={colors.primary[500]}
        // underlineColor={colors.alert.errorSecondary}
        // underlineColorAndroid={colors.alert.success}
        // activeUnderlineColor={colors.alert.successSecondary}
        accessibilityIgnoresInvertColors={true}
        left={
          iconLeft && (
            <TextInput.Icon
              icon={iconLeft?.icon}
              onPress={iconLeft?.onPress}
              color={iconLeft?.color ?? colors.icons.primary}
              style={iconLeft?.style}
              size={iconLeft?.size ?? 27}
            />
          )
        }
        {...extraProps}
      />
      {/* Right icon */}
      {iconRight && (
        <IconButton
          icon={iconRight?.icon}
          onPress={iconRight?.onPress}
          iconColor={iconRight?.color ?? colors.primary[500]}
          style={[styles.iconRight, iconRight?.style]}
          size={iconRight?.size ?? 27}
        />
      )}
    </View>
  );
};

// Styles
const getStyles = (colors: ColorsAppType, isDark: boolean) =>
  StyleSheet.create({
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    label: {
      color: colors.text.tertiary,
    },
    inputContent: {
      borderRadius: 12,
    },
    inputOutline: {
      borderRadius: 12,
    },
    input: {
      flex: 1,
      borderRadius: 12,
      fontSize: 16,
      backgroundColor: colors.background.secondary,
    },
    iconRight: {
      backgroundColor: 'transparent',
      borderRadius: 12,
    },
  });

export default InputDefault;
