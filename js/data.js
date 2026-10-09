/*
    Visit Halabja - پلاتفۆرمی فەرمیی گەشتیاری و حجزکردنی هەڵەبجە و هەورامان
    دەڤەرە سەرەکییەکان:
    ١. نەوڕۆڵی
    ٢. تەوێڵە
    ٣. بیارە
    ٤. ئەحمەدئاوا و زەڵم
    ٥. خورماڵ

    تێبینی: بەپێی داواکاری، ئێستا گرنگی تەواو دراوە بە (خانووی گەشتیاری، ڤێلا، کەپر، چالاکییەکان وەک بەلەم، جێتسکی، ماتۆڕسواری)
    و بەشی چێشتخانە لە قۆناغەکانی داهاتوودا بە فراوانی زیاد دەکرێت.
*/

function localize(ku, ar, en) {
    return { ku, ar, en };
}

/* 
    ===================================================================
    ١. داتای دەڤەر و شارۆچکە گەشتیارییەکان بەپێی ڕیزبەندی داواکراو
    ===================================================================
*/
const towns = [
    {
        id: "all",
        name: localize("هەموو دەڤەرەکان", "كل المناطق", "All Destinations"),
        count: 0
    },
    {
        id: "nawroli",
        name: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        title: localize("دانیشتن و مانەوە لەسەر ئاو، بەلەم و جێتسکی", "إقامة وجلسات فوق الماء وقوارب وجت سكي", "Riverfront stays, boat rides and jet ski"),
        image: "images/hero.jpg",
        badge: localize("کەناری ڕووبار", "على ضفاف النهر", "Riverfront"),
        stats: {
            houses: 9,
            activities: 3
        }
    },
    {
        id: "tawela",
        name: localize("تەوێڵە", "طويلة", "Tawela"),
        title: localize("کۆڵانە بەردینەکان، ئارامی و کلتووری هەورامی", "الأزقة الحجرية والهدوء والتراث الهورامي", "Stone-paved alleys, calm and Hawrami culture"),
        image: "images/nature.jpg",
        badge: localize("کلتووری و شاخی", "تراثي وجبلي", "Heritage"),
        stats: {
            houses: 4,
            activities: 1
        }
    },
    {
        id: "byara",
        name: localize("بیارە", "بيارة", "Byara"),
        title: localize("باخ و چنار و هەوای فێنکی هەورامان و ماتۆڕسواری", "بساتين وجبال هورامان العليلة ودبابات جبلية", "Lush gardens, crisp mountain air and ATVs"),
        image: "images/landscape.jpg",
        badge: localize("زۆر داواکراو", "الأكثر طلباً", "Popular"),
        stats: {
            houses: 6,
            activities: 2
        }
    },
    {
        id: "ahmad-awa",
        name: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm"),
        title: localize("تاڤگە بەرزەکان، چەمی سەوز و ڤێلای شاخاوی", "الشلالات الشاهقة والينابيع والفلل الجبلية", "Dramatic waterfalls, streams and mountain villas"),
        image: "images/nature.jpg",
        badge: localize("سروشتی دەوڵەمەند", "طبيعة ساحرة", "Scenic"),
        stats: {
            houses: 7,
            activities: 2
        }
    },
    {
        id: "khurmal",
        name: localize("خورماڵ", "خورمال", "Khurmal"),
        title: localize("مێژووی دێرین، باخی گوێز و ڤێلای خێزانی", "تاريخ عريق وبساتين وفلل عائلية هادئة", "Ancient heritage, lush orchards and calm family villas"),
        image: "images/activity.jpg",
        badge: localize("ئارام و خێزانی", "هادئ وعائلي", "Calm & Family"),
        stats: {
            houses: 5,
            activities: 1
        }
    }
];

/* 
    ===================================================================
    ٢. جۆرەکانی خزمەتگوزاری بۆ فلتەرکردن
    ===================================================================
*/
const serviceCategories = [
    {
        id: "all",
        name: localize("هەموو خزمەتگوزارییەکان", "جميع الخدمات", "All Services"),
        icon: "✨"
    },
    {
        id: "house",
        name: localize("خانووی گەشتیاری و ڤێلا", "بيوت سياحية وفلل", "Cabins & Villas"),
        icon: "🏡"
    },
    {
        id: "picnic",
        name: localize("کەپر و شوێنی دانیشتن", "أكواخ وجلسات نزهة", "Huts & Waterfront Decks"),
        icon: "🏕️"
    },
    {
        id: "activity",
        name: localize("چالاکی و کەیفوسەفا (بەلەم، ماتۆڕ)", "نشاطات ومغامرات (قوارب، دبابات)", "Activities & Fun"),
        icon: "🏎️"
    }
];

/* 
    ===================================================================
    ٣. لیستی خزمەتگوزارییەکان بەپێی ڕیزبەندیی (نەوڕۆڵی، تەوێڵە، بیارە، ئەحمەدئاوا، خورماڵ)
    ===================================================================
*/
const services = [
    /* ==================== ١. نەوڕۆڵی (Nawroli) ==================== */
    {
        id: "nawroli-water-house",
        town: "nawroli",
        townName: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        categoryType: "house",
        category: localize("خانووی سەر ئاو", "بيوت عائمة على الماء", "Floating Water House"),
        name: localize("خانووەکانی ناو ئاوی نەوڕۆڵی", "بيوت داخل ماء نورولي", "Nawroli Water Houses"),
        description: localize(
            "شوێنێکی ناوازە بۆ خێزان و هاوڕێیان، دانیشتن و مانەوە لەناو دڵی ئاو بە هەوای فێنک و دیمەنی ڕووبار.",
            "تجربة فريدة للعائلات والأصدقاء، إقامة وجلسات في قلب الماء بأجواء عليلة وإطلالة نهرية لا مثيل لها.",
            "An iconic experience sitting and staying right over the pristine river currents with refreshing breezes."
        ),
        price: localize("٧٥,٠٠٠ دینار / شەو", "٧٥,٠٠٠ دينار / ليلة", "75,000 IQD / night"),
        priceNumber: 75000,
        rating: 4.9,
        reviewsCount: 52,
        badge: localize("هەڵبژاردەی گەشتیاران", "خيار المسافرين الأول", "Traveler's Choice"),
        image: "images/xanu A1.jpg",
        gallery: ["images/xanu A1.jpg", "images/xanu A2.jpg", "images/xanu A3.jpg", "images/hero.jpg"],
        ownerName: localize("سەرپەرشتیاری خانووەکان", "مشرف البيوت", "Host"),
        ownerRole: localize("خاوەنی خزمەتگوزاری", "صاحب الخدمة", "Service Owner"),
        locationText: localize("نەوڕۆڵی، هەڵەبجە", "نورولي، حلبجة", "Nawroli, Halabja"),
        phone: "07500000000",
        whatsapp: "9647500000000",
        features: [
            localize("دانیشتن و سەکووی سەر ئاو", "جلسات فوق الماء مباشرة", "Direct over-water deck"),
            localize("ڕوانگەی ڕاستەوخۆ بۆ ڕووبار", "إطلالة مباشرة على النهر", "Direct river vista"),
            localize("تەواو پاکوخاوێن و خێزانی", "نظافة تامة وأجواء عائلية", "Family friendly & clean")
        ]
    },
    {
        id: "nawroli-family-villa",
        town: "nawroli",
        townName: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        categoryType: "house",
        category: localize("ڤێلای خێزانی", "فيلا عائلية", "Family Villa"),
        name: localize("ڤێلای کەنار ڕووباری نەوڕۆڵی", "فيلا ضفاف نهر نورولي", "Nawroli Riverside Villa"),
        description: localize(
            "ڤێلایەکی گەورە و ئاسوودە بە تەواوی پێداویستییەکانی نووستن و حەسانەوە، گونجاوە بۆ خێزان و گروپەکان.",
            "فيلا عائلية واسعة ومريحة مجهزة بكافة مستلزمات الإقامة والاسترخاء قرب النهر.",
            "Spacious and comfortable family villa equipped with all amenities right by the water."
        ),
        price: localize("٨٠,٠٠٠ دینار / شەو", "٨٠,٠٠٠ دينار / ليلة", "80,000 IQD / night"),
        priceNumber: 80000,
        rating: 4.8,
        reviewsCount: 34,
        badge: localize("تایبەت و خێزانی", "عائلي ومريح", "Family Comfort"),
        image: "images/xanu A2.jpg",
        gallery: ["images/xanu A2.jpg", "images/xanu A3.jpg", "images/landscape.jpg"],
        ownerName: localize("سەرپەرشتیاری ڤێلا", "مشرف الفيلا", "Villa Manager"),
        ownerRole: localize("خاوەن موڵک", "صاحب العقار", "Host"),
        locationText: localize("نەوڕۆڵی، بەشی سەرەوەی ڕووبار", "نورولي، الجزء العلوي", "Nawroli Upper River"),
        phone: "07500000000",
        whatsapp: "9647500000000",
        features: [
            localize("٢ ژووری نووستن + هۆڵی گەورە", "٢ غرف نوم + صالة واسعة", "2 Bedrooms + Large hall"),
            localize("سپلیت و گەرمکەرەوە و فێنککەرەوە", "تكييف وتدفئة", "Full AC & Heating"),
            localize("حەوشەی دانیشتن لە دەرەوە", "جلسة خارجية مريحة", "Outdoor patio seating")
        ]
    },
    {
        id: "nawroli-hana-zhala-huts",
        town: "nawroli",
        townName: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        categoryType: "picnic",
        category: localize("کەپری کەنار ئاو", "أكواخ ضفاف الماء", "Waterfront Huts"),
        name: localize("کەپرەکانی هانە ژاڵە", "أكواخ هانة ژالة", "Hana Zhala Huts"),
        description: localize(
            "کەپری تایبەت بۆ پشوودان و چێژوەرگرتن لە ژینگەی سروشتی و ئاوی فێنکی نەوڕۆڵی لەگەڵ خزمەتگوزاری چا و قاوە.",
            "أكواخ مريحة لوقت الاستراحة والاستمتاع بالأجواء الطبيعية ومياه نورولي العذبة مع خدمات الشاي والقهوة.",
            "Relaxing shaded huts for relaxing and enjoying the pristine river breeze of Nawroli."
        ),
        price: localize("١٥,٠٠٠ - ٢٥,٠٠٠ دینار / ڕۆژ", "١٥,٠٠٠ - ٢٥,٠٠٠ دينار / يوم", "15,000 - 25,000 IQD / day"),
        priceNumber: 20000,
        rating: 4.8,
        reviewsCount: 40,
        badge: localize("کەپری خێزانی", "أكواخ عائلية", "Family Huts"),
        image: "images/kapr A1.png",
        gallery: ["images/kapr A1.png", "images/landscape.jpg", "images/hero.jpg"],
        ownerName: localize("لوقمان حەمە عەزیز", "لقمان حمه عزيز", "Luqman Hama Aziz"),
        ownerRole: localize("خاوەنی کەپرەکان", "صاحب الأكواخ", "Huts Owner"),
        locationText: localize("کەپرەکانی هانە ژاڵە، نەوڕۆڵی", "أكواخ هانة ژالة، نورولي", "Hana Zhala Huts, Nawroli"),
        phone: "07500000000",
        whatsapp: "9647500000000",
        features: [
            localize("سێبەری چڕ و هەوای فێنک", "ظلال وافرة وهواء عليل", "Cool natural shade"),
            localize("دانیشتنی خێزانی و تایبەت", "جلسات عائلية مريحة", "Private family seating"),
            localize("چای خەڵوز و خواردنەوەی سارد", "شاي فحم ومشروبات باردة", "Charcoal tea & drinks")
        ]
    },
    {
        id: "nawroli-boats-jetski",
        town: "nawroli",
        townName: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        categoryType: "activity",
        category: localize("بەلەم و جێتسکی", "قوارب وجت سكي", "Boats & Jet Ski"),
        name: localize("کۆمەڵگەی چالاکییە ئاوییەکانی نەوڕۆڵی", "مجمع النشاطات المائية في نورولي", "Nawroli Water Sports & Boats"),
        description: localize(
            "گەڕان بە بەلەم لەگەڵ خێزان یان جێتسکی خێرا بۆ گەنجان بۆ ئەزموونکردنی ڕووبار بە شێوازێکی بێوێنە بە کەلوپەلی سەلامەتی.",
            "جولات قوارب هادئة للعائلات وتجربة جت سكي حماسية للشباب للاستمتاع بالنهر بطريقة لا تنسى مع معدات الأمان.",
            "Scenic boat rides for families and high-thrill jet skis on the river, fully equipped with life jackets."
        ),
        price: localize("١٥,٠٠٠ دینار / سواربوون", "١٥,٠٠٠ دينار / جولة", "15,000 IQD / ride"),
        priceNumber: 15000,
        rating: 4.9,
        reviewsCount: 61,
        badge: localize("چالاکی ئاوی", "نشاط مائي ممتع", "Water Activity"),
        image: "images/activity.jpg",
        gallery: ["images/activity.jpg", "images/landscape.jpg", "images/hero.jpg"],
        ownerName: localize("کاپتنی گەشتی نەوڕۆڵی", "كابتن الجولات", "Boat Captain"),
        ownerRole: localize("سەرپەرشتیاری بەلەمەکان", "مشرف النشاط المائي", "Activities Supervisor"),
        locationText: localize("نەوڕۆڵی، لەنگەری بەلەمەکان", "نورولي، مرسى القوارب", "Nawroli Boat Marina"),
        phone: "07500000000",
        whatsapp: "9647500000000",
        features: [
            localize("هێلەکی مەلە بۆ هەموو تەمەنێک", "سترات نجاة لجميع الأعمار", "Life jackets for all sizes"),
            localize("شۆفێری بە ئەزموون و کارامە", "سائقون محترفون وذوو خبرة", "Certified operators"),
            localize("وێنەگرتن لە ناوەڕاستی ئاو", "فرص تصوير مميزة وسط النهر", "Photo stops on water")
        ]
    },

    /* ==================== ٢. تەوێڵە (Tawela) ==================== */
    {
        id: "tawela-stone-house",
        town: "tawela",
        townName: localize("تەوێڵە", "طويلة", "Tawela"),
        categoryType: "house",
        category: localize("خانووی بەردینی شاخی", "بيت حجري جبلي", "Stone Mountain House"),
        name: localize("خانووی بەردینی هەورامی تەوێڵە", "البيت الحجري التراثي في طويلة", "Tawela Hawrami Stone House"),
        description: localize(
            "تەلارسازی بەردینی دێرینی هەورامان لەگەڵ پێداویستییە مۆدێرنەکان، ڕوانگەیەکی بێ وێنە لە لوتکەی تەوێڵەوە.",
            "عمارة حجرية تراثية أصيلة مع وسائل راحة حديثة وإطلالة شاهقة على مدرجات بلدة طويلة الساحرة.",
            "Traditional mountain stone architecture meets modern comfort with panoramic terraces looking over Tawela."
        ),
        price: localize("٨٠,٠٠٠ دینار / شەو", "٨٠,٠٠٠ دينار / ليلة", "80,000 IQD / night"),
        priceNumber: 80000,
        rating: 4.9,
        reviewsCount: 36,
        badge: localize("تایبەتمەند و کلتووری", "تراثي أصيل", "Heritage Gem"),
        image: "images/xanu A1.jpg",
        gallery: ["images/xanu A1.jpg", "images/nature.jpg", "images/landscape.jpg"],
        ownerName: localize("خاوەن خانوو (تەوێڵە)", "المالك (طويلة)", "Tawela Host"),
        ownerRole: localize("خاوەن موڵک", "صاحب العقار", "Host"),
        locationText: localize("تەوێڵە، گەڕەکی سەرەوە", "طويلة، الحي العلوي", "Tawela, Upper Quarter"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("دیزاینی کلتووری بەردین و دار", "تصميم حجري وخشبي تقليدي", "Authentic stone & wood craft"),
            localize("بان و باڵکۆنی گەورە بەرامبەر شاخ", "شرفة واسعة مقابلة للجبال", "Grand mountain-facing rooftop"),
            localize("تەواوی ئامێرەکانی گەرمکەرەوە و فێنککەرەوە", "تدفئة وتكييف متكامل", "Heating & AC ready")
        ]
    },
    {
        id: "tawela-mountain-cabin",
        town: "tawela",
        townName: localize("تەوێڵە", "طويلة", "Tawela"),
        categoryType: "house",
        category: localize("کابینەی شاخاوی", "كوخ جبلي", "Mountain Cabin"),
        name: localize("کابینەی بەرزاییەکانی تەوێڵە", "كوخ مرتفعات طويلة", "Tawela Heights Mountain Cabin"),
        description: localize(
            "کابینەیەکی دڵڕفێن لە بەرزاییەکانی تەوێڵە لە نێوان دار گوێزە کۆنەکاندا، هەوایەکی تەواو فێنک و دیمەنێکی بێ هاوتا.",
            "كوخ جبلي هادئ بين أشجار الجوز المعمرة وإطلالة خلابة على الطبيعة الجبلية.",
            "Quiet mountain cabin tucked among ancient walnut trees with refreshing mountain breezes."
        ),
        price: localize("٧٠,٠٠٠ دینار / شەو", "٧٠,٠٠٠ دينار / ليلة", "70,000 IQD / night"),
        priceNumber: 70000,
        rating: 4.8,
        reviewsCount: 25,
        badge: localize("ئارامی و فێنکی", "أجواء عليلة", "Cool & Calm"),
        image: "images/xanu A3.jpg",
        gallery: ["images/xanu A3.jpg", "images/landscape.jpg"],
        ownerName: localize("خاوەن کابینە", "المالك", "Host"),
        ownerRole: localize("سەرپەرشتیار", "المشرف", "Host"),
        locationText: localize("تەوێڵە، ڕێگای سەرەوە", "طويلة، الطريق العلوي", "Tawela Heights"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("باڵکۆنی گەورە بۆ وێنەگرتن", "شرفة واسعة للتصوير", "Scenic photography balcony"),
            localize("ئاو و کارەبای بەردەوام", "ماء وكهرباء مستمر", "24/7 Utilities"),
            localize("باربیکیو لە باخچەدا", "شواء في الحديقة", "Garden BBQ")
        ]
    },
    {
        id: "tawela-panoramic-deck",
        town: "tawela",
        townName: localize("تەوێڵە", "طويلة", "Tawela"),
        categoryType: "picnic",
        category: localize("سەکووی ڕوانگە و پشوو", "جلسات استراحة بانورامية", "Scenic Rest Deck"),
        name: localize("سەکووی پانۆرامای تەوێڵە", "جلسات إطلالة قمة طويلة", "Tawela Scenic Lookout & Picnic"),
        description: localize(
            "شوێنی تایبەتی دانیشتن و پشوودان بە دیمەنی ٣٦٠ پلەی تەوێڵە و شاخەکان، بە چای هەورامی و کەشێکی ئارام.",
            "جلسات مريحة للاستراحة مع إطلالة بانورامية رائعة على مدرجات بلدة طويلة مع الشاي الهورامي المميز.",
            "Panoramic relaxation decks overlooking the terraced village of Tawela."
        ),
        price: localize("١٠,٠٠٠ - ٢٠,٠٠٠ دینار / دانیشتن", "١٠,٠٠٠ - ٢٠,٠٠٠ دينار للجلسة", "10,000 - 20,000 IQD"),
        priceNumber: 15000,
        rating: 4.9,
        reviewsCount: 44,
        badge: localize("دیمەنی ٣٦٠ پلە", "إطلالة بانورامية", "360 View"),
        image: "images/nature.jpg",
        gallery: ["images/nature.jpg", "images/landscape.jpg"],
        ownerName: localize("کاک دانەر", "كاك دانر", "Kak Daner"),
        ownerRole: localize("سەرپەرشتیار", "المشرف", "Supervisor"),
        locationText: localize("تەوێڵە، لوتکەی سەیرانگا", "طويلة، القمة السياحية", "Tawela Summit"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("بەرزترین ڕوانگەی شارۆچکەکە", "أعلى نقطة مطلة في البلدة", "Highest lookout point"),
            localize("چای خەڵوز بە هەڵوژە و هێل", "شاي فحم بالهيل", "Cardamom charcoal tea"),
            localize("خاوێن و تایبەت بۆ خێزان", "نظيف وخاص للعائلات", "Private family setting")
        ]
    },

    /* ==================== ٣. بیارە (Byara) ==================== */
    {
        id: "byara-villa-chinar",
        town: "byara",
        townName: localize("بیارە", "بيارة", "Byara"),
        categoryType: "house",
        category: localize("ڤێلای گەشتیاری", "فيلا سياحية", "Tourist Villa"),
        name: localize("ڤێلای چناری بیارە", "فيلا شنار بيارة", "Byara Chinar Villa"),
        description: localize(
            "ڤێلایەکی تایبەت و ڕازاوە لە نێوان باخە بەرزەکاندا، خاوەنی باڵکۆنی گەورە و دیمەنی پانۆرامای شاخ.",
            "فيلا خاصة فاخرة بين البساتين العالية، تتميز بإطلالة بانورامية رائعة على الجبال.",
            "A private scenic villa set among lush walnut groves with panoramic mountain terraces."
        ),
        price: localize("٨٥,٠٠٠ دینار / شەو", "٨٥,٠٠٠ دينار / ليلة", "85,000 IQD / night"),
        priceNumber: 85000,
        rating: 4.9,
        reviewsCount: 38,
        badge: localize("داواکراوی هەفتە", "الأكثر طلباً", "Top Pick"),
        image: "images/xanu A1.jpg",
        gallery: ["images/xanu A1.jpg", "images/xanu A2.jpg", "images/xanu A3.jpg", "images/landscape.jpg"],
        ownerName: localize("خاوەن خانوو (تەئکیدکراو)", "المالك (معتمد)", "Verified Host"),
        ownerRole: localize("خاوەن موڵک لە بیارە", "صاحب العقار", "Property Owner"),
        locationText: localize("بیارە، نزیک باخەکانی سەرەوە", "بيارة، قرب البساتين العلوية", "Byara, Upper Orchards"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("٢ ژووری نووستن + هۆڵ", "٢ غرف نوم + صالة", "2 Bedrooms + Living room"),
            localize("سیستەمی فێنککەرەوە و سپلیت", "تكييف وسبلت", "Air conditioning"),
            localize("شوێنی باربیکیو و کەباب", "مكان مخصص للشواء", "BBQ area"),
            localize("پارکینی تایبەت بۆ ئۆتۆمبێل", "موقف سيارات خاص", "Private parking")
        ]
    },
    {
        id: "byara-cabin-hawraman",
        town: "byara",
        townName: localize("بیارە", "بيارة", "Byara"),
        categoryType: "house",
        category: localize("کابینەی شاخاوی", "كوخ جبلي", "Mountain Cabin"),
        name: localize("کابینەی باخی هەورامان", "أكواخ بساتين هورامان", "Hawraman Garden Cabin"),
        description: localize(
            "کابینەیەکی دڵڕفێنی دارین لە نێو دار گوێزەکاندا، بۆ مانەوەی ئارام و دوور لە جەنجاڵی ژیان.",
            "كوخ خشبي هادئ بين أشجار الجوز الشاهقة، تجربة إقامة استثنائية بعيداً عن صخب المدينة.",
            "Cozy wooden cabin surrounded by walnut trees, ideal for a quiet mountain retreat."
        ),
        price: localize("٦٥,٠٠٠ دینار / شەو", "٦٥,٠٠٠ دينار / ليلة", "65,000 IQD / night"),
        priceNumber: 65000,
        rating: 4.8,
        reviewsCount: 22,
        badge: localize("ئارام و خێزانی", "هادئ وعائلي", "Quiet Retreat"),
        image: "images/xanu A2.jpg",
        gallery: ["images/xanu A2.jpg", "images/xanu A3.jpg", "images/nature.jpg"],
        ownerName: localize("سەرپەرشتیاری کابینەکان", "مشرف الأكواخ", "Cabin Manager"),
        ownerRole: localize("کابینەی گەشتیاری", "إدارة الإقامة", "Host"),
        locationText: localize("بیارە، ڕێگای سەرچاوە", "بيارة، طريق النبع", "Byara, Spring Road"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("تەواو کەلوپەلی چێشتلێنان", "مطبخ متكامل التجهيزات", "Fully equipped kitchen"),
            localize("باڵکۆنی پانۆراما بۆ باخەکان", "شرفة مطلة على البساتين", "Panoramic orchard balcony"),
            localize("ئاو و کارەبای بەردەوام", "ماء وكهرباء مستمر", "24/7 Water & Power")
        ]
    },
    {
        id: "byara-atv-adventure",
        town: "byara",
        townName: localize("بیارە", "بيارة", "Byara"),
        categoryType: "activity",
        category: localize("ماتۆڕسواری شاخی", "دبابات وموتورات جبلية", "Mountain ATV & Quad"),
        name: localize("یانەی ماتۆڕسواری شاخاوی بیارە", "نادي الدبابات الجبلية في بيارة", "Byara Mountain ATV Adventure"),
        description: localize(
            "سەفەرێکی پڕ لە جۆش و خرۆش بە ڕێڕەوە شاخاوییەکاندا، بە ڕێنمایی ڕاهێنەری شارەزا و کەلوپەلی سەلامەتی.",
            "جولات دبابات مليئة بالحماس والمغامرة في المسارات الجبلية الوعرة مع معدات السلامة.",
            "Exciting quad bike / ATV trails across the picturesque mountain paths with safety gear."
        ),
        price: localize("٢٠,٠٠٠ دینار / ٣٠ خولەک", "٢٠,٠٠٠ دينار / ٣٠ دقيقة", "20,000 IQD / 30 mins"),
        priceNumber: 20000,
        rating: 4.9,
        reviewsCount: 54,
        badge: localize("چالاکیی دڵخواز", "نشاط مميز", "Exciting"),
        image: "images/activity.jpg",
        gallery: ["images/activity.jpg", "images/landscape.jpg"],
        ownerName: localize("کاپتن ئاراس", "كابتن أراس", "Captain Aras"),
        ownerRole: localize("ڕاهێنەری ماتۆڕسواری", "مدرب دبابات", "ATV Guide"),
        locationText: localize("بیارە، سەرەتای پێچە شاخاوییەکان", "بيارة، بداية المسار الجبلي", "Byara, Mountain Trail Head"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("کڵاو و پێداویستی سەلامەتی تەواو", "خوذات ومعدات سلامة كاملة", "Full safety equipment"),
            localize("ڕێڕەوی تایبەت بە وێنەگرتن", "مسارات مخصصة للتصوير", "Scenic photography stops"),
            localize("گونجاو بۆ تەمەنی سەروو ١٦ ساڵ", "مناسب للأعمار فوق ١٦", "Suitable for ages 16+")
        ]
    },

    /* ==================== ٤. ئەحمەدئاوا و زەڵم (Ahmad Awa & Zalm) ==================== */
    {
        id: "ahmad-awa-villa-zalm",
        town: "ahmad-awa",
        townName: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm"),
        categoryType: "house",
        category: localize("ڤێلای سەرچاوەی ئاو", "فيلا نبع الماء", "Waterfall Villa"),
        name: localize("ڤێلای تاڤگەی ئەحمەدئاوا", "فيلا شلال أحمد آوا", "Ahmad Awa Waterfall Villa"),
        description: localize(
            "ڤێلایەکی گەورە و شاهانە بە باخچەی تایبەت و ڕوانگەی ڕاستەوخۆ بۆ بەرزایی تاڤگەکە و شاخەکانی دەوروبەر.",
            "فيلا واسعة مميزة بحديقة خاصة وإطلالة مباشرة على مسار الشلال الرائع والجبال المحيطة.",
            "Spacious premium villa featuring a private garden and direct views of the roaring waterfall and surrounding peaks."
        ),
        price: localize("٩٠,٠٠٠ دینار / شەو", "٩٠,٠٠٠ دينار / ليلة", "90,000 IQD / night"),
        priceNumber: 90000,
        rating: 4.9,
        reviewsCount: 45,
        badge: localize("شاهانە و تایبەت", "إقامة فاخرة", "Luxury Stay"),
        image: "images/xanu A3.jpg",
        gallery: ["images/xanu A3.jpg", "images/xanu A1.jpg", "images/nature.jpg"],
        ownerName: localize("خاوەن خانوو (تەئکیدکراو)", "المالك (معتمد)", "Verified Host"),
        ownerRole: localize("خاوەن موڵک لە ئەحمەدئاوا", "صاحب العقار", "Property Owner"),
        locationText: localize("ئەحمەدئاوا، نزیک تاڤگەی زەڵم", "أحمد آوا، قرب شلال زلم", "Ahmad Awa, Near Zalm Waterfall"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("٣ ژووری نووستن فراوان", "٣ غرف نوم واسعة", "3 Large bedrooms"),
            localize("باخچەی سەوز و مەرجەلی دانیشتن", "حديقة خضراء وجلسة خارجية", "Green lawn & patio"),
            localize("مەلەوانگەی بەهارە و هاوینە", "مسبح صيفي", "Seasonal splash pool"),
            localize("وایفای بەخۆڕایی و سپلیت", "واي فاي مجاني وتكييف", "Free Wi-Fi & AC")
        ]
    },
    {
        id: "ahmad-awa-cabin-stream",
        town: "ahmad-awa",
        townName: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm"),
        categoryType: "house",
        category: localize("خانووی کەنار چەم", "بيت ضفاف المجرى", "Riverside House"),
        name: localize("خانووی گەشتیاری چەمی زەڵم", "بيت سياحي على مجرى زلم", "Zalm Stream Tourist House"),
        description: localize(
            "دانیشتن و مانەوە بە تەواوی لەسەر چەمی ئاوەکە، دەنگی ئاوی تاڤگە هەستێکی ئارامبەخش بە ڕۆحت دەبەخشێت.",
            "استمتع بالإقامة مباشرة على ضفاف المجرى المائي مع خرير الماء العذب وأجواء استرخاء حقيقية.",
            "Stay right along the cool rushing stream where gentle waterfall acoustics soothe your senses."
        ),
        price: localize("٧٠,٠٠٠ دینار / شەو", "٧٠,٠٠٠ دينار / ليلة", "70,000 IQD / night"),
        priceNumber: 70000,
        rating: 4.8,
        reviewsCount: 31,
        badge: localize("دیمەنی ئاو", "إطلالة مائية", "Waterfront"),
        image: "images/xanu A2.jpg",
        gallery: ["images/xanu A2.jpg", "images/nature.jpg"],
        ownerName: localize("خاوەن خانوو", "المالك", "Host"),
        ownerRole: localize("خانەی گەشتیاری", "إدارة السكن", "Host"),
        locationText: localize("ئەحمەدئاوا، لای چەمی زەڵم", "أحمد آوا، ضفاف النهر", "Ahmad Awa, Riverside"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("دانیشتنی دەرەوە لەسەر ئاو", "جلسات خارجية فوق الماء", "Outdoor water deck"),
            localize("گونجاو بۆ ٨ کەس", "يتسع لـ ٨ أشخاص", "Accommodates 8 guests"),
            localize("کەلوپەلی خاوێنی نوێ", "مفارش وأثاث نظيف حديث", "Pristine clean bedding")
        ]
    },
    {
        id: "ahmad-awa-huts-resort",
        town: "ahmad-awa",
        townName: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm"),
        categoryType: "picnic",
        category: localize("کەپری سەیرانگا", "أكواخ المصيف", "Resort Huts"),
        name: localize("کەپرەکانی تاڤگەی ئەحمەدئاوا", "أكواخ شلال أحمد آوا", "Ahmad Awa Waterfall Huts"),
        description: localize(
            "کەپری تایبەت بە پشوودان لە نزیکترین خاڵی تاڤگەی زەڵم، هەوای فێنک و دیمەنی سەرنجڕاکێشی ئاو.",
            "أكواخ استراحة مميزة في أقرب نقطة من الشلال العذب بأجواء عليلة ومناظر ساحرة.",
            "Picturesque shaded picnic huts located at the closest vantage point to the waterfall."
        ),
        price: localize("٢٠,٠٠٠ - ٣٠,٠٠٠ دینار / ڕۆژ", "٢٠,٠٠٠ - ٣٠,٠٠٠ دينار / يوم", "20,000 - 30,000 IQD / day"),
        priceNumber: 25000,
        rating: 4.8,
        reviewsCount: 49,
        badge: localize("نزیک لە تاڤگە", "قريب من الشلال", "Near Waterfall"),
        image: "images/nature.jpg",
        gallery: ["images/nature.jpg", "images/landscape.jpg"],
        ownerName: localize("مام کاروان", "مام كاروان", "Mam Karwan"),
        ownerRole: localize("سەرپەرشتیار", "المشرف", "Supervisor"),
        locationText: localize("ئەحمەدئاوا، کەنار تاڤگە", "أحمد آوا، شلال زلم", "Ahmad Awa, Waterfalls"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("نزیکترین خاڵ بۆ تاڤگە", "أقرب نقطة للشلال", "Closest spot to falls"),
            localize("شوێنی تایبەتی خێزانی", "جلسات عائلية مريحة", "Private family huts"),
            localize("خزمەتگوزاری چا و قاوە", "خدمة الشاي والقهوة", "Tea & coffee service")
        ]
    },

    /* ==================== ٥. خورماڵ (Khurmal) ==================== */
    {
        id: "khurmal-walnut-house",
        town: "khurmal",
        townName: localize("خورماڵ", "خورمال", "Khurmal"),
        categoryType: "house",
        category: localize("خانووی باخاوی", "بيت البساتين", "Orchard Villa"),
        name: localize("ڤێلای باخەکانی خورماڵ", "فيلا بساتين خورمال", "Khurmal Walnut Grove Villa"),
        description: localize(
            "خانوویەکی مۆدێرن بە باخچەی گەورەی پڕ لە دار هەنار و گوێز، گونجاوە بۆ کۆبوونەوەی گەورەی خێزانی.",
            "بيت عصري وسط بساتين الرمان والجوز الواسعة، مثالي للعائلات الكبيرة والباحثين عن الراحة والخصوصية.",
            "Modern villa nestled in lush pomegranate and walnut orchards, great for large family gatherings."
        ),
        price: localize("٧٠,٠٠٠ دینار / شەو", "٧٠,٠٠٠ دينار / ليلة", "70,000 IQD / night"),
        priceNumber: 70000,
        rating: 4.8,
        reviewsCount: 19,
        badge: localize("تایبەت و پارێزراو", "خصوصية تامة", "High Privacy"),
        image: "images/nature.jpg",
        gallery: ["images/nature.jpg", "images/landscape.jpg", "images/xanu A2.jpg"],
        ownerName: localize("خاوەن خانوو (خورماڵ)", "المالك (خورمال)", "Khurmal Host"),
        ownerRole: localize("خاوەن موڵک", "صاحب العقار", "Host"),
        locationText: localize("خورماڵ، نزیک سەیرانگای چەمە سارد", "خورمال، قرب نبع جَمَه سارد", "Khurmal, Near Chama Sard"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("حەوشەی گەورە بۆ یاری مناڵان", "ساحة خضراء واسعة لألعاب الأطفال", "Large child play yard"),
            localize("ژووری دانیشتنی فراوان", "صالة جلوس واسعة ومؤثثة", "Spacious furnished lounge"),
            localize("شوێنی ئامادەکردنی برژاو", "منطقة باربيكيو متكاملة", "Built-in grill station")
        ]
    },
    {
        id: "khurmal-garden-cabin",
        town: "khurmal",
        townName: localize("خورماڵ", "خورمال", "Khurmal"),
        categoryType: "house",
        category: localize("کابینەی سەوز", "كوخ البساتين", "Garden Cabin"),
        name: localize("کابینەی چەمە ساردی خورماڵ", "أكواخ جَمَه سارد في خورمال", "Chama Sard Huts & Cabin"),
        description: localize(
            "کابینەی پشوودان لە نزیک کانییە فێنکەکانی خورماڵ و دارە بەرزەکان، بۆ هەڵمژینی هەوای پاک و دڵفڕێن.",
            "أكواخ استراحة هادئة قرب ينابيع خورمال العذبة والأشجار العالية لراحة نفسية تامة.",
            "Peaceful cabin retreat near Khurmal's crisp spring water and tall shady trees."
        ),
        price: localize("٦٠,٠٠٠ دینار / شەو", "٦٠,٠٠٠ دينار / ليلة", "60,000 IQD / night"),
        priceNumber: 60000,
        rating: 4.7,
        reviewsCount: 21,
        badge: localize("سروشتی ئارام", "طبيعة هادئة", "Serene"),
        image: "images/landscape.jpg",
        gallery: ["images/landscape.jpg", "images/nature.jpg"],
        ownerName: localize("خاوەن کابینە", "صاحب الكوخ", "Host"),
        ownerRole: localize("سەرپەرشتیار", "المشرف", "Host"),
        locationText: localize("خورماڵ، سەیرانگای چەمە سارد", "خورمال، مصيف جَمَه سارد", "Khurmal, Chama Sard"),
        phone: "07700000000",
        whatsapp: "9647700000000",
        features: [
            localize("نزیک لە کانی ئاو", "قريب من ينبوع الماء", "Near cold water spring"),
            localize("پێداویستی چێشتلێنان", "أدوات طبخ أساسية", "Basic cooking amenities"),
            localize("کەشوهەوای ئارام", "أجواء استرخاء تامة", "Peaceful ambience")
        ]
    }
];

/* 
    ===================================================================
    ٤. شوێنە گەشتیارییەکان بۆ سەردانیکردن (Attractions)
    ===================================================================
*/
const nearbyAttractions = [
    {
        id: "nawroli-river",
        name: localize("ڕووبار و کەپرەکانی نەوڕۆڵی", "نهر وأكواخ نورولي", "Nawroli Riverfront & Huts"),
        description: localize(
            "ناوچەیەکی گەشتیاری دڵڕفێن بە خانووی سەر ئاو، بەلەم، جێتسکی و سەکووی پشوودانی خێزانی.",
            "منطقة سياحية ساحرة تضم بيوت فوق الماء، قوارب، جت سكي وجلسات عائلية مريحة.",
            "Scenic waterfront haven with over-water houses, boat rides, jet skis and family riverfront decks."
        ),
        distance: localize("نەوڕۆڵی، هەڵەبجە", "نورولي، حلبجة", "Nawroli, Halabja"),
        image: "images/hero.jpg"
    },
    {
        id: "tawela-streets",
        name: localize("کۆڵانە دێرینەکانی تەوێڵە", "أزقة بلدة طويلة التاريخية", "Historic Alleys of Tawela"),
        description: localize(
            "تەلارسازی بەردینی سەرنجڕاکێش، پلیکانە کۆنەکان و دیمەنی لوتکەی چیاکانی هەورامان.",
            "عمارة حجرية متدرجة، أزقة تراثية خلابة وإطلالة على قمم جبال هورامان العالية.",
            "Terraced stone architecture, historic stairways, and magnificent Hawraman peaks."
        ),
        distance: localize("تەوێڵە، دەڤەری هەورامان", "طويلة، منطقة هورامان", "Tawela, Hawraman"),
        image: "images/nature.jpg"
    },
    {
        id: "byara-gardens",
        name: localize("باخ و کانیاوەکانی بیارە", "بساتين وينابيع بيارة", "Byara Gardens & Springs"),
        description: localize(
            "باخی دار چنار و گوێز، سەرچاوەی ئاوی سازگار و کەشوهەوایەکی هەمیشە فێنک و پاک.",
            "بساتين الدلب والجوز العريقة، ينابيع المياه العذبة وأجواء جبلية منعشة.",
            "Ancient plane and walnut groves, pure natural springs, and cool mountain weather."
        ),
        distance: localize("بیارە، دەڤەری هەورامان", "بيارة، منطقة هورامان", "Byara, Hawraman"),
        image: "images/landscape.jpg"
    },
    {
        id: "zalm",
        name: localize("تاڤگەی زەڵم و ئەحمەدئاوا", "شلال زلم وأحمد آوا", "Zalm Waterfall & Ahmad Awa"),
        description: localize(
            "سەرچاوەیەکی ئاوی سارد، سروشتێکی شاخاویی دەوڵەمەند و هەوایەکی فێنک لە دەڤەری هەورامان.",
            "ينبوع مياه عذبة باردة وطبيعة جبلية خلابة وأجواء عليلة في منطقة هورامان.",
            "A cold natural spring, lush mountain scenery, and crisp fresh air in the Hawraman region."
        ),
        distance: localize("دەڤەری هەورامان", "منطقة هورامان", "Hawraman Region"),
        image: "images/nature.jpg"
    }
];

window.towns = towns;
window.serviceCategories = serviceCategories;
window.services = services;
window.nearbyAttractions = nearbyAttractions;
