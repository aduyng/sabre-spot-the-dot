import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  nsSeparator: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        age: { label: "Age" },
        home: { label: "Home" },
        name: { label: "Name" }
      }
    },
    es: {
      translation: {
        age: { label: "Años" },
        home: { label: "Casa" },
        name: { label: "Nombre" }
      }
    }
  }
});

export default i18n;
