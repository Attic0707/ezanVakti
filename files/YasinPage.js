import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, } from "react-native";
import ScaledText from "./ScaledText";
import { YASIN_ARABIC } from "./Yasin/YASIN_ARABIC";
import { YASIN_TURKISH } from "./Yasin/YASIN_TURKISH";
import { YASIN_ROMAN } from "./Yasin/YASIN_ROMAN";


export default function YasinPage({ onBack }) {

  return (
    <View style={[ styles.overlay, { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 }, ]} >
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }}  >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      {/* Header + Audio button */}
      <View style={styles.headerRow}>
        <Text style={styles.yasinTitle}>Yâsîn Suresi</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <Text style={styles.yasinSectionTitle}>📖 Arapça</Text>

        {YASIN_ARABIC.map((line, index) => (
          <ScaledText key={index} baseSize={14} style={styles.arabic}>
            {line}
          </ScaledText>
        ))}

        <View style={{ height: 20 }} />
        <Text style={styles.yasinSectionTitle}>Yasin Okunuşu</Text>

        {YASIN_ROMAN.map((line, index) => (
          <ScaledText key={index} baseSize={14} style={styles.roman}>
            {line}
          </ScaledText>
        ))}

        <View style={{ height: 20 }} />
        <Text style={styles.yasinSectionTitle}>🇹🇷 Türkçe Meali</Text>

        {YASIN_TURKISH.map((line, index) => (
          <ScaledText key={index} baseSize={14} style={styles.turkish}>
            {line}
          </ScaledText>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
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
  yasinTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  audioButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,221,85,0.8)",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  audioButtonText: {
    color: "#ffdd55",
    fontSize: 13,
    fontWeight: "600",
  },
  audioHint: {
    fontSize: 12,
    color: "#d0d7e2",
    marginBottom: 8,
  },
  scroll: {
    marginTop: 4,
    width: "100%",
  },
  yasinSectionTitle: {
    color: "#e3e3e3",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  arabic: {
    color: "#fff",
    fontSize: 22,
    lineHeight: 38,
    textAlign: "right",
    marginBottom: 8,
  },
  turkish: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },
  roman: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },
});