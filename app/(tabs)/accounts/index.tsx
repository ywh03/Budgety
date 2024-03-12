
import { db } from '@/app/_layout';
import { getAllAccounts } from '@/app/db/accounts';
import AccountCard from '@/components/AccountCard';
import AddAccountButton from '@/components/AddAccountButton';
import { Text, View } from '@/components/Themed';
import { useFocusEffect } from 'expo-router';
import React from 'react';

import { StyleSheet } from "react-native";

const testingAccount = {
    "id": 1,
    "name": "Account 1",
    "balance": 10800.02,
    "hexColor": "#ff5e5e",
    "currency": "SGD"
}

export default function AccountScreen() {

    const [accountsInfo, setAccountsInfo] = React.useState<Account[]>();

    const getAccountsInfo = async () => {
      const accounts: Account[] = await getAllAccounts(db);
      setAccountsInfo(accounts);
    }

    useFocusEffect(
      React.useCallback(() => {
        getAccountsInfo();
      }, [])
    )

    return (
        <View style={styles.container}>
            <AccountCard accountInfo={testingAccount} />
            {
              accountsInfo ? (
                accountsInfo.map((account: Account) => {
                  return <AccountCard key={account.id} accountInfo={account} />
                })
              ) : null
            }
            <AddAccountButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });