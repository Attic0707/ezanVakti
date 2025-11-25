import {TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function QuranPage({ onBack }) {
    return (
        <View style={styles.quranContainer}>
            {/* Header */}
            <View style={styles.quranHeader}>
            {/* Back button (same pattern as other pages) */}
            <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }} >
            <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
            </TouchableOpacity>
              <Text style={styles.quranTitle}>Kur’an-ı Kerim</Text>
            </View>
    
            {/* Official Diyanet Kur’an site */}
            <WebView
              source={{ uri: "https://kuran.diyanet.gov.tr/mushaf_v2" }}
              startInLoadingState
              renderLoading={() => (
                <ActivityIndicator animating={true} style={{ marginTop: 20 }} color="#15ff00ff" />
              )}
              style={{ flex: 1, backgroundColor: "transparent" }}
            />
        </View>
    );
          
}
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 20,
      alignItems: "stretch",
      justifyContent: "flex-start",
    },
    quranContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      paddingTop: 60,
      paddingBottom: 90,
      paddingHorizontal: 0,
    },
    quranHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    quranTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: "#ffffff",
      marginLeft: 8,
    },

});