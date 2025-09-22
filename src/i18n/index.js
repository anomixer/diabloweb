import enTranslations from './en.json';
import zhTwTranslations from './zh-tw.json';
import zhCnTranslations from './zh-cn.json';
import jaTranslations from './ja.json';
import koTranslations from './ko.json';
// 新增的語言導入
import deTranslations from './de.json';
import esTranslations from './es.json';
import frTranslations from './fr.json';
import itTranslations from './it.json';
import ptTranslations from './pt.json';
import nlTranslations from './nl.json';
import svTranslations from './sv.json';
import ruTranslations from './ru.json';

const translations = {
  'en': enTranslations,
  'zh-tw': zhTwTranslations,
  'zh-cn': zhCnTranslations,
  'ja': jaTranslations,
  'ko': koTranslations,
  // 新增的語言
  'de': deTranslations,
  'es': esTranslations,
  'fr': frTranslations,
  'it': itTranslations,
  'pt': ptTranslations,
  'nl': nlTranslations,
  'sv': svTranslations,
  'ru': ruTranslations
};

class I18n {
  constructor() {
    this.currentLanguage = this.loadLanguage();
    this.listeners = [];
  }

  loadLanguage() {
    // 先檢查 localStorage
    const saved = localStorage.getItem('diablo-language');
    if (saved && translations[saved]) {
      return saved;
    }
    
    // 檢查瀏覽器語言
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    
    // 中文語言處理
    if (browserLang.startsWith('zh')) {
      if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
        return 'zh-tw';
      } else if (browserLang.includes('CN') || browserLang.includes('SG')) {
        return 'zh-cn';
      }
      // 預設為簡體中文
      return 'zh-cn';
    } 
    // 日韓語處理
    else if (browserLang.startsWith('ja')) {
      return 'ja';
    } else if (browserLang.startsWith('ko')) {
      return 'ko';
    }
    // 新增語言的自動檢測
    else if (browserLang.startsWith('de')) {
      return 'de';
    } else if (browserLang.startsWith('es')) {
      return 'es';
    } else if (browserLang.startsWith('fr')) {
      return 'fr';
    } else if (browserLang.startsWith('it')) {
      return 'it';
    } else if (browserLang.startsWith('pt')) {
      return 'pt';
    } else if (browserLang.startsWith('nl')) {
      return 'nl';
    } else if (browserLang.startsWith('sv')) {
      return 'sv';
    } else if (browserLang.startsWith('ru')) {
      return 'ru';
    }
    
    return 'en';
  }

  setLanguage(lang) {
    if (translations[lang] && this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      localStorage.setItem('diablo-language', lang);
      this.notifyListeners();
    }
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    return [
      { code: 'en', name: 'English' },
      { code: 'zh-tw', name: '繁體中文' },
      { code: 'zh-cn', name: '简体中文' },
      { code: 'ja', name: '日本語' },
      { code: 'ko', name: '한국어' },
      // 新增的語言選項
      { code: 'de', name: 'Deutsch' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'it', name: 'Italiano' },
      { code: 'pt', name: 'Português' },
      { code: 'nl', name: 'Nederlands' },
      { code: 'sv', name: 'Svenska' },
      { code: 'ru', name: 'Русский' }
    ];
  }

  t(key, params = {}) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    if (typeof value === 'string') {
      // Replace parameters in the string
      return value.replace(/\{(\w+)\}/g, (match, paramName) => {
        return params[paramName] || match;
      });
    }
    
    return key;
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLanguage));
  }
}

const i18n = new I18n();

export default i18n;
