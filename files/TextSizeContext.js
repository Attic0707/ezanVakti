import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextSizeContext = createContext();

export function TextSizeProvider({ children }) {
  const [fontScale, setFontScale] = useState(1); // 1 = default

  useEffect(() => {
    loadScale();
  }, []);

  async function loadScale() {
    try {
      const saved = await AsyncStorage.getItem("global_font_scale");
      if (saved) {
        const parsed = parseFloat(saved);
        if (!Number.isNaN(parsed)) setFontScale(parsed);
      }
    } catch (e) {
      console.log("loadScale error", e);
    }
  }

  async function updateScale(newScale) {
    // clamp between 0.7x and 1.8x
    const clamped = Math.max(0.7, Math.min(2.5, newScale));
    setFontScale(clamped);
    try {
      await AsyncStorage.setItem("global_font_scale", String(clamped));
    } catch (e) {
      console.log("saveScale error", e);
    }
  }

  return (
    <TextSizeContext.Provider value={{ fontScale, updateScale }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}