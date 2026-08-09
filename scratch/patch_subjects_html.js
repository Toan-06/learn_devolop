const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const startMarker = '            const subjectsHtml = primarySubjects.map(subKey =>';
const newsFeedMarker = '            const newsFeedArticles = getGradeSpecificArticles';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(newsFeedMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error('Markers not found', startIdx, endIdx);
    process.exit(1);
}

// Find the .join(''); just before newsFeedArticles
const joinStr = ".join('');";
const joinIdx = content.lastIndexOf(joinStr, endIdx);

console.log('startIdx:', startIdx, 'joinIdx:', joinIdx, 'endIdx:', endIdx);
console.log('Old snippet (first 300 chars):', content.substring(startIdx, startIdx + 300));

const newCode = `            const getGlowRGB = (color) => {
                if (color.includes('#10b981')) return '16,185,129';
                if (color.includes('#0284c7') || color.includes('#0369a1')) return '2,132,199';
                if (color.includes('#f43f5e') || color.includes('#be123c')) return '244,63,94';
                if (color.includes('#8b5cf6') || color.includes('#6d28d9')) return '139,92,246';
                if (color.includes('#f59e0b') || color.includes('#d97706')) return '245,158,11';
                if (color.includes('#06b6d4') || color.includes('#0891b2')) return '6,182,212';
                if (color.includes('#ec4899') || color.includes('#db2777')) return '236,72,153';
                if (color.includes('#22c55e') || color.includes('#15803d')) return '34,197,94';
                if (color.includes('#ea580c') || color.includes('#c2410c')) return '234,88,12';
                if (color.includes('#14b8a6') || color.includes('#0f766e')) return '20,184,166';
                return '100,116,139';
            };

            const subjectsHtml = primarySubjects.map((subKey, idx) => {
                const meta = subjectMeta[subKey] || { name: subKey, icon: '📚', desc: \`Chương trình bài học môn \${subKey} Lớp \${lvl}\`, color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)', lightBg: '#f8fafc', badge: 'Môn Học' };
                const glow = getGlowRGB(meta.color);
                const delay = idx * 70;
                return \`
                    <div onclick="selectPrimarySubject('\${subKey}')" style="
                        background: rgba(13,21,44,0.9);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border-radius: 28px;
                        border: 1.5px solid rgba(\${glow},0.22);
                        padding: 26px 24px;
                        text-align: left;
                        cursor: pointer;
                        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        box-shadow: 0 12px 32px rgba(0,0,0,0.45);
                        animation: fadeInUp 0.45s ease \${delay}ms both;
                    " onmouseover="
                        this.style.transform='translateY(-8px) scale(1.02)';
                        this.style.borderColor='rgba(\${glow},0.55)';
                        this.style.boxShadow='0 22px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(\${glow},0.3)';
                    " onmouseout="
                        this.style.transform='translateY(0) scale(1)';
                        this.style.borderColor='rgba(\${glow},0.22)';
                        this.style.boxShadow='0 12px 32px rgba(0,0,0,0.45)';
                    ">
                        <div style="position:absolute; top:0; left:0; width:100%; height:4px; background:\${meta.color}; border-radius:28px 28px 0 0;"></div>
                        <div style="position:absolute; inset:0; background:radial-gradient(ellipse at 0% 0%, rgba(\${glow},0.07) 0%, transparent 65%); pointer-events:none;"></div>
                        <div style="position:relative; z-index:2;">
                            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
                                <div style="
                                    width:60px; height:60px;
                                    border-radius:18px;
                                    background:rgba(\${glow},0.15);
                                    border:1.5px solid rgba(\${glow},0.28);
                                    display:flex; align-items:center; justify-content:center;
                                    font-size:2.1rem;
                                    box-shadow:0 6px 16px rgba(0,0,0,0.3);
                                ">\${meta.icon}</div>
                                <span style="
                                    background:rgba(\${glow},0.13);
                                    border:1px solid rgba(\${glow},0.3);
                                    color:rgb(\${glow});
                                    filter:brightness(1.6);
                                    padding:5px 14px; border-radius:20px;
                                    font-weight:800; font-size:0.75rem; letter-spacing:0.3px;
                                ">\${meta.badge}</span>
                            </div>
                            <h3 style="font-size:1.38rem; font-weight:900; color:#f1f5f9; margin:0 0 8px 0; letter-spacing:-0.3px;">\${meta.name}</h3>
                            <p style="font-size:0.87rem; color:#94a3b8; margin:0 0 16px 0; line-height:1.6;">\${meta.desc}</p>
                            <div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px;">
                                <span style="background:rgba(255,255,255,0.06); color:#cbd5e1; padding:4px 10px; border-radius:10px; font-size:0.72rem; font-weight:700; border:1px solid rgba(255,255,255,0.1);">⚡ 500 Câu Trắc Nghiệm</span>
                                <span style="background:rgba(\${glow},0.1); color:rgb(\${glow}); filter:brightness(1.6); padding:4px 10px; border-radius:10px; font-size:0.72rem; font-weight:700; border:1px solid rgba(\${glow},0.25);">🏆 Thi Thử Chuẩn BGD</span>
                                <span style="background:rgba(168,85,247,0.12); color:#c084fc; padding:4px 10px; border-radius:10px; font-size:0.72rem; font-weight:700; border:1px solid rgba(168,85,247,0.25);">⚡ Thần Tốc Combo</span>
                            </div>
                        </div>
                        <button style="
                            background:\${meta.color};
                            border:none; border-radius:18px; color:white;
                            font-weight:800; width:100%; padding:13px 0;
                            font-size:0.95rem; cursor:pointer; pointer-events:none;
                            display:flex; align-items:center; justify-content:center; gap:10px;
                            box-shadow:0 6px 18px rgba(\${glow},0.35);
                        ">
                            <span>Vào Bài Học &amp; Luyện Thi</span> <i class="fas fa-arrow-right" style="font-size:0.85rem;"></i>
                        </button>
                    </div>
                \`;
            }).join('');`;

const before = content.substring(0, startIdx);
const after = content.substring(joinIdx + joinStr.length);

const newContent = before + newCode + after;
fs.writeFileSync('index.html', newContent, 'utf8');
console.log('✅ subjectsHtml replaced successfully! New file size:', newContent.length);
