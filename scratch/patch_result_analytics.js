const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origLen = html.length;

// 1) Replace light review section styling in renderResult
const oldReviewSection = `<div class="review-section" style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 25px; width: 100%;">`;

const newReviewSection = `
                    <!-- AI COMPETENCY ANALYTICS & WEAKNESS RADAR WIDGET -->
                    <div id="result-analytics-widget" style="background: rgba(13,21,44,0.92); backdrop-filter: blur(20px); border: 1.5px solid rgba(56,189,248,0.25); border-radius: 24px; padding: 24px; margin: 25px auto 10px auto; max-width: 650px; box-shadow: 0 12px 32px rgba(0,0,0,0.5); text-align: left;">
                        <h3 style="color: #38bdf8; font-size: 1.15rem; font-weight: 800; margin: 0 0 16px 0; display: flex; align-items: center; justify-content: space-between;">
                            <span style="display:flex; align-items:center; gap:10px;">
                                <i class="fas fa-chart-line" style="color: #00f2fe;"></i> Phân Tích Năng Lực & Mức Độ
                            </span>
                            <span style="font-size: 0.78rem; background: rgba(56,189,248,0.15); color: #38bdf8; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(56,189,248,0.3);">
                                AI Analytics
                            </span>
                        </h3>
                        <div id="analytics-bars-container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 18px;">
                            <!-- Injected dynamically in renderResult -->
                        </div>
                        <div id="analytics-ai-recommendation" style="background: rgba(168,85,247,0.1); border-left: 4px solid #c084fc; padding: 14px 16px; border-radius: 14px; font-size: 0.88rem; color: #f1f5f9; line-height: 1.6;">
                            🤖 <strong>Gợi ý thông minh từ AI:</strong> Đang phân tích kết quả bài thi...
                        </div>
                    </div>

                    <div class="review-section" style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 25px; width: 100%;">`;

if (html.includes(oldReviewSection)) {
    html = html.replace(oldReviewSection, newReviewSection);
    console.log('✅ Competency analytics card injected into renderResult');
} else {
    console.log('⚠️ Old review section marker not found');
}

// 2) Dark review detail box background
html = html.replace(
    '<div id="review-detail-box" style="display: none; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: left;">',
    '<div id="review-detail-box" style="display: none; background: rgba(13,21,44,0.96); backdrop-filter: blur(20px); border: 1.5px solid rgba(56,189,248,0.25); border-radius: 20px; padding: 24px; max-width: 700px; margin: 0 auto; box-shadow: 0 12px 32px rgba(0,0,0,0.5); text-align: left; color: #f1f5f9;">'
);

// 3) Review title text color from dark to light
html = html.replace(
    '<h3 style="font-size: 1.2rem; font-weight: 700; color: var(--dark); text-align: center; margin-bottom: 20px;">',
    '<h3 style="font-size: 1.2rem; font-weight: 800; color: #f1f5f9; text-align: center; margin-bottom: 20px;">'
);

// 4) Inject Competency Calculation Logic right before app.innerHTML in renderResult
const renderResultLogicAnchor = '            app.innerHTML = `\r\n                <div class="result-screen">';

const logicCode = `            // CALCULATE DIFFICULTY ACCURACY BREAKDOWN
            setTimeout(() => {
                const diffStats = {
                    'Nhận biết': { total: 0, correct: 0, color: '#4ade80' },
                    'Thông hiểu': { total: 0, correct: 0, color: '#38bdf8' },
                    'Vận dụng': { total: 0, correct: 0, color: '#facc15' },
                    'Vận dụng cao': { total: 0, correct: 0, color: '#f87171' }
                };

                filteredQuestions.forEach((q, idx) => {
                    const diff = q.difficulty || 'Nhận biết';
                    if (!diffStats[diff]) diffStats[diff] = { total: 0, correct: 0, color: '#38bdf8' };
                    diffStats[diff].total++;
                    if (answers[idx] === q.correct) {
                        diffStats[diff].correct++;
                    }
                });

                const barsContainer = document.getElementById('analytics-bars-container');
                const aiBox = document.getElementById('analytics-ai-recommendation');

                if (barsContainer) {
                    let htmlBars = '';
                    let weakestDiff = null;
                    let lowestAcc = 101;

                    Object.keys(diffStats).forEach(key => {
                        const stat = diffStats[key];
                        if (stat.total > 0) {
                            const acc = Math.round((stat.correct / stat.total) * 100);
                            if (acc < lowestAcc) {
                                lowestAcc = acc;
                                weakestDiff = key;
                            }
                            htmlBars += \`
                                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 10px 14px;">
                                    <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:800; margin-bottom:6px; color:\${stat.color};">
                                        <span>\${key}</span>
                                        <span>\${stat.correct}/\${stat.total} (\${acc}%)</span>
                                    </div>
                                    <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;">
                                        <div style="width: \${acc}%; height: 100%; background: \${stat.color}; border-radius: 10px; transition: width 0.6s ease;"></div>
                                    </div>
                                </div>
                            \`;
                        }
                    });
                    barsContainer.innerHTML = htmlBars || '<p style="color:#94a3b8; font-size:0.85rem;">Chưa đủ dữ liệu phân tích.</p>';

                    if (aiBox) {
                        const overallAcc = Math.round((score / totalQuestions) * 100);
                        if (overallAcc >= 90) {
                            aiBox.innerHTML = \`🤖 <strong>Đánh giá AI:</strong> Xuất sắc! Bé đã làm chủ hoàn toàn kiến thức môn này (\${overallAcc}%). Hãy thử sức với bài thi nâng cao!\`;
                        } else if (weakestDiff) {
                            aiBox.innerHTML = \`🤖 <strong>Gợi ý từ AI:</strong> Bé làm tốt ở các câu cơ bản, nhưng cần rèn luyện thêm ở dạng bài <strong>"\${weakestDiff}"</strong> (đạt \${lowestAcc}%). Nhấn nút "Luyện tập lại" để nâng cao điểm số nhé!\`;
                        }
                    }
                }
            }, 50);\n\n`;

if (html.includes(renderResultLogicAnchor)) {
    html = html.replace(renderResultLogicAnchor, logicCode + renderResultLogicAnchor);
    console.log('✅ Competency calculation logic injected into renderResult');
} else {
    // Try normalized newline
    const altAnchor = 'app.innerHTML = `\n                <div class="result-screen">';
    if (html.includes(altAnchor)) {
        html = html.replace(altAnchor, logicCode + altAnchor);
        console.log('✅ Competency calculation logic injected via altAnchor');
    } else {
        console.log('⚠️ renderResult logic anchor not found');
    }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 Result analytics patch complete! File size:', origLen, '->', html.length);
