import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert,} from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const EZAN_SOURCES = [
  { key: "classic", label: "Klasik Ezan", source: require("../assets/sounds/adhan.wav"), },

];

export default function EzanDinlePage({ onBack }) {
  const [currentKey, setCurrentKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  async function stopAdhan() {
    try {
      if (!player) return;

      player.pause();
      await player.seekTo(0);
    } catch (e) {
      console.log("stopAdhan error", e);
    } finally {
      setCurrentKey(null);
    }
  }

  async function playAdhan(item) {
    try {
      setIsLoading(true);

      if (player.playing) {
        player.pause();
        await player.seekTo(0);
      }

      player.replace(item.source);

      setCurrentKey(item.key);
      player.play();
    } catch (e) {
      console.log("playAdhan error", e);
      Alert.alert("Hata", "Ezan çalınırken bir sorun oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      try {
        player.remove();
      } catch (e) {
        console.log("player remove error", e);
      }
    };
  }, [player]);

  const isPlayingCurrent =
    currentKey != null && status?.playing && !isLoading;

  return (
    <View
      style={[
        styles.overlay,
        { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 },
      ]}
    >
      {/* Back button */}
      <TouchableOpacity onPress={async () => { await stopAdhan(); onBack(); }} style={{ alignSelf: "flex-start", marginBottom: 10 }} >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.ezanTitle}>Ezan Dinle</Text>
      <Text style={styles.ezanSubtitle}>
        Farklı makamlarda ezanları dinleyebilirsin. Sesi açmayı unutma.
      </Text>

      {(isLoading || (!status?.isLoaded && currentKey)) && (
        <Text style={styles.verseLoading}>Bismillahirrahmanirrahim...</Text>
      )}

      <ScrollView style={{ marginTop: 12, width: "100%" }}>
        {EZAN_SOURCES.map((item) => {
          const isCurrent = currentKey === item.key;
          return (
            <View key={item.key} style={styles.ezanCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.ezanName}>{item.label}</Text>
                {isCurrent && isPlayingCurrent && (
                  <Text style={styles.ezanPlayingHint}>Çalıyor...</Text>
                )}
              </View>

              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableOpacity style={styles.ezanButton} onPress={() => playAdhan(item)} disabled={isLoading} >
                  <Text style={styles.ezanButtonText}>Dinle</Text>
                </TouchableOpacity>

                {isCurrent && (
                  <TouchableOpacity style={[ styles.ezanButton, { backgroundColor: "rgba(255,80,80,0.8)" }, ]} onPress={stopAdhan} disabled={isLoading} >
                    <Text style={styles.ezanButtonText}>Durdur</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

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
  ezanTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  ezanSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 12,
  },
  verseLoading: {
    fontSize: 14,
    color: "#ffdd55",
    textAlign: "center",
    marginBottom: 10,
  },
  ezanCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  ezanName: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  ezanPlayingHint: {
    fontSize: 12,
    color: "#ffdd55",
    marginTop: 4,
  },
  ezanButton: {
    backgroundColor: "#ffdd55",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  ezanButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});
