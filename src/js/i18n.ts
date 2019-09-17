import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import translationEN from "@locales/en_US/translations.json";
import translationRU from "@locales/ru_RU/translations.json";

const resources = {
    en_US: {
        translation: translationEN
    },
    ru_RU: {
        translation: translationRU
    }
};

export default i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ["htmlTag", "cookie", "path", "navigator"],
            lookupCookie: "PORTAL_LANGUAGE"
        },
        fallbackLng: "ru_RU",
        resources,
        ns: ["translations"],
        debug: false,
        load: "currentOnly",
        interpolation: {
            escapeValue: false // not needed for react!!
        },
        react: {
            wait: false,
            // @ts-ignore
            withRef: false,
            usePureComponent: true,
            bindI18n: false,
            bindStore: false,
            transKeepBasicHtmlNodesFor: ["br", "strong", "i"]
        }
    });
