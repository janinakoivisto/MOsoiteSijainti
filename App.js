import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          setCoordinates({ lat: latitude, lng: longitude });
        } else {
          console.error('Location permission denied');
        }
      } catch (error) {
        console.error('Error getting location', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      ) : coordinates ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: coordinates.lat, longitude: coordinates.lng }} />
        </MapView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Unable to fetch location</Text>
        </View>
      )}
    </View>
  );
}
