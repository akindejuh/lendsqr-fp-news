import React from 'react';
import { Button, Icon } from '..';
import { useNavigation } from '@react-navigation/native';
import { ViewStyle } from 'react-native';
import { useCustomTheme } from 'src/context/theme/interfaces';

export function BackButton() {
  const navigation = useNavigation();
  const { colors } = useCustomTheme();

  const ICON = {
    color: colors.inputPLText,
  } as ViewStyle;

  return (
    <Button
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.transparent}
      height={42}
      width={42}
      borderRadius={8}
      borderColor={colors.inputPLText}
      borderWidth={1}
      onPress={() => navigation.canGoBack() && navigation.goBack()}
      children={
        <Icon
          size={20}
          name={'back-arrow'}
          style={ICON}
          color={colors.inputPLText}
        />
      }
    />
  );
}
