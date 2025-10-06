import { View, Text, ActivityIndicator } from "react-native";
import { RootTabParamList } from "../Navigation/TabNavigation";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import getEconomicApi from "../API/economicApi";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

type getIDPorp = RouteProp<RootTabParamList, 'Economic'>;
const EconomiData = ({ route }: { route: getIDPorp }) => {

    const screenWidth = Dimensions.get("window").width;
    const numColumns = screenWidth > 600 ? 2 : 1;
    const spacing = 20;
    const boxWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;
const [loading, setLoading] = useState(false);

    const [Data, setData] = useState<any>([]);

    const ID = route?.params?.ID
    console.log(`Econmic ID:${ID}`);
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                if (ID == null) return;
                const result = await getEconomicApi(ID);
                if (result) {

                    let formetAll: any[] = [];
                    
                    const GDP = result[0];
                    const PCI = result[1];
                    const CPI = result[2];
                    const Export = result[3];
                    const Import = result[4];
                    const len = Math.min(GDP.length, PCI.length, CPI.length);

                    for (let i = 0; i < len; i++) {
                        formetAll.push({
                            Year: GDP[i]?.date,
                            GDP: GDP[i]?.value,
                            PCI: PCI[i]?.value,
                            CPI: CPI[i]?.value,
                            Export: Export[i]?.value,
                            Import: Import[i]?.value
                        });


                    }

                    setData(formetAll);
                    setLoading(false);
                }

            } catch (e) {
                console.log(e);
            }
        }
        fetch();
    }, [ID])

    return (
        <View style={{ flex: 1, }}>
            {loading==true ? <View style={EconmicStyle.loading}>
    <ActivityIndicator size='large' color="#0033E7" />
  </View> : 
           
            <FlatList
                data={Data}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={EconmicStyle.FlatListStyel}>

                        <Text style={EconmicStyle.FlatListYear}>Year: {item?.Year}</Text>


             <View style={EconmicStyle.databox}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5 }}>
                             <View>
                                <Text style={screenWidth > 600 ? [EconmicStyle.FlatListtext, { fontSize: 20 }] : [EconmicStyle.FlatListtext,]}>GDP (USD$) </Text>
                                <Text style={[EconmicStyle.FlatListtext2, { color: 'blue', fontSize: 30, textAlign: 'center' }]}>{(item?.GDP ? (item.GDP / 1_000_000_000_000).toFixed(3) + " T" : "No Data").toLocaleString()} </Text>
                             </View>
                        
                        </View>
                </View>
  
  <View style={screenWidth > 600 ? [EconmicStyle.databox , {paddingVertical:15}] : [EconmicStyle.databox] }>
                        <View style={screenWidth > 600 ? { flexDirection: 'row', justifyContent: 'space-evenly' } : { flexDirection: 'column', marginBottom:5 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon  name="arrow-down" size={15} color="blue"/>
                                <Text style={[EconmicStyle.FlatListtext,]}>Export:</Text>
                                 <Text style={[EconmicStyle.FlatListtext2, {}]}>{item?.GDP ? (((item?.Export / 100) * item?.GDP) / 1_000_000_000_000).toFixed(3) + " T" : "No Data"} / {Math.round(item?.Export) + "% of GDP"}</Text>
                            </View>

                            <View style={{ flexDirection: 'row',alignItems:'center', justifyContent: 'center' }}>
                                <Icon  name="arrow-up" size={15} color="blue"/>
                                <Text style={[EconmicStyle.FlatListtext,]}>Import:</Text>
                                 <Text style={[EconmicStyle.FlatListtext2, {}]}>{item?.GDP ? (((item?.Import / 100) * item?.GDP) / 1_000_000_000_000).toFixed(3) + " T" : "No Data"} / {Math.round(item?.Import) + "% of GDP"}</Text>
                            </View>
                        </View>
                        </View>

            <View style={screenWidth > 600 ? [EconmicStyle.databox , {paddingVertical:15}] : [EconmicStyle.databox]}>
                        <View style={screenWidth > 600 ? { flexDirection: 'row', justifyContent: 'space-evenly' } : { flexDirection: 'column',marginBottom:5 }}>
                           
                            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                               <Icon name="money" size={15} color={"blue"} />
                                  <Text style={EconmicStyle.FlatListtext}>GDP per capita:</Text>
                                 <Text style={[EconmicStyle.FlatListtext2, ]}> {(item?.PCI ?? 0).toFixed(2)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                               <Icon name={"shopping-cart"} size={15} color={'blue'}/>
                               <Text style={EconmicStyle.FlatListtext}>Consumer Price Index :</Text>
                                <Text style={[EconmicStyle.FlatListtext2, ]}> {(item?.CPI ?? 0).toFixed(2)}</Text>
                            </View>

                        </View>
</View>
                    </View>
                )}
            />
             }
        </View>
    )
}

const EconmicStyle = StyleSheet.create({
    FlatListStyel: {
        flex: 1,
        flexDirection: 'column',
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        margin: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 20,
        elevation: 7,
    },

    loading:{
 flex: 1, 
 justifyContent: 'center',
 alignItems: 'center'
    },
     databox: {
    backgroundColor:'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
     // Shadow for iOS
  shadowColor: "#0033E7",
  shadowOpacity: 0.26,
  shadowRadius: 25,
  // Shadow for Android
  elevation: 7,

  },

    FlatListYear: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },

    FlatListtext: {
        textAlign: 'left',
            fontSize: 15,
    fontWeight: "bold",
        padding: 5,
        color: '#333333',
        marginLeft: 10,
    },
    FlatListtext2: {
           fontSize: 15,
    fontWeight: "semibold", 
    marginVertical: 4,
    color: '#333333',
    }
})
export default EconomiData;