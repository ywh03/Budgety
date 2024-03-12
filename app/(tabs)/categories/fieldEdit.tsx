import { db } from "@/app/_layout";
import { getCategoryById, updateCategory } from "@/app/db/categories";
import { View } from "@/components/Themed";
import { Button, Text } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FieldEdit() {
    const { categoryId } = useLocalSearchParams<{categoryId: string}>();
    const [categoryInfo, setCategoryInfo] = React.useState<Category>();
    const [input, setInput] = React.useState("");

    // WRITE SCRIPT TO UPDATE AND GO BACK
    const updateDatabase = async () => {
        const updatedCategory: Category = categoryInfo as Category;
        updatedCategory.name = input;
        await updateCategory(db, updatedCategory);
        console.log("Category name updated");
        router.back();
    }

    const getCategoryDetails = async () => {
        const categories: Category[] = await getCategoryById(db, parseInt(categoryId));
        if (categories.length !== 1) throw Error("Get category by Id failed");
        setCategoryInfo(categories[0]);
    }

    React.useEffect(() => {
        getCategoryDetails();
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