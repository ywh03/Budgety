import { db } from "@/app/_layout";
import { getAccountById } from "@/app/db/accounts";
import { View } from "@/components/Themed";
import { ListItem } from "@rneui/themed";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AccountSettings() {
    const { accountId } = useLocalSearchParams<{accountId: string}>();

    const [accountInfo, setAccountInfo] = React.useState<Account>();

    const getAccountInfo = async () => {
        const account: Account[] = await getAccountById(db, parseInt(accountId));
        if (account.length !== 1) throw Error("Error retrieving account info by id");
        setAccountInfo(account[0]);
    }

    useFocusEffect(() => {
        React.useCallback(() => {
            getAccountInfo();
        }, [])
    })

    return (
        <View>
            {
                accountInfo !== undefined ? (
                    <ListItem
                key={"name"} 
                containerStyle={styles.detailsRow}
                onPress={(() => {
                    if (accountInfo.id === undefined) throw Error("Missing categoryId");
                    router.push({pathname: "/(tabs)/accounts/fieldEdit", params: {accountId: accountInfo.id.toString()}});
                })}
            >
                <ListItem.Content>
                <ListItem.Title style={[styles.detailsText]}>
                    Name
                </ListItem.Title>
                </ListItem.Content>
                <ListItem.Title style={[styles.detailsText]}>
                    {accountInfo.name}
                </ListItem.Title>
                <ListItem.Chevron />
            </ListItem>
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    detailsRow: {
        height: 70,
        paddingLeft: "5%",
        width: windowWidth,
        borderBottomWidth: 2,
        borderBottomColor: "#383838",
        backgroundColor: "#242424",
    },
    detailsText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "ags-r"
    },
    subText: {
        paddingTop: 25,
        paddingLeft: "5%",
        paddingBottom: 5,
        fontSize: 18,
        fontFamily: "ags-r",
        color: "#a3a3a3",
    }
})
