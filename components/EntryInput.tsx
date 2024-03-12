import { Dimensions, StyleSheet, TextInput } from "react-native";
import { Text, View } from '@/components/Themed';
import { ButtonGroup } from "@rneui/themed";
import React from "react";
import AmountKeypad from "./AmountKeypad";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EntryInput () {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [entryValue, setEntryValue] = React.useState("");

    return (
        <View>
            <View style={styles.modeSelectArea} >
                <ButtonGroup 
                    buttons={['Expense', 'Income', 'Transfer']}
                    onPress={(value) => {
                        setSelectedIndex(value);
                    }}
                    selectedIndex={selectedIndex}
                    containerStyle={styles.modeSelectContainer}
                    buttonStyle={styles.mode}
                    textStyle={styles.mode}
                    selectedButtonStyle={styles.selectedMode}
                    selectedTextStyle={styles.selectedMode}
                />
            </View>
            <View style={styles.amountArea}>
                <TextInput 
                    style={styles.amountInput}
                    placeholder="0.00"
                    value={entryValue}
                />
            </View>
            <AmountKeypad entryValue={entryValue} setEntryValue={setEntryValue} />
        </View>
    )
}

const styles = StyleSheet.create({
    amountArea: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    mode: {
        backgroundColor: "#000000",
        color: "#ffffff"
    },
    selectedMode: {
        backgroundColor: "white",
        color: "#000000"
    },
    modeSelectContainer: {
        width: windowWidth * 0.9,
        height: 30,
        borderRadius: 10,
    },
    modeSelectArea: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    amountInput: {
        fontSize: 80,
        color: "#ffffff",
    }
})