const fs = require('fs');
let content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Remove the previously added window.fetch interceptor safely
content = content.replace(/if \(!\(window as any\)\.__fetchIntercepted\) \{[\s\S]*?\(window as any\)\.__fetchIntercepted = true;\s*\}/g, "");

content = content.replace(/\bfetch\(/g, 'fetchWithAuth(');

const fetchWithAuthDef = `
  const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit) => {
    let urlStr = "";
    if (typeof input === "string") urlStr = input;
    else if (input instanceof URL) urlStr = input.toString();
    else if (input instanceof Request) urlStr = input.url;

    const isApiUrl = urlStr.includes(apiUrl);
    const isLogin = urlStr.includes("/api/admin/login");

    if (isApiUrl && !isLogin) {
      const token = localStorage.getItem("admin_token");
      init = init || {};
      init.headers = {
        ...init.headers,
        "Authorization": token ? \`Bearer \${token}\` : ""
      };
    }
    return window.fetch(input, init);
  };
`;

content = content.replace(
  /const apiUrl = process\.env\.NEXT_PUBLIC_API_URL \|\| "http:\/\/localhost:5001";/g,
  `const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";\n${fetchWithAuthDef}`
);

fs.writeFileSync('app/admin/page.tsx', content, 'utf8');
console.log('Fixed fetches');
