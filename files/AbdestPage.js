import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  Animated,
} from "react-native";
import ScaledText from "./ScaledText";

// 🔹 Placeholder — you will replace these with actual PNG paths later
const ABDEST_IMAGES = {
  3: [require("../assets/images/abdest/step3_1.png")],
  4: [require("../assets/images/abdest/step3_1.png")],
  5: [require("../assets/images/abdest/step3_1.png")],
  6: [require("../assets/images/abdest/step3_1.png")], 
  7: [require("../assets/images/abdest/step3_1.png")],
  8: [require("../assets/images/abdest/step3_1.png")],
  9: [require("../assets/images/abdest/step3_1.png")],
  10: [require("../assets/images/abdest/step3_1.png")],
};

export default function AbdestPage({ onBack }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const steps = [
    {
      title: "1. Niyet", 
      text: "“Niyet ettim Allah rızası için abdest almaya.” diye kalpten niyet edilir.",
    },
    {
      title: "2. Besmele",
      text: "“Bismillahirrahmânirrahîm” denir.",
    },
    {
      title: "3. Elleri yıkamak",
      text: "Eller bileklere kadar, parmak aralarıyla birlikte üçer kere yıkanır.",
      hasAnimation: true,
    },
    {
      title: "4. Ağıza su vermek",
      text: "Sağ elle ağıza su alınır, iyice çalkalanır ve üç kere yapılır.",
      hasAnimation: true,
    },
    {
      title: "5. Burna su vermek",
      text: "Sağ elle burna su çekilir, sol elle sümkürülerek üç kere temizlenir.",
      hasAnimation: true,
    },
    {
      title: "6. Yüzü yıkamak",
      text: "Alın saç diplerinden çene altına ve iki kulak yumuşağı arası olacak şekilde yüz üç kere yıkanır.",
      hasAnimation: true,
    },
    {
      title: "7. Kolları yıkamak",
      text: "Önce sağ kol, sonra sol kol dirseklerle birlikte üçer kere yıkanır.",
      hasAnimation: true,
    },
    {
      title: "8. Başın mesh edilmesi",
      text: "Eller ıslatılır, alından enseye, enseye kadar başın tamamı bir kere mesh edilir.",
      hasAnimation: true,
    },
    {
      title: "9. Kulakların mesh edilmesi",
      text: "Aynı ıslak elle kulak içi ve dışı bir kere mesh edilir.",
      hasAnimation: true,
    },
    {
      title: "10. Ayakların yıkanması",
      text: "Önce sağ ayak, sonra sol ayak topuklar da dâhil olmak üzere üçer kere yıkanır.",
      hasAnimation: true,
    },
    {
      title: "Abdestten sonra dua",
      text: "Eşhedü en lâ ilâhe illallah...",
    },
  ];

  function openStepModal(index) {
    setActiveStep(index);
    setModalVisible(true);
  }

  function playAnimation() {
    fadeAnim.setValue(0.2);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={[styles.overlay, { paddingTop: 60, paddingHorizontal: 20 }]}>
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.guideTitle}>Abdest Nasıl Alınır?</Text>
      <Text style={styles.guideSubtitle}>
        Farz ve sünnetleriyle kısaca abdestin sıralı adımları.
      </Text>

      <ScrollView style={{ marginTop: 10, width: "100%" }}>
        {steps.map((step, idx) => (
          <TouchableOpacity
            key={step.title}
            style={styles.guideCard}
            onPress={() => (step.hasAnimation ? openStepModal(idx + 1) : null)}
            activeOpacity={step.hasAnimation ? 0.7 : 1}
          >
            <ScaledText baseSize={14} style={styles.guideStepTitle}>
              {step.title}
            </ScaledText>
            <ScaledText baseSize={14} style={styles.guideStepText}>
              {step.text}
            </ScaledText>

            {step.hasAnimation && (
              <Text style={styles.tapHint}>▶ Animasyonu görmek için dokun</Text>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ===========================
            MODAL
          =========================== */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {steps[activeStep - 1]?.title}
            </Text>

            {/* Image (placeholder, glowing animation) */}
            <Animated.Image
              source={
                ABDEST_IMAGES[activeStep]?.[0] ??
                require("../assets/abdest/step3_1.png")
              }
              style={[styles.modalImage, { opacity: fadeAnim }]} 
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={playAnimation}
              style={styles.playBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.playBtnText}>▶ Animasyonu Oynat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  guideTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  guideSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 12,
  },
  guideCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
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
  },
  tapHint: {
    marginTop: 8,
    fontSize: 12,
    color: "#bbb",
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
  modalTitle: {
    color: "#ffdd55",
    fontSize: 18,
    marginBottom: 14,
    fontWeight: "600",
  },
  modalImage: {
    width: 240,
    height: 240,
    marginBottom: 20,
  },
  playBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
  },
  playBtnText: {
    color: "#fff",
  },
  closeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeBtnText: {
    color: "#ffdddd",
    fontSize: 15,
  },
});
