import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {datasource} from './Data';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'impact'
    },
});

const Home = ({navigation}) => {
    const insets = useSafeAreaInsets();

    const [mydata, setMyData] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if (datastr !== null) {
             let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
            }
            else {
                setMyData(datasource);
        }
    };

    getData();

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {
                                  navigation.navigate("Edit", {index: index, type: section.title, key: item.key})
                              }
                              }
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };

    const sectionHeader = ({section: {title, bgcolor}}) => {
        return (
            <Text style={[styles.headerText, {backgroundColor: bgcolor}]}>
                {title}
            </Text>
        );
    };
    return (
        <View style={{paddingTop: insets.top}}>
            <StatusBar/>
            <Button title='Add Letter' onPress={() => {
                let datastr = JSON.stringify(mydata)
                navigation.navigate("Add", {datastring:datastr});
            }}/>
            <SectionList sections={mydata}
                         renderItem={renderItem}
                         renderSectionHeader={sectionHeader
                         }/>
        </View>
    );
};

export default Home;