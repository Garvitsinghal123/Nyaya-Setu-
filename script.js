/* ==========================================================================
   KNOW YOUR POLICE RIGHTS — app logic
   Vanilla JS. No build step, no external runtime dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. UI STRINGS (chrome text, not situation content)
   * ------------------------------------------------------------------ */
  const UI = {
    en: {
      appTitle: "Nyaya Setu",
      appSubtitle: "Know Your Police Rights · India",
      emergencyLabel: "Tap to call",
      downloadAllBtn: "Download helpline card",
      heroEyebrow: "Situation → Your Rights → What To Do → Where To Complain",
      heroTitle: "Stay calm. Know exactly what the law gives you.",
      heroText: "Pick your situation below for plain-language rights, immediate steps, and real complaint contacts.",
      searchPlaceholder: "Search a situation — e.g. FIR, arrest, traffic, bribe",
      situationsHeading: "Choose your situation",
      noResults: "No matching situation. Try a different word, or call 112 if this is an emergency.",
      disclaimerText: "This app explains general rights under the Constitution of India and the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 for everyday awareness. It is not legal advice. Laws, procedures and helpline numbers can change or vary by state — for a specific case, please consult a lawyer or your nearest District Legal Services Authority (DLSA, helpline 15100).",
      footerText: "Made for citizens, not lawyers. Share this with someone who needs it.",
      footerMeta: "Reflects BNSS 2023 (in force from 1 July 2024) and the Constitution of India.",
      tagRights: "Your Rights",
      tagTodo: "What To Do",
      tagComplain: "Where To Complain",
      downloadCardBtn: "Download this rights card",
      cardOpenLabel: "Open situation:",
      resultsCount: (n) => `${n} of ${window.__TOTAL__}`,
      toastDownloaded: "Card downloaded",
      toastCalling: "Opening dialer…",
      langSwitchLabel: "Switch language to Hindi",
      langSwitchLabelBack: "Switch language to English",
      cardBrand: "NYAYA SETU · INDIA",
      cardRightsHeading: "YOUR RIGHTS",
      cardTodoHeading: "WHAT TO DO",
      cardHelplineHeading: "HELPLINES",
      cardFooter: "General awareness only — not legal advice.",
      masterCardTitle: "Emergency Helplines — India",
    },
    hi: {
      appTitle: "न्याय सेतु",
      appSubtitle: "अपने पुलिस अधिकार जानिए · भारत",
      emergencyLabel: "कॉल करने हेतु टैप करें",
      downloadAllBtn: "हेल्पलाइन कार्ड डाउनलोड करें",
      heroEyebrow: "स्थिति → आपके अधिकार → क्या करें → शिकायत कहाँ करें",
      heroTitle: "शांत रहें। जानें कि कानून आपको क्या अधिकार देता है।",
      heroText: "नीचे अपनी स्थिति चुनें और सरल भाषा में अपने अधिकार, तुरंत उठाए जाने वाले कदम और असली शिकायत संपर्क पाएँ — 30 सेकंड में समझ आने लायक बनाया गया है।",
      searchPlaceholder: "स्थिति खोजें — जैसे FIR, गिरफ्तारी, ट्रैफिक, रिश्वत",
      situationsHeading: "अपनी स्थिति चुनें",
      noResults: "कोई मिलती-जुलती स्थिति नहीं मिली। कोई और शब्द आज़माएँ, या आपातकाल में 112 पर कॉल करें।",
      disclaimerText: "यह ऐप भारत के संविधान और भारतीय नागरिक सुरक्षा संहिता (BNSS), 2023 के तहत सामान्य जागरूकता हेतु अधिकारों की जानकारी देता है। यह कानूनी सलाह नहीं है। कानून, प्रक्रियाएँ और हेल्पलाइन नंबर बदल सकते हैं या राज्य के अनुसार भिन्न हो सकते हैं — किसी विशेष मामले के लिए कृपया वकील या अपने नज़दीकी जिला विधिक सेवा प्राधिकरण (DLSA, हेल्पलाइन 15100) से संपर्क करें।",
      footerText: "नागरिकों के लिए बनाया गया, वकीलों के लिए नहीं। इसे किसी ज़रूरतमंद के साथ साझा करें।",
      footerMeta: "यह BNSS 2023 (1 जुलाई 2024 से लागू) और भारत के संविधान पर आधारित है।",
      tagRights: "आपके अधिकार",
      tagTodo: "क्या करें",
      tagComplain: "शिकायत कहाँ करें",
      downloadCardBtn: "यह अधिकार कार्ड डाउनलोड करें",
      cardOpenLabel: "स्थिति खोलें:",
      resultsCount: (n) => `${window.__TOTAL__} में से ${n}`,
      toastDownloaded: "कार्ड डाउनलोड हो गया",
      toastCalling: "डायलर खोला जा रहा है…",
      langSwitchLabel: "भाषा हिंदी में बदलें",
      langSwitchLabelBack: "भाषा अंग्रेज़ी में बदलें",
      cardBrand: "न्याय सेतु · भारत",
      cardRightsHeading: "आपके अधिकार",
      cardTodoHeading: "क्या करें",
      cardHelplineHeading: "हेल्पलाइन",
      cardFooter: "केवल सामान्य जानकारी — यह कानूनी सलाह नहीं है।",
      masterCardTitle: "आपातकालीन हेल्पलाइन — भारत",
    },
  };

  /* ------------------------------------------------------------------ *
   * 2. EMERGENCY HELPLINES
   * ------------------------------------------------------------------ */
  const HELPLINES = [
    { num: "112", label: { en: "All Emergency", hi: "सभी आपात सेवा" }, primary: true },
    { num: "100", label: { en: "Police", hi: "पुलिस" } },
    { num: "1091", label: { en: "Women Helpline", hi: "महिला हेल्पलाइन" } },
    { num: "181", label: { en: "Domestic Abuse", hi: "घरेलू हिंसा" } },
    { num: "1098", label: { en: "Child Helpline", hi: "चाइल्ड हेल्पलाइन" } },
    { num: "1930", label: { en: "Cyber Crime", hi: "साइबर अपराध" } },
    { num: "1064", label: { en: "Anti-Corruption*", hi: "भ्रष्टाचार विरोधी*" } },
    { num: "14433", label: { en: "Human Rights (NHRC)", hi: "मानवाधिकार (NHRC)" } },
  ];

  /* ------------------------------------------------------------------ *
   * 3. ICONS — small inline SVG path sets, keyed by id
   * ------------------------------------------------------------------ */
  const ICONS = {
    stop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
    arrest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M5 15c0 2 1 4 3 4s3-2 3-4M13 15c0 2 1 4 3 4s3-2 3-4"/><line x1="11" y1="9" x2="13" y2="9"/></svg>',
    fir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><line x1="9.5" y1="12" x2="15" y2="12"/><line x1="9.5" y1="15.5" x2="15" y2="15.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="19" y1="19" x2="15.2" y2="15.2"/><path d="M8 10.5h5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><line x1="9" y1="12" x2="15" y2="12"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 15c0 1 1 1.6 2.5 1.6s2.5-.7 2.5-1.7c0-2.3-5-1-5-3.3 0-1 1-1.7 2.5-1.7s2.5.6 2.5 1.6"/></svg>',
    woman: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><line x1="12" y1="11" x2="12" y2="19"/><line x1="8.5" y1="15.5" x2="15.5" y2="15.5"/></svg>',
    child: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="3"/><path d="M7 20v-5a5 5 0 0 1 10 0v5"/><line x1="9" y1="20" x2="9" y2="17"/><line x1="15" y1="20" x2="15" y2="17"/></svg>',
    cyber: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="11" rx="1.5"/><line x1="2" y1="20" x2="22" y2="20"/><path d="M9 20l1-3h4l1 3"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16V11l2.5-5h11L20 11v5"/><path d="M4 16h16"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5a2 2 0 0 1 4 0v5"/></svg>',
    complaint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/></svg>',
  };

  /* ------------------------------------------------------------------ *
   * 4. SITUATIONS — the core content
   * Each: id, icon, keywords (search), en{}, hi{}
   * en/hi shape: { title, when, rights[], steps[], contacts[{label,value,type}], law }
   * contact type: "call" (tel:), "web" (https), "text" (no link)
   * ------------------------------------------------------------------ */
  const SITUATIONS = [
    {
      id: "stop",
      icon: "stop",
      keywords: "stop question rukna poochna interrogate street check",
      en: {
        title: "Stopped or Questioned by Police",
        when: "An officer stops you on the street, in a vehicle, or asks you questions without arresting you.",
        rights: [
          "You may ask the officer's name, rank, and the reason you are being stopped.",
          "You are not under arrest unless the officer clearly states this and follows arrest procedure — being stopped is not the same as being arrested.",
          "You cannot be forced to go to a police station for questioning unless you are formally arrested.",
          "You do not have to answer questions beyond identifying yourself, except where a specific law requires it.",
        ],
        steps: [
          "Stay calm and polite — do not run, argue, or resist.",
          "Ask clearly: \"Am I being arrested, or am I free to go?\"",
          "Note the officer's name, badge/ID number, and the police station they belong to.",
          "If you feel unsafe, call a trusted person and share your live location.",
        ],
        contacts: [
          { label: "Local Police Station (SHO)", value: "Ask for station in-charge", type: "text" },
          { label: "State Human Rights Commission", value: "Search your state's SHRC", type: "text" },
          { label: "Emergency", value: "112", type: "call" },
        ],
        law: "Grounded in Article 21 of the Constitution (personal liberty) and the D.K. Basu v. State of West Bengal (1997) guidelines requiring officers to identify themselves.",
      },
      hi: {
        title: "पुलिस द्वारा रोका या पूछताछ",
        when: "कोई अधिकारी आपको सड़क पर, वाहन में रोकता है, या बिना गिरफ्तार किए सवाल पूछता है।",
        rights: [
          "आप अधिकारी का नाम, पद और रोकने का कारण पूछ सकते हैं।",
          "जब तक अधिकारी स्पष्ट रूप से न कहे और गिरफ्तारी की प्रक्रिया न अपनाए, आप गिरफ्तार नहीं हैं — रोका जाना गिरफ्तारी के समान नहीं है।",
          "औपचारिक गिरफ्तारी के बिना आपको पूछताछ के लिए थाने जाने को मजबूर नहीं किया जा सकता।",
          "अपनी पहचान बताने के अलावा, आपको किसी विशेष कानून की आवश्यकता न होने पर अन्य सवालों का जवाब देना ज़रूरी नहीं है।",
        ],
        steps: [
          "शांत और विनम्र रहें — भागें नहीं, बहस या प्रतिरोध न करें।",
          "स्पष्ट रूप से पूछें: \"क्या मुझे गिरफ्तार किया जा रहा है, या मैं जा सकता/सकती हूँ?\"",
          "अधिकारी का नाम, बैज/ID नंबर और थाने का नाम नोट करें।",
          "यदि असुरक्षित महसूस हो, तो किसी भरोसेमंद व्यक्ति को कॉल करें और अपनी लाइव लोकेशन साझा करें।",
        ],
        contacts: [
          { label: "स्थानीय थाना (SHO)", value: "थाना प्रभारी से पूछें", type: "text" },
          { label: "राज्य मानवाधिकार आयोग", value: "अपने राज्य का SHRC खोजें", type: "text" },
          { label: "आपातकाल", value: "112", type: "call" },
        ],
        law: "संविधान के अनुच्छेद 21 (व्यक्तिगत स्वतंत्रता) और डी.के. बासु बनाम पश्चिम बंगाल राज्य (1997) के दिशानिर्देशों पर आधारित, जो अधिकारियों को अपनी पहचान बताना अनिवार्य बनाते हैं।",
      },
    },
    {
      id: "arrest",
      icon: "arrest",
      keywords: "arrest detain custody lockup gिरफ्तार hirasat handcuff bail lawyer magistrate 24 hours",
      en: {
        title: "Arrested or Detained",
        when: "You, or someone you know, is being taken into police custody.",
        rights: [
          "Right to know the grounds for arrest immediately (Article 22(1); Section 47, BNSS).",
          "Right to have a friend or relative informed of the arrest and the place of custody (Section 36, BNSS; D.K. Basu guidelines).",
          "Right to consult and be defended by a lawyer of your choice; free legal aid if you cannot afford one (Section 341, BNSS).",
          "Right to be produced before a magistrate within 24 hours of arrest, excluding travel time (Article 22(2); Section 58, BNSS).",
          "Right to be informed about bail if the offence is bailable (Section 47(2), BNSS).",
          "The arresting officer must wear visible ID and prepare a signed arrest memo, witnessed by a family member or a respectable local resident.",
          "A woman generally cannot be arrested after sunset or before sunrise; in exceptional cases a woman police officer needs a magistrate's prior written permission (Section 43(5), BNSS).",
        ],
        steps: [
          "Calmly ask for the grounds of arrest and the officer's name and ID.",
          "Ask the police to inform your family or lawyer, or do it yourself if permitted.",
          "Do not sign any blank paper or document you do not fully understand.",
          "If injured, ask for a medical examination and request to see a lawyer before making any statement.",
          "Note the exact time, date, and place of arrest for your records.",
        ],
        contacts: [
          { label: "District Legal Services Authority (free legal aid)", value: "15100", type: "call" },
          { label: "High Court — Habeas Corpus (Art. 226)", value: "For illegal detention", type: "text" },
          { label: "National Human Rights Commission", value: "14433", type: "call" },
        ],
        law: "Constitution Art. 22(1)–(2); BNSS 2023 Sections 36, 43(5), 47, 58, 341; D.K. Basu v. State of West Bengal (1997).",
      },
      hi: {
        title: "गिरफ्तारी या हिरासत",
        when: "आपको या आपके किसी परिचित को पुलिस हिरासत में लिया जा रहा है।",
        rights: [
          "गिरफ्तारी का कारण तुरंत जानने का अधिकार (अनुच्छेद 22(1); धारा 47, BNSS)।",
          "किसी मित्र या रिश्तेदार को गिरफ्तारी और हिरासत के स्थान की सूचना दिलवाने का अधिकार (धारा 36, BNSS; डी.के. बासु दिशानिर्देश)।",
          "अपनी पसंद के वकील से सलाह लेने और बचाव करवाने का अधिकार; यदि सामर्थ्य न हो तो निःशुल्क कानूनी सहायता (धारा 341, BNSS)।",
          "गिरफ्तारी के 24 घंटे के भीतर (यात्रा समय छोड़कर) मजिस्ट्रेट के सामने पेश किए जाने का अधिकार (अनुच्छेद 22(2); धारा 58, BNSS)।",
          "यदि अपराध ज़मानती है, तो जमानत की जानकारी पाने का अधिकार (धारा 47(2), BNSS)।",
          "गिरफ्तार करने वाले अधिकारी को स्पष्ट पहचान पत्र पहनना होगा और परिवार के सदस्य या स्थानीय गवाह की उपस्थिति में हस्ताक्षरित गिरफ्तारी मेमो तैयार करना होगा।",
          "सामान्यतः किसी महिला को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता; असाधारण परिस्थितियों में महिला अधिकारी को मजिस्ट्रेट की पूर्व लिखित अनुमति लेनी होगी (धारा 43(5), BNSS)।",
        ],
        steps: [
          "शांति से गिरफ्तारी का कारण और अधिकारी का नाम व ID पूछें।",
          "पुलिस से अपने परिवार या वकील को सूचित करने को कहें, या अनुमति मिलने पर स्वयं करें।",
          "बिना समझे किसी भी खाली कागज़ या दस्तावेज़ पर हस्ताक्षर न करें।",
          "चोट लगी हो तो मेडिकल जांच की मांग करें और कोई भी बयान देने से पहले वकील से मिलने को कहें।",
          "गिरफ्तारी का सही समय, तारीख और स्थान नोट कर लें।",
        ],
        contacts: [
          { label: "जिला विधिक सेवा प्राधिकरण (निःशुल्क कानूनी सहायता)", value: "15100", type: "call" },
          { label: "उच्च न्यायालय — बंदी प्रत्यक्षीकरण (अनुच्छेद 226)", value: "अवैध हिरासत हेतु", type: "text" },
          { label: "राष्ट्रीय मानवाधिकार आयोग", value: "14433", type: "call" },
        ],
        law: "संविधान अनुच्छेद 22(1)–(2); BNSS 2023 धारा 36, 43(5), 47, 58, 341; डी.के. बासु बनाम पश्चिम बंगाल राज्य (1997)।",
      },
    },
    {
      id: "fir",
      icon: "fir",
      keywords: "fir refuse register complaint zero fir efir police station cognizable",
      en: {
        title: "Police Refuse to Register an FIR",
        when: "You want to report a cognizable crime (a serious offence where police can arrest without a warrant) and the station refuses to file it.",
        rights: [
          "Registering an FIR for a cognizable offence is mandatory, not discretionary (Section 173, BNSS; Lalita Kumari v. State of UP, 2014).",
          "You can report at any police station regardless of where the crime happened — it becomes a \"Zero FIR\" and is transferred to the right station (Section 173(1), BNSS).",
          "You can file an e-FIR online in many states; you must sign the record within 3 days for it to be formally registered.",
          "You are entitled to a free copy of the FIR once it is registered.",
        ],
        steps: [
          "Give your complaint in writing and keep a copy for yourself.",
          "Ask for a written acknowledgment or the FIR/entry number.",
          "If refused, send your complaint in writing by post to the Superintendent of Police (Section 173(4), BNSS).",
          "If still refused, apply directly to the Judicial Magistrate under Section 175(3), BNSS to direct registration and investigation.",
        ],
        contacts: [
          { label: "Superintendent of Police (district)", value: "Write in — Sec. 173(4) BNSS", type: "text" },
          { label: "Judicial Magistrate (Sec. 175(3) BNSS)", value: "Direct application", type: "text" },
          { label: "National/State Human Rights Commission", value: "14433", type: "call" },
        ],
        law: "BNSS 2023 Section 173 (registration, Zero FIR, e-FIR), Section 175(3) (Magistrate's power); Lalita Kumari v. Government of UP (2014).",
      },
      hi: {
        title: "पुलिस का FIR दर्ज करने से इनकार",
        when: "आप एक संज्ञेय अपराध (गंभीर अपराध जिसमें पुलिस बिना वारंट गिरफ्तार कर सकती है) की रिपोर्ट करना चाहते हैं और थाना FIR दर्ज करने से मना करता है।",
        rights: [
          "संज्ञेय अपराध के लिए FIR दर्ज करना अनिवार्य है, यह अधिकारी की मर्ज़ी पर निर्भर नहीं है (धारा 173, BNSS; ललिता कुमारी बनाम उत्तर प्रदेश राज्य, 2014)।",
          "अपराध चाहे कहीं भी हुआ हो, आप किसी भी थाने में रिपोर्ट कर सकते हैं — यह \"ज़ीरो FIR\" बनकर सही थाने भेजी जाती है (धारा 173(1), BNSS)।",
          "कई राज्यों में आप ऑनलाइन e-FIR दर्ज कर सकते हैं; औपचारिक पंजीकरण के लिए 3 दिनों के भीतर हस्ताक्षर करना ज़रूरी है।",
          "FIR दर्ज होने के बाद आपको इसकी निःशुल्क प्रति पाने का अधिकार है।",
        ],
        steps: [
          "अपनी शिकायत लिखित में दें और अपने पास एक प्रति रखें।",
          "लिखित पावती या FIR/एंट्री नंबर माँगें।",
          "इनकार होने पर, अपनी शिकायत लिखित रूप में डाक द्वारा पुलिस अधीक्षक को भेजें (धारा 173(4), BNSS)।",
          "फिर भी इनकार हो तो, धारा 175(3) BNSS के तहत सीधे न्यायिक मजिस्ट्रेट के पास आवेदन करें ताकि पंजीकरण व जांच का आदेश मिल सके।",
        ],
        contacts: [
          { label: "पुलिस अधीक्षक (जिला)", value: "लिखित आवेदन — धारा 173(4) BNSS", type: "text" },
          { label: "न्यायिक मजिस्ट्रेट (धारा 175(3) BNSS)", value: "सीधा आवेदन", type: "text" },
          { label: "राष्ट्रीय/राज्य मानवाधिकार आयोग", value: "14433", type: "call" },
        ],
        law: "BNSS 2023 धारा 173 (पंजीकरण, ज़ीरो FIR, e-FIR), धारा 175(3) (मजिस्ट्रेट की शक्ति); ललिता कुमारी बनाम उत्तर प्रदेश सरकार (2014)।",
      },
    },
    {
      id: "search",
      icon: "search",
      keywords: "search seizure warrant panchnama witness house property vehicle",
      en: {
        title: "Search or Seizure of Property",
        when: "Police want to search your person, vehicle, or home, or seize your belongings.",
        rights: [
          "Police generally need a warrant to search your home, except in specific urgent situations defined by law.",
          "You may ask to see the search warrant, if one has been issued.",
          "Searches should have at least two independent witnesses from the locality present (Section 103, BNSS).",
          "You or a family member has the right to be present throughout the search.",
          "A signed list of seized items (panchnama/seizure memo) must be prepared, and you are entitled to a copy (Section 103(6), BNSS).",
          "Searches and the seizure list must generally be video-recorded and sent to a magistrate (Section 105, BNSS).",
          "A woman can only be physically searched by another woman, with strict regard to decency.",
        ],
        steps: [
          "Ask for identification and, where applicable, the search warrant.",
          "Insist that independent witnesses are present before the search begins.",
          "Read the seizure list carefully before anyone signs it; note any discrepancy.",
          "Keep your copy of the panchnama/seizure memo safe.",
        ],
        contacts: [
          { label: "Superintendent of Police (district)", value: "Report irregular search", type: "text" },
          { label: "State Human Rights Commission", value: "Search your state's SHRC", type: "text" },
          { label: "Emergency", value: "112", type: "call" },
        ],
        law: "BNSS 2023 Sections 103, 105 (witnesses, seizure list, mandatory audio-video recording of search & seizure).",
      },
      hi: {
        title: "तलाशी या संपत्ति ज़ब्ती",
        when: "पुलिस आपकी, आपके वाहन या घर की तलाशी लेना चाहती है, या आपकी संपत्ति ज़ब्त करना चाहती है।",
        rights: [
          "आमतौर पर घर की तलाशी के लिए पुलिस को वारंट चाहिए, सिवाय कानून में तय कुछ आपातकालीन स्थितियों के।",
          "आप तलाशी वारंट (यदि जारी हुआ हो) देखने की माँग कर सकते हैं।",
          "तलाशी के समय स्थानीय क्षेत्र के कम से कम दो स्वतंत्र गवाह मौजूद होने चाहिए (धारा 103, BNSS)।",
          "आपको या परिवार के किसी सदस्य को पूरी तलाशी के दौरान उपस्थित रहने का अधिकार है।",
          "ज़ब्त की गई वस्तुओं की हस्ताक्षरित सूची (पंचनामा/ज़ब्ती मेमो) तैयार होनी चाहिए, और आपको इसकी एक प्रति पाने का अधिकार है (धारा 103(6), BNSS)।",
          "तलाशी और ज़ब्ती सूची की सामान्यतः वीडियो रिकॉर्डिंग होनी चाहिए और यह मजिस्ट्रेट को भेजी जानी चाहिए (धारा 105, BNSS)।",
          "किसी महिला की शारीरिक तलाशी केवल दूसरी महिला द्वारा, मर्यादा का पूरा ध्यान रखते हुए ली जा सकती है।",
        ],
        steps: [
          "पहचान पत्र और, यदि लागू हो, तलाशी वारंट दिखाने को कहें।",
          "तलाशी शुरू होने से पहले स्वतंत्र गवाहों की उपस्थिति पर ज़ोर दें।",
          "किसी के हस्ताक्षर करने से पहले ज़ब्ती सूची ध्यान से पढ़ें; किसी भी विसंगति को नोट करें।",
          "पंचनामा/ज़ब्ती मेमो की अपनी प्रति सुरक्षित रखें।",
        ],
        contacts: [
          { label: "पुलिस अधीक्षक (जिला)", value: "अनियमित तलाशी की शिकायत करें", type: "text" },
          { label: "राज्य मानवाधिकार आयोग", value: "अपने राज्य का SHRC खोजें", type: "text" },
          { label: "आपातकाल", value: "112", type: "call" },
        ],
        law: "BNSS 2023 धारा 103, 105 (गवाह, ज़ब्ती सूची, तलाशी व ज़ब्ती की अनिवार्य ऑडियो-वीडियो रिकॉर्डिंग)।",
      },
    },
    {
      id: "misconduct",
      icon: "shield",
      keywords: "threaten abuse assault custodial violence torture misconduct",
      en: {
        title: "Threats, Abuse, or Assault by Police",
        when: "An officer threatens, verbally abuses, or physically assaults you.",
        rights: [
          "Custodial violence and torture are strictly illegal — protected against under Article 21 and the D.K. Basu guidelines.",
          "You have the right to a medical examination to document any injuries.",
          "You have the right to file a complaint against the officer without fear of retaliation.",
          "You can seek compensation through the courts for proven custodial abuse.",
        ],
        steps: [
          "If it is safe, note the officer's name, badge/ID number, and the police station.",
          "Seek medical attention immediately and get a Medico-Legal Certificate (MLC) documenting injuries.",
          "Preserve evidence — photos, witness contacts, and note any CCTV in the area.",
          "File a written complaint with the Superintendent of Police, or approach the State Human Rights Commission if the station does not act.",
        ],
        contacts: [
          { label: "State/National Human Rights Commission", value: "14433", type: "call" },
          { label: "Superintendent of Police (departmental action)", value: "Written complaint", type: "text" },
          { label: "Emergency", value: "112", type: "call" },
        ],
        law: "Constitution Article 21; D.K. Basu v. State of West Bengal (1997) guidelines against custodial violence.",
      },
      hi: {
        title: "पुलिस द्वारा धमकी, दुर्व्यवहार या हमला",
        when: "कोई अधिकारी आपको धमकाता है, गाली-गलौज करता है, या शारीरिक रूप से हमला करता है।",
        rights: [
          "हिरासत में हिंसा और यातना पूरी तरह गैरकानूनी है — अनुच्छेद 21 और डी.के. बासु दिशानिर्देशों के तहत संरक्षित।",
          "किसी भी चोट को दर्ज कराने के लिए मेडिकल जांच का अधिकार।",
          "बिना किसी प्रतिशोध के डर के अधिकारी के विरुद्ध शिकायत दर्ज कराने का अधिकार।",
          "सिद्ध हिरासती दुर्व्यवहार के लिए अदालत से मुआवज़े की मांग करने का अधिकार।",
        ],
        steps: [
          "यदि सुरक्षित हो, तो अधिकारी का नाम, बैज/ID नंबर और थाना नोट करें।",
          "तुरंत चिकित्सा सहायता लें और चोटों को दर्ज करने के लिए मेडिको-लीगल सर्टिफिकेट (MLC) बनवाएं।",
          "सबूत सुरक्षित रखें — फोटो, गवाहों के संपर्क, और आस-पास की CCTV की जानकारी नोट करें।",
          "पुलिस अधीक्षक को लिखित शिकायत दें, या थाना कार्रवाई न करे तो राज्य मानवाधिकार आयोग से संपर्क करें।",
        ],
        contacts: [
          { label: "राज्य/राष्ट्रीय मानवाधिकार आयोग", value: "14433", type: "call" },
          { label: "पुलिस अधीक्षक (विभागीय कार्रवाई)", value: "लिखित शिकायत", type: "text" },
          { label: "आपातकाल", value: "112", type: "call" },
        ],
        law: "संविधान अनुच्छेद 21; डी.के. बासु बनाम पश्चिम बंगाल राज्य (1997) — हिरासती हिंसा के विरुद्ध दिशानिर्देश।",
      },
    },
    {
      id: "bribe",
      icon: "coin",
      keywords: "bribe corruption money challan spot fine gratification vigilance",
      en: {
        title: "A Police Officer Demands a Bribe",
        when: "An officer asks you for money or a favour to do their duty, avoid a fine, or drop a matter.",
        rights: [
          "Demanding or accepting a bribe by a public servant is a criminal offence under the Prevention of Corruption Act, 1988.",
          "You are not obligated to pay any \"on the spot\" cash fine directly to an officer — fines are paid via e-challan or in court.",
          "You can report corruption anonymously in most states.",
        ],
        steps: [
          "Politely decline and ask for an official receipt or e-challan instead.",
          "If it is safe to do so, note the time, place, and the officer's name/ID, or record the conversation.",
          "Report the demand to the State Anti-Corruption Bureau, or the Central Vigilance Commission for a central government/PSU employee.",
        ],
        contacts: [
          { label: "State Anti-Corruption Bureau (varies by state)", value: "1064*", type: "call" },
          { label: "Central Vigilance Commission (central staff/PSU)", value: "1800-11-0180", type: "call" },
          { label: "Report online", value: "cvc.gov.in / your state ACB site", type: "text" },
        ],
        law: "Prevention of Corruption Act, 1988. *1064 is used by several State Anti-Corruption Bureaus — check your state's exact number.",
      },
      hi: {
        title: "पुलिस अधिकारी द्वारा रिश्वत की मांग",
        when: "कोई अधिकारी अपना काम करने, जुर्माना टालने या मामला रफा-दफा करने के लिए पैसे या एहसान मांगता है।",
        rights: [
          "किसी सरकारी कर्मचारी द्वारा रिश्वत मांगना या लेना भ्रष्टाचार निवारण अधिनियम, 1988 के तहत आपराधिक अपराध है।",
          "आप अधिकारी को सीधे कोई \"तुरंत\" नकद जुर्माना देने के लिए बाध्य नहीं हैं — जुर्माना e-चालान द्वारा या अदालत में भरा जाता है।",
          "अधिकतर राज्यों में आप गुमनाम रूप से भ्रष्टाचार की शिकायत कर सकते हैं।",
        ],
        steps: [
          "विनम्रता से मना करें और इसके बजाय आधिकारिक रसीद या e-चालान मांगें।",
          "सुरक्षित हो तो समय, स्थान और अधिकारी का नाम/ID नोट करें, या बातचीत रिकॉर्ड करें।",
          "मांग की शिकायत राज्य भ्रष्टाचार निरोधक ब्यूरो में करें, या केंद्र सरकार/PSU कर्मचारी के लिए केंद्रीय सतर्कता आयोग में करें।",
        ],
        contacts: [
          { label: "राज्य भ्रष्टाचार निरोधक ब्यूरो (राज्य अनुसार भिन्न)", value: "1064*", type: "call" },
          { label: "केंद्रीय सतर्कता आयोग (केंद्रीय कर्मचारी/PSU)", value: "1800-11-0180", type: "call" },
          { label: "ऑनलाइन शिकायत", value: "cvc.gov.in / अपने राज्य की ACB वेबसाइट", type: "text" },
        ],
        law: "भ्रष्टाचार निवारण अधिनियम, 1988। *1064 कई राज्य भ्रष्टाचार निरोधक ब्यूरो द्वारा उपयोग किया जाता है — अपने राज्य का सही नंबर जांचें।",
      },
    },
    {
      id: "women",
      icon: "woman",
      keywords: "women safety female harassment night arrest statement rights mahila",
      en: {
        title: "Women's Safety & Rights with Police",
        when: "You are a woman interacting with police as a suspect, complainant, or witness.",
        rights: [
          "Cannot generally be arrested after sunset or before sunrise, except in exceptional cases with a magistrate's prior written permission obtained by a woman police officer (Section 43(5), BNSS).",
          "Can only be touched or arrested by a woman police officer, unless circumstances genuinely require otherwise.",
          "Cannot ordinarily be called to a police station for questioning — statements as a witness should be recorded at her residence, in the presence of a woman officer or family member (Section 179, BNSS).",
          "Can file a complaint, including a Zero FIR for sexual offences, at any police station regardless of jurisdiction.",
          "Entitled to free legal aid and the presence of a woman officer while recording statements in sexual-offence cases.",
        ],
        steps: [
          "Calmly assert your right to have a woman officer present.",
          "If being questioned only as a witness, ask that your statement be recorded at home.",
          "Ask for a support person (family member/lawyer) to be present wherever possible.",
          "Contact the Women Helpline for guidance and support during the process.",
        ],
        contacts: [
          { label: "Women Helpline", value: "1091", type: "call" },
          { label: "Domestic Abuse / Women Helpline", value: "181", type: "call" },
          { label: "National Commission for Women", value: "7827170170", type: "call" },
        ],
        law: "BNSS 2023 Sections 43(5), 179; Article 21 read with safeguards for women in custody.",
      },
      hi: {
        title: "महिलाओं की सुरक्षा और पुलिस के साथ अधिकार",
        when: "आप एक महिला के रूप में संदिग्ध, शिकायतकर्ता या गवाह के तौर पर पुलिस से संपर्क में हैं।",
        rights: [
          "सामान्यतः सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार नहीं किया जा सकता, सिवाय असाधारण मामलों के जहाँ महिला अधिकारी मजिस्ट्रेट की पूर्व लिखित अनुमति ले (धारा 43(5), BNSS)।",
          "केवल महिला पुलिस अधिकारी ही स्पर्श या गिरफ्तार कर सकती है, जब तक परिस्थितियाँ वास्तव में अन्यथा आवश्यक न बनाएं।",
          "आमतौर पर पूछताछ के लिए थाने नहीं बुलाया जा सकता — गवाह के रूप में बयान उसके घर पर, महिला अधिकारी या परिवार के सदस्य की उपस्थिति में दर्ज होना चाहिए (धारा 179, BNSS)।",
          "यौन अपराधों के लिए किसी भी थाने में, क्षेत्राधिकार की परवाह किए बिना, ज़ीरो FIR सहित शिकायत दर्ज कराई जा सकती है।",
          "यौन अपराध मामलों में निःशुल्क कानूनी सहायता और बयान दर्ज करते समय महिला अधिकारी की उपस्थिति का अधिकार।",
        ],
        steps: [
          "शांति से महिला अधिकारी की उपस्थिति का अधिकार जताएं।",
          "यदि केवल गवाह के रूप में पूछताछ हो रही है, तो बयान घर पर दर्ज करने के लिए कहें।",
          "जहाँ संभव हो, किसी सहयोगी व्यक्ति (परिवार सदस्य/वकील) की उपस्थिति की मांग करें।",
          "प्रक्रिया के दौरान मार्गदर्शन और सहायता के लिए महिला हेल्पलाइन से संपर्क करें।",
        ],
        contacts: [
          { label: "महिला हेल्पलाइन", value: "1091", type: "call" },
          { label: "घरेलू हिंसा / महिला हेल्पलाइन", value: "181", type: "call" },
          { label: "राष्ट्रीय महिला आयोग", value: "7827170170", type: "call" },
        ],
        law: "BNSS 2023 धारा 43(5), 179; अनुच्छेद 21 और हिरासत में महिलाओं की सुरक्षा से संबंधित प्रावधान।",
      },
    },
    {
      id: "minors",
      icon: "child",
      keywords: "minor child juvenile school student bachcha kids under 18",
      en: {
        title: "Minors (Children) & the Police",
        when: "A child under 18 is stopped, questioned, or taken into custody.",
        rights: [
          "Governed by the Juvenile Justice (Care and Protection of Children) Act, 2015 — a child is called a \"Child in Conflict with Law\" and is not treated as an adult accused.",
          "Cannot be handcuffed, and cannot be kept in a regular lock-up with adult accused persons.",
          "Must be produced before the Juvenile Justice Board (JJB) within 24 hours.",
          "Right to have parents or guardian informed immediately.",
          "A Child Welfare Police Officer or the local Child Welfare Committee should be involved in the process.",
        ],
        steps: [
          "Contact the child's parents/guardian and a lawyer immediately.",
          "Insist the child is not lodged with adult offenders and is handed to the Juvenile Justice Board, not a regular court.",
          "Call Childline for immediate, free support and guidance.",
          "Ask for the involvement of a Child Welfare Police Officer.",
        ],
        contacts: [
          { label: "Childline (24x7)", value: "1098", type: "call" },
          { label: "Juvenile Justice Board / Child Welfare Committee", value: "District office", type: "text" },
          { label: "National Commission for Protection of Child Rights", value: "ncpcr.gov.in", type: "web" },
        ],
        law: "Juvenile Justice (Care and Protection of Children) Act, 2015.",
      },
      hi: {
        title: "नाबालिग (बच्चे) और पुलिस",
        when: "18 वर्ष से कम उम्र के बच्चे को रोका, पूछताछ की जाती है, या हिरासत में लिया जाता है।",
        rights: [
          "किशोर न्याय (बच्चों की देखभाल और संरक्षण) अधिनियम, 2015 के तहत — बच्चे को \"कानून के संघर्ष में बालक\" कहा जाता है, वयस्क अभियुक्त की तरह व्यवहार नहीं किया जाता।",
          "हथकड़ी नहीं लगाई जा सकती, और वयस्क अभियुक्तों के साथ सामान्य लॉक-अप में नहीं रखा जा सकता।",
          "24 घंटे के भीतर किशोर न्याय बोर्ड (JJB) के सामने पेश करना ज़रूरी है।",
          "माता-पिता या अभिभावक को तुरंत सूचित करने का अधिकार।",
          "प्रक्रिया में बाल कल्याण पुलिस अधिकारी या स्थानीय बाल कल्याण समिति को शामिल होना चाहिए।",
        ],
        steps: [
          "तुरंत बच्चे के माता-पिता/अभिभावक और वकील से संपर्क करें।",
          "इस बात पर ज़ोर दें कि बच्चे को वयस्क अपराधियों के साथ न रखा जाए और उसे नियमित अदालत नहीं बल्कि किशोर न्याय बोर्ड के पास भेजा जाए।",
          "तुरंत निःशुल्क सहायता और मार्गदर्शन के लिए चाइल्डलाइन को कॉल करें।",
          "बाल कल्याण पुलिस अधिकारी को शामिल करने की मांग करें।",
        ],
        contacts: [
          { label: "चाइल्डलाइन (24x7)", value: "1098", type: "call" },
          { label: "किशोर न्याय बोर्ड / बाल कल्याण समिति", value: "जिला कार्यालय", type: "text" },
          { label: "राष्ट्रीय बाल अधिकार संरक्षण आयोग", value: "ncpcr.gov.in", type: "web" },
        ],
        law: "किशोर न्याय (बच्चों की देखभाल और संरक्षण) अधिनियम, 2015।",
      },
    },
    {
      id: "cyber",
      icon: "cyber",
      keywords: "cybercrime online fraud otp scam hacking stalking internet",
      en: {
        title: "Cybercrime & Online Fraud",
        when: "You are a victim of online fraud, hacking, an OTP scam, cyberstalking, or another online offence.",
        rights: [
          "You can file a complaint online without visiting a police station in person.",
          "For financial fraud, immediate reporting can help freeze the transaction within the \"golden hour.\"",
          "Anonymous reporting is available for categories like child sexual abuse material and certain cyberbullying complaints.",
        ],
        steps: [
          "Call 1930 immediately for financial fraud — this can trigger a bank transaction freeze.",
          "File a detailed complaint at cybercrime.gov.in with evidence (screenshots, transaction IDs, messages).",
          "Preserve all evidence — do not delete messages, emails, or transaction records.",
          "Inform your bank right away to block the card or account involved.",
        ],
        contacts: [
          { label: "National Cyber Crime Helpline", value: "1930", type: "call" },
          { label: "Report online", value: "cybercrime.gov.in", type: "web" },
          { label: "Nearest Cyber Crime Police Station", value: "Search by district", type: "text" },
        ],
        law: "Information Technology Act, 2000; complaints processed via the National Cyber Crime Reporting Portal.",
      },
      hi: {
        title: "साइबर अपराध और ऑनलाइन धोखाधड़ी",
        when: "आप ऑनलाइन धोखाधड़ी, हैकिंग, OTP स्कैम, साइबरस्टॉकिंग या किसी अन्य ऑनलाइन अपराध के शिकार हैं।",
        rights: [
          "आप बिना थाने जाए ऑनलाइन शिकायत दर्ज कर सकते हैं।",
          "वित्तीय धोखाधड़ी की स्थिति में, तुरंत रिपोर्ट करने से \"गोल्डन ऑवर\" के भीतर लेनदेन रोकने में मदद मिल सकती है।",
          "बाल यौन शोषण सामग्री और कुछ साइबरबुलिंग शिकायतों जैसी श्रेणियों के लिए गुमनाम रिपोर्टिंग उपलब्ध है।",
        ],
        steps: [
          "वित्तीय धोखाधड़ी में तुरंत 1930 पर कॉल करें — इससे बैंक लेनदेन रोका जा सकता है।",
          "cybercrime.gov.in पर सबूतों (स्क्रीनशॉट, लेनदेन ID, संदेश) के साथ विस्तृत शिकायत दर्ज करें।",
          "सभी सबूत सुरक्षित रखें — संदेश, ईमेल या लेनदेन रिकॉर्ड न मिटाएं।",
          "तुरंत अपने बैंक को सूचित करें ताकि संबंधित कार्ड या खाता ब्लॉक हो सके।",
        ],
        contacts: [
          { label: "राष्ट्रीय साइबर अपराध हेल्पलाइन", value: "1930", type: "call" },
          { label: "ऑनलाइन शिकायत", value: "cybercrime.gov.in", type: "web" },
          { label: "नज़दीकी साइबर अपराध थाना", value: "जिले के अनुसार खोजें", type: "text" },
        ],
        law: "सूचना प्रौद्योगिकी अधिनियम, 2000; शिकायतें राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल के माध्यम से संसाधित होती हैं।",
      },
    },
    {
      id: "traffic",
      icon: "car",
      keywords: "traffic challan license fine vehicle driving digilocker mparivahan",
      en: {
        title: "Traffic Stops & Challans",
        when: "You are stopped by traffic police for a document check or an alleged violation.",
        rights: [
          "Only a police officer in uniform (or one who identifies themselves) can ask you to produce documents (Section 130(1), Motor Vehicles Act, 1988).",
          "Digital documents (DL, RC, insurance, PUC) shown via DigiLocker or mParivahan are legally valid — you are not required to carry physical copies (MoRTH advisory, 2018).",
          "In most cases, only an officer of Sub-Inspector rank or above can impose an on-the-spot fine or seize a driving licence.",
          "An officer cannot seize your vehicle keys or forcibly remove you from the vehicle to pressure a bribe.",
          "E-challans are the standard mode of penalty, and you are entitled to a receipt for any fine paid.",
        ],
        steps: [
          "Politely show your documents, physical or via DigiLocker/mParivahan.",
          "Ask for the officer's name and ID if something feels wrong.",
          "Always ask for an official receipt or e-challan for any fine — never pay unrecorded cash.",
          "If your vehicle or documents are seized, ask for a written seizure memo.",
        ],
        contacts: [
          { label: "Traffic Police Control Room", value: "1095 (varies by city)", type: "call" },
          { label: "Grievance portal", value: "parivahan.gov.in", type: "web" },
          { label: "State Anti-Corruption Bureau (for bribe demands)", value: "1064*", type: "call" },
        ],
        law: "Motor Vehicles Act, 1988 (as amended 2019), Section 130(1); MoRTH advisory (2018) on DigiLocker/mParivahan validity.",
      },
      hi: {
        title: "ट्रैफिक चेकिंग और चालान",
        when: "ट्रैफिक पुलिस आपको दस्तावेज़ जांच या किसी कथित उल्लंघन के लिए रोकती है।",
        rights: [
          "केवल वर्दी में मौजूद (या स्वयं की पहचान बताने वाला) पुलिस अधिकारी ही आपसे दस्तावेज़ दिखाने को कह सकता है (धारा 130(1), मोटर वाहन अधिनियम, 1988)।",
          "DigiLocker या mParivahan के ज़रिए दिखाए गए डिजिटल दस्तावेज़ (DL, RC, बीमा, PUC) कानूनी रूप से मान्य हैं — भौतिक प्रति साथ रखना ज़रूरी नहीं (MoRTH परामर्श, 2018)।",
          "अधिकतर मामलों में केवल सब-इंस्पेक्टर या उससे ऊपर के रैंक का अधिकारी ही तुरंत जुर्माना लगा सकता है या ड्राइविंग लाइसेंस ज़ब्त कर सकता है।",
          "कोई अधिकारी रिश्वत के दबाव के लिए आपकी गाड़ी की चाबियाँ नहीं ले सकता या आपको ज़बरदस्ती वाहन से बाहर नहीं निकाल सकता।",
          "e-चालान जुर्माने का मानक तरीका है, और भुगतान की गई किसी भी राशि की रसीद पाने का आपको अधिकार है।",
        ],
        steps: [
          "विनम्रता से अपने दस्तावेज़ दिखाएं, चाहे भौतिक हों या DigiLocker/mParivahan के माध्यम से।",
          "कुछ गलत लगे तो अधिकारी का नाम और ID पूछें।",
          "किसी भी जुर्माने के लिए हमेशा आधिकारिक रसीद या e-चालान मांगें — कभी भी बिना रिकॉर्ड नकद न दें।",
          "यदि वाहन या दस्तावेज़ ज़ब्त हों, तो लिखित ज़ब्ती मेमो मांगें।",
        ],
        contacts: [
          { label: "ट्रैफिक पुलिस कंट्रोल रूम", value: "1095 (शहर अनुसार भिन्न)", type: "call" },
          { label: "शिकायत पोर्टल", value: "parivahan.gov.in", type: "web" },
          { label: "राज्य भ्रष्टाचार निरोधक ब्यूरो (रिश्वत की मांग हेतु)", value: "1064*", type: "call" },
        ],
        law: "मोटर वाहन अधिनियम, 1988 (संशोधित 2019), धारा 130(1); DigiLocker/mParivahan वैधता पर MoRTH परामर्श (2018)।",
      },
    },
    {
      id: "domestic",
      icon: "home",
      keywords: "domestic violence abuse spouse husband wife family protection order pwdva",
      en: {
        title: "Domestic Violence",
        when: "You are facing physical, emotional, verbal, sexual, or economic abuse from a spouse, partner, or family member.",
        rights: [
          "Protected under the Protection of Women from Domestic Violence Act, 2005 (PWDVA) — a civil law offering fast protection, independent of any criminal case.",
          "Right to reside in the shared household, even without ownership or tenancy in your name.",
          "Right to seek a Protection Order, Residence Order, and Monetary Relief from a Magistrate.",
          "Right to free assistance from a Protection Officer to file a Domestic Incident Report (DIR).",
          "Domestic violence involving injury can also be reported to police as a criminal offence, alongside the civil PWDVA remedy.",
        ],
        steps: [
          "If in immediate danger, call 112 or go to the nearest police station right away.",
          "Call the Women Helpline (181 or 1091) for guidance and safe-shelter support.",
          "Approach a Protection Officer (via the district Women & Child Development office) to file a Domestic Incident Report.",
          "Preserve evidence: photos of injuries, medical records, and messages.",
        ],
        contacts: [
          { label: "Domestic Abuse / Women Helpline", value: "181", type: "call" },
          { label: "Women Helpline", value: "1091", type: "call" },
          { label: "National Commission for Women", value: "7827170170", type: "call" },
        ],
        law: "Protection of Women from Domestic Violence Act, 2005 (PWDVA).",
      },
      hi: {
        title: "घरेलू हिंसा",
        when: "आप पति/पत्नी, साथी, या परिवार के किसी सदस्य द्वारा शारीरिक, भावनात्मक, मौखिक, यौन या आर्थिक हिंसा का सामना कर रहे/रही हैं।",
        rights: [
          "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 (PWDVA) के तहत संरक्षित — यह एक सिविल कानून है जो किसी आपराधिक मामले से अलग तेज़ सुरक्षा देता है।",
          "साझा घर में रहने का अधिकार, भले ही आपके नाम पर स्वामित्व या किराएदारी न हो।",
          "मजिस्ट्रेट से संरक्षण आदेश, निवास आदेश और आर्थिक राहत मांगने का अधिकार।",
          "घरेलू घटना रिपोर्ट (DIR) दर्ज कराने के लिए संरक्षण अधिकारी से निःशुल्क सहायता पाने का अधिकार।",
          "चोट से जुड़ी घरेलू हिंसा को सिविल PWDVA उपाय के साथ-साथ आपराधिक अपराध के रूप में भी पुलिस में रिपोर्ट किया जा सकता है।",
        ],
        steps: [
          "यदि तत्काल खतरा हो, तो 112 पर कॉल करें या तुरंत नज़दीकी थाने जाएं।",
          "मार्गदर्शन और सुरक्षित आश्रय सहायता के लिए महिला हेल्पलाइन (181 या 1091) पर कॉल करें।",
          "घरेलू घटना रिपोर्ट (DIR) दर्ज कराने के लिए (जिला महिला व बाल विकास कार्यालय के माध्यम से) संरक्षण अधिकारी से संपर्क करें।",
          "सबूत सुरक्षित रखें: चोटों की तस्वीरें, मेडिकल रिकॉर्ड, और संदेश।",
        ],
        contacts: [
          { label: "घरेलू हिंसा / महिला हेल्पलाइन", value: "181", type: "call" },
          { label: "महिला हेल्पलाइन", value: "1091", type: "call" },
          { label: "राष्ट्रीय महिला आयोग", value: "7827170170", type: "call" },
        ],
        law: "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 (PWDVA)।",
      },
    },
  ];

  window.__TOTAL__ = SITUATIONS.length;

  /* ------------------------------------------------------------------ *
   * 5. STATE
   * ------------------------------------------------------------------ */
  let lang = localStorage.getItem("kypr_lang") || "en";
  let lastFocused = null;

  /* ------------------------------------------------------------------ *
   * 6. DOM REFS
   * ------------------------------------------------------------------ */
  const $ = (sel) => document.querySelector(sel);
  const html = document.documentElement;
  const langToggle = $("#langToggle");
  const searchInput = $("#searchInput");
  const searchCount = $("#searchCount");
  const grid = $("#situationGrid");
  const noResults = $("#noResults");
  const emergencyChips = $("#emergencyChips");
  const emergencyViewport = $("#emergencyViewport");
  const panel = $("#detailPanel");
  const panelOverlay = $("#panelOverlay");
  const panelClose = $("#panelClose");
  const toastEl = $("#toast");

  /* ------------------------------------------------------------------ *
   * 7. RENDER: static i18n text nodes
   * ------------------------------------------------------------------ */
  function applyStaticI18n() {
    const t = UI[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
    });
    document.title = lang === "hi"
      ? "न्याय सेतु | Nyaya Setu"
      : "Nyaya Setu | न्याय सेतु";
  }

  /* ------------------------------------------------------------------ *
   * 8. RENDER: chakra spokes (decorative, generated once)
   * ------------------------------------------------------------------ */
  function drawSpokes(groupSel, cx, cy, r1, r2, count) {
    document.querySelectorAll(groupSel).forEach((g) => {
      let markup = "";
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const x1 = cx + r1 * Math.cos(a);
        const y1 = cy + r1 * Math.sin(a);
        const x2 = cx + r2 * Math.cos(a);
        const y2 = cy + r2 * Math.sin(a);
        markup += `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;
      }
      g.innerHTML = markup;
    });
  }

  /* ------------------------------------------------------------------ *
   * 9. RENDER: emergency chips (duplicated for a seamless marquee loop)
   * ------------------------------------------------------------------ */
  function chipMarkup(isDuplicate) {
    return HELPLINES.map((h) => `
      <a class="call-chip${h.primary ? " primary" : ""}" href="tel:${h.num}" role="listitem" data-num="${h.num}"
         ${isDuplicate ? 'aria-hidden="true" tabindex="-1"' : ""}>
        <svg class="call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2C9.5 22 2 14.5 2 6a2 2 0 0 1 2-2z"/></svg>
        <span class="num">${h.num}</span>
        <span class="lbl">${h.label[lang]}</span>
      </a>
    `).join("");
  }

  function renderEmergencyChips() {
    // Render the chip set twice back-to-back: the CSS animation moves the
    // track exactly -50% and loops, which reads as one continuous, seamless
    // right-to-left scroll rather than a jump-cut reset.
    emergencyChips.innerHTML = chipMarkup(false) + chipMarkup(true);
    requestAnimationFrame(sizeMarquee);
  }

  /* ------------------------------------------------------------------ *
   * 9b. MARQUEE ENGINE
   * Constant on-screen speed (px/sec) regardless of language/content width,
   * plus a 10s-scroll / 2-minute-break cycle, plus pause-on-touch so the
   * chips are always easy to tap accurately.
   * ------------------------------------------------------------------ */
  const MARQUEE_SPEED_PX_S = 70;   // constant scroll speed
  const MARQUEE_SCROLL_MS = 10000; // move for 10 seconds
  const MARQUEE_BREAK_MS = 10000; // then rest for 2 minutes

  let marqueePhaseRunning = false; // true while in the "scrolling" 10s phase
  let marqueeUserPaused = false;   // true while a finger/pointer is on the strip
  let marqueeCycleTimer = null;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function sizeMarquee() {
    // Track holds two copies of the content — half its scroll width is one
    // full set, i.e. the true loop distance. Duration = distance / speed,
    // so the visual speed stays constant whether the label text is English
    // or the (typically wider) Hindi strings.
    const distance = emergencyChips.scrollWidth / 2;
    const duration = Math.max(distance / MARQUEE_SPEED_PX_S, 6);
    emergencyChips.style.animationDuration = duration.toFixed(2) + "s";
  }

  function applyMarqueeVisualState() {
    const shouldRun = marqueePhaseRunning && !marqueeUserPaused && !prefersReducedMotion.matches;
    emergencyChips.style.animationPlayState = shouldRun ? "running" : "paused";
  }

  function startMarqueeCycle() {
    clearTimeout(marqueeCycleTimer);
    if (prefersReducedMotion.matches) {
      marqueePhaseRunning = false;
      applyMarqueeVisualState();
      return;
    }
    const scrollPhase = () => {
      marqueePhaseRunning = true;
      applyMarqueeVisualState();
      marqueeCycleTimer = setTimeout(breakPhase, MARQUEE_SCROLL_MS);
    };
    const breakPhase = () => {
      marqueePhaseRunning = false;
      applyMarqueeVisualState();
      marqueeCycleTimer = setTimeout(scrollPhase, MARQUEE_BREAK_MS);
    };
    scrollPhase();
  }

  function pauseMarqueeForInteraction() {
    marqueeUserPaused = true;
    applyMarqueeVisualState();
  }
  function resumeMarqueeAfterInteraction() {
    marqueeUserPaused = false;
    applyMarqueeVisualState();
  }

  ["mouseenter", "focusin", "touchstart"].forEach((evt) => {
    emergencyViewport.addEventListener(evt, pauseMarqueeForInteraction, { passive: true });
  });
  ["mouseleave", "focusout", "touchend", "touchcancel"].forEach((evt) => {
    emergencyViewport.addEventListener(evt, resumeMarqueeAfterInteraction, { passive: true });
  });
  prefersReducedMotion.addEventListener?.("change", startMarqueeCycle);
  window.addEventListener("resize", () => requestAnimationFrame(sizeMarquee));

  /* ------------------------------------------------------------------ *
   * 10. RENDER: situation grid (with optional filter)
   * ------------------------------------------------------------------ */
  function matchesQuery(situation, q) {
    if (!q) return true;
    const hay = [
      situation[lang].title,
      situation[lang].when,
      situation.keywords,
      situation.en.title,
      situation.hi.title,
    ].join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function renderGrid(query) {
    const items = SITUATIONS.filter((s) => matchesQuery(s, query));
    grid.innerHTML = items.map((s, i) => `
      <button type="button" class="situation-card" data-id="${s.id}" role="listitem" style="animation-delay:${Math.min(i * 45, 400)}ms" aria-label="${UI[lang].cardOpenLabel} ${s[lang].title}">
        <div class="card-top">
          <span class="card-icon">${ICONS[s.icon]}</span>
          <span class="card-num">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <span class="card-title">${s[lang].title}</span>
        <span class="card-when">${s[lang].when}</span>
        <span class="card-cta">
          ${lang === "hi" ? "विवरण देखें" : "View details"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </span>
      </button>
    `).join("");

    noResults.hidden = items.length !== 0;
    searchCount.textContent = query ? UI[lang].resultsCount(items.length) : "";

    grid.querySelectorAll(".situation-card").forEach((card) => {
      card.addEventListener("click", () => openPanel(card.getAttribute("data-id")));
    });
  }

  /* ------------------------------------------------------------------ *
   * 11. PANEL: open / close / populate
   * ------------------------------------------------------------------ */
  let currentSituationId = null;

  function openPanel(id) {
    const s = SITUATIONS.find((x) => x.id === id);
    if (!s) return;
    currentSituationId = id;
    const c = s[lang];

    $("#panelIcon").innerHTML = ICONS[s.icon];
    $("#panelKicker").textContent = lang === "hi" ? "स्थिति" : "Situation";
    $("#panelTitle").textContent = c.title;
    $("#panelWhen").textContent = c.when;
    $("#panelRights").innerHTML = c.rights.map((r) => `<li>${r}</li>`).join("");
    $("#panelSteps").innerHTML = c.steps.map((r) => `<li>${r}</li>`).join("");
    $("#panelContacts").innerHTML = c.contacts.map((ct) => {
      if (ct.type === "call") {
        return `<a class="contact-item" href="tel:${ct.value.replace(/[^0-9]/g, "")}">
          <span class="c-label">${ct.label}</span><span class="c-value">${ct.value} ↗</span>
        </a>`;
      }
      if (ct.type === "web") {
        const url = ct.value.startsWith("http") ? ct.value : `https://${ct.value}`;
        return `<a class="contact-item is-link" href="${url}" target="_blank" rel="noopener">
          <span class="c-label">${ct.label}</span><span class="c-value">${ct.value} ↗</span>
        </a>`;
      }
      return `<div class="contact-item">
        <span class="c-label">${ct.label}</span><span class="c-value">${ct.value}</span>
      </div>`;
    }).join("");
    $("#panelLaw").textContent = c.law;

    lastFocused = document.activeElement;
    panel.classList.add("open");
    panelOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => panel.focus());
  }

  function closePanel() {
    panel.classList.remove("open");
    panelOverlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  panelClose.addEventListener("click", closePanel);
  panelOverlay.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
  });

  /* ------------------------------------------------------------------ *
   * 12. LANGUAGE TOGGLE
   * ------------------------------------------------------------------ */
  function setLang(next) {
    lang = next;
    localStorage.setItem("kypr_lang", lang);
    html.setAttribute("lang", lang);
    html.setAttribute("data-lang", lang);
    langToggle.setAttribute("aria-checked", String(lang === "hi"));
    langToggle.setAttribute("aria-label", lang === "hi" ? UI.en.langSwitchLabelBack : UI.en.langSwitchLabel);
    applyStaticI18n();
    renderEmergencyChips();
    renderGrid(searchInput.value.trim());
    if (currentSituationId && panel.classList.contains("open")) openPanel(currentSituationId);
  }

  langToggle.addEventListener("click", () => setLang(lang === "en" ? "hi" : "en"));

  /* ------------------------------------------------------------------ *
   * 13. SEARCH
   * ------------------------------------------------------------------ */
  let searchTimer = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderGrid(searchInput.value.trim()), 120);
  });

  /* ------------------------------------------------------------------ *
   * 14. TOAST
   * ------------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ------------------------------------------------------------------ *
   * 15. CANVAS RIGHTS-CARD DOWNLOAD
   * ------------------------------------------------------------------ */
  const canvas = $("#cardCanvas");
  const ctx = canvas.getContext("2d");

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let curY = y;
    let lines = 0;
    for (let n = 0; n < words.length; n++) {
      const test = line + words[n] + " ";
      if (context.measureText(test).width > maxWidth && n > 0) {
        context.fillText(line.trim(), x, curY);
        line = words[n] + " ";
        curY += lineHeight;
        lines++;
      } else {
        line = test;
      }
    }
    context.fillText(line.trim(), x, curY);
    return curY + lineHeight;
  }

  function drawCardBase(title, kicker) {
    const W = canvas.width, H = canvas.height;
    // background
    ctx.fillStyle = "#0D1D33";
    ctx.fillRect(0, 0, W, H);

    // subtle chakra watermark circle
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = "#F3EFE4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W - 140, 170, 220, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(W - 140 + 40 * Math.cos(a), 170 + 40 * Math.sin(a));
      ctx.lineTo(W - 140 + 220 * Math.cos(a), 170 + 220 * Math.sin(a));
      ctx.stroke();
    }
    ctx.restore();

    // top saffron bar
    ctx.fillStyle = "#EF9438";
    ctx.fillRect(0, 0, W, 10);

    // brand
    ctx.fillStyle = "#EF9438";
    ctx.font = "600 26px 'IBM Plex Mono', monospace";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(UI[lang].cardBrand, 64, 90);

    // kicker
    ctx.fillStyle = "#8FA0B8";
    ctx.font = "600 22px 'IBM Plex Mono', monospace";
    ctx.fillText(kicker.toUpperCase(), 64, 130);

    // title
    ctx.fillStyle = "#F3EFE4";
    ctx.font = "700 52px Georgia, serif";
    let y = 200;
    y = wrapText(ctx, title, 64, y, W - 128, 60);
    return y + 20;
  }

  function drawSectionHeading(text, y, color) {
    ctx.fillStyle = color;
    ctx.font = "700 24px 'IBM Plex Mono', monospace";
    ctx.fillText(text, 64, y);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, y + 14);
    ctx.lineTo(canvas.width - 64, y + 14);
    ctx.stroke();
    ctx.globalAlpha = 1;
    return y + 50;
  }

  function drawBullets(items, y, bulletColor, maxItems) {
    ctx.font = "400 27px 'Inter', sans-serif";
    ctx.fillStyle = "#C9D2DE";
    const list = items.slice(0, maxItems || items.length);
    list.forEach((item) => {
      ctx.fillStyle = bulletColor;
      ctx.beginPath();
      ctx.arc(72, y - 9, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#C9D2DE";
      y = wrapText(ctx, item, 96, y, canvas.width - 96 - 64, 36);
      y += 10;
    });
    return y;
  }

  function downloadCanvasAsPng(filename) {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      showToast(UI[lang].toastDownloaded);
    }, "image/png");
  }

  function buildSituationCard(situationId) {
    const s = SITUATIONS.find((x) => x.id === situationId);
    if (!s) return;
    const c = s[lang];
    canvas.width = 1080;
    canvas.height = 1350;

    let y = drawCardBase(c.title, lang === "hi" ? "स्थिति" : "Situation");

    y = drawSectionHeading(UI[lang].cardRightsHeading, y, "#9FC0F5");
    y = drawBullets(c.rights, y, "#2C4E86", 4);

    y += 20;
    y = drawSectionHeading(UI[lang].cardTodoHeading, y, "#FFB258");
    y = drawBullets(c.steps, y, "#EF9438", 4);

    y += 20;
    y = drawSectionHeading(UI[lang].cardHelplineHeading, y, "#7FDBAE");
    ctx.font = "600 27px 'IBM Plex Mono', monospace";
    c.contacts.slice(0, 3).forEach((ct) => {
      ctx.fillStyle = "#C9D2DE";
      ctx.font = "400 25px 'Inter', sans-serif";
      ctx.fillText(ct.label, 64, y);
      ctx.fillStyle = "#7FDBAE";
      ctx.font = "600 25px 'IBM Plex Mono', monospace";
      const valW = ctx.measureText(ct.value).width;
      ctx.fillText(ct.value, canvas.width - 64 - valW, y);
      y += 42;
    });

    // footer
    ctx.fillStyle = "#8FA0B8";
    ctx.font = "400 20px 'Inter', sans-serif";
    ctx.fillText(UI[lang].cardFooter, 64, canvas.height - 40);
    ctx.fillStyle = "#EF9438";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    downloadCanvasAsPng(`rights-card-${s.id}-${lang}.png`);
  }

  function buildMasterCard() {
    canvas.width = 1080;
    canvas.height = 1180;
    let y = drawCardBase(UI[lang].masterCardTitle, lang === "hi" ? "आपातकाल" : "Emergency");
    y = drawSectionHeading(UI[lang].cardHelplineHeading, y, "#7FDBAE");
    ctx.font = "400 27px 'Inter', sans-serif";
    HELPLINES.forEach((h) => {
      ctx.fillStyle = "#C9D2DE";
      ctx.font = "500 30px 'Inter', sans-serif";
      ctx.fillText(h.label[lang], 64, y);
      ctx.fillStyle = "#EF9438";
      ctx.font = "700 32px 'IBM Plex Mono', monospace";
      const valW = ctx.measureText(h.num).width;
      ctx.fillText(h.num, canvas.width - 64 - valW, y);
      y += 56;
    });
    ctx.fillStyle = "#8FA0B8";
    ctx.font = "400 20px 'Inter', sans-serif";
    y += 20;
    wrapText(ctx, UI[lang].cardFooter + " *1064 varies by state.", 64, y, canvas.width - 128, 28);
    ctx.fillStyle = "#EF9438";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    downloadCanvasAsPng(`emergency-helplines-${lang}.png`);
  }

  $("#downloadCardBtn").addEventListener("click", () => {
    if (currentSituationId) buildSituationCard(currentSituationId);
  });
  $("#downloadMasterCard").addEventListener("click", buildMasterCard);

  /* ------------------------------------------------------------------ *
   * 16. INIT
   * ------------------------------------------------------------------ */
  function init() {
    drawSpokes(".brand-spokes", 24, 24, 5, 21, 12);
    drawSpokes("#spokes", 100, 100, 12, 90, 24);
    html.setAttribute("lang", lang);
    html.setAttribute("data-lang", lang);
    langToggle.setAttribute("aria-checked", String(lang === "hi"));
    applyStaticI18n();
    renderEmergencyChips();
    renderGrid("");
    startMarqueeCycle();
  }

  document.addEventListener("DOMContentLoaded", init);
})();