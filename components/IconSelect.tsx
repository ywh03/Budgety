import React from "react";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from "./Themed";
import { Icon, Text } from "@rneui/themed";



const IconSelect = () => {
    const [query, setQuery] = React.useState("");
    const [icons, setIcons] = React.useState<string[]>([]);

    React.useEffect(() => {
        const getIcons = async () => {
            setIcons(Object.keys(MaterialCommunityIcon.getRawGlyphMap()));
        }

        getIcons();
    }, [])

    return(
        <View>
            <Text style={{color: "white"}}>Icons</Text>
            {
                icons.length ? (
                    icons.map((icon) => {
                        return (
                            <View>
                                <Icon name={icon} type="material-community" size={20} />
                                <Text style={{color: "white"}}>{icon}</Text>
                            </View>
                        )
                    })
                ) : <Text style={{color: "white"}}>No icons</Text>
            }
        </View>
    )
}

export default IconSelect;