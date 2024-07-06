import React, { useCallback, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { useStyles } from 'react-native-unistyles';
import Feather from '@expo/vector-icons/Feather'

import ItemLastRegister from '@src/components/ItemLastRegister';
import { Button } from '@src/components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NavProps } from '@src/routes';
import { stylesheet } from './styles';
import { useData } from '@src/hooks/data';
import { Order } from '@src/services/order';

export function Home() {
  const { styles, theme } = useStyles(stylesheet)
  const { navigate } = useNavigation<NavProps>()
  const { orders, fetchData } = useData()

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))



  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>Últimos registros</Text>
        <Button onPress={() => navigate('Scanner')}>
          <Feather name='plus' color={theme.colors.text} size={30} />
        </Button>
      </SafeAreaView>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }: { item: Order }) => (
          <ItemLastRegister item={item} />
        )}
      />
    </View>
  )
}
