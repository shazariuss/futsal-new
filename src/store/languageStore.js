import { create } from "zustand";

export const useLanguageStore = create((set, get) => ({
    language: "uz",
    setLanguage: (lang) => {
        set({ language: lang });
        localStorage.setItem("language", lang);
    },
    getTranslation: (obj, field = "name") => {
        const { language } = get();
        if (!obj) return "";
        return obj[`${field}_${language}`] || obj[field] || "";
    },
}));

// Load language from localStorage on app start
const savedLanguage = localStorage.getItem("language");
if (savedLanguage) {
    useLanguageStore.getState().setLanguage(savedLanguage);
}
