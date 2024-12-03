import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Alert, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB, Button } from "react-native-paper";
import uuid from "react-native-uuid";
import { supabase } from "../initSupabase";
import { Layout,
          TopNav,
          useTheme,
          themeColor,} from "react-native-rapi-ui";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const INITIAL_REGION = {
  latitude: 18.2,
  longitude: -66.3,
  latitudeDelta: 4,
  longitudeDelta: 2,
};

export default function OutageMap(){
  const { isDarkmode, setTheme } = useTheme();

  const mapRef = useRef();
  const [popupVisible, setPopupVisible] = useState(false);
  const [tempMarker, setTempMarker] = useState(null); // Temporary marker for the popup map
  const [marker, setMarker] = useState(null); // Confirmed marker
  const [markers, setMarkers] = useState([]); // Array of outage markers
  const [loading, setLoading] = useState(true); // Loading state for markers

  // Fetch markers from Supabase
  const fetchMarkers = async () => {
    try {
      const { data, error } = await supabase
      .from("outage_reports") // Explicitly select from the table
      .select("id, latitude, longitude, municipio, barrio, created_at, user_id"); // Include user_id explicitly

      if (error) {
        console.error("Error fetching markers:", error);
        Alert.alert("Error", "Failed to fetch markers.");
        return;
      }

      if (data) {
        const formattedMarkers = data.map((item) => ({
          id: item.id,
          coordinate: {
            latitude: item.latitude,
            longitude: item.longitude,
          },
          municipio: item.municipio,
          barrio: item.barrio,
          createdAt: item.created_at,
          userId: item.user_id
        }));
        setMarkers(formattedMarkers);
        console.log("Markers loaded:", formattedMarkers);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading after fetching markers
    }
  };

  useEffect(() => {
    fetchMarkers(); // Load markers on component mount
  }, []);

  const handleReportPress = () => {
    setPopupVisible(true);
  };

  const handleConfirmMarker = async () => {
    try {
      if (!tempMarker) {
        Alert.alert("No Marker", "Please place a marker first.");
        return;
      }
  
      // Fetch the current user's ID
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user?.id) {
        throw new Error("Failed to fetch user ID");
      }
      const userId = userData.user.id; // Extract the user ID
  
      // Submit the new outage report
      const { data, error } = await supabase.from("outage_reports").insert([
        {
          latitude: tempMarker.coordinate.latitude,
          longitude: tempMarker.coordinate.longitude,
          user_id: userId, // Use only the user ID
          id: tempMarker.id,
          created_at: new Date().toISOString(),
        },
      ]);
  
      if (error) {
        throw error;
      }
  
      setMarker(tempMarker); // Update the confirmed marker
      setTempMarker(null); // Clear temporary marker
      setPopupVisible(false); // Close the popup
      fetchMarkers(); // Refresh markers
      Alert.alert("Success", "Outage report submitted.");
    } catch (err) {
      console.error("Error submitting marker:", err);
      Alert.alert("Error", "Failed to submit the marker.");
    }
  };
  

  const handleCancel = () => {
    setTempMarker(null);
    setPopupVisible(false);
  };

  const handleMapTap = (event) => {
    const { coordinate } = event.nativeEvent;
    setTempMarker({
      id: uuid.v4(),
      coordinate,
    });
  };

  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        initialRegion={INITIAL_REGION}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={`${marker.municipio}, ${marker.barrio}`}
            description={`Reported on: ${new Date(marker.createdAt).toLocaleString()}`}
          />
        ))}
      </MapView>

      <FAB style={styles.fab} icon="plus" label="Report" onPress={handleReportPress} />

      {/* Popup Modal */}
      <Modal visible={popupVisible} animationType="slide" transparent>
        <View style={styles.popup}>
          <MapView
            style={styles.popupMap}
            initialRegion={INITIAL_REGION}
            onPress={handleMapTap}
          >
            {tempMarker && <Marker coordinate={tempMarker.coordinate} draggable />}
          </MapView>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleConfirmMarker} style={styles.button}>
              Confirm
            </Button>
            <Button mode="outlined" onPress={handleCancel} style={styles.button}>
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  </Layout>
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
  popup: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  popupMap: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
});
