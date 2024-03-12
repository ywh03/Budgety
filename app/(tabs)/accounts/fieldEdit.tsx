import { db } from "@/app/_layout";
import { getAccountById, updateAccount } from "@/app/db/accounts";
import { getCategoryById, updateCategory } from "@/app/db/categories";
import { View } from "@/components/Themed";
import { Button, Text } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FieldEdit() {
    const { accountId } = useLocalSearchParams<{accountId: string}>();
    const [accountInfo, setAccountInfo] = React.useState<Account>();
    const [input, setInput] = React.useState("");

    const updateDatabase = async () => {
        const updatedAccount: Account = accountInfo as Account;
        updatedAccount.name = input;
        await updateAccount(db, updatedAccount);
        console.log("Account name updated");
        router.back();
    }

    const getAccountDetails = async () => {
        const accounts: Account[] = await getAccountById(db, parseInt(accountId));
        if (accounts.length !== 1) throw Error("Get account by Id failed");
        setAccountInfo(accounts[0]);
    }

    React.useEffect(() => {
        getAccountDetails();
    }, [])

    return (
        <View style={styles.displayContainer}>
            <Text style={styles.title}>New Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
            />
            <Button 
                title={"Save"}
                buttonStyle={styles.saveButton}
                onPress={updateDatabase}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 30,
        fontFamily: "ags-r",
        backgroundColor: "#242424",
        width: windowWidth * 0.8,
        color: "white",
        textAlign: "center",
        margin: 20,
    },
    title: {
        color: "white",
        fontSize: 38,
        fontFamily: "ags-b",
        margin: 20,
    },
    displayContainer: {
        display: "flex",
        alignItems: "center",
    },
    saveButton: {
        margin: 20,
        backgroundColor: "red",
        borderRadius: 5,
        width: windowWidth * 0.8,
    }
})