import React from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './styles';

interface Props extends TextInputProps {

}

export function Input({ ...rest }: Props) {
  const { styles, theme } = useStyles(stylesheet)

  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={theme.colors.text}
      {...rest}
    />
  )
}
