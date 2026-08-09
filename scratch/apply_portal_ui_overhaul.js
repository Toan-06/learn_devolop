const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldRenderPrimaryGradeSelect = `        // 3. Primary & High School Grade Selection (PRIMARY_GRADE_SELECT)
        function renderPrimaryGradeSelect() {
            const app = document.getElementById('app');
            app.innerHTML = \`
                <div class="dashboard-container" style="animation: fadeInUp 0.4s ease; padding: 10px 5px;">
                    <div class="back-btn-container" style="margin-bottom: 25px;">
                        <button class="back-btn" onclick="navigateTo('MAIN_HOME')" style="background: rgba(15, 23, 42, 0.8); border: 1.5px solid rgba(0, 242, 254, 0.3); color: #38bdf8; padding: 8px 20px; border-radius: 20px; font-weight: 700; cursor: pointer; backdrop-filter: blur(10px); transition: all 0.3s;" onmouseover="this.style.borderColor='#00f2fe'; this.style.boxShadow='0 0 15px rgba(0,242,254,0.3)';" onmouseout="this.style.borderColor='rgba(0, 242, 254, 0.3)'; this.style.boxShadow='none';">
                            <i class="fas fa-arrow-left"></i> Quay lại cổng chính
                        </button>
                    </div>
                    <h2 class="dashboard-title" style="font-size: 2.3rem; font-weight: 900; text-align: center; margin-bottom: 14px; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;">
                        <span style="font-size: 2.7rem; display: inline-block; animation: floatIcon 3s ease-in-out infinite; -webkit-text-fill-color: initial; line-height: 1;">🎒</span>
                        <span style="background: linear-gradient(135deg, #00f2fe 0%, #38bdf8 50%, #818cf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 4px 20px rgba(0, 242, 254, 0.4));">Cổng Học Tập Lớp 1 - 12</span>
                    </h2>
                    <p class="dashboard-subtitle" style="text-align: center; color: #cbd5e1; font-size: 1.05rem; margin-bottom: 36px; font-weight: 600;">Hãy chọn lớp học để khám phá các bài ôn luyện và trò chơi học tập tương tác thú vị nhé!</p>
                    <div class="license-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
                        \${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => {
                            let icon = '';
                            let topBarGradient = '';
                            let borderColor = '';
                            let badgeBg = '';
                            let badgeColor = '';
                            let btnBg = '';
                            let btnShadow = '';

                            if (grade <= 5) {
                                const icons = ['🦁', '🦊', '🐼', '🐨', '🦄'];
                                icon = icons[(grade - 1) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #f472b6, #ec4899)';
                                borderColor = 'rgba(244, 114, 182, 0.35)';
                                badgeBg = 'rgba(244, 114, 182, 0.15)';
                                badgeColor = '#f472b6';
                                btnBg = 'linear-gradient(135deg, #db2777 0%, #be185d 100%)';
                                btnShadow = 'rgba(219, 39, 119, 0.35)';
                            } else if (grade <= 9) {
                                const icons = ['🦉', '🦅', '🦁', '🦖'];
                                icon = icons[(grade - 6) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
                                borderColor = 'rgba(251, 191, 36, 0.35)';
                                badgeBg = 'rgba(251, 191, 36, 0.15)';
                                badgeColor = '#fbbf24';
                                btnBg = 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';
                                btnShadow = 'rgba(217, 119, 6, 0.35)';
                            } else {
                                const icons = ['🧠', '🚀', '🎓'];
                                icon = icons[(grade - 10) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #38bdf8, #3b82f6)';
                                borderColor = 'rgba(56, 189, 248, 0.35)';
                                badgeBg = 'rgba(56, 189, 248, 0.15)';
                                badgeColor = '#38bdf8';
                                btnBg = 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)';
                                btnShadow = 'rgba(2, 132, 199, 0.35)';
                            }
                            
                            let gradeText = grade <= 5 ? 'TIỂU HỌC' : (grade <= 9 ? 'THCS' : 'THPT');
                            let subText = grade <= 5 ? 'Toán, Tiếng Việt, Tiếng Anh' : (grade <= 9 ? 'Toán, Văn, Anh, KHTN, Sử Địa' : 'Toán, Lý, Hóa, Sinh, Anh, Văn...');

                            return \`
                                <div class="license-card" onclick="selectPrimaryLevel('\${grade}')" style="background: rgba(13, 21, 44, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 26px; border: 1.5px solid \${borderColor}; padding: 28px 20px; text-align: center; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4);" onmouseover="this.style.transform='translateY(-6px)'; this.style.boxShadow='0 15px 35px \${btnShadow}';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.4)';">
                                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: \${topBarGradient};"></div>
                                    <span class="license-badge active" style="background: \${badgeBg}; border: 1px solid \${borderColor}; color: \${badgeColor}; font-weight: 800; font-size: 0.75rem; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px;">\${gradeText}</span>
                                    <div class="license-icon" style="font-size: 3.6rem; margin: 16px 0 10px 0; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));">\${icon}</div>
                                    <div class="license-card-body" style="padding: 0;">
                                        <div class="license-name" style="font-size: 1.55rem; font-weight: 900; color: #f8fafc; margin-bottom: 6px;">Lớp \${grade}</div>
                                        <div class="license-desc" style="font-size: 0.88rem; color: #94a3b8; margin-bottom: 22px; line-height: 1.5; font-weight: 500;">\${subText}</div>
                                        <button class="btn btn-primary" style="background: \${btnBg}; border: none; border-radius: 18px; color: #ffffff; font-weight: 800; font-size: 0.92rem; width: 100%; padding: 11px 0; box-shadow: 0 4px 15px \${btnShadow}; transition: all 0.25s; pointer-events: none;">Vào Học</button>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                </div>
            \`;
        }`;

const newRenderPrimaryGradeSelect = `        // 3. Primary & High School Grade Selection (PRIMARY_GRADE_SELECT) - HIGH-END CYBER GLASSMORPHISM DESIGN
        function renderPrimaryGradeSelect() {
            const app = document.getElementById('app');
            app.innerHTML = \`
                <div class="dashboard-container" style="animation: fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1); padding: 15px 10px; max-width: 1240px; margin: 0 auto;">
                    <!-- Top Navigation Header -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; flex-wrap: wrap; gap: 14px;">
                        <button class="back-btn" onclick="navigateTo('MAIN_HOME')" style="background: rgba(13,22,48,0.85); border: 1.5px solid rgba(0, 242, 254, 0.35); color: #38bdf8; padding: 10px 22px; border-radius: 22px; font-weight: 800; font-size:0.9rem; cursor: pointer; backdrop-filter: blur(14px); transition: all 0.3s; box-shadow:0 4px 15px rgba(0,0,0,0.3);" onmouseover="this.style.borderColor='#00f2fe'; this.style.boxShadow='0 0 20px rgba(0,242,254,0.4)';" onmouseout="this.style.borderColor='rgba(0, 242, 254, 0.35)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.3)';">
                            <i class="fas fa-arrow-left"></i> Quay lại cổng chính
                        </button>

                        <div style="display:flex; align-items:center; gap:10px;">
                            <span style="background:rgba(0,242,254,0.1); border:1px solid rgba(0,242,254,0.3); color:#00f2fe; padding:8px 16px; border-radius:20px; font-weight:800; font-size:0.82rem; display:flex; align-items:center; gap:6px;">
                                <span>⚡ Hệ Thống 31,000+ Câu Hỏi BGD 2018</span>
                            </span>
                        </div>
                    </div>

                    <!-- HERO HEADLINE BANNER -->
                    <div style="background: linear-gradient(135deg, rgba(15,25,55,0.95) 0%, rgba(6,12,30,0.98) 100%); border: 1.5px solid rgba(0,242,254,0.3); border-radius: 32px; padding: 35px 30px; margin-bottom: 30px; text-align: center; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(0,242,254,0.1);">
                        <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 400px; height: 120px; background: rgba(0,242,254,0.12); filter: blur(50px); pointer-events: none;"></div>
                        <h2 style="font-size: 2.5rem; font-weight: 900; margin: 0 0 12px 0; letter-spacing: -0.5px; display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;">
                            <span style="font-size: 2.8rem; animation: floatIcon 3s ease-in-out infinite;">🎓</span>
                            <span style="background: linear-gradient(135deg, #00f2fe 0%, #38bdf8 40%, #c084fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 4px 20px rgba(0, 242, 254, 0.4));">Cổng Học Tập & Kho Bài Giải Mẫu Lớp 1 - 12</span>
                        </h2>
                        <p style="color: #cbd5e1; font-size: 1.05rem; margin: 0 0 24px 0; font-weight: 600; max-width: 800px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                            Khám phá ngân hàng 31,000+ câu hỏi luyện thi chuẩn BGD, 600+ bài giải mẫu chi tiết từng bước & bài văn phân tích đạt điểm 9.5+
                        </p>

                        <!-- STATS ROW -->
                        <div style="display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 15px;">
                            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(56,189,248,0.25); border-radius: 18px; padding: 10px 20px; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">📚</span>
                                <div style="text-align: left;">
                                    <div style="font-weight: 900; color: #38bdf8; font-size: 1.05rem;">31,000+</div>
                                    <div style="font-size: 0.76rem; color: #94a3b8; font-weight: 700;">Câu Hỏi Chuẩn Khối 1-12</div>
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(168,85,247,0.25); border-radius: 18px; padding: 10px 20px; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">📖</span>
                                <div style="text-align: left;">
                                    <div style="font-weight: 900; color: #c084fc; font-size: 1.05rem;">600+ Bài Mẫu</div>
                                    <div style="font-size: 0.76rem; color: #94a3b8; font-weight: 700;">Giải Chi Tiết 100% Các Môn</div>
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(34,197,94,0.25); border-radius: 18px; padding: 10px 20px; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">🎯</span>
                                <div style="text-align: left;">
                                    <div style="font-weight: 900; color: #4ade80; font-size: 1.05rem;">AI Analytics</div>
                                    <div style="font-size: 0.76rem; color: #94a3b8; font-weight: 700;">Đánh Giá Năng Lực Thời Gian Thực</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- GRADE CARDS GRID -->
                    <div class="license-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 24px; margin: 0 auto;">
                        \${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => {
                            let icon = '';
                            let topBarGradient = '';
                            let borderColor = '';
                            let badgeBg = '';
                            let badgeColor = '';
                            let btnBg = '';
                            let btnShadow = '';
                            let glowRgb = '';

                            if (grade <= 5) {
                                const icons = ['🦁', '🦊', '🐼', '🐨', '🦄'];
                                icon = icons[(grade - 1) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #f472b6, #ec4899)';
                                borderColor = 'rgba(244, 114, 182, 0.4)';
                                badgeBg = 'rgba(244, 114, 182, 0.18)';
                                badgeColor = '#f472b6';
                                btnBg = 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)';
                                btnShadow = 'rgba(236, 72, 153, 0.35)';
                                glowRgb = '244, 114, 182';
                            } else if (grade <= 9) {
                                const icons = ['🦉', '🦅', '🦁', '🦖'];
                                icon = icons[(grade - 6) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #fbbf24, #f59e0b)';
                                borderColor = 'rgba(251, 191, 36, 0.4)';
                                badgeBg = 'rgba(251, 191, 36, 0.18)';
                                badgeColor = '#fbbf24';
                                btnBg = 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)';
                                btnShadow = 'rgba(245, 158, 11, 0.35)';
                                glowRgb = '251, 191, 36';
                            } else {
                                const icons = ['🧠', '🚀', '🎓'];
                                icon = icons[(grade - 10) % icons.length];
                                topBarGradient = 'linear-gradient(90deg, #00f2fe, #3b82f6)';
                                borderColor = 'rgba(0, 242, 254, 0.4)';
                                badgeBg = 'rgba(0, 242, 254, 0.18)';
                                badgeColor = '#00f2fe';
                                btnBg = 'linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%)';
                                btnShadow = 'rgba(0, 242, 254, 0.35)';
                                glowRgb = '0, 242, 254';
                            }
                            
                            let gradeText = grade <= 5 ? 'TIỂU HỌC' : (grade <= 9 ? 'THCS' : 'THPT');
                            let subText = grade <= 5 ? 'Toán, Tiếng Việt, Tiếng Anh' : (grade <= 9 ? 'Toán, Văn, Anh, KHTN, Sử Địa' : 'Toán, Lý, Hóa, Sinh, Anh, Văn...');

                            return \`
                                <div class="license-card" style="background: rgba(13, 21, 44, 0.9); backdrop-filter: blur(20px); border-radius: 28px; border: 1.5px solid \${borderColor}; padding: 26px 20px; text-align: center; cursor: pointer; transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.5);"
                                  onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.borderColor='rgba(\${glowRgb},0.7)'; this.style.boxShadow='0 20px 45px rgba(0,0,0,0.6), 0 0 25px rgba(\${glowRgb},0.25)';"
                                  onmouseout="this.style.transform='none'; this.style.borderColor='\${borderColor}'; this.style.boxShadow='0 12px 35px rgba(0,0,0,0.5)';">
                                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 5px; background: \${topBarGradient};"></div>
                                    
                                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
                                        <span style="background: \${badgeBg}; border: 1px solid \${borderColor}; color: \${badgeColor}; font-weight: 800; font-size: 0.74rem; padding: 4px 12px; border-radius: 18px; letter-spacing: 0.5px;">\${gradeText}</span>
                                        <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">50+ Bài Mẫu</span>
                                    </div>

                                    <div class="license-icon" style="font-size: 3.8rem; margin: 10px 0 10px 0; filter: drop-shadow(0 6px 15px rgba(0,0,0,0.4)); transform: translateZ(0); transition: transform 0.3s ease;">\${icon}</div>
                                    
                                    <div class="license-card-body" style="padding: 0;">
                                        <div class="license-name" style="font-size: 1.6rem; font-weight: 900; color: #f8fafc; margin-bottom: 6px;">Lớp \${grade}</div>
                                        <div class="license-desc" style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px; line-height: 1.5; font-weight: 500;">\${subText}</div>
                                        
                                        <div style="display:flex; flex-direction:column; gap:8px;">
                                            <button onclick="selectPrimaryLevel('\${grade}')" style="background: \${btnBg}; border: none; border-radius: 18px; color: \${grade > 9 ? '#050c23' : '#ffffff'}; font-weight: 900; font-size: 0.92rem; width: 100%; padding: 11px 0; box-shadow: 0 4px 15px \${btnShadow}; cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                                                🚀 Vào Học Lớp \${grade}
                                            </button>
                                            <button onclick="openSampleLibraryModal(\${grade})" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); border-radius: 18px; color: #cbd5e1; font-weight: 800; font-size: 0.82rem; width: 100%; padding: 8px 0; cursor:pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,242,254,0.15)'; this.style.color='#00f2fe'; this.style.borderColor='rgba(0,242,254,0.4)';" onmouseout="this.style.background='rgba(255,255,255,0.06)'; this.style.color='#cbd5e1'; this.style.borderColor='rgba(255,255,255,0.15)';">
                                                📚 Kho Bài Mẫu Lớp \${grade} →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            \`;
                        }).join('')}
                    </div>
                </div>
            \`;
        }`;

if (html.includes(oldRenderPrimaryGradeSelect)) {
    html = html.replace(oldRenderPrimaryGradeSelect, newRenderPrimaryGradeSelect);
    console.log('✅ Replaced renderPrimaryGradeSelect with Cyber Glassmorphic design!');
} else {
    // Normalized check
    const normOld = oldRenderPrimaryGradeSelect.replace(/\r\n/g, '\n');
    const normHtml = html.replace(/\r\n/g, '\n');
    if (normHtml.includes(normOld)) {
        html = normHtml.replace(normOld, newRenderPrimaryGradeSelect);
        console.log('✅ Replaced renderPrimaryGradeSelect via normalized match!');
    } else {
        console.log('⚠️ Could not match oldRenderPrimaryGradeSelect');
    }
}

fs.writeFileSync('index.html', html, 'utf8');
