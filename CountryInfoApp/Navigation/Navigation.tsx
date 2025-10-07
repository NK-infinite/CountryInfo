import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screen/Home';
import { HeaderShownContext, HeaderTitle } from '@react-navigation/elements';
import DetailsScreen from '../Screen/DetailsScreen';
// import DetailsScreen from '../Screen/DetailsScreen';


export type RootStackParamList = {
    HomeScreen: undefined;
    DetailsScreen: { name: string , Id:string, Officialname: string };  
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen"
                    options={
                        {
                            headerShown: false
                        }
                    }
                    component={HomeScreen} />
                <Stack.Screen 
                options={
                    {
                       headerShown: false
                    }
                }
                name="DetailsScreen"
                component={DetailsScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>

    )
}
export default Navigation;