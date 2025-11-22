import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import ScaledText from "./ScaledText";

export default function PeygamberlerTarihiPage({ onBack }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProphet, setSelectedProphet] = useState(null);

  const PROPHETS = [
    {
      name: "Hz. Âdem (a.s.)",
      period: "İlk insan ve ilk peygamber",
      summary:
        "İlk insan ve ilk peygamber olarak yaratıldı. Eşi Hz. Havva ile cennetten yeryüzüne indirildi. İnsanlığın başlangıcı, tövbenin kabulü ve Allah’a kulluğun temelini temsil eder.",
      detail:
        "Kur'an'da, Âdem'in çamurdan yaratıldığına, Allah'ın ona diğer varlıklara öğretmediği isim koymayı, manalarını bulmayı öğrettiğine inanılır. " +
        "Sonra bedenine ruh üflendiği bildirilir. Allah, meleklerin ona karşı secde etmesini emretti; fakat İblis kibrinden dolayı secde etmedi ve cennetten kovuldu. " +
        "Kur'an'da Hz. Âdem ile eşinin aynı nefstten yaratıldığı ifade edilir. Âdem ve Havva cennette Allah'ın kendilerine yaklaşmalarını yasakladığı ağaçtan, şeytanın vesvesesiyle meyve yerler. " +
        "Bunun üzerine cennetten yeryüzüne indirilirler. Cennet bahçesinin ahiretteki cennetle aynı olup olmadığı âlimler arasında tartışılmıştır. " +
        "Rivayetlere göre Âdem Serendip adasına (Sri Lanka), Havva ise Etiyopya’ya indirilir ve daha sonra Mekke'de Arafat'ta buluşurlar. " +
        "Hz. Âdem'in 1000 veya 2000 yıl yaşadığına dair bilgiler Kur'an'da geçmez; Yahudi rivayetlerinden gelen bu anlayış bazı hadisler aracılığıyla İslam kültürüne girmiştir. " +
        "Buhari ve Müslim gibi kaynaklarda Hz. Âdem'in boyunun 60 zira (yaklaşık 35–48 metre) olduğu rivayet edilir.",
    },
    {
      name: "Hz. İdris (a.s.)",
      period: "Nuh tufanından önce",
      summary:
        "Sabır, ilim ve hikmet sahibi bir peygamber olarak tanınır. Kalemle yazı yazan ilk kişi olduğu rivayet edilir. Kavmini doğruluğa davet etti.",
    },
    {
      name: "Hz. Nuh (a.s.)",
      period: "Tufan dönemi",
      summary:
        "Kavmini 950 yıl iman etmeye çağırdı. Büyük Tufan döneminde gemiyi yaptı. Sabır, tebliğ ve sebatın sembolüdür.",
    },
    {
      name: "Hz. Hûd (a.s.)",
      period: "Âd kavmi",
      summary:
        "Güç ve kibirle sapmış olan Âd kavmine gönderildi. Tevhidi anlattı fakat kavmi onu reddetti. Kavmi büyük bir rüzgâr felaketiyle helâk edildi.",
    },
    {
      name: "Hz. Sâlih (a.s.)",
      period: "Semûd kavmi",
      summary:
        "Semûd kavmine peygamber olarak gönderildi. Mucize olarak deve verildi; fakat kavmi inatla karşı çıktı. Kavmi büyük bir ses/depremle helâk oldu.",
    },
    {
      name: "Hz. İbrahim (a.s.)",
      period: "Mezopotamya - Filistin - Mekke",
      summary:
        "Tevhidin öncüsü ve 'halîlullah' olarak bilinir. Putperestliğe karşı mücadele etti. Hz. İsmail ve Hz. İshak’ın babasıdır. Kâbe’nin inşasında büyük rol oynadı.",
    },
    {
      name: "Hz. Lût (a.s.)",
      period: "Sodom ve Gomorra",
      summary:
        "Ahlaksızlıkta ileri gitmiş toplumunu uyardı. Kavmi uyarılara aldırmadı ve helâk edildi. Lût, Hz. İbrahim’in yeğenidir.",
    },
    {
      name: "Hz. İsmail (a.s.)",
      period: "Mekke",
      summary:
        "Kâbe’nin inşasında babası Hz. İbrahim’e yardım etti. Teslimiyetin sembolüdür. Arap soylu birçok kabilenin atası kabul edilir.",
    },
    {
      name: "Hz. İshak (a.s.)",
      period: "Filistin",
      summary:
        "Hz. İbrahim’in oğludur. Hem kendisi hem soyundan gelenler birçok peygamberin atasıdır (Yakup, Yusuf ve İsrailoğulları peygamberleri).",
    },
    {
      name: "Hz. Yakup (a.s.)",
      period: "Kenan bölgesi",
      summary:
        "İsrailoğullarının atasıdır. 12 oğlundan oluşan 'Beni İsrail' kabileleri onun soyundan gelir.",
    },
    {
      name: "Hz. Yusuf (a.s.)",
      period: "Mısır",
      summary:
        "Kuyuya atılması, köle olarak satılması, zindan yılları ve Mısır’da vezir oluşu sabrın ve iffetin örneğidir.",
    },
    {
      name: "Hz. Eyyûb (a.s.)",
      period: "Suriye civarı",
      summary:
        "Ağır hastalıklara ve kayıplara rağmen sabırda zirve bir peygamberdir. Sabrın sembolü olarak tanınır.",
    },
    {
      name: "Hz. Şuayb (a.s.)",
      period: "Medyan",
      summary:
        "Ticarette hile yapan, ölçü-tartıda bozan toplumunu uyardı. Adalet ve doğruluğu temel mesaj olarak sundu.",
    },
    {
      name: "Hz. Musa (a.s.)",
      period: "Mısır ve Sina",
      summary:
        "Firavun’a karşı tevhid mücadelesi verdi. Kızıldeniz’in yarılması mucizesiyle bilinir. Tevrat’ın verildiği peygamberdir.",
    },
    {
      name: "Hz. Harun (a.s.)",
      period: "Mısır",
      summary:
        "Hz. Musa’nın kardeşi ve yardımcısıdır. Firavun’a yapılan tebliğde Musa ile birlikte görev aldı.",
    },
    {
      name: "Hz. Dâvud (a.s.)",
      period: "Filistin",
      summary:
        "Zâhid bir kral ve peygamberdir. Zebur kendisine verilmiştir. Adaletli yönetimiyle tanınır.",
    },
    {
      name: "Hz. Süleyman (a.s.)",
      period: "Kudüs",
      summary:
        "Hem hükümdar hem peygamberdir. Cinlere, rüzgâra ve hayvanlara dair mucizevî yetkilerle sınanmıştır.",
    },
    {
      name: "Hz. İlyas (a.s.)",
      period: "Lübnan bölgesi",
      summary:
        "Putperestliğe sapmış toplumunu uyarmış, tebliğde sabır göstermiştir.",
    },
    {
      name: "Hz. Elyesa (a.s.)",
      period: "Şam bölgesi",
      summary:
        "Hz. İlyas’ın ardından gönderildi. Hastalara şifa vermesiyle bilinen mucizeleri rivayet edilir.",
    },
    {
      name: "Hz. Yunus (a.s.)",
      period: "Ninova / Musul",
      summary:
        "Balığın karnındaki teslimiyet duası ile meşhurdur. Kavmi tövbe ederek helâk olmaktan kurtulan tek topluluktur.",
    },
    {
      name: "Hz. Zekeriya (a.s.)",
      period: "Kudüs",
      summary:
        "Mabet hizmetinde görevliydi. İleri yaşta çocuk sahibi olma duası kabul oldu. Şehit edildiği rivayet edilir.",
    },
    {
      name: "Hz. Yahyâ (a.s.)",
      period: "Kudüs",
      summary:
        "Hz. İsa’nın müjdecisi ve teyzesinin oğludur. İffet, doğruluk ve takvada zirve bir peygamber olarak bilinir.",
    },
    {
      name: "Hz. İsa (a.s.)",
      period: "Filistin",
      summary:
        "Mucizevi bir şekilde babasız doğdu. İncil kendisine verildi. Tevhid mesajı ile gönderildi. Yahudiler tarafından reddedildi, Allah tarafından korunarak göğe yükseltildi.",
    },
    {
      name: "Hz. Muhammed (s.a.s.)",
      period: "Hicaz (Mekke – Medine)",
      summary:
        "Son peygamberdir. Kur’an kendisine indirildi. 23 yıllık nübüvvet boyunca tevhidi, adaleti ve merhameti anlattı. Alemlere rahmet olarak gönderildi.",
    },
  ];

  function openModal(p) {
    setSelectedProphet(p);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedProphet(null);
  }

  return (
    <View style={[styles.overlay, { justifyContent: "flex-start", paddingTop: 60, paddingHorizontal: 20 }]}>
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.peygTitle}>Peygamberler Tarihi</Text>
      <Text style={styles.peygSubtitle}>
        Kur’an’da adı geçen 25 peygamberin hayatlarından kısa özetler
      </Text>

      <ScrollView style={{ marginTop: 12, width: "100%" }}>
        {PROPHETS.map((p) => (
          <TouchableOpacity
            key={p.name}
            style={[styles.guideCard, styles.peygCard]}
            activeOpacity={0.8}
            onPress={() => openModal(p)}
          >
            <ScaledText baseSize={14} style={styles.peygName}>
              {p.name}
            </ScaledText>
            <ScaledText baseSize={14} style={styles.peygPeriod}>
              {p.period}
            </ScaledText>
            <ScaledText baseSize={14} style={styles.peygSummary}>
              {p.summary}
            </ScaledText>
          </TouchableOpacity>
        ))}

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* ===========================
            MODAL
          =========================== */}
      <Modal
        visible={modalVisible && !!selectedProphet}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProphet && (
              <ScrollView
                style={{ maxHeight: "75%", width: "100%" }}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                <Text style={styles.modalName}>{selectedProphet.name}</Text>
                <Text style={styles.modalPeriod}>{selectedProphet.period}</Text>

                <Text style={styles.modalBody}>
                  {selectedProphet.detail || selectedProphet.summary}
                </Text>
              </ScrollView>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <Text style={styles.closeBtnText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  peygTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  peygSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 12,
  },
  peygCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  peygName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffdd55",
    marginBottom: 4,
  },
  peygPeriod: {
    fontSize: 13,
    color: "#d0d7e2",
    marginBottom: 6,
    fontStyle: "italic",
  },
  peygSummary: {
    fontSize: 15,
    lineHeight: 22,
    color: "#f2f2f7",
  },
  guideCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
  },
  modalName: {
    color: "#ffdd55",
    fontSize: 20,
    marginBottom: 6,
    fontWeight: "700",
    textAlign: "center",
  },
  modalPeriod: {
    color: "#d0d7e2",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
    fontStyle: "italic",
  },
  modalBody: {
    color: "#f2f2f7",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "left",
  },
  closeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  closeBtnText: {
    color: "#ffdddd",
    fontSize: 15,
  },
});
