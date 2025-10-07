import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from "react-native";

import WebView from "react-native-webview";
import { RootTabParamList } from "../Navigation/TabNavigation";
import { RouteProp } from "@react-navigation/native";
import countryProfile from "../API/countryprofile";
import Icon from "react-native-vector-icons/FontAwesome";

type getPorp = RouteProp<RootTabParamList, 'CountryProfile'>;

const { width, height } = Dimensions.get("window");

const CountryProfileScreen = ({ route }: { route: getPorp }) => {
  const [countryData, setCountryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const name = route?.params?.officialName1;
  const cc3 = route?.params?.ID;

  console.log("CountryProfile in ", "name", name, "ID", cc3);

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (!cc3) {
        setCountryData(null);
        setLoading(false);
        return;
      }
      const data = await countryProfile(cc3);
      if (data && data.length > 0) {
        setCountryData(data[0]);
      } else {
        setCountryData(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("CountryData", countryData);


  const currencyKeys = countryData?.currencies ? Object.keys(countryData.currencies) : [];


  const currencyKey = currencyKeys[0] || "N/A";
  const currency = countryData?.currencies?.[currencyKey] || { symbol: "-", name: "-" };

  return (
    <ScrollView >

      {loading ? <View style={styles.loading}>
        <ActivityIndicator size='large' color="#0033E7" />
      </View>
        :
        <View>
          <View>
            <WebView scrollEnabled={true} style={{ width: width, height: height }} source={{ uri: countryData?.maps?.openStreetMaps }} />
          </View>
          <View style={{ position: 'absolute', top: 10, left: 10 }}>
            <Icon name="map" size={30} color="#0033E7" />
          </View>

          <View style={styles.container}>
          <View style={{ flexDirection:'row' , justifyContent:'space-around'}}>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => Linking.openURL(countryData?.maps?.googleMaps)}
              >
              <Icon name="map-marker" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.mapButtonText}>Show in Google Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${countryData?.name?.common}`)}
              >
              <Icon name="wikipedia-w" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.mapButtonText}>wikipedia</Text>
            </TouchableOpacity>
              </View>

            {/* Flag & Coat of Arms */}
            <View style={styles.infoBoxRow}>
              <View style={styles.centerBox}>
                <Text style={styles.label}>Country Flag</Text>
                <Image
                  style={styles.flagImg}
                  source={{ uri: countryData?.flags?.png }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.centerBox}>
                <Text style={styles.label}>Coat of Arms</Text>
                <Image
                  style={styles.coatImg}
                  source={{ uri: countryData?.coatOfArms?.png }}
                  resizeMode="contain"
                />
              </View>
            </View>


            <View style={styles.infoBox}>
              <Text style={styles.title}><Icon name="info-circle" size={20} color="#0033E7" />  General Information</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Official Name:</Text> {countryData?.name?.official}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Capital:</Text> {countryData?.capital}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Region:</Text> {countryData?.region}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Subregion:</Text> {countryData?.subregion}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Population:</Text> {countryData?.population.toLocaleString()}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Area:</Text> {countryData?.area} km²</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Demonyms:</Text> {countryData?.demonyms?.eng?.f}</Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Languages:</Text> {countryData?.languages ? Object.values(countryData.languages).join(", ") : "N/A"}</Text>
            </View>


            <View style={styles.infoBox}>
              <Text style={styles.title}><Icon name="money" size={20} color="#0033E7" />  Currency</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.infoText}><Text style={styles.bold}>Code:</Text> {currencyKey}</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Symbol:</Text> {currency.symbol}</Text>
                <Text style={styles.infoText}><Text style={styles.bold}>Name:</Text> {currency.name}</Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.title}><Icon name="clock-o" size={20} color="#0033E7" />  Timezones</Text>
              <Text style={[styles.infoText, { fontWeight: "bold" }]}>{countryData?.timezones?.join(", ")}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.title}><Icon name="university" size={20} color="#0033E7" />  Governance</Text>

              <Text style={styles.infoText}>
                <Text style={styles.bold}>UN Member:</Text> {countryData?.unMember ? "Yes" : "No"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Independent:</Text> {countryData?.independent ? "Yes" : "No"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Landlocked:</Text> {countryData?.landlocked ? "Yes" : "No"}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.bold}>Driving Side:</Text> {countryData?.car?.side === 'left' ? "Left-hand traffic" : "Right-hand traffic"}
              </Text>
            </View>

          </View>

        </View>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F4F7FB"
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0033E7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  },
  infoBox: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  infoBoxRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#0033E7"
  },
  infoText: {
    fontSize: 15,
    marginVertical: 3,
    color: "#333"
  },
  bold: {
    fontWeight: "600",
    color: "#111"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6
  },
  flagImg: {
    height: 60,
    width: 90,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  coatImg: {
    height: 70,
    width: 70
  },
  centerBox: {
    alignItems: "center"
  }
});

export default CountryProfileScreen;