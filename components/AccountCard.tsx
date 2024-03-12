import { router } from "expo-router";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AccountCard(props: any) {
    const dynamicStyles = {
        accountCard: {
            backgroundColor: props.accountInfo.hexColor,
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.accountCard, dynamicStyles.accountCard]}
            onPress={() => router.push({pathname: "/(tabs)/accounts/accountDashboard", params: {accountId: props.accountInfo.id}})}
        >
            <Text style={styles.accountName}>{props.accountInfo.name}</Text>
            <Text>
                <Text style={styles.accountBalance}>${props.accountInfo.balance} </Text>
                <Text style={styles.accountCurrency}>{props.accountInfo.currency}</Text>
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    accountCard: {
        width: windowWidth * 0.9,
        height: '12%',
        padding: 20,
        margin: 5,
        borderWidth: 2,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    accountName: {
        fontSize: 18,
        fontFamily: 'ags-r',
        color: "white",
    },
    accountBalance: {
        fontSize: 24,
        fontFamily: "ags-b",
        fontWeight: "600"
    },
    accountCurrency: {
        fontSize: 16,
        fontFamily: "ags-r",
    }
});