import { db } from "@/app/_layout";
import { getCategoryById, getDescendantCategories } from "@/app/db/categories";
import AddCategoryButton from "@/components/AddCategoryButton";
import CategoryCard from "@/components/CategoryCard";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
import { Text, View } from "@/components/Themed";
import { Button, Icon, ListItem, Switch } from "@rneui/themed";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CategoryPage() {
    const categoryId = useLocalSearchParams().category;
    if (typeof categoryId !== "string") throw Error ("Wrong local search params");
    
    const [categoryInfo, setCategoryInfo] = React.useState<Category>();
    const [descendantInfo, setDescendantInfo] = React.useState<Category[]>();
    const [showToggle, setShowToggle] = React.useState(true);

    const getCategoryAndDescendantInfo = async () => {
        const info: Category[] = await getCategoryById(db, parseInt(categoryId));
        if (info.length === 0) throw Error("Category not found");
        else if (info.length > 1) throw Error("Multiple categories with the same Id");
        setCategoryInfo(info[0]);
        const iconString = info[0].icon;
        setIconFamily(iconString.split('/')[0]);
        setIconName(iconString.split('/')[1]);
        const info2: Category[] = await getDescendantCategories(db, info[0]);
        setDescendantInfo(info2);
    }

    const [iconFamily, setIconFamily] = React.useState("");
    const [iconName, setIconName] = React.useState("");

    useFocusEffect(
        React.useCallback(() => {
            getCategoryAndDescendantInfo();
        }, [])
    )

    return (
        <View>
            {
                categoryInfo !== undefined && descendantInfo !== undefined ? (
                    <View>
                        <View style={styles.iconContainer}>
                            <Icon name={iconName} type={iconFamily} color={categoryInfo.hexColor} size={50} iconStyle={styles.iconStyle} raised reverse />
                        </View>
                        <ListItem
                            key={"name"} 
                            containerStyle={styles.detailsRow}
                            onPress={(() => {
                                if (categoryInfo.id === undefined) throw Error("Missing categoryId");
                                router.push({pathname: "/(tabs)/categories/fieldEdit", params: {categoryId: categoryInfo.id.toString()}});
                            })}
                        >
                            <ListItem.Content>
                            <ListItem.Title style={[styles.detailsText]}>
                                Name
                            </ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={[styles.detailsText]}>
                                {categoryInfo.name}
                            </ListItem.Title>
                            <ListItem.Chevron />
                        </ListItem>
                        <ListItem key={"active"} containerStyle={styles.detailsRow}>
                            <ListItem.Content>
                            <ListItem.Title style={[styles.detailsText]}>
                                Active
                            </ListItem.Title>
                            </ListItem.Content>
                            <Switch value={showToggle} onValueChange={(value) => setShowToggle(value)} />
                        </ListItem>
                        <View>
                            {
                                descendantInfo.length ? (
                                    <Text style={styles.subText}>Subcategories</Text>
                                ): null
                            }
                            {
                                descendantInfo.length ? (
                                    descendantInfo.map((descendant) => {
                                        return <CategoryCard key={descendant.id} categoryInfo={descendant} />
                                    })
                                ) : null
                            }
                        </View>
                        <View>
                            <AddCategoryButton parentCategoryId={categoryId} parentHexColor={categoryInfo.hexColor} />
                        </View>
                        <View>
                            <DeleteCategoryButton categoryId={parseInt(categoryId)} />
                        </View>
                    </View>
                ) : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    detailsRow: {
        height: 70,
        paddingLeft: "5%",
        width: windowWidth,
        borderBottomWidth: 2,
        borderBottomColor: "#383838",
        backgroundColor: "#242424",
    },
    detailsText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "ags-r"
    },
    subText: {
        paddingTop: 25,
        paddingLeft: "5%",
        paddingBottom: 5,
        fontSize: 18,
        fontFamily: "ags-r",
        color: "#a3a3a3",
    },
    iconStyle: {
        fontSize: 50,
    },
    iconContainer: {
        margin: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }
})
