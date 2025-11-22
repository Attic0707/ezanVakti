import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Share,
} from "react-native";
import ScaledText from "./ScaledText";

const DEBUG = false;

const STORY_ITEMS = [
  {
    id: "s1",
    category: "sukran",
    title: "Şükür Anı",
    text: "Bugün aldığın her nefes, unuttuğun nice nimetin sessiz şükrüdür. 🕊️",
  },
  {
    id: "s2",
    category: "niyet",
    title: "Niyetini Tazele",
    text: "Küçük bir ameli büyük yapan, arkasındaki samimi niyettir.",
  },
  {
    id: "s3",
    category: "keder",
    title: "Keder ve Teslimiyet",
    text: "Kalbin kırıldığında bil ki Rabb’in seni daha yükseğe taşıyacak. 🌙",
  },
  {
    id: "s4",
    category: "motivasyon",
    title: "Devam Et",
    text: "Pes etmeyi düşündüğün an, duanın kabulüne en yakın olduğun an olabilir.",
  },
];

const CATEGORIES = [
  { key: "tum", label: "Tümü" },
  { key: "sukran", label: "Şükran" },
  { key: "niyet", label: "Niyet" },
  { key: "keder", label: "Keder" },
  { key: "sevgi", label: "Sevgi" },
  { key: "cuma", label: "Cuma" },
  { key: "stres", label: "Stres" },
  { key: "motivasyon", label: "Motivasyon" },
];

// Pinterest-style feed items
const FEED_ITEMS = [
  {
    id: "f1",
    category: "sukran",
    type: "ayet",
    title: "“Eğer şükrederseniz elbette size (nimetimi) artırırım.”",
    ref: "İbrahim 14/7",
    text: "Şükür, nimeti artıran bir dua gibidir. Her küçük nimeti fark etmek kalbi zenginleştirir.",
  },
  {
    id: "f2",
    category: "niyet",
    type: "hadis",
    title: "“Ameller niyetlere göredir...”",
    ref: "Buhârî, Bed’ü’l-vahy, 1",
    text: "Niyetini düzeltmek, hayatını düzeltmenin ilk adımıdır. Her işi Allah rızası için tazele.",
  },
  {
    id: "f3",
    category: "keder",
    type: "ayet",
    title: "“Şüphesiz zorlukla beraber bir kolaylık vardır.”",
    ref: "İnşirah 94/6",
    text: "Yaşadığın her sıkıntının içinde, henüz fark etmediğin bir rahmet saklı olabilir.",
  },
  {
    id: "f4",
    category: "sevgi",
    type: "hadis",
    title: "Allah için sevmek",
    ref: "Ebû Dâvûd, Sünne, 2",
    text: "Birini Allah için sevmek, kalbi dünya menfaatlerinden arındıran en güzel sevgidir.",
  },
  {
    id: "f5",
    category: "cuma",
    type: "söz",
    title: "Cuma bereketi",
    ref: "",
    text: "Cuma, haftanın kalbidir. Bir kalp gibi temizlenip tazelenmek için fırsattır.",
  },
  {
    id: "f6",
    category: "stres",
    type: "ayet",
    title: "“Kalpler ancak Allah’ı anmakla huzur bulur.”",
    ref: "Ra’d 13/28",
    text: "Stres arttığında, zikirle kalbi sakinleştirmek, ruh için derin bir nefes gibidir.",
  },
  {
    id: "f7",
    category: "motivasyon",
    type: "hadis",
    title: "Gücünün yettiği kadar",
    ref: "Buhârî, Îmân, 32",
    text: "Az ama sürekli yapılan amel, hem kalbi diri tutar hem de kulluğu istikrarlı kılar.",
  },
  {
    id: "f8",
    category: "motivasyon",
    type: "soz",
    title: "Düşüşler ve kalkışlar",
    ref: "",
    text: "Mühim olan hiç düşmemek değil; her düşüşten sonra, Rabbine daha da yakın kalkmaktır.",
  },
];

export default function IlhamPage({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("tum");

  // Story modal state
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [likedStories, setLikedStories] = useState({}); // {id: true/false}

  // Feed item modal state
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredFeed =
    activeCategory === "tum"
      ? FEED_ITEMS
      : FEED_ITEMS.filter((item) => item.category === activeCategory);

  const leftColumn = filteredFeed.filter((_, idx) => idx % 2 === 0);
  const rightColumn = filteredFeed.filter((_, idx) => idx % 2 === 1);

  function openStory(index) {
    setActiveStoryIndex(index);
    setStoryModalVisible(true);
  }

  function closeStory() {
    setStoryModalVisible(false);
  }

  function handleNextStory() {
    if (activeStoryIndex < STORY_ITEMS.length - 1) {
      setActiveStoryIndex((prev) => prev + 1);
    } else {
      // last story -> close
      setStoryModalVisible(false);
    }
  }

  function handlePrevStory() {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex((prev) => prev - 1);
    }
  }

  function toggleLikeCurrentStory() {
    const story = STORY_ITEMS[activeStoryIndex];
    setLikedStories((prev) => ({
      ...prev,
      [story.id]: !prev[story.id],
    }));
  }

  async function shareText(text, titlePrefix = "İlham") {
    try {
      await Share.share({
        message: `${titlePrefix}:\n\n${text}\n\n📱 İslam App ile paylaşıldı.`,
      });
    } catch (e) {
      if (DEBUG) console.log("Share error:", e);
    }
  }

  return (
    <View style={styles.overlay}>
      {/* Back button */}
      <TouchableOpacity
        onPress={onBack}
        style={{ alignSelf: "flex-start", marginBottom: 10 }}
      >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>← </Text>
      </TouchableOpacity>

      <Text style={styles.ilhamTitle}>İlham</Text>
      <Text style={styles.ilhamSubtitle}>
        Güzel dinimizi hakkıyla yaşayıp Allah&apos;ın rızasına layık olmaya
        çalışalım. İlham almak için bu sayfadaki içeriklere göz atın; gönlünüzce
        paylaşıp sevdiklerinizin de ilham almasına vesile olun.
      </Text>

      {/* TOP: Stories row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesRow}
        contentContainerStyle={{ paddingRight: 8 }}
      >
        {STORY_ITEMS.map((story, index) => {
          const liked = likedStories[story.id];
          return (
            <TouchableOpacity
              key={story.id}
              style={styles.storyCard}
              activeOpacity={0.8}
              onPress={() => openStory(index)}
            >
              <View style={styles.storyInner}>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text
                  numberOfLines={3}
                  style={styles.storyPreview}
                >
                  {story.text}
                </Text>
              </View>
              <View style={styles.storyFooterRow}>
                <Text style={[styles.storyLikeIcon, liked && styles.storyLikeIconActive]}>
                  ♥
                </Text>
                <Text style={styles.storyShareIcon}>↗</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* SECOND ROW: Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesRow}
        contentContainerStyle={{ paddingRight: 8 }}
      >
        {CATEGORIES.map((cat) => {
          const active = cat.key === activeCategory;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
              onPress={() => setActiveCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  active && styles.categoryChipTextActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* MAIN: Pinterest-style feed */}
      <ScrollView
        style={{ flex: 1, marginTop: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      >
        <View style={styles.feedColumn}>
          {leftColumn.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.feedCard}
              activeOpacity={0.9}
              onPress={() => setSelectedItem(item)}
            >
              <ScaledText baseSize={14} style={styles.feedType}>
                {item.type === "ayet"
                  ? "📖 Ayet"
                  : item.type === "hadis"
                  ? "📜 Hadis"
                  : "✨ Söz"}
              </ScaledText>
              <ScaledText baseSize={14} style={styles.feedTitle}>
                {item.title}
              </ScaledText>
              {item.ref ? (
                <ScaledText baseSize={12} style={styles.feedRef}>
                  {item.ref}
                </ScaledText>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.feedColumn}>
          {rightColumn.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.feedCard}
              activeOpacity={0.9}
              onPress={() => setSelectedItem(item)}
            >
              <ScaledText baseSize={14} style={styles.feedType}>
                {item.type === "ayet"
                  ? "📖 Ayet"
                  : item.type === "hadis"
                  ? "📜 Hadis"
                  : "✨ Söz"}
              </ScaledText>
              <ScaledText baseSize={14} style={styles.feedTitle}>
                {item.title}
              </ScaledText>
              {item.ref ? (
                <ScaledText baseSize={12} style={styles.feedRef}>
                  {item.ref}
                </ScaledText>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* STORY MODAL */}
      <Modal
        visible={storyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeStory}
      >
        <View style={styles.storyModalOverlay}>
          <View style={styles.storyModalCard}>
            {STORY_ITEMS[activeStoryIndex] && (
              <>
                <Text style={styles.storyModalCategory}>
                  {CATEGORIES.find(
                    (c) => c.key === STORY_ITEMS[activeStoryIndex].category
                  )?.label || "İlham"}
                </Text>
                <Text style={styles.storyModalTitle}>
                  {STORY_ITEMS[activeStoryIndex].title}
                </Text>
                <ScrollView
                  style={{ marginTop: 8 }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.storyModalText}>
                    {STORY_ITEMS[activeStoryIndex].text}
                  </Text>
                </ScrollView>

                <View style={styles.storyModalButtonsRow}>
                  <TouchableOpacity
                    onPress={toggleLikeCurrentStory}
                    style={styles.storyModalButton}
                  >
                    <Text style={styles.storyModalButtonText}>
                      {likedStories[STORY_ITEMS[activeStoryIndex].id]
                        ? "♥ Beğenildi"
                        : "♡ Beğen"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      shareText(
                        STORY_ITEMS[activeStoryIndex].text,
                        STORY_ITEMS[activeStoryIndex].title
                      )
                    }
                    style={styles.storyModalButton}
                  >
                    <Text style={styles.storyModalButtonText}>↗ Paylaş</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.storyModalFooterNav}>
                  <TouchableOpacity
                    onPress={handlePrevStory}
                    disabled={activeStoryIndex === 0}
                    style={[
                      styles.storyNavBtn,
                      activeStoryIndex === 0 && styles.storyNavBtnDisabled,
                    ]}
                  >
                    <Text style={styles.storyNavText}>Önceki</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={closeStory} style={styles.storyNavBtn}>
                    <Text style={styles.storyNavText}>Kapat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleNextStory}
                    style={styles.storyNavBtn}
                  >
                    <Text style={styles.storyNavText}>
                      {activeStoryIndex === STORY_ITEMS.length - 1
                        ? "Bitir"
                        : "Sonraki"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* FEED ITEM MODAL */}
      <Modal
        visible={!!selectedItem}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.itemModalOverlay}>
          <View style={styles.itemModalCard}>
            {selectedItem && (
              <>
                <Text style={styles.itemModalType}>
                  {selectedItem.type === "ayet"
                    ? "📖 Ayet"
                    : selectedItem.type === "hadis"
                    ? "📜 Hadis"
                    : "✨ İlham Verici Söz"}
                </Text>
                <Text style={styles.itemModalTitle}>{selectedItem.title}</Text>
                {selectedItem.ref ? (
                  <Text style={styles.itemModalRef}>{selectedItem.ref}</Text>
                ) : null}

                <ScrollView
                  style={{ marginTop: 8 }}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.itemModalText}>{selectedItem.text}</Text>
                </ScrollView>

                <View style={styles.itemModalButtonsRow}>
                  <TouchableOpacity
                    style={styles.itemModalButton}
                    onPress={() => setSelectedItem(null)}
                  >
                    <Text style={styles.itemModalButtonText}>Kapat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.itemModalButton}
                    onPress={() =>
                      shareText(
                        `${selectedItem.title}\n${selectedItem.ref || ""}\n\n${
                          selectedItem.text
                        }`,
                        "İlham"
                      )
                    }
                  >
                    <Text style={styles.itemModalButtonText}>↗ Paylaş</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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

  ilhamTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 6,
  },
  ilhamSubtitle: {
    fontSize: 14,
    color: "#d0d7e2",
    textAlign: "center",
    marginBottom: 10,
  },

  // Stories row
  storiesRow: {
    marginTop: 6,
    marginBottom: 8,
  },
  storyCard: {
    width: 110,
    height: 150,
    borderRadius: 18,
    marginRight: 8,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "space-between",
  },
  storyInner: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ffdd55",
    marginBottom: 4,
  },
  storyPreview: {
    fontSize: 11,
    color: "#f1f1f1",
  },
  storyFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  storyLikeIcon: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
  },
  storyLikeIconActive: {
    color: "#ff7a7a",
  },
  storyShareIcon: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },

  // Categories
  categoriesRow: {
    marginBottom: 4,
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    marginRight: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    height:50,
  },
  categoryChipActive: {
    backgroundColor: "#ffdd55",
    borderColor: "#ffdd55",
  },
  categoryChipText: {
    fontSize: 13,
    color: "#e0e6f0",
  },
  categoryChipTextActive: {
    color: "#333333",
    fontWeight: "600",
  },

  // Feed
  feedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
  },
  feedColumn: {
    flex: 1,
  },
  feedCard: {
    marginBottom: 10,
    marginRight: 4,
    marginLeft: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  feedType: {
    fontSize: 12,
    color: "#ffdd88",
    marginBottom: 4,
  },
  feedTitle: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  feedRef: {
    fontSize: 11,
    color: "#d0d7e2",
  },

  // Story modal
  storyModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  storyModalCard: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(10,10,15,0.96)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  storyModalCategory: {
    fontSize: 13,
    color: "#ffdd88",
    marginBottom: 4,
  },
  storyModalTitle: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 4,
  },
  storyModalText: {
    fontSize: 15,
    color: "#e5e5f0",
    lineHeight: 22,
  },
  storyModalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  storyModalButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  storyModalButtonText: {
    fontSize: 14,
    color: "#ffffff",
  },
  storyModalFooterNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  storyNavBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "center",
  },
  storyNavBtnDisabled: {
    opacity: 0.3,
  },
  storyNavText: {
    color: "#ffffff",
    fontSize: 13,
  },

  // Item modal
  itemModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  itemModalCard: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(10,10,15,0.96)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  itemModalType: {
    fontSize: 13,
    color: "#ffdd88",
    marginBottom: 4,
  },
  itemModalTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 4,
  },
  itemModalRef: {
    fontSize: 12,
    color: "#d0d7e2",
    marginBottom: 6,
  },
  itemModalText: {
    fontSize: 14,
    color: "#e5e5f0",
    lineHeight: 22,
  },
  itemModalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  itemModalButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  itemModalButtonText: {
    fontSize: 14,
    color: "#ffffff",
  },
});
