import { db } from "@/app/_layout";
import { getAllEntries } from "@/app/db/entries";
import { View } from "@/components/Themed";
import React from "react";

export const EntryScreen = () => {

    const [entries, setEntries] = React.useState<Entry[]>();

    const getEntries = async () => {
        const allEntries = await getAllEntries(db);
        setEntries(allEntries);
    }

    React.useEffect(() => {
        getEntries();
    }, [])

    return (
        <View>
            {
                entries ? (
                    entries.map((entry) => {
                        return (
                            <View>{entry.id}</View>
                        )
                    })
                ) : null
            }
        </View>
    )
}