import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Icon, ListItem } from "@rneui/themed";
import React from "react";
import { Href, Link, router } from "expo-router";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CategoryCard (props: any) {

    const [iconFamily, setIconFamily] = React.useState("");
    const [iconName, setIconName] = React.useState("");

    React.useEffect(() => {
        const iconString = props.categoryInfo.icon;
        setIconFamily(iconString.split('/')[0]);
        setIconName(iconString.split('/')[1]);
    }, [])

    return (
        <View>
            <ListItem
                containerStyle={styles.categoryCard}
                onPress={() => router.push('/(tabs)/categories/' + props.categoryInfo.id as Href<String>)}
            >
                <Icon name={iconName} type={iconFamily} color={props.categoryInfo.hexColor} size={20} iconStyle={styles.iconStyle} raised reverse />
                <ListItem.Content>
                    <ListItem.Title style={styles.categoryCardText}>
                        {props.categoryInfo.name}
                    </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryCard: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: "5%",
        width: windowWidth,
        height: 70,
        borderBottomWidth: 2,
        borderBottomColor: "#383838",
        backgroundColor: "#242424",
    },
    categoryCardText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "ags-r"
    },
    iconStyle: {
        fontSize: 26,
    }
})