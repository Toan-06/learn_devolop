const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove duplicate block lines 3660-3707
const dupBlock = `        #mobile-bottom-nav {\r\n            position: fixed;\r\n            bottom: 0;\r\n            left: 0;\r\n            right: 0;\r\n            z-index: 9998;\r\n            background: rgba(10, 18, 38, 0.94);\r\n            backdrop-filter: blur(20px);\r\n            -webkit-backdrop-filter: blur(20px);\r\n            border-top: 1.5px solid rgba(56, 189, 248, 0.25);\r\n            display: flex;\r\n            justify-content: space-around;\r\n            align-items: center;\r\n            padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));\r\n            box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.6);\r\n        }\r\n        @media (min-width: 769px) {\r\n            #mobile-bottom-nav {\r\n                display: none !important;\r\n            }\r\n        }\r\n        .mob-nav-item {\r\n            background: transparent;\r\n            border: none;\r\n            color: #94a3b8;\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n            gap: 4px;\r\n            font-size: 0.72rem;\r\n            font-weight: 700;\r\n            cursor: pointer;\r\n            padding: 6px 12px;\r\n            border-radius: 14px;\r\n            transition: all 0.25s ease;\r\n        }\r\n        .mob-nav-item i {\r\n            font-size: 1.25rem;\r\n            transition: transform 0.2s ease;\r\n        }\r\n        .mob-nav-item:active, .mob-nav-item.active {\r\n            color: #38bdf8;\r\n            background: rgba(56, 189, 248, 0.12);\r\n        }\r\n        .mob-nav-item:active i {\r\n            transform: scale(1.2);\r\n        }`;

if (html.includes(dupBlock)) {
    html = html.replace(dupBlock, '');
    console.log('✅ Removed duplicate CSS block!');
} else {
    // Try normalized match
    const normDup = dupBlock.replace(/\r\n/g, '\n');
    if (html.includes(normDup)) {
        html = html.replace(normDup, '');
        console.log('✅ Removed duplicate CSS block via normalized match!');
    }
}

fs.writeFileSync('index.html', html, 'utf8');
