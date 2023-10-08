import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import socket from './socket';
import resources from './locales/index';

const init = () => {
  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  socket.connect();
};

export default init;
