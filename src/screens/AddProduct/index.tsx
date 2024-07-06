import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Feather from '@expo/vector-icons/Feather'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import { stylesheet } from './styles';
import { Button } from '@src/components/Button';
import { NavProps } from '@src/routes';
import ItemUser from '@src/components/ItemUser';
import { useData } from '@src/hooks/data';
import { Associate } from '@src/services/associate';
import { Order } from '@src/services/order';
import { showMessage } from 'react-native-flash-message';
import { TextArea } from '@src/components/TextArea';
import { Input } from '@src/components/Input';

export function AddProduct() {
  const { styles, theme } = useStyles(stylesheet)
  const { navigate } = useNavigation<NavProps>()
  // const [qtd, setQtd] = useState<number>(1)
  const [enableSave, setEnableSave] = useState(true)
  const [obs, setObs] = useState('')
  const [search, setSearch] = useState('')
  const [newListAssociates, setNewListAssociates] = useState<Associate[]>([])
  const { product, associates, associate, changeUser, saveOrder } = useData()
  // const [valueProduct, setValueProduct] = useState<number>(product.value)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['90%'], []);

  // useEffect(() => {
  //   const newValue = product.value * qtd
  //   setValueProduct(newValue)
  // }, [qtd])

  async function handleSaveOrder() {
    if (!associate.email) {
      return showMessage({
        message: 'Por favor selecione o associado',
        type: 'warning',
        icon: 'warning'
      })
    }

    try {
      setEnableSave(false);
      const currentProduct = {
        productId: product.id,
        associateId: associate.id,
        qtd: 1,
        obs: obs
      } as Order

      console.log(currentProduct)

      const response = await saveOrder(currentProduct)
      if (response) {
        changeUser({} as Associate)
        showMessage({
          message: 'Registro salvo com sucesso',
          type: 'success',
          icon: 'success',
        })
        navigate('Home')
      } else {
        showMessage({
          message: 'Registro salvo com sucesso',
          type: 'success',
          icon: 'success',
        })
      }
    } catch (error) {
      showMessage({
        message: 'Registro salvo com sucesso',
        type: 'success',
        icon: 'success',
      })
    } finally {
      setEnableSave(true);
    }
  }

  useEffect(() => {
    const result = associates.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
    setNewListAssociates(result)
  }, [search])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Button onPress={() => {
          changeUser({} as Associate)
          navigate('Scanner')
        }}>
          <Feather name='chevron-left' color={theme.colors.text} size={30} />
        </Button>
      </SafeAreaView>
      <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.label}>Produto:</Text>
          <Text style={styles.description}>{product.name}</Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.description}>
            {`R$ ${Number(product.value).toFixed(2).replace('.', ',')}`}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.label}>Associado</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => {
              bottomSheetRef.current?.snapToIndex(0)
              Keyboard.dismiss()
            }}
          >
            <Text style={styles.user}>{associate.name}</Text>
            <Feather name='chevron-down' color={theme.colors.text} size={30} />
          </TouchableOpacity>
          {/* O bloco a baixo foi comentado, pq no atual cenário não a necessidade de ter campo de Quantidade
        Caso em algum momento for reativar isso, valide todos os cenários possiveis
        <View style={styles.row}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Quantidade</Text>
            <View style={styles.select}>
              <TouchableOpacity
                style={styles.btnQtd}
                disabled={qtd === 1}
                onPress={() => setQtd(prevState => prevState - 1)}
              >
                <Feather
                  name='minus'
                  color={
                    qtd === 1 ?
                      theme.colors.input :
                      theme.colors.primary
                  }
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.value}>{qtd}</Text>
              <TouchableOpacity
                style={styles.btnQtd}
                disabled={qtd === 99}
                onPress={() => setQtd(prevState => prevState + 1)}
              >
                <Feather
                  name='plus'
                  color={
                    qtd === 99 ?
                      theme.colors.input :
                      theme.colors.primary
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Valor</Text>
            <Input placeholder='R$ 0,00' editable={false} value={`R$ ${valueProduct.toFixed(2).replace('.', ',')}`} />
          </View>
        </View> */}
          <View style={styles.separator} />
          <Text style={styles.label}>Observação</Text>
          <TextArea value={obs} onChangeText={txt => setObs(txt)} />
          <View style={styles.separator} />
          <Button disabled={!enableSave} onPress={handleSaveOrder} isFull>
            <Text style={styles.labelButtton}>Salvar</Text>
          </Button>
        </View>

      </KeyboardAvoidingScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        keyboardBehavior="interactive"
      // enableHandlePanningGesture={false}
      >
        <View style={styles.bottomSheet}>
          <BottomSheetTextInput
            value={search}
            onChangeText={txt => setSearch(txt)}
            placeholder='Buscar'
            placeholderTextColor={theme.colors.text}
            style={styles.inputBottonSheet}
          />

          <BottomSheetFlatList
            data={search !== '' ? newListAssociates : associates}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }: { item: Associate }) => (
              <ItemUser
                item={item}
                selected={item === associate}
                handlePress={() => {
                  changeUser(item)
                  bottomSheetRef.current?.close()
                  Keyboard.dismiss()
                }}
              />
            )}
          />
          <View style={styles.separator} />
          <Button onPress={() => {
            bottomSheetRef.current?.close()
            Keyboard.dismiss()
          }} type='cancel' isFull>
            <Text style={styles.labelButtton}>Cancelar</Text>
          </Button>
        </View>
      </BottomSheet>
    </View>
  )
}
