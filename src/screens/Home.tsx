import React, { useRef } from "react";
import { View, Linking, StyleSheet,} from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
import { Callout, Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE, Region } from "react-native-maps";
import MapView  from "react-native-maps";

import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

// initiaal region for Map
const INITIAL_REGION = {
  latitude: 18.2,
  longitude: -66.3,
  latitudeDelta: 4,
  longitudeDelta: 2
};

// styless variable, can be extended to replacce other styles for widgets
const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});



export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();

  // reference map for modifying map attributes or sending
  const mapRef = useRef<MapView>();

  // usse this funcction to focus when giving coordinates
  const focusMap = () => {
    mapRef.current?.animateToRegion();
  };

  const onRegionChange = (region: Region) => {
    console.log(region)
  };

  const placePin = () => {

  };

  // TEMPORARY FOR TESTING
  const markers = [
    { latitude: 18.490255210644833,
      longitude: -66.31430623007031,
      latitudeDelta: 3.5203417881679115,
      longitudeDelta: 2.306888398924741,
      name: "Marker 1"
    },

    { latitude: 18.010219677392314,
      latitudeDelta: 0.5,
      longitude: -66.61325768000484,
      longitudeDelta: 0.5,
      name: "Ponce"
    }
  ];


  const setZoom = () => {
  };

  const updateMapMarkers = () => {

  };

  return (
    <Layout>
      {/* TOP APP BAR */}
      <TopNav
        middleContent="Appagon"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"} // set top right icon depending on dark/light theme
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        // determines what happens when hitting top right icon
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MapView style={StyleSheet.absoluteFillObject}
                  // region={this.props.coordinate}
                  showsUserLocation
                  showsMyLocationButton
                  provider={PROVIDER_DEFAULT}
                  initialRegion={INITIAL_REGION}
                  // region={}
                  onRegionChangeComplete={onRegionChange}
                  onDoublePress={placePin}
        // onDoublePress={}
        >
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              coordinate={marker}
            >
              <Callout onPress={(ev: any) => {console.log(ev)}}>
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 24}}>
                    {marker.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))};

        </MapView>
        {/* <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              status="danger"
              text="Logout"
              onPress={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                  alert("Signed out!");
                }
                if (error) {
                  alert(error.message);
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section> */}
      </View>
    </Layout>
  );
}
