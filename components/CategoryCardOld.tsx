import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { ListItem } from "@rneui/themed";
import React from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CategoryCardOld (props: any) {

    const [isExpanded, setExpanded] = React.useState(false);

    const dynamicStyles = {
        categoryCard: {
            marginLeft: props.dynamicStyles.marginLeft,
            width: props.dynamicStyles.width,
            backgroundColor: props.categoryInfo.hexColor
        }
    }

    return (
        <View>
            <ListItem.Accordion
                containerStyle={[styles.categoryCard, dynamicStyles.categoryCard]}
                content={
                    <>
                        <ListItem.Content>
                            <ListItem.Title style={styles.categoryCardText}>
                                {props.categoryInfo.icon} {props.categoryInfo.name}
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={isExpanded}
                onPress={() => {
                    setExpanded(!isExpanded);
                }}
                noIcon={!props.categoryInfo.subcategories.length}
            >
                <View>
                    {
                        props.categoryInfo.subcategories.length > 0 ? (
                            props.categoryInfo.subcategories.map((subcategory: any, index: number) => (
                                <CategoryCardOld categoryInfo={subcategory} dynamicStyles={{marginLeft: props.dynamicStyles.marginLeft + 20, width: props.dynamicStyles.width - 20}} />
                            ))
                        ) : null
                    }
                </View>
            </ListItem.Accordion>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryCard: {
        marginTop: 10,
        backgroundColor: "black",
        color: "white",
    },
    categoryCardText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
    }
})