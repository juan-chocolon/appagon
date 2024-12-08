
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, TextInput, Button, Alert } from "react-native";
import { supabase } from "../../initSupabase";

export default function MyReportsPage() {
  const [reports, setReports] = useState([]); // User's reports

  // Fetch user's reports and summary data
  const fetchReports = async () => {
    try {

      // Get the current user ID
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (userError || !userId) {
        throw new Error("User not authenticated.");
      }

      // Fetch the user's most recent 5 reports
      const { data: recentReports, error: reportError } = await supabase
        .from("outage_reports")
        .select("id, created_at, status, user_id")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(5);

      if (reportError) {
        throw reportError;
      }

      // update state
      setReports(recentReports);

    } catch (error) {
      console.error("Error fetching reports:", error.message);
      Alert.alert("Error", "Failed to fetch reports.");
    } 
  };

  // Update report status and reason
  const updateReport = async (reportId, status, reason) => {
    try {
      const { error } = await supabase
        .from("outage_reports")
        .update({ status, reason })
        .eq("id", reportId);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Report updated successfully.");
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error updating report:", error.message);
      Alert.alert("Error", "Failed to update the report.");
    }
  };

  // Fetch recent user reports
  useEffect(() => {
    fetchReports();
  }, [reports]);

  return (
    <View style={styles.container}>
      {/* Reports List */}
      <View style={styles.reports}>
        <Text style={styles.sectionTitle}>Your Recent Reports</Text>
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.reportItem}>
                <Text>Municipio: {item.municipio}</Text>
                <Text>Barrio: {item.barrio}</Text>
                <Text>Created At: {new Date(item.created_at).toLocaleString()}</Text>
                <Text>Status: {item.status || "Pending"}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter reason"
                  onChangeText={(text) => (item.reason = text)}
                  defaultValue={item.reason}
                />
                <Button
                  title="Resolved"
                  onPress={() => updateReport(item.id, "resolved", item.reason)}
                />
                <Button
                  title="Remove"
                  onPress={() => updateReport(item.id, "removed", item.reason)}
                />
              </View>
            )}
          />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  summary: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reports: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportItem: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});