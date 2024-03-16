import { ListItem } from "@rneui/themed";
import { View } from "./Themed";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const newShade = (hexColor: string, magnitude: number) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

export default function AccountCardSimple(props: any) {
    return (
        <View>
            <ListItem
                containerStyle={styles.accountCard}
                pad={2}

            >
                <ListItem.Content>
                    <ListItem.Title style={styles.accountCardText}>
                        {props.accountInfo.name}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    accountCard: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: "5%",
        width: windowWidth,
        height: 70,
        borderBottomWidth: 2,
        borderBottomColor: "#383838",
        backgroundColor: "#242424",
    },
    accountCardText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "ags-r"
    }
})