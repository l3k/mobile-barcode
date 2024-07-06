import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import { useStyles } from 'react-native-unistyles';
import Feather from '@expo/vector-icons/Feather'

import barcode from '@src/barcode.json'
import { stylesheet } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NavProps } from '@src/routes';
import { useData } from '@src/hooks/data';
import { Button } from '@src/components/Button';


export function Splash() {
  const { styles, theme } = useStyles(stylesheet)
  const { navigate } = useNavigation<NavProps>()
  const { loading, token, getToken } = useData()

  React.useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate('Home')
      }
    }, 1000);
  }, [token])

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={styles.img}
        source={barcode}
      />
      {
        !token && !loading &&
        <Button onPress={getToken}>
          <Feather name='refresh-ccw' color={theme.colors.text} size={30} />
        </Button>
      }
    </View>
  )
}
