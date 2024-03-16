import { db } from "@/app/_layout";
import { getAllCategories, getAllRootCategories } from "@/app/db/categories";
import AddCategoryButton from "@/components/AddCategoryButton";
import CategoryCard from "@/components/CategoryCard";
import { View } from "@/components/Themed";
import { Button } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function CategoryScreen() {

    const [allCategories, setAllCategories] = React.useState<Category[]>([]);

    const getCategories = async () => {
        const categories: Category[] = await getAllRootCategories(db);
        setAllCategories(categories);
        //console.log(allCategories);
    }

    useFocusEffect(
        React.useCallback(() => {
            getCategories();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View>
                {
                    allCategories?.map((category) => {
                        return <CategoryCard key={category.id} categoryInfo={category} redirectType={"category"} />
                    })
                }
            </View>
            <View>
                <AddCategoryButton parentCategoryId={""} parentHexColor={""} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });