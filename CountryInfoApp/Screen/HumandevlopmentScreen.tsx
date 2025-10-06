import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RootTabParamList } from '../Navigation/TabNavigation';
import { RouteProp } from '@react-navigation/native';
import getHumandevlopment from '../API/Humandevlopment';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


type getIDPorp = RouteProp<RootTabParamList, 'Humandevlopment'>;

const HumandevlopmentScreen = ({ route }: { route: getIDPorp }) => {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = screenWidth > 600 ? 2 : 1;
  const spacing = 20;
  const boxWidth = (screenWidth - spacing * (numColumns + 1)) / numColumns;
  const [loading, setLoading] = useState(false);

  const [Data, setData] = useState<any>([]);
  const ID = route?.params?.ID;
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        if (ID == null) return;
        const result = await getHumandevlopment(ID);
        if (result) {

          let formetAll: any[] = [];

          const [TotalPopulation, GrowPopulation, LifeExpectancy, ChildMortality,
            HealthSpending, PrimaryEnrollRatio, LiteracyRate, EducationSpending, GDP] = result;


          const len = Math.min(
            TotalPopulation.length,
            GrowPopulation.length,
            LifeExpectancy.length,
            ChildMortality.length,
            HealthSpending.length,
            PrimaryEnrollRatio.length,
            LiteracyRate.length,
            EducationSpending.length,
            GDP.length
          );



          for (let i = 0; i < len; i++) {
            formetAll.push({
              Year: TotalPopulation[i]?.date,
              TotalPopulation: TotalPopulation[i]?.value,
              GrowPopulation: GrowPopulation[i]?.value,
              LifeExpectancy: LifeExpectancy[i]?.value,
              ChildMortality: ChildMortality[i]?.value,
              HealthSpending: HealthSpending[i]?.value,
              PrimaryEnrollRatio: PrimaryEnrollRatio[i]?.value,
              LiteracyRate: LiteracyRate[i]?.value,
              EducationSpending: EducationSpending[i]?.value,
              Gdp: GDP[i]?.value
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

  console.log("HumandevlopmentScreen Data:", Data);

  return (
    <View style={{flex:1}}>
      {loading==true ? <View style={Humnadevlopmentstyles.loading}>
          <ActivityIndicator size='large' color="#0033E7" />
        </View>
      :
      <FlatList
        key={ID}
        data={Data}
        renderItem={({ item }) => (
          <View style={Humnadevlopmentstyles.FlatListStyle}>
            <Text style={Humnadevlopmentstyles.yeartext}>Year: {item?.Year}</Text>

            <View style={Humnadevlopmentstyles.databox}>
                 <View style={{ flex:1 ,justifyContent:'center',flexDirection:'row', alignItems:'center'}}>
              <Icon name="users" size={20} color="#0033E7"  style={{marginRight:10 ,marginTop: 5}}/>
              <Text style={{ textAlign: 'center', color:'#0033E7', fontWeight: 'bold',  marginTop: 5, fontSize: 20, }}>Population</Text>
                 </View>
           
              <View
                style={
                  [screenWidth > 600  
                    ? Humnadevlopmentstyles.rowContainer
                    : Humnadevlopmentstyles.columnContainer, { marginTop: 0 }]}
              >
                <Text style={Humnadevlopmentstyles.infoText}>
                <Text style={{ fontWeight: 'bold'}}>  Total Population:</Text> {item?.TotalPopulation?.toLocaleString() ?? "-"}
                </Text>
                <Text style={Humnadevlopmentstyles.infoText}>
                <Text style={{ fontWeight: 'bold'}}>  Population Growth:</Text> {item?.GrowPopulation ? item.GrowPopulation.toFixed(2) + "%" : "0%"}
                </Text>
              </View>
            </View>

            <View style={Humnadevlopmentstyles.databox}>
              <View style={{ flex:1 ,justifyContent:'center',flexDirection:'row', alignItems:'center'}}>
              <Icon  name="heartbeat" size={20} color="red"  style={{marginRight:10 , marginTop: 5}}/>
              <Text style={{ textAlign: 'center',color:'blue' , fontWeight: 'bold', marginTop: 5, fontSize: 20, }}>Healths</Text>
              
              </View>
              <View style={[screenWidth > 600
                ? [Humnadevlopmentstyles.rowContainer, { marginTop: 0, marginBottom: -5 }]
                : [Humnadevlopmentstyles.columnContainer, { marginTop: 0, marginBottom: -1 }]
              ]}>
                {
                  screenWidth > 600 ?
                    <Text style={Humnadevlopmentstyles.infoText}><Text style={{ fontWeight: 'bold'}}> Health Spending: </Text>{(item?.HealthSpending ? item?.HealthSpending.toFixed(1) + "%" : "N/A")}  ({((((item?.HealthSpending / 100) * item?.Gdp) / 1_000_000_000).toFixed(3) + " B")})</Text>
                    : <Text style={Humnadevlopmentstyles.infoText}> <Text style={{ fontWeight: 'bold'}}>Health Spending:</Text> {(item?.HealthSpending ? item?.HealthSpending.toFixed(1) + "%\n" : "N/A\n")}  ({((((item?.HealthSpending / 100) * item?.Gdp) / 1_000_000_000).toFixed(3) + " B")})</Text>
                }
                {/* <Text style={Humnadevlopmentstyles.infoText}> ({}) </Text> */}
              </View>

              <View
                style={
                  screenWidth > 600
                    ? Humnadevlopmentstyles.rowContainer
                    : Humnadevlopmentstyles.columnContainer
                }
              >
                <Text style={Humnadevlopmentstyles.infoText}>
               <Text style={{ fontWeight: 'bold'}}>   Average Life: </Text> {`${item?.LifeExpectancy ? item?.LifeExpectancy.toFixed(1) + "Year" : "N/A"}`}
                </Text>
                <Text style={Humnadevlopmentstyles.infoText}>
            <Text style={{ fontWeight: 'bold'}}>
                    Child Mortality: 
              </Text>
                    {item?.ChildMortality ? item.ChildMortality.toFixed(2) + "%" : "N/A"}
                </Text>
              </View>

            </View>
            {/*  */}
            <View style={Humnadevlopmentstyles.databox}>
              
              <View style={{ flex:1 ,justifyContent:'center',flexDirection:'row', alignItems:'center'}} >
              <Icon name="graduation-cap" size={20} color="#0033E7"  style={{marginRight:10 , marginTop: 5}}   />
              <Text style={{ textAlign: 'center',color:'blue' , fontWeight: 'bold', marginTop: 5, fontSize: 20, }}>Educations</Text>
              </View>
              {/* // 'lucida grande', tahoma, verdana, arial, sans-serif */}
              <View style={
                [screenWidth > 600
                  ? [Humnadevlopmentstyles.rowContainer, { marginTop: 0, marginBottom: -5 }]
                  : [Humnadevlopmentstyles.columnContainer, { marginTop: 0, marginBottom: -1 }]
                ]}>
                {
                  screenWidth > 600 ?
                    <Text style={Humnadevlopmentstyles.infoText}>
                  <Text style={{ fontWeight: 'bold'}}>

                      Education Spending: 
                  </Text>
                      {item?.EducationSpending ? item.EducationSpending.toFixed(1) + "%" : "N/A"}  ({(((item?.EducationSpending / 100) * item?.Gdp / 1_000_000_000).toFixed(3) + " B")})</Text>
                    : <Text style={Humnadevlopmentstyles.infoText}>
                  <Text style={{ fontWeight: 'bold'}}>

                      Education Spending: 
                  </Text>
                      {item?.EducationSpending ? item.EducationSpending.toFixed(1) + "%\n" : "N/A\n"}  ({(((item?.EducationSpending / 100) * item?.Gdp / 1_000_000_000).toFixed(3) + " B")})</Text>
                }

              </View>
              <View
                style={
                  screenWidth > 600
                    ? Humnadevlopmentstyles.rowContainer
                    : Humnadevlopmentstyles.columnContainer
                }
              >
                <View >
                  <Text style={Humnadevlopmentstyles.infoText}>
                 <Text style={{ fontWeight: 'bold'}}>

                    GPI primary school: 
                 </Text>
                    {item?.PrimaryEnrollRatio ? item.PrimaryEnrollRatio.toFixed(2) + "%" : "N/A"}</Text>
                </View>

                <Text style={Humnadevlopmentstyles.infoText}>
               <Text style={{ fontWeight: 'bold'}}>

                  Literacy Rate:
               </Text>
                   {item?.LiteracyRate ? item.LiteracyRate.toFixed(1) + "%" : "N/A"}
                </Text>

              </View>
            </View>
          </View>
        )}
      />
}
    </View>
  );
};


const Humnadevlopmentstyles = StyleSheet.create({
  FlatListStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 7,
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
  loading:{
 flex: 1, 
 justifyContent: 'center',
 alignItems: 'center'
    },
  yeartext: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  columnContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  infoText: {
        fontSize: 15,
    fontWeight: "semibold",
    marginVertical: 4,
    color: '#333333',
  },
});
export default HumandevlopmentScreen;