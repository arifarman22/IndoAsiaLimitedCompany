const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', placeholder: 'Select a language' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩', placeholder: 'একটি ভাষা নির্বাচন করুন' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳', placeholder: '选择语言' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', placeholder: 'भाषा चुनें' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', placeholder: 'زبان منتخب کریں' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', placeholder: '언어 선택' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', placeholder: 'اختر اللغة' },
  { code: 'es', name: 'Español', flag: '🇪🇸', placeholder: 'Seleccionar idioma' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', placeholder: 'Choisir la langue' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', placeholder: 'Sprache wählen' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', placeholder: '言語を選択' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', placeholder: 'Selecionar idioma' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', placeholder: 'Выберите язык' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', placeholder: 'เลือกภาษา' }
];

function getCurrentLanguage() {
  const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
  if (cookie) {
    const parts = cookie.split('/');
    return parts[2] || 'en';
  }
  return 'en';
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,bn,zh-CN,hi,ur,ko,ar,es,fr,de,ja,pt,ru,th',
    autoDisplay: false
  }, 'google_translate_element');
  
  setTimeout(() => {
    const select = document.querySelector('.goog-te-combo');
    if (!select) return;
    
    const currentLang = getCurrentLanguage();
    const currentLangData = languages.find(l => currentLang.includes(l.code)) || languages[0];
    
    select.options[0].textContent = currentLangData.placeholder;
    
    for (let i = 1; i < select.options.length; i++) {
      const option = select.options[i];
      const lang = languages.find(l => option.value.includes(l.code));
      if (lang) {
        option.textContent = `${lang.flag} ${lang.name}`;
      }
    }
  }, 1000);
}

(function() {
  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.head.appendChild(script);
})();
