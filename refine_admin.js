const fs = require('fs');
const path = require('path');

const adminPagePath = path.join(__dirname, 'app/admin/page.tsx');
let content = fs.readFileSync(adminPagePath, 'utf8');

// 1. Make modals responsive: w-[500px], w-[600px], w-[800px], w-[1000px]
// Replace w-[XXXpx] with w-[95%] md:w-[XXXpx] inside modal divs
content = content.replace(/className="(.*?)\bw-\[([0-9]+)px\](.*?)"/g, (match, p1, p2, p3) => {
    // If it already has md:w-[...], don't touch
    if (match.includes(`md:w-[${p2}px]`)) return match;
    
    // For specific large widths that break mobile, we add w-[95%]
    if (parseInt(p2) > 300) {
        return `className="${p1}w-[95%] md:w-[${p2}px]${p3}"`;
    }
    return match;
});

// 2. Fix grid cols: grid-cols-4, grid-cols-3
content = content.replace(/\bgrid-cols-4\b/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4');
content = content.replace(/\bgrid-cols-3\b/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');

// 3. Fix w-1/2 inside modals
content = content.replace(/className="(.*?)\bw-1\/2(.*?)"/g, (match, p1, p2) => {
    if (match.includes('md:w-1/2')) return match;
    return `className="${p1}w-full md:w-1/2${p2}"`;
});

// 4. Flex direction on mobile for form groups
// Often we see flex gap-4 or flex gap-6 where it should be flex-col md:flex-row
content = content.replace(/className="(.*?)\bflex gap-4(.*?)"/g, (match, p1, p2) => {
    if (match.includes('flex-col') || match.includes('md:flex-row')) return match;
    // Basic heuristic: if it contains flex gap-4, maybe it needs col on mobile
    return `className="${p1}flex flex-col md:flex-row gap-4${p2}"`;
});
content = content.replace(/className="(.*?)\bflex gap-6(.*?)"/g, (match, p1, p2) => {
    if (match.includes('flex-col') || match.includes('md:flex-row')) return match;
    return `className="${p1}flex flex-col md:flex-row gap-6${p2}"`;
});

// 5. Overflow-x-auto for standard tables
content = content.replace(/<table className="(.*?)"/g, (match, p1) => {
    if (match.includes('min-w-[800px]') || match.includes('min-w-full')) return match;
    return `<table className="${p1} min-w-[800px] lg:min-w-full"`;
});

fs.writeFileSync(adminPagePath, content, 'utf8');
console.log('Admin page responsiveness refined!');
