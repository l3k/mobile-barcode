import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkbox: {
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.input
  },
  selected: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: theme.colors.primary
  },
  name: {
    fontFamily: theme.fonts.semiBold,
    marginLeft: 20,
    fontSize: 16,
    color: theme.colors.text,
  },
  email: {
    fontFamily: theme.fonts.medium,
    marginLeft: 20,
    fontSize: 14,
    color: theme.colors.text,
  },
}))
