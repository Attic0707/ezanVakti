import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

export default function QuranPage({ onBack }) {
  const [ayah, setAyah] = useState(null);
  const [surahName, setSurahName] = useState("");
  const [loading, setLoading] = useState(false);

  // Start with a random verse
  useEffect(() => {
    loadRandomAyah();
  }, []);

  async function loadRandomAyah() {
    try {
      setLoading(true);
      const res = await fetch("https://api.quran.com/api/v4/verses/random?language=ar&fields=text_uthmani,verse_key");
      const json = await res.json();
      const v = json.verse;

      setAyah(v);
      await loadSurahName(v.verse_key);
    } finally {
      setLoading(false);
    }
  }

  async function loadSurahName(verseKey) {
    // verseKey example = "36:5"
    const surahNum = verseKey.split(":")[0];

    const res = await fetch(`https://api.quran.com/api/v4/chapters/${surahNum}?language=tr`);
    const json = await res.json();

    setSurahName(json.chapter.translated_name.name);
  }

  async function loadAyahByKey(key) {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${key}?language=ar&fields=text_uthmani,verse_key`
      );

      const json = await res.json();
      const v = json.verse;
      setAyah(v);

      await loadSurahName(v.verse_key);
    } finally {
      setLoading(false);
    }
  }

  function nextAyah() {
    if (!ayah) return;
    const [s, a] = ayah.verse_key.split(":").map(Number);

    // Ayah 286 is the limit in Baqarah, but instead of tracking,
    // we handle "not found" gracefully (API returns 404)
    loadAyahByKey(`${s}:${a + 1}`);
  }

  function prevAyah() {
    if (!ayah) return;
    const [s, a] = ayah.verse_key.split(":").map(Number);

    if (a > 1) {
      loadAyahByKey(`${s}:${a - 1}`);
    }
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={{ color: "#fff", fontSize: 20 }}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Kur’an-ı Kerim</Text>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={{ marginTop: 40 }} />
      ) : ayah ? (
        <>
          <Text style={styles.surahTitle}>
            {surahName} — {ayah.verse_key}
          </Text>

          {/* Arabic Ayah */}
          <Text style={styles.arabic}>{ayah.text_uthmani}</Text>

          {/* Buttons */}
          <View style={styles.navRow}>
            <TouchableOpacity onPress={prevAyah} style={styles.navBtn}>
              <Text style={styles.navText}>← Önceki</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={nextAyah} style={styles.navBtn}>
              <Text style={styles.navText}>Sonraki →</Text>
            </TouchableOpacity>
          </View>

          {/* Random button */}
          <TouchableOpacity onPress={loadRandomAyah} style={styles.randomBtn}>
            <Text style={styles.randomText}>Rastgele Ayet</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000006f",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  surahTitle: {
    color: "#ffd700",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  arabic: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 40,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navBtn: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  navText: {
    color: "#fff",
    fontSize: 16,
  },
  randomBtn: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#ffdd55",
    borderRadius: 8,
  },
  randomText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "700",
  },
});
