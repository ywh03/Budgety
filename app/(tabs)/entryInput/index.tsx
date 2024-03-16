import { db } from '@/app/_layout';
import { getCategoryById } from '@/app/db/categories';
import { useAppSelector } from '@/app/store/hooks';
import EntryInput from '@/components/EntryInput';
import { Text, View } from '@/components/Themed';
import { Icon, ListItem } from '@rneui/themed';
import { Href, Link, router, useFocusEffect } from 'expo-router';
import React from 'react';

import { Dimensions, StyleSheet, TextInput } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EntryInputScreen() {

    const currentCategoryId = useAppSelector((state) => state.entryInputCategory.categoryId);
    const [currentCategory, setCurrentCategory] = React.useState<Category>();
    const [iconData, setIconData] = React.useState({
      iconName: '',
      iconFamily: ''
    });

    const updateCurrentCategoryInfo = async () => {
      const currentCategoryInfo = await getCategoryById(db, currentCategoryId);
      console.log(currentCategoryInfo);
      const iconString = currentCategoryInfo[0].icon;
      const iconFamily = iconString.split('/')[0];
      const iconName = iconString.split('/')[1];
      setIconData({
        iconName: iconName,
        iconFamily: iconFamily,
      })
      setCurrentCategory(currentCategoryInfo[0]);
    }

    React.useEffect(() => {
      updateCurrentCategoryInfo();
    }, [currentCategoryId])

    return (
        <View style={styles.container}>
            
            <View>
                <EntryInput />
            </View>
            <View>
              <ListItem
                  containerStyle={styles.categoryCard}
                  pad={2}
                  onPress={() => router.push({pathname: '/(tabs)/entryInput/categorySelect', params: { categoryId: "root" }})}
              >
                  <ListItem.Content>
                      <ListItem.Title style={styles.categoryCardText}>
                          Category
                      </ListItem.Title>
                      
                  </ListItem.Content>
                  {
                    currentCategory ? <Icon name={iconData.iconName} type={iconData.iconFamily} color={currentCategory.hexColor} size={16} iconStyle={styles.iconStyle} raised reverse /> : null
                  }
                  {
                    currentCategory ? <Text style={styles.rightText}>{ currentCategory.name }</Text> : null
                  }
                  <ListItem.Chevron color="#787878" style={{paddingLeft: 5}} />
              </ListItem>
              <ListItem
                  containerStyle={styles.categoryCard}
                  pad={2}
                  onPress={() => router.push({pathname: '/(tabs)/entryInput/accountSelect', params: { categoryId: "root" }})}
              >
                  <ListItem.Content>
                      <ListItem.Title style={styles.categoryCardText}>
                          Account
                      </ListItem.Title>
                      
                  </ListItem.Content>
                  <ListItem.Chevron color="#787878" style={{paddingLeft: 5}} />
              </ListItem>
            </View>
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
    categoryCard: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: "5%",
        width: windowWidth,
        height: 70,
        borderBottomWidth: 2,
        borderBottomColor: "#383838",
        backgroundColor: "#242424",
    },
    categoryCardText: {
        color: "white",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "ags-r"
    },
    iconStyle: {
      fontSize: 20,
    },
    rightText: {
      color: "#787878",
      fontSize: 20,
      fontFamily: "ags-r",
    },
  });