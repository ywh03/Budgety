import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditAccountButton(props: {accountId: string}) {

    const editAccount = () => {
        router.push({pathname: "/(tabs)/accounts/accountSettings", params: { accountId: props.accountId }});
    }

    return (
        <Button
            title="Edit Account"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={editAccount}
        />
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: "blue",
        borderRadius: 30,
        width: windowWidth * 0.9,
    },
    titleStyle: {
        fontFamily: "ags-b",
        fontSize: 20,
    }
  });