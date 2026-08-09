const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origLength = html.length;

// ============================================================
// 1) ADD TTS SPEAKER + SCRATCHPAD BUTTONS TO QUIZ INTERFACE
// ============================================================

const qTextOld = `<div class="question-text">\${question.question}</div>`;
const qTextNew = `
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
                        <span style="font-size:0.75rem; font-weight:800; background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3); padding:4px 12px; border-radius:20px; letter-spacing:0.5px;">
                            \${isPrimaryQuizMode ? \`MÔN \${String(selectedPrimarySubject).toUpperCase()} • LỚP \${selectedPrimaryLevel}\` : 'CÂU HỎI TRẮC NGHIỆM'}
                        </span>
                        <div style="display:flex; gap:8px;">
                            <button onclick="speakCurrentQuestion()" style="background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; padding:5px 12px; border-radius:14px; font-weight:700; font-size:0.78rem; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.2s;" onmouseover="this.style.background='rgba(56,189,248,0.25)'" onmouseout="this.style.background='rgba(56,189,248,0.12)'">
                                <i class="fas fa-volume-high"></i> <span>Đọc đề bài</span>
                            </button>
                            <button onclick="openScratchpadModal()" style="background:rgba(168,85,247,0.12); border:1px solid rgba(168,85,247,0.3); color:#c084fc; padding:5px 12px; border-radius:14px; font-weight:700; font-size:0.78rem; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.2s;" onmouseover="this.style.background='rgba(168,85,247,0.25)'" onmouseout="this.style.background='rgba(168,85,247,0.12)'">
                                <i class="fas fa-pen-ruler"></i> <span>Bảng nháp</span>
                            </button>
                        </div>
                    </div>
                    <div class="question-text" id="active-question-text">\${question.question}</div>`;

if (html.includes(qTextOld)) {
    html = html.replace(qTextOld, qTextNew);
    console.log('✅ Quiz question header buttons added (TTS + Scratchpad)');
} else {
    console.log('⚠️ Question text target marker not found');
}

// ============================================================
// 2) ADD SPEAK CURRENT QUESTION FUNCTION
// ============================================================
const ttsFunctionCode = `
        // AI Text-to-Speech Reader for Quiz
        function speakCurrentQuestion() {
            if (!filteredQuestions || !filteredQuestions[currentQuestionIndex]) return;
            const q = filteredQuestions[currentQuestionIndex];
            const textToRead = q.question;
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(textToRead);
                const isEnglish = (typeof selectedPrimarySubject !== 'undefined' && selectedPrimarySubject === 'english') || /[a-zA-Z]{5,}/.test(textToRead) && !/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(textToRead);
                utterance.lang = isEnglish ? 'en-US' : 'vi-VN';
                utterance.rate = 0.95;
                window.speechSynthesis.speak(utterance);
                showPrimaryToast(isEnglish ? "🔊 Reading English Question..." : "🔊 Đang đọc đề bài bằng AI...", true);
            } else {
                showPrimaryToast("⚠️ Trình duyệt không hỗ trợ phát âm tự động.", false);
            }
        }
`;

if (!html.includes('function speakCurrentQuestion')) {
    html = html.replace('function speakEnglishWord(word) {', ttsFunctionCode + '\n        function speakEnglishWord(word) {');
    console.log('✅ speakCurrentQuestion function injected');
}

// ============================================================
// 3) ADD SCRATCHPAD DIGITAL CANVAS MODAL
// ============================================================
const scratchpadHTML = `
    <!-- DIGITAL SCRATCHPAD & FORMULA CHEAT SHEET MODAL -->
    <div id="scratchpad-modal" style="display:none; position:fixed; inset:0; z-index:999999; background:rgba(8,15,35,0.92); backdrop-filter:blur(20px); align-items:center; justify-content:center; padding:15px;">
        <div style="background:rgba(13,21,44,0.98); border:1.5px solid rgba(56,189,248,0.3); border-radius:28px; width:100%; max-width:850px; height:88vh; max-height:750px; display:flex; flex-direction:column; box-shadow:0 25px 60px rgba(0,0,0,0.8); overflow:hidden; animation:fadeInUp 0.3s ease;">
            <!-- Modal Header -->
            <div style="padding:18px 24px; background:rgba(15,23,42,0.9); border-bottom:1.5px solid rgba(56,189,248,0.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:1.8rem;">🎨</span>
                    <div>
                        <h3 style="margin:0; font-size:1.2rem; font-weight:800; color:#f1f5f9;">Bảng Nháp Vẽ Tay & Kho Công Thức</h3>
                        <p style="margin:0; font-size:0.78rem; color:#94a3b8;">Vẽ nháp tính toán trực tiếp bằng ngón tay hoặc chuột trên màn hình</p>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="display:flex; background:rgba(255,255,255,0.06); border-radius:14px; padding:3px;">
                        <button id="sp-tab-draw" onclick="switchScratchpadTab('draw')" style="background:#38bdf8; color:#0f172a; border:none; padding:6px 14px; border-radius:11px; font-weight:800; font-size:0.8rem; cursor:pointer;">🎨 Vẽ Nháp</button>
                        <button id="sp-tab-formulas" onclick="switchScratchpadTab('formulas')" style="background:transparent; color:#cbd5e1; border:none; padding:6px 14px; border-radius:11px; font-weight:800; font-size:0.8rem; cursor:pointer;">📐 Công Thức</button>
                    </div>
                    <button onclick="closeScratchpadModal()" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#ef4444; width:36px; height:36px; border-radius:50%; font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>
                </div>
            </div>

            <!-- Tab 1: Draw Canvas -->
            <div id="sp-content-draw" style="flex:1; display:flex; flex-direction:column; position:relative; background:#0a0f24; overflow:hidden;">
                <!-- Canvas Toolbar -->
                <div style="padding:10px 18px; background:rgba(15,23,42,0.8); border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                        <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Màu nét:</span>
                        <button onclick="setScratchpadColor('#00f2fe')" style="width:26px; height:26px; border-radius:50%; background:#00f2fe; border:2px solid white; cursor:pointer;"></button>
                        <button onclick="setScratchpadColor('#facc15')" style="width:26px; height:26px; border-radius:50%; background:#facc15; border:2px solid transparent; cursor:pointer;"></button>
                        <button onclick="setScratchpadColor('#4ade80')" style="width:26px; height:26px; border-radius:50%; background:#4ade80; border:2px solid transparent; cursor:pointer;"></button>
                        <button onclick="setScratchpadColor('#ef4444')" style="width:26px; height:26px; border-radius:50%; background:#ef4444; border:2px solid transparent; cursor:pointer;"></button>
                        <button onclick="setScratchpadColor('#ffffff')" style="width:26px; height:26px; border-radius:50%; background:#ffffff; border:2px solid transparent; cursor:pointer;"></button>
                        <button onclick="setScratchpadColor('#0a0f24', true)" style="background:rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.2); padding:3px 10px; border-radius:10px; font-weight:700; font-size:0.75rem; cursor:pointer;">🧹 Tẩy</button>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:0.75rem; color:#94a3b8; font-weight:700;">Nét:</span>
                        <input type="range" id="sp-line-width" min="2" max="14" value="4" oninput="spLineWidth=this.value" style="width:70px;">
                        <button onclick="clearScratchpadCanvas()" style="background:rgba(239,68,68,0.2); border:1px solid #f87171; color:#fca5a5; padding:5px 12px; border-radius:12px; font-weight:800; font-size:0.75rem; cursor:pointer;">🗑️ Xóa Tất Cả</button>
                    </div>
                </div>
                <!-- Canvas Area -->
                <div style="flex:1; position:relative; width:100%; height:100%; cursor:crosshair;">
                    <canvas id="scratchpad-canvas" style="width:100%; height:100%; display:block; touch-action:none;"></canvas>
                </div>
            </div>

            <!-- Tab 2: Formulas Cheat Sheet -->
            <div id="sp-content-formulas" style="flex:1; display:none; padding:20px; overflow-y:auto; background:rgba(10,15,36,0.95); color:#f1f5f9;">
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px;">
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(56,189,248,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#38bdf8; font-weight:800; font-size:0.95rem;">🧮 Hằng Đẳng Thức Đáng Nhớ</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(a + b)² = a² + 2ab + b²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(a - b)² = a² - 2ab + b²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">a² - b² = (a - b)(a + b)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(a + b)³ = a³ + 3a²b + 3ab² + b³</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(168,85,247,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#c084fc; font-weight:800; font-size:0.95rem;">📐 Đạo Hàm Cơ Bản (Lớp 11-12)</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(xⁿ)' = n · xⁿ⁻¹</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(sin x)' = cos x | (cos x)' = -sin x</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(eˣ)' = eˣ | (ln x)' = 1/x</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">(u/v)' = (u'v - uv') / v²</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(245,158,11,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#facc15; font-weight:800; font-size:0.95rem;">⚡ Vật Lý - Điện & Cơ Học</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Định luật Ôm: I = U / R</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Công suất điện: P = U · I = I²R</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Động năng: Wđ = ½ m v²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Thế năng: Wt = m g h</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(34,197,94,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#4ade80; font-weight:800; font-size:0.95rem;">🧪 Hóa Học - Công Thức Tính</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Số mol: n = m / M = V / 22.4</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Nồng độ M: C_M = n / V (lít)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Nồng độ %: C% = (m_ct / m_dd) · 100%</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">Định luật bảo toàn khối lượng</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

if (!html.includes('id="scratchpad-modal"')) {
    html = html.replace('</body>', scratchpadHTML + '\n</body>');
    console.log('✅ Scratchpad modal HTML injected');
}

// ============================================================
// 4) ADD SCRATCHPAD CANVAS JS LOGIC
// ============================================================
const scratchpadJS = `
        // DIGITAL SCRATCHPAD LOGIC
        let spCanvas, spCtx, isSpDrawing = false, spColor = '#00f2fe', spLineWidth = 4, isEraser = false;

        function openScratchpadModal() {
            const modal = document.getElementById('scratchpad-modal');
            if (!modal) return;
            modal.style.display = 'flex';
            setTimeout(() => {
                initScratchpadCanvas();
            }, 100);
        }

        function closeScratchpadModal() {
            const modal = document.getElementById('scratchpad-modal');
            if (modal) modal.style.display = 'none';
        }

        function switchScratchpadTab(tab) {
            const drawBtn = document.getElementById('sp-tab-draw');
            const formBtn = document.getElementById('sp-tab-formulas');
            const drawContent = document.getElementById('sp-content-draw');
            const formContent = document.getElementById('sp-content-formulas');

            if (tab === 'draw') {
                drawBtn.style.background = '#38bdf8'; drawBtn.style.color = '#0f172a';
                formBtn.style.background = 'transparent'; formBtn.style.color = '#cbd5e1';
                drawContent.style.display = 'flex';
                formContent.style.display = 'none';
                initScratchpadCanvas();
            } else {
                formBtn.style.background = '#38bdf8'; formBtn.style.color = '#0f172a';
                drawBtn.style.background = 'transparent'; drawBtn.style.color = '#cbd5e1';
                formContent.style.display = 'block';
                drawContent.style.display = 'none';
            }
        }

        function initScratchpadCanvas() {
            spCanvas = document.getElementById('scratchpad-canvas');
            if (!spCanvas) return;
            const container = spCanvas.parentElement;
            spCanvas.width = container.clientWidth;
            spCanvas.height = container.clientHeight;
            spCtx = spCanvas.getContext('2d');
            spCtx.lineCap = 'round';
            spCtx.lineJoin = 'round';

            spCanvas.onmousedown = startDrawing;
            spCanvas.onmousemove = draw;
            spCanvas.onmouseup = stopDrawing;
            spCanvas.onmouseleave = stopDrawing;

            spCanvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = spCanvas.getBoundingClientRect();
                startDrawing({ clientX: touch.clientX, clientY: touch.clientY, rect });
            }, { passive: false });

            spCanvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = spCanvas.getBoundingClientRect();
                draw({ clientX: touch.clientX, clientY: touch.clientY, rect });
            }, { passive: false });

            spCanvas.addEventListener('touchend', stopDrawing);
        }

        function setScratchpadColor(color, eraser = false) {
            spColor = color;
            isEraser = eraser;
        }

        function clearScratchpadCanvas() {
            if (spCtx && spCanvas) {
                spCtx.clearRect(0, 0, spCanvas.width, spCanvas.height);
            }
        }

        function getPos(e) {
            const rect = e.rect || spCanvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        function startDrawing(e) {
            isSpDrawing = true;
            const pos = getPos(e);
            spCtx.beginPath();
            spCtx.moveTo(pos.x, pos.y);
        }

        function draw(e) {
            if (!isSpDrawing) return;
            const pos = getPos(e);
            spCtx.strokeStyle = isEraser ? '#0a0f24' : spColor;
            spCtx.lineWidth = isEraser ? spLineWidth * 4 : spLineWidth;
            spCtx.lineTo(pos.x, pos.y);
            spCtx.stroke();
        }

        function stopDrawing() {
            isSpDrawing = false;
        }
`;

if (!html.includes('function openScratchpadModal()')) {
    html = html.replace('</script>', scratchpadJS + '\n</script>');
    console.log('✅ Scratchpad JS logic injected');
}

// ============================================================
// 5) ADD MOBILE GLASSMORPHISM BOTTOM NAVIGATION BAR
// ============================================================
const mobileNavHTML = `
    <!-- MOBILE GLASSMORPHISM BOTTOM DOCK NAVBAR -->
    <div id="mobile-bottom-nav">
        <button onclick="navigateTo('PRIMARY_GRADE_SELECT')" class="mob-nav-item">
            <i class="fas fa-graduation-cap"></i>
            <span>Chọn Lớp</span>
        </button>
        <button onclick="if(typeof selectedPrimaryLevel !== 'undefined' && selectedPrimaryLevel) navigateTo('PRIMARY_CLASS'); else navigateTo('PRIMARY_GRADE_SELECT');" class="mob-nav-item">
            <i class="fas fa-book-open"></i>
            <span>Môn Học</span>
        </button>
        <button onclick="openGlobalWrongNotebook()" class="mob-nav-item">
            <i class="fas fa-book-bookmark"></i>
            <span>Câu Sai</span>
        </button>
        <button onclick="openLeaderboardModal()" class="mob-nav-item">
            <i class="fas fa-trophy"></i>
            <span>Bảng Vàng</span>
        </button>
        <button onclick="openScratchpadModal()" class="mob-nav-item">
            <i class="fas fa-pen-ruler"></i>
            <span>Vẽ Nháp</span>
        </button>
    </div>
`;

const mobileNavCSS = `
        /* MOBILE BOTTOM DOCK NAVBAR STYLING */
        #mobile-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9998;
            background: rgba(10, 18, 38, 0.94);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1.5px solid rgba(56, 189, 248, 0.25);
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
            box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.6);
        }
        @media (min-width: 769px) {
            #mobile-bottom-nav {
                display: none !important;
            }
        }
        .mob-nav-item {
            background: transparent;
            border: none;
            color: #94a3b8;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            font-size: 0.72rem;
            font-weight: 700;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 14px;
            transition: all 0.25s ease;
        }
        .mob-nav-item i {
            font-size: 1.25rem;
            transition: transform 0.2s ease;
        }
        .mob-nav-item:active, .mob-nav-item.active {
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
        }
        .mob-nav-item:active i {
            transform: scale(1.2);
        }
`;

if (!html.includes('id="mobile-bottom-nav"')) {
    html = html.replace('</body>', mobileNavHTML + '\n</body>');
    const styleClose = html.lastIndexOf('</style>');
    if (styleClose !== -1) {
        html = html.substring(0, styleClose) + mobileNavCSS + '\n' + html.substring(styleClose);
    }
    console.log('✅ Mobile Bottom Dock Navigation Bar injected');
}

// Global Wrong Notebook opener helper
if (!html.includes('function openGlobalWrongNotebook()')) {
    const wrongNotebookHelper = `
        function openGlobalWrongNotebook() {
            const lvl = (typeof selectedPrimaryLevel !== 'undefined' && selectedPrimaryLevel) ? selectedPrimaryLevel : '12';
            const wrongCount = primaryWrongHistory.filter(h => String(h.grade || '1') === String(lvl)).length;
            showPrimaryToast(\`📖 Sổ tay Lớp \${lvl} hiện có \${wrongCount} câu sai cần luyện tập.\`, wrongCount === 0);
            if (typeof selectedPrimaryLevel !== 'undefined' && selectedPrimaryLevel) {
                navigateTo('PRIMARY_CLASS');
            } else {
                navigateTo('PRIMARY_GRADE_SELECT');
            }
        }
    `;
    html = html.replace('</script>', wrongNotebookHelper + '\n</script>');
    console.log('✅ openGlobalWrongNotebook helper injected');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n🎉 All advanced interactive features successfully added! Size:', origLength, '->', html.length);
