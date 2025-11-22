import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import ScaledText from "./ScaledText";

const DEBUG = false;

const ruyetData = [
    {title: 'İçtima', value: 'Ay, yörünge üzerinde her dolanmasında bir kez güneş ve dünyanın arasına girerek aynı doğrultuya gelmektedir. Güneş, Ay ve Dünya üçlüsünün aynı doğrultuya geldiği bu ana içtima veya kavuşum denir ki bu, astronomik aybaşının başlangıcıdır. İçtima anında ayın karanlık yüzü dünyaya dönük olduğu için dünyanın hiçbir yerinden hilal kesinlikle görülememektedir. Ay, Dünya etrafında belirli bir yörünge üzerinde dolanmakta ve bu dolanımını 29.5 günde tamamlamaktadır.'},
    {title: 'Ru´yet´i Hilal', value: 'Kameri ayın başlayabilmesi için Hz. Peygamberin hadisi mucibince Hilalin görülmesi şarttır. Hilalin görülebilecek bir parlaklığa ulaşması için de içtima doğrultusundan en az 8° açılması ve güneş battığı anda hilalin ufuk yüksekliğinin en az 5° olması gerekmektedir. Bu şartların dışında güneşin ışınlarından dolayı hilalin görülmesi kesinlikle mümkün değildir.'},
];

export default function RuyetPage({ onBack }) {


    return (
      <View style={[ styles.overlay, { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 }, ]} >
        {/* Back button */}
        <TouchableOpacity onPress={onBack} style={{ alignSelf: "flex-start", marginBottom: 10 }} >
          <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
        </TouchableOpacity>

        <Text style={styles.ruyetTitle}>Ruy'et Çalışmaları</Text>
        <Text style={styles.ruyetSubtitle}>
          Tanımlar
        </Text>

        <ScrollView style={{ marginTop: 10, width: "100%" }}>
            {ruyetData.map((section) => (
            <View key={section.title} style={styles.ruyetSection}>
                <ScaledText baseSize={14} style={styles.ruyetSectionTitle}>
                {section.title}
                </ScaledText>

            <View key={section.value} style={styles.ruyetCard} >
                <View style={{ flex: 1 }}>
                    <ScaledText baseSize={14} style={styles.ruyetText}>
                        {section.value}
                    </ScaledText>
                </View>
            </View>
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
    ruyetTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "center",
      marginBottom: 6,
    },
    ruyetSubtitle: {
      fontSize: 14,
      color: "#d0d7e2",
      textAlign: "center",
      marginBottom: 10,
    },
    ruyetSection: {
      marginTop: 16,
    },
    ruyetSectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#ffdd55",
      marginBottom: 8,
    },
    ruyetCard: {
        backgroundColor: "rgba(255,255,255,0.06)",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    ruyetText: {
        fontSize: 16,
        color: "#ffffff",
        marginBottom: 2,
    },
});