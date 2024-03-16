import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Icon, ListItem } from "@rneui/themed";
import React from "react";
import { Href, Link, router } from "expo-router";
import { useAppDispatch } from "@/app/store/hooks";
import { setCategory } from "@/app/store/features/entryInput/entryInputCategorySlice";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//TODO: change props: any
export default function CategoryCard (props: any) {

    const [iconFamily, setIconFamily] = React.useState("");
    const [iconName, setIconName] = React.useState("");

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const iconString = props.categoryInfo.icon;
        setIconFamily(iconString.split('/')[0]);
        setIconName(iconString.split('/')[1]);
    }, [])

    return (
        <View>
            <ListItem
                containerStyle={styles.categoryCard}
                pad={2}
                onPress={() => {
                    if (props.redirectType === "entryInput") router.push({pathname: "/(tabs)/entryInput/categorySelect", params: {categoryId: props.categoryInfo.id}});
                    else if (props.redirectType === "category") router.push('/(tabs)/categories/' + props.categoryInfo.id as Href<String>)
                    else if (props.redirectType === "entryInputEnd") {
                        dispatch(setCategory(props.categoryInfo.id));
                        router.navigate("/(tabs)/entryInput");
                    }
                }}
            >
                <Icon name={iconName} type={iconFamily} color={props.categoryInfo.hexColor} size={20} iconStyle={styles.iconStyle} raised reverse />
                <ListItem.Content>
                    <ListItem.Title style={styles.categoryCardText}>
                        {props.categoryInfo.name}
                    </ListItem.Title>
                </ListItem.Content>
                {
                    props.categoryInfo.descendantCount && props.redirectType !== "entryInputEnd" ? (
                        <Text style={styles.rightText}>({props.categoryInfo.descendantCount})</Text>
                    ) : null
                }
                {
                    props.categoryInfo.descendantCount && props.redirectType !== "entryInputEnd" ? (
                        <ListItem.Chevron color="#787878" />
                    ) : null
                }
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
    },
    rightText: {
        color: "#787878",
        fontSize: 22,
        fontFamily: "ags-r",
    },
})