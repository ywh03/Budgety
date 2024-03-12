import { createCategory, getAllRootCategories } from "@/app/db/categories";
import { Text, View } from "@/components/Themed"
import { Divider, FAB, Input } from "@rneui/themed";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { db } from "@/app/_layout";
import ColorPalette from "@/components/ColorPalette";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const addCategoryScreen = () => {
    const { parentCategoryId, parentHexColor } = useLocalSearchParams();
    if (typeof parentCategoryId !== 'string') throw Error("Wrong local search params");
    if (typeof parentHexColor !== 'string') throw Error("Wrong local search params");
    const parsedParentCategoryId = parentCategoryId === "" ? null : parseInt(parentCategoryId);

    const [name, setName] = React.useState("");
    const [hexColor, setHexColor] = React.useState("");
    const [icon, setIcon] = React.useState("");

    const submitCategory = async () => {
        const category = {
            name: name,
            icon: icon,
            hexColor: hexColor,
            parentCategoryId: parsedParentCategoryId,
        } as Category;
        await createCategory(db, category).then(() => {
            console.log("Category created");
        });
        router.back();
    }

    const handleHexColor = ( hex: string ) => {
        setHexColor(hex);
    }

    return (
        <View style={styles.body}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Add Category</Text>
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
                <ColorPalette defaultColor={parentHexColor ? parentHexColor : "#fff"} handleHexColor={handleHexColor} />
            </View>
            <View style={styles.field}>
                <Text style={styles.subtitle}>Icon</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setIcon}
                    value={icon}
                />
            </View>
            <FAB 
                title="Submit"
                style={styles.submitButton}
                onPress={submitCategory}
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

export default addCategoryScreen;