const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const orig = content.length;

// 1) Upgrade all white card panels that still exist (wrong answer table)
content = content.replace(
    'background: white; border-radius: 28px; border: 1.5px solid #e2e8f0; padding: 30px; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);',
    'background: rgba(13,21,44,0.9); backdrop-filter: blur(20px); border-radius: 28px; border: 1.5px solid rgba(244,63,94,0.2); padding: 30px; margin-bottom: 40px; box-shadow: 0 12px 32px rgba(0,0,0,0.4);'
);

// 2) Section titles color
content = content.replace(/color: #0f172a; margin: 0; display: flex; align-items: center; gap: 10px;">\s*(📚|📰)/g,
    (match, icon) => `color: #f1f5f9; margin: 0; display: flex; align-items: center; gap: 10px;">${icon}`
);

// 3) Nav back button
content = content.replace(
    '<button class="back-btn" onclick="navigateTo(\'PRIMARY_GRADE_SELECT\')">\r\n                            <i class="fas fa-arrow-left"></i> Danh mục các lớp',
    '<button class="back-btn" onclick="navigateTo(\'PRIMARY_GRADE_SELECT\')" style="background: rgba(15,23,42,0.8); border: 1.5px solid rgba(0,242,254,0.3); color: #38bdf8; padding: 8px 20px; border-radius: 20px; font-weight:700; cursor:pointer; backdrop-filter: blur(10px); transition: all 0.3s;" onmouseover="this.style.borderColor=\'#00f2fe\'; this.style.boxShadow=\'0 0 15px rgba(0,242,254,0.3)\'" onmouseout="this.style.borderColor=\'rgba(0,242,254,0.3)\'; this.style.boxShadow=\'none\'">\r\n                            <i class="fas fa-arrow-left"></i> Danh mục các lớp'
);

// 4) News cards - find the specific pattern
const newsOldPattern = 'onclick="openArticleReaderModal(\'${art.key}\')" style="background: white; border-radius: 24px; border: 1.5px solid #e2e8f0; padding: 24px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.02); cursor: pointer;" onmouseover="this.style.transform=\'translateY(-6px)\'; this.style.borderColor=\'#3b82f6\'; this.style.boxShadow=\'0 15px 30px rgba(59,130,246,0.12)\'" onmouseout="this.style.transform=\'translateY(0)\'; this.style.borderColor=\'#e2e8f0\'; this.style.boxShadow=\'none\'"';
const newsNewPattern = 'onclick="openArticleReaderModal(\'${art.key}\')" style="background: rgba(13,21,44,0.88); backdrop-filter:blur(20px); border-radius: 24px; border: 1.5px solid rgba(56,189,248,0.15); padding: 24px; transition: all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.4); cursor: pointer;" onmouseover="this.style.transform=\'translateY(-6px)\'; this.style.borderColor=\'rgba(56,189,248,0.4)\'; this.style.boxShadow=\'0 16px 36px rgba(0,0,0,0.5)\'" onmouseout="this.style.transform=\'translateY(0)\'; this.style.borderColor=\'rgba(56,189,248,0.15)\'; this.style.boxShadow=\'0 8px 24px rgba(0,0,0,0.4)\'"';
if (content.includes(newsOldPattern)) {
    content = content.replace(newsOldPattern, newsNewPattern);
    console.log('✅ News cards upgraded');
} else {
    console.log('⚠️ News card exact pattern not found');
    // Try a partial approach
    const idx = content.indexOf('openArticleReaderModal(\'${art.key}\')');
    if (idx !== -1) console.log('  Found at idx:', idx, 'Nearby:', content.substring(idx, idx+150));
}

// 5) News article h3 color
content = content.replace(
    'color: #0f172a; margin: 0 0 10px 0; line-height: 1.4; display: flex; gap: 8px; align-items: flex-start;',
    'color: #f1f5f9; margin: 0 0 10px 0; line-height: 1.4; display: flex; gap: 8px; align-items: flex-start;'
);

// 6) News article desc text color
content = content.replace(
    /"font-size: 0\.95rem; color: #334155; line-height: 1\.7; margin: 0;"/g,
    '"font-size: 0.95rem; color: #94a3b8; line-height: 1.7; margin: 0;"'
);

// 7) Grade select "Đang ở" badge to dark
content = content.replace(
    'background: #eff6ff; color: #1d4ed8; padding: 8px 18px; border-radius: 20px; font-weight: 800; font-size: 0.95rem; border: 1px solid #bfdbfe; display: flex; align-items: center; gap: 8px;',
    'background: rgba(56,189,248,0.12); color: #38bdf8; padding: 8px 18px; border-radius: 20px; font-weight: 800; font-size: 0.95rem; border: 1px solid rgba(56,189,248,0.3); display: flex; align-items: center; gap: 8px;'
);

// 8) Change Quiz button (Đổi Lớp) to neon border style
content = content.replace(
    'background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; padding: 9px 20px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; cursor: pointer; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); transition: all 0.2s;" onmouseover="this.style.transform=\'scale(1.03)\'" onmouseout="this.style.transform=\'scale(1)\'">',
    'background: rgba(15,23,42,0.8); border: 1.5px solid rgba(0,242,254,0.4); color: #38bdf8; padding: 9px 20px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; cursor: pointer; backdrop-filter:blur(10px); transition: all 0.3s;" onmouseover="this.style.borderColor=\'#00f2fe\'; this.style.boxShadow=\'0 0 15px rgba(0,242,254,0.3)\'" onmouseout="this.style.borderColor=\'rgba(0,242,254,0.4)\'; this.style.boxShadow=\'none\'">'
);

// 9) Wrong answer empty state dark
content = content.replace(
    'text-align: center; padding: 35px 20px; background: #f8fafc; border-radius: 20px; border: 2px dashed #e2e8f0;',
    'text-align: center; padding: 35px 20px; background: rgba(255,255,255,0.04); border-radius: 20px; border: 2px dashed rgba(255,255,255,0.1);'
);

// 10) Wrong answer item "All clear" text
content = content.replace(
    'font-size: 1.1rem; font-weight: 800; color: #166534; margin-bottom: 4px;',
    'font-size: 1.1rem; font-weight: 800; color: #4ade80; margin-bottom: 4px;'
);

// 11) Wrong answer item cards
content = content.replace(
    /background: white; border: 1\.5px solid \${borderClr}; border-radius: 20px;/g,
    'background: rgba(13,21,44,0.85); border: 1.5px solid ${borderClr}; border-radius: 20px;'
);

// 12) Wrong item question text
content = content.replace(
    'font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 6px;',
    'font-size: 1.05rem; font-weight: 800; color: #f1f5f9; margin-bottom: 6px;'
);

// 13) Wrong item description text
content = content.replace(
    'font-size: 0.88rem; color: #475569; display: flex; gap: 15px; flex-wrap: wrap;',
    'font-size: 0.88rem; color: #94a3b8; display: flex; gap: 15px; flex-wrap: wrap;'
);

// 14) SubText in grade select (small helper)
content = content.replace(
    '<span style="font-size: 0.9rem; color: #64748b;">Chọn môn để bắt đầu ôn luyện</span>',
    '<span style="font-size: 0.9rem; color: #64748b;">Chọn môn để bắt đầu ôn luyện</span>'
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('🎉 Dark theme patches complete! Size change:', orig, '->', content.length);
