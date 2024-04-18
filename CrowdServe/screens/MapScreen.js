import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

const MapScreen = ({ navigation }) => {
  const markers = [
    {
      latlng: {
        latitude: 43.083843,
        longitude: -77.674744,
      },
      title: 'TEST',
      description: 'Here wi',
    },
 
  ];

  return (
    <View style={styles.pageContainer}>
      <StatusBar style="auto" />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.083843,
          longitude: -77.674744,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <Text style={styles.title}>Campus Map</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  tile: {
    backgroundColor: '#808080',
    width: 175,
    height: 350,
    borderRadius: '10%',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});