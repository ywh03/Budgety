type Account = {
    id?: number,
    name: string,
    balance: number,
    hexColor: string,
    currency: string,
};

type Category = {
    id?: number,
    name: string,
    icon: string,
    hexColor: string,
    parentCategoryId?: number;
}

type Entry = {
    id?: number,
    amount: number,
    accountId: number,
    dateRecorded: string,
    dateUsed: string,
    categoryId: number,
    note?: string,
}