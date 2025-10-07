
import { View, Text } from "react-native";
import { RootStackParamList } from '../Navigation/Navigation';
import { RouteProp } from "@react-navigation/native";
import TabBar from "../Navigation/TabNavigation";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
type DetailsPorp = RouteProp<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen = ({ route }: { route: DetailsPorp }) => {
    const Title = route?.params?.name;
    const ID = route?.params?.Id;
    const Officialname = route?.params?.Officialname;
 
    return (
        
       <SafeAreaView style={{flex:1, backgroundColor: '#4057a8ff'}} > 
        <View style={{ flex: 1, backgroundColor: '#4057a8ff' }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{Title.toUpperCase()}</Text>
            </View>
           
            <TabBar ID={ID} Title={Title} Officialname={Officialname}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    headerText: {
        fontFamily:'Edu NSW ACT Cursive',
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default DetailsScreen;