import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function AddCategoryButton(props: { parentCategoryId: string, parentHexColor: string }) {
    return (
        <Button
            title={props.parentCategoryId ? "Add Subcategory" : "Add Category"}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonstyle}
            onPress={() => router.push({pathname: "/categories/addCategory", params: {parentCategoryId: props.parentCategoryId, parentHexColor: props.parentHexColor}})}
        />
    )
}

const styles = StyleSheet.create({
    buttonstyle: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: "green",
        borderRadius: 30,
        width: windowWidth * 0.9,
    },
    titleStyle: {
        fontFamily: "ags-b",
        fontSize: 20,
    }
  });