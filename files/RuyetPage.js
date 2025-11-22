import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import ScaledText from "./ScaledText";

const DEBUG = false;

const ruyetData = [
    {title: 'İçtima', value: "Ay, yörünge üzerinde her dolanmasında bir kez güneş ve dünyanın arasına girerek aynı doğrultuya gelmektedir. " + 
        "Güneş, Ay ve Dünya üçlüsünün aynı doğrultuya geldiği bu ana içtima veya kavuşum denir ki bu, astronomik aybaşının başlangıcıdır. " + 
        "İçtima anında ayın karanlık yüzü dünyaya dönük olduğu için dünyanın hiçbir yerinden hilal kesinlikle görülememektedir. " +
        "Ay, Dünya etrafında belirli bir yörünge üzerinde dolanmakta ve bu dolanımını 29.5 günde tamamlamaktadır."},

    {title: 'Ru´yet´i Hilal', value: "Kameri ayın başlayabilmesi için Hz. Peygamberin hadisi mucibince Hilalin görülmesi şarttır. " + 
        "Hilalin görülebilecek bir parlaklığa ulaşması için de içtima doğrultusundan en az 8° açılması ve " + 
        "güneş battığı anda hilalin ufuk yüksekliğinin en az 5° olması gerekmektedir. " +
        "Bu şartların dışında güneşin ışınlarından dolayı hilalin görülmesi kesinlikle mümkün değildir."},

    {title: 'KAMERİ AY BAŞLARI HESAP VE HARİTALARININ AÇIKLANMASI', value: "Kameri ayların başlangıçlarını belirlerken, 1978 yılında İstanbul’da yapılan Ruyet-i Hilal Konferansı Kararlarında alınan kriterler kullanılmaktadır. " +
        "Bu kriterlere göre hilal’in görülebilmesi için; İçtima'dan sonra Güneş ile Ayın açısal uzaklığı en az 8°, " + 
        "Güneşin batışı anında Ayın ufuk yüksekliğinin en az 5° olması esasa bağlanmış ve bu şartlara göre normalde hilalin çıplak gözle görülebileceği” ifade edilmiştir. " +
        "Ayrıca, “hilalin dünyanın herhangi bir yerinde görülmesiyle kameri ayın başladığına hükmetmenin doğru olacağı” karar altına alınmıştır. " + 
        "Ay yörünge hareketini yaparken bir an dünya ile güneş arasına girer ve dünya, ay, güneşin bir doğrultuda bulunmasına İçtima (Conjunction) denir. " + 
        "Bu anda ayın karanlık yüzü dünyaya dönük olduğundan dolayı dünyanın hiçbir yerinden görülemez. " + 
        "Yukarıda bahsedilen kriterler esas alınarak yapılan hesaplamalarla İçtima anının tarihi ve saati çok hassas olarak Greenwich saatine göre belirlenmektedir. " +
        "Bu bilgiler çizelgelerde Conjunction satırı ile verilmektedir. " + 
        "İçtima anından itibaren ayın koordinatları ile güneşin koordinatları kontrol edilerek ilk defa yukarıda belirtilen kriterleri yakaladığı an belirlenmektedir. " + 
        "Bu belirlenen an ise, yeryüzünde hilalin ilk defa insan gözü ile görülebileceği yer, tarih ve zaman bilgilerini vermektedir. " + 
        "Bu bilgiler First Visibility sütununda Ay ve Güneş ile ilgili bazı parametrelerle yeryüzünde ilk defa görülecek noktaların bilgileri verilmektedir. " + 
        "Bu ilk görülme anından sonraki değişimleri bulabilmek için 6’şar saat arayla Ay ve Güneşin koordinatlarından yararlanılarak " + 
        "yeryüzünün nerelerinden görülebileceğini belirleyecek koordinatlar hesaplanmış ve beş sütunda verilmiştir. " + 
        "Yapılan hesaplamalardan yararlanılarak yeryüzünden hilalin ilk defa nereden görülebileceğini belirlemek için dünya haritası üzerinde bulunan noktaların koordinatları işaretlenir. " +
        "İşaretlenen noktalar birleştirilerek haritada kırmızı çizgi ile gösterilen hat oluşturulmaktadır. " + 
        "Bu hattın içinde kalan ve sarı ile belirtilen yerlerde hava şartları müsait ise güneş battıktan sonra hilal insan gözü ile görülecek duruma gelmiş demektir. " + 
        "Hilalin görünürlük alanı, haritada gösterilen kırmızı hattın batıya doğru ilerleyişiyle zamana paralel olarak artacaktır. Kırmızı hattın dışında kalan kesimlerde ise hilalin o gün için insan gözü ile görülmesi mümkün değildir. " + 
        "Bu bölgelerde hilal ancak 2. gün görülebilmektedir. Haritanın içerisinde bulunan Güneş ve Hilal sembolleri; hilalin ilk göründüğü anda Güneş ve Ayın dünya üzerindeki konumlarını göstermektedir. Kameri ay başları haritasındaki; İçtima ve Ru’yetin tarih, saat ve dakikası Greenwich saatine göre yazılmıştır."} 
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