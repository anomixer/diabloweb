import React, { useState, useEffect } from 'react';
import i18n from '../i18n';
import './LanguageSelector.scss';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.getCurrentLanguage());
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleLanguageChange = (newLanguage) => {
      setCurrentLanguage(newLanguage);
    };
    
    i18n.addListener(handleLanguageChange);
    
    return () => {
      i18n.removeListener(handleLanguageChange);
    };
  }, []);

  const languages = i18n.getAvailableLanguages();
  const currentLangInfo = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    i18n.setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={i18n.t('ui.language')}
      >
        <span role="img" aria-label="Language">🌐</span> {currentLangInfo?.name}
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
