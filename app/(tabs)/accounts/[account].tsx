import EditAccountButton from "@/components/EditAccountButton";
import { View } from "@/components/Themed";
import { Button } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";

export default function AccountPage() {
    const accountId = useLocalSearchParams().account;
    if (typeof accountId !== "string") throw Error("Wrong local search params");

    return (
        <View>
            <EditAccountButton accountId={accountId} />
        </View>
    )
}