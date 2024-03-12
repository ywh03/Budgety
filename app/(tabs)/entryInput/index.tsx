import EntryInput from '@/components/EntryInput';
import { Text, View } from '@/components/Themed';

import { StyleSheet, TextInput } from "react-native";

export default function EntryInputScreen() {
    return (
        <View style={styles.container}>
            <View>
                <EntryInput />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });