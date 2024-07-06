import { View, Text } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '@src/services/user';

export interface PropsItemUser {
  item: User,
  selected: boolean,
  handlePress(): void
}

export default function ItemUser({ item, selected, handlePress }: PropsItemUser) {
  const { styles } = useStyles(stylesheet)

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View style={styles.checkbox}>
        {selected && <View style={styles.selected} />}
      </View>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")}</Text>
      </View>
    </TouchableOpacity>
  )
}
