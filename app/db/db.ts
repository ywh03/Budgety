import * as SQLite from "expo-sqlite";

export const createTables = async (db: SQLite.SQLiteDatabase) => {
    const accountsQuery = `
        CREATE TABLE IF NOT EXISTS Accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            balance DOUBLE DEFAULT 0,
            hexColor TEXT,
            currency TEXT DEFAULT 'SGD'
        )
    `
    const categoriesQuery = `
        CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon TEXT,
            hexColor TEXT,
            parentCategoryId INTEGER,
            descendantCount INTEGER,
            FOREIGN KEY (parentCategoryId) REFERENCES Categories(id)
        )
    `
     const entriesQuery = `
        CREATE TABLE IF NOT EXISTS Entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount DOUBLE NOT NULL,
            accountId INTEGER NOT NULL,
            dateRecorded DATETIME DEFAULT CURRENT_TIMESTAMP,
            dateUsed DATETIME DEFAULT CURRENT_TIMESTAMP,
            categoryId INTEGER NOT NULL,
            note TEXT,
            FOREIGN KEY (accountId) REFERENCES Accounts(id),
            FOREIGN KEY (categoryId) REFERENCES Categories(id)
        )
     `
    
    try {
        db.transaction((tx) => {
            tx.executeSql(accountsQuery);
            tx.executeSql(categoriesQuery);
            tx.executeSql(entriesQuery);
        }, (err) => {
            console.error(err);
        }, () => {
            console.log("Tables successfully created");
        });
    } catch (err) {
        console.log(err);
        throw Error("Failed to create tables");
    }

}