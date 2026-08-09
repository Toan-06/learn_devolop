const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origLen = html.length;

// Remove the premature closing </style> tag near line 3604
const brokenCSSChunk = `        .btn-wrong-practice {
                font-size: 0.8rem;
                padding: 6px 12px;
            }

        /* ===================================================
           MOBILE RESPONSIVE — VN HUB GRID & SUBJECT CARDS
           =================================================== */`;

// Let's check where the premature </style> is and fix it!
const prematureStyleTag = `            align-items: center !important;\r\n            justify-content: center !important;\r\n        }\r\n\r\n    </style>\r\n\r\n    \r\n        /* MOBILE BOTTOM DOCK NAVBAR STYLING */`;

const fixedCSS = `            align-items: center !important;
            justify-content: center !important;
        }

        /* MOBILE BOTTOM DOCK NAVBAR STYLING */
        #mobile-bottom-nav {
            display: none !important;
        }

        @media (max-width: 768px) {
            #mobile-bottom-nav {
                position: fixed !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 99998 !important;
                background: rgba(10, 18, 38, 0.96) !important;
                backdrop-filter: blur(25px) !important;
                -webkit-backdrop-filter: blur(25px) !important;
                border-top: 1.5px solid rgba(56, 189, 248, 0.3) !important;
                display: flex !important;
                justify-content: space-around !important;
                align-items: center !important;
                padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px)) !important;
                box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.7) !important;
            }
        }

        .mob-nav-item {
            background: transparent !important;
            border: none !important;
            color: #94a3b8 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 4px !important;
            font-size: 0.72rem !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            padding: 6px 12px !important;
            border-radius: 14px !important;
            transition: all 0.25s ease !important;
            font-family: inherit !important;
        }

        .mob-nav-item i {
            font-size: 1.25rem !important;
            color: #94a3b8 !important;
            transition: transform 0.2s ease, color 0.2s ease !important;
        }

        .mob-nav-item:hover, .mob-nav-item:active, .mob-nav-item.active {
            color: #38bdf8 !important;
            background: rgba(56, 189, 248, 0.15) !important;
        }

        .mob-nav-item:hover i, .mob-nav-item:active i, .mob-nav-item.active i {
            color: #38bdf8 !important;
            transform: scale(1.15) !important;
        }`;

if (html.includes(prematureStyleTag)) {
    html = html.replace(prematureStyleTag, fixedCSS);
    console.log('✅ Fixed premature </style> tag and updated mobile nav CSS!');
} else {
    // Try regex replace for premature style tag
    html = html.replace(/<\/style>\s*\/\* MOBILE BOTTOM DOCK NAVBAR STYLING \*\//g, '/* MOBILE BOTTOM DOCK NAVBAR STYLING */');
    console.log('✅ Regex replaced premature style tag');
}

// Remove duplicate closing style tags if any
html = html.replace('</style>\r\n\r\n    \r\n        /* MOBILE BOTTOM DOCK', '/* MOBILE BOTTOM DOCK');

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 Fix complete! File size:', origLen, '->', html.length);
