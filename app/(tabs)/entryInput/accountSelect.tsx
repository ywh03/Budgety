import { db } from "@/app/_layout";
import { getAllAccounts } from "@/app/db/accounts";
import AccountCardSimple from "@/components/AccountCardSimple";
import { View } from "@/components/Themed";
import React from "react";

export default function accountSelectScreen() {
    const [allAccounts, setAllAccounts] = React.useState<Account[]>();

    const getAccounts = async () => {
        const accounts = await getAllAccounts(db);
        setAllAccounts(accounts);
    }

    React.useEffect(() => {
        getAccounts();
    }, [])

    return (
        <View>
            {
                allAccounts?.map(account => {
                    return <AccountCardSimple key={account.id} accountInfo={account} />
                })
            }
        </View>
    )
}