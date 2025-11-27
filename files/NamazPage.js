import { TouchableOpacity, View, Text, StyleSheet, ScrollView, } from "react-native";
import ScaledText from "./ScaledText";

export default function NamazPage({ onBack }) {
  const sections = [
    {
      title: "1. Hazırlık",
      text:
        "• Abdest alınır.\n" +
        "• Elbiseler ve namaz kılınacak yer temiz olur.\n" +
        "• Kıble yönüne dönülür.",
    },
    {
      title: "2. Niyet",
      text:
        "Hangi namaz kılınacaksa kalpten niyet edilir: “Niyet ettim Allah rızası için bugünkü farz/farz olmayan ... namazını kılmaya.”",
    },
    {
      title: "3. İftitah Tekbiri",
      text:
        "Eller kulak hizasına kaldırılır, “Allahu Ekber” denir ve eller bağlanır. Bu, namaza giriş tekbiridir.",
    },
    {
      title: "4. Kıyam (Ayakta duruş)",
      text:
        "• Eller bağlanır (Hanefî’de erkekler göbek altında, kadınlar göğüs üzerinde).\n" +
        "• Önce ‘Sübhaneke’ okunur.\n" +
        "• Ardından Fâtiha Sûresi ve kısa bir sûre veya birkaç ayet okunur.",
    },
    {
      title: "5. Rükû",
      text:
        "“Allahu Ekber” diyerek eğilinir, bel düz olur, eller dizler üzerine konur.\n" +
        "En az üç kere: “Sübhâne rabbiyel azîm” denir.",
    },
    {
      title: "6. Rükû’dan kalkış",
      text:
        "“Semiallâhu limen hamideh” diyerek doğrulunur.\n" +
        "Ardından: “Rabbenâ lekel hamd” denir.",
    },
    {
      title: "7. Secde",
      text:
        "“Allahu Ekber” diyerek secdeye gidilir.\n" +
        "Alın, burun, iki el, iki diz ve ayak parmakları yere dayanır.\n" +
        "En az üç kere: “Sübhâne rabbiyel a’lâ” denir.",
    },
    {
      title: "8. İki secde arası oturuş",
      text:
        "“Allahu Ekber” diyerek secdeden kalkılır, dizler üzerinde kısa bir süre oturulur.\n" +
        "Sonra tekrar secdeye varılır ve aynı tesbihler tekrar edilir.",
    },
    {
      title: "9. Rekâtlar",
      text:
        "• Farz namazların rekât sayıları:\n" +
        "  - Sabah: 2 rekât farz (öncesinde 2 sünnet)\n" +
        "  - Öğle: 4 rekât farz (öncesinde ve sonrasında sünnetler)\n" +
        "  - İkindi: 4 rekât farz (öncesinde sünnet)\n" +
        "  - Akşam: 3 rekât farz (sonrasında sünnet)\n" +
        "  - Yatsı: 4 rekât farz (öncesinde ve sonrasında sünnet, ardından vitir).",
    },
    {
      title: "10. Tahiyyat oturuşu ve selam",
      text:
        "Son rekâtta oturulur, ‘Ettehiyyâtü, Allahümme salli, Allahümme barik, Rabbena’ duaları okunur.\n" +
        "Önce sağ tarafa, sonra sol tarafa selam verilir: “Esselâmü aleyküm ve rahmetullah.”",
    },
  ];

  return (
    <View style={[ styles.overlay, { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 }, ]}  >
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }} >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.guideTitle}>Namaz Nasıl Kılınır?</Text>
      <Text style={styles.guideSubtitle}>Farz namazlar için temel adımlar.</Text>

      <ScrollView style={{ marginTop: 12, width: "100%" }}>
          {sections.map((s, index) => (
            <View key={index} style={styles.guideCard}>
              <ScaledText baseSize={14} style={styles.guideStepTitle}> {s.title} </ScaledText>
              <ScaledText baseSize={14} style={styles.guideStepText}> {s.text} </ScaledText>
            </View> 
            ))}
          <View style={{ height: 60 }} />
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
  guideTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  guideSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 12,
  },
  guideCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  guideCardInteractive: {
    borderWidth: 1,
    borderColor: "rgba(255,221,85,0.6)",
  },
  guideStepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffdd55",
    marginBottom: 4,
  },
  guideStepText: {
    fontSize: 14,
    color: "#f2f2f7",
    lineHeight: 20,
  },
  tapHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#d0d7e2",
  },
});
