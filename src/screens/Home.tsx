import React, { useState, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import { supabase } from "../initSupabase"; // Ensure this is correctly configured
import uuid from 'react-native-uuid';

const INITIAL_REGION = {
  latitude: 18.2,
  longitude: -66.3,
  latitudeDelta: 4,
  longitudeDelta: 2,
};

export default function Home() {

  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null); // Reference to the map
  const currentRegion = useRef(INITIAL_REGION); // Track current map region

  const getCurrentUserId = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return null; // Handle the case when no user is logged in
      }

      return user?.id; // Return the user ID
    } catch (err) {
      console.error("Unexpected error fetching user ID:", err);
      return null; // Handle unexpected errors
    }
  };


  const handleRegionChange = (region) => {
    // Update currentRegion with the latest map region
    currentRegion.current = region;
  };

  const handleDoublePress = (event) => {
    const { coordinate } = event.nativeEvent;

    // Add marker at the tapped location
    setMarker({
      id: uuid.v4(),
      coordinate,
    });

    console.log("Setting Marker Coordinates:", coordinate);

    // Animate to the new location while keeping the current zoom level
    mapRef.current?.animateToRegion({
      ...currentRegion.current, // Preserve current latitudeDelta and longitudeDelta
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleDragEnd = (newCoordinate) => {
    // Update marker position when dragged
    setMarker((prevMarker) => ({
      ...prevMarker,
      coordinate: newCoordinate,
    }));
  };

  const saveReportToSupabase = async (markerData) => {
    try {
      const userId = await getCurrentUserId(); // Replace with your user authentication logic

      // Mock municipio and barrio for simplicity
      const municipio = "";
      const barrio = "";

      const { data, error } = await supabase.from("outage_reports").insert([
        {
          latitude: markerData.coordinate.latitude,
          longitude: markerData.coordinate.longitude,
          user_id: userId,
          id: markerData.id,
          municipio,
          barrio,
          created_at: ((new Date()).toISOString()).toLocaleString('zh-TW'),
        },
      ]);

      if (error) {
        console.error("Error saving report:", error);
        Alert.alert("Error", "Failed to save the report. Please try again.");
      } else {
        console.log("Report saved:", data);
        Alert.alert("Success", "Outage report saved successfully.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleFABPress = () => {
    if (marker) {
      console.log("Confirming Marker Coordinates:", marker.coordinate);

      // Save marker data to Supabase
      saveReportToSupabase(marker);

      // Clear the marker
      setMarker(null);
    } else {
      console.log("No marker to confirm");
      Alert.alert("No marker", "Please place a marker first.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Attach the map reference
        style={styles.map}
        onDoublePress={handleDoublePress} // Add marker on double-tap
        onRegionChangeComplete={handleRegionChange} // Track current region
        initialRegion={INITIAL_REGION} // Initial map view
        zoomEnabled={true} // Allow zoom gestures
      >
        {marker && (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            draggable
            onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Report outage"
        onLongPress={handleFABPress}
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
