import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // JSON 파일 로딩
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next) // React 바인딩
  .init({
    supportedLngs: ["en", "ko"],
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // 번역 파일 경로 (public 폴더 기준)
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    interpolation: {
      escapeValue: false, // React가 이미 XSS 방어
    },

    react: {
      useSuspense: false, // Suspense 미사용 시
    },
  });

export default i18n;
