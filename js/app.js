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
let currentSearchKeyword = "";
let currentSortOrder = "default";
let showOnlyFavorites = false;
let activeBookingService = null;
const FAVORITES_STORAGE_KEY = "visitHalabjaFavorites";
let currentCurrency = localStorage.getItem("siteCurrency") || "IQD";

function formatServicePrice(service) {
    if (!service) return "";
    if (currentCurrency === "USD") {
        const usdPrice = Math.round((service.priceNumber || 75000) / 1500);
        if (currentLanguage === "ar") {
            return `$${usdPrice} / ليلة`;
        } else if (currentLanguage === "en") {
            return `$${usdPrice} / night`;
        } else {
            return `$${usdPrice} / شەو`;
        }
    }
    return t(service.price);
}

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
        navSettings: "ڕێکخستن",
        tabHome: "سەرەکی",
        tabServices: "مانەوە",
        tabDestinations: "دەڤەرەکان",
        tabGallery: "گەلەری",
        tabFavorites: "دڵخوازەکان",
        tabSettings: "سیتینگ",
        settingsTitle: "⚙️ ڕێکخستنەکانی ئەپڵیکەیشن",
        settingsSubtitle: "شێوازی پیشاندان، زمان، دراو و تایبەتمەندییەکان بە دڵی خۆت بگۆڕە",
        settingsAppName: "گەشتی هەڵەبجە و هەورامان",
        settingsAppTagline: "پلاتفۆرمی فەرمی بۆ خانووی گەشتیاری و مانەوە",
        settingsGroupPreferences: "ڕێکخستنی شاشە و گشتی",
        settingsDarkModeTitle: "دۆخی شەو (Dark Mode)",
        settingsDarkModeSubtitle: "پاشەکەوتکردنی وزە و ئاسوودەیی چاو لە تاریکیدا",
        settingsCurrencyTitle: "دراوی نرخەکان (Currency)",
        settingsCurrencySubtitle: "گۆڕینی هەموو نرخەکان لەنێوان دینار و دۆلار",
        settingsLangTitle: "زمانی بەرنامە",
        settingsLangSubtitle: "کوردی • عربي • English",
        settingsGroupServices: "فریاگوزاری و خزمەتگوزاری",
        settingsNotifTitle: "ئاگاداریی داشکاندن و شوێنی نوێ",
        settingsNotifSubtitle: "ئاگادارکردنەوە لە بۆنە و پشووەکاندا",
        settingsPoliceTitle: "پۆلیسی گەشتوگوزار و هاوکاری",
        settingsPoliceSubtitle: "هێڵی گەرمی بەردەوام (تەلەفۆن: 104)",
        settingsAmbulanceTitle: "فریاکەوتنی تەندروستی هەڵەبجە",
        settingsAmbulanceSubtitle: "فریاگوزاریی خێرا (تەلەفۆن: 122)",
        settingsGroupData: "زانیاری و بەڕێوەبردن",
        settingsClearTitle: "خاوێنکردنەوەی کەش و داتا",
        settingsClearSubtitle: "نوێکردنەوەی داتای شوێنەکان و ڕێکخستنەکان",
        settingsBackHome: "گەڕانەوە",
        settingsPageHeader: "⚙️ ڕێکخستنەکان",
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
        detailFormSubmit: "ناردنی داواکاری بۆ WhatsApp",
        searchKeywordLabel: "🔍 گەڕان بە دەق",
        searchKeywordPlaceholder: "ناوی شوێن، ڤێلا، حەوز، کەپر...",
        filterFavorites: "دڵخوازەکانم",
        favAddBtn: "زیادکردن بۆ دڵخوازەکان",
        favRemoveBtn: "سڕینەوە لە دڵخوازەکان",
        sortByLabel: "ڕیزبەندی:",
        sortDefault: "پێشنیارکراو",
        sortPriceAsc: "نرخ: کەم بۆ زۆر",
        sortPriceDesc: "نرخ: زۆر بۆ کەم",
        sortRatingDesc: "بەرزترین هەڵسەنگاندن",
        shareBtnText: "هاوبەشکردنی شوێن",
        shareSuccessAlert: "لینکی شوێنەکە بە سەرکەوتوویی کۆپی کرا!",
        resultsCountText: "شوێن بەردەستە",
        viewToggleAria: "شێوازی پیشاندان",
        viewGridTitle: "پیشاندانی ٢ ستوونی",
        viewGridAria: "پیشاندانی ٢ ستوونی",
        viewListTitle: "پیشاندانی ١ ستوونی",
        viewListAria: "پیشاندانی ١ ستوونی",
        hostModalBadge: "تۆمارکردنی موڵکی نوێ",
        hostModalTitle: "شوێنەکەت لە پلاتفۆرمی Visit Halabja تۆمار بکە",
        hostModalSubtitle: "فۆرمەکە پڕبکەرەوە و بە یەک کلیک زانیارییەکان بنێرە بۆ بەڕێوەبەر لە WhatsApp:",
        hostFormOwnerLabel: "👤 ناوی خاوەن موڵک",
        hostFormPhoneLabel: "📞 ژمارەی مۆبایل / WhatsApp",
        hostFormPropertyLabel: "🏡 ناوی شوێن یان ڤێلاکەت",
        hostFormTownLabel: "📍 دەڤەر / ناوچە",
        hostFormCategoryLabel: "🏷️ جۆری شوێن",
        hostFormPriceLabel: "💰 نرخی خەمڵێنراو (شەوانە/ڕۆژانە)",
        hostFormNotesLabel: "📝 تایبەتمەندی و تێبینی زیاتر",
        hostSubmitBtn: "ناردنی زانیاریی موڵک بۆ WhatsApp 📲",
        viewsTodayText: "ئەمڕۆ",
        viewsTodaySuffix: "کەس سەیریان کردووە",
        viewsSuffix: "بینەر",
        detailNearbyAttractions: "لە دەوروبەری ئەم شوێنە چی هەیە؟"
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
        navSettings: "الإعدادات",
        tabHome: "الرئيسية",
        tabServices: "الإقامة",
        tabDestinations: "المناطق",
        tabGallery: "المعرض",
        tabFavorites: "المفضلة",
        tabSettings: "الإعدادات",
        settingsTitle: "⚙️ إعدادات التطبيق",
        settingsSubtitle: "تخصيص المظهر، اللغة، العملة والتفضيلات بسهولة",
        settingsAppName: "سياحة حلبجة وهورامان",
        settingsAppTagline: "المنصة الرسمية للإقامة والبيوت السياحية",
        settingsGroupPreferences: "التفضيلات والمظهر",
        settingsDarkModeTitle: "الوضع الليلي (Dark Mode)",
        settingsDarkModeSubtitle: "راحة للعين وتوفير طاقة البطارية",
        settingsCurrencyTitle: "عملة الأسعار (Currency)",
        settingsCurrencySubtitle: "التحويل الفوري بين الدينار والدولار",
        settingsLangTitle: "لغة التطبيق",
        settingsLangSubtitle: "کوردی • عربي • English",
        settingsGroupServices: "الطوارئ والخدمات",
        settingsNotifTitle: "إشعارات العروض والأماكن الجديدة",
        settingsNotifSubtitle: "تنبيهات في المناسبات والعطل",
        settingsPoliceTitle: "شرطة السياحة والمساعدة",
        settingsPoliceSubtitle: "الخط الساخن المستمر (هاتف: 104)",
        settingsAmbulanceTitle: "طوارئ الإسعاف والإنقاذ",
        settingsAmbulanceSubtitle: "طوارئ صحية سريعة (هاتف: 122)",
        settingsGroupData: "البيانات والإدارة",
        settingsClearTitle: "مسح الذاكرة المؤقتة",
        settingsClearSubtitle: "تحديث البيانات وإعادة ضبط التفضيلات",
        settingsBackHome: "رجوع",
        settingsPageHeader: "⚙️ الإعدادات",
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
        detailFormSubmit: "إرسال الطلب إلى WhatsApp",
        searchKeywordLabel: "🔍 بحث نصي",
        searchKeywordPlaceholder: "اسم المكان، فيلا، مسبح، كوخ...",
        filterFavorites: "المفضلة",
        favAddBtn: "إضافة إلى المفضلة",
        favRemoveBtn: "إزالة من المفضلة",
        sortByLabel: "الترتيب:",
        sortDefault: "الموصى به",
        sortPriceAsc: "السعر: من الأقل للأعلى",
        sortPriceDesc: "السعر: من الأعلى للأقل",
        sortRatingDesc: "الأعلى تقييماً",
        shareBtnText: "مشاركة هذا المكان",
        shareSuccessAlert: "تم نسخ رابط المكان بنجاح!",
        resultsCountText: "مكان متوفر",
        viewToggleAria: "طريقة العرض",
        viewGridTitle: "عرض عمودين",
        viewGridAria: "عرض عمودين",
        viewListTitle: "عرض عمود واحد",
        viewListAria: "عرض عمود واحد",
        hostModalBadge: "تسجيل عقار جديد",
        hostModalTitle: "سجل مكانك في منصة Visit Halabja",
        hostModalSubtitle: "املأ البيانات وتواصل معنا مباشرة عبر واتساب لإدراج عقارك:",
        hostFormOwnerLabel: "👤 اسم صاحب العقار",
        hostFormPhoneLabel: "📞 رقم الهاتف / واتساب",
        hostFormPropertyLabel: "🏡 اسم المكان أو الفيلا",
        hostFormTownLabel: "📍 المنطقة",
        hostFormCategoryLabel: "🏷️ نوع الإقامة",
        hostFormPriceLabel: "💰 السعر التقديري (ليلي / يومي)",
        hostFormNotesLabel: "📝 تفاصيل ومميزات إضافية",
        hostSubmitBtn: "إرسال بيانات العقار إلى WhatsApp 📲",
        viewsTodayText: "اليوم",
        viewsTodaySuffix: "شخص شاهدوا هذا المكان",
        viewsSuffix: "مشاهدة",
        detailNearbyAttractions: "أبرز المعالم والخدمات القريبة من هذا المكان:"
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
        navSettings: "Settings",
        tabHome: "Home",
        tabServices: "Stays",
        tabDestinations: "Places",
        tabGallery: "Gallery",
        tabFavorites: "Favorites",
        tabSettings: "Settings",
        settingsTitle: "⚙️ App Settings",
        settingsSubtitle: "Customize appearance, language, currency and preferences",
        settingsAppName: "Visit Halabja & Hawraman",
        settingsAppTagline: "Official Platform for Tourist Stays & Cabins",
        settingsGroupPreferences: "Display & Preferences",
        settingsDarkModeTitle: "Dark Mode",
        settingsDarkModeSubtitle: "Eye comfort and battery saving",
        settingsCurrencyTitle: "Display Currency",
        settingsCurrencySubtitle: "Toggle between IQD and USD instantly",
        settingsLangTitle: "App Language",
        settingsLangSubtitle: "Kurdish • Arabic • English",
        settingsGroupServices: "Helplines & Services",
        settingsNotifTitle: "Offers & New Stays Notifications",
        settingsNotifSubtitle: "Alerts on holidays and special weekends",
        settingsPoliceTitle: "Tourism Police & Help",
        settingsPoliceSubtitle: "Emergency helpline (Phone: 104)",
        settingsAmbulanceTitle: "Ambulance & Healthcare",
        settingsAmbulanceSubtitle: "Emergency hotline (Phone: 122)",
        settingsGroupData: "Data & App Info",
        settingsClearTitle: "Clear App Cache",
        settingsClearSubtitle: "Reset local data and preferences",
        settingsBackHome: "Back",
        settingsPageHeader: "⚙️ Settings",
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
        detailFormSubmit: "Send Request to WhatsApp",
        searchKeywordLabel: "🔍 Keyword Search",
        searchKeywordPlaceholder: "Name, villa, pool, hut...",
        filterFavorites: "Favorites",
        favAddBtn: "Add to Favorites",
        favRemoveBtn: "Remove from Favorites",
        sortByLabel: "Sort by:",
        sortDefault: "Recommended",
        sortPriceAsc: "Price: Low to High",
        sortPriceDesc: "Price: High to Low",
        sortRatingDesc: "Highest Rated",
        shareBtnText: "Share this place",
        shareSuccessAlert: "Link copied to clipboard successfully!",
        resultsCountText: "places found",
        viewToggleAria: "View layout mode",
        viewGridTitle: "2-Column Grid View",
        viewGridAria: "2-Column Grid View",
        viewListTitle: "1-Column List View",
        viewListAria: "1-Column List View",
        hostModalBadge: "List a New Property",
        hostModalTitle: "List Your Place on Visit Halabja",
        hostModalSubtitle: "Fill in the details to submit your listing directly via WhatsApp:",
        hostFormOwnerLabel: "👤 Property Owner Name",
        hostFormPhoneLabel: "📞 Phone / WhatsApp Number",
        hostFormPropertyLabel: "🏡 Property or Villa Name",
        hostFormTownLabel: "📍 Destination / Town",
        hostFormCategoryLabel: "🏷️ Property Type",
        hostFormPriceLabel: "💰 Estimated Rate (per night / day)",
        hostFormNotesLabel: "📝 Features & Extra Notes",
        hostSubmitBtn: "Send Listing Details via WhatsApp 📲",
        viewsTodayText: "Today",
        viewsTodaySuffix: "people viewed this place",
        viewsSuffix: "views",
        detailNearbyAttractions: "Nearby Attractions & Amenities:"
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
    if (titleElement) {
        if (document.getElementById("serviceDetailsRoot")) {
            // Managed in renderServiceDetailsPage
        } else if (document.getElementById("darkModeToggle")) {
            titleElement.textContent = (currentLanguage === "ar" ? "الإعدادات – Visit Halabja" : currentLanguage === "en" ? "Settings – Visit Halabja" : "ڕێکخستنەکان – Visit Halabja");
        } else {
            titleElement.textContent = ui("pageTitleHome");
        }
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
            switchLanguageEverywhere(selectedLanguage);
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
   بەڕێوەبردنی دڵخوازەکان (Favorites / Wishlist)
   ========================================================================== */
function getFavorites() {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (_) {
        return [];
    }
}

function isFavorite(serviceId) {
    return getFavorites().includes(serviceId);
}

function toggleFavorite(serviceId) {
    if (!serviceId) return false;
    let favs = getFavorites();
    const index = favs.indexOf(serviceId);
    let added = false;
    if (index > -1) {
        favs.splice(index, 1);
        added = false;
    } else {
        favs.push(serviceId);
        added = true;
    }
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
    } catch (_) {}
    updateFavoritesUI();
    return added;
}

function updateFavoritesUI() {
    const favs = getFavorites();
    const countEl = document.getElementById("favCountBadge");
    if (countEl) {
        countEl.textContent = favs.length;
    }

    document.querySelectorAll("[data-fav-id]").forEach((btn) => {
        const id = btn.dataset.favId;
        const active = favs.includes(id);
        btn.classList.toggle("is-active", active);
        if (btn.classList.contains("service-action-circle-btn")) {
            btn.innerHTML = active ? "❤️" : "🤍";
        }
    });

    const detailFavBtn = document.getElementById("detailFavBtn");
    if (detailFavBtn && detailFavBtn.dataset.favId) {
        const isFav = favs.includes(detailFavBtn.dataset.favId);
        detailFavBtn.classList.toggle("is-active", isFav);
        detailFavBtn.innerHTML = isFav ? `❤️ ${ui("favRemoveBtn")}` : `🤍 ${ui("favAddBtn")}`;
    }
}

/* ==========================================================================
   هاوبەشکردنی شوێن (Web Share API & Clipboard Fallback)
   ========================================================================== */
function shareService(service) {
    if (!service) return;
    const currentBase = window.location.href.split("?")[0].replace(/\/[^/]*$/, "/");
    const serviceUrl = `${currentBase}service-details.html?id=${encodeURIComponent(service.id)}`;
    const title = `${t(service.name)} – Visit Halabja`;
    const text = `${t(service.name)} (${t(service.townName)}): ${t(service.price)}`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: serviceUrl
        }).catch(() => {});
    } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(serviceUrl).then(() => {
                alert(ui("shareSuccessAlert"));
            }).catch(() => {
                window.prompt("کۆپیکردنی لینک:", serviceUrl);
            });
        } else {
            window.prompt("کۆپیکردنی لینک:", serviceUrl);
        }
    }
}

/* ==========================================================================
   دروستکردنی نامەی WhatsApp بە فرەزمانی (Multilingual WhatsApp Booking)
   ========================================================================== */
function generateWhatsAppBookingMessage(service, details) {
    const { fullName, phone, visitDate, duration, guests, notes } = details;
    const localizedServiceName = t(service.name);
    const localizedTownName = t(service.townName);
    const localizedPrice = t(service.price);

    if (currentLanguage === "ar") {
        return [
            "👋 مرحباً إدارة منصة Visit Halabja،",
            "لدي طلب حجز عبر الموقع الإلكتروني:",
            "------------------------------------",
            `🏡 المكان: ${localizedServiceName}`,
            `📍 المنطقة: ${localizedTownName}`,
            `💵 السعر: ${localizedPrice}`,
            "------------------------------------",
            `👤 اسم الضيف: ${fullName}`,
            `📞 رقم التواصل: ${phone}`,
            `📅 تاريخ الزيارة: ${visitDate}`,
            `⏳ مدة الإقامة: ${duration}`,
            `👥 عدد الأشخاص: ${guests}`,
            `📝 ملاحظات خاصة: ${notes}`,
            "------------------------------------",
            "💳 يرجى تزويدي بمعلومات دفع العربون وتأكيد الحجز."
        ].join("\n");
    }

    if (currentLanguage === "en") {
        return [
            "👋 Hello Visit Halabja Team,",
            "I would like to submit a booking request via the website:",
            "------------------------------------",
            `🏡 Accommodation: ${localizedServiceName}`,
            `📍 Destination: ${localizedTownName}`,
            `💵 Price: ${localizedPrice}`,
            "------------------------------------",
            `👤 Guest Name: ${fullName}`,
            `📞 Contact Phone: ${phone}`,
            `📅 Check-in Date: ${visitDate}`,
            `⏳ Duration of Stay: ${duration}`,
            `👥 Number of Guests: ${guests}`,
            `📝 Special Notes: ${notes}`,
            "------------------------------------",
            "💳 Please provide deposit details and confirmation."
        ].join("\n");
    }

    // بنەڕەتی: کوردی
    return [
        "👋 سڵاو بەڕێوەبەری پلاتفۆرمی Visit Halabja،",
        "داواکاری حیجزکردنم هەیە لە ڕێگەی وێبسایتەکەوە:",
        "------------------------------------",
        `🏡 شوێن: ${localizedServiceName}`,
        `📍 دەڤەر: ${localizedTownName}`,
        `💵 نرخ: ${localizedPrice}`,
        "------------------------------------",
        `👤 ناوی میوان: ${fullName}`,
        `📞 ژمارەی پەیوەندی: ${phone}`,
        `📅 بەرواری هاتن: ${visitDate}`,
        `⏳ ماوەی مانەوە: ${duration}`,
        `👥 ژمارەی کەسەکان: ${guests}`,
        `📝 تێبینی تایبەت: ${notes}`,
        "------------------------------------",
        "💳 تکایە زانیاری پێشەکی و تەئکیدکردنەوەم بۆ بنێرە."
    ].join("\n");
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
    const keywordInput = document.getElementById("searchKeywordInput");
    const townSelect = document.getElementById("searchTownSelect");
    const categorySelect = document.getElementById("searchCategorySelect");
    const submitBtn = document.getElementById("searchSubmitBtn");

    if (keywordInput) {
        keywordInput.value = currentSearchKeyword;
        if (!keywordInput.dataset.bound) {
            keywordInput.dataset.bound = "true";
            keywordInput.addEventListener("input", () => {
                currentSearchKeyword = keywordInput.value.trim();
                renderServiceCards();
            });
        }
    }

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
            if (keywordInput) {
                currentSearchKeyword = keywordInput.value.trim();
            }

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
    const keywordInput = document.getElementById("searchKeywordInput");
    const townSelect = document.getElementById("searchTownSelect");
    const categorySelect = document.getElementById("searchCategorySelect");
    if (keywordInput) keywordInput.value = currentSearchKeyword;
    if (townSelect) townSelect.value = currentSelectedTown;
    if (categorySelect) categorySelect.value = currentSelectedCategory;
}

function setupServicesToolbar() {
    const favFilterBtn = document.getElementById("favFilterBtn");
    const sortSelect = document.getElementById("servicesSortSelect");
    const viewToggle = document.getElementById("viewModeToggle");
    const servicesGrid = document.getElementById("servicesGrid");

    if (favFilterBtn && !favFilterBtn.dataset.bound) {
        favFilterBtn.dataset.bound = "true";
        favFilterBtn.addEventListener("click", () => {
            showOnlyFavorites = !showOnlyFavorites;
            favFilterBtn.classList.toggle("is-active", showOnlyFavorites);
            renderServiceCards();
        });
    }

    if (sortSelect && !sortSelect.dataset.bound) {
        sortSelect.dataset.bound = "true";
        sortSelect.addEventListener("change", () => {
            currentSortOrder = sortSelect.value;
            renderServiceCards();
        });
    }

    if (viewToggle && servicesGrid && !viewToggle.dataset.bound) {
        viewToggle.dataset.bound = "true";
        const savedView = localStorage.getItem("visitHalabjaViewMode") || "grid";
        applyViewMode(savedView);

        viewToggle.addEventListener("click", (e) => {
            const btn = e.target.closest(".view-mode-btn");
            if (!btn) return;
            const mode = btn.dataset.view;
            applyViewMode(mode);
            try {
                localStorage.setItem("visitHalabjaViewMode", mode);
            } catch (_) {}
        });
    }

    function applyViewMode(mode) {
        if (!servicesGrid || !viewToggle) return;
        if (mode === "list") {
            servicesGrid.classList.add("is-list-view");
        } else {
            servicesGrid.classList.remove("is-list-view");
        }

        viewToggle.querySelectorAll(".view-mode-btn").forEach((btn) => {
            const isActive = btn.dataset.view === mode;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }
}

/* ==========================================================================
   ٤. کارتەکانی خزمەتگوزاری بە فلتەرکردنی داینامیکی (Service Cards)
   ========================================================================== */
function renderServiceCards() {
    const servicesGrid = document.getElementById("servicesGrid");
    const allServices = getServiceList();
    const favs = getFavorites();

    if (!servicesGrid) {
        return;
    }

    // پاڵاوتن بەپێی دەڤەر، جۆری خزمەتگوزاری، دڵخوازەکان، و گەڕانی دەقی
    const filteredServices = allServices.filter((service) => {
        const matchesTown = currentSelectedTown === "all" || service.town === currentSelectedTown;
        const matchesCategory = currentSelectedCategory === "all" || service.categoryType === currentSelectedCategory;
        const matchesFavorites = !showOnlyFavorites || favs.includes(service.id);

        let matchesKeyword = true;
        if (currentSearchKeyword) {
            const kw = currentSearchKeyword.toLowerCase();
            const searchData = [
                t(service.name),
                t(service.description),
                t(service.townName),
                t(service.category),
                t(service.locationText || ""),
                ...(Array.isArray(service.features) ? service.features.map((f) => t(f)) : [])
            ]
                .join(" ")
                .toLowerCase();
            matchesKeyword = searchData.includes(kw);
        }

        return matchesTown && matchesCategory && matchesFavorites && matchesKeyword;
    });

    // ڕیزبەندکردن (Sorting)
    if (currentSortOrder === "price-asc") {
        filteredServices.sort((a, b) => (a.priceNumber || 0) - (b.priceNumber || 0));
    } else if (currentSortOrder === "price-desc") {
        filteredServices.sort((a, b) => (b.priceNumber || 0) - (a.priceNumber || 0));
    } else if (currentSortOrder === "rating-desc") {
        filteredServices.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // نوێکردنەوەی ژمارەی ئەنجامەکان
    const resultsCountEl = document.getElementById("resultsCountBadge");
    if (resultsCountEl) {
        resultsCountEl.textContent = `${filteredServices.length} ${ui("resultsCountText")}`;
    }

    // نوێکردنەوەی ژمارەی دڵخوازەکان
    const favBadge = document.getElementById("favCountBadge");
    if (favBadge) {
        favBadge.textContent = favs.length;
    }

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
            const priceText = formatServicePrice(service);
            const rating = service.rating || 4.9;
            const reviewsCount = service.reviewsCount || 25;
            const isFav = favs.includes(service.id);
            const viewsCount = service.viewsCount || 1240;
            const viewsToday = service.viewsToday || 18;
            const isVip = Boolean(service.isFeatured);

            const amenitiesPills = Array.isArray(service.features)
                ? `<div class="card-amenities">` +
                  service.features.slice(0, 3).map((f) => `<span class="amenity-tag">✨ ${t(f)}</span>`).join("") +
                  `</div>`
                : "";

            const featuresHtml = Array.isArray(service.features)
                ? service.features.slice(0, 3).map((f) => `<li class="service-feature-chip">✓ ${t(f)}</li>`).join("")
                : "";

            return `
                <article class="service-card reveal ${isVip ? "is-vip-card" : ""}" data-service-id="${service.id}">
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
                        ${isVip ? `<span class="service-vip-badge">⭐ VIP</span>` : ""}
                        <div class="service-card-actions">
                            <button
                                class="service-action-circle-btn ${isFav ? "is-active" : ""}"
                                type="button"
                                data-fav-id="${service.id}"
                                title="${ui("filterFavorites")}"
                                aria-label="${ui("filterFavorites")}"
                            >
                                ${isFav ? "❤️" : "🤍"}
                            </button>
                            <button
                                class="service-action-circle-btn"
                                type="button"
                                data-share-id="${service.id}"
                                title="${ui("shareBtnText")}"
                                aria-label="${ui("shareBtnText")}"
                            >
                                🔗
                            </button>
                        </div>
                    </div>
                    <div class="service-body">
                        <div class="service-card-meta-top">
                            <span class="service-town-tag">📍 ${townName}</span>
                            <span class="service-views-badge" title="بینین">👁 ${viewsCount.toLocaleString()}</span>
                            <span class="service-rating">★ ${rating} <small class="service-rating-count">(${reviewsCount})</small></span>
                        </div>
                        <h3>${serviceName}</h3>
                        <p>${description}</p>

                        <div class="service-social-proof">🔥 ${ui("viewsTodayText")} ${viewsToday} ${ui("viewsTodaySuffix")}</div>

                        ${amenitiesPills}

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
    currentSearchKeyword = "";
    showOnlyFavorites = false;
    currentSortOrder = "default";

    const kw = document.getElementById("searchKeywordInput");
    if (kw) kw.value = "";

    const sortSel = document.getElementById("servicesSortSelect");
    if (sortSel) sortSel.value = "default";

    const favBtn = document.getElementById("favFilterBtn");
    if (favBtn) favBtn.classList.remove("is-active");

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

            // دروستکردنی نامەیەکی شیک و ڕێکخراو بۆ WhatsApp بەپێی زمانی چالاک
            const messageText = generateWhatsAppBookingMessage(activeBookingService, {
                fullName,
                phone,
                visitDate,
                duration,
                guests,
                notes
            });

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
    const dateInput = document.getElementById("bookingDateInput");

    if (nameEl) nameEl.textContent = t(service.name);
    if (townEl) townEl.textContent = `📍 ${t(service.townName)}`;
    if (priceEl) priceEl.textContent = `💵 ${t(service.price)}`;

    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
        if (!dateInput.value) {
            dateInput.value = today;
        }
    }

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
   تۆمارکردنی شوێن لەلایەن خاوەن موڵک (Host Onboarding Modal)
   ========================================================================== */
function setupHostModal() {
    const modal = document.getElementById("hostModal");
    const openBtn = document.getElementById("openHostModalBtn");
    const closeBtn = document.getElementById("hostModalClose");
    const form = document.getElementById("hostModalForm");

    if (!modal) {
        return;
    }

    function openModal() {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        const firstInput = modal.querySelector("input");
        if (firstInput) firstInput.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (openBtn) {
        openBtn.addEventListener("click", openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const ownerName = document.getElementById("hostOwnerName")?.value.trim() || "";
            const phone = document.getElementById("hostPhone")?.value.trim() || "";
            const propertyName = document.getElementById("hostPropertyName")?.value.trim() || "";
            const town = document.getElementById("hostTownSelect")?.value || "";
            const category = document.getElementById("hostCategorySelect")?.value || "";
            const price = document.getElementById("hostPriceInput")?.value.trim() || "ڕێککەوتن لەسەر نرخ";
            const notes = document.getElementById("hostNotes")?.value.trim() || "تێبینی نییە";

            if (!ownerName || !phone || !propertyName) {
                alert("تکایە ناوی خاوەن موڵک، ژمارەی پەیوەندی و ناوی شوێنەکە بنووسە.");
                return;
            }

            const message = [
                "🏡 *داواکاریی نوێی تۆمارکردنی شوێن لە پلاتفۆرمی Visit Halabja*",
                "------------------------------------",
                `👤 *ناوی خاوەن موڵک:* ${ownerName}`,
                `📞 *مۆبایل / WhatsApp:* ${phone}`,
                `📍 *دەڤەر / ناوچە:* ${town}`,
                `🏷️ *جۆری شوێن:* ${category}`,
                `🏡 *ناوی شوێن:* ${propertyName}`,
                `💰 *نرخی شەوانە/ڕۆژانە:* ${price}`,
                `📝 *تایبەتمەندی و تێبینی زیاتر:* ${notes}`,
                "------------------------------------",
                "تکایە شوێنەکەم لە ماڵپەڕ/ئەپڵیکەیشن دابنێن بۆ حجزکردن. سوپاس!"
            ].join("\n");

            const targetPhone = "9647510485057";
            const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank", "noopener");

            closeModal();
            form.reset();
        });
    }
}

/* ==========================================================================
   ٦. خزمەتگوزارییەکان و پەڕەی وردەکاری (Service Actions & Favorites / Share)
   ========================================================================= */
function setupServiceActions() {
    if (document.body.dataset.serviceActionsBound) {
        return;
    }
    document.body.dataset.serviceActionsBound = "true";

    document.addEventListener("click", (event) => {
        const favTrigger = event.target.closest("[data-fav-id]");
        if (favTrigger) {
            event.preventDefault();
            event.stopPropagation();
            const serviceId = favTrigger.dataset.favId;
            toggleFavorite(serviceId);
            if (showOnlyFavorites) {
                renderServiceCards();
            }
            return;
        }

        const shareTrigger = event.target.closest("[data-share-id]");
        if (shareTrigger) {
            event.preventDefault();
            event.stopPropagation();
            const serviceId = shareTrigger.dataset.shareId;
            const service = getServiceById(serviceId);
            if (service) {
                shareService(service);
            }
            return;
        }

        const waTrigger = event.target.closest("[data-whatsapp]");
        if (waTrigger) {
            openWhatsAppBooking(waTrigger.dataset.serviceName || "خزمەتگوزاری", waTrigger.dataset.whatsapp || "");
        }
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
    const servicePrice = formatServicePrice(service);
    const serviceLocation = t(service.locationText);
    const serviceOwnerName = t(service.ownerName);
    const serviceOwnerRole = t(service.ownerRole);
    const phoneLink = normalizePhoneForLink(service.phone || service.whatsapp || "");
    const viewsCount = service.viewsCount || 1420;
    const viewsToday = service.viewsToday || 24;

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

    const nearbyHtml = Array.isArray(service.nearbyAttractions) && service.nearbyAttractions.length > 0
        ? `
            <div class="detail-block">
                <h3>📍 ${ui("detailNearbyAttractions")}</h3>
                <ul class="detail-nearby-grid">
                    ${service.nearbyAttractions.map((att) => `
                        <li><span class="nearby-icon">✨</span> <span>${t(att)}</span></li>
                    `).join("")}
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
                        <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem;">
                            <span class="detail-badge">${serviceCategory} • 📍 ${serviceTown}</span>
                            ${service.isFeatured ? `<span class="service-vip-badge" style="display:inline-block;">⭐ VIP</span>` : ""}
                        </div>
                        <h1>${serviceTitle}</h1>
                        <p class="detail-lead">${serviceDescription}</p>
                        <div class="detail-social-proof-bar">
                            <span>👁 ${viewsCount.toLocaleString()} ${ui("viewsSuffix")}</span>
                            <span>🔥 ${ui("viewsTodayText")} ${viewsToday} ${ui("viewsTodaySuffix")}</span>
                            <span>🛡️ ${ui("heroHighlightGuarantee")}</span>
                        </div>
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
                            ${nearbyHtml}
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

                                <div class="detail-actions-stack">
                                    <button class="button button-primary full-width" type="button" data-quick-book="${service.id}">
                                        ${ui("quickBookBtn")}
                                    </button>
                                    <button class="button button-secondary full-width fav-toggle-btn ${isFavorite(service.id) ? "is-active" : ""}" type="button" id="detailFavBtn" data-fav-id="${service.id}">
                                        ${isFavorite(service.id) ? "❤️ " + ui("favRemoveBtn") : "🤍 " + ui("favAddBtn")}
                                    </button>
                                    <button class="button button-outline full-width share-btn" type="button" id="detailShareBtn" data-share-id="${service.id}">
                                        🔗 ${ui("shareBtnText")}
                                    </button>
                                </div>
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
    updateFavoritesUI();
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
    if (window.location.protocol === "file:") return;
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
}

function setupIosTabBar() {
    const tabItems = document.querySelectorAll(".ios-tab-item");
    if (!tabItems.length) return;

    tabItems.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabItems.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // Scroll spy بۆ دیاریکردنی تابی چالاک لە کاتی ڕۆیشتن بە پەڕەکەدا
    const sections = [
        { id: "top", tab: "home" },
        { id: "destinations", tab: "destinations" },
        { id: "services", tab: "services" },
        { id: "settings", tab: "settings" }
    ];

    window.addEventListener(
        "scroll",
        () => {
            const scrollPos = window.scrollY + 220;
            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionEl = document.getElementById(sections[i].id);
                if (sectionEl && scrollPos >= sectionEl.offsetTop) {
                    tabItems.forEach((t) => {
                        if (t.dataset.tab === sections[i].tab) {
                            t.classList.add("active");
                        } else {
                            t.classList.remove("active");
                        }
                    });
                    break;
                }
            }
        },
        { passive: true }
    );
}

function updateCurrencyUI(currency) {
    // ١. نوێکردنەوەی دوگمەکانی سیتینگ (Settings Segmented Control)
    document.querySelectorAll("#currencySegmented .ios-segment").forEach((btn) => {
        if (btn.dataset.currency === currency) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // ٢. نوێکردنەوەی دوگمەکانی شریتی سەرەوەی شوێنەکان (Toolbar Quick Currency Pill)
    document.querySelectorAll("#toolbarCurrencyPill .currency-mini-btn").forEach((btn) => {
        if (btn.dataset.currency === currency) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function setAppCurrency(newCurrency) {
    if (!newCurrency || !["IQD", "USD"].includes(newCurrency)) return;
    currentCurrency = newCurrency;
    localStorage.setItem("siteCurrency", currentCurrency);
    updateCurrencyUI(currentCurrency);
    renderServiceCards();
    renderServiceDetailsPage();
}

function updateLanguageUI(lang) {
    // ١. نوێکردنەوەی دوگمەی زمانی سیتینگ (Settings Segmented Control)
    document.querySelectorAll("#langSegmented .ios-segment").forEach((btn) => {
        if (btn.dataset.lang === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // ٢. نوێکردنەوەی دوگمەی زمانی سەرەوەی وێب و ئەپ (Header Language Switch)
    document.querySelectorAll(".language-button").forEach((btn) => {
        if (btn.dataset.language === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

function switchLanguageEverywhere(newLang) {
    if (!supportedLanguages.includes(newLang)) return;
    currentLanguage = newLang;
    localStorage.setItem("siteLanguage", currentLanguage);
    updateLanguageUI(currentLanguage);

    applyLanguageToDocument();
    applyTranslationsToMarkedElements();
    renderDestinationsCards();
    renderTownPills();
    renderCategoryPills();
    renderServiceCards();
    renderServiceDetailsPage();
    updateFavoritesUI();
    updateSearchDropdownState();
}

function setupIosSettings() {
    // ١. سیستەمی دۆخی تاریکی ئایفۆن (Apple iOS Native Dark Mode)
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkSaved = localStorage.getItem("siteDarkMode") === "true";

    function applyDarkMode(isDark) {
        document.documentElement.classList.toggle("dark-mode", isDark);
        if (document.body) {
            document.body.classList.toggle("dark-mode", isDark);
        }
        localStorage.setItem("siteDarkMode", isDark ? "true" : "false");
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute("content", isDark ? "#000000" : "#0f7b74");
        }
        if (darkModeToggle) {
            darkModeToggle.checked = isDark;
        }
    }

    if (isDarkSaved) {
        applyDarkMode(true);
    }

    if (darkModeToggle && !darkModeToggle.dataset.bound) {
        darkModeToggle.dataset.bound = "true";
        darkModeToggle.addEventListener("change", () => {
            applyDarkMode(darkModeToggle.checked);
        });
    }

    // ٢. دراوی نمایشکراو بە شێوازی Apple Segmented Control (IQD / USD)
    updateCurrencyUI(currentCurrency);

    // گوێگر لە دوگمەی سیتینگ
    const currencySegments = document.querySelectorAll("#currencySegmented .ios-segment");
    currencySegments.forEach((btn) => {
        if (!btn.dataset.bound) {
            btn.dataset.bound = "true";
            btn.addEventListener("click", () => {
                setAppCurrency(btn.dataset.currency);
            });
        }
    });

    // گوێگر لە دوگمەی شریتی شوێنەکان (Toolbar)
    const toolbarCurrencyBtns = document.querySelectorAll("#toolbarCurrencyPill .currency-mini-btn");
    toolbarCurrencyBtns.forEach((btn) => {
        if (!btn.dataset.bound) {
            btn.dataset.bound = "true";
            btn.addEventListener("click", () => {
                setAppCurrency(btn.dataset.currency);
            });
        }
    });

    // ٣. زمانی بەرنامە بە شێوازی Apple Segmented Control (کوردی • عربي • English)
    updateLanguageUI(currentLanguage);

    const langSegments = document.querySelectorAll("#langSegmented .ios-segment");
    langSegments.forEach((btn) => {
        if (!btn.dataset.bound) {
            btn.dataset.bound = "true";
            btn.addEventListener("click", () => {
                switchLanguageEverywhere(btn.dataset.lang);
            });
        }
    });

    // ٤. خاوێنکردنەوەی کەش و داتای ئەپ (Clear Cache)
    const clearCacheBtn = document.getElementById("clearCacheBtn");
    if (clearCacheBtn && !clearCacheBtn.dataset.bound) {
        clearCacheBtn.dataset.bound = "true";
        clearCacheBtn.addEventListener("click", () => {
            const confirmMsg = currentLanguage === "ar" 
                ? "هل ترغب في إعادة ضبط الإعدادات ومسح الذاكرة المؤقتة؟"
                : currentLanguage === "en" 
                ? "Do you want to reset settings and clear cached data?"
                : "ئایا دڵنیایت لە خاوێنکردنەوەی کەش و ڕێکخستنەکان؟";
            if (confirm(confirmMsg)) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            }
        });
    }

    // ٥. کرتەکردن لە تابی دڵخوازەکان (Favorites Trigger)
    const tabFavoritesTrigger = document.getElementById("tabFavoritesTrigger");
    if (tabFavoritesTrigger && !tabFavoritesTrigger.dataset.bound) {
        tabFavoritesTrigger.dataset.bound = "true";
        tabFavoritesTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            showOnlyFavorites = true;
            updateFavoritesUI();
            renderServiceCards();
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
            }
        });
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
    setupServicesToolbar();
    renderServiceCards();
    renderServiceDetailsPage();
    updateFavoritesUI();

    setupBookingModal();
    setupHostModal();
    setupLanguageSwitch();
    setupServiceActions();
    setupSmoothScrolling();
    setupLazyLoading();
    setupRevealAnimations();
    setupGalleryLightbox();
    updateCurrentYear();
    initWeatherWidget();
    registerServiceWorker();
    setupIosTabBar();
    setupIosSettings();
});

