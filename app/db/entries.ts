import { SQLiteDatabase } from "react-native-sqlite-storage"

export const createEntry = async (db: SQLiteDatabase, entry: Entry) => {
    const createQuery = `
        INSERT INTO Entries (amount, accountId, dateRecorded, dateUsed, categoryId, note)
        VALUES (?, ?, ?, ?. ?, ?)
    `

    const values = [
        entry.amount,
        entry.accountId,
        entry.dateRecorded,
        entry.dateUsed,
        entry.categoryId,
        entry.note
    ]

    try {
        db.executeSql(createQuery, values);
    } catch (err) {
        console.error(err);
        throw Error("Failed to create entry");
    }
}

export const getAllEntries = async (db: SQLiteDatabase) => {
    try {
        const entries: Entry[] = [];
        const results = await db.executeSql("SELECT * FROM Entries");
        results?.forEach((result) => {
            for (let i = 0; i < result.rows.length; i++) {
                entries.push(result.rows.item(i));
            }
        })
        return entries;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get all entries");
    }
}

export const updateEntry = async (db: SQLiteDatabase, updatedEntry: Entry) => {
    const updateQuery = `
        UPDATE Entries
        SET amount = ?, accountId = ?, dateRecorded = ?, dateUsed = ?, categoryId = ?, note = ?
        WHERE id = ?
    `

    const values = [
        updatedEntry.amount,
        updatedEntry.accountId,
        updatedEntry.dateRecorded,
        updatedEntry.dateUsed,
        updatedEntry.categoryId,
        updatedEntry.note,
        updatedEntry.id
    ]

    try {
        await db.executeSql(updateQuery, values);
    } catch (err) {
        console.error(err);
        throw Error("Failed to update entries");
    }
}

export const deleteEntry = async (db: SQLiteDatabase, entry: Entry) => {
    const deleteQuery = `
        DELETE FROM Entries
        WHERE id = ?
    `

    const values = [entry.id]

    try {
        await db.executeSql(deleteQuery, values);
    } catch (err) {
        console.error(err);
        throw Error("Failed to delete entries");
    }
}