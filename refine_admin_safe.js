const fs = require('fs');
const path = require('path');

const adminPagePath = path.join(__dirname, 'app/admin/page.tsx');
let content = fs.readFileSync(adminPagePath, 'utf8');

// 1. Modals: if it has w-[500px] without md: or lg:, change to w-[95%] md:w-[500px]
// If it has w-full lg:w-[450px], it's already responsive.
content = content.replace(/className="(.*?)\bw-\[([0-9]+)px\](.*?)"/g, (match, p1, p2, p3) => {
    // If it has lg:w- or md:w- before the exact match, don't change it here, wait, the regex above matches the 'w-'.
    // Let's check the immediate preceding characters.
    const beforeW = p1.slice(-3); // looking for 'md:', 'lg:'
    if (beforeW.includes(':')) {
        return match; // It already has a prefix like lg:w-[450px]
    }
    
    if (parseInt(p2) > 300) {
        return `className="${p1}w-[95%] md:w-[${p2}px]${p3}"`;
    }
    return match;
});

// 2. Grids: grid-cols-4 without prefix -> grid-cols-1 md:grid-cols-4
content = content.replace(/className="(.*?)\bgrid-cols-4\b(.*?)"/g, (match, p1, p2) => {
    const beforeGrid = p1.slice(-3);
    if (beforeGrid.includes(':')) return match;
    return `className="${p1}grid-cols-1 md:grid-cols-4${p2}"`;
});

content = content.replace(/className="(.*?)\bgrid-cols-3\b(.*?)"/g, (match, p1, p2) => {
    const beforeGrid = p1.slice(-3);
    if (beforeGrid.includes(':')) return match;
    return `className="${p1}grid-cols-1 md:grid-cols-3${p2}"`;
});

// 3. Modals and flex: flex gap-4 -> flex-col md:flex-row gap-4
// Only inside modal dialogs. Let's just target flex gap-4 or flex gap-6 globally if it's horizontal.
content = content.replace(/className="(.*?)\bflex gap-4(.*?)"/g, (match, p1, p2) => {
    const beforeFlex = p1.slice(-3);
    if (beforeFlex.includes(':') || match.includes('flex-col')) return match;
    return `className="${p1}flex flex-col md:flex-row gap-4${p2}"`;
});
content = content.replace(/className="(.*?)\bflex gap-6(.*?)"/g, (match, p1, p2) => {
    const beforeFlex = p1.slice(-3);
    if (beforeFlex.includes(':') || match.includes('flex-col')) return match;
    return `className="${p1}flex flex-col md:flex-row gap-6${p2}"`;
});

// 4. Tables overflow
content = content.replace(/<table className="(.*?)"/g, (match, p1) => {
    if (match.includes('min-w-[800px]')) return match;
    return `<table className="${p1} min-w-[800px] md:min-w-full"`;
});

// 5. w-1/2 -> w-full md:w-1/2
content = content.replace(/className="(.*?)\bw-1\/2\b(.*?)"/g, (match, p1, p2) => {
    const beforeW = p1.slice(-3);
    if (beforeW.includes(':')) return match;
    return `className="${p1}w-full md:w-1/2${p2}"`;
});


fs.writeFileSync(adminPagePath, content, 'utf8');
console.log('Admin page modified safely!');
