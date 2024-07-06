import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    width: '100%',
    height: 160,
    backgroundColor: theme.colors.input,
    fontFamily: theme.fonts.medium,
    padding: 20,
    fontSize: 20,
    color: theme.colors.text,
    borderRadius: 16
  },
}))
