import { StatusBar, Text, StyleSheet, View } from 'react-native';
import  Navigation   from "./CountryInfoApp/Navigation/Navigation";

function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#4057a8ff'}  />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;