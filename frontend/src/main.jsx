import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import './index.scss';
import App from './App';
import resources from './locales';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  }).catch((err) => {
    throw Error(`I18N: ${err.message}`);
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
