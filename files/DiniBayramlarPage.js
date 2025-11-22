import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import ScaledText from "./ScaledText";

const DEBUG = false;

export default function DiniBayramlarPage({ onBack }) {
  const SECTIONS_2026 = [
    {
      title: "Kandiller ve Mübarek Geceler",
      items: [
        {
          date: "15 Ocak 2026",
          day: "Perşembe",
          name: "Miraç Kandili",
        },
        {
          date: "02 Şubat 2026",
          day: "Pazartesi",
          name: "Berat Kandili",
        },
        {
          date: "16 Mart 2026",
          day: "Pazartesi",
          name: "Kadir Gecesi",
        },
        {
          date: "24 Ağustos 2026",
          day: "Pazartesi",
          name: "Mevlid Kandili",
        },
        {
          date: "10 Aralık 2026",
          day: "Perşembe",
          name: "Regaib Kandili",
        },
      ],
    },
    {
      title: "Ramazan ve Ramazan Bayramı",
      items: [
        {
          date: "19 Şubat 2026",
          day: "Perşembe",
          name: "Ramazan-ı Şerif'in Başlangıcı",
        },
        {
          date: "19 Mart 2026",
          day: "Perşembe",
          name: "Ramazan Bayramı Arefesi",
        },
        {
          date: "20 Mart 2026",
          day: "Cuma",
          name: "Ramazan Bayramı (1. Gün)",
        },
        {
          date: "21 Mart 2026",
          day: "Cumartesi",
          name: "Ramazan Bayramı (2. Gün)",
        },
        {
          date: "22 Mart 2026",
          day: "Pazar",
          name: "Ramazan Bayramı (3. Gün)",
        },
      ],
    },
    {
      title: "Kurban Bayramı",
      items: [
        {
          date: "26 Mayıs 2026",
          day: "Salı",
          name: "Kurban Bayramı Arefesi",
        },
        {
          date: "27 Mayıs 2026",
          day: "Çarşamba",
          name: "Kurban Bayramı (1. Gün)",
        },
        {
          date: "28 Mayıs 2026",
          day: "Perşembe",
          name: "Kurban Bayramı (2. Gün)",
        },
        {
          date: "29 Mayıs 2026",
          day: "Cuma",
          name: "Kurban Bayramı (3. Gün)",
        },
        {
          date: "30 Mayıs 2026",
          day: "Cumartesi",
          name: "Kurban Bayramı (4. Gün)",
        },
      ],
    },
    {
      title: "Diğer Özel Günler",
      items: [
        {
          date: "16 Haziran 2026",
          day: "Salı",
          name: "Hicrî Yılbaşı (1 Muharrem 1448)",
        },
        {
          date: "25 Haziran 2026",
          day: "Perşembe",
          name: "Aşure Günü",
        },
        {
          date: "10 Aralık 2026",
          day: "Perşembe",
          name: "Üç Ayların Başlangıcı",
        },
      ],
    },
  ];

  return (
    <View style={[ styles.overlay, { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 }, ]} >
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }} >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.bayramTitle}>2026 Dini Günler & Bayramlar</Text>
      <Text style={styles.bayramSubtitle}>
        Ramazan ve Kurban Bayramı ile kandil geceleri, 2026 yılı için özetlenmiştir.
      </Text>

      <ScrollView style={{ marginTop: 10, width: "100%" }}>
        {SECTIONS_2026.map((section) => (
          <View key={section.title} style={styles.bayramSection}>
            <ScaledText baseSize={14} style={styles.bayramSectionTitle}>
              {section.title}
            </ScaledText>

            {section.items.map((item) => (
              <View key={item.name + item.date} style={styles.bayramCard} >
                <View style={{ flex: 1 }}>
                  <ScaledText baseSize={14} style={styles.bayramName}>
                    {item.name}
                  </ScaledText>
                  <ScaledText baseSize={14} style={styles.bayramDate}>
                    {item.date} · {item.day}
                  </ScaledText>
                </View>
              </View>
            ))}
          </View>
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
  backButton: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
  },
  bayramTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  bayramSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 10,
  },
  bayramSection: {
    marginTop: 16,
  },
  bayramSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffdd55",
    marginBottom: 8,
  },
  bayramCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  bayramName: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 2,
  },
  bayramDate: {
    fontSize: 14,
    color: "#d0d7e2",
  },
});
