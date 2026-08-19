const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Make floating glass island responsive
content = content.replace(/className="(.*?)\bflex flex-col lg:flex-row(.*?)"/g, (match, p1, p2) => {
    return match; // It's already flex-col on mobile, lg:flex-row
});

// 2. Fix the padding of the Brand Introduction section for mobile
content = content.replace(/className="(.*?)\bp-8 md:p-12 lg:p-16(.*?)"/g, (match, p1, p2) => {
    return `className="${p1}p-6 md:p-12 lg:p-16${p2}"`;
});

// 3. Fix any w-1/2 or lg:w-1/2 hardcoded
content = content.replace(/className="(.*?)\bw-full lg:w-1\/2(.*?)"/g, (match, p1, p2) => {
    return match; // Already responsive
});

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Storefront page responsiveness refined!');
