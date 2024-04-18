import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import fetch from 'node-fetch';

const MapScreen = ({ navigation }) => {
  const [markers, setMarkers] = useState([]);

  const fetchMarkersFromAirtable = async () => {
    try {
      const response = await fetch('https://api.airtable.com/v0/appKaGGPul9GMAhk6/tbl5AFqFkm1ZUSJj4', {
        headers: {
          'Authorization': 'patEWW8bFhwlyqGaZ.4a13003761302f6d118cc0fd2bce6f30da1ab1ef00b535d73d7c5a7e0515dbd4',
        },
      });

      const data = await response.json();
      const records = data.records;

      const markersData = records.map(record => ({
        latlng: {
          latitude: 43.083843,
          longitude: -77.674744,
        },
        title: record.fields['flddhQadKdFGZtj8T'],
        description: record.fields['fldflNmUkNTEB1LoG'],
      }));

      setMarkers(markersData);
    } catch (error) {
      console.error('Error fetching markers from Airtable:', error);
    }
  };

  useEffect(() => {
    fetchMarkersFromAirtable();
  }, []);

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