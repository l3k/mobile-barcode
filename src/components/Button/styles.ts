import { Dimensions } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: (full: boolean, type: 'cancel' | undefined) => ({
    backgroundColor: type === 'cancel' ? theme.colors.cancel : theme.colors.primary,
    width: full ? Dimensions.get('window').width * 0.9 : 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  })
}))
