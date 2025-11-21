import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert,} from "react-native";
import * as Location from "expo-location";

const DEBUG = false;

export default function IftarSayaciPage({ onBack }) {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [maghribTimeText, setMaghribTimeText] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    let isActive = true;

    async function init() {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          const msg =
            "Konum izni verilmedi. İftar saatini gösterebilmek için konum izni gerekiyor.";
          setErrorMsg(msg);
          Alert.alert("Konum gerekli", msg);
          return;
        }

        const pos = await Location.getCurrentPositionAsync({});
        if (!isActive) return;
        const { latitude, longitude } = pos.coords;

        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const url = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=3&timezonestring=${encodeURIComponent(
          timeZone
        )}`;

        const res = await fetch(url);
        const json = await res.json();

        if (DEBUG) console.log("Iftar API:", json);

        if (json.code !== 200 || !json.data?.timings?.Maghrib) {
          const msg = "Akşam vakti alınamadı.";
          setErrorMsg(msg);
          Alert.alert("Hata", msg);
          return;
        }

        const rawMaghrib = json.data.timings.Maghrib.split(" ")[0];
        setMaghribTimeText(rawMaghrib);

        const [hStr, mStr] = rawMaghrib.split(":");
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);

        if (Number.isNaN(h) || Number.isNaN(m)) {
          const msg = "Akşam vakti formatı çözülemedi.";
          setErrorMsg(msg);
          Alert.alert("Hata", msg);
          return;
        }

        const maghribDate = new Date(now);
        maghribDate.setHours(h, m, 0, 0);

        updateCountdown(maghribDate);

        intervalRef.current = setInterval(() => {
          updateCountdown(maghribDate);
        }, 1000);
      } catch (e) {
        if (DEBUG) console.log("IftarSayaci error:", e);
        const msg = "İftar sayacı hesaplanırken bir hata oluştu.";
        setErrorMsg(msg);
        Alert.alert("Hata", msg);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    function updateCountdown(target) {
      const now = new Date();
      let diff = target - now;

      if (diff <= 0) {
        // İftar vakti girmiş
        setCountdown({
          hours: "00",
          minutes: "00",
          seconds: "00",
          passed: true,
        });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        passed: false,
      });
    }

    init();

    return () => {
      isActive = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View
      style={[
        styles.overlay,
        { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 },
      ]}
    >
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.counterTitle}>İftar Sayacı</Text>
      <Text style={styles.counterSubtitle}>
        Bugün İftar vaktine ne kadar kaldığını gösterir.
      </Text>

      <ScrollView style={{ marginTop: 10, width: "100%" }}>
        {loading && (
          <View style={styles.centerBox}>
            <ActivityIndicator color="#ffdd55" />
            <Text style={styles.loadingText}>İftar vakti yükleniyor...</Text>
          </View>
        )}

        {!loading && errorMsg ? (
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        {!loading && !errorMsg && countdown && (
          <View style={styles.counterCard}>
            <Text style={styles.nextLabel}>Bugünkü İftar Saati:</Text>
            <Text style={styles.maghribTimeText}>{maghribTimeText}</Text>

            <Text style={styles.remainingLabel}>
              Kalan süre:
            </Text>

            <View style={styles.timeRow}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeNumber}>{countdown.hours}</Text>
                <Text style={styles.timeUnit}>Saat</Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeNumber}>{countdown.minutes}</Text>
                <Text style={styles.timeUnit}>Dakika</Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeNumber}>{countdown.seconds}</Text>
                <Text style={styles.timeUnit}>Saniye</Text>
              </View>
            </View>

            {countdown.passed && (
              <Text style={styles.iftarMessage}>
                🌙 İftar vakti girdi. Allah kabul etsin.
              </Text>
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingBottom: 20,
  },
  counterTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  counterSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 16,
  },
  centerBox: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#d0d7e2",
    fontSize: 14,
  },
  errorText: {
    color: "#ffb3b3",
    textAlign: "center",
    fontSize: 14,
  },
  counterCard: {
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
  },
  nextLabel: {
    color: "#9aa4b8",
    fontSize: 14,
    marginBottom: 4,
  },
  maghribTimeText: {
    color: "#ffdd55",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
  },
  remainingLabel: {
    color: "#d0d7e2",
    fontSize: 14,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 12,
  },
  timeBlock: {
    minWidth: 70,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
  },
  timeNumber: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  timeUnit: {
    color: "#9aa4b8",
    fontSize: 12,
    marginTop: 2,
  },
  iftarMessage: {
    marginTop: 10,
    color: "#c9ffc9",
    fontSize: 14,
    textAlign: "center",
  },
});