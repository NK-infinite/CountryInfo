import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EconomiData from '../Screen/EconomicScreen';
import HumandevlopmentScreen from '../Screen/HumandevlopmentScreen';
import CountryProfileScreen from '../Screen/CountryProfile';

export type RootTabParamList = {
  Humandevlopment: { ID: string } | undefined;
  Economic: { ID: string } | undefined;
  CountryProfile: { Title: string; ID: string; officialName1: string } | undefined;
};

type GetTAbProps = {
  ID: string
  Title: string
  Officialname: string
}
  
const Tab = createMaterialTopTabNavigator<RootTabParamList>();

const TabBar = (props: GetTAbProps) => {
  const ID = props?.ID
  const officialName1 = props?.Officialname
  console.log(`TabBAr Props:${ID} , ${officialName1}`);
  
  return (
    <Tab.Navigator
      screenOptions={{

        swipeEnabled: true,
        tabBarLabelStyle: {  fontWeight:'semibold' },
        tabBarActiveTintColor: '#0033E7',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: '#E2E2E2' },
        tabBarIndicatorStyle: { backgroundColor: '#0033E7' },
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen
        name="Economic"
        options={
        {
          title: `Economic Data`
        }
      }
        component={EconomiData}
        initialParams={{ ID }}
      />

      <Tab.Screen 
      name="Humandevlopment"
      options={
        {
          title: `People & Progress`
        }
      }
      component={HumandevlopmentScreen}
       initialParams={{ ID }} />

      <Tab.Screen 
      name="CountryProfile"
      options={
        {
          title: `Country Profile`
        }
      }
      component={CountryProfileScreen}
      initialParams={{  officialName1 , ID }}
       />
     
      </Tab.Navigator>
  )
}


export default TabBar;