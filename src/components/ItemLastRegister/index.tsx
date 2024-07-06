import { View, Text } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './styles';
import { Order } from '@src/services/order';
import { format, parseISO } from 'date-fns';
import FontAwesome from '@expo/vector-icons/FontAwesome5'

interface PropsItemLastRegister {
  item: Order
}

export default function ItemLastRegister({ item }: PropsItemLastRegister) {
  const { styles, theme } = useStyles(stylesheet)

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <FontAwesome name='utensils' color={theme.colors.bg2} size={26} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item?.associate?.name || ""}</Text>
        <Text style={styles.product}>{item?.product?.name || ""}</Text>
      </View>
      <View>
        <Text style={styles.date}>{item?.createdAt && format(parseISO(item?.createdAt), 'dd/MM/yy HH:mm')}</Text>
      </View>
    </View>
  )
}
