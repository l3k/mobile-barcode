import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.bg,
    padding: 20,
  },
  header: {
    width: '100%',
    backgroundColor: theme.colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  label: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 10
  },
  description: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 10
  },
  separator: {
    marginVertical: 15
  },
  select: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.input,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16
  },
  user: {
    backgroundColor: theme.colors.input,
    fontFamily: theme.fonts.medium,
    fontSize: 20,
    color: theme.colors.text,
  },
  labelButtton: {
    fontFamily: theme.fonts.bold,
    fontSize: 20,
    color: theme.colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    width: '45%',
  },
  value: {
    fontFamily: theme.fonts.medium,
    fontSize: 20,
    color: theme.colors.text,
  },
  btnQtd: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    padding: 20,
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.bg,
  },
  handleStyle: {
    backgroundColor: theme.colors.bg
  },
  handleIndicatorStyle: {
    backgroundColor: theme.colors.text,
    width: '30%',
    height: 4,
    borderRadius: 4,
    // marginVertical: 12
  },
  inputBottonSheet: {
    width: '100%',
    height: 60,
    backgroundColor: theme.colors.input,
    fontFamily: theme.fonts.medium,
    padding: 20,
    fontSize: 20,
    color: theme.colors.text,
    borderRadius: 16,
    marginBottom: 16
  },
}))
