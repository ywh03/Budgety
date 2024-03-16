import * as SQLite from "expo-sqlite";

export const createCategory = async (db: SQLite.SQLiteDatabase, category: Category) => {
    const createQuery = `
        INSERT INTO Categories (name, icon, hexColor, parentCategoryId, descendantCount)
        VALUES (?, ?, ?, ?, ?)
    `

    const values = [
        category.name,
        category.icon,
        category.hexColor,
        category.parentCategoryId,
        category.descendantCount,
    ]

    try {
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(createQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        console.log("Category created successfully");
    } catch (err) {
        console.error(err);
        throw Error("Failed to create category");
    }
}

export const getAllRootCategories = async (db: SQLite.SQLiteDatabase) => {
    const getQuery = `
        SELECT * FROM Categories
        WHERE parentCategoryId IS NULL
    `
    
    try {
        const categories: Category[] = [];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(getQuery, [], (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        if (results) {
            for (let i = 0; i < results.rows.length; i++) {
                categories.push(results.rows.item(i) as Category);
            }
        }
        return categories;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get all root categories");
    }
}

export const getDescendantCategories = async (db: SQLite.SQLiteDatabase, id: number) => {
    const getQuery = `
        SELECT * FROM Categories
        WHERE parentCategoryId = ?
    `

    const values: SQLite.SQLStatementArg[] = [id];

    try {
        const categories: Category[] = [];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(getQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        if (results) {
            for (let i = 0; i < results.rows.length; i++) {
                categories.push(results.rows.item(i) as Category);
            }
        }
        return categories;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get categories");
    }
}

export const getAllCategories = async (db: SQLite.SQLiteDatabase) => {
    const getQuery = `
        SELECT * FROM Categories
    `
    
    try {
        const categories: Category[] = [];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(getQuery, [], (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        if (results) {
            for (let i = 0; i < results.rows.length; i++) {
                categories.push(results.rows.item(i) as Category);
            }
        }
        return categories;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get all categories");
    }
}

export const getCategoryById = async (db: SQLite.SQLiteDatabase, id: number) => {
    const getQuery = `
        SELECT * FROM Categories
        WHERE id = ?
    `

    const values: SQLite.SQLStatementArg[] = [id];

    try {
        const categories: Category[] = [];
        const results: SQLite.SQLResultSet | null = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(getQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
        if (results) {
            for (let i = 0; i < results.rows.length; i++) {
                categories.push(results.rows.item(i) as Category);
            }
        }
        return categories;
    } catch (err) {
        console.error(err);
        throw Error("Failed to get category by ID");
    }
}

export const updateCategory = async (db: SQLite.SQLiteDatabase, updatedCategory: Category) => {
    const updateQuery = `
        UPDATE Categories
        SET name = ?, icon = ?, hexColor = ?, parentCategoryId = ?, descendantCount = ?
        WHERE id = ?
    `

    const values: SQLite.SQLStatementArg[] = [
        updatedCategory.name,
        updatedCategory.icon,
        updatedCategory.hexColor,
        updatedCategory.parentCategoryId,
        updatedCategory.descendantCount,
        updatedCategory.id,
    ]

    try {
        await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(updateQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
    } catch (err) {
        console.error(err);
        throw Error("Failed to updated category");
    }
}

export const deleteCategory = async (db: SQLite.SQLiteDatabase, id: number) => {
    const deleteQuery = `
        DELETE FROM Categories
        WHERE id = ?
    `

    const values: SQLite.SQLStatementArg[] = [id ?? -1]

    try {
        await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(deleteQuery, values, (_, resultSet) => resolve(resultSet), (_, error) => {reject(error); return false;});
            })
        }) 
    } catch (err) {
        console.error(err);
        throw Error("Failed to delete category");
    }
}