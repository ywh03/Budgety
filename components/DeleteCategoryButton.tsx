import { db } from "@/app/_layout";
import { deleteCategory } from "@/app/db/categories";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { Alert, Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DeleteCategoryButton(props: {categoryId: number}) {

    const deleteCategoryById = async () => {
        await deleteCategory(db, props.categoryId);
        console.log("Category successfully deleted");
        router.back();
    }

    const confirmDeleteCategory = async () => {
        Alert.alert(
            "Delete Category",
            "Are you sure you want to delete this category?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Deletion cancelled")
                },{
                    text: "Yes",
                    onPress: () => deleteCategoryById()
                }
            ]
        )
    }

    return (
        <Button
            title="Delete Category"
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            onPress={confirmDeleteCategory}
        />
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: "red",
        borderRadius: 30,
        width: windowWidth * 0.9,
    },
    titleStyle: {
        fontFamily: "ags-b",
        fontSize: 20,
    }
  });