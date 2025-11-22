import {TouchableOpacity, View, Text, StyleSheet, ScrollView} from "react-native";
import ScaledText from "./ScaledText";

export default function NamazSureleriPage({ onBack }) {

  const SECTIONS = [
    {
      title: "Namazda Okunan Sûreler",
      items: [
        {
          key: "fatiha",
          name: "Fâtiha Suresi",
          arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ
الْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمٖينَ
الرَّحْمٰنِ الرَّحٖيمِ
مَالِكِ يَوْمِ الدّٖينِ
اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعٖينُ
اهْدِنَا الصِّرَاطَ الْمُسْتَقٖيمَ
صِرَاطَ الَّذٖينَ اَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّآلّٖينَ`,
        },
        {
          key: "ikhlas",
          name: "İhlâs Suresi",
          arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ
قُلْ هُوَ اللّٰهُ اَحَدٌ
اللّٰهُ الصَّمَدُ
لَمْ يَلِدْ وَلَمْ يُولَدْ
وَلَمْ يَكُنْ لَّهُ كُفُوًا اَحَدٌ`,
        },
        {
          key: "felak",
          name: "Felâk Suresi",
          arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ
قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ
مِنْ شَرِّ مَا خَلَقَ
وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ
وَمِنْ شَرِّ النَّفّاثَاتِ فِى الْعُقَدِ
وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ`,
        },
        {
          key: "nas",
          name: "Nâs Suresi",
          arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ
قُلْ اَعُوذُ بِرَبِّ النَّاسِ
مَلِكِ النَّاسِ
اِلٰهِ النَّاسِ
مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ
الَّذٖى يُوَسْوِسُ فِى صُدُورِ النَّاسِ
مِنَ الْجِنَّةِ وَالنَّاسِ`,
        },
        {
          key: "kevser",
          name: "Kevser Suresi",
          arabic: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ
اِنَّا اَعْطَيْنَاكَ الْكَوْثَرَ
فَصَلِّ لِرَبِّكَ وَانْحَرْ
اِنَّ شَانِئَكَ هُوَ الْاَبْتَرُ`,
        },
      ],
    },
    {
      title: "Namaz Duaları",
      items: [
        {
          key: "ettehiyyatu",
          name: "Ettehiyyatü Duası",
          arabic: `اَلتَّحِيَّاتُ لِلّٰهِ وَالصَّلَوٰتُ وَالطَّيِّبَاتُ
اَلسَّلَامُ عَلَيْكَ اَيُّهَا النَّبِىُّ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ
اَلسَّلَامُ عَلَيْنَا وَعَلٰى عِبَادِ اللّٰهِ الصَّالِحِينَ
اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ`,
        },
        {
          key: "salli",
          name: "Salli ve Barik Duaları",
          arabic: `اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ وَعَلٰى اٰلِ مُحَمَّدٍ
كَمَا صَلَّيْتَ عَلٰى اِبْرَاهٖيمَ وَعَلٰى اٰلِ اِبْرَاهٖيمَ
وَبَارِكْ عَلٰى مُحَمَّدٍ وَعَلٰى اٰلِ مُحَمَّدٍ
كَمَا بَارَكْتَ عَلٰى اِبْرَاهٖيمَ وَعَلٰى اٰلِ اِبْرَاهٖيمَ
فِى الْعَالَمٖينَ اِنَّكَ حَمٖيدٌ مَجٖيدٌ`,
        },
        {
          key: "rabbenagfirli",
          name: "Rabbenâ Duaları",
          arabic: `رَبَّنَا اغْفِرْ لِى وَلِوَالِدَىَّ وَلِلْمُؤْمِنٖينَ يَوْمَ يَقُومُ الْحِسَابُ`,
        },
      ],
    },
  ];

  return (
    <View style={[styles.overlay, { paddingTop: 60 }]}>
      <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }}>
        <Text style={{ color: "#ffffff", fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Namaz Sûreleri & Duaları</Text>

      <ScrollView style={{ marginTop: 10, width: "100%" }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.items.map((s) => (
              <View key={s.key} style={styles.card}>
                <ScaledText baseSize={16} style={styles.surahName}>{s.name}</ScaledText>
                <Text style={styles.surahArabic}>{s.arabic}</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#ffdd55",
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  surahName: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 6,
  },
  surahArabic: {
    fontSize: 22,
    color: "#ffffff",
    textAlign: "right",
    lineHeight: 34,
  },
});
