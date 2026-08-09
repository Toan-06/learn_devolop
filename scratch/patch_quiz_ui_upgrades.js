const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origLen = html.length;

// 1) KaTeX CDN in head (replace FIRST </head> only)
const katexCode = `    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
</head>`;

if (!html.includes('katex.min.css')) {
    const headIdx = html.indexOf('</head>');
    if (headIdx !== -1) {
        html = html.substring(0, headIdx) + katexCode + html.substring(headIdx + 7);
        console.log('✅ KaTeX CDN added to head at index:', headIdx);
    }
}

// 2) Quiz question header badges
const targetBadgeMarker = `<span style="font-size:0.75rem; font-weight:800; background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:4px 12px; border-radius:20px; letter-spacing:0.5px;">\r\n                            \${isPrimaryQuizMode ? \`MÔN \${String(selectedPrimarySubject).toUpperCase()} • LỚP \${selectedPrimaryLevel}\` : 'CÂU HỎI TRẮC NGHIỆM'}\r\n                        </span>`;

const replacementBadgeMarker = `<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                            <span style="font-size:0.75rem; font-weight:800; background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:4px 12px; border-radius:20px; letter-spacing:0.5px;">
                                \${isPrimaryQuizMode ? \`MÔN \${String(selectedPrimarySubject).toUpperCase()} • LỚP \${selectedPrimaryLevel}\` : 'CÂU HỎI TRẮC NGHIỆM'}
                            </span>
                            \${question.difficulty ? \`
                                <span style="font-size:0.72rem; font-weight:800; padding:4px 10px; border-radius:20px; \${
                                    question.difficulty === 'Nhận biết' ? 'background:rgba(34,197,94,0.15); color:#4ade80; border:1px solid rgba(34,197,94,0.3);' :
                                    question.difficulty === 'Thông hiểu' ? 'background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);' :
                                    question.difficulty === 'Vận dụng' ? 'background:rgba(245,158,11,0.15); color:#facc15; border:1px solid rgba(245,158,11,0.3);' :
                                    'background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.3);'
                                }">
                                    \${question.difficulty === 'Nhận biết' ? '🟢' : question.difficulty === 'Thông hiểu' ? '🔵' : question.difficulty === 'Vận dụng' ? '🟠' : '🔴'} \${question.difficulty}
                                </span>
                            \` : ''}
                            \${question.topic ? \`
                                <span style="font-size:0.72rem; font-weight:700; background:rgba(168,85,247,0.12); color:#c084fc; border:1px solid rgba(168,85,247,0.3); padding:4px 10px; border-radius:20px;">
                                    📌 \${question.topic}
                                </span>
                            \` : ''}
                        </div>`;

if (html.includes(targetBadgeMarker)) {
    html = html.replace(targetBadgeMarker, replacementBadgeMarker);
    console.log('✅ Quiz badges injected');
}

// 3) Explanation Card Step Button
const oldExplainText = `<p style="margin: 0; color: #334155; line-height: 1.7; font-size: 1rem;">\${question.explain || 'Không có giải thích bổ sung.'}</p>`;
const newExplainText = `<p style="margin: 0; color: #94a3b8; line-height: 1.7; font-size: 0.98rem; font-weight: 500;">\${question.explain || 'Không có giải thích bổ sung.'}</p>
                            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(255,255,255,0.1); display: flex; justify-content: flex-end;">
                                <button onclick="openDetailedStepSolutionModal()" style="background: linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(168,85,247,0.2) 100%); border: 1px solid rgba(56,189,248,0.4); color: #38bdf8; padding: 7px 16px; border-radius: 14px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.25s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='#00f2fe'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(56,189,248,0.4)'">
                                    <span>📖 Xem Lời Giải Chi Tiết Từng Bước</span>
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>`;

if (html.includes(oldExplainText)) {
    html = html.replace(oldExplainText, newExplainText);
    console.log('✅ Step-by-step solution button injected into explanation card');
}

// Explanation card dark background
html = html.replace(
    'background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);',
    'background: rgba(13,21,44,0.95); backdrop-filter: blur(20px); border: 1.5px solid rgba(56,189,248,0.2); border-radius: 16px; padding: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);'
);
html = html.replace(
    'color: #1e293b; font-size: 1.05rem; font-weight: 800; display: flex; align-items: center; gap: 8px;',
    'color: #f1f5f9; font-size: 1.05rem; font-weight: 800; display: flex; align-items: center; gap: 8px;'
);

// 4) Add Step Modal HTML (replace LAST </body> only)
const stepModalHTML = `
    <!-- DETAILED STEP-BY-STEP SOLUTION MODAL -->
    <div id="step-solution-modal" style="display:none; position:fixed; inset:0; z-index:999999; background:rgba(8,15,35,0.92); backdrop-filter:blur(20px); align-items:center; justify-content:center; padding:15px;">
        <div style="background:rgba(13,21,44,0.98); border:1.5px solid rgba(56,189,248,0.3); border-radius:28px; width:100%; max-width:720px; max-height:85vh; display:flex; flex-direction:column; box-shadow:0 25px 60px rgba(0,0,0,0.8); overflow:hidden; animation:fadeInUp 0.3s ease;">
            <div style="padding:18px 24px; background:rgba(15,23,42,0.9); border-bottom:1.5px solid rgba(56,189,248,0.2); display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:1.6rem;">📖</span>
                    <div>
                        <h3 style="margin:0; font-size:1.15rem; font-weight:800; color:#f1f5f9;">Lời Giải Chi Tiết & Phân Tích Chuyên Sâu</h3>
                        <p style="margin:0; font-size:0.78rem; color:#94a3b8;" id="step-modal-subtitle">Phân tích từng bước chuẩn sư phạm</p>
                    </div>
                </div>
                <button onclick="closeDetailedStepSolutionModal()" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#ef4444; width:34px; height:34px; border-radius:50%; font-size:1rem; cursor:pointer;">✕</button>
            </div>
            <div id="step-modal-body" style="padding:24px; overflow-y:auto; color:#f1f5f9; display:flex; flex-direction:column; gap:16px;">
                <!-- Injected via JS -->
            </div>
        </div>
    </div>
</body>`;

if (!html.includes('id="step-solution-modal"')) {
    const bodyIdx = html.lastIndexOf('</body>');
    if (bodyIdx !== -1) {
        html = html.substring(0, bodyIdx) + stepModalHTML + html.substring(bodyIdx + 7);
        console.log('✅ Step modal HTML injected at body index:', bodyIdx);
    }
}

// 5) Add Step Modal JS logic (replace LAST </script> only)
const stepModalJS = `
        // DETAILED STEP SOLUTION MODAL LOGIC
        function openDetailedStepSolutionModal() {
            if (!filteredQuestions || !filteredQuestions[currentQuestionIndex]) return;
            const q = filteredQuestions[currentQuestionIndex];
            const modal = document.getElementById('step-solution-modal');
            const body = document.getElementById('step-modal-body');
            const subtitle = document.getElementById('step-modal-subtitle');
            if (!modal || !body) return;

            if (subtitle) {
                subtitle.innerText = \`Môn \${typeof selectedPrimarySubject !== 'undefined' ? selectedPrimarySubject.toUpperCase() : 'Học'} • Lớp \${typeof selectedPrimaryLevel !== 'undefined' ? selectedPrimaryLevel : 12} • Mức độ: \${q.difficulty || 'Tổng hợp'}\`;
            }

            const letters = ['A', 'B', 'C', 'D'];
            const correctText = q.options && q.options[q.correct] ? q.options[q.correct] : '';

            body.innerHTML = \`
                <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:18px; padding:16px;">
                    <div style="font-size:0.75rem; font-weight:800; color:#38bdf8; margin-bottom:6px;">❓ ĐỀ BÀI CÂU \${currentQuestionIndex + 1}:</div>
                    <div style="font-size:1.02rem; font-weight:700; color:#f1f5f9; line-height:1.5;">\${q.question}</div>
                </div>

                <div style="background:rgba(34,197,94,0.12); border:1.5px solid rgba(34,197,94,0.3); border-radius:18px; padding:16px; display:flex; align-items:center; gap:14px;">
                    <div style="width:42px; height:42px; border-radius:50%; background:#22c55e; color:#0f172a; font-weight:900; font-size:1.2rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">\${letters[q.correct]}</div>
                    <div>
                        <div style="font-size:0.78rem; color:#4ade80; font-weight:800;">ĐÁP ÁN CHÍNH XÁC:</div>
                        <div style="font-size:1.05rem; font-weight:800; color:#ffffff;">\${correctText}</div>
                    </div>
                </div>

                <div style="background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.25); border-radius:18px; padding:18px;">
                    <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:0.95rem; font-weight:800; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-brain"></i> 🎯 BẢN ĐỒ KIẾN THỨC TRỌNG TÂM:
                    </h4>
                    <div style="font-size:0.9rem; color:#cbd5e1; line-height:1.6;">
                        📌 Chủ đề: <strong>\${q.topic || 'Tổng hợp'}</strong><br>
                        💡 Mức độ câu hỏi: <strong>\${q.difficulty || 'Thường'}</strong><br>
                        📚 Áp dụng quy tắc biến đổi & kiến thức trọng tâm Bộ Giáo Dục.
                    </div>
                </div>

                <div style="background:rgba(168,85,247,0.08); border:1px solid rgba(168,85,247,0.25); border-radius:18px; padding:18px;">
                    <h4 style="margin:0 0 10px 0; color:#c084fc; font-size:0.95rem; font-weight:800; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-list-check"></i> 📝 LỜI GIẢI CHI TIẾT TỪNG BƯỚC:
                    </h4>
                    <div style="font-size:0.92rem; color:#f1f5f9; line-height:1.7; background:rgba(0,0,0,0.3); padding:14px; border-radius:12px; border-left:3px solid #c084fc;">
                        \${q.explain || 'Đang cập nhật phân tích chi tiết...'}
                    </div>
                </div>

                <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.25); border-radius:18px; padding:16px;">
                    <div style="font-size:0.85rem; color:#facc15; font-weight:800; margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-triangle-exclamation"></i> ⚠️ LƯU Ý TRÁNH BẪY CÂU HỎI:
                    </div>
                    <div style="font-size:0.82rem; color:#94a3b8; line-height:1.5;">
                        Chú ý quan sát kỹ các điều kiện xác định, dấu phép tính và bẫy đáp án gây nhầm lẫn.
                    </div>
                </div>
            \`;

            modal.style.display = 'flex';

            if (typeof renderMathInElement === 'function') {
                renderMathInElement(body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ]
                });
            }
        }

        function closeDetailedStepSolutionModal() {
            const modal = document.getElementById('step-solution-modal');
            if (modal) modal.style.display = 'none';
        }
</script>`;

if (!html.includes('function openDetailedStepSolutionModal()')) {
    const scriptIdx = html.lastIndexOf('</script>');
    if (scriptIdx !== -1) {
        html = html.substring(0, scriptIdx) + stepModalJS + html.substring(scriptIdx + 9);
        console.log('✅ Step modal JS logic injected at script index:', scriptIdx);
    }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 Done cleanly! File size change:', origLen, '->', html.length);
