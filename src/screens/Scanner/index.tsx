import React, { useState, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useStyles } from 'react-native-unistyles';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather'
import Torch from 'react-native-torch';

import { NavProps } from '@src/routes';
import { Button } from '@src/components/Button';
import { CameraOverlay } from '@src/components/CameraOverlay';
import { stylesheet } from './styles';
import { useData } from '@src/hooks/data';
import { Product } from '@src/services/product';
import { showMessage } from 'react-native-flash-message';

export function Scanner() {
  const { styles, theme } = useStyles(stylesheet)
  const { goBack, navigate } = useNavigation<NavProps>()
  const device = useCameraDevice('back')
  const [enableCamera, setEnableCamera] = useState(true)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const { products, changeProduct } = useData()

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13',],
    onCodeScanned: (codes) => {
      setEnableCamera(false)
      Torch.switchState(false)
      if (codes[0].value) {
        const product: Product | undefined = products.find(product => product.code === codes[0].value)

        console.log(products)
        console.log('---', codes[0].value)
        console.log(product)

        if (product) {
          changeProduct(product);
          navigate('AddProduct');
        } else {
          showMessage({
            type: 'danger',
            message: `Produto com código ${codes[0].value} não localizado na base de dados`,
            icon: 'danger',
          });
          setTimeout(() => {
            setEnableCamera(true)
          }, 1000);
        }
      }
    }
  })

  useFocusEffect(
    useCallback(() => {
      setEnableCamera(true);
      setIsTorchOn(false);
    }, [])
  );

  const toggleTorch = () => {
    if (isTorchOn) {
      Torch.switchState(false);
    } else {
      Torch.switchState(true);
    }
    setIsTorchOn(!isTorchOn);
  };

  if (device == null) return null

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={enableCamera}
        codeScanner={codeScanner}
      >
        <CameraOverlay />
        <SafeAreaView style={styles.wrapperButton}>
          <Button onPress={goBack}>
            <Feather name='x' color={theme.colors.text} size={30} />
          </Button>
        </SafeAreaView>
        <View style={styles.wrapperBtnTorch}>
          <Button onPress={toggleTorch}>
            <Feather name={isTorchOn ? 'zap-off' : 'zap'} color={theme.colors.text} size={30} />
          </Button>
        </View>
      </Camera>
    </View>
  )
}
