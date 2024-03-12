import * as SQLite from "expo-sqlite";

export const createAccount = async (db: SQLite.SQLiteDatabase, account: Account) => {
    const insertQuery = `
        INSERT INTO Accounts (name, balance, hexColor, currency)
        VALUES (?, ?, ?, ?)
    `

    const values: SQLite.SQLStatementArg[] = [
        account.name,
        account.balance,
        account.hexColor,
        account.currency,
    ]

    try {
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(insertQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
    } catch (err) {
        console.error(err);
        throw Error ("Failed to create account");
    }
}

export const getAllAccounts = async (db: SQLite.SQLiteDatabase) => {
    try {
        const accounts: Account[] = [];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql("SELECT * FROM Accounts", [], (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        if (results) {
            for (let i = 0; i< results.rows.length; i++) {
                accounts.push(results.rows.item(i) as Account);
            }
        }
        return accounts;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get all accounts");
    }
}

export const getAccountById = async (db: SQLite.SQLiteDatabase, id: number) => {
    const selectQuery = `
        SELECT * FROM Account
        WHERE id = ?
    `

    const values: SQLite.SQLStatementArg[] = [id]

    try {
        const accounts: Account[] =[];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(selectQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        })
        if (results) {
            for (let i = 0; i< results.rows.length; i++) {
                accounts.push(results.rows.item(i) as Account);
            }
        }
        return accounts;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get account by Id");
    }
}

export const updateAccount = async (db: SQLite.SQLiteDatabase, updatedAccount: Account) => {
    const updateQuery = `
        UPDATE Accounts
        SET name = ?, balance = ?, hexColor = ?, currency = ?
        WHERE id = ?
    `

    if (updatedAccount.id === undefined) throw Error("Unable to update account: No id");

    const values: SQLite.SQLStatementArg[] = [
        updatedAccount.name,
        updatedAccount.balance,
        updatedAccount.hexColor,
        updatedAccount.currency,
        updatedAccount.id,
    ]

    try {
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(updateQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
    } catch (err) {
        console.error(err);
        throw Error("Failed to update account");
    }
}

export const deleteAccount = async (db: SQLite.SQLiteDatabase, account: Account) => {
    const deleteQuery = `
        DELETE FROM Accounts
        WHERE id = ?
    `

    if (account.id === undefined) throw Error("Unable to delete account: no Id");

    const values: SQLite.SQLStatementArg[] = [account.id];

    try {
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(deleteQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
    } catch (err) {
        console.error(err);
        throw Error("Failed to delete account");
    }
}