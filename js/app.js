/*
    Visit Halabja - پلاتفۆرمی فەرمیی گەشتیاری و حجزکردنی هەڵەبجە و هەورامان
    App.js - بەڕێوەبردنی منطقی سەرەکی پلاتفۆرم، فلتەرکردنی دەڤەرەکان، حجزکردن و گەڕانی زیرەک
*/

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23dbece8'/%3E%3C/svg%3E";

const supportedLanguages = ["ku", "ar", "en"];
const savedLanguage = localStorage.getItem("siteLanguage");
let currentLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : "ku";

/* دۆخی فلتەرە چالاکەکان */
let currentSelectedTown = "all";
let currentSelectedCategory = "all";
let activeBookingService = null;

const translations = {
    ku: {
        metaDescriptionHome: "پلاتفۆرمی فەرمی بۆ دۆزینەوە و حجزکردنی خانووی گەشتیاری، ڤێلا، کەپر و کەیفوسەفا لە هەڵەبجە و هەورامان.",
        metaDescriptionDetails: "وردەکاریی خزمەتگوزاری و شوێنەکانی مانەوە لە هەڵەبجە بۆ گەشتیاران و خێزانەکان.",
        pageTitleHome: "گەشتی هەڵەبجە و هەورامان – Visit Halabja",
        pageTitleDetails: "وردەکاری شوێن – Visit Halabja",
        pageTitleNotFound: "شوێن نەدۆزرایەوە – Visit Halabja",
        brandTitle: "گەشتی هەڵەبجە",
        brandSubtitle: "Visit Halabja",
        languageSwitchAria: "هەڵبژاردنی زمان",
        navMainAria: "ڕێنمایی سەرەکی",
        navAbout: "دەربارە",
        navDestinations: "دەڤەرەکان",
        navServices: "خانوو و مانەوە",
        navWhyVisit: "بۆچی ئێمە",
        navGallery: "گەلەری",
        navHost: "تۆمارکردنی شوێن",
        navSafety: "سەلامەتی",
        navMap: "نەخشە",
        navContact: "پەیوەندی",
        heroKicker: "هەڵەبجە و دەڤەری هەورامان • هەرێمی کوردستان • عێراق",
        heroTitle: "گەشتی هەڵەبجە و هەورامان – Visit Halabja",
        heroSubtitle: "پلاتفۆرمی فەرمی بۆ دۆزینەوە و حجزکردنی خانووی گەشتیاری، ڤێلا، کەپر و کەیفوسەفا",
        heroDescription: "باشترین شوێنەکانی مانەوە و پشوودانی خێزانی لە نەوڕۆڵی، تەوێڵە، بیارە، ئەحمەدئاوا و خورماڵ بە گرەنتی و نرخی گونجاو.",
        heroHighlightsAria: "خاڵە گرنگەکان",
        heroHighlightVerified: "خانووی تەئکیدکراو و پاک",
        heroHighlightGuarantee: "گەرەنتی پێشەکی و شوێن",
        heroHighlightSupport: "پشتیوانی ٢٤/٧ لە WhatsApp",
        searchTownLabel: "📍 دەڤەری گەشتیاری",
        searchCategoryLabel: "🏷️ جۆری شوێن و مانەوە",
        searchSubmitBtn: "دۆزینەوە و حجز 🔍",
        destinationsLabel: "دەڤەرە گەشتیارییەکان",
        destinationsTitle: "شارۆچکە و ناوچە گەشتیارییەکانی دەڤەری هەڵەبجە",
        destinationsText: "کرتە لەسەر هەر ناوچەیەک بکە بۆ بینینی خانووەکانی گەشتیاری، کەپرەکان و چالاکییەکانی بە فلتەرکراوی:",
        destinationsExploreBtn: "بینینی شوێنەکان ←",
        statsHouses: "خانوو و ڤێلا",
        statsActivities: "چالاکی",
        aboutLabel: "دەربارەی دەڤەری هەڵەبجە",
        aboutTitle: "شوێنێک بۆ هەناسەدان، پیکنیک و ئارامبوونەوەی دەروون",
        aboutText: "دەڤەری هەڵەبجە و هەورامان بە شاخە سەرکەشەکان، کانی و تاڤگە سازگارەکان، باخە سەوزەکانی گوێز و هەنار، و ڕووبارە بەخوڕەکانی ناسراوە کە ساڵانە هەزاران گەشتیار لە سەرتاسەری کوردستان و عێراق ڕادەکێشێت.",
        aboutCardNatureTitle: "سروشت و کەشوهەوای فێنک",
        aboutCardNatureText: "لە نەوڕۆڵی، بیارە، تەوێڵە، ئەحمەدئاوا و خورماڵ، ئاووهەوایەکی لەبار و فێنک لە چاو شارەکان هەیە. خانووەکانی گەشتیاری لە نێو باخ و لەسەر ئاو پشوودانێکی بیرنەکراوە پێشکەش دەکەن.",
        aboutCardTrustTitle: "حجزکردنی بێ کێشە لەگەڵ ئێمە",
        aboutCardTrustText: "پێویست ناکات بێ ئاگاداری ڕێگای دوور ببڕیت و شوێنت دەستنەکەوێت! لە ڕێگەی Visit Halabja خانووەکەت پێشوەختە تەئکید بکەرەوە و بە دڵنیاییەوە لەگەڵ خێزانەکەت سەردانی ناوچەکە بکە.",
        servicesLabel: "خانوو و شوێنەکانی مانەوە",
        servicesTitle: "خانووی گەشتیاری، ڤێلا، کەپر و کەیفوسەفا",
        servicesText: "شوێنی دڵخوازی خۆت هەڵبژێرە و لە چەند چرکەیەکدا داواکاری حجزکردن بۆ سەرپەرشتیار بنێرە:",
        servicesNoScript: "بۆ بینینی خزمەتگوزارییە داینامیکییەکان، پێویستە JavaScript چالاک بێت.",
        filterTownsLabel: "📍 دەڤەر:",
        filterCategoryLabel: "🏷️ پۆلێن:",
        filterAll: "هەموو",
        quickBookBtn: "حجزکردنی خێرا ⚡",
        serviceDetailsButton: "وردەکاری زیاتر",
        ratingReviewsText: "هەڵسەنگاندن",
        whyLabel: "بۆچی Visit Halabja؟",
        whyTitle: "بۆچی لە ڕێگەی پلاتفۆرمی ئێمەوە حجز بکەیت؟",
        whyVerifiedTitle: "شوێنی دڵنیاکراو و پاک",
        whyVerifiedText: "هەموو خانووەکان وێنەی ڕاستەقینەیان دانراوە و لە ڕووی پاکوخاوێنی و خزمەتگوزارییەوە پشکنراون.",
        whyFastBookingTitle: "حجزکردنی خێرا و ئاسان",
        whyFastBookingText: "بێ ئاڵۆزی، تەنها بە فۆرمێکی کورت و ناردنی بۆ WhatsApp، شوێنەکەت بۆ ڕۆژی دیاریکراو ڕادەگیرێت.",
        whyDepositSecurityTitle: "پاراستنی پێشەکی و پارە",
        whyDepositSecurityText: "پێشەکی بە FastPay یان FIB وەردەگیرێت و حجزەکەت ١٠٠٪ مسۆگەر دەبێت تا دەگەیتە شوێنەکە.",
        whySupportTitle: "پشتیوانی بەردەوام",
        whySupportText: "لە سەرەتای دەرچوونتەوە تا گەیشتن و گەڕانەوە، تیمەکەمان لەگەڵت دەبن بۆ هەر هاوکاری و ڕێنماییەک.",
        galleryLabel: "گەلەری وێنەکان",
        galleryTitle: "دیمەنە دڵڕفێنەکانی دەڤەری هەڵەبجە و هەورامان",
        galleryText: "کرتە لەسەر هەر وێنەیەک بکە بۆ بینینی بە قەبارەی گەورەتر.",
        galleryHeroTitle: "دیمەنی ڕووبار و خانووەکانی نەوڕۆڵی",
        galleryLandscapeTitle: "باخ و چیاکانی بیارە و هەورامان",
        galleryNatureTitle: "تاڤگە و سروشتی دەوڵەمەندی هەڵەبجە",
        galleryActivityTitle: "چالاکی و کەیفوسەفا لە ناوچەکە",
        hostLabel: "هاوبەشی لەگەڵمان",
        hostTitle: "خاوەنی خانوو، ڤێلا یان کەپریت لە هەڵەبجە و دەوروبەری؟",
        hostText: "شوێنەکەت لە پلاتفۆرمی Visit Halabja بە شێوەیەکی پرۆفیشناڵ تۆمار بکە و ڕۆژانە پەیوەندی و حجز لە سەدان گەشتیارەوە لە سەرتاسەری کوردستان و عێراق بەدەستبهێنە.",
        hostButton: "تۆمارکردنی شوێنەکەت لە WhatsApp 🏡",
        safetyLabel: "سەلامەتی و ڕێنمایی",
        safetyTitle: "ڕێنماییەکانی سەلامەتی بۆ گەشتێکی ئارام و پارێزراو",
        safetyText: "سەلامەتی تۆ و خێزانەکەت لە پێشینەی کارەکانە. تکایە لە کاتی سەردانتان، پابەندی ئەم ڕێنماییانە بن.",
        safetyCardLifeJacketTitle: "هێلەکی مەلەکردن (Life Jacket)",
        safetyCardLifeJacketText: "بەکارهێنانی هێلەکی ڕزگاربوون لە کاتی سواربوونی بەلەم و جێتسکی یان نزیکبوونەوە لە ئاوی قووڵ پێویستە بۆ منداڵان و گەورەکان.",
        safetyCardChildrenTitle: "چاودێری منداڵان لە کەناراو",
        safetyCardChildrenText: "تکایە هەمیشە چاودێری وردی منداڵەکانتان بکەن لە نزیک قەراغی ئاو و ڕێڕەوە شاخاوییەکان.",
        safetyCardBoatingTitle: "لێخوڕینی سەلامەت",
        safetyCardBoatingText: "لێخوڕینی جێتسکی و ماتۆڕ بە خێرایی لەبار و پابەندبوون بە ڕێنماییەکانی ڕاهێنەر بۆ پاراستنی سەلامەتی هەموان پێویستە.",
        safetyCardCleanlinessTitle: "پاراستنی ژینگە و پاکوخاوێنی",
        safetyCardCleanlinessText: "ئاوی ڕووبار و سروشتی هەڵەبجە سەرمایەیەکی گشتییە، تکایە پاشماوە و پلاستیک فڕێ مەدەنە ناو ئاو و سەتڵی زبڵ بەکاربهێنن.",
        mapLabel: "نەخشە",
        mapTitle: "شوێنی دەڤەری هەڵەبجە لەسەر نەخشە",
        mapText: "بۆ ڕێنمایی و دۆزینەوەی ئاسانی ڕێگاکان بۆ ناوچە گەشتیارییەکان.",
        weatherDefaultStatus: "کەشوهەوای دەڤەری هەڵەبجە",
        contactLabel: "پەیوەندی",
        contactTitle: "ئامادەین بۆ وەڵامدانەوە و حجزکردنی شوێنەکەت",
        contactText: "ئەگەر دەتەوێت زانیاری زیاتر وەربگریت یان داوای حجز بکەیت، لە ڕێگەی تەلەفۆن و واتسئەپەوە پەیوەندیمان پێوە بکە.",
        contactPhoneTitle: "تەلەفۆن",
        contactPhoneText: "وەڵامدانەوەی خێرای پەیوەندییەکان لە کاتی کارکردندا.",
        contactWhatsappTitle: "WhatsApp ی ڕزێرڤ",
        contactWhatsappButton: "حجز و پەیوەندی لە WhatsApp",
        contactWhatsappText: "ڕێگایەکی خێرا بۆ وەڵامدانەوەی پرسیارەکانت و تەئکیدکردنەوەی حجز.",
        contactSocialTitle: "تۆڕە کۆمەڵایەتییەکان",
        contactSocialText: "بۆ بینینی نوێترین ڤیدیۆ و دیمەنی شوێنەکان بەردەوام چاودێریمان بکەن.",
        footerBackTop: "گەڕانەوە بۆ سەرەوە",
        bookingModalTitle: "داواکاری حیجزکردنی شوێن",
        bookingFormDateLabel: "📅 بەرواری سەردان / هاتن",
        bookingFormDurationLabel: "⏳ ماوەی مانەوە",
        bookingFormGuestsLabel: "👥 ژمارەی کەسەکان",
        bookingFormNameLabel: "👤 ناوی سیانی",
        bookingFormPhoneLabel: "📞 ژمارەی مۆبایل یان WhatsApp",
        bookingFormNotesLabel: "📝 تێبینی یان داواکاری تایبەت (ئارەزوومەندانە)",
        bookingNoticeTitle: "تەئکیدکردنەوەی حجز:",
        bookingNoticeDesc: "بۆ پاراستن و دڵنیابوونی شوێنەکەت، بڕە پێشەکییەکی کەم لە ڕێگەی FastPay یان FIB وەردەگیرێت، و بەشەکەی تری پارەکە لە کاتی گەیشتنت بە شوێنەکە دەدەیت.",
        bookingSubmitBtnText: "ناردنی داواکاری لە WhatsApp بۆ بەڕێوەبەر 📲",
        serviceEmptyTitle: "هیچ شوێنێک نەدۆزرایەوە",
        serviceEmptyText: "بەپێی ئەو فلتەرەی هەڵتبژاردووە لەم دەڤەرەدا شوێن بەردەست نییە. تکایە پۆلێن یان دەڤەرێکی تر تاقی بکەرەوە.",
        detailsLoadingTitle: "وردەکاری خزمەتگوزاری بار دەکرێت",
        detailsLoadingText: "تکایە چاوەڕێ بکە تا زانیاریی خزمەتگوزارییەکە لە data.js بخوێندرێتەوە.",
        detailBackHome: "گەڕانەوە بۆ سەرەتا",
        detailNotFoundTitle: "ئەم خزمەتگوزارییە نەدۆزرایەوە",
        detailNotFoundText: "تکایە بگەڕێوە بۆ پەڕەی سەرەکی و خزمەتگوزارییەکان دووبارە هەڵبژێرە.",
        detailAboutService: "دەربارەی شوێنەکە",
        detailSmallGallery: "گەلەریی وێنەکان",
        detailFeatures: "تایبەتمەندی و ئاسانکارییەکان",
        detailRules: "یاسا و ڕێنمایی",
        detailMainInfo: "زانیاریی سەرەکی",
        detailLocationLabel: "شوێن",
        detailPhoneLabel: "ژمارەی پەیوەندی",
        servicePriceLabel: "نرخ",
        detailOwnerInfo: "زانیاریی سەرپەرشتیار",
        detailOwnerNameLabel: "سەرپەرشتیار",
        detailOwnerRoleLabel: "ئەرک",
        detailBookingForm: "داواکاری حیجزکردن لە WhatsApp",
        detailFormFullName: "ناوی تەواو",
        detailFormPhone: "ژمارەی مۆبایل",
        detailFormVisitDate: "بەرواری سەردان",
        detailFormGuestsCount: "ژمارەی کەسەکان",
        detailFormNote: "تێبینی",
        detailFormSubmit: "ناردنی داواکاری بۆ WhatsApp"
    },
    ar: {
        metaDescriptionHome: "المنصة الرسمية لاكتشاف وحجز البيوت السياحية، الفلل، الأكواخ والنشاطات في حلبجة وهورامان.",
        metaDescriptionDetails: "تفاصيل أماكن الإقامة والخدمات في حلبجة للعائلات والزوار.",
        pageTitleHome: "سياحة حلبجة وهورامان – Visit Halabja",
        pageTitleDetails: "تفاصيل المكان – Visit Halabja",
        pageTitleNotFound: "المكان غير موجود – Visit Halabja",
        brandTitle: "سياحة حلبجة",
        brandSubtitle: "Visit Halabja",
        languageSwitchAria: "اختيار اللغة",
        navMainAria: "التنقل الرئيسي",
        navAbout: "حول حلبجة",
        navDestinations: "المناطق",
        navServices: "الإقامة والبيوت",
        navWhyVisit: "لماذا نحن",
        navGallery: "المعرض",
        navHost: "إضافة عقارك",
        navSafety: "السلامة",
        navMap: "الخريطة",
        navContact: "اتصال",
        heroKicker: "حلبجة ومنطقة هورامان • إقليم كردستان • العراق",
        heroTitle: "سياحة حلبجة وهورامان – Visit Halabja",
        heroSubtitle: "المنصة الرسمية لاكتشاف وحجز البيوت السياحية، الفلل، الأكواخ والمغامرات",
        heroDescription: "أفضل أماكن الإقامة والاستجمام العائلي في نورولي، طويلة، بيارة، أحمد آوا وخورمال بأفضل الأسعار وضمان الحجز.",
        heroHighlightsAria: "أبرز المزايا",
        heroHighlightVerified: "أماكن معتمدة ونظيفة",
        heroHighlightGuarantee: "ضمان العربون والحجز",
        heroHighlightSupport: "دعم مستمر عبر WhatsApp",
        searchTownLabel: "📍 المنطقة السياحية",
        searchCategoryLabel: "🏷️ نوع الإقامة والنشاط",
        searchSubmitBtn: "بحث وحجز 🔍",
        destinationsLabel: "المناطق السياحية",
        destinationsTitle: "بلدات ووجهات منطقة حلبجة السياحية",
        destinationsText: "اضغط على أي منطقة لعرض البيوت والأكواخ والنشاطات الخاصة بها:",
        destinationsExploreBtn: "استكشاف الأماكن ←",
        statsHouses: "بيوت وفلل",
        statsActivities: "نشاطات",
        aboutLabel: "حول منطقة حلبجة",
        aboutTitle: "وجهة مثالية للاسترخاء والتنفس في قلب الطبيعة",
        aboutText: "تتميز حلبجة وهورامان بجبالها الشاهقة، ينابيعها العذبة، بساتين الجوز والرمان، وتدفق أنهارها التي تستقطب آلاف الزوار سنوياً من كافة أنحاء العراق.",
        aboutCardNatureTitle: "طبيعة خلابة وأجواء عليلة",
        aboutCardNatureText: "في نورولي، بيارة، طويلة، أحمد آوا وخورمال، طقس معتدل ومنعش. توفر البيوت السياحية بين البساتين وفوق الماء تجربة استثنائية.",
        aboutCardTrustTitle: "حجز مريح وموثوق معنا",
        aboutCardTrustText: "لا تقلق بشأن قطع مسافات طويلة دون توفر مكان! عبر Visit Halabja أكد حجزك مسبقاً وسافر براحة تامة مع عائلتك.",
        servicesLabel: "البيوت وأماكن الإقامة",
        servicesTitle: "بيوت سياحية، فلل، أكواخ ونشاطات",
        servicesText: "اختر مكانك المفضل وأرسل طلب الحجز للمشرف خلال ثوانٍ:",
        servicesNoScript: "لعرض الخدمات الديناميكية، يجب تفعيل JavaScript.",
        filterTownsLabel: "📍 المنطقة:",
        filterCategoryLabel: "🏷️ التصنيف:",
        filterAll: "الكل",
        quickBookBtn: "حجز سريع ⚡",
        serviceDetailsButton: "عرض التفاصيل",
        ratingReviewsText: "تقييم",
        whyLabel: "لماذا Visit Halabja؟",
        whyTitle: "لماذا تحجز عبر منصتنا؟",
        whyVerifiedTitle: "أماكن معتمدة ونظيفة",
        whyVerifiedText: "جميع الأماكن معروضة بصور حقيقية ومفحوصة من حيث النظافة والخدمات.",
        whyFastBookingTitle: "حجز فوري ومباشر",
        whyFastBookingText: "بنموذج بسيط وإرسال للواتساب، يتم تثبيت حجزك للتاريخ المطلوب.",
        whyDepositSecurityTitle: "أمان العربون والدفع",
        whyDepositSecurityText: "يتم دفع عربون رمزي عبر FastPay أو FIB لضمان مكانك ١٠٠٪ حتى وصولك.",
        whySupportTitle: "دعم مستمر",
        whySupportText: "فريقنا معك من لحظة انطلاقك حتى وصولك وعودتك لأي مساعدة وإرشاد.",
        galleryLabel: "معرض الصور",
        galleryTitle: "مشاهد ساحرة من حلبجة وهورامان",
        galleryText: "اضغط على أي صورة لتكبيرها.",
        galleryHeroTitle: "إطلالة نهر وبيوت نورولي",
        galleryLandscapeTitle: "بساتين وجبال بيارة وهورامان",
        galleryNatureTitle: "شلالات وطبيعة حلبجة الخلابة",
        galleryActivityTitle: "نشاطات ومغامرات المنطقة",
        hostLabel: "انضم إلينا",
        hostTitle: "هل تملك بيتاً سياحياً أو كوخاً في حلبجة؟",
        hostText: "سجل مكانك في منصة Visit Halabja بشكل احترافي واستقبل يومياً حجوزات من مئات الزوار في العراق وكردستان.",
        hostButton: "سجل عقارك عبر WhatsApp 🏡",
        safetyLabel: "السلامة والإرشادات",
        safetyTitle: "إرشادات السلامة لرحلة هادئة وآمنة",
        safetyText: "سلامتك وسلامة عائلتك هي أولويتنا. يرجى الالتزام بهذه الإرشادات أثناء زيارتكم.",
        safetyCardLifeJacketTitle: "سترات النجاة (Life Jacket)",
        safetyCardLifeJacketText: "ارتداء سترة النجاة ضروري عند ركوب القوارب والجت سكي خاصة للأطفال.",
        safetyCardChildrenTitle: "مراقبة الأطفال عند ضفاف النهر",
        safetyCardChildrenText: "يرجى مراقبة الأطفال دائماً بالقرب من حافة النهر والمسارات الجبلية.",
        safetyCardBoatingTitle: "القيادة الآمنة",
        safetyCardBoatingText: "قيادة الجت سكي والدبابات بسرعة مناسبة والالتزام بتعليمات المشرفين.",
        safetyCardCleanlinessTitle: "حماية البيئة والنظافة",
        safetyCardCleanlinessText: "مياه النهر وطبيعة حلبجة ثروة للجميع، يرجى الحفاظ على النظافة.",
        mapLabel: "الخريطة",
        mapTitle: "موقع حلبجة على الخريطة",
        mapText: "لإرشادك وتسهيل الوصول للأماكن السياحية.",
        weatherDefaultStatus: "طقس منطقة حلبجة",
        contactLabel: "اتصال",
        contactTitle: "جاهزون للإجابة وحجز مكانك",
        contactText: "تواصل معنا عبر الهاتف أو الواتساب لأي استفسار أو حجز.",
        contactPhoneTitle: "الهاتف",
        contactPhoneText: "رد سريع خلال ساعات العمل.",
        contactWhatsappTitle: "واتساب الحجز",
        contactWhatsappButton: "حجز واستفسار عبر WhatsApp",
        contactWhatsappText: "طريقة سريعة لتأكيد حجزك.",
        contactSocialTitle: "وسائل التواصل",
        contactSocialText: "تابعونا لمشاهدة أحدث الفيديوهات.",
        footerBackTop: "العودة للأعلى",
        bookingModalTitle: "طلب حجز مكان إقامة",
        bookingFormDateLabel: "📅 تاريخ الوصول / الزيارة",
        bookingFormDurationLabel: "⏳ مدة الإقامة",
        bookingFormGuestsLabel: "👥 عدد الأشخاص",
        bookingFormNameLabel: "👤 الاسم الثلاثي",
        bookingFormPhoneLabel: "📞 رقم الهاتف أو WhatsApp",
        bookingFormNotesLabel: "📝 ملاحظات أو طلب خاص (اختياري)",
        bookingNoticeTitle: "تأكيد الحجز:",
        bookingNoticeDesc: "لضمان مكانك، يتم دفع عربون رمزي عبر FastPay أو FIB، وباقي المبلغ عند الوصول.",
        bookingSubmitBtnText: "إرسال طلب الحجز إلى WhatsApp 📲",
        serviceEmptyTitle: "لم يتم العثور على أماكن",
        serviceEmptyText: "لا توجد نتائج مطابقة في هذه المنطقة حالياً. يرجى تجربة تصنيف آخر.",
        detailsLoadingTitle: "جاري تحميل التفاصيل",
        detailsLoadingText: "يرجى الانتظار...",
        detailBackHome: "العودة للرئيسية",
        detailNotFoundTitle: "الخدمة غير موجودة",
        detailNotFoundText: "يرجى العودة للصفحة الرئيسية.",
        detailAboutService: "حول هذا المكان",
        detailSmallGallery: "معرض الصور",
        detailFeatures: "المميزات والخدمات",
        detailRules: "القواعد والإرشادات",
        detailMainInfo: "المعلومات الأساسية",
        detailLocationLabel: "الموقع",
        detailPhoneLabel: "رقم التواصل",
        servicePriceLabel: "السعر",
        detailOwnerInfo: "معلومات المشرف",
        detailOwnerNameLabel: "المشرف",
        detailOwnerRoleLabel: "الدور",
        detailBookingForm: "طلب الحجز عبر WhatsApp",
        detailFormFullName: "الاسم الكامل",
        detailFormPhone: "رقم الهاتف",
        detailFormVisitDate: "تاريخ الزيارة",
        detailFormGuestsCount: "عدد الأشخاص",
        detailFormNote: "ملاحظات",
        detailFormSubmit: "إرسال الطلب إلى WhatsApp"
    },
    en: {
        metaDescriptionHome: "Official tourism and booking platform for tourist houses, villas, huts and activities in Halabja and Hawraman.",
        metaDescriptionDetails: "Details of accommodations and attractions in Halabja for travelers and families.",
        pageTitleHome: "Visit Halabja & Hawraman",
        pageTitleDetails: "Listing Details – Visit Halabja",
        pageTitleNotFound: "Listing Not Found – Visit Halabja",
        brandTitle: "Visit Halabja",
        brandSubtitle: "Halabja & Hawraman",
        languageSwitchAria: "Choose language",
        navMainAria: "Main navigation",
        navAbout: "About",
        navDestinations: "Destinations",
        navServices: "Stays & Houses",
        navWhyVisit: "Why Us",
        navGallery: "Gallery",
        navHost: "List Your Place",
        navSafety: "Safety",
        navMap: "Map",
        navContact: "Contact",
        heroKicker: "Halabja & Hawraman Region • Kurdistan • Iraq",
        heroTitle: "Visit Halabja & Hawraman",
        heroSubtitle: "Official booking directory for tourist houses, villas, huts and mountain adventures",
        heroDescription: "Best family stays and outdoor fun in Nawroli, Tawela, Byara, Ahmad Awa and Khurmal with verified bookings and fair prices.",
        heroHighlightsAria: "Key highlights",
        heroHighlightVerified: "Verified & Clean Stays",
        heroHighlightGuarantee: "Deposit & Booking Security",
        heroHighlightSupport: "24/7 WhatsApp Support",
        searchTownLabel: "📍 Destination",
        searchCategoryLabel: "🏷️ Category",
        searchSubmitBtn: "Find & Book 🔍",
        destinationsLabel: "Tourist Destinations",
        destinationsTitle: "Towns & Areas of Halabja Region",
        destinationsText: "Click on any town to explore its tourist houses and activities:",
        destinationsExploreBtn: "Explore Area ←",
        statsHouses: "Houses & Villas",
        statsActivities: "Activities",
        aboutLabel: "About Halabja Region",
        aboutTitle: "A peaceful destination to breathe and unwind in nature",
        aboutText: "Halabja and Hawraman are renowned for dramatic mountain landscapes, cold rushing springs, walnut orchards and rivers attracting thousands of visitors every season.",
        aboutCardNatureTitle: "Pristine Nature & Fresh Air",
        aboutCardNatureText: "Enjoy refreshing mountain breezes in Nawroli, Byara, Tawela, Ahmad Awa and Khurmal. Riverside stays offer an unforgettable getaway.",
        aboutCardTrustTitle: "Seamless Bookings with Us",
        aboutCardTrustText: "Travel with certainty! Reserve your stay in advance via Visit Halabja without worries about full vacancies on arrival.",
        servicesLabel: "Accommodations & Stays",
        servicesTitle: "Tourist Houses, Cabins & Fun",
        servicesText: "Pick your preferred stay and send a booking inquiry in seconds:",
        servicesNoScript: "JavaScript needs to be enabled to view dynamic listings.",
        filterTownsLabel: "📍 Town:",
        filterCategoryLabel: "🏷️ Category:",
        filterAll: "All",
        quickBookBtn: "Quick Book ⚡",
        serviceDetailsButton: "View Details",
        ratingReviewsText: "reviews",
        whyLabel: "Why Visit Halabja?",
        whyTitle: "Why Book Through Our Platform?",
        whyVerifiedTitle: "Verified Clean Stays",
        whyVerifiedText: "All listings are verified with authentic photos, checked for cleanliness and comfort.",
        whyFastBookingTitle: "Instant Direct Booking",
        whyFastBookingText: "Simple form with direct WhatsApp dispatch to hold your dates reliably.",
        whyDepositSecurityTitle: "Deposit Security",
        whyDepositSecurityText: "Small down payment via FastPay or FIB ensures 100% reservation confirmation.",
        whySupportTitle: "Continuous Support",
        whySupportText: "Our local team is always available to assist with directions and requirements.",
        galleryLabel: "Gallery",
        galleryTitle: "Captivating Views of Halabja & Hawraman",
        galleryText: "Click on any image to view in full size.",
        galleryHeroTitle: "Nawroli river and water houses",
        galleryLandscapeTitle: "Byara orchards and mountains",
        galleryNatureTitle: "Ahmad Awa waterfall and nature",
        galleryActivityTitle: "Outdoor activities and adventures",
        hostLabel: "Partner with Us",
        hostTitle: "Do you own a cabin, house or hut in Halabja?",
        hostText: "List your property professionally on Visit Halabja and receive daily direct bookings from tourists across Kurdistan and Iraq.",
        hostButton: "List Your Place on WhatsApp 🏡",
        safetyLabel: "Safety & Guidelines",
        safetyTitle: "Safety Guidelines for a Secure Visit",
        safetyText: "Your safety is our top priority. Please respect safety instructions during your stay.",
        safetyCardLifeJacketTitle: "Life Jackets",
        safetyCardLifeJacketText: "Life jackets are required during boat and jet ski rides, especially for children.",
        safetyCardChildrenTitle: "Child Supervision",
        safetyCardChildrenText: "Always supervise children closely near water banks and steep mountain paths.",
        safetyCardBoatingTitle: "Safe Watercraft",
        safetyCardBoatingText: "Operate watercraft safely and follow guides' instructions.",
        safetyCardCleanlinessTitle: "Eco-Care & Cleanliness",
        safetyCardCleanlinessText: "Protect the river and natural environment. Use designated waste bins.",
        mapLabel: "Map",
        mapTitle: "Halabja Region Map",
        mapText: "Easily navigate routes to all tourist attractions.",
        weatherDefaultStatus: "Halabja Region Weather",
        contactLabel: "Contact",
        contactTitle: "We are ready to assist you",
        contactText: "Call or chat via WhatsApp for information and bookings.",
        contactPhoneTitle: "Phone",
        contactPhoneText: "Prompt response during working hours.",
        contactWhatsappTitle: "Booking WhatsApp",
        contactWhatsappButton: "Chat on WhatsApp",
        contactWhatsappText: "Fast and easy way to book.",
        contactSocialTitle: "Social Media",
        contactSocialText: "Follow us to view latest scenic videos.",
        footerBackTop: "Back to top",
        bookingModalTitle: "Stay Booking Request",
        bookingFormDateLabel: "📅 Arrival Date",
        bookingFormDurationLabel: "⏳ Stay Duration",
        bookingFormGuestsLabel: "👥 Guests Count",
        bookingFormNameLabel: "👤 Full Name",
        bookingFormPhoneLabel: "📞 Mobile or WhatsApp Number",
        bookingFormNotesLabel: "📝 Notes or Special Requests (Optional)",
        bookingNoticeTitle: "Booking Confirmation:",
        bookingNoticeDesc: "A small deposit via FastPay or FIB confirms your booking, and the rest is paid upon arrival.",
        bookingSubmitBtnText: "Send Booking Request via WhatsApp 📲",
        serviceEmptyTitle: "No Listings Found",
        serviceEmptyText: "No results matched your filter in this area. Try selecting another category or all destinations.",
        detailsLoadingTitle: "Loading Listing Details",
        detailsLoadingText: "Please wait...",
        detailBackHome: "Back to Home",
        detailNotFoundTitle: "Listing Not Found",
        detailNotFoundText: "Please return to homepage.",
        detailAboutService: "About this place",
        detailSmallGallery: "Photo Gallery",
        detailFeatures: "Features & Amenities",
        detailRules: "Rules & Policies",
        detailMainInfo: "Main Information",
        detailLocationLabel: "Location",
        detailPhoneLabel: "Contact Phone",
        servicePriceLabel: "Price",
        detailOwnerInfo: "Host Information",
        detailOwnerNameLabel: "Host",
        detailOwnerRoleLabel: "Role",
        detailBookingForm: "Book via WhatsApp",
        detailFormFullName: "Full Name",
        detailFormPhone: "Phone Number",
        detailFormVisitDate: "Visit Date",
        detailFormGuestsCount: "Guests Count",
        detailFormNote: "Notes",
        detailFormSubmit: "Send Request to WhatsApp"
    }
};

function t(value) {
    if (typeof value === "string") {
        return value;
    }
    if (!value || typeof value !== "object") {
        return "";
    }
    return value[currentLanguage] || value.ku || "";
}

function ui(key) {
    return translations[currentLanguage]?.[key] || translations.ku?.[key] || "";
}

function getCurrentDirection() {
    return currentLanguage === "en" ? "ltr" : "rtl";
}

function applyLanguageToDocument() {
    const direction = getCurrentDirection();
    const metaDescription = document.querySelector('meta[name="description"]');

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = direction;

    if (document.body) {
        document.body.dir = direction;
    }

    if (metaDescription) {
        metaDescription.setAttribute(
            "content",
            ui(document.getElementById("serviceDetailsRoot") ? "metaDescriptionDetails" : "metaDescriptionHome")
        );
    }

    const titleElement = document.querySelector("title");
    if (titleElement && !document.getElementById("serviceDetailsRoot")) {
        titleElement.textContent = ui("pageTitleHome");
    }
}

function applyTranslationsToMarkedElements() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const text = ui(key);
        if (text) {
            element.textContent = text;
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        const text = ui(key);
        if (text) {
            element.setAttribute("placeholder", text);
        }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
        const key = element.dataset.i18nAriaLabel;
        const text = ui(key);
        if (text) {
            element.setAttribute("aria-label", text);
        }
    });

    document.querySelectorAll(".language-button[data-language]").forEach((button) => {
        const isActive = button.dataset.language === currentLanguage;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (cachedWeatherData) {
        updateWeatherDisplay(cachedWeatherData.temp, cachedWeatherData.code);
    }
}

function setupLanguageSwitch() {
    const languageButtons = document.querySelectorAll(".language-button[data-language]");
    if (languageButtons.length === 0) {
        return;
    }

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedLanguage = button.dataset.language || "ku";
            if (!supportedLanguages.includes(selectedLanguage)) {
                return;
            }

            currentLanguage = selectedLanguage;
            localStorage.setItem("siteLanguage", selectedLanguage);

            applyLanguageToDocument();
            applyTranslationsToMarkedElements();

            setupSmartSearch();
            renderDestinationsCards();
            renderTownPills();
            renderCategoryPills();
            renderServiceCards();
            renderServiceDetailsPage();

            setupLazyLoading();
            setupRevealAnimations();
        });
    });
}

function normalizePhoneForLink(phoneNumber) {
    const safePhoneNumber = typeof phoneNumber === "string" ? phoneNumber : "";
    const cleanNumber = safePhoneNumber.replace(/[^\d+]/g, "");
    if (!cleanNumber) {
        return "";
    }
    return cleanNumber.startsWith("+") ? cleanNumber : `+${cleanNumber}`;
}

function createWhatsAppBookingUrl(serviceName, whatsappNumber, customMessage = "") {
    const safeWhatsappNumber = typeof whatsappNumber === "string" ? whatsappNumber : "";
    const cleanNumber = safeWhatsappNumber.replace(/\D/g, "");
    const localizedServiceName = t(serviceName) || "خزمەتگوزاری";

    if (!cleanNumber) {
        return "";
    }

    const message = customMessage || `سڵاو، داواکاری حیجزم هەیە دەربارەی ${localizedServiceName} لە پلاتفۆرمی Visit Halabja.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function getServiceList() {
    return Array.isArray(window.services) ? window.services : [];
}

function getServiceById(serviceId) {
    if (!serviceId) {
        return null;
    }
    return getServiceList().find((service) => service.id === serviceId) || null;
}

/* ==========================================================================
   ١. بەشی کارتی دەڤەرەکان (Destinations Cards)
   ========================================================================== */
function renderDestinationsCards() {
    const grid = document.getElementById("destinationsGrid");
    if (!grid || !Array.isArray(window.towns)) {
        return;
    }

    const townsToShow = window.towns.filter((town) => town.id !== "all");

    grid.innerHTML = townsToShow
        .map((town) => {
            const name = t(town.name);
            const title = t(town.title);
            const badge = t(town.badge);
            const housesText = `${town.stats.houses} ${ui("statsHouses")}`;
            const activitiesText = `${town.stats.activities} ${ui("statsActivities")}`;

            return `
                <article class="destination-card reveal" data-town-id="${town.id}">
                    <img class="destination-card-bg lazy-image" src="${IMAGE_PLACEHOLDER}" data-src="${town.image}" alt="${name}" loading="lazy">
                    <div class="destination-card-scrim"></div>
                    <span class="destination-badge-tag">${badge}</span>
                    <div class="destination-card-content">
                        <div class="destination-title-row">
                            <h3>${name}</h3>
                        </div>
                        <p class="destination-subtitle">${title}</p>
                        <div class="destination-stats-row">
                            <span class="destination-stat-pill">🏡 ${housesText}</span>
                            <span class="destination-stat-pill">🏎️ ${activitiesText}</span>
                        </div>
                        <span class="destination-cta-hint">${ui("destinationsExploreBtn")}</span>
                    </div>
                </article>
            `;
        })
        .join("");

    // کلیک لەسەر کارتی هەر دەڤەرێک فلتەری ئەو ناوچەیە چالاک دەکات و دەچێتە سەر خزمەتگوزارییەکان
    grid.querySelectorAll(".destination-card").forEach((card) => {
        card.addEventListener("click", () => {
            const townId = card.dataset.townId;
            if (townId) {
                currentSelectedTown = townId;
                updateTownPillActiveState();
                updateSearchDropdownState();
                renderServiceCards();

                const servicesSection = document.getElementById("services");
                if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}

/* ==========================================================================
   ٢. فلتەری دەڤەر و پۆلێنەکان (Filter Pills)
   ========================================================================== */
function renderTownPills() {
    const container = document.getElementById("townFilterPills");
    if (!container || !Array.isArray(window.towns)) {
        return;
    }

    container.innerHTML = window.towns
        .map((town) => {
            const isActive = town.id === currentSelectedTown;
            const name = town.id === "all" ? ui("filterAll") : t(town.name);
            return `
                <button class="filter-pill ${isActive ? "is-active" : ""}" type="button" data-filter-town="${town.id}">
                    ${name}
                </button>
            `;
        })
        .join("");

    container.querySelectorAll("[data-filter-town]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentSelectedTown = btn.dataset.filterTown;
            updateTownPillActiveState();
            updateSearchDropdownState();
            renderServiceCards();
        });
    });
}

function updateTownPillActiveState() {
    const container = document.getElementById("townFilterPills");
    if (!container) return;
    container.querySelectorAll("[data-filter-town]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.filterTown === currentSelectedTown);
    });
}

function renderCategoryPills() {
    const container = document.getElementById("categoryFilterPills");
    if (!container || !Array.isArray(window.serviceCategories)) {
        return;
    }

    container.innerHTML = window.serviceCategories
        .map((cat) => {
            const isActive = cat.id === currentSelectedCategory;
            const name = cat.id === "all" ? ui("filterAll") : t(cat.name);
            const icon = cat.icon || "✨";
            return `
                <button class="filter-pill ${isActive ? "is-active" : ""}" type="button" data-filter-category="${cat.id}">
                    ${icon} ${name}
                </button>
            `;
        })
        .join("");

    container.querySelectorAll("[data-filter-category]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentSelectedCategory = btn.dataset.filterCategory;
            updateCategoryPillActiveState();
            updateSearchDropdownState();
            renderServiceCards();
        });
    });
}

function updateCategoryPillActiveState() {
    const container = document.getElementById("categoryFilterPills");
    if (!container) return;
    container.querySelectorAll("[data-filter-category]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.filterCategory === currentSelectedCategory);
    });
}

/* ==========================================================================
   ٣. بۆکسی گەڕانی زیرەک (Smart Search Bar)
   ========================================================================== */
function setupSmartSearch() {
    const townSelect = document.getElementById("searchTownSelect");
    const categorySelect = document.getElementById("searchCategorySelect");
    const submitBtn = document.getElementById("searchSubmitBtn");

    if (!townSelect || !categorySelect) {
        return;
    }

    // پڕکردنەوەی هەڵبژاردنی دەڤەر
    if (Array.isArray(window.towns)) {
        townSelect.innerHTML = window.towns
            .map((town) => {
                const name = town.id === "all" ? ui("filterAll") : t(town.name);
                return `<option value="${town.id}">${name}</option>`;
            })
            .join("");
        townSelect.value = currentSelectedTown;
    }

    // پڕکردنەوەی هەڵبژاردنی جۆر
    if (Array.isArray(window.serviceCategories)) {
        categorySelect.innerHTML = window.serviceCategories
            .map((cat) => {
                const name = cat.id === "all" ? ui("filterAll") : t(cat.name);
                const icon = cat.icon || "";
                return `<option value="${cat.id}">${icon} ${name}</option>`;
            })
            .join("");
        categorySelect.value = currentSelectedCategory;
    }

    if (submitBtn && !submitBtn.dataset.bound) {
        submitBtn.dataset.bound = "true";
        submitBtn.addEventListener("click", () => {
            currentSelectedTown = townSelect.value;
            currentSelectedCategory = categorySelect.value;

            updateTownPillActiveState();
            updateCategoryPillActiveState();
            renderServiceCards();

            const servicesSection = document.getElementById("services");
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }
}

function updateSearchDropdownState() {
    const townSelect = document.getElementById("searchTownSelect");
    const categorySelect = document.getElementById("searchCategorySelect");
    if (townSelect) townSelect.value = currentSelectedTown;
    if (categorySelect) categorySelect.value = currentSelectedCategory;
}

/* ==========================================================================
   ٤. کارتەکانی خزمەتگوزاری بە فلتەرکردنی داینامیکی (Service Cards)
   ========================================================================== */
function renderServiceCards() {
    const servicesGrid = document.getElementById("servicesGrid");
    const allServices = getServiceList();

    if (!servicesGrid) {
        return;
    }

    // پاڵاوتن بەپێی دەڤەر و جۆری خزمەتگوزاری
    const filteredServices = allServices.filter((service) => {
        const matchesTown = currentSelectedTown === "all" || service.town === currentSelectedTown;
        const matchesCategory = currentSelectedCategory === "all" || service.categoryType === currentSelectedCategory;
        return matchesTown && matchesCategory;
    });

    if (filteredServices.length === 0) {
        servicesGrid.innerHTML = `
            <article class="contact-card reveal" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
                <span style="font-size: 2.5rem; display: block; margin-bottom: 0.8rem;">🏡</span>
                <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">${ui("serviceEmptyTitle")}</h3>
                <p style="color: var(--color-text-soft); max-width: 480px; margin: 0 auto 1.2rem;">${ui("serviceEmptyText")}</p>
                <button class="button button-secondary" type="button" onclick="resetFilters()">بینینی هەموو شوێنەکان</button>
            </article>
        `;
        setupRevealAnimations();
        return;
    }

    servicesGrid.innerHTML = filteredServices
        .map((service) => {
            const serviceName = t(service.name);
            const townName = t(service.townName);
            const categoryName = t(service.category);
            const description = t(service.description);
            const priceText = t(service.price);
            const rating = service.rating || 4.9;
            const reviewsCount = service.reviewsCount || 25;
            const badge = t(service.badge);

            const featuresHtml = Array.isArray(service.features)
                ? service.features.slice(0, 3).map((f) => `<li class="service-feature-chip">✓ ${t(f)}</li>`).join("")
                : "";

            return `
                <article class="service-card reveal" data-service-id="${service.id}">
                    <div class="service-media">
                        <img
                            class="lazy-image"
                            src="${IMAGE_PLACEHOLDER}"
                            data-src="${service.image}"
                            alt="${serviceName}"
                            loading="lazy"
                            width="800"
                            height="500"
                        >
                        <span class="service-badge">${categoryName}</span>
                    </div>
                    <div class="service-body">
                        <div class="service-card-meta-top">
                            <span class="service-town-tag">📍 ${townName}</span>
                            <span class="service-rating">★ ${rating} <small class="service-rating-count">(${reviewsCount})</small></span>
                        </div>
                        <h3>${serviceName}</h3>
                        <p>${description}</p>

                        ${featuresHtml ? `<ul class="service-features-list">${featuresHtml}</ul>` : ""}

                        <div class="service-price-tag">${priceText}</div>

                        <div class="service-actions-row">
                            <button
                                class="button quick-book-btn"
                                type="button"
                                data-quick-book="${service.id}">
                                ${ui("quickBookBtn")}
                            </button>
                            <a class="details-btn" href="service-details.html?id=${encodeURIComponent(service.id)}">
                                ${ui("serviceDetailsButton")}
                            </a>
                        </div>
                    </div>
                </article>
            `;
        })
        .join("");

    setupLazyLoading();
    setupRevealAnimations();
}

window.resetFilters = function () {
    currentSelectedTown = "all";
    currentSelectedCategory = "all";
    updateTownPillActiveState();
    updateCategoryPillActiveState();
    updateSearchDropdownState();
    renderServiceCards();
};

/* ==========================================================================
   ٥. سیستەمی پەنجەرەی حجزکردنی خێرا (Quick Booking Modal)
   ========================================================================== */
function setupBookingModal() {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.getElementById("bookingModalClose");
    const form = document.getElementById("bookingModalForm");
    const dateInput = document.getElementById("bookingDateInput");

    if (!modal) {
        return;
    }

    // دیاریکردنی کەمترین بەروار بۆ ئەمڕۆ
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // داخستنی مۆدال
    if (closeBtn) {
        closeBtn.addEventListener("click", closeBookingModal);
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeBookingModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeBookingModal();
        }
    });

    // بەستنەوەی کلیکی Quick Book لە هەموو پەڕەکەدا بە Event Delegation
    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-quick-book]");
        if (!trigger) {
            return;
        }

        const serviceId = trigger.dataset.quickBook;
        const service = getServiceById(serviceId);
        if (service) {
            openBookingModal(service);
        }
    });

    // کاتێک فۆرمی حجز پڕ دەکرێتەوە و submit دەکرێت
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!activeBookingService) {
                return;
            }

            const fullName = document.getElementById("bookingNameInput")?.value.trim() || "";
            const phone = document.getElementById("bookingPhoneInput")?.value.trim() || "";
            const visitDate = document.getElementById("bookingDateInput")?.value || "";
            const duration = document.getElementById("bookingDurationInput")?.value || "1 شەو";
            const guests = document.getElementById("bookingGuestsInput")?.value || "";
            const notes = document.getElementById("bookingNotesInput")?.value.trim() || "نییە";

            if (!fullName || !phone || !visitDate) {
                alert("تکایە خانەکانی ناو، تەلەفۆن و بەروار بە تەواوی پڕ بکەرەوە.");
                return;
            }

            // دروستکردنی نامەیەکی شیک و ڕێکخراو بۆ WhatsApp
            const messageLines = [
                "👋 سڵاو بەڕێوەبەری پلاتفۆرمی Visit Halabja،",
                "داواکاری حیجزکردنم هەیە لە ڕێگەی وێبسایتەکەوە:",
                "------------------------------------",
                `🏡 شوێن: ${t(activeBookingService.name)}`,
                `📍 دەڤەر: ${t(activeBookingService.townName)}`,
                `💵 نرخ: ${t(activeBookingService.price)}`,
                "------------------------------------",
                `👤 ناوی میوان: ${fullName}`,
                `📞 ژمارەی پەیوەندی: ${phone}`,
                `📅 بەرواری هاتن: ${visitDate}`,
                `⏳ ماوەی مانەوە: ${duration}`,
                `👥 ژمارەی کەسەکان: ${guests}`,
                `📝 تێبینی تایبەت: ${notes}`,
                "------------------------------------",
                "💳 تکایە زانیاری پێشەکی و تەئکیدکردنەوەم بۆ بنێرە."
            ];

            const messageText = messageLines.join("\n");
            // ژمارەی WhatsApp بۆ پلاتفۆرم/بەڕێوەبەر یان خزمەتگوزاری
            const adminPhone = activeBookingService.whatsapp || "9647510485057";
            const cleanPhone = adminPhone.replace(/\D/g, "");

            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
            window.open(whatsappUrl, "_blank", "noopener");

            closeBookingModal();
        });
    }
}

function openBookingModal(service) {
    const modal = document.getElementById("bookingModal");
    if (!modal || !service) {
        return;
    }

    activeBookingService = service;

    const nameEl = document.getElementById("bookingModalServiceName");
    const townEl = document.getElementById("bookingModalTown");
    const priceEl = document.getElementById("bookingModalPrice");

    if (nameEl) nameEl.textContent = t(service.name);
    if (townEl) townEl.textContent = `📍 ${t(service.townName)}`;
    if (priceEl) priceEl.textContent = `💵 ${t(service.price)}`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeBookingModal() {
    const modal = document.getElementById("bookingModal");
    if (!modal) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeBookingService = null;
}

/* ==========================================================================
   ٦. خزمەتگوزارییەکانی کۆن و پەڕەی وردەکاری (Service Details Page & Actions)
   ========================================================================= */
function setupServiceActions() {
    const servicesGrid = document.getElementById("servicesGrid");
    if (!servicesGrid || servicesGrid.dataset.actionsBound) {
        return;
    }
    servicesGrid.dataset.actionsBound = "true";

    servicesGrid.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-whatsapp]");
        if (!trigger) {
            return;
        }
        openWhatsAppBooking(trigger.dataset.serviceName || "خزمەتگوزاری", trigger.dataset.whatsapp || "");
    });
}

function openWhatsAppBooking(serviceName, whatsappNumber) {
    const bookingUrl = createWhatsAppBookingUrl(serviceName, whatsappNumber);
    if (!bookingUrl) {
        alert(ui("quickBookingUnavailable"));
        return;
    }
    window.open(bookingUrl, "_blank", "noopener");
}

function setupSmoothScrolling() {
    const scrollTriggers = document.querySelectorAll("[data-scroll-target]");
    scrollTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            const targetSelector = trigger.getAttribute("href");
            if (!targetSelector || !targetSelector.startsWith("#")) {
                return;
            }

            const targetElement = document.querySelector(targetSelector);
            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

function loadImage(imageElement) {
    const source = imageElement.dataset.src;
    if (!source || imageElement.dataset.loadingState === "loading") {
        return;
    }

    imageElement.dataset.loadingState = "loading";
    imageElement.loading = "eager";
    imageElement.src = source;
    imageElement.removeAttribute("data-src");

    imageElement.addEventListener(
        "load",
        () => {
            imageElement.classList.add("is-loaded");
            delete imageElement.dataset.loadingState;
        },
        { once: true }
    );

    imageElement.addEventListener(
        "error",
        () => {
            delete imageElement.dataset.loadingState;
        },
        { once: true }
    );
}

function setupLazyLoading() {
    const lazyImages = document.querySelectorAll(".lazy-image:not([data-observed])");
    if (lazyImages.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        lazyImages.forEach(loadImage);
        return;
    }

    if (!window._lazyObserver) {
        window._lazyObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "140px 0px" }
        );
    }

    lazyImages.forEach((image) => {
        image.dataset.observed = "true";
        window._lazyObserver.observe(image);
    });
}

function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal:not([data-reveal-observed])");
    if (revealElements.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    if (!window._revealObserver) {
        window._revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.1 }
        );
    }

    revealElements.forEach((el) => {
        el.dataset.revealObserved = "true";
        window._revealObserver.observe(el);
    });

    window.setTimeout(() => {
        revealElements.forEach((el) => el.classList.add("is-visible"));
    }, 1200);
}

function setupGalleryLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxClose) {
        return;
    }

    if (lightbox.dataset.lightboxBound) {
        return;
    }
    lightbox.dataset.lightboxBound = "true";

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        lightboxImage.alt = "";
        lightboxTitle.textContent = "";
        document.body.style.overflow = "";
    };

    document.addEventListener("click", (event) => {
        const card = event.target.closest(".gallery-card");
        if (!card) {
            return;
        }

        const fullImage = card.dataset.fullImage;
        const title = card.dataset.title || "دیمەنی دەڤەری هەڵەبجە";

        if (!fullImage) {
            return;
        }

        lightboxImage.src = fullImage;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}

function updateCurrentYear() {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ==========================================================================
   ٧. پەڕەی وردەکاری (Service Details Page Handler)
   ========================================================================== */
function renderServiceNotFound(detailsRoot) {
    detailsRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <article class="detail-card reveal">
                    <a class="back-link" href="index.html#services">${ui("detailBackHome")}</a>
                    <h1>${ui("detailNotFoundTitle")}</h1>
                    <p>${ui("detailNotFoundText")}</p>
                </article>
            </div>
        </section>
    `;
}

function renderServiceDetailsPage() {
    const detailsRoot = document.getElementById("serviceDetailsRoot");
    if (!detailsRoot) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const serviceId = params.get("id") || "";
    const service = getServiceById(serviceId);

    if (!service) {
        document.title = ui("pageTitleNotFound");
        renderServiceNotFound(detailsRoot);
        return;
    }

    const serviceTitle = t(service.name);
    const serviceCategory = t(service.category);
    const serviceTown = t(service.townName);
    const serviceDescription = t(service.description);
    const servicePrice = t(service.price);
    const serviceLocation = t(service.locationText);
    const serviceOwnerName = t(service.ownerName);
    const serviceOwnerRole = t(service.ownerRole);
    const phoneLink = normalizePhoneForLink(service.phone || service.whatsapp || "");

    document.title = `${serviceTitle} – Visit Halabja`;

    const featuresHtml = Array.isArray(service.features) && service.features.length > 0
        ? `
            <div class="detail-block">
                <h3>${ui("detailFeatures")}</h3>
                <ul class="detail-list">
                    ${service.features.map((f) => `<li>${t(f)}</li>`).join("")}
                </ul>
            </div>
        `
        : "";

    const galleryHtml = Array.isArray(service.gallery) && service.gallery.length > 0
        ? `
            <div class="detail-block">
                <h3>${ui("detailSmallGallery")}</h3>
                <div class="detail-gallery">
                    ${service.gallery.map((img) => `
                        <button class="gallery-card reveal" type="button" data-full-image="${img}" data-title="${serviceTitle}">
                            <img class="lazy-image" src="${IMAGE_PLACEHOLDER}" data-src="${img}" alt="${serviceTitle}" loading="lazy">
                        </button>
                    `).join("")}
                </div>
            </div>
        `
        : "";

    detailsRoot.innerHTML = `
        <section class="section">
            <div class="container">
                <article class="detail-card reveal">
                    <div class="detail-header">
                        <span class="detail-badge">${serviceCategory} • 📍 ${serviceTown}</span>
                        <h1>${serviceTitle}</h1>
                        <p class="detail-lead">${serviceDescription}</p>
                    </div>

                    <div class="detail-media-main">
                        <img class="lazy-image" src="${IMAGE_PLACEHOLDER}" data-src="${service.image}" alt="${serviceTitle}" loading="lazy">
                    </div>

                    <div class="detail-grid-layout">
                        <div class="detail-info-col">
                            <div class="detail-block">
                                <h3>${ui("detailAboutService")}</h3>
                                <p>${t(service.longDescription || service.description)}</p>
                            </div>

                            ${featuresHtml}
                            ${galleryHtml}
                        </div>

                        <aside class="detail-sidebar-col">
                            <div class="detail-summary-card">
                                <h3>${ui("detailMainInfo")}</h3>
                                <div class="detail-price-box">
                                    <span>${ui("servicePriceLabel")}</span>
                                    <strong>${servicePrice}</strong>
                                </div>
                                <ul class="detail-meta-list">
                                    <li><strong>📍 ${ui("detailLocationLabel")}:</strong> ${serviceLocation}</li>
                                    <li><strong>📞 ${ui("detailPhoneLabel")}:</strong> <a href="tel:${phoneLink}">${service.phone}</a></li>
                                    <li><strong>👤 ${ui("detailOwnerNameLabel")}:</strong> ${serviceOwnerName} (${serviceOwnerRole})</li>
                                </ul>

                                <button class="button button-primary full-width" type="button" data-quick-book="${service.id}">
                                    ${ui("quickBookBtn")}
                                </button>
                            </div>
                        </aside>
                    </div>
                </article>
            </div>
        </section>
    `;

    setupLazyLoading();
    setupRevealAnimations();
    setupGalleryLightbox();
}

function setupServiceBookingForm() {
    // بۆ backwards compatibility
}

/* ==========================================================================
   ٨. کەشوهەوا (Weather Widget)
   ========================================================================== */
function getWeatherConditionInfo(code) {
    if (code === 0) {
        return { icon: "☀️", label: { ku: "ساماڵ و گەش", ar: "مشمس وصافٍ", en: "Clear sky" } };
    }
    if ([1, 2, 3].includes(code)) {
        return { icon: "⛅", label: { ku: "نیمچە هەور", ar: "غائم جزئياً", en: "Partly cloudy" } };
    }
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        return { icon: "🌧️", label: { ku: "باراناوی", ar: "ممطر", en: "Rainy" } };
    }
    if ([71, 73, 75, 85, 86].includes(code)) {
        return { icon: "❄️", label: { ku: "بەفراوی", ar: "مثلج", en: "Snowy" } };
    }
    if ([95, 96, 99].includes(code)) {
        return { icon: "⛈️", label: { ku: "هەورەبرووسکە", ar: "عواصف رعدية", en: "Thunderstorm" } };
    }
    return { icon: "🌤️", label: { ku: "کەشوهەوای دەڤەری هەڵەبجە", ar: "طقس حلبجة", en: "Halabja Weather" } };
}

let cachedWeatherData = null;

function updateWeatherDisplay(temp, code) {
    const tempElement = document.getElementById("weatherTemp");
    const iconElement = document.getElementById("weatherIcon");
    const labelElement = document.getElementById("weatherLabel");

    if (!tempElement || !iconElement || !labelElement) {
        return;
    }

    const info = getWeatherConditionInfo(code);
    tempElement.textContent = `${Math.round(temp)}°C`;
    iconElement.textContent = info.icon;
    labelElement.textContent = t(info.label);
}

function initWeatherWidget() {
    const heroWeather = document.getElementById("heroWeather");
    if (!heroWeather) {
        return;
    }

    try {
        const stored = sessionStorage.getItem("halabjaWeather");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Date.now() - parsed.timestamp < 30 * 60 * 1000) {
                cachedWeatherData = parsed;
                updateWeatherDisplay(parsed.temp, parsed.code);
                return;
            }
        }
    } catch (_) {}

    fetch("https://api.open-meteo.com/v1/forecast?latitude=35.18&longitude=45.98&current=temperature_2m,weather_code&timezone=auto")
        .then((res) => {
            if (!res.ok) throw new Error("Weather request failed");
            return res.json();
        })
        .then((data) => {
            if (data && data.current) {
                const temp = data.current.temperature_2m;
                const code = data.current.weather_code;
                cachedWeatherData = { temp, code, timestamp: Date.now() };
                try {
                    sessionStorage.setItem("halabjaWeather", JSON.stringify(cachedWeatherData));
                } catch (_) {}
                updateWeatherDisplay(temp, code);
            }
        })
        .catch(() => {
            const tempElement = document.getElementById("weatherTemp");
            if (tempElement && tempElement.textContent === "--°C") {
                tempElement.textContent = "22°C";
            }
        });
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
}

/* ==========================================================================
   ٩. دەستپێکردنی کارەکانی پەڕە لە کاتی لۆدبوون (DOMContentLoaded)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    applyLanguageToDocument();
    applyTranslationsToMarkedElements();

    setupSmartSearch();
    renderDestinationsCards();
    renderTownPills();
    renderCategoryPills();
    renderServiceCards();
    renderServiceDetailsPage();

    setupBookingModal();
    setupLanguageSwitch();
    setupServiceActions();
    setupSmoothScrolling();
    setupLazyLoading();
    setupRevealAnimations();
    setupGalleryLightbox();
    updateCurrentYear();
    initWeatherWidget();
    registerServiceWorker();
});
