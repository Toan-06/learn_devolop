const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origSize = html.length;

// ============================================================
// 1) INSERT COMPREHENSIVE MOBILE CSS for new dark glassmorphism 
//    elements AFTER the existing @media (max-width: 480px) block
//    (which ends around line 1530ish, just find the marker)
// ============================================================

const mobileInsertMarker = `        .btn-wrong-practice {\r\n                font-size: 0.8rem;\r\n                padding: 6px 12px;\r\n            }`;

const newMobileCSS = `        .btn-wrong-practice {
                font-size: 0.8rem;
                padding: 6px 12px;
            }

        /* ===================================================
           MOBILE RESPONSIVE — VN HUB GRID & SUBJECT CARDS
           =================================================== */
        @media (max-width: 768px) {
            .vn-hub-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
                margin: 20px auto !important;
            }
            .vn-module-card {
                min-height: auto !important;
                padding: 24px 18px 20px !important;
                border-radius: 22px !important;
            }
            .vn-mod-icon {
                font-size: 2.8rem !important;
                margin: 6px 0 6px 0 !important;
            }
            .vn-mod-title {
                font-size: 1rem !important;
                margin-bottom: 6px !important;
            }
            .vn-mod-desc {
                font-size: 0.8rem !important;
                margin-bottom: 14px !important;
            }
            .vn-mod-badge {
                padding: 6px 14px !important;
                font-size: 0.72rem !important;
            }
        }

        @media (max-width: 480px) {
            /* Grade select grid: 2 columns on mobile */
            .license-grid[style*="grid-template-columns: repeat(auto-fill"] {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 12px !important;
            }

            /* Subject hub: full-width cards on small phones */
            .vn-hub-grid {
                grid-template-columns: 1fr !important;
                gap: 14px !important;
            }

            /* Subject select cards: compact horizontal layout on tiny screens */
            /* (injected via JS style, override via class) */
            .vn-module-card {
                flex-direction: row !important;
                text-align: left !important;
                padding: 18px 16px !important;
                min-height: auto !important;
                gap: 14px !important;
                align-items: center !important;
            }
            .vn-mod-icon {
                font-size: 2.6rem !important;
                margin: 0 !important;
                flex-shrink: 0 !important;
            }
            /* Text wrapper inside horizontal card */
            .vn-module-card > :not(.vn-mod-icon):not(.vn-mod-badge) {
                text-align: left !important;
            }
        }

        /* ===================================================
           QUIZ INTERFACE MOBILE — Improved touch targets
           =================================================== */
        @media (max-width: 768px) {
            .quiz-container {
                padding: 0 !important;
            }
            .question-section {
                padding: 20px 16px !important;
            }
            .question-text {
                font-size: 1.05rem !important;
                line-height: 1.6 !important;
            }
            .option {
                padding: 14px 16px !important;
                border-radius: 14px !important;
                gap: 10px !important;
            }
            .option-letter {
                width: 34px !important;
                height: 34px !important;
                font-size: 0.9rem !important;
                flex-shrink: 0 !important;
            }
            .option-text {
                font-size: 0.93rem !important;
                line-height: 1.45 !important;
            }
            .quiz-footer {
                padding: 14px 16px !important;
                gap: 10px !important;
            }
            .nav-btn {
                padding: 11px 18px !important;
                font-size: 0.88rem !important;
                border-radius: 14px !important;
                flex: 1 !important;
                justify-content: center !important;
            }
            /* Explanation panel */
            .explanation.show {
                margin-top: 16px !important;
            }
        }

        @media (max-width: 480px) {
            .quiz-header {
                padding: 12px 14px !important;
            }
            .question-text {
                font-size: 0.98rem !important;
            }
            .option {
                padding: 12px 14px !important;
            }
            .option-letter {
                width: 30px !important;
                height: 30px !important;
                font-size: 0.82rem !important;
                margin-right: 10px !important;
            }
            .option-text {
                font-size: 0.88rem !important;
            }
            .nav-btn {
                padding: 10px 14px !important;
                font-size: 0.82rem !important;
            }
        }

        /* ===================================================
           RESULT SCREEN MOBILE
           =================================================== */
        @media (max-width: 480px) {
            .result-screen {
                padding: 25px 16px !important;
                border-radius: 20px !important;
            }
            .result-score {
                font-size: 2.5rem !important;
            }
            .result-stats {
                grid-template-columns: 1fr 1fr !important;
                gap: 10px !important;
            }
            .result-actions {
                flex-direction: column !important;
                gap: 10px !important;
            }
            .result-actions .btn {
                width: 100% !important;
                justify-content: center !important;
            }
        }

        /* ===================================================
           STAT WIDGET CARDS (inside PRIMARY_CLASS view)
           =================================================== */
        @media (max-width: 768px) {
            /* Stats row: 2 cols on tablet */
            [style*="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))"] {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 14px !important;
            }
        }
        @media (max-width: 480px) {
            [style*="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))"] {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px !important;
            }
            /* Stat widget compact */
            [style*="border-radius: 24px; padding: 22px;"] {
                padding: 14px 12px !important;
                border-radius: 18px !important;
                gap: 10px !important;
            }
        }

        /* ===================================================
           SUBJECT HUB HERO BANNER MOBILE
           =================================================== */
        @media (max-width: 768px) {
            /* Subject hub hero */
            .primary-hub-hero {
                padding: 20px 16px !important;
                margin-bottom: 20px !important;
                border-radius: 18px !important;
            }
        }
        @media (max-width: 480px) {
            /* Stack hero icon + text vertically */
            .primary-hub-hero {
                flex-direction: column !important;
                text-align: center !important;
                align-items: center !important;
                padding: 18px 14px !important;
            }
        }

        /* ===================================================
           BOTTOM SAFE AREA + STICKY QUIZ FOOTER
           =================================================== */
        @media (max-width: 768px) {
            .quiz-footer {
                position: sticky !important;
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 50 !important;
                background: rgba(10,18,38,0.97) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border-top: 1px solid rgba(56,189,248,0.15) !important;
                padding: 12px 16px env(safe-area-inset-bottom, 8px) !important;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.4) !important;
            }
        }

        /* ===================================================
           GRADE SELECT GRID: 2-col on tablet, 2-col on phone
           =================================================== */
        @media (max-width: 768px) {
            /* Grade grid inside renderPrimaryGradeSelect */
            .license-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 14px !important;
            }
        }
        @media (max-width: 360px) {
            .license-grid {
                grid-template-columns: 1fr !important;
            }
        }

        /* ===================================================
           TOUCH ACTIVE STATE for cards
           =================================================== */
        @media (hover: none) {
            .vn-module-card:active {
                transform: scale(0.97) !important;
                opacity: 0.92 !important;
                transition: transform 0.1s ease !important;
            }
            .option:active {
                transform: scale(0.98) !important;
                transition: transform 0.1s ease !important;
            }
        }

        /* ===================================================
           TOASTS / NOTIFICATIONS on mobile
           =================================================== */
        @media (max-width: 480px) {
            #primary-toast {
                bottom: 80px !important;
                left: 12px !important;
                right: 12px !important;
                max-width: none !important;
                font-size: 0.85rem !important;
                padding: 12px 16px !important;
                border-radius: 14px !important;
            }
        }`;

if (html.includes(mobileInsertMarker)) {
    html = html.replace(mobileInsertMarker, newMobileCSS);
    console.log('✅ Mobile CSS inserted successfully');
} else {
    // Try to find another anchor
    const altMarker = '.btn-wrong-practice {';
    const idx = html.lastIndexOf(altMarker);
    if (idx !== -1) {
        // find the closing }
        const closeIdx = html.indexOf('}', idx + altMarker.length) + 1;
        html = html.substring(0, closeIdx) + '\n' + newMobileCSS.replace(/^[^@\n]*\.btn-wrong-practice[^}]*}\n\n/, '') + html.substring(closeIdx);
        console.log('✅ Mobile CSS inserted via alt marker at', closeIdx);
    } else {
        console.log('❌ Neither marker found. Appending before </style>');
        // Append before the last </style>
        const styleClose = html.lastIndexOf('</style>');
        if (styleClose !== -1) {
            html = html.substring(0, styleClose) + newMobileCSS.replace(/^[^@\n]*\.btn-wrong-practice[^}]*}\n\n/, '') + '\n        ' + html.substring(styleClose);
            console.log('✅ Mobile CSS appended before </style>');
        }
    }
}

// ============================================================
// 2) Improve quiz container to have proper dark styling on mobile
// ============================================================
// Add class to quiz footer for sticky positioning
html = html.replace(
    '<div class="quiz-footer">',
    '<div class="quiz-footer" id="quiz-footer-sticky">'
);
console.log('✅ Quiz footer ID added');

// ============================================================
// 3) Add class to primary hub hero div for mobile targeting
// ============================================================
html = html.replace(
    '<!-- Subject Hub Hero Banner -->',
    '<!-- Subject Hub Hero Banner -->'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n🎉 Mobile CSS complete! Size:', origSize, '->', html.length, '(+' + (html.length - origSize) + ' bytes)');
