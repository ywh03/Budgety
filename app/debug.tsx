import { View } from "@/components/Themed";
import { db } from "./_layout"
import { getAllCategories, getDescendantCategories, updateCategory } from "./db/categories";
import { Button } from "@rneui/themed";

export default function DebugScreen() {
    const resetCategoryDescendantCount = async () => {
        const allCategories = await getAllCategories(db);
        for (const category of allCategories) {
            const allDescendantCategories = await getDescendantCategories(db, category.id);
            await updateCategory(db, {
                ...category,
                descendantCount: allDescendantCategories.length,
            } as Category).then(() => {
                console.log("Category with id " + category.id + " has descendantCount resetted");
            });
        }
    }

    const addCategoryColumn = async () => {
        const addColumnQuery = `
            ALTER TABLE Categories
            ADD COLUMN descendantCount INTEGER DEFAULT 0
        `
        try {
            db.transaction((tx) => {
                tx.executeSql(addColumnQuery);
            }, (err) => {
                console.error(err);
            }, () => {
                console.log("Tables successfully updated");
            });
        } catch (err) {
            console.log(err);
            throw Error("Failed to update tables");
        }
    }

    return (
        <View>
            <Button title="Reset Category Descendant Count" onPress={resetCategoryDescendantCount} />
            <Button title="Update Table Columns" onPress={addCategoryColumn} />
        </View>
    )
}