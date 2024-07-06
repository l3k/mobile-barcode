import { Dimensions } from 'react-native'
import { createStyleSheet } from 'react-native-unistyles'

export const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  wrapperButton: {
    top: 10,
    right: 20,
    position: 'absolute',
    zIndex: 10,
  },
  wrapperBtnTorch: {
    bottom: '25%',
    right: Dimensions.get('window').width * 0.4,
    position: 'absolute',
    zIndex: 10,
  },
  camera: {
    flex: 1,
  }
}))
