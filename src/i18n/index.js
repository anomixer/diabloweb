import enTranslations from './en.json';
import zhTwTranslations from './zh-tw.json';
import zhCnTranslations from './zh-cn.json';
import jaTranslations from './ja.json';
import koTranslations from './ko.json';

const translations = {
  'en': enTranslations,
  'zh-tw': zhTwTranslations,
  'zh-cn': zhCnTranslations,
  'ja': jaTranslations,
  'ko': koTranslations
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
    if (browserLang.startsWith('zh')) {
      if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
        return 'zh-tw';
      } else if (browserLang.includes('CN') || browserLang.includes('SG')) {
        return 'zh-cn';
      }
      // 預設為簡體中文
      return 'zh-cn';
    } else if (browserLang.startsWith('ja')) {
      return 'ja';
    } else if (browserLang.startsWith('ko')) {
      return 'ko';
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
      { code: 'ko', name: '한국어' }
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
