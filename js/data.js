/*
    ئەم فایلە داتای سەرەتایی خزمەتگوزارییەکان هەڵدەگرێت.
    هۆکاری جیاکردنەوەی داتا لە logic ئەوەیە کە دواتر تیمەکە بتوانێت بەبێ دەستکاریکردنی app.js، تەنها ناوەڕۆک بگۆڕێت.
    لە داهاتوودا دەتوانرێت ئەم array ـە لە API، database، یان CMS/dashboard ـەوە پڕ بکرێتەوە.
*/

/*
    هەر object ـێک یەک خزمەتگوزاری نیشان دەدات.
    - id: ناسنامەیەکی سادە بۆ بەکارهێنان لە filtering ی داهاتوو یان admin panel.
    - category: جۆری خزمەتگوزاری بۆ badge ی کارت.
    - name: ناوی خزمەتگوزاری بە زمانی کوردی.
    - description: وەسفێکی کورت بۆ ئەوەی بەکارهێنەر زوو تێبگات خزمەتگوزارییەکە چییە.
    - image: ڕێگای وێنەکە، کە دەتوانرێت دواتر بە CDN یان cloud storage بگۆڕدرێت.
    - ownerName / ownerRole: زانیاریی کەسی خزمەتگوزاری بۆ پەڕەی وردەکاری.
    - locationText / workingHours: شوێن و کاتی کارکردن بۆ ناساندنی باشتر.
    - rules / features: خاڵە گرنگ و یاساکان بۆ میوان.
    - gallery: کۆمەڵە وێنەی زیاتر بۆ پیشاندانی خزمەتگوزارییەکە.
    - videoUrl / mapUrl: شوێن-دانەر بۆ داهاتووی ڤیدیۆ و نەخشە.
    - longDescription: دەقی وردتر بۆ پەڕەی service details.
    - price: شوێن-دانەرێکی نرخ کە دواتر بە نرخە ڕاستەقینەکان پڕ دەکرێتەوە.
    - phone: ژمارەی پیشاندان بۆ کارت.
    - whatsapp: ژمارەی پاککراوی WhatsApp بۆ دروستکردنی لینکێکی کارا.
*/

/*
    ئەم وێنانە وێنەی ڕاستەقینەی گەشتیاریی نەوڕۆڵین بۆ کارتەکانی خزمەتگوزاری.
    بەکارهێنانی وێنەی ڕاستەقینە متمانە و جوانی وێبسایتەکە زیاد دەکات.
    وێنەکان هێشتا بە lazy loading نیشان دەدرێن، بۆیە site ـەکە خەفیف و خێرا دەمێنێتەوە.
*/

/*
    ئەم helper ـە تەنها شێوەیەکی سادەی نووسینی دەقەکانە بە سێ زمان.
    هۆکاری بوونی ئەوەیە data.js خەفیف بمێنێتەوە و گۆڕینی وەرگێڕانەکان بۆ هەر خزمەتگوزارییەک ئاسان بێت.
    لە داهاتوودا دەتوانرێت ئەم شێوازە بگۆڕدرێت بۆ سیستەمێکی i18n ی بەهێزتر، بەڵام ئێستا بۆ پرۆژەیەکی سووک زۆر گونجاوە.
*/
function localize(ku, ar, en) {
    return { ku, ar, en };
}

/*
    ئەم placeholder ـانە بۆ ئەو خانانەن کە زۆربەیان هاوبەشن لە نێوان خزمەتگوزارییەکاندا.
    گرنگە بزانرێت phone و whatsapp لێرە هاوبەش نەکراون، چونکە هەر خزمەتگوزارییەک دەتوانێت ژمارەی تایبەتی خۆی هەبێت.
    لە داهاتوودا هەرکات زانیاریی ڕاستەقینە ئامادە بوو، دەتوانرێت تەنها لە هەر object ـێکدا ژمارەکان و دەقەکان بە جیاواز دەستکاریکرێن.
*/
const ownerNamePlaceholder = localize(
    "ناوی خاوەن لێرە دادەنرێت",
    "يوضع اسم المالك هنا",
    "Owner name will be added here"
);

const ownerRolePlaceholder = localize(
    "خاوەنی خزمەتگوزاری",
    "صاحب الخدمة",
    "Service Owner"
);

const nawroliLocation = localize(
    "نەوڕۆڵی، هەڵەبجە",
    "نورولي، حلبجة",
    "Nawroli, Halabja"
);

const workingHoursPlaceholder = localize(
    "بە زووی دیاری دەکرێت",
    "سيتم تحديدها قريباً",
    "To be announced soon"
);

const pricePlaceholder = localize(
    "بە زووی دیاری دەکرێت",
    "يحدد قريباً",
    "Coming Soon"
);

const services = [
    {
        id: "water-houses",
        category: localize("مانەوە لەسەر ئاو", "الإقامة على الماء", "Stay on Water"),
        name: localize("خانوو لە ناو ئاو", "بيوت على الماء", "Water Houses"),
        description: localize(
            "شوێنێکی تایبەت بۆ خێزان و هاوڕێیان بۆ دانیشتن و چێژوەرگرتن لە ڕوانگەی ئاو و هەوای ئارام.",
            "مكان مميز للعائلات والأصدقاء للجلوس والاستمتاع بإطلالة الماء والهواء الهادئ.",
            "A special place for families and friends to sit back and enjoy the water view and calm atmosphere."
        ),
        image: "images/hero.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پاراستنی پاکوخاوێنی", "الحفاظ على النظافة", "Keep the place clean"),
            localize("پێشتر پەیوەندی بکە بۆ رزێرڤ", "تواصل مسبقاً للحجز", "Contact in advance for booking"),
            localize("ئاگاداربە لە ئارامی خێزانەکان", "احترم هدوء العائلات", "Respect the calm atmosphere for families")
        ],
        features: [
            localize("گونجاو بۆ خێزان", "مناسب للعائلات", "Family friendly"),
            localize("دانیشتن لەسەر ئاو", "جلسات فوق الماء", "Seating over the water"),
            localize("ڕوانگەی ڕاستەوخۆ بۆ دیمەنی ڕووبار", "إطلالة مباشرة على النهر", "Direct river view")
        ],
        gallery: [
            "images/hero.jpg",
            "images/activity.jpg",
            "images/nature.jpg",
            "images/landscape.jpg"
        ],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "ئەم خزمەتگوزارییە بۆ ئەوانەیە کە حەزیان لە دانیشتن و پشوودانە لەسەر ئاو. خێزان و هاوڕێیان دەتوانن لێرە کاتێکی ئارام و پڕ لە دیمەنی جوان بەسەر ببەن و لە هەوای سروشتیی نەوڕۆڵی چێژ وەربگرن.",
            "هذه الخدمة مناسبة لمن يحب الجلوس والاسترخاء فوق الماء. يمكن للعائلات والأصدقاء قضاء وقت هادئ وممتع مع مناظر جميلة وهواء طبيعي منعش.",
            "This service is ideal for visitors who enjoy relaxing over the water. Families and friends can spend peaceful time here with beautiful scenery and fresh natural air."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    },
    {
        id: "rental-houses",
        category: localize("مانەوە و کرێ", "إقامة وإيجار", "Stay and Rental"),
        name: localize("خانوو بۆ کرێ", "بيوت للإيجار", "Rental Houses"),
        description: localize(
            "خانووی کرێیی گونجاو بۆ مانەوەی کورتخایەن، پیکنیکی خێزانی و کۆبوونەوەی ئارام.",
            "بيوت مناسبة للإيجار القصير، للنزهات العائلية والجلسات الهادئة.",
            "Comfortable rental houses for short stays, family picnics, and calm gatherings."
        ),
        image: "images/nature.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پاراستنی شوێنی مانەوە", "الحفاظ على مكان الإقامة", "Take care of the stay area"),
            localize("پێشتر داوا بۆ کرێ بکە", "احجز مسبقاً", "Book in advance"),
            localize("ڕێککەوتن لەسەر کاتی هاتن و چوون", "الاتفاق على وقت الدخول والخروج", "Agree on check-in and check-out time")
        ],
        features: [
            localize("گونجاو بۆ مانەوەی کورتخایەن", "مناسب للإقامة القصيرة", "Suitable for short stays"),
            localize("شوێنی ئارام بۆ پیکنیک", "مكان هادئ للنزهات", "Quiet place for picnics"),
            localize("نزیک لە سروشتی سەوز", "قريب من الطبيعة الخضراء", "Close to green nature")
        ],
        gallery: [
            "images/nature.jpg",
            "images/landscape.jpg",
            "images/activity.jpg",
            "images/hero.jpg"
        ],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "خانووە کرێییەکان بۆ ئەو میوانانە گونجاون کە دەیانەوێت ماوەیەکی زیاتر لە نەوڕۆڵی بمێننەوە. ئەم بەشە دەتوانێت بۆ خێزان، هاوڕێ، و گەشتیاریی کورتخایەن هەستێکی ئاسوودە و تایبەت دروست بکات.",
            "البيوت المخصصة للإيجار تناسب الزوار الذين يرغبون بالبقاء مدة أطول في نورولي. هذا القسم يوفر شعوراً بالخصوصية والراحة للعائلات والأصدقاء والزوار القصيري الإقامة.",
            "These rental houses are a good fit for visitors who want to stay longer in Nawroli. They offer a more private and comfortable option for families, friends, and short-term guests."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    },
    {
        id: "boats",
        category: localize("چالاکیی ناو ئاو", "نشاطات مائية", "Water Activity"),
        name: localize("بەلەم", "قوارب", "Boats"),
        description: localize(
            "گەڕان بە بەلەم لەسەر ئاو بۆ بینینی دیمەنەکانی ناوچەکە لە ڕوانگەیەکی جیاواز.",
            "جولات بالقوارب على الماء لمشاهدة مناظر المنطقة من زاوية مختلفة.",
            "Boat rides on the water to enjoy the area from a different point of view."
        ),
        image: "images/landscape.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پاراستنی سەلامەتی لەسەر ئاو", "الالتزام بسلامة الماء", "Follow water safety rules"),
            localize("پابەندبە ڕێنمایی شۆفێر بە", "الالتزام بتوجيهات السائق", "Follow the boat operator's instructions"),
            localize("بۆ کۆمەڵەکان پێشتر داوا بکە", "للمجموعات يرجى الحجز مسبقاً", "For groups, please book in advance")
        ],
        features: [
            localize("گەڕان لەسەر ئاو", "جولة على الماء", "Ride across the water"),
            localize("گونجاو بۆ خێزان و هاوڕێ", "مناسب للعائلات والأصدقاء", "Great for families and friends"),
            localize("بینینی دیمەنەکان لە ڕوانگەیەکی تر", "مشاهدة المناظر من زاوية أخرى", "See the scenery from another angle")
        ],
        gallery: [
            "images/landscape.jpg",
            "images/activity.jpg",
            "images/hero.jpg",
            "images/nature.jpg"
        ],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "بەلەم سوارییەکە ڕێگەیەکی جوانە بۆ بینینی سروشت و ئاوەکانی نەوڕۆڵی لە ڕوانگەیەکی جیاواز. ئەم خزمەتگوزارییە بەتایبەتی بۆ ئەوانەی دڵیان بە گەڕان و وێنەگرتن دەکرێت، تاقیکردنەوەیەکی خۆش و هێمن پێشکەش دەکات.",
            "رحلة القارب طريقة جميلة لمشاهدة طبيعة نورولي ومياهها من منظور مختلف. هذه الخدمة تقدم تجربة هادئة وممتعة خصوصاً لمن يحبون الجولات والتصوير.",
            "Boat rides offer a beautiful way to experience Nawroli's nature and water from a different perspective. This is a calm and enjoyable activity, especially for visitors who like sightseeing and photography."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    },
    {
        id: "jet-ski",
        category: localize("چالاکیی خێرا", "نشاط سريع", "Fast Activity"),
        name: localize("جێتسکی", "جت سكي", "Jet Ski"),
        description: localize(
            "بۆ ئەوانەی حەزیان لە هیجانە، جێتسکی لەگەڵ دیمەنی ئاو و سروشت چالاکییەکی جوانی پێشکەش دەکات.",
            "للباحثين عن الحماس، يقدم الجت سكي تجربة جميلة مع مناظر الماء والطبيعة.",
            "For visitors who enjoy excitement, jet ski offers a fun experience with water and nature views."
        ),
        image: "images/activity.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پابەندبە یاساکانی سەلامەتی بە", "الالتزام بقواعد السلامة", "Follow safety rules"),
            localize("تەنها لە شوێنی دیاریکراو بەکاری بهێنە", "استخدمه فقط في المنطقة المخصصة", "Use only in the designated area"),
            localize("پێش دەستپێکردن ڕێنمایی وەربگرە", "استلم التعليمات قبل البدء", "Receive instructions before starting")
        ],
        features: [
            localize("تجربەی خێرا و هیجانی", "تجربة سريعة ومليئة بالحماس", "Fast and exciting experience"),
            localize("گونجاو بۆ حەز لە چالاکی", "مناسب لمحبي الحركة", "Great for activity lovers"),
            localize("نزیک لە شوێنی وێنەگرتن", "قريب من أماكن التصوير", "Close to photo spots")
        ],
        gallery: ["images/activity.jpg", "images/hero.jpg", "images/landscape.jpg"],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "جێتسکی بۆ ئەو میوانانەیە کە بەدوای هیجان و جووڵەی زیاتردا دەگەڕێن. لەگەڵ هەوای خۆش و دیمەنی ئاو، ئەم خزمەتگوزارییە دەتوانێت بەشێکی بیرنەکراوەی گەشتەکەت بێت، بە تایبەتی بۆ لاوان و هاوڕێیان.",
            "الجت سكي مخصص للزوار الذين يبحثون عن الحماس والحركة. مع الهواء الجميل ومنظر الماء، يمكن أن يصبح هذا النشاط جزءاً لا ينسى من زيارتكم، خاصة للشباب والأصدقاء.",
            "Jet ski is for visitors looking for more excitement and movement. With the fresh air and water scenery, this activity can become a memorable part of the trip, especially for young people and friends."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    },
    {
        id: "food",
        category: localize("خواردن", "طعام", "Food"),
        name: localize("خواردن", "طعام", "Food"),
        description: localize(
            "هەڵبژاردەی خواردنی خێرایی و خێزانی بۆ تەواوکردنی گەشتێکی خۆش لە نزیک ڕووبار.",
            "خيارات طعام سريعة وعائلية لإكمال نزهة ممتعة قرب النهر.",
            "Fast and family-friendly food options to complete a pleasant visit near the river."
        ),
        image: "images/nature.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پاراستنی پاکوخاوێنی شوێنی خواردن", "الحفاظ على نظافة مكان الطعام", "Keep the dining area clean"),
            localize("داوا لەسەر کات ئەنجام بدە", "اطلب في الوقت المناسب", "Place orders on time"),
            localize("ڕێزمانی شوێنی هاوبەش بپارێزە", "احترم النظام في المكان المشترك", "Respect the shared space")
        ],
        features: [
            localize("خواردنی خێرایی و خێزانی", "طعام سريع وعائلي", "Fast and family-friendly food"),
            localize("گونجاو بۆ کۆبوونەوەی خێزان", "مناسب لتجمعات العائلة", "Suitable for family gatherings"),
            localize("نزیک لە خزمەتگوزارییەکانی تر", "قريب من باقي الخدمات", "Close to other services")
        ],
        gallery: ["images/nature.jpg", "images/activity.jpg", "images/hero.jpg"],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "بەشی خواردن بۆ ئەوەیە گەشتیارەکان دوای گەڕان و چالاکی، شوێنێکی ئاسان بۆ پشوودان و خواردنیان هەبێت. ئەم خزمەتگوزارییە دەتوانێت بە هەڵبژاردەی خێرایی و خێزانی، گەشتەکە تەواوتر بکات.",
            "قسم الطعام يمنح الزوار مكاناً مناسباً للراحة وتناول الطعام بعد الجولة والأنشطة. مع الخيارات السريعة والعائلية، يصبح اليوم أكثر راحة وكمالاً.",
            "The food section gives visitors a convenient place to rest and eat after walking around and enjoying activities. With quick and family-friendly options, the trip feels more complete."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    },
    {
        id: "tea-drinks",
        category: localize("چا و خواردنەوە", "شاي ومشروبات", "Tea and Drinks"),
        name: localize("چا و خواردنەوە", "شاي ومشروبات", "Tea and Drinks"),
        description: localize(
            "چا، قاوە و خواردنەوەی سارد بۆ کاتی پشوودان و چێژوەرگرتن لە ژینگەی سروشتی.",
            "شاي وقهوة ومشروبات باردة لوقت الاستراحة والاستمتاع في الأجواء الطبيعية.",
            "Tea, coffee, and cold drinks for relaxing and enjoying the natural atmosphere."
        ),
        image: "images/landscape.jpg",
        ownerName: ownerNamePlaceholder,
        ownerRole: ownerRolePlaceholder,
        locationText: nawroliLocation,
        workingHours: workingHoursPlaceholder,
        rules: [
            localize("پاکوخاوێنی شوێنی دانیشتن بپارێزە", "حافظ على نظافة مكان الجلوس", "Keep the seating area clean"),
            localize("پێش داواکردن لە کاتی کارکردن دڵنیابەوە", "تأكد من وقت العمل قبل الطلب", "Check working hours before ordering"),
            localize("شوێن بۆ خێزانەکان ئارام بهێڵە", "اترك المكان هادئاً للعائلات", "Keep the place calm for families")
        ],
        features: [
            localize("چا و خواردنەوەی جۆراوجۆر", "شاي ومشروبات متنوعة", "A variety of tea and drinks"),
            localize("شوێنی پشوودان", "مكان للراحة", "A place to relax"),
            localize("دیمەنی سروشتی بۆ دانیشتن", "منظر طبيعي للجلوس", "Natural views while sitting")
        ],
        gallery: ["images/landscape.jpg", "images/nature.jpg", "images/hero.jpg"],
        videoUrl: "",
        mapUrl: "",
        longDescription: localize(
            "ئەم بەشە بۆ کاتی پشوودان و دانیشتن لەگەڵ خێزان یان هاوڕێیان گونجاوە. چا، قاوە و خواردنەوەی سارد لە ژینگەی سروشتیی نەوڕۆڵی هەستێکی ئارام و خۆش بۆ میوان دروست دەکات.",
            "هذا القسم مناسب لوقت الراحة والجلوس مع العائلة أو الأصدقاء. الشاي والقهوة والمشروبات الباردة وسط طبيعة نورولي تعطي الزائر إحساساً بالهدوء والمتعة.",
            "This section is perfect for resting and sitting with family or friends. Tea, coffee, and cold drinks in Nawroli's natural setting create a calm and enjoyable experience."
        ),
        price: pricePlaceholder,
        phone: "0750xxxxxxx",
        whatsapp: "9647500000000"
    }
];

/*
    داتاکە دەخرێتە سەر window بۆ ئەوەی app.js بتوانێت بە ئاسانی دەستی پێ بگات.
    ئەم شێوازە لە پرۆژەی vanilla JavaScript ـدا سادە و کارامەیە.
    لە داهاتوودا دەتوانرێت module system ی ڕاستەقینە، bundler، یان API layer بەکاربهێندرێت.
*/
window.services = services;
