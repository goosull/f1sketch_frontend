import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "../../public/locales/en/translation.json";
import commonKo from "../../public/locales/ko/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: commonEn },
    ko: { common: commonKo },
  },
  lng: "en", // 초기 언어
  fallbackLng: "en",
  supportedLngs: ["en", "ko"],
  defaultNS: "common", // 네임스페이스 지정
  ns: ["common"],
  interpolation: { escapeValue: false },
  react: { useSuspense: false }, // (SSR/Static 환경에서 쓸 땐 false)
});

export default i18n;
