import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import uuid from "react-native-uuid";

const INITIAL_REGION = {
  latitude: 18.2,
  longitude: -66.3,
  latitudeDelta: 4,
  longitudeDelta: 2,
};

export default function Home() {
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null); // Reference to MapView

  // Track map region changes
  const handleRegionChangeComplete = (region) => {
    console.log("Map Region Updated:", region);
  };

  // Handle double-tap logic
  let lastTap = null;

  const handleLongTap = (event) => {

      const { coordinate } = event.nativeEvent;

      // Update marker state
      setMarker({
        id: uuid.v4(),
        coordinate,
      });

      console.log("Double-tap detected. Marker set at:", coordinate);

      // Animate map to marker location
      mapRef.current?.animateToRegion({
        ...INITIAL_REGION,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });

  };

  useEffect(() => {
    console.log("Marker state updated:", marker);
  }, [marker]);

  // Confirm marker placement and clear
  const handleFABPress = () => {
    if (marker) {
      console.log("Confirming Marker:", marker);
      Alert.alert("Success", "Marker confirmed!");
      setMarker(null);
    } else {
      Alert.alert("No Marker", "Please place a marker first.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleLongTap}
        onRegionChangeComplete={handleRegionChangeComplete}
        initialRegion={INITIAL_REGION}
      >
        {marker && (
          <Marker
            key={marker?.id || "default-marker-key"}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={(e) => {
              const newCoordinate = e.nativeEvent.coordinate;
              console.log("Marker dragged to:", newCoordinate);
              setMarker((prev) => ({
                ...prev,
                coordinate: newCoordinate,
              }));
            }}
          />
        )}
      </MapView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Report"
        onPress={handleFABPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
