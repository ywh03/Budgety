import { db } from "@/app/_layout";
import { getAllRootCategories, getCategoryById, getDescendantCategories } from "@/app/db/categories";
import CategoryCard from "@/components/CategoryCard";
import { View, Text } from "@/components/Themed";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";

export default function CategorySelectScreen() {
    const { categoryId } = useLocalSearchParams();
    if (typeof categoryId !== "string") throw Error("Wrong local params type");

    const [allCategories, setAllCategories] = React.useState<Category[]>([]);
    const [parentCategoryInfo, setParentCategoryInfo] = React.useState<Category>();

    const getCategories = async () => {
        if (categoryId === "root") {
            const categories: Category[] = await getAllRootCategories(db);
            setAllCategories(categories);
        } else {
            const parentCategoryInfo = await getCategoryById(db, parseInt(categoryId));
            setParentCategoryInfo(parentCategoryInfo[0]);
            const categories: Category[] = await getDescendantCategories(db, parseInt(categoryId));
            setAllCategories(categories);
        }
        //console.log(allCategories);
    }

    useFocusEffect(
        React.useCallback(() => {
            getCategories();
        }, [])
    );


    return (
        <View>
            <View>
                <Text>Something</Text>
                { 
                    parentCategoryInfo ? (
                        <CategoryCard categoryInfo={parentCategoryInfo} />
                    ) : null
                }
            </View>
            <View>
                <Text>Subcategories</Text>
                {
                    allCategories ? (
                        allCategories.map(category => {
                            return <CategoryCard key={category.id ? category.id : null} categoryInfo={category} redirectType={category.descendantCount > 0 ? "entryInput" : "entryInputEnd"} />
                        })
                    ) : null
                }
            </View>
        </View>
    )
}