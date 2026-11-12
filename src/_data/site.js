module.exports = {
    buildDate: new Date(),
    url: process.env.ELEVENTY_ENV === 'development' ? 'http://localhost:8080' : 'https://plasticmind.com',
    title: process.env.ELEVENTY_ENV === 'development' ? '🔴 Plasticmind' : 'Plasticmind',
    description: "Jesse Gardner writes about design systems, accessibility, and AI.",
    twitter: "@plasticmind",
    googleAnalyticsId: process.env.ELEVENTY_ENV === 'development' ? null : 'G-CZEFV7V3C1',

    // The one description of Jesse that the structured data and bios share.
    // Keep third-party profiles (LinkedIn, ADPList, speaker bios) consistent
    // with it.
    author: {
        name: "Jesse Gardner",
        jobTitle: "Director, Product Engineering",
        worksFor: "New York State Office of Information Technology Services",
        image: "/assets/i/jesse-gardner.jpg",
        bio: "Jesse Gardner is Director, Product Engineering for New York State and manages the NYS Design System. Jesse joined the state as Director, User Research and built its Central Accessibility Team.",
        knowsAbout: [
            "Design systems",
            "Web accessibility",
            "Web components",
            "Design tokens",
            "AI agent context and harnesses",
            "User research",
            "Front-end engineering"
        ],
        sameAs: [
            "https://www.linkedin.com/in/plasticmind/",
            "https://github.com/plasticmind",
            "https://adplist.org/mentors/jesse-gardner",
            "https://digitalgovernmenthub.org/authors/jesse-gardner/",
            "https://practicaldesignsystems.com/"
        ]
    }
};
