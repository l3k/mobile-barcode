import React, { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useStyles } from 'react-native-unistyles'
import { stylesheet } from './styles'

interface Props extends TouchableOpacityProps {
  children: ReactNode;
  isFull?: boolean;
  type?: "cancel" | undefined
}

export function Button({ children, isFull, type, ...rest }: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <TouchableOpacity
      style={styles.container(!!isFull, type)}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}
