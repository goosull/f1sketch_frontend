// src/utils/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonEn from "../../public/locales/en/translation.json";
import commonKo from "../../public/locales/ko/translation.json";

i18n
  // 브라우저 언어 자동 감지
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: commonEn },
      ko: { common: commonKo },
    },
    // 명시적 초기 언어 대신 detector가 선택하게 함
    // lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "ko"],
    defaultNS: "common",
    ns: ["common"],

    // 감지 옵션 (필요에 맞게 order나 cache 조정)
    detection: {
      // 우선 순위: 쿼리스트링 → 쿠키 → localStorage → 브라우저 설정
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      // 감지된 언어를 cookie에 저장
      caches: ["cookie"],
    },

    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
