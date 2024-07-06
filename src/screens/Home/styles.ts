import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    padding: 20,
    justifyContent: 'space-between'
  },
  header: {
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontFamily: theme.fonts.black,
    fontSize: 24,
    color: theme.colors.text
  },
  main: {
    flex: 1,
  },
  separator: {
    height: 2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 2,
    marginVertical: 10,
    backgroundColor: theme.colors.text
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
}))