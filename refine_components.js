const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'app/components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Make modals responsive: w-[500px], w-[600px]
    content = content.replace(/className="(.*?)\bw-\[([0-9]+)px\](.*?)"/g, (match, p1, p2, p3) => {
        if (match.includes(`md:w-[${p2}px]`)) return match;
        // only for large widths
        if (parseInt(p2) > 300) {
            return `className="${p1}w-[95%] md:w-[${p2}px]${p3}"`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Components responsiveness refined!');
