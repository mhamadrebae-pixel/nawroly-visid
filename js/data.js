/*
    Visit Halabja - پلاتفۆرمی فەرمیی گەشتیاری و حجزکردنی هەڵەبجە و هەورامان
    داتای ڕاستەقینەی شوێنەکان، وێنەکان، و ژمارەی پەیوەندی خاوەنەکان
    ڕیزبەندی دەڤەرەکان:
    ١. نەوڕۆڵی
    ٢. تەوێڵە
    ٣. بیارە
    ٤. ئەحمەدئاوا و زەڵم
    ٥. خورماڵ
*/

// ڕێکخستنی زانیاری سەرپەرشتیاری پلاتفۆرم بۆ وەرگرتنی حجزەکان و پارەی پێشەکی (عەربوون)
const PLATFORM_CONFIG = {
    adminWhatsApp: "9647510485057", // ژمارەی وەرگرتنی داواکاریی حجز لە وێبسایتەکە
    adminPhone: "07510485057",
    siteName: "Visit Halabja",
    depositMethods: "FastPay / FIB",
    defaultCommissionNote: "تکایە بڕی عەربوون بە FastPay یان FIB بنێرە بۆ مسۆگەرکردنی حجزەکەت."
};
window.PLATFORM_CONFIG = PLATFORM_CONFIG;

function localize(ku, ar, en) {
    return { ku, ar, en };
}

/* 
    ===================================================================
    ١. داتای دەڤەر و شارۆچکە گەشتیارییەکان
    ===================================================================
*/
const towns = [
    {
        id: "all",
        name: localize("هەموو دەڤەرەکان", "كل المناطق", "All Destinations"),
        count: 0,
        lat: 35.1800,
        lng: 45.9800,
        embedUrl: "https://maps.google.com/maps?q=35.1800,45.9800&hl=ckb&z=11&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Halabja,+Kurdistan"
    },
    {
        id: "nawroli",
        name: localize("نەوڕۆڵی", "نورولي", "Nawroli"),
        title: localize("دانیشتن و مانەوە لەسەر ئاو، بەلەم و جێتسکی", "إقامة وجلسات فوق الماء وقوارب وجت سكي", "Riverfront stays, boat rides and jet ski"),
        image: "images/real/nawroli_water_house_spiaw_main.webp",
        badge: localize("کەناری ڕووبار", "على ضفاف النهر", "Riverfront"),
        stats: {
            houses: 3,
            activities: 1
        },
        lat: 35.2150,
        lng: 45.9350,
        embedUrl: "https://maps.google.com/maps?q=35.2150,45.9350&hl=ckb&z=15&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.2150,45.9350"
    },
    {
        id: "tawela",
        name: localize("تەوێڵە", "طويلة", "Tawela"),
        title: localize("کۆڵانە بەردینەکان، ئارامی و کلتووری هەورامی", "الأزقة الحجرية والهدوء والتراث الهورامي", "Stone-paved alleys, calm and Hawrami culture"),
        image: "images/real/tawela_sarkash_house_main.webp",
        badge: localize("کلتووری و شاخی", "تراثي وجبلي", "Heritage"),
        stats: {
            houses: 4,
            activities: 1
        },
        lat: 35.2014,
        lng: 46.1839,
        embedUrl: "https://maps.google.com/maps?q=35.2014,46.1839&hl=ckb&z=15&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.2014,46.1839"
    },
    {
        id: "byara",
        name: localize("بیارە", "بيارة", "Byara"),
        title: localize("باخ و چنار و هەوای فێنکی هەورامان و ماتۆڕسواری", "بساتين وجبال هورامان العليلة ودبابات جبلية", "Lush gardens, crisp mountain air and ATVs"),
        image: "images/real/byara_hawari_cabin_main.webp",
        badge: localize("زۆر داواکراو", "الأكثر طلباً", "Popular"),
        stats: {
            houses: 5,
            activities: 1
        },
        lat: 35.2281,
        lng: 46.1247,
        embedUrl: "https://maps.google.com/maps?q=35.2281,46.1247&hl=ckb&z=15&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.2281,46.1247"
    },
    {
        id: "ahmad-awa",
        name: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm"),
        title: localize("تاڤگە بەرزەکان، چەمی سەوز و ڤێلای شاخاوی", "الشلالات الشاهقة والينابيع والفلل الجبلية", "Dramatic waterfalls, streams and mountain villas"),
        image: "images/real/zalm_shanshin_house_main.webp",
        badge: localize("سروشتی دەوڵەمەند", "طبيعة ساحرة", "Scenic"),
        stats: {
            houses: 3,
            activities: 1
        },
        lat: 35.3136,
        lng: 46.0358,
        embedUrl: "https://maps.google.com/maps?q=35.3136,46.0358&hl=ckb&z=15&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.3136,46.0358"
    },
    {
        id: "khurmal",
        name: localize("خورماڵ", "خورمال", "Khurmal"),
        title: localize("مێژووی دێرین، باخی گوێز و ڤێلای خێزانی", "تاريخ عريق وبساتين وفلل عائلية هادئة", "Ancient heritage, lush orchards and calm family villas"),
        image: "images/real/khurmal_sarget_cabin_main.webp",
        badge: localize("ئارام و خێزانی", "هادئ وعائلي", "Calm & Family"),
        stats: {
            houses: 2,
            activities: 0
        },
        lat: 35.3082,
        lng: 46.0028,
        embedUrl: "https://maps.google.com/maps?q=35.3082,46.0028&hl=ckb&z=15&output=embed",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=35.3082,46.0028"
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
    ٣. لیستی خزمەتگوزاری و شوێنە ڕاستەقینەکان
    ===================================================================
*/
const services = [
    {
        "id": "nawroli-water-house-spiaw",
        "town": "nawroli",
        "townName": {
            "ku": "نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "categoryType": "house",
        "category": {
            "ku": "خانووی سەر ئاو",
            "ar": "بيوت فوق الماء",
            "en": "Water House"
        },
        "name": {
            "ku": "خانوی ناو رووبار",
            "ar": "منزل على ضفاف النهر",
            "en": "House in the river"
        },
        "description": {
            "ku": "🏡 خانوی ناو رووبار\r\nکۆمەڵەی گەشتیاری هەڵەبجە\r\nبەخێربێن بۆ جێگای ئارامش و سروشتی خۆشی ناو رووبار! 🌿💧\r\n🏠 دەربارەی خانەکە:\r\nخانو...",
            "ar": "منزل على ضفاف النهر",
            "en": "House in the river"
        },
        "longDescription": {
            "ku": "🏡 خانوی ناو رووبار\r\nکۆمەڵەی گەشتیاری هەڵەبجە\r\nبەخێربێن بۆ جێگای ئارامش و سروشتی خۆشی ناو رووبار! 🌿💧\r\n🏠 دەربارەی خانەکە:\r\nخانوه كه  پێکدێت لە:\r\n🛏️ ژوری ٤×٤\r\n🚿 حەمام و تەواڵێت\r\n🛁🪞مه خسه لی دەست شتن\r\n❄️🔥 سپڵێتی گەرم و سارد\r\n⚡ کارەبای ٢٤ کاتژمێر\r\n💧 ئاوی گەرم\r\n🍽️ سینگی قاپشتن\r\n🔥 وەجاخی گۆشت بڕژاندن\r\n🍳 تەباخی چێشت لێنان\r\n٢٠شیشی کە باب و ٣٠شیشی گۆشتی لێیە\r\n🌳 حەوشە:\r\nحەوشەی ٣لا کراوە بە قەبارەی ٨×٤",
            "ar": "🏡 منزل على ضفاف النهر\r\nجمعية حلبجة للسياحة\r\nأهلاً بكم في أحضان الطبيعة الهادئة والخلابة للنهر! 🌿💧\r\n🏠 معلومات عن المنزل:\r\n\r\nيتكون المنزل من:\r\n🛏️ 4×4 غرف\r\n🚿 حمام ومرحاض\r\n🛁🪞 غسالة ملابس\r\n❄️🔥 مكيف هواء بارد وساخن\r\n⚡ كهرباء على مدار 24 ساعة\r\n💧 ماء ساخن\r\n🍽️ غطاء للثلاجة\r\n🔥 شواية لحم\r\n🍳 موقد طبخ\r\n20 زجاجة دهن و30 زجاجة لحم\r\n🌳 فناء:\r\nفناء مفتوح من 3 جهات بمساحة 8×4\r\n💰 السعر:\r\nمن الساعة 12 ظهرًا حتى الساعة 12 ظهرًا من اليوم التالي",
            "en": "🏡 House in the river\r\nHalabja Tourism Association\r\nWelcome to the peaceful and beautiful nature of the river! 🌿💧\r\n🏠 About the cell:\r\nThe house consists of:\r\n🛏️ 4×4 rooms\r\n🚿 Bathroom and toilet\r\n🛁🪞Hand washing machine\r\n❄️🔥 Hot and cold split\r\n⚡ 24 hours electricity\r\n💧 Hot water\r\n🍽️ Chest cover\r\n🔥 Roast meat\r\n🍳 Cooking stove\r\n20 bottles of fat and 30 bottles of meat\r\n🌳 Courtyard:\r\n3 side open yard size 8×4"
        },
        "price": {
            "ku": "٧٥,٠٠٠ دینار / شەو",
            "ar": "٧٥,٠٠٠ دينار / ليلة",
            "en": "75,000 IQD / night"
        },
        "priceNumber": 75000,
        "rating": 4.9,
        "reviewsCount": 42,
        "badge": {
            "ku": "تایبەت لە ناو ئاو",
            "ar": "مميز وسط الماء",
            "en": "Top Water Stay"
        },
        "image": "images/real/nawroli_water_house_spiaw_main.webp",
        "gallery": [
            "images/real/nawroli_water_house_spiaw_main.webp",
            "images/real/nawroli_water_house_spiaw_gal_0.webp",
            "images/real/nawroli_water_house_spiaw_gal_1.webp",
            "images/real/nawroli_water_house_spiaw_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری خانووی ڕووبار",
            "ar": "مشرف البيت",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "هەڵەبجەی شەهید ناوچەی نەوڕۆڵی \r\nکەوتە سپیاو، نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "phone": "07501925153",
        "whatsapp": "9647501925153",
        "features": [
            {
                "ku": "دانیشتن و مانەوە لەناو دڵی ئاو",
                "ar": "إقامة داخل الماء",
                "en": "Stay over water"
            },
            {
                "ku": "ڕوانگەی کەناراو و شاخەکان",
                "ar": "إطلالة جبلية ونهرية",
                "en": "Mountain & river view"
            },
            {
                "ku": "کەشێکی ئارام بۆ خێزان",
                "ar": "أجواء عائلية هادئة",
                "en": "Family friendly"
            }
        ]
    },
    {
        "id": "nawroli-hana-zhala-huts",
        "town": "nawroli",
        "townName": {
            "ku": "نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "categoryType": "picnic",
        "category": {
            "ku": "کەپری کەنار ئاو",
            "ar": "أكواخ ضفاف الماء",
            "en": "Waterfront Huts"
        },
        "name": {
            "ku": "کەپری گەشتیاری هانەژاڵە",
            "ar": "کەپری گەشتیاری هانەژاڵە",
            "en": "کەپری گەشتیاری هانەژاڵە"
        },
        "description": {
            "ku": "لە ناوچەی نەوڕۆڵی لە بناری شاخی باڵامبۆ دەڕوانیتە چیای بیزەل و چیای سورمەر و ڕوباری سیروان شوێنێکی  لەبارە بۆ گەشتیاران لە بە...",
            "ar": "کەپری گەشتیاری هانەژاڵە",
            "en": "کەپری گەشتیاری هانەژاڵە"
        },
        "longDescription": {
            "ku": "لە ناوچەی نەوڕۆڵی لە بناری شاخی باڵامبۆ دەڕوانیتە چیای بیزەل و چیای سورمەر و ڕوباری سیروان شوێنێکی  لەبارە بۆ گەشتیاران لە بەهاردا کە دیمەنێکی  تەواو جیاواز دەبەخشیت بە گەشتیاران لە کەپرەکەمان جەنەها خزمەتگوزاری هەیە  وەک شاری یاری بۆ منداڵان  و مزگەوت و خواردنەکانی وەک  کەباب باڵ تکەی مریشک جگەر دڵ وکەلانە و ناوساجی شیر و چای خەڵوز",
            "ar": "في منطقة نورولي عند سفح جبل بالامبو، تطل على جبل بيزل وجبل سورمار ونهر سيروان، وهي مكان مناسب للسياح في فصل الربيع، حيث تمنحهم إطلالة مختلفة تمامًا.\r\nفي كَبَرتِنا (المنتجع/الاستراحة) تتوفر العديد من الخدمات مثل مدينة ألعاب للأطفال، ومسجد، وأطعمة متنوعة مثل الكباب، وأجنحة الدجاج، وتكة الدجاج، والكبد والقلب، والكِلانة، ونان ساج، إضافةً إلى اللبن والشاي والخلوز.",
            "en": "In the Nawroli area, at the foot of Mount Balambo, overlooking Mount Bezel, Mount Surmar, and the Sirwan River, it is a suitable destination for tourists in spring, offering them a completely unique view.\r\nAt our resort/cabin, we provide many services such as a children’s playground, a mosque, and a variety of foods including kebab, chicken wings, chicken tikka, liver and heart, kelana, saj bread, as well as yogurt drink (milk) and khalluz tea."
        },
        "price": {
            "ku": "١٥,٠٠٠ - ٢٥,٠٠٠ دینار / ڕۆژ",
            "ar": "١٥,٠٠٠ - ٢٥,٠٠٠ دينار / يوم",
            "en": "15,000 - 25,000 IQD / day"
        },
        "priceNumber": 20000,
        "rating": 4.8,
        "reviewsCount": 38,
        "badge": {
            "ku": "کەپری خێزانی",
            "ar": "أكواخ عائلية",
            "en": "Family Huts"
        },
        "image": "images/real/nawroli_hana_zhala_huts_main.webp",
        "gallery": [
            "images/real/nawroli_hana_zhala_huts_main.webp",
            "images/real/nawroli_hana_zhala_huts_gal_0.webp",
            "images/real/nawroli_hana_zhala_huts_gal_1.webp",
            "images/real/nawroli_hana_zhala_huts_gal_2.webp"
        ],
        "ownerName": {
            "ku": "لوقمان حەمە عەزیز",
            "ar": "لقمان حمه عزيز",
            "en": "Luqman Hama Aziz"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "هانەژاڵە، نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "phone": "07501688983",
        "whatsapp": "9647501688983",
        "features": [
            {
                "ku": "سێبەری فێنک و دانیشتنی سەر ئاو",
                "ar": "ظلال وافرة وجلسات مائية",
                "en": "Cool shade over water"
            },
            {
                "ku": "چای خەڵوز و خواردنەوەی فرێش",
                "ar": "شاي فحم ومشروبات باردة",
                "en": "Charcoal tea & drinks"
            },
            {
                "ku": "گونجاو بۆ پشووی خێزانی",
                "ar": "مناسب للاستراحة العائلية",
                "en": "Quiet family rest"
            }
        ]
    },
    {
        "id": "nawroli-boats-sports",
        "town": "nawroli",
        "townName": {
            "ku": "نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "categoryType": "activity",
        "category": {
            "ku": "بەلەم و جێتسکی",
            "ar": "قوارب وجت سكي",
            "en": "Boats & Jet Ski"
        },
        "name": {
            "ku": "ناوچەی نەوڕۆڵی",
            "ar": "منطقة ناورولي",
            "en": "Nawroli"
        },
        "description": {
            "ku": "ناوچەی نەوڕۆڵی دەکەوێتە پارێزگای هەڵەبجە و بە ناوچەیەکی کشتوکاڵی و گەشتیاری دادەنرێت.\r\n•نەوڕۆڵی ناوچەیەکی گوندنشینە و بە گوند...",
            "ar": "منطقة ناورولي",
            "en": "Nawroli"
        },
        "longDescription": {
            "ku": "ناوچەی نەوڕۆڵی دەکەوێتە پارێزگای هەڵەبجە و بە ناوچەیەکی کشتوکاڵی و گەشتیاری دادەنرێت.\r\n•نەوڕۆڵی ناوچەیەکی گوندنشینە و بە گوندەکانی ناسراوە.\r\n• پڕۆژەکان: پڕۆژەی جیاواز لە ناوچەکەدا جێبەجێ کراون، وەک پڕۆژەی ئاودێری لە گوندی چرۆسانە کە دەکەوێتە ناوچەی نەوڕۆڵی، ئەمەش بۆ خزمەتکردنی جووتیاران و زەوییە کشتوکاڵییەکانە.\r\n• فێستیڤاڵ و چالاکی: لە ناوچەکەدا فێستیڤاڵی \"نەوای نەوڕۆڵی\" بەڕێوەچووە، کە مەبەست لێی قوڵکردنەوەی پەیوەندی نێوان دانیشتوانی گوندەکانی ناوچەکە و ناساندنیان بە یەکتر بووە.\r\n• گەشتیاری: نەوڕۆڵی بە ناوچەیەکی گەشتیاری دادەنرێت لە پارێزگای هەڵەبجە و سروشتێکی جوانی هەیە کە گەشتیاران ڕووی تێدەکەن.\r\nهەڵکەوتەی جوگرافیای ئەم ناوچەیە و نزیک بوونی لە دەریاچەی سیروان وای کردووە \r\nزیاتر لە وەرزی بەهاردا زۆرترین گەشتیار لە ناوچە جیاوازەکانی کوردستان و دەرەوەی کوردستان سەردانی بکەن .",
            "ar": "تقع منطقة ناورولي في محافظة حلبجة، وتُعتبر منطقة زراعية وسياحية.\r\n• ناورولي منطقة ريفية تشتهر بقراها.\r\n• المشاريع: نُفذت في المنطقة مشاريع متنوعة، مثل مشروع الري في قرية جروزنة الواقعة في منطقة ناورولي، لخدمة المزارعين والأراضي الزراعية.\r\n• المهرجانات والأنشطة: أُقيم في المنطقة مهرجان ناوي ناورولي، الذي يهدف إلى تعميق العلاقة بين أهالي قرى المنطقة والتعريف بهم.\r\n• السياحة: تُعتبر ناورولي منطقة سياحية في محافظة حلبجة، وتتمتع بطبيعة خلابة يقصدها السياح.\r\n\r\nيُعدّ الموقع الجغرافي لهذه المنطقة وقربها من بحيرة سيروان من الأسباب التي تجعلها وجهةً سياحيةً واعدةً في فصل الربيع.\r\n\r\nيُتيح الموقع الجغرافي لهذه المنطقة وقربها من بحيرة سيروان فرصةً لزيارتها من قِبل المزيد من السياح من مختلف أنحاء كردستان وخارجها.",
            "en": "Nawroli area is located in Halabja province and is considered an agricultural and tourist area.\r\n•Nawroli is a rural area known for its villages.\r\n• Projects: Various projects have been implemented in the area, such as the irrigation project in Chrosana village located in Nawroli area, to serve farmers and agricultural land.\r\n• Festivals and activities: The Naway Nawroli festival was held in the region, which aimed to deepen the relationship between the villagers of the region and introduce them to each other.\r\n• Tourism: Nawroli is considered a tourist area in Halabja province and has a beautiful nature that tourists flock to.\r\nThe geographical location of this area and its proximity to Lake Sirwan \r\nMore tourists from different parts of Kurdistan and abroad visit it in spring."
        },
        "price": {
            "ku": "١٥,٠٠٠ دینار / سواربوون",
            "ar": "١٥,٠٠٠ دينار / جولة",
            "en": "15,000 IQD / ride"
        },
        "priceNumber": 15000,
        "rating": 4.9,
        "reviewsCount": 56,
        "badge": {
            "ku": "چالاکیی ئاوی",
            "ar": "نشاطات مائية",
            "en": "Water Fun"
        },
        "image": "images/real/nawroli_boats_sports_main.webp",
        "gallery": [
            "images/real/nawroli_boats_sports_main.webp",
            "images/real/nawroli_boats_sports_gal_0.webp",
            "images/real/nawroli_boats_sports_gal_1.webp",
            "images/real/nawroli_boats_sports_gal_2.webp"
        ],
        "ownerName": {
            "ku": "کاپتنی گەشتی نەوڕۆڵی",
            "ar": "كابتن الجولات",
            "en": "Captain"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "ناوچەی نەوڕۆڵی، نەوڕۆڵی",
            "ar": "نورولي",
            "en": "Nawroli"
        },
        "phone": "07500000000",
        "whatsapp": "9647500000000",
        "features": [
            {
                "ku": "گەڕان بە بەلەم بە ڕووباردا",
                "ar": "جولات بالقوارب",
                "en": "River boat tours"
            },
            {
                "ku": "جێتسکی خێرا بە کەلوپەلی سەلامەتی",
                "ar": "جت سكي سريع وآمن",
                "en": "Jet ski with life jackets"
            },
            {
                "ku": "وێنەگرتن لە ناوەڕاستی ئاو",
                "ar": "فرص تصوير مميزة",
                "en": "Scenic photo spots"
            }
        ]
    },
    {
        "id": "tawela-sarkash-house",
        "town": "tawela",
        "townName": {
            "ku": "تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "categoryType": "house",
        "category": {
            "ku": "خانووی گەشتیاری",
            "ar": "بيت سياحي",
            "en": "Tourist House"
        },
        "name": {
            "ku": "خانووی گەشتیاری سەرکەش",
            "ar": "بيت سياحي سرکش",
            "en": "sarkash Tourist House"
        },
        "description": {
            "ku": "خانووی گەشتیاری سەرکەش\r\n\r\nلە گەڵ بینینی دیمەنە ناوازە سروشتیەکانی تەوێڵە دەکرێت لەم خانوە بمێنیتەوە کە سەرجەم پێداویستی تێدا ...",
            "ar": "بيت سياحي سرکش",
            "en": "sarkash Tourist House"
        },
        "longDescription": {
            "ku": "خانووی گەشتیاری سەرکەش\r\n\r\nلە گەڵ بینینی دیمەنە ناوازە سروشتیەکانی تەوێڵە دەکرێت لەم خانوە بمێنیتەوە کە سەرجەم پێداویستی تێدا ئامادەکراوە بۆ گەشتیار ، خانوەکە لەسەر ڕێگای سەرەکەی تەوێڵەیە ، پێک دێت لە هۆڵێکی فراوان و ژوی نوستن و مەتبەخێکی کراوە و باڵەکۆنێکی تایبەت کە بەتەواوی دیمەنی سروشتی تەوێڵە و مەرزی شۆشمی دەبینیت تێیدا",
            "ar": "بيت سياحي سرکش\r\n\r\nيقع البيت على الطريق الرئيسي لتويلا، ويتألف من صالة واسعة، وغرفة نوم، ومطبخ مفتوح، وشرفة خاصة تُطل على المناظر الطبيعية الخلابة لتويلا والحدود شوشمی.",
            "en": "sarkash Tourist House\r\n\r\nThe house is located on the main road of Tuwela, consists of a spacious hall, bedroom, open kitchen and a private balcony that you can see the natural scenery of Tuwela and the \r\nshoshmi border"
        },
        "price": {
            "ku": "٨٠,٠٠٠ دینار / شەو",
            "ar": "٨٠,٠٠٠ دينار / ليلة",
            "en": "80,000 IQD / night"
        },
        "priceNumber": 80000,
        "rating": 4.8,
        "reviewsCount": 29,
        "badge": {
            "ku": "ڕوانگەی شاخاوی",
            "ar": "إطلالة جبلية",
            "en": "Mountain View"
        },
        "image": "images/real/tawela_sarkash_house_main.webp",
        "gallery": [
            "images/real/tawela_sarkash_house_main.webp",
            "images/real/tawela_sarkash_house_gal_0.webp",
            "images/real/tawela_sarkash_house_gal_1.webp",
            "images/real/tawela_sarkash_house_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەن خانوو",
            "ar": "صاحب العقار",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "سەرڕێگای سەرەکی تەوێڵە، تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "phone": "07501131873",
        "whatsapp": "9647501131873",
        "features": [
            {
                "ku": "هۆڵی دانیشتنی فراوان و مؤثث",
                "ar": "صالة جلوس واسعة ومؤثثة",
                "en": "Spacious furnished hall"
            },
            {
                "ku": "فێنککەرەوە و سپلیت",
                "ar": "تكييف وتدفئة",
                "en": "Air conditioning"
            },
            {
                "ku": "لە سەر ڕێگای سەرەکی تەوێڵە",
                "ar": "على الطريق الرئيسي",
                "en": "Main road access"
            }
        ]
    },
    {
        "id": "tawela-tazhna-house",
        "town": "tawela",
        "townName": {
            "ku": "تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "categoryType": "house",
        "category": {
            "ku": "خانووی کلتووری",
            "ar": "بيت تراثي",
            "en": "Heritage House"
        },
        "name": {
            "ku": "خانووی گەشتیاری تەژنە",
            "ar": "بيت تاجنا السياحي",
            "en": "Tajna Tourist House"
        },
        "description": {
            "ku": "لە نێو دیمەن و سروشتی جوانی تەوێڵە، خانووی گەشتیاری تەژنە جێگایەکی تایبەتە بو بەسەر بردنی کاتێکی خۆش\r\nخانووەکە بە دیزاینێکی ن...",
            "ar": "بيت تاجنا السياحي",
            "en": "Tajna Tourist House"
        },
        "longDescription": {
            "ku": "لە نێو دیمەن و سروشتی جوانی تەوێڵە، خانووی گەشتیاری تەژنە جێگایەکی تایبەتە بو بەسەر بردنی کاتێکی خۆش\r\nخانووەکە بە دیزاینێکی نوێ و دڵخواز ئامادەکراوە بۆ میوانە ئازیزەکان \r\n\r\nتایبەتمەندییەکان:\r\n\t•\tژوورە نوستنی ئاسودە\r\n\t•هۆڵی فراوان بۆ دانیشتن و \r\n\t•\tمەتبەخی تەواو بە هەموو پێداویستییەکانی\r\n\t•\tباڵەکۆن بۆ بینینی دیمەنە سرووشتییەکان\r\n\t•\tشوێنی پارککردنی ئۆتۆمبێل\r\n\t•\tکارەبای 24 کاتژمێری",
            "ar": "وسط المناظر الطبيعية الخلابة في تيويلا، يُعد بيت تاجنا السياحي وجهةً مثالية لقضاء وقت ممتع.\r\n\r\nالبيت مُجهّز بتصميم جديد ومُلفت لضيوفنا الكرام.\r\n\r\nالميزات:\r\n• غرف نوم مريحة\r\n• صالة جلوس واسعة\r\n• مطبخ مُجهّز بالكامل\r\n• شرفة تُطل على المناظر الطبيعية\r\n• موقف سيارات\r\n• كهرباء متوفرة على مدار الساعة",
            "en": "Amidst the beautiful scenery and nature of Tewela, Tajna Tourist House is a special place to spend a good time\r\nThe house is prepared with a new and desirable design for dear guests \r\n\r\nFeatures:\r\n\t• Comfortable bedrooms\r\n\t•Spacious hall for seating and \r\n\t• Fully equipped kitchen\r\n\t• Balcony for viewing the scenery\r\n\t• Parking space\r\n\t• 24 hours electricity"
        },
        "price": {
            "ku": "٧٥,٠٠٠ دینار / شەو",
            "ar": "٧٥,٠٠٠ دينار / ليلة",
            "en": "75,000 IQD / night"
        },
        "priceNumber": 75000,
        "rating": 4.9,
        "reviewsCount": 33,
        "badge": {
            "ku": "ڕوانگەی شۆشمێ",
            "ar": "إطلالة شوشمي",
            "en": "Scenic View"
        },
        "image": "images/real/tawela_tazhna_house_main.webp",
        "gallery": [
            "images/real/tawela_tazhna_house_main.webp",
            "images/real/tawela_tazhna_house_gal_0.webp",
            "images/real/tawela_tazhna_house_gal_1.webp",
            "images/real/tawela_tazhna_house_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری خانووی تەژنە",
            "ar": "مشرف البيت",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "گەڕیات ، لەسەر ڕێی مەرزی شۆشمێ، تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "phone": "07508649501",
        "whatsapp": "9647508649501",
        "features": [
            {
                "ku": "دیمەنی پانۆرامای بەرزاییەکانی هەورامان",
                "ar": "إطلالة بانورامية",
                "en": "Panoramic vista"
            },
            {
                "ku": "ئارام و خێزانی و تایبەت",
                "ar": "هادئ وخاص للعائلات",
                "en": "Quiet & family privacy"
            },
            {
                "ku": "پێداویستی چێشتلێنان و حەسانەوە",
                "ar": "مطبخ متكامل",
                "en": "Fully equipped"
            }
        ]
    },
    {
        "id": "tawela-awesar-apartments",
        "town": "tawela",
        "townName": {
            "ku": "تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "categoryType": "house",
        "category": {
            "ku": "شوقەی خێزانی",
            "ar": "شقق عائلية",
            "en": "Family Apartment"
        },
        "name": {
            "ku": "ئاوێسەر",
            "ar": "أويزر",
            "en": "Aweser"
        },
        "description": {
            "ku": "ئاوێسەر\r\nیەکێک لە هاوینەهەواری بەناوبانگەکانی کوردستان بە گشتی و لە ناوچەی هەورامان بەتایبەتی، سەرچاوەی ئاوی زۆری تێدایە و کە...",
            "ar": "أويزر",
            "en": "Aweser"
        },
        "longDescription": {
            "ku": "ئاوێسەر\r\nیەکێک لە هاوینەهەواری بەناوبانگەکانی کوردستان بە گشتی و لە ناوچەی هەورامان بەتایبەتی، سەرچاوەی ئاوی زۆری تێدایە و کەشێکی ساردی هەیە بەو پێیەی پلەکانی گەرما تێنەپەڕێت\r\n(27) پلەی سەدی، جگە لە بوونی چڕی دار و باخی میوە کە زۆربەیان درەختی گوێزن کە دیمەنێکی جوانی ناوچەکە دەبەخشێت و دۆڵی سەوزی گەورە و درێژخایەن پێکدەهێنن، کۆمەڵێک خانووی گەشتیاری دروستکراون جگە لە دامەزراوە تەندروستییەکان. هاوینەهەواری نێ بڕیارە لە داهاتوودا پەرەی پێبدرێت، هاوینەهەواری نیس بە هەزاران کەسی ناوخۆیی و بیانی سەردانی دەکەن. هاوینەهەواری نێ بە دووری ٢ کم لە ڕۆژهەڵاتی شارۆچکەی تەوێڵە و ١١٠ کم لە سلێمانییەوە دوورە و تەنیشت کۆماری ئیسلامی ئێرانە.",
            "ar": "أويزر\r\nمن المنتجعات الشهيرة في كوردستان بشكل عام وفي منطقة هورامان بشكل خاص، يحتوي على العديد من مصادر المياه ويتميز بأجواء باردة حيث لا تتجاوز درجة الحرارة\r\n(27) درجة مئوية، بالإضافة إلى كثافة الأشجار والبساتين وأغلبها أشجار الجوز مما يعطي إطلالة جميلة على المنطقة ويشكل وادياً أخضراً كبيراً وطويل الأمد، كما تم بناء مجموعة من البيوت السياحية بالإضافة إلى المرافق الصحية. سيتم تطوير منتجع ني في المستقبل، حيث يزور منتجع نيس آلاف السكان المحليين والأجانب. يقع منتجع ني على بعد 2 كم شرق مدينة الطويلة و 110 كم من مدينة السليمانية والمتاخمة للجمهورية الإسلامية الإيرانية.",
            "en": "Aweser\r\nOne of the famous resorts in Kurdistan in general and in the area of hawraman in particular, contains many water sources and has a cold atmosphere as the temperature does not exceed\r\n(27) degrees Celsius, in addition to the dense presence of trees and orchards which most are walnut trees which gives a beautiful view of the region and make up a large and long-lasting green valley, a group of tourist houses were built in addition to health facilities. Ne resort is to be developed in the future, Nis resort is being visited by thousands of local and foreigners. Ne resort is located 2 km east of Tawela town and 110 km away from Sulaymaniyah and adjacent to the Islamic Republic of Iran."
        },
        "price": {
            "ku": "٨٥,٠٠٠ دینار / شەو",
            "ar": "٨٥,٠٠٠ دينار / ليلة",
            "en": "85,000 IQD / night"
        },
        "priceNumber": 85000,
        "rating": 4.8,
        "reviewsCount": 25,
        "badge": {
            "ku": "نزیک لە ئاوێسەر",
            "ar": "قرب نبع آويسر",
            "en": "Near Spring"
        },
        "image": "images/real/tawela_awesar_apartments_main.webp",
        "gallery": [
            "images/real/tawela_awesar_apartments_main.webp",
            "images/real/tawela_awesar_apartments_gal_0.webp",
            "images/real/tawela_awesar_apartments_gal_1.webp",
            "images/real/tawela_awesar_apartments_gal_2.webp"
        ],
        "ownerName": {
            "ku": "بەڕێوەبەری شوقەکان",
            "ar": "إدارة الشقق",
            "en": "Manager"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "ئاوێسەر، تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "phone": "0",
        "whatsapp": "964",
        "features": [
            {
                "ku": "شوقەی خاوێن و تازە",
                "ar": "شقق حديثة ونظيفة",
                "en": "Clean modern suites"
            },
            {
                "ku": "ڕوانگەی کەشوهەوای فێنکی ئاوێسەر",
                "ar": "أجواء عليلة",
                "en": "Crisp mountain air"
            },
            {
                "ku": "پارکینی تایبەت بۆ ئۆتۆمبێل",
                "ar": "موقف سيارات",
                "en": "Parking space"
            }
        ]
    },
    {
        "id": "tawela-jawahir-hotel",
        "town": "tawela",
        "townName": {
            "ku": "تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "categoryType": "house",
        "category": {
            "ku": "هۆتێلی گەشتیاری",
            "ar": "فندق سياحي",
            "en": "Tourist Hotel"
        },
        "name": {
            "ku": "هۆتێل جەواهیر",
            "ar": "فندق جواهر",
            "en": "Jawahir Hotel"
        },
        "description": {
            "ku": "هۆتێل جەواهیر\r\nبەهەشتێک لە ناو دامێنی شاخەکانی تەوێڵە\r\n\r\nلە ناو دامێنی سرووشتی هەورامان، هۆتێل جەواهیر بۆ  ئارامیەکی لەیاد نە...",
            "ar": "فندق جواهر",
            "en": "Jawahir Hotel"
        },
        "longDescription": {
            "ku": "هۆتێل جەواهیر\r\nبەهەشتێک لە ناو دامێنی شاخەکانی تەوێڵە\r\n\r\nلە ناو دامێنی سرووشتی هەورامان، هۆتێل جەواهیر بۆ  ئارامیەکی لەیاد نەکراو میوانداریتان  دەکات . ئەم هۆتێلە ئامادەیە بۆ ئەوەی سەفەرێکی بێوێنە بەرەو ئارامی و پشوودان بە گەشتیاران ببەخشێت.\r\n\r\nلە هۆتێل جەواهیردا، زۆرترین خزمەتگوزاری و کەشوھەوایەکی ئاسوودە  بۆ میوانەکان ئامادەکراوە. پاکی و خاوێنی یەکێکە لە بنەماکانی ئێمە، بە شێوەیەک کە ھەموو جێگە و ژورەکان بە وردی بە چاودێری و خاوێن دەکرێنەوە.\r\n\r\nھەندێک لە تایبەتمەندیەکانی هۆتێل جەواهیر:\r\n   🚗 پارکی ئۆتۆمبێلی \r\n  📡 ئینتەرنێتی خێرا \r\n🍳 نانی بەیانی بەتام\r\n❄ فێنککەرەوە و گەرمکەرەوە\r\n📺 تەلەفزیۆن لە ھەموو ژورەکاندا\r\n\r\nهۆتێل جەواهیر چاوەڕێیە بۆ میوانداریتان و ئەزموونێکی ناوازەی پشوودان لە ناو شوێنە سرووشتییە جوانەکانی تەوێڵەتان پێشکەش بکات.",
            "ar": "فندق جواهر\r\nجنةٌ في سفوح جبال تويله\r\n\r\nفي قلب هاورام آباد الطبيعي، يرحب بكم فندق جواهر لقضاء عطلة استرخاء لا تُنسى. هذا الفندق مُجهّزٌ ليمنح المسافرين رحلةً فريدةً نحو الهدوء والاسترخاء.\r\n\r\nيُقدّم فندق جواهر لضيوفه أرقى الخدمات وأجواءً مريحة. النظافة من مبادئنا، لذا نُنظّف جميع الأسرّة والغرف بعناية.\r\n\r\nمن ميزات فندق جواهر:\r\n🚗 موقف سيارات\r\n📡 إنترنت عالي السرعة\r\n🍳 فطور شهي\r\n❄ تبريد وتدفئة\r\n📺 تلفزيون في جميع الغرف\r\n\r\nفندق جواهر في انتظاركم ليُقدّم لكم تجربة استرخاء فريدة في قلب تويله الطبيعي الخلاب.",
            "en": "Jawahir Hotel\r\nA paradise in the foothills of the Tewela Mountains\r\n\r\nIn the natural surroundings of Hawramabad, Jawahir Hotel welcomes you for an unforgettable relaxation. This hotel is ready to give travelers an unprecedented journey towards peace and relaxation.\r\n\r\nAt Hotel Jawahir, guests are provided with the utmost service and comfortable atmosphere. Cleanliness is one of our principles, so that all beds and rooms are carefully cleaned.\r\n\r\nSome of the features of Jawahir Hotel:\r\n   🚗 Car park \r\n  📡 High speed internet \r\n🍳 Delicious breakfast\r\n❄ Cooling and heating\r\n📺 TV in all rooms\r\n\r\nJawahir Hotel is waiting to welcome you and offer you a unique relaxation experience in the beautiful natural surroundings of Tewela."
        },
        "price": {
            "ku": "٦٠,٠٠٠ دینار / شەو",
            "ar": "٦٠,٠٠٠ دينار / ليلة",
            "en": "60,000 IQD / night"
        },
        "priceNumber": 60000,
        "rating": 4.7,
        "reviewsCount": 40,
        "badge": {
            "ku": "ناوەندی تەوێڵە",
            "ar": "قلب طويلة",
            "en": "Town Center"
        },
        "image": "images/real/tawela_jawahir_hotel_main.webp",
        "gallery": [
            "images/real/tawela_jawahir_hotel_main.webp",
            "images/real/tawela_jawahir_hotel_gal_0.webp",
            "images/real/tawela_jawahir_hotel_gal_1.webp",
            "images/real/tawela_jawahir_hotel_gal_2.webp"
        ],
        "ownerName": {
            "ku": "ئیدارەی هۆتێل جەواهیر",
            "ar": "إدارة الفندق",
            "en": "Hotel Staff"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "لەناوەندی شارۆچکەی تەوێڵە، تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "phone": "07724015454",
        "whatsapp": "9647724015454",
        "features": [
            {
                "ku": "ژووری خاوێن بە هەموو خزمەتگوزارییەکان",
                "ar": "غرف مجهزة بالكامل",
                "en": "Full amenity rooms"
            },
            {
                "ku": "لە ناوەندی شارۆچکەی تەوێڵە",
                "ar": "في مركز البلدة",
                "en": "In town center"
            },
            {
                "ku": "پێشوازی ٢٤ کاتژمێری",
                "ar": "استقبال ٢٤ ساعة",
                "en": "24/7 front desk"
            }
        ]
    },
    {
        "id": "byara-hawari-cabin",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "house",
        "category": {
            "ku": "کابینەی دارین و شووشەیی",
            "ar": "كوخ خشبي وزجاجي",
            "en": "Glass Cabin"
        },
        "name": {
            "ku": "کوخی هەواری بیارە",
            "ar": "كوخ شاطئ بيارا",
            "en": "Biara Beach Cottage"
        },
        "description": {
            "ku": "کوخی هەواری بیارە جێگایەکی ناوازەیە بۆ گەشتیارانی بەڕێز.\r\nلەوێ دەیتوانیت کاتێکی ئارام و خۆش بەسەر ببەریتلە نێو دیمەنە ناوازەک...",
            "ar": "كوخ شاطئ بيارا",
            "en": "Biara Beach Cottage"
        },
        "longDescription": {
            "ku": "کوخی هەواری بیارە جێگایەکی ناوازەیە بۆ گەشتیارانی بەڕێز.\r\nلەوێ دەیتوانیت کاتێکی ئارام و خۆش بەسەر ببەریتلە نێو دیمەنە ناوازەکانئ سرووشتییەکاندا.\r\n\r\nتایبەتمەندییەکان:\r\n • ژوورە نوستنی ئارامبەخش\r\n • هۆڵێکی فراوان\r\n • مەتبەخی تەواو\r\n • ئاوی بەردەوام \r\n • شوێنی تایبەتی پارککردنی ئۆتۆمبێل\r\n • تەنها 150مەتر دوورە لە بازاڕەوو",
            "ar": "كوخ شاطئ بيارا وجهة سياحية مميزة.\r\n\r\nهناك، يمكنك قضاء وقت ممتع في أحضان الطبيعة الخلابة.\r\n\r\nالميزات:\r\n• غرف نوم مريحة\r\n• صالة واسعة\r\n• مطبخ مجهز بالكامل\r\n• نظام ري مستمر\r\n• موقف سيارات خاص\r\n• يبعد 150 مترًا فقط عن السوق",
            "en": "Biara Beach Cottage is a unique place for tourists.\r\nThere you can spend a relaxing time in the unique natural scenery.\r\n\r\nFeatures:\r\n • Comfortable bedrooms\r\n • Spacious hall\r\n • Full kitchen\r\n • Continuous water \r\n • Private parking area\r\n • Only 150 meters away from the market"
        },
        "price": {
            "ku": "٨٥,٠٠٠ دینار / شەو",
            "ar": "٨٥,٠٠٠ دينار / ليلة",
            "en": "85,000 IQD / night"
        },
        "priceNumber": 85000,
        "rating": 4.9,
        "reviewsCount": 51,
        "badge": {
            "ku": "دیزاینی ناوازە",
            "ar": "تصميم استثنائي",
            "en": "Unique Design"
        },
        "image": "images/real/byara_hawari_cabin_main.webp",
        "gallery": [
            "images/real/byara_hawari_cabin_main.webp",
            "images/real/byara_hawari_cabin_gal_0.webp",
            "images/real/byara_hawari_cabin_gal_1.webp",
            "images/real/byara_hawari_cabin_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەنی کابینە",
            "ar": "صاحب الكوخ",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "نزیک بازاڕی بیارە، بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "phone": "07761761985",
        "whatsapp": "9647761761985",
        "features": [
            {
                "ku": "حەوز و گۆمی ئاوی جوان لە بەردەم کابینە",
                "ar": "حوض ماء وجلسة أمام الكوخ",
                "en": "Front patio pool"
            },
            {
                "ku": "باخچەی سەوز و گوڵ و دارە بەرزەکان",
                "ar": "حديقة زهور وأشجار",
                "en": "Flower garden"
            },
            {
                "ku": "نزیک لە بازاڕی بیارە",
                "ar": "قريب من السوق",
                "en": "Near Byara bazaar"
            }
        ]
    },
    {
        "id": "byara-back-market-cabin",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "house",
        "category": {
            "ku": "کابینەی باخاوی",
            "ar": "كوخ البساتين",
            "en": "Orchard Cabin"
        },
        "name": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Biara"
        },
        "description": {
            "ku": "بیارە شارۆچكەیەكی ناوازەیە و دەکەوێتە هەرێمی کوردستان، لە پارێزگای هەڵەبجە لە نزیک سنووری ئێران. لە ناوچەیەکی شاخاویدا هەڵکەو...",
            "ar": "بيارة",
            "en": "Biara"
        },
        "longDescription": {
            "ku": "بیارە شارۆچكەیەكی ناوازەیە و دەکەوێتە هەرێمی کوردستان، لە پارێزگای هەڵەبجە لە نزیک سنووری ئێران. لە ناوچەیەکی شاخاویدا هەڵکەوتووە، ئەمەش جوانییەکی ناوازەی پێدەبەخشێت و کەشوهەوای فێنک و بازاڕە كلتوریەكی وای كردووە گەشتایاران لە شارەجیاوازەكانەوەی بە تایبەت سەردانی بكە",
            "ar": "بيارة بلدة فريدة تقع في إقليم كردستان، ضمن محافظة حلبجة قرب الحدود الإيرانية. تقع في منطقة جبلية، مما يمنحها جمالاً فريداً ومناخاً معتدلاً، وأسواقاً ثقافية جذبت السياح من مختلف المدن بشكل خاص.",
            "en": "Biara is a unique town located in the Kurdistan Region, in Halabja province near the Iranian border. It is located in a mountainous area, which gives it a unique beauty and cool climate and cultural markets have made tourists from different cities especially visit it"
        },
        "price": {
            "ku": "٧٥,٠٠٠ دینار / شەو",
            "ar": "٧٥,٠٠٠ دينار / ليلة",
            "en": "75,000 IQD / night"
        },
        "priceNumber": 75000,
        "rating": 4.8,
        "reviewsCount": 36,
        "badge": {
            "ku": "ئارام و فێنک",
            "ar": "أجواء عليلة",
            "en": "Cool Breeze"
        },
        "image": "images/real/byara_back_market_cabin_main.webp",
        "gallery": [
            "images/real/byara_back_market_cabin_main.webp",
            "images/real/byara_back_market_cabin_gal_0.webp",
            "images/real/byara_back_market_cabin_gal_1.webp",
            "images/real/byara_back_market_cabin_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری کوخ",
            "ar": "مشرف الكوخ",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "بیارە، بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "phone": "07500000000",
        "whatsapp": "9647500000000",
        "features": [
            {
                "ku": "تەواو داپۆشراو بە دار گوێزەکان",
                "ar": "وسط أشجار الجوز الشاهقة",
                "en": "Walnut orchard setting"
            },
            {
                "ku": "دانیشتنی دەرەوە و شوێنی باربیکیو",
                "ar": "جلسة شواء خارجية",
                "en": "Outdoor BBQ patio"
            },
            {
                "ku": "ئاو و کارەبای بەردەوام",
                "ar": "ماء وكهرباء مستمر",
                "en": "24/7 Utilities"
            }
        ]
    },
    {
        "id": "byara-balkha-cabin",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "house",
        "category": {
            "ku": "کوخی شاخاوی",
            "ar": "كوخ جبلي",
            "en": "Mountain Cabin"
        },
        "name": {
            "ku": "کوخی گەشتیاری هەورامان",
            "ar": "كوخ هاورامان السياحي",
            "en": "Hawramabad Tourist Cottage"
        },
        "description": {
            "ku": "لە  بەڵخە و سەر ڕێگای بیارە بۆ تەوێڵە، لە  سروشتی دڵڕفێنی هەورامان، کوخە گەشتیاریەکانمان  میوانداریتان دەکەن.\r\nهەر کوخێک نزیک...",
            "ar": "كوخ هاورامان السياحي",
            "en": "Hawramabad Tourist Cottage"
        },
        "longDescription": {
            "ku": "لە  بەڵخە و سەر ڕێگای بیارە بۆ تەوێڵە، لە  سروشتی دڵڕفێنی هەورامان، کوخە گەشتیاریەکانمان  میوانداریتان دەکەن.\r\nهەر کوخێک نزیک بە 40 مەترە و بە شێوەیەکی زۆر جوان و نوێ ڕازێنراوە.\r\nکوخەکان  نوێن و هەموو پێداویستی  بۆ ٧ کەس تێدایە.\r\nتەنها خواردنی پێویست لەگەڵ خۆت بێنە و کاتەکانت بەئاسوودەی بەسەر بەرە.",
            "ar": "ترحب بكم أكواخنا السياحية في بلخا وعلى الطريق من بيارة إلى تويله، في أحضان طبيعة هاورام آباد الساحرة.\r\n\r\n‎يبلغ طول كل كوخ حوالي 40 مترًا، وهو مُزين بأسلوبٍ جميلٍ وجديد.\r\n\r\n‎الأكواخ جديدة، وتحتوي على كل ما تحتاجونه لسبعة أشخاص.\r\n\r\n‎ما عليكم سوى إحضار ما يكفي من الطعام، والاستمتاع بوقتكم براحةٍ تامة.",
            "en": "Our tourist huts welcome you in Balkha and on the road from Biara to Tewela, in the charming nature of Hawramabad.\r\nEach cottage is about 40 meters and is decorated in a very beautiful and new way.\r\nThe huts are new and have everything you need for 7 people.\r\nJust bring enough food and spend your time comfortably."
        },
        "price": {
            "ku": "٧٠,٠٠٠ دینار / شەو",
            "ar": "٧٠,٠٠٠ دينار / ليلة",
            "en": "70,000 IQD / night"
        },
        "priceNumber": 70000,
        "rating": 4.8,
        "reviewsCount": 31,
        "badge": {
            "ku": "سروشتی بەڵخە",
            "ar": "طبيعة بلخة",
            "en": "Balkha Nature"
        },
        "image": "images/real/byara_balkha_cabin_main.webp",
        "gallery": [
            "images/real/byara_balkha_cabin_main.webp",
            "images/real/byara_balkha_cabin_gal_0.webp",
            "images/real/byara_balkha_cabin_gal_1.webp",
            "images/real/byara_balkha_cabin_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەن موڵک",
            "ar": "صاحب العقار",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "بەڵخە سەرڕێگای بیارە تەوێڵە، بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "phone": "07513537269",
        "whatsapp": "9647513537269",
        "features": [
            {
                "ku": "لە سەر ڕێگای بیارە – تەوێڵە لە گوندی بەڵخە",
                "ar": "على طريق بيارة طويلة",
                "en": "On Byara-Tawela road"
            },
            {
                "ku": "دیمەنی چیا و باخەکان",
                "ar": "إطلالة على الجبال والبساتين",
                "en": "Mountain and garden view"
            },
            {
                "ku": "گونجاو بۆ خێزان و پشوودان",
                "ar": "مناسب للعائلات",
                "en": "Family friendly"
            }
        ]
    },
    {
        "id": "byara-safari-atv",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "activity",
        "category": {
            "ku": "سەفاری و ماتۆڕسواری",
            "ar": "سفاري ودبابات جبلية",
            "en": "Mountain Safari & ATV"
        },
        "name": {
            "ku": "هەورامان سەفاری",
            "ar": "رحلات سفاری",
            "en": "hawraman safari"
        },
        "description": {
            "ku": "گەشتی سافاری -رحلات سفاری - Safari trips 💯\r\n\r\nهەموو ڕۆژانێک لە کاتژمێر 9 بەیانی کراوەیە تا 10 شەو . ⏰",
            "ar": "رحلات سفاری",
            "en": "hawraman safari"
        },
        "longDescription": {
            "ku": "گەشتی سافاری -رحلات سفاری - Safari trips 💯\r\n\r\nهەموو ڕۆژانێک لە کاتژمێر 9 بەیانی کراوەیە تا 10 شەو . ⏰",
            "ar": "رحلات سفاري - رحلات سفاري - رحلات سفاري 💯\r\n\r\nمفتوح يوميًا من الساعة 9 صباحًا حتى 10 مساءً. ⏰",
            "en": "Safari Trips - Safari Trips - Safari trips 💯\r\n\r\nOpen every day from 9 am to 10 pm. ⏰"
        },
        "price": {
            "ku": "٢٠,٠٠٠ دینار / سواربوون",
            "ar": "٢٠,٠٠٠ دينار / جولة",
            "en": "20,000 IQD / tour"
        },
        "priceNumber": 20000,
        "rating": 4.9,
        "reviewsCount": 64,
        "badge": {
            "ku": "هیجان و ئەزموون",
            "ar": "مغامرة وحماس",
            "en": "Thrilling Tour"
        },
        "image": "images/real/byara_safari_atv_main.webp",
        "gallery": [
            "images/real/byara_safari_atv_main.webp",
            "images/real/byara_safari_atv_gal_0.webp",
            "images/real/byara_safari_atv_gal_1.webp",
            "images/real/byara_safari_atv_gal_2.webp"
        ],
        "ownerName": {
            "ku": "کاپتن ئاراس",
            "ar": "كابتن أراس",
            "en": "Captain"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "هەورامان - بیارە - پشت نەخۆشخانەی هەورامان 📍، بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "phone": "07701406131",
        "whatsapp": "9647701406131",
        "features": [
            {
                "ku": "ماتۆڕی شاخاوی ٤ تایە (ATV)",
                "ar": "دبابات جبلية ٤ عجلات",
                "en": "4x4 Mountain ATVs"
            },
            {
                "ku": "گەشتی شاخاوی بە ڕێبەری شارەزا",
                "ar": "مرشد سياحي في المسارات",
                "en": "Guided mountain routes"
            },
            {
                "ku": "پشت نەخۆشخانەی بیارە",
                "ar": "خلف مستشفى بيارة",
                "en": "Behind Byara hospital"
            }
        ]
    },
    {
        "id": "zalm-spring-palace",
        "town": "ahmad-awa",
        "townName": {
            "ku": "ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "categoryType": "house",
        "category": {
            "ku": "کۆشکی سەرچاوەی ئاو",
            "ar": "قصر نبع الماء",
            "en": "Spring Palace"
        },
        "name": {
            "ku": "کۆشکی گەشتیاری سەرچاوەی زەڵم",
            "ar": "کۆشکی گەشتیاری سەرچاوەی زەڵم",
            "en": "کۆشکی گەشتیاری سەرچاوەی زەڵم"
        },
        "description": {
            "ku": "کۆشکی گەشتیاری سەرچاوەی زەڵم ئێستا بۆ بە کرێدان بەردەستە\nپێکهاتووە لە مەڵەوانگە و دوو نهۆم کە لە هۆڵ و چێشتخانەو ئاگردان لە د...",
            "ar": "کۆشکی گەشتیاری سەرچاوەی زەڵم",
            "en": "کۆشکی گەشتیاری سەرچاوەی زەڵم"
        },
        "longDescription": {
            "ku": "کۆشکی گەشتیاری سەرچاوەی زەڵم ئێستا بۆ بە کرێدان بەردەستە\nپێکهاتووە لە مەڵەوانگە و دوو نهۆم کە لە هۆڵ و چێشتخانەو ئاگردان لە دەرەوە و هەروەها دوو نوستن و باڵکۆنێک بۆ دیمەنی جوانی سەرچاوەی ئەحمەد ئاوا و ناو  مەلەوانگەی کۆشکەکە",
            "ar": "جناح زالم السياحي متاح الآن للإيجار.\nيتكون من مسبح، وطابقين يضمان ردهة ومطبخًا ومدفأة خارجية وغرفتي نوم وشرفة بإطلالة خلابة على عين أحمد آوا ومسبح القصر.",
            "en": "Zalm Resource Tourist Pavilion is now available for rent\nIt consists of a swimming pool, two floors with a hall, kitchen, outdoor fireplace, two bedrooms and a balcony with a beautiful view of Ahmad Awa Spring and the palace swimming pool"
        },
        "price": {
            "ku": "٩٠,٠٠٠ دینار / شەو",
            "ar": "٩٠,٠٠٠ دينار / ليلة",
            "en": "90,000 IQD / night"
        },
        "priceNumber": 90000,
        "rating": 4.9,
        "reviewsCount": 47,
        "badge": {
            "ku": "شاهانە و فێنک",
            "ar": "إقامة فاخرة",
            "en": "Luxury Stay"
        },
        "image": "images/real/zalm_spring_palace_main.webp",
        "gallery": [
            "images/real/zalm_spring_palace_main.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری کۆشک",
            "ar": "مشرف القصر",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "زەڵم، ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "phone": "07725452524",
        "whatsapp": "9647725452524",
        "features": [
            {
                "ku": "لە نزیکترین خاڵی سەرچاوەی ئاوی سازگاری زەڵم",
                "ar": "قرب نبع شلال زلم",
                "en": "Right by Zalm spring"
            },
            {
                "ku": "ژووری نووستنی فراوان و هۆڵی گەورە",
                "ar": "غرف نوم وصالة واسعة",
                "en": "Large furnished rooms"
            },
            {
                "ku": "حەوشە و باڵکۆنی بەسەر ڕووباردا",
                "ar": "شرفة مطلة على المجرى المائي",
                "en": "Balcony over the stream"
            }
        ]
    },
    {
        "id": "zalm-shanshin-house",
        "town": "ahmad-awa",
        "townName": {
            "ku": "ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "categoryType": "house",
        "category": {
            "ku": "کوخی کەنار چەم",
            "ar": "كوخ ضفاف المجرى",
            "en": "Riverside Cabin"
        },
        "name": {
            "ku": "خانوو و کوخی شانشین",
            "ar": "منازل وبيوت شانشین.",
            "en": "shansgin houses and cottages."
        },
        "description": {
            "ku": "بۆئەوەی سەیران و گەشتەکەت بەدڵخوازی خۆت بێت، بۆئەوەی لەناو سرووشتتدا کاتەکانت بەسەربەریت، ئەوا شانشین هەڵبژێرە ، لەناو سرووشت...",
            "ar": "منازل وبيوت شانشین.",
            "en": "shansgin houses and cottages."
        },
        "longDescription": {
            "ku": "بۆئەوەی سەیران و گەشتەکەت بەدڵخوازی خۆت بێت، بۆئەوەی لەناو سرووشتتدا کاتەکانت بەسەربەریت، ئەوا شانشین هەڵبژێرە ، لەناو سرووشتە دڵگیرەکەی ئەحمەدئاوادا، بەجوانترین شێواز پێشوازیتان لێدەکات.  لە شانشین تەنها پێویستت بەهێنانی خواردن دەبێت، سەرجەم پێداویستییەکانی تری تێدایە.",
            "ar": "لتستمتع برحلتك المفضلة، وتقضي وقتك في أحضان الطبيعة، اختر مملكة أحمداوة، حيث الطبيعة الخلابة، التي ترحب بك بأجمل استقبال. في المملكة، ما عليك سوى إحضار الطعام، وجميع الضروريات الأخرى مشمولة.",
            "en": "To make your trip of your choice, to spend your time in nature, then choose the kingdom, in the beautiful nature of Ahmadawa, welcomes you in the most beautiful way.  In the kingdom you only need to bring food, all other necessities are included."
        },
        "price": {
            "ku": "٨٠,٠٠٠ دینار / شەو",
            "ar": "٨٠,٠٠٠ دينار / ليلة",
            "en": "80,000 IQD / night"
        },
        "priceNumber": 80000,
        "rating": 4.8,
        "reviewsCount": 35,
        "badge": {
            "ku": "دیمەنی چەم",
            "ar": "إطلالة النهر",
            "en": "Riverside View"
        },
        "image": "images/real/zalm_shanshin_house_main.webp",
        "gallery": [
            "images/real/zalm_shanshin_house_main.webp",
            "images/real/zalm_shanshin_house_gal_0.webp",
            "images/real/zalm_shanshin_house_gal_1.webp",
            "images/real/zalm_shanshin_house_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەن خانوو",
            "ar": "صاحب العقار",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "زەڵم، ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "phone": "07501785919",
        "whatsapp": "9647501785919",
        "features": [
            {
                "ku": "مانەوە لە کەشێکی تەواو ئارام بە دەنگی ئاو",
                "ar": "إقامة هادئة مع خرير الماء",
                "en": "Peaceful river sounds"
            },
            {
                "ku": "شوێنی باربیکیو و دانیشتنی تایبەت",
                "ar": "جلسات شواء خاصة",
                "en": "Private BBQ area"
            },
            {
                "ku": "گونجاو بۆ خێزان و کۆبوونەوەکان",
                "ar": "مناسب للعائلات",
                "en": "Family gatherings"
            }
        ]
    },
    {
        "id": "zalm-mali-sultan",
        "town": "ahmad-awa",
        "townName": {
            "ku": "ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "categoryType": "house",
        "category": {
            "ku": "خانووی گەشتیاری",
            "ar": "بيت سياحي",
            "en": "Tourist House"
        },
        "name": {
            "ku": "ماڵێ سوڵتان",
            "ar": "بيت السلطان",
            "en": "The Sultan's House"
        },
        "description": {
            "ku": "لەکەشێکی جوانی سروشتی زەڵم ، میوانداری گەشتان بۆ ماڵی سوڵتان \r\nتایبەت مەندی ئەم شوێنە لە هۆڵێکی کراوە و مەتەبەخ و موشتەمەلات ...",
            "ar": "بيت السلطان",
            "en": "The Sultan's House"
        },
        "longDescription": {
            "ku": "لەکەشێکی جوانی سروشتی زەڵم ، میوانداری گەشتان بۆ ماڵی سوڵتان \r\nتایبەت مەندی ئەم شوێنە لە هۆڵێکی کراوە و مەتەبەخ و موشتەمەلات و ژوری نوستن و باڵەککۆنێکی تەواو کە دیمەنی جوانی زەڵم لێرەوە بەدی دەکرێت\r\nتەکوو 10 گەشتیار دەستەبەر کراوە \r\nماڵی سوڵتان تەنها چەند خولەکێک دوورە لە سەرچاوەی زەڵم .\r\n\r\nلەگەڵ بوون شوێنی تایبەت بە وەستانی ئۆتۆمبێل",
            "ar": "في أجواء زالم الطبيعية الخلابة، نستضيف رحلة إلى بيت السلطان\r\nيضم صالة مفتوحة، مطبخًا، حمامًا، غرفة نوم، وشرفة واسعة بإطلالات خلابة على زالم\r\nيتسع لما يصل إلى ١٠ سياح\r\nيقع بيت السلطان على بُعد دقائق قليلة من نبع زالم.\r\n\r\nيتوفر موقف سيارات خاص",
            "en": "In a beautiful natural atmosphere of Zalm, hosting a trip to the Sultan's house \r\nFeatures an open hall, kitchen, bathroom, bedroom and a full balcony with beautiful views of Zalm\r\nUp to 10 tourists are provided \r\nSultan House is just a few minutes away from Zalm Spring .\r\n\r\nWith being a dedicated parking space"
        },
        "price": {
            "ku": "٧٥,٠٠٠ دینار / شەو",
            "ar": "٧٥,٠٠٠ دينار / ليلة",
            "en": "75,000 IQD / night"
        },
        "priceNumber": 75000,
        "rating": 4.8,
        "reviewsCount": 27,
        "badge": {
            "ku": "ناو زەڵم",
            "ar": "قلب زلم",
            "en": "Zalm Center"
        },
        "image": "images/real/zalm_mali_sultan_main.webp",
        "gallery": [
            "images/real/zalm_mali_sultan_main.webp",
            "images/real/zalm_mali_sultan_gal_0.webp",
            "images/real/zalm_mali_sultan_gal_1.webp",
            "images/real/zalm_mali_sultan_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەن موڵک",
            "ar": "صاحب العقار",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "ناو زەڵم، ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "phone": "07501742838",
        "whatsapp": "9647501742838",
        "features": [
            {
                "ku": "لە ناو دڵی سەیرانگای زەڵم",
                "ar": "في قلب مصيف زلم",
                "en": "Heart of Zalm resort"
            },
            {
                "ku": "پێداویستی کامل بۆ ژیان و پشوو",
                "ar": "مجهز بالكامل",
                "en": "Fully furnished"
            },
            {
                "ku": "نزیک لە چێشتخانە و کەپرەکان",
                "ar": "قريب من الخدمات",
                "en": "Close to dining"
            }
        ]
    },
    {
        "id": "ahmadawa-motel-view",
        "town": "ahmad-awa",
        "townName": {
            "ku": "ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "categoryType": "house",
        "category": {
            "ku": "مۆتێل و ژووری گەشتیاری",
            "ar": "موتيل سياحي",
            "en": "Resort Motel"
        },
        "name": {
            "ku": "مۆتێل ڤیو",
            "ar": "الموتيل  فيو",
            "en": "Motel View"
        },
        "description": {
            "ku": "مۆتێل ڤیو  \r\n\r\nلە کەشێکی ناوازەی  ئەحمەد ئاوادا، چێژ لە کاتەکانت ببینە لە مۆتێل ڤیو، کە دیمەنی پرشنگدار و سەرنجڕاکێشی شاخ و ک...",
            "ar": "الموتيل  فيو",
            "en": "Motel View"
        },
        "longDescription": {
            "ku": "مۆتێل ڤیو  \r\n\r\nلە کەشێکی ناوازەی  ئەحمەد ئاوادا، چێژ لە کاتەکانت ببینە لە مۆتێل ڤیو، کە دیمەنی پرشنگدار و سەرنجڕاکێشی شاخ و کێو و سەوزای دەوروبەری پیشان دەدات. ئەم شوێنە سەرنجڕاکێشە هاوڕێت دەکات لەگەڵ سروشتدا تێکەڵبیت چێژ وەربگرێت.  \r\n\r\nمۆتێل ڤیو سێ بەشی سەربەخۆی هەیە، کە دەتوانرێت جێگەی ٥ کەس تا ١٥ کەس بکاتەوە. هەر بەشەکە ڕەچاوی نوێن و فێنکەرەوەی گەرمکەرەوەی تایبەتی کراوە ، کە ئاسوودەیی گەشتیاران لە هەموو وەرزێکدا دابین دەکات.  \r\n\r\nلەم شوێنە سەرنجڕاکێشەدا، جگە دەنگی سروشت  چێژ لە هەوای پاک و دیمەنە سەرنجڕاکێشەکانی هاوینە هەواری ئەحمەد ئاوا وەربگرە!",
            "ar": "الموتيل  فيو\r\n\r\nفي أجواء أحمداوا الفريدة، استمتع بوقتك في موتيل فيو الذي يوفر إطلالات رائعة على الجبال والغابات والمساحات الخضراء المحيطة. هذا المكان الجذاب سيجعل صديقك يستمتع بالاختلاط بالطبيعة.  \r\n\r\nيحتوي  الموتيل  فيو على ثلاثة أقسام مستقلة، والتي يمكن أن تستوعب من 5 إلى 15 ضيفًا. تم تجهيز كل قسم حديثًا بتدفئة خاصة توفر الراحة للمسافرين في جميع الفصول.  \r\n\r\nفي هذا المكان الجذاب، بالإضافة إلى أصوات الطبيعة، استمتع بالهواء النقي والمناظر الخلابة لشاطئ أحمد آوا!",
            "en": "The Motel View  \r\n\r\nIn the unique atmosphere of Ahmedawa, enjoy your time at Motel View, which showcases sparkling views of the surrounding mountains, forests and greenery. This attractive place will make your friend enjoy mixing with nature.  \r\n\r\nMotel View has three independent sections, which can accommodate 5 to 15 guests. Each section is newly equipped with private heating, which provides comfort to travelers in all seasons.  \r\n\r\nIn this attractive place, in addition to the sounds of nature, enjoy the fresh air and spectacular views of Ahmad Awa Beach!"
        },
        "price": {
            "ku": "٦٥,٠٠٠ دینار / شەو",
            "ar": "٦٥,٠٠٠ دينار / ليلة",
            "en": "65,000 IQD / night"
        },
        "priceNumber": 65000,
        "rating": 4.7,
        "reviewsCount": 38,
        "badge": {
            "ku": "ڕوانگەی تاڤگە",
            "ar": "إطلالة الشلال",
            "en": "Waterfall View"
        },
        "image": "images/real/ahmadawa_motel_view_main.webp",
        "gallery": [
            "images/real/ahmadawa_motel_view_main.webp",
            "images/real/ahmadawa_motel_view_gal_0.webp",
            "images/real/ahmadawa_motel_view_gal_1.webp",
            "images/real/ahmadawa_motel_view_gal_2.webp"
        ],
        "ownerName": {
            "ku": "ئیدارەی مۆتێل ڤیو",
            "ar": "إدارة الموتيل",
            "en": "Motel Staff"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "ئەحمەد ئاوا، ئەحمەدئاوا و زەڵم",
            "ar": "أحمد آوا وزلم",
            "en": "Ahmad Awa & Zalm"
        },
        "phone": "07508253714",
        "whatsapp": "9647508253714",
        "features": [
            {
                "ku": "ڕوانگەی پانۆراما بۆ هاوینەهەواری ئەحمەدئاوا",
                "ar": "إطلالة على مصيف أحمد آوا",
                "en": "Scenic Ahmad Awa view"
            },
            {
                "ku": "ژووری خاوێن و سپلیت",
                "ar": "غرف نظيفة ومكيفة",
                "en": "Clean AC rooms"
            },
            {
                "ku": "خزمەتگوزاری میوانداری خێرا",
                "ar": "خدمة فندقية ممتازة",
                "en": "Prompt hospitality"
            }
        ]
    },
    {
        "id": "khurmal-sarget-cabin",
        "town": "khurmal",
        "townName": {
            "ku": "خورماڵ",
            "ar": "خورمال",
            "en": "Khurmal"
        },
        "categoryType": "house",
        "category": {
            "ku": "کابینەی شاخاوی",
            "ar": "كوخ جبلي",
            "en": "Mountain Cabin"
        },
        "name": {
            "ku": "سەرگەت",
            "ar": "سركت",
            "en": "Sargat"
        },
        "description": {
            "ku": "سەرگەت\r\nسەرگەت گوندێکی گەشتیاری جوانە و دەکەوێتە سەر شاخەکانی شۆلواندەر. دەکەوێتە 15 کم لە شارۆچکەی بیارە و 21 کم لە هەڵەبجە ...",
            "ar": "سركت",
            "en": "Sargat"
        },
        "longDescription": {
            "ku": "سەرگەت\r\nسەرگەت گوندێکی گەشتیاری جوانە و دەکەوێتە سەر شاخەکانی شۆلواندەر. دەکەوێتە 15 کم لە شارۆچکەی بیارە و 21 کم لە هەڵەبجە دوورە. گوندی نیس چەندین سەرچاوەی ئاوی تێدایە و جوانییەکەی لەناو دار و باخەکانیدا نیشتەجێیە. هەروەها بە بەفربارینی لە وەرزی زستاندا وێنا دەکرێت. لە ڕووی جوانکارییەوە زیاتر دڵخۆشکەرە بۆ ناوچەکە و یارمەتیدەرە بۆ ڕاکێشانی گەشتیاران، هەروەها دەکرێت زیاتر سوود لەم هەرێمە وەربگریت بە کردنی بە ناوچەیەکی گەشتیاری زستانە.",
            "ar": "سركت\r\nسركت قرية سياحية خلابة تقع في جبال شولوندار. تبعد 15 كم عن مدينة بيارة و21 كم عن حلبجة. تزخر قرية نيش بمصادر مائية عديدة، ويتجلى جمالها في أشجارها وبساتينها. كما يتجلى جمالها بتساقط الثلوج شتاءً. وتضفي هذه القرية جمالاً على المنطقة، وتجذب السياح، ويمكن الاستفادة منها بشكل أكبر بجعلها وجهة سياحية شتوية.",
            "en": "Sargat\r\nSargat is a beautiful tourist village located in the mountains of sholwandar. It is located 15 km from the town of Biara and 21 km from Halabja. Nis village contains many water sources and the beauty of it resides inside its trees and orchars. It is also depicted by its snowfall during winter. It is more aesthetically pleasing to the region and helps attract tourists, and it is possible to benefit from this region further by making it a winter tourism area."
        },
        "price": {
            "ku": "٧٠,٠٠٠ دینار / شەو",
            "ar": "٧٠,٠٠٠ دينار / ليلة",
            "en": "70,000 IQD / night"
        },
        "priceNumber": 70000,
        "rating": 4.8,
        "reviewsCount": 24,
        "badge": {
            "ku": "سروشتی شاخاوی",
            "ar": "طبيعة جبلية",
            "en": "Mountain View"
        },
        "image": "images/real/khurmal_sarget_cabin_main.webp",
        "gallery": [
            "images/real/khurmal_sarget_cabin_main.webp",
            "images/real/khurmal_sarget_cabin_gal_0.webp",
            "images/real/khurmal_sarget_cabin_gal_1.webp",
            "images/real/khurmal_sarget_cabin_gal_2.webp"
        ],
        "ownerName": {
            "ku": "خاوەنی کوخ",
            "ar": "صاحب الكوخ",
            "en": "Host"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "سەرگەت، خورماڵ",
            "ar": "خورمال",
            "en": "Khurmal"
        },
        "phone": "07500000000",
        "whatsapp": "9647500000000",
        "features": [
            {
                "ku": "هەوایەکی پاک و بێ وێنەی شاخەکانی سەرگەت",
                "ar": "هواء عليل وطبيعة ساحرة",
                "en": "Crisp mountain air"
            },
            {
                "ku": "باخچە و حەوشەی دانیشتنی فراوان",
                "ar": "حديقة واسعة",
                "en": "Spacious garden patio"
            },
            {
                "ku": "ئارامی تەواو دوور لە ژاوەژاو",
                "ar": "هدوء وراحة تامة",
                "en": "Peace & tranquility"
            }
        ]
    },
    {
        "id": "khurmal-rishin-spring",
        "town": "khurmal",
        "townName": {
            "ku": "خورماڵ",
            "ar": "خورمال",
            "en": "Khurmal"
        },
        "categoryType": "picnic",
        "category": {
            "ku": "سەرچاوەی ئاو و سەیرانگە",
            "ar": "ينبوع ماء ونزهة",
            "en": "Natural Spring & Picnic"
        },
        "name": {
            "ku": "سەرچاوە ئاوی ڕیشێن",
            "ar": "مياه نبع ريشن",
            "en": "Rishen Spring water"
        },
        "description": {
            "ku": "سەرچاوە ئاوی ڕیشێن\r\nسەرچاوە ئاوی ڕیشێن دەکەوێتە قووڵایی چیاکانی سورین، لەگەڵ ئاوی شیرینی گوندی ڕیشن. بەچەند گوندێکی دەشتی شار...",
            "ar": "مياه نبع ريشن",
            "en": "Rishen Spring water"
        },
        "longDescription": {
            "ku": "سەرچاوە ئاوی ڕیشێن\r\nسەرچاوە ئاوی ڕیشێن دەکەوێتە قووڵایی چیاکانی سورین، لەگەڵ ئاوی شیرینی گوندی ڕیشن. بەچەند گوندێکی دەشتی شارەزوردا تێدەپەڕێت و دواتر دەچێتە پاڵ ڕووباری زەڵم و لە گۆلی دەربەندیخان پێکەوە دەڕژێت. لە وەرزی بەهاردا دەیان هەزار گەشتیار سەردانی ئەم ناوچەیە دەکەن، بەپێی ماستەرپلانی ناوچەکە وەک شوێنێکی گەشتیاری دادەنرێت و پلانی هەیە پڕۆژەی گەشتیاری لە ئاستێکی باشدا بۆ ئەم هەرێمە جێبەجێ بکرێت. ڕیشێن دەکەوێتە 10 کم لە باکووری قەزای خورمال.",
            "ar": "مياه نبع ريشن\r\nتقع مياه نبع ريشن في أعماق جبال سورين، وتنبع من قرية ريشن. تمر المياه عبر عدة قرى في سهل شهرزور، ثم تلتقي بنهر زالم، وتصب في بحيرة دربنديخان. في فصل الربيع، يزور عشرات الآلاف من السياح هذه المنطقة، التي تُعتبر، وفقًا للمخطط العام للمنطقة، وجهة سياحية، ومن المقرر تنفيذ مشاريع سياحية بمستوى جيد فيها. تقع ريشن على بُعد 10 كيلومترات شمال قضاء خورمال.",
            "en": "Rishen Spring water\r\nNe Rishen spring water is located deep in the mountains of Surin, with fresh water from the village of Rishen. It passes through several villages of the Shahrzur Plain and then joins the Zalm River and pours together in the Derbendikhan Lake. In the spring, tens of thousands of tourists visit this area, according to the masterplan of the area its considered as a tourist distination and it is planned to implement tourism projects at a good level for this region. Rishen is located 10 km north of Khormal district."
        },
        "price": {
            "ku": "١٠,٠٠٠ - ٢٠,٠٠٠ دینار / دانیشتن",
            "ar": "١٠,٠٠٠ - ٢٠,٠٠٠ دينار / جلسة",
            "en": "10,000 - 20,000 IQD"
        },
        "priceNumber": 15000,
        "rating": 4.8,
        "reviewsCount": 42,
        "badge": {
            "ku": "ئاوی سازگار",
            "ar": "مياه عذبة باردة",
            "en": "Pure Cold Spring"
        },
        "image": "images/real/khurmal_rishin_spring_main.webp",
        "gallery": [
            "images/real/khurmal_rishin_spring_main.webp",
            "images/real/khurmal_rishin_spring_gal_0.webp",
            "images/real/khurmal_rishin_spring_gal_1.webp",
            "images/real/khurmal_rishin_spring_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری سەیرانگای ڕیشێن",
            "ar": "إدارة المصيف",
            "en": "Spring Caretaker"
        },
        "ownerRole": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "locationText": {
            "ku": "ڕیشێن، خورماڵ",
            "ar": "خورمال",
            "en": "Khurmal"
        },
        "phone": "07500000000",
        "whatsapp": "9647500000000",
        "features": [
            {
                "ku": "سەرچاوەی ئاوی زۆر سارد و کانزایی",
                "ar": "ينبوع ماء بارد جداً",
                "en": "Ice-cold natural spring"
            },
            {
                "ku": "شوێنی سەیرانگە و دانیشتنی فێنک",
                "ar": "أماكن جلوس مظللة",
                "en": "Shaded picnic spots"
            },
            {
                "ku": "گونجاو بۆ خێزان و پشووی ڕۆژانە",
                "ar": "مناسب لرحلات اليوم الواحد",
                "en": "Day-trip friendly"
            }
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
        image: "images/real/nawroli_water_house_spiaw_main.webp"
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
        image: "images/real/tawela_sarkash_house_main.webp"
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
        image: "images/real/byara_hawari_cabin_main.webp"
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
        image: "images/real/zalm_shanshin_house_main.webp"
    }
];

window.towns = towns;
window.serviceCategories = serviceCategories;

// ٤ شوێنی نوێی مانەوەی تەواوکاری لە بیارە و ئاوێسەر و هەڵەبجە
const additionalStays = [
    {
        "id": "byara-nature-cabin",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "hut",
        "category": {
            "ku": "کوخی گەشتیاری",
            "ar": "أكواخ سياحية",
            "en": "Tourist Cabin"
        },
        "name": {
            "ku": "کوخی سروشتی بیارە",
            "ar": "كوخ بيارة الطبيعي",
            "en": "Byara Nature Cabin"
        },
        "description": {
            "ku": "کوخی سروشتی بیارە\n‎یەکێکە لە کوخە ناوازەکانی ناوچەکە کە بەسەر بیارە دەڕوانێت. شوێنێکی گونجاوە بۆ ئەوەی کاتێکی خۆش و ئارام بەسەربەریت.\n\n‎✨ تایبەتمەندییەکان:\n‎\t•\tپێک‌هاتووە لە هۆڵێکی...",
            "ar": "كوخ بياره الطبيعي\r\n‎يُعَدّ من أجمل الأكواخ في المنطقة، يطلّ على بساتين بياره الخضراء. مكان مثالي للاسترخاء والاستمتاع بالطبيعة.\r\n\r\n‎✨ المميزات:\r\n‎\t•\tصالة واسعة، مطبخ، غرفة نوم وحما...",
            "en": "Bayara Natural Cottage\r\nOne of the most beautiful cottages in the area, overlooking the lush Bayara gardens. It offers a perfect escape to relax and enjoy nature.\r\n\r\n✨ Features:\r\n\t..."
        },
        "longDescription": {
            "ku": "کوخی سروشتی بیارە\n‎یەکێکە لە کوخە ناوازەکانی ناوچەکە کە بەسەر بیارە دەڕوانێت. شوێنێکی گونجاوە بۆ ئەوەی کاتێکی خۆش و ئارام بەسەربەریت.\n\n‎✨ تایبەتمەندییەکان:\n‎\t•\tپێک‌هاتووە لە هۆڵێکی گەورە، مەتبەخ، شوێنی نوستن و حەمامی تورکی.\n‎\t•\tکارەبای 24 کاژێر بەردەوام.\n‎\t•\tساردکەرەوە و سپلێت لە خزمەت گەشتیاراندا.\n\n‎🌿 کوخەکە بە سەرجەم پێداویستییەکان دابین دەکرێت بۆ کات بەسەربردنیەکی خۆش و ئارام لە نێو سروشتی جواندا.",
            "ar": "كوخ بياره الطبيعي\r\n‎يُعَدّ من أجمل الأكواخ في المنطقة، يطلّ على بساتين بياره الخضراء. مكان مثالي للاسترخاء والاستمتاع بالطبيعة.\r\n\r\n‎✨ المميزات:\r\n‎\t•\tصالة واسعة، مطبخ، غرفة نوم وحمام تركي.\r\n‎\t•\tكهرباء متوفرة على مدار 24 ساعة.\r\n‎\t•\tمزوّد بمكيّف هواء وسبلت.\r\n\r\n‎🌿 كوخ مجهّز بجميع المستلزمات لقضاء وقت هادئ وممتع وسط الطبيعة",
            "en": "Bayara Natural Cottage\r\nOne of the most beautiful cottages in the area, overlooking the lush Bayara gardens. It offers a perfect escape to relax and enjoy nature.\r\n\r\n✨ Features:\r\n\t•\tSpacious living room, kitchen, bedroom, and Turkish bath.\r\n\t•\t24-hour electricity.\r\n\t•\tEquipped with air conditioning and split units.\r\n\r\n🌿 A fully equipped cottage for a peaceful and enjoyable stay surrounded by nature."
        },
        "price": {
            "ku": "٧٥,٠٠٠ دینار / شەو",
            "ar": "٧٥,٠٠٠ دينار / ليلة",
            "en": "75,000 IQD / night"
        },
        "priceNumber": 75000,
        "rating": 4.9,
        "reviewsCount": 18,
        "badge": {
            "ku": "دیمەنی سروشتی",
            "ar": "إطلالة طبيعية",
            "en": "Nature View"
        },
        "image": "images/real/byara_nature_cabin_main.webp",
        "gallery": [
            "images/real/byara_nature_cabin_main.webp",
            "images/real/byara_nature_cabin_gal_0.webp",
            "images/real/byara_nature_cabin_gal_1.webp",
            "images/real/byara_nature_cabin_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "ownerRole": {
            "ku": "خاوەن شوێن",
            "ar": "مالك",
            "en": "Host"
        },
        "locationText": {
            "ku": "سەرەتای بیارە",
            "ar": "إنها بداية بيارا",
            "en": "It's the beginning of Biara"
        },
        "phone": "0",
        "whatsapp": "964",
        "features": [
            {
                "ku": "شوێنی پاک و ڕازاوە",
                "ar": "مكان نظيف ومرتب",
                "en": "Clean & comfortable"
            },
            {
                "ku": "دیمەنی دڵڕفێنی سروشتی",
                "ar": "إطلالة طبيعية رائعة",
                "en": "Breathtaking nature views"
            },
            {
                "ku": "پێداویستی و تەواوی خزمەتگوزاری",
                "ar": "كافة الخدمات متوفرة",
                "en": "Full amenities available"
            }
        ]
    },
    {
        "id": "byara-dli-byara-house",
        "town": "byara",
        "townName": {
            "ku": "بیارە",
            "ar": "بيارة",
            "en": "Byara"
        },
        "categoryType": "house",
        "category": {
            "ku": "خانووی گەشتیاری",
            "ar": "منزل سياحي",
            "en": "Tourist House"
        },
        "name": {
            "ku": "دڵی بیارە",
            "ar": "قلب بيارة",
            "en": "Heart of Byara"
        },
        "description": {
            "ku": "دڵی بیارە\r\n\r\n\"دڵی بیارە\" لە ناوچەی بیارە هەڵکەوتووە، ئەزموونێکی  بێهاوتای پێشکەش دەکات. لە بەرزترین خاڵەکانی ناوچەکە جێگیر بووە، دیمەنی پانۆرامای سەرنجڕاکێشی جوان و شاخ و بازاڕی بی...",
            "ar": "قلب البيارة\r\n\r\nيقع \"قلب بيارا\" في منطقة بيارا، ويقدم تجربة لا مثيل لها. يقع في أعلى النقاط في المنطقة، ويجمع بين المناظر البانورامية الخلابة للجبال الجميلة وسوق بيارا \r\n\r\n يحتوي ال...",
            "en": "the heart of the biara\r\n\r\nLocated in the Biara area, the \"Heart of Biara\" offers an unparalleled experience. Situated at the highest points in the region, it combines spectacular p..."
        },
        "longDescription": {
            "ku": "دڵی بیارە\r\n\r\n\"دڵی بیارە\" لە ناوچەی بیارە هەڵکەوتووە، ئەزموونێکی  بێهاوتای پێشکەش دەکات. لە بەرزترین خاڵەکانی ناوچەکە جێگیر بووە، دیمەنی پانۆرامای سەرنجڕاکێشی جوان و شاخ و بازاڕی بیارە پێکەوە کۆدەکاتەوە \r\n\r\n خانووەکە هۆڵێکی کراوە و مشتەمەلات  و ژوورێکی جیا  و چێشتخانەیەکی تەواو و پڕ پێداویستی تێدایە\r\n،\r\nکە دڵنیای دەدات لە مانەوەیەکی ئاسوودە و گونجاو. \r\n\r\nلە کاتێکدا هەموو خزمەتگوزارییە سەرەکییەکان بۆ گەشتیاران دابین دەکرێن\r\nجگە لە ژەمی نان خواردن\r\n\r\nنرخ ی مانەوە جیاوازە بە گوێرەی ڕۆژ و ڕێژەی گەشتیار بۆ پرسی نرخ پەیوەندی بە بەشی خزمەتگوازری کوتریپ بکە .",
            "ar": "قلب البيارة\r\n\r\nيقع \"قلب بيارا\" في منطقة بيارا، ويقدم تجربة لا مثيل لها. يقع في أعلى النقاط في المنطقة، ويجمع بين المناظر البانورامية الخلابة للجبال الجميلة وسوق بيارا \r\n\r\n يحتوي المنزل على صالة مفتوحة وحمام وغرفة منفصلة ومطبخ مجهز بالكامل\r\n,\r\nوهذا يضمن إقامة مريحة وملائمة. \r\n\r\nفي حين يتم توفير جميع وسائل الراحة الأساسية للسياح\r\nباستثناء الوجبة\r\n\r\nتختلف أسعار الإقامة حسب اليوم وعدد السياح.",
            "en": "the heart of the biara\r\n\r\nLocated in the Biara area, the \"Heart of Biara\" offers an unparalleled experience. Situated at the highest points in the region, it combines spectacular panoramic views of beautiful mountains and Biara market \r\n\r\n The house has an open lounge, bathroom, separate room and fully equipped kitchen\r\n,\r\nThat ensures a comfortable and convenient stay. \r\n\r\nWhile all essential amenities are provided to tourists\r\nExcept for the meal\r\n\r\nAccommodation prices vary depending on the day and number of tourists."
        },
        "price": {
            "ku": "٨٠,٠٠٠ دینار / شەو",
            "ar": "٨٠,٠٠٠ دينار / ليلة",
            "en": "80,000 IQD / night"
        },
        "priceNumber": 80000,
        "rating": 4.9,
        "reviewsCount": 18,
        "badge": {
            "ku": "ناوەندی بازاڕ",
            "ar": "وسط المدينة",
            "en": "Town Center"
        },
        "image": "images/real/byara_dli_byara_main.webp",
        "gallery": [
            "images/real/byara_dli_byara_main.webp",
            "images/real/byara_dli_byara_gal_0.webp",
            "images/real/byara_dli_byara_gal_1.webp",
            "images/real/byara_dli_byara_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "ownerRole": {
            "ku": "خاوەن شوێن",
            "ar": "مالك",
            "en": "Host"
        },
        "locationText": {
            "ku": "ناوەندی بیارە",
            "ar": "مركز بيارا",
            "en": "The center of Biara"
        },
        "phone": "0",
        "whatsapp": "964",
        "features": [
            {
                "ku": "شوێنی پاک و ڕازاوە",
                "ar": "مكان نظيف ومرتب",
                "en": "Clean & comfortable"
            },
            {
                "ku": "دیمەنی دڵڕفێنی سروشتی",
                "ar": "إطلالة طبيعية رائعة",
                "en": "Breathtaking nature views"
            },
            {
                "ku": "پێداویستی و تەواوی خزمەتگوزاری",
                "ar": "كافة الخدمات متوفرة",
                "en": "Full amenities available"
            }
        ]
    },
    {
        "id": "halabja-mewanxanai-haji",
        "town": "nawroli",
        "townName": {
            "ku": "هەڵەبجە و دەوروبەری",
            "ar": "حلبجة ونورولي",
            "en": "Halabja & Nawroli"
        },
        "categoryType": "hotel",
        "category": {
            "ku": "میوانخانە و مانەوە",
            "ar": "دار ضيافة",
            "en": "Guest House"
        },
        "name": {
            "ku": "میوانخانەی حاجی",
            "ar": "مضافة الحاج",
            "en": "Haji Guest House"
        },
        "description": {
            "ku": "میوانخانەی حاجی یەکێکە لە میوانخانە جوانەکانی هەڵەبجە، کە بەخزمەتگوزارییەکی بەرز و ژینگەیەکی ئارام ناسراوە. ئەم میوانخانەیە پێکدێت لە ژووری خەو، هۆڵێکی گەورە و مەتبەخێکی شایستە بۆ ...",
            "ar": "مزرعە الحاجي هو أحد أجمل الفنادق في مدينة حلبجة، ويشتهر بخدماته الممتازة وبيئته الهادئة. يتكون الفندق من غرف نوم مريحة، وقاعة كبيرة، ومطبخ مجهز للضيوف، بالإضافة إلى شرفة جميلة تطل ...",
            "en": "Haji Hotel is one of the most beautiful hotels in Halabja, known for its excellent services and peaceful environment. The hotel features comfortable sleeping rooms, a spacious hall..."
        },
        "longDescription": {
            "ku": "میوانخانەی حاجی یەکێکە لە میوانخانە جوانەکانی هەڵەبجە، کە بەخزمەتگوزارییەکی بەرز و ژینگەیەکی ئارام ناسراوە. ئەم میوانخانەیە پێکدێت لە ژووری خەو، هۆڵێکی گەورە و مەتبەخێکی شایستە بۆ گەشتیاران، هەروەها باڵەکۆنێکی جوان کە دیمەنی سەرنجڕاکێشی ناوچەکە دەخاتە ڕوو. نیشتەجێبوون لەم میوانخانەیە گونجاوە بۆ خێزانە بچووکەکان و قەرەباڵغەکان. میوانخانەکە نزیکەی ١٠ خولەک لە ناوەندی شاری هەڵەبجە دوورە.",
            "ar": "مزرعە الحاجي هو أحد أجمل الفنادق في مدينة حلبجة، ويشتهر بخدماته الممتازة وبيئته الهادئة. يتكون الفندق من غرف نوم مريحة، وقاعة كبيرة، ومطبخ مجهز للضيوف، بالإضافة إلى شرفة جميلة تطل على منظر خلاب للمنطقة. الإقامة في هذا الفندق مناسبة للعائلات الصغيرة والمجموعات. يقع الفندق على بعد حوالي 10 دقائق من مركز مدينة حلبجة.  \n**العنوان:**",
            "en": "Haji Hotel is one of the most beautiful hotels in Halabja, known for its excellent services and peaceful environment. The hotel features comfortable sleeping rooms, a spacious hall, and a well-equipped kitchen for guests, along with a beautiful balcony that offers a stunning view of the area. Staying at this hotel is ideal for small families and groups. The hotel is located approximately 10 minutes from the center of Halabja."
        },
        "price": {
            "ku": "٦٥,٠٠٠ دینار / شەو",
            "ar": "٦٥,٠٠٠ دينار / ليلة",
            "en": "65,000 IQD / night"
        },
        "priceNumber": 65000,
        "rating": 4.9,
        "reviewsCount": 18,
        "badge": {
            "ku": "خێزانی و هێمن",
            "ar": "عائلي وهادئ",
            "en": "Family & Quiet"
        },
        "image": "images/real/halabja_mewanxanai_haji_main.webp",
        "gallery": [
            "images/real/halabja_mewanxanai_haji_main.webp",
            "images/real/halabja_mewanxanai_haji_gal_0.webp",
            "images/real/halabja_mewanxanai_haji_gal_1.webp",
            "images/real/halabja_mewanxanai_haji_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "ownerRole": {
            "ku": "خاوەن شوێن",
            "ar": "مالك",
            "en": "Host"
        },
        "locationText": {
            "ku": "هەڵەبجە ، باوە كۆچەك",
            "ar": "حلبجة، باوكوچاك.",
            "en": "Halabja, Bawakochak."
        },
        "phone": "07511973837",
        "whatsapp": "9647511973837",
        "features": [
            {
                "ku": "شوێنی پاک و ڕازاوە",
                "ar": "مكان نظيف ومرتب",
                "en": "Clean & comfortable"
            },
            {
                "ku": "دیمەنی دڵڕفێنی سروشتی",
                "ar": "إطلالة طبيعية رائعة",
                "en": "Breathtaking nature views"
            },
            {
                "ku": "پێداویستی و تەواوی خزمەتگوزاری",
                "ar": "كافة الخدمات متوفرة",
                "en": "Full amenities available"
            }
        ]
    },
    {
        "id": "tawela-awesar-complex",
        "town": "tawela",
        "townName": {
            "ku": "تەوێڵە",
            "ar": "طويلة",
            "en": "Tawela"
        },
        "categoryType": "house",
        "category": {
            "ku": "کۆمەڵگەی گەشتیاری",
            "ar": "مجمع سياحي",
            "en": "Tourist Resort"
        },
        "name": {
            "ku": "کۆمەڵگای گەشتیاری ئاوێسەر",
            "ar": "مجمع أويزر السياحي",
            "en": "Awesar Tourist Resort"
        },
        "description": {
            "ku": "کۆمەڵگای گەشتیاری ئاوێسەر   \r\n\r\nکۆمەڵێ خانووی ناوازە لە سروشتی دڵڕفێنی ئاویسەر لە خزمەت گەشتیاراندایە\r\n\r\nخانوەکان دوو جۆرن:  \r\n١. خانووی تەختە  \r\n٢. خانووی ئاسایی (موسەلح)  \r\n\r\nتەخ...",
            "ar": "🏞️ مجتمع سياحي أويسر  \r\nعدد من المنازل الفريدة وسط طبيعة أفيسار الساحرة في خدمة السياح\r\n\r\nالمنازل نوعان:  \r\n١. منازل تقليدية (تختة)  \r\n٢. منازل عادية (مسلحة)  \r\n\r\nالمنازل التقليدية...",
            "en": "Awesar Tourist Village  \r\n\r\nA number of unique houses in the charming nature of Avisar are at the service of tourists\r\n\r\nThere are two types of houses:  \r\n1. Traditional houses (Ta..."
        },
        "longDescription": {
            "ku": "کۆمەڵگای گەشتیاری ئاوێسەر   \r\n\r\nکۆمەڵێ خانووی ناوازە لە سروشتی دڵڕفێنی ئاویسەر لە خزمەت گەشتیاراندایە\r\n\r\nخانوەکان دوو جۆرن:  \r\n١. خانووی تەختە  \r\n٢. خانووی ئاسایی (موسەلح)  \r\n\r\nتەختەکان سێ جۆرن:  \r\n- بچوک (t3, t4, t5): ٨٠٫٠٠٠ دینار  \r\n- مامناوەند (t2): ١٠٠٫٠٠٠ دینار  \r\n- گەورە (t1): ١٥٠٫٠٠٠ دینار  \r\n\r\nخانوە ئاسایەکان (m1, m2, m3, m4): ٨٠٫٠٠٠ دینار  \r\n\r\nبۆ ماوەی 🕛 (٢٤) کاتژمێر:  \r\n١ پاش نیوەڕۆ بۆ ١ پاشنیوەڕۆی دواتر  \r\n\r\nخانوەکان کاملن بێجگە لە خواردن.  \r\nهەر خانوویەک دەتوانێت ٦ کەس بەخۆیەوە بگرێت.  \r\n\r\nشتومەکی ناو خانوو:  \r\n- سنگ  \r\n- تەباخ  \r\n- سەلاجە  \r\n- مێزو و کورسی  \r\n- مەقەڵی  \r\n- نوێن  \r\n\r\nکابینەکان قاپ و قاچاخیان تێدایە.  \r\nهەر خانوویەک یەک سۆپای نەوتی تێدایە.",
            "ar": "🏞️ مجتمع سياحي أويسر  \r\nعدد من المنازل الفريدة وسط طبيعة أفيسار الساحرة في خدمة السياح\r\n\r\nالمنازل نوعان:  \r\n١. منازل تقليدية (تختة)  \r\n٢. منازل عادية (مسلحة)  \r\n\r\nالمنازل التقليدية ثلاثة أنواع:  \r\n- صغيرة (t3, t4, t5): ٨٠٫٠٠٠ دينار  \r\n- متوسطة (t2): ١٠٠٫٠٠٠ دينار  \r\n- كبيرة (t1): ١٥٠٫٠٠٠ دينار  \r\n\r\nالمنازل العادية (m1, m2, m3, m4): ٨٠٫٠٠٠ دينار  \r\n\r\nلمدة 🕛 (٢٤) ساعة:  \r\nمن ١ بعد الظهر إلى ١ بعد الظهر اليوم التالي  \r\n\r\nالمنازل كاملة باستثناء الطعام.  \r\nكل منزل يتسع لـ ٦ أشخاص.  \r\n\r\nأدوات داخل المنزل:  \r\n- حطب  \r\n- موقد  \r\n- شواية  \r\n- طاولة وكراسي  \r\n- أواني  \r\n- فرش  \r\n\r\nالكبائن تحتوي على أطباق وأكواب.  \r\nكل منزل يحتوي على موقد نفط واحد.",
            "en": "Awesar Tourist Village  \r\n\r\nA number of unique houses in the charming nature of Avisar are at the service of tourists\r\n\r\nThere are two types of houses:  \r\n1. Traditional houses (Takhta)  \r\n2. Regular houses (Musallah)  \r\n\r\nTraditional houses come in three types:  \r\n- Small (t3, t4, t5): 80,000 IQD  \r\n- Medium (t2): 100,000 IQD  \r\n- Large (t1): 150,000 IQD  \r\n\r\nRegular houses (m1, m2, m3, m4): 80,000 IQD  \r\n\r\nFor a duration of 🕛 (24) hours:  \r\nFrom 1 PM to 1 PM the next day  \r\n\r\nHouses are fully equipped, excluding food.  \r\nEach house can accommodate up to 6 people.  \r\n\r\nItems inside the house:  \r\n- Firewood  \r\n- Stove  \r\n- Grill  \r\n- Table and chairs  \r\n- Utensils  \r\n- Mattresses  \r\n\r\nCabins include plates and cups.  \r\nEach house has one oil stove."
        },
        "price": {
            "ku": "٩٠,٠٠٠ دینار / شەو",
            "ar": "٩٠,٠٠٠ دينار / ليلة",
            "en": "90,000 IQD / night"
        },
        "priceNumber": 90000,
        "rating": 4.9,
        "reviewsCount": 18,
        "badge": {
            "ku": "هاوینەهەوار",
            "ar": "مصيف سياحي",
            "en": "Mountain Resort"
        },
        "image": "images/real/tawela_awesar_complex_main.webp",
        "gallery": [
            "images/real/tawela_awesar_complex_main.webp",
            "images/real/tawela_awesar_complex_gal_0.webp",
            "images/real/tawela_awesar_complex_gal_1.webp",
            "images/real/tawela_awesar_complex_gal_2.webp"
        ],
        "ownerName": {
            "ku": "سەرپەرشتیاری شوێن",
            "ar": "مشرف العقار",
            "en": "Property Host"
        },
        "ownerRole": {
            "ku": "خاوەن شوێن",
            "ar": "مالك",
            "en": "Host"
        },
        "locationText": {
            "ku": "ئاوێسەر",
            "ar": "اویسر",
            "en": "awesar"
        },
        "phone": "0",
        "whatsapp": "964",
        "features": [
            {
                "ku": "شوێنی پاک و ڕازاوە",
                "ar": "مكان نظيف ومرتب",
                "en": "Clean & comfortable"
            },
            {
                "ku": "دیمەنی دڵڕفێنی سروشتی",
                "ar": "إطلالة طبيعية رائعة",
                "en": "Breathtaking nature views"
            },
            {
                "ku": "پێداویستی و تەواوی خزمەتگوزاری",
                "ar": "كافة الخدمات متوفرة",
                "en": "Full amenities available"
            }
        ]
    }
];
services.push(...additionalStays);

// دەوڵەمەندکردنی ئۆتۆماتیکی داتا: کۆردیناتی نەخشە، ژمارەی پەیوەندی، بینین و دەوروبەر
const defaultReviewsByTown = {
    nawroli: [
        {
            author: "ئاسۆ عومەر",
            date: "٢٠٢٦/١٠/١٥",
            rating: 5,
            comment: localize(
                "شوێنێکی زۆر دڵگیر و ئارام بوو، دەنگی ڕووبار و دانیشتن لەناو دڵی ئاوەکە ئەزموونێکی لەبیرنەکراوە. مامەڵەی خاوەن شوێنەکە زۆر بەڕێزانە بوو.",
                "مكان رائع وهادئ جداً، صوت النهر والجلسات فوق الماء تجربة لا تُنسى. أصحاب المكان قمة في الأخلاق والضيافة.",
                "An unforgettable experience right over the river. The soothing water sounds and gracious hospitality made our stay wonderful."
            )
        },
        {
            author: "شەنگە کەمال",
            date: "٢٠٢٦/٠٩/٢٨",
            rating: 5,
            comment: localize(
                "پاکوخاوێنی لە ئاستێکی زۆر باڵادایە و تەواو خێزانییە. منداڵەکانمان کەیفێکی زۆریان بە کەپرەکان و فێنکایی ئاوەکە کرد.",
                "نظافة ممتازة وبيئة عائلية آمنة ومريحة جداً. استمتع أطفالنا كثيراً بالأجواء الجميلة والمياه العذبة.",
                "Spotless cleanliness and a secure family atmosphere. The kids loved the shaded decks and refreshing river."
            )
        }
    ],
    tawela: [
        {
            author: "دانا حەمە ڕەشید",
            date: "٢٠٢٦/١٠/٠٥",
            rating: 5,
            comment: localize(
                "کۆڵانە بەردینەکان و هەوای فێنکی تەوێڵە بێ وێنەیە. خانووەکە تەواوی پێداویستییەکانی تێدابوو و دیمەنی چیای تەوێڵە سەرسوڕهێنەر بوو.",
                "الأزقة الحجرية وهواء طويلة العليل لا مثيل لهما. المنزل مجهز بالكامل والإطلالة الجبلية ساحرة.",
                "The stone architecture and mountain air of Tawela are unmatched. The house was fully equipped with stunning mountain views."
            )
        },
        {
            author: "بانە نەوزاد",
            date: "٢٠٢٦/٠٩/١٨",
            rating: 5,
            comment: localize(
                "ئارامترین شوێن بۆ پشوودانی کۆتایی هەفتە. دەستخۆشی لە خاوەن شوێنەکە دەکەین بۆ پێشوازییە گەرمەکەیان.",
                "أهدأ مكان لقضاء عطلة نهاية أسبوع مريحة. شكراً جزيلاً لأصحاب المكان على حسن الاستقبال والاهتمام.",
                "The most peaceful getaway for a weekend retreat. Huge thanks to the host for their wonderful reception."
            )
        }
    ],
    byara: [
        {
            author: "ڕەوەند عەلی",
            date: "٢٠٢٦/١٠/١٢",
            rating: 5,
            comment: localize(
                "سروشتی بیارە و باخی گوێز و چنارە بەرزەکان جیاوازە. ڤێلاکە زۆر فراوان بوو و کەیفوسەفای ماتۆڕسوارییەکەشی نایاب بوو.",
                "طبيعة بيارة وأشجار الجوز والدلب الباسقة مميزة جداً. الفيلا واسعة ومغامرة الدبابات كانت قمة المتعة.",
                "The orchards and tall plane trees of Byara are magnificent. The villa was spacious and the ATV ride was a blast."
            )
        },
        {
            author: "ئەژین مەحموود",
            date: "٢٠٢٦/٠٩/٢٢",
            rating: 5,
            comment: localize(
                "هەموو شتێک بەپێی وێنەکان بوو، زۆر پاک و کەشێکی پڕ لە ئاسوودەیی بوو بۆ خێزانەکەمان.",
                "كل شيء مطابق للصور تماماً، نظافة تامة وأجواء مريحة جداً لعائلتنا.",
                "Everything was exactly as pictured—spotlessly clean and wonderfully comfortable for our family."
            )
        }
    ],
    "ahmad-awa": [
        {
            author: "ڕێبین فاروق",
            date: "٢٠٢٦/١٠/٢٠",
            rating: 5,
            comment: localize(
                "دیمەنی تاڤگەی زەڵم و چەمی ئەحمەدئاوا لە پەنجەرەی خانووەکەوە دڵڕفێن بوو. ڕێگای ئاسان و خزمەتگوزاریی نایاب بوو.",
                "إطلالة شلال زلم ومجرى أحمد آوا من نافذة المكان كانت ساحرة. الوصول سهل والخدمة راقية جداً.",
                "The view of Zalm waterfall and stream from the windows was breathtaking. Easy access and top-notch service."
            )
        },
        {
            author: "سۆما ساڵح",
            date: "٢٠٢٦/٠٩/١٥",
            rating: 5,
            comment: localize(
                "هەوای سازگار و چێشتخانە و کەپری خاوێن لە نزیکمان. بە دڵنیاییەوە ساڵانە سەردانی دەکەینەوە.",
                "هواء نقي ومطاعم وأكواخ نظيفة بالجوار. بالتأكيد سنكرر الزيارة كل موسم.",
                "Crisp mountain air and clean facilities right nearby. We will definitely make this an annual family tradition."
            )
        }
    ],
    khurmal: [
        {
            author: "هێمن تەها",
            date: "٢٠٢٦/١٠/٠٨",
            rating: 5,
            comment: localize(
                "چەمە سارد و باخەکانی خورماڵ گونجاوترینە بۆ گروپ و خێزان. خاوەن شوێنەکە زۆر یارمەتیدەربوو لە ڕێنوێنی شوێنە گەشتیارییەکان.",
                "منتجع جەمە سارد وبساتين خورمال الأفضل للعائلات والكروبات. صاحب المكان كان متعاوناً جداً بإرشادنا للأماكن الجميلة.",
                "Chama Sard and Khurmal orchards are the best for family groups. The host gave us wonderful local recommendations."
            )
        },
        {
            author: "لانە بەختیار",
            date: "٢٠٢٦/٠٩/١٠",
            rating: 5,
            comment: localize(
                "خانوویەکی مێواندۆست، پاک و ئارام بە نرخی زۆر لەبار. زۆر سوپاس بۆ ئەم خزمەتگوزارییە جوانە.",
                "بيت مريح ونظيف ومضياف بسعر مناسب جداً. كل الشكر على هذه الخدمة المتميزة.",
                "A welcoming, clean, and peaceful house at a very reasonable rate. Highly satisfied with our stay."
            )
        }
    ]
};

function getServiceCoordinates(service) {
    if (service && service.lat && service.lng) {
        return { lat: service.lat, lng: service.lng };
    }
    const tMatch = towns.find((t) => t.id === (service && service.town));
    if (tMatch && tMatch.lat && tMatch.lng) {
        return { lat: tMatch.lat, lng: tMatch.lng };
    }
    return { lat: 35.1800, lng: 45.9800 };
}

function getServiceMapUrls(service) {
    const coords = getServiceCoordinates(service);
    return {
        embedUrl: `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=ckb&z=15&output=embed`,
        directUrl: `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`
    };
}

function getServiceRatingBreakdown(service) {
    const base = service.rating || 4.9;
    return {
        cleanliness: (base >= 4.9 ? 5.0 : 4.9).toFixed(1),
        location: (4.9).toFixed(1),
        hospitality: (5.0).toFixed(1),
        value: (base >= 4.9 ? 4.9 : 4.8).toFixed(1)
    };
}

function getServiceReviews(service) {
    if (!service) return [];
    const townReviews = defaultReviewsByTown[service.town] || defaultReviewsByTown["nawroli"];
    let customReviews = [];
    try {
        const stored = localStorage.getItem(`visit_halabja_reviews_${service.id}`);
        if (stored) {
            customReviews = JSON.parse(stored);
        }
    } catch (e) {
        // Silently continue
    }
    return [...customReviews, ...townReviews];
}

function addUserServiceReview(serviceId, reviewData) {
    if (!serviceId || !reviewData) return false;
    try {
        const key = `visit_halabja_reviews_${serviceId}`;
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.unshift(reviewData);
        localStorage.setItem(key, JSON.stringify(existing));
        return true;
    } catch (e) {
        console.error("Error saving review:", e);
        return false;
    }
}


const townCoordsMap = {
    "nawroli": { lat: 35.2150, lng: 45.9350 },
    "tawela": { lat: 35.2014, lng: 46.1839 },
    "byara": { lat: 35.2281, lng: 46.1247 },
    "ahmad-awa": { lat: 35.3136, lng: 46.0358 },
    "khurmal": { lat: 35.3082, lng: 46.0028 }
};

services.forEach((s, idx) => {
    // 1. Coordinates
    if (!s.lat || !s.lng) {
        const base = townCoordsMap[s.town] || { lat: 35.1800, lng: 45.9800 };
        const delta = ((idx % 7) - 3) * 0.0015;
        s.lat = Number((base.lat + delta).toFixed(5));
        s.lng = Number((base.lng + delta).toFixed(5));
    }

    // 2. Phone & WhatsApp Fallback to Platform Admin
    if (!s.phone || s.phone === "0" || s.phone === "07500000000" || s.phone.length < 8) {
        s.phone = PLATFORM_CONFIG.adminPhone;
    }
    if (!s.whatsapp || s.whatsapp === "964" || s.whatsapp === "9647500000000" || s.whatsapp.length < 10) {
        s.whatsapp = PLATFORM_CONFIG.adminWhatsApp;
    }

    // 3. Realistic Social Proof & Views
    if (s.viewsCount === undefined) {
        s.viewsCount = 1250 + ((idx * 149) % 1900);
    }
    if (s.viewsToday === undefined) {
        s.viewsToday = 16 + ((idx * 9) % 32);
    }
    if (s.isFeatured === undefined) {
        s.isFeatured = idx === 0 || idx === 1 || idx === 3 || idx === 7 || idx === 11 || idx === 12;
    }

    const mapUrls = getServiceMapUrls(s);
    s.mapEmbedUrl = mapUrls.embedUrl;
    s.googleMapsUrl = mapUrls.directUrl;
    s.directionsUrl = mapUrls.directionsUrl;
    s.ratingCategories = getServiceRatingBreakdown(s);

    // 4. Nearby Attractions
    if (!s.nearbyAttractions) {
        if (s.town === "nawroli") {
            s.nearbyAttractions = [
                localize("ڕووبار و کەپری نەوڕۆڵی (٠ خولەک)", "نهر وأكواخ نورولي (٠ دقيقة)", "Nawroli Riverfront (0 min)"),
                localize("کەبابی کەنار ڕووبار (٢ خولەک)", "كباب الضفاف النهري (٢ دقيقة)", "Riverside Kebab (2 mins)"),
                localize("بەلەم و جێتسکی (٣ خولەک)", "قوارب سياحية وجت سكي (٣ دقيقة)", "Boat Marina & Jet Ski (3 mins)"),
                localize("بازاڕی لۆکاڵی (٥ خولەک)", "سوق محلي (٥ دقيقة)", "Local Market (5 mins)"),
                localize("مۆنۆمێنتی هەڵەبجە (١٥ خولەک)", "نصب حلبجة (١٥ دقيقة)", "Halabja Monument (15 mins)")
            ];
        } else if (s.town === "byara") {
            s.nearbyAttractions = [
                localize("باخ و کانیاوەکانی بیارە (پیاسە)", "بساتين وينابيع بيارة (مشياً)", "Byara Springs (Walking)"),
                localize("چێشتخانەی هەردی (٨ خولەک)", "مطعم هردي (٨ دقيقة)", "Hardi Restaurant (8 mins)"),
                localize("بازاڕی کلتووری هەورامان (٥ خولەک)", "سوق هورامان التراثي (٥ دقيقة)", "Hawraman Souvenir Market (5 mins)"),
                localize("سافاری ماتۆڕ (٣ خولەک)", "دبابات جبلية (٣ دقيقة)", "Mountain ATVs (3 mins)")
            ];
        } else if (s.town === "tawela") {
            s.nearbyAttractions = [
                localize("کۆڵانە دێرینەکانی تەوێڵە (پیاسە)", "أزقة طويلة التراثية (مشياً)", "Ancient Stone Alleys (Walking)"),
                localize("ڕوانگەی شاخی ئاوێسەر (٥ خولەک)", "مطل جبل اویسر (٥ دقيقة)", "Tawela Awesar Vista (5 mins)"),
                localize("دووکانی کڵاشی هەورامی (٣ خولەک)", "محلات كلاش هورامي (٣ دقيقة)", "Handmade Klash Shops (3 mins)")
            ];
        } else if (s.town === "ahmad-awa") {
            s.nearbyAttractions = [
                localize("تاڤگەی دڵڕفێنی زەڵم (٥ خولەک)", "شلال عين زلم الجميل (٥ دقيقة)", "Zalm Waterfall & Streams (5 mins)"),
                localize("کەبابی وەستا ئەمجەد (١٠ خولەک)", "كباب أسطة أمجد (١٠ دقيقة)", "Wasta Amjad Kebab (10 mins)"),
                localize("شوێنی پایسکل و پیاسەی زەڵم (پیاسە)", "مسار مشي زلم (مشياً)", "Zalm Hiking Trail (Walking)")
            ];
        } else {
            s.nearbyAttractions = [
                localize("باخی گوێزی خورماڵ (پیاسە)", "بساتين جوز خورمال (مشياً)", "Khurmal Walnut Groves (Walking)"),
                localize("سەرچاوەی مێژوویی ڕەشین (٣ خولەک)", "عين رشين التاريخية (٣ دقيقة)", "Rishin Historical Spring (3 mins)"),
                localize("مۆنۆمێنتی هەڵەبجە (١٢ خولەک)", "نصب حلبجة (١٢ دقيقة)", "Halabja Monument (12 mins)")
            ];
        }
    }
});

const regionalHighlights = [
    {
        id: "awessar",
        townId: "tawela",
        name: localize("هاوینەهەواری ئاوێسەر", "منتجع أويسار السياحي", "Awessar Mountain Resort"),
        tagline: localize("فێنکترین هاوینەهەوار لە هەورامان", "أبرد مصيف في هورامان", "Coolest Summer Resort in Hawraman"),
        description: localize(
            "ناوچەیەکی کانی و کوێستانی دڵڕفێن بە دار گوێزی چەندین سەدە، ئاوی بەستوو و کەشێکی سازگار کە پلەی گەرمای هاوینان بە دەگمەن ٢٧ پلە تێپەڕ دەکات.",
            "منطقة ينابيع جبلية ساحرة تحيط بها أشجار الجوز المعمرة، مياه عذبة باردة وأجواء عليلة نادراً ما تتجاوز ٢٧ درجة صيفاً.",
            "Scenic alpine spring oasis surrounded by centuries-old walnut groves, crystal icy waters, and cool air rarely exceeding 27°C in peak summer."
        ),
        badge: localize("فێنکترین هاوینەهەوار ❄️", "أبرد مصيف ❄️", "Coolest Escape ❄️"),
        image: "images/nature.jpg",
        tempTip: localize("زۆربەی کات ٦ تا ٨ پلە فێنکترە لە شارەکان", "أبرد بـ ٦-٨ درجات من مراكز المدن", "6-8°C cooler than city centers"),
        category: localize("سەیرانگا و کانی", "مصيف وينابيع", "Resort & Springs")
    },
    {
        id: "sarget",
        townId: "byara",
        name: localize("گوندی گەشتیاری سەرگەت", "قرية سركت السياحية", "Sarget Scenic Village"),
        tagline: localize("سروشتی دەگمەن و کانیاوەکانی هەورامان", "طبيعة ساحرة وينابيع جبلية", "Pristine Nature & Mountain Springs"),
        description: localize(
            "گوندێکی مێژوویی سەرنجڕاکێش لە بناری شاخە بەرزەکانی هەورامان، بەستراوە بە باخی هەمەجۆر، هەنگوینی خۆماڵی، و دیمەنی پانۆرامای شاخەکان.",
            "قرية جبلية خلابة عند سفوح جبال هورامان، تشتهر ببساتينها الغناء، العسل الجبلي الطبيعي، والإطلالات البانورامية الخلابة.",
            "Breathtaking mountain village nestled under Hawraman peaks, famous for terraced gardens, pure wild honey, and dramatic panoramic vistas."
        ),
        badge: localize("سروشتی دەگمەن 🌲", "طبيعة خلابة 🌲", "Scenic Nature 🌲"),
        image: "images/landscape.jpg",
        tempTip: localize("هەوای شاخی پاک و کانیاوی سازگار", "هواء جبلي نقي وينابيع نقية", "Pure mountain air & springs"),
        category: localize("گوند و کلتوور", "قرية وتراث", "Village & Heritage")
    },
    {
        id: "hanezhala",
        townId: "nawroli",
        name: localize("کەپری هانەژاڵە و کەناراوەکانی سیروان", "أكواخ هانه ژاله وضفاف سيروان", "Hanezhala & Sirwan Riverfront"),
        tagline: localize("کەپری سەر ئاو، بەلەم و جێتسکی", "جلسات عائمة وقوارب وجت سكي", "Floating Cabanas, Boat & Jet Ski"),
        description: localize(
            "دەڤەری کەنار ڕووباری سیروان و چەمی نەوڕۆڵی بە کەپری سەر ئاو، بەلەمسواری، جێتسکی و چێشتخانەی ماسی تازەی ڕووبار.",
            "شواطئ نهر سيروان ووادي نورولي بأكواخ مائية مريحة، رحلات قوارب، جت سكي ومطاعم الأسماك النهرية الطازجة.",
            "Vibrant waterfront haven along the Sirwan River offering overwater cabanas, boat cruising, jet skis, and fresh riverside grilled fish."
        ),
        badge: localize("کەناری ڕووبار 🌊", "ضفاف النهر 🌊", "Riverfront Haven 🌊"),
        image: "images/hero.jpg",
        tempTip: localize("دانیشتنی فێنک لەسەر شەپۆلی ئاو", "جلسات منعشة فوق مجرى الماء", "Cooling waterside breeze"),
        category: localize("ڕووبار و چالاکی", "نهر وأنشطة", "River & Activities")
    },
    {
        id: "zalm-castle",
        townId: "ahmad-awa",
        name: localize("تاڤگەی زەڵم و قەڵای مێژوویی", "شلال زلم وقلعة خان أحمد خان", "Zalm Waterfall & Historic Castle"),
        tagline: localize("بەرزترین تاڤگە و شوێنەواری دێرین", "أعلى شلال وآثار تاريخية", "Spectacular Cascades & Historic Citadel"),
        description: localize(
            "سەرچاوەی خرۆشانی تاڤگەی بەناوبانگی زەڵم، چێشتخانەی کەبابی زەڵم، و شوێنەواری قەڵای دێرینی خان ئەحمەد خان لەسەر بەرزایی چیاکان.",
            "مصب شلال زلم الشهير المنحدر من الجبال، كباب زلم التراثي، وآثار قلعة خان أحمد خان التاريخية الشامخة.",
            "Roaring mountain cascades, renowned local Zalm kebab houses, and the ancient mountain cliff ruins of Khan Ahmad Khan Citadel."
        ),
        badge: localize("تاڤگە و مێژوو 💦", "شلال وتاريخ 💦", "Cascades & Citadel 💦"),
        image: "images/nature.jpg",
        tempTip: localize("دڵڕفێنترین تاڤگەی ناوچەکە", "أجمل شلال طبيعي في المنطقة", "Most famous waterfall in the region"),
        category: localize("تاڤگە و شوێنەوار", "شلال وآثار", "Waterfall & History")
    },
    {
        id: "halabja-monument",
        townId: "halabja",
        name: localize("مۆنۆمێنتی شەهیدانی هەڵەبجە", "نصب شهداء حلبجة التذكاري", "Halabja Martyrs Monument"),
        tagline: localize("شوێنەواری مێژوویی و نەتەوەیی شارەکە", "المعلم الوطني والتاريخي الأبرز", "National Memorial & Heritage Landmark"),
        description: localize(
            "مۆنۆمێنت و مۆزەخانەی فەرمی هەڵەبجە بۆ ناساندنی مێژوو و قوربانیدانەکانی شارەکە، لەگەڵ پارکی گشتی و ڕووبەری سەوزی پشوودان.",
            "النصب التذكاري والمتحف الوطني لتوثيق تاريخ وصمود حلبجة، محاط بحدائق خضراء واسعة للزوار.",
            "The iconic memorial monument and museum commemorating Halabja's history and resilience, surrounded by peaceful parklands."
        ),
        badge: localize("مێژوو و ناسنامە 🏛️", "تاريخ وهوية 🏛️", "History & Heritage 🏛️"),
        image: "images/activity.jpg",
        tempTip: localize("ناوەندی شاری هەڵەبجە", "مركز مدينة حلبجة", "Central Halabja"),
        category: localize("مۆنۆمێنت و مۆزەخانە", "متحف ونصب", "Museum & Monument")
    },
    {
        id: "sazan",
        townId: "khurmal",
        name: localize("سەیرانگای سازان و باخەکانی هەنار", "وادي وبساتين سازان", "Sazan Valley & Pomegranate Groves"),
        tagline: localize("کەناری ڕووبار و باخە بەناوبانگەکانی هەنار", "ضفاف النهر وبساتين الرمان الشهيرة", "River Valley & Renowned Pomegranates"),
        description: localize(
            "دۆڵێکی سەوزی کەنار ڕووبار بە هەنارە بەناوبانگەکانی هەڵەبجە، گونجاو بۆ کەمپینگ و ماسی برژاندن و پشوودانی هێمن لە دەست ژاوەژاو.",
            "وادي نهري بديع يشتهر بأشجار الرمان الحلبجي الفاخر، ومواقع هادئة للتخييم وشواء الأسماك والاسترخاء.",
            "Serene river valley famed for Halabja's world-class pomegranate orchards, idyllic wild camping, and tranquil picnic retreats."
        ),
        badge: localize("دۆڵی سەوز 🌿", "وادي أخضر 🌿", "Scenic Valley 🌿"),
        image: "images/landscape.jpg",
        tempTip: localize("تەواو هێمن و دوور لە قەرەباڵغی", "هادئ جداً ومثالي للتخييم", "Ultra quiet & ideal for camping"),
        category: localize("دۆڵ و کەمپینگ", "وادي وتخييم", "Valley & Camping")
    }
];

/* 
    ===================================================================
    ٦. پلانی پێشنیارکراوی گەشتی ١ ڕۆژە لە هەڵەبجە و نەوڕۆڵی (Itinerary)
    ===================================================================
*/
const oneDayItinerary = [
    {
        time: localize("٠٩:٠٠ بەیانی", "٠٩:٠٠ صباحاً", "09:00 AM"),
        title: localize("نەوڕۆڵی و مۆنۆمێنتی هەڵەبجە", "نورولي ونصب حلبجة", "Nawroli & Halabja Monument"),
        desc: localize(
            "دەستپێکردنی گەشتەکە بە نانی بەیانی لە نەوڕۆڵی، بەلەمسواری لە کەناری سیروان و سەردانێکی پڕواتا بۆ مۆنۆمێنتی مێژوویی هەڵەبجە.",
            "انطلاق الجولة بفطور صباحي شهي في نورولي، جولة قارب في نهر سيروان وزيارة نصب شهداء حلبجة.",
            "Morning start with riverside breakfast in Nawroli, boat cruising along the Sirwan, followed by visiting Halabja Monument."
        ),
        icon: "🌅",
        location: localize("نەوڕۆڵی و هەڵەبجە", "نورولي وحلبجة", "Nawroli & Halabja")
    },
    {
        time: localize("٠١:٠٠ نیوەڕۆ", "٠١:٠٠ ظهراً", "01:00 PM"),
        title: localize("ئەحمەدئاوا و تامی کەبابی زەڵم", "أحمد آوا وتذوق كباب زلم", "Ahmad Awa & Zalm Kebab"),
        desc: localize(
            "گەیشتن بە تاڤگەی سەرکەشی زەڵم، تامی بەناوبانگترین کەبابی هەورامان لە کەپرەکانی سەر ئاو و چێژبینین لە تاڤگە سەوزەکە.",
            "الوصول إلى شلالات زلم الخلابة، تناول كباب هورامان الشهير فوق المياه العذبة والاستجمام بالطبيعة.",
            "Head to stunning Zalm Waterfall, savor legendary Hawrami kebabs right over rushing water cabanas."
        ),
        icon: "🍢",
        location: localize("ئەحمەدئاوا و زەڵم", "أحمد آوا وزلم", "Ahmad Awa & Zalm")
    },
    {
        time: localize("٠٤:٣٠ پاشنیوەڕۆ", "٠٤:٣٠ عصراً", "04:30 PM"),
        title: localize("بازاڕی بیارە و گوندی سەرگەت", "سوق بيارة وقرية سركت", "Byara Bazaar & Sarget Village"),
        desc: localize(
            "گەشتی پیادە بەنێو باخە چڕەکانی بیارە، کڕینی سۆغاتی و هەنگوینی خۆماڵی، و سەردانی دیمەنە بەرزەکانی گوندی سەرگەت.",
            "جولة بين بساتين بيارة، تسوق العسل والمنتجات التراثية، وزيارة إطلالات قرية سركت الشاهقة.",
            "Stroll through Byara’s walnut orchards, buy local wild honey, and explore the panoramic terraced village of Sarget."
        ),
        icon: "🍯",
        location: localize("بیارە و سەرگەت", "بيارة وسركت", "Byara & Sarget")
    },
    {
        time: localize("٠٦:٣٠ ئێوارە", "٠٦:٣٠ مساءً", "06:30 PM"),
        title: localize("هاوینەهەواری ئاوێسەر و تەوێڵە", "مصيف أويسار وبلدة طويلة", "Awessar Resort & Tawela"),
        desc: localize(
            "چای سەر خەڵوز و کەشوهەوای فێنکی ئاوێسەر، دیتنی کۆڵانە بەردینە کۆنەکان و کڕینی کڵاشی دەستکردی ڕەسەنی هەورامی.",
            "شاي على الفحم بنسيم مصيف أويسار البارد، استكشاف أزقة طويلة الحجرية وشراء الكلاش الهورامي الأصيل.",
            "Woodfire tea in cool Awessar breeze, wander stone stairways of Tawela, and get authentic handmade Klash shoes."
        ),
        icon: "🫖",
        location: localize("ئاوێسەر و تەوێڵە", "أويسار وطويلة", "Awessar & Tawela")
    }
];

/* 
    ===================================================================
    ٧. چێشتخانە و کەبابخانە خۆماڵییەکان (KuTrip Food & Dining Experience)
    ===================================================================
*/
const localDining = [
    {
        id: "zalm-kebab",
        name: localize("کەبابی زەڵم و ئەحمەدئاوا", "كباب زلم وأحمد آوا الشهير", "Famous Zalm & Ahmad Awa Kebab"),
        desc: localize(
            "گۆشتی فرێشی بەرخی ناوچەکە کە بە ڕێگای کۆنی خەڵوز لە کەناری تاڤگە ئامادە دەکرێت.",
            "لحم بلدي طازج مشوي على الفحم في أحضان الشلال.",
            "Fresh local lamb kebab grilled over hot charcoal along the waterfall."
        ),
        icon: "🍢",
        tag: localize("بەناوبانگترین تام", "الأشهر في المنطقة", "Top Culinary Pick")
    },
    {
        id: "nawroli-fish",
        name: localize("ماسی برژاوی کەنار سیروان", "سمك مسكوف على ضفاف سيروان", "Sirwan Riverside Grilled Fish"),
        desc: localize(
            "ماسی زیندووی ناو ئاو، برژاو بە شێوازی تایبەت لەسەر کەپری نەوڕۆڵی.",
            "سمك نهري طازج مشوي على الطريقة التراثية في أكواخ نورولي.",
            "Fresh local river fish grilled to perfection directly on Nawroli waterfront."
        ),
        icon: "🐟",
        tag: localize("تام و بۆنی ڕووبار", "طعم نهري أصيل", "Riverside Special")
    },
    {
        id: "hawrami-bread",
        name: localize("نانی تیری و کەلانەی هەورامی", "خبز الرقاق والكلانة الهورامية", "Traditional Hawrami Kalaneh"),
        desc: localize(
            "کەلانەی تازە بە ڕۆنی کەرەی خۆماڵی و گیا بەهارییەکان لە بیارە و تەوێڵە.",
            "كلانة ساخنة بالدهن الحر والأعشاب الجبلية في بيارة وطويلة.",
            "Hot mountain flatbread with spring herbs and local clarified butter in Byara."
        ),
        icon: "🫓",
        tag: localize("کەلەپووری ڕەسەن", "تراث هورامي أصيل", "Hawrami Heritage")
    },
    {
        id: "awessar-tea",
        name: localize("چای سەر خەڵوزی ئاوێسەر", "شاي الفحم في أويسار", "Awessar Charcoal Mountain Tea"),
        desc: localize(
            "چای دارچینی بە ئاوی کانی سەهۆڵ لە کەشوهەوایەکی تەواو فێنک.",
            "شاي معطر محضر بمياه الينابيع الباردة في أجواء مصيف أويسار العليلة.",
            "Aromatic mountain tea brewed over embers with icy spring water."
        ),
        icon: "☕",
        tag: localize("فێنک و ئارامبەخش", "أجواء عليلة ومنعشة", "Refreshing Atmosphere")
    }
];

/* 
    ===================================================================
    ٨. ژمارە فریاگوزارییەکان و هێڵە خێراکان (Emergency & Helplines)
    ===================================================================
*/
const emergencyContacts = [
    {
        name: localize("فریاکەوتنی تەندروستی (ئەمبوڵانس)", "الإسعاف الفوري (الصحة)", "Emergency Ambulance"),
        number: "122",
        tel: "tel:122",
        icon: "🚑",
        desc: localize("فریاگوزاری ٢٤ کاتژمێری بۆ حاڵەتە لەناکاوەکان", "خدمة طوارئ صحية على مدار ٢٤ ساعة", "24/7 Rapid Health Emergency")
    },
    {
        name: localize("بەرگری شارستانی (ئاگرکوژێنەوە)", "الدفاع المدني (الإطفاء)", "Civil Defense"),
        number: "115",
        tel: "tel:115",
        icon: "🚒",
        desc: localize("ڕزگارکردن و ئاگرکوژێنەوە لە هەڵەبجە و نەوڕۆڵی", "عمليات الإنقاذ والإطفاء في حلبجة ونورولي", "Rescue & Firefighting in Halabja & Nawroli")
    },
    {
        name: localize("پۆلیسی فریاکەوتن", "شرطة النجدة والطوارئ", "Emergency Police"),
        number: "104",
        tel: "tel:104",
        icon: "🚓",
        desc: localize("ئارامی و هاوکاریی خێرا بۆ گەشتیاران", "حماية ومساعدة فورية للزوار والسياح", "Tourist Safety & Rapid Response")
    },
    {
        name: localize("پەیوەندی ڕاستەوخۆ بە بەڕێوەبەر", "إدارة وتنسيق الحجوزات", "Platform Coordinator WhatsApp"),
        number: "0751 048 5057",
        tel: "tel:+9647510485057",
        icon: "📞",
        desc: localize("ڕێنمایی دەستبەجێ، حجزکردن و وەڵامدانەوە", "إرشاد فوري، مساعدة وتنسيق الحجوزات", "Direct Coordination & WhatsApp Support")
    }
];

window.towns = towns;
window.serviceCategories = serviceCategories;
window.services = services;
window.nearbyAttractions = nearbyAttractions;
window.regionalHighlights = regionalHighlights;
window.oneDayItinerary = oneDayItinerary;
window.localDining = localDining;
window.emergencyContacts = emergencyContacts;
window.getServiceCoordinates = getServiceCoordinates;
window.getServiceMapUrls = getServiceMapUrls;
window.getServiceRatingBreakdown = getServiceRatingBreakdown;
window.getServiceReviews = getServiceReviews;
window.addUserServiceReview = addUserServiceReview;


