import { Button } from "@rneui/themed";
import { View } from "./Themed";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AmountKeypad (props: any) {

    const appendToEntryValue = (title: String) => {
        if (title === "<") {
            if (props.entryValue.length > 0) {
                props.setEntryValue(props.entryValue.slice(0, -1));
            }
            else return;
        }
        else if (title === ".") {
            if (!props.entryValue.includes('.')) {
                props.setEntryValue(props.entryValue + ".");
            }
        }
        else {
            props.setEntryValue(props.entryValue + title);
        }
    }

    return (
        <View style={styles.keyPadArea} >
            <Button 
                title="1"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("1")}
            />
            <Button 
                title="2"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("2")}
            />
            <Button 
                title="3"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("3")}
            />
            <Button 
                title="4"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("4")}
            />
            <Button 
                title="5"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("5")}
            />
            <Button 
                title="6"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("6")}
            />
            <Button 
                title="7"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("7")}
            />
            <Button 
                title="8"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("8")}
            />
            <Button 
                title="9"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("9")}
            />
            <Button 
                title="."
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue(".")}
            />
            <Button 
                title="0"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("0")}
            />
            <Button 
                title="<"
                buttonStyle={styles.numberButton}
                onPress={() => appendToEntryValue("<")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    numberButton: {
        height: 60,
        width: windowWidth * 0.3,
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "#454545",
        color: "#ffffff"
    },
    keyPadArea: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    }
})