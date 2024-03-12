import { db } from "@/app/_layout";
import { createAccount } from "@/app/db/accounts";
import ColorPalette from "@/components/ColorPalette";
import { Text, View } from "@/components/Themed"
import { Divider, FAB } from "@rneui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddAccountScreen() {

    const [name, setName] = React.useState("");
    const [balance, setBalance] = React.useState("");
    const [hexColor, setHexColor] = React.useState("");
    const [currency, setCurrency] = React.useState("");
    
    const submitAccount = async () => {
        const account = {
            name: name,
            balance: parseInt(balance),
            hexColor: hexColor,
            currency: currency,
        } as Account;
        await createAccount(db, account).then(() => {
            console.log("Account created");
        });
        router.back();
    }

    const handleHexColor = ( hex: string ) => {
        setHexColor(hex);
    }

    return (
        <View style={styles.body}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Add Account</Text>
            </View>
            <Divider />
            <View style = {styles.field}>
                <Text style={styles.subtitle}>Name</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />
            </View>
            <View style={styles.field}>
                <Text style={styles.subtitle}>HexColor</Text>
                <ColorPalette defaultColor={"#fff"} handleHexColor={handleHexColor} />
            </View>
            <View style={styles.field}>
                <Text style={styles.subtitle}>Initial Balance</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setBalance}
                    value={balance}
                />
            </View>
            <View style={styles.field}>
                <Text style={styles.subtitle}>Currency</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setCurrency}
                    value={currency}
                />
            </View>
            <FAB 
                title="Submit"
                style={styles.submitButton}
                onPress={submitAccount}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        margin: 20,
    },
    topBar: {
        height: windowHeight * 0.05,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    topBarText: {
        fontSize: 24,
        fontFamily: 'ags-r',
    },
    field: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: "white",
        marginBottom: 5,
        fontFamily: 'ags-r',
    },
    input: {
        fontSize: 24,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor: "#262626",
        color: "white",
        height: 40,
        width: windowWidth * 0.6,
        paddingLeft: 10,
    },
    submitButton: {
        width: "100%",
        fontFamily: 'ags-r',
        
    }
})