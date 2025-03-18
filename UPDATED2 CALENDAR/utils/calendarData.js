const LANGUAGES = {
    en: "English",
    hi: "हिंदी",
    ur: "اردو",
    gu: "ગુજરાતી",
    mr: "मराठी"
};

const WEEKDAYS = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
    ur: ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"],
    gu: ["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"],
    mr: ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
};

const FESTIVALS = {
    hindu: [
        { date: "2024-03-25", name: "Holi", color: "#FF9933" }, // Saffron color
        { date: "2024-08-15", name: "Raksha Bandhan", color: "#FF9933" },
        { date: "2024-10-12", name: "Navratri", color: "#FF9933" },
        { date: "2024-11-01", name: "Diwali", color: "#FF9933" },
        { date: "2024-01-15", name: "Makar Sankranti", color: "#FF9933" }
    ],
    islamic: [
        { date: "2024-04-10", name: "Eid al-Fitr", color: "#006400" }, // Dark green
        { date: "2024-06-17", name: "Eid al-Adha", color: "#006400" },
        { date: "2024-07-19", name: "Islamic New Year", color: "#006400" },
        { date: "2024-09-28", name: "Mawlid", color: "#006400" },
        { date: "2024-03-11", name: "Ramadan Start", color: "#006400" }
    ]
};

const TRANSLATIONS = {
    en: {
        calendar: "Calendar",
        prayerTimes: "Prayer Times",
        festivals: "Festivals",
        qibla: "Qibla Direction",
        weekdays: WEEKDAYS.en
    },
    hi: {
        calendar: "कैलेंडर",
        prayerTimes: "नमाज का समय",
        festivals: "त्योहार",
        qibla: "क़िबला दिशा",
        weekdays: WEEKDAYS.hi
    },
    ur: {
        calendar: "کیلنڈر",
        prayerTimes: "نماز کے اوقات",
        festivals: "تہوار",
        qibla: "قبلہ کی سمت",
        weekdays: WEEKDAYS.ur
    }
};
