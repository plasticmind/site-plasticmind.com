module.exports = {
    buildDate: new Date(),
    url: process.env.ELEVENTY_ENV === 'development' ? 'http://localhost:8080' : 'https://plasticmind.com',
    title: process.env.ELEVENTY_ENV === 'development' ? '🔴 Plasticmind' : 'Plasticmind',
    description: "Helping people flourish with technology.",
    twitter: "@plasticmind"
};