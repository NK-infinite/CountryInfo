import RestCountryAPI from '../API/restcountryapi';
import { View, Text, TextInput, StyleSheet, Image, FlatList, Button, ActivityIndicator, Platform } from "react-native";
import { TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = () => {

    const screenWidth = Dimensions.get("window").width;
    const numColumns = screenWidth > 600 ? 4 : 2;
    const spacing = 20;
    const boxWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;

    type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

    const navigation = useNavigation<HomeScreenProps>();
    const [Country, setCountry] = useState<string>('');
    const [Data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAll = async () => {
            const allCountries = await RestCountryAPI('');
            setData(allCountries);
        };
        fetchAll();
    }, []);

    const fetch = async () => {
        setLoading(true);
        try {
            if (!Country) return;
            const result = await RestCountryAPI(Country);
            setData(result);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#4057a8ff' }}>
                <View style={styles.header}>
                    <Icon name="globe" size={30} style={{ marginRight: 10 }} color={'white'} />
                    <Text style={styles.headerText}>Country Info</Text>
                </View>
                <View style={{ marginTop: 10, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.InputText}>
                        <TextInput
                            placeholder="Search Country"
                            onChangeText={setCountry}
                            value={Country}
                            style={{ flex: 1 }}
                        />
                        <TouchableOpacity onPress={fetch}>
                            <Icon name='search' size={20} color="#0033E7" style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1, marginHorizontal: 10, marginVertical: 15 }}>

                {loading && <ActivityIndicator size="large" color="#0033E7" />}
                <FlatList
                    data={Data}
                    numColumns={numColumns}
                    columnWrapperStyle={numColumns > 2 ? { justifyContent: 'space-between' } : null}
                    keyExtractor={(item, index) => item?.cca2 || index.toString()}
                    renderItem={({ item }) => (

                        <View style={[styles.CountryBox, { width: boxWidth, }]}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailsScreen', {
                                name: item?.name?.common,
                                Id: item?.cca3,
                                Officialname: item?.name?.official,
                            })}

                            style={{alignItems:'center',}}
                        >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('DetailsScreen', {
                                        name: item?.name?.common,
                                        Id: item?.cca2,
                                        Officialname: item?.name?.official,
                                    })}
                                    style={{
                                        backgroundColor: '#F5F5F5F5',
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                        alignSelf: 'flex-end',
                                        marginBottom: 10,
                                    }}
                                >

                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ fontSize: 13, color: 'blue', }}>ShowAll</Text>
                                        <Icon name="angle-right" size={20} style={{ marginLeft: 8, marginRight: -15 }} color={'#0033E7'} />
                                    </View>

                                </TouchableOpacity>
                                <Image
                                    source={{ uri:`${item?.flags?.png}`}}
                                    style={{ width: boxWidth / 1.3, height: boxWidth / 2, marginHorizontal: 0, marginTop: 0, borderRadius: 15, marginBottom: 10 }}
                                    resizeMode="cover"
                                />
                                <Text style={styles.CountryBoxtext}><Text style={{ fontWeight: '800' }}>Country: </Text>{`${item?.name?.common}`}</Text>
                                <Text style={styles.CountryBoxtext}><Text style={{ fontWeight: '800' }}>Capital: </Text>{`${item?.capital}`}</Text>
                                <Text style={styles.CountryBoxtext}><Text style={{ fontWeight: '800' }}>Region: </Text>{`${item?.region}`} </Text>
                        </TouchableOpacity>
                            </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4057a8ff',
        marginTop: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
    },
    headerText: {
        fontFamily: Platform.OS === 'android' ? 'EduNSWACTCursive-Regular' : 'Edu NSW ACT Cursive',
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    InputText: {
        flex: 1,
        padding: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 7,
    },
    searchbutton: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 7,
    },
    searchbuttontext: {
        fontWeight: 'semibold',
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        color: 'blue',
    },
    CountryBox: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 20,
        elevation: 7,
        marginHorizontal: 10,
        borderRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5F5F5F5',
        marginBottom: 20,
    },
    CountryBoxtext: {
        fontFamily: Platform.OS === 'android' 
        ? 'EduNSWACTCursive-Regular' 
        : 'Edu NSW ACT Cursive',
        //   fontWeight: 'bold', 
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    }
})
export default HomeScreen;