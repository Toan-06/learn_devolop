// ===== SAMPLE EXERCISES VIEWER SYSTEM (MOBILE OPTIMIZED DARK CYBER THEME) =====
// Loads the correct grade data and renders a responsive searchable exercise library modal

function getSamplesForGrade(lvl) {
  const g = parseInt(lvl) || 6;
  if (g === 6)  return window.SAMPLES_GRADE_6  || { math: [], literature: [], english: [], science: [], social: [] };
  if (g === 7)  return window.SAMPLES_GRADE_7  || { math: [], literature: [], english: [], science: [], social: [] };
  if (g === 8)  return window.SAMPLES_GRADE_8  || { math: [], literature: [], english: [], science: [], social: [] };
  if (g === 9)  return window.SAMPLES_GRADE_9  || { math: [], literature: [], english: [], science: [], social: [] };
  if (g === 10) return window.SAMPLES_GRADE_10 || { math: [], literature: [], english: [], science: [], social: [] };
  if (g === 11) return window.SAMPLES_GRADE_11 || { math: [], literature: [], english: [], science: [], social: [] };
  if (g >= 12)  return window.SAMPLES_GRADE_12 || { math: [], literature: [], english: [], science: [], social: [] };
  return { math: [], literature: [], english: [], science: [], social: [] };
}

function openSampleLibraryModal(gradeOverride) {
  const lvl = gradeOverride || (typeof selectedPrimaryLevel !== 'undefined' ? selectedPrimaryLevel : 6);
  const data = getSamplesForGrade(lvl);
  
  // Combine all items
  const math = data.math || [];
  const lit = data.literature || [];
  const eng = data.english || [];
  const sci = data.science || [];
  const soc = data.social || [];
  const all = [...math, ...lit, ...eng, ...sci, ...soc];

  const existingModal = document.getElementById('sample-library-modal');
  if (existingModal) existingModal.remove();

  const isMobile = window.innerWidth <= 768;

  const modalHTML = `
  <div id="sample-library-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.92);backdrop-filter:blur(16px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:${isMobile ? '6px' : '16px'};animation:fadeIn .25s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.99) 0%, rgba(6,12,30,1) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:${isMobile ? '18px' : '28px'};max-width:960px;width:100%;height:${isMobile ? '98vh' : '92vh'};display:flex;flex-direction:column;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.95), 0 0 40px rgba(0,242,254,0.12);animation:scaleUp .25s ease;">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(124,58,237,0.25) 100%);padding:${isMobile ? '16px 14px' : '24px 28px'};border-bottom:1px solid rgba(0,242,254,0.2);flex-shrink:0;position:relative;">
        <button onclick="document.getElementById('sample-library-modal').remove()" style="position:absolute;top:${isMobile ? '12px' : '18px'};right:${isMobile ? '12px' : '20px'};background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);width:40px;height:40px;border-radius:50%;color:#00f2fe;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;touch-action:manipulation;">✕</button>
        <div style="color:#00f2fe;font-weight:800;font-size:${isMobile ? '.72rem' : '.8rem'};letter-spacing:0.5px;margin-bottom:4px;padding-right:40px;">
          <span>📚 THƯ VIỆN BÀI GIẢI MẪU CHI TIẾT TẤT CẢ MÔN HỌC</span>
        </div>
        <h2 style="color:#f8fafc;margin:0;font-size:${isMobile ? '1.25rem' : '1.65rem'};font-weight:900;letter-spacing:-0.3px;line-height:1.3;">Lớp ${lvl} — Bài Mẫu Đa Môn (${all.length} Bài)</h2>
        <p style="color:#94a3b8;margin:6px 0 0;font-size:${isMobile ? '.8rem' : '.9rem'};line-height:1.4;">Tự luận Step-by-Step • Ngữ pháp Tiếng Anh • Bài văn THPTQG (2,500 chữ)</p>
      </div>

      <!-- TABS + SEARCH -->
      <div style="background:rgba(10,18,40,0.9);padding:${isMobile ? '10px 12px' : '14px 24px'};border-bottom:1px solid rgba(0,242,254,0.15);flex-shrink:0;display:flex;flex-direction:${isMobile ? 'column' : 'row'};gap:10px;align-items:${isMobile ? 'stretch' : 'center'};">
        
        <!-- HORIZONTAL SCROLLABLE TABS ON MOBILE -->
        <div style="display:flex;gap:8px;overflow-x:auto;white-space:nowrap;padding-bottom:4px;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;">
          <button id="tab-all"  onclick="switchSampleTab('all',${lvl})"  style="padding:8px 16px;border-radius:20px;border:none;font-weight:800;font-size:.8rem;cursor:pointer;background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;box-shadow:0 0 12px rgba(0,242,254,0.3);flex-shrink:0;">Tất cả (${all.length})</button>
          <button id="tab-math" onclick="switchSampleTab('math',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.8rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🧮 Toán (${math.length})</button>
          <button id="tab-lit"  onclick="switchSampleTab('lit',${lvl})"  style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.8rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">✍️ Văn (${lit.length})</button>
          ${eng.length ? `<button id="tab-eng" onclick="switchSampleTab('eng',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.8rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🇬🇧 Anh (${eng.length})</button>` : ''}
          ${sci.length ? `<button id="tab-sci" onclick="switchSampleTab('sci',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.8rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🔬 KHTN (${sci.length})</button>` : ''}
          ${soc.length ? `<button id="tab-soc" onclick="switchSampleTab('soc',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.8rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">📜 KHXH (${soc.length})</button>` : ''}
        </div>

        <input id="sample-search" type="text" placeholder="🔍 Tìm kiếm bài tập..." oninput="filterSamples(${lvl})"
          style="background:rgba(15,25,55,0.9);border:1.5px solid rgba(0,242,254,0.3);border-radius:20px;padding:8px 16px;font-size:.85rem;color:#f8fafc;outline:none;width:${isMobile ? '100%' : '220px'};margin-left:${isMobile ? '0' : 'auto'};" />
      </div>

      <!-- CONTENT LIST -->
      <div id="sample-list" style="overflow-y:auto;padding:${isMobile ? '12px 14px' : '20px 24px'};flex:1;-webkit-overflow-scrolling:touch;">
        ${renderSampleCards(all, '', lvl)}
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  window._sampleData = data;
  window._sampleAll  = all;
  window._sampleTab  = 'all';
}

function renderSampleCards(items, query, lvl) {
  const filtered = query
    ? items.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        (i.tag || '').toLowerCase().includes(query.toLowerCase()) ||
        (i.problem || '').toLowerCase().includes(query.toLowerCase())
      )
    : items;

  if (!filtered.length) {
    return `<div style="text-align:center;padding:40px 16px;color:#94a3b8;">
      <i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:.5;"></i>
      <p style="margin:0;font-size:.9rem;">Không tìm thấy bài giải mẫu phù hợp với từ khóa.</p>
    </div>`;
  }

  const isMobile = window.innerWidth <= 768;

  return filtered.map(item => `
    <div class="sample-card" style="background:rgba(13,22,48,0.88);border-radius:18px;border:1.5px solid rgba(0,242,254,0.2);padding:${isMobile ? '14px 16px' : '20px'};margin-bottom:12px;cursor:pointer;transition:all .25s ease;backdrop-filter:blur(10px);touch-action:manipulation;" onclick="openSingleSample('${item.id}', ${lvl})">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;gap:8px;">
        <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.72rem;padding:3px 10px;border-radius:10px;">${item.tag || 'BÀI MẪU'}</span>
        <span style="color:#00f2fe;font-weight:700;font-size:${isMobile ? '.78rem' : '.85rem'};display:flex;align-items:center;gap:4px;flex-shrink:0;">Xem chi tiết →</span>
      </div>
      <h4 style="font-weight:800;color:#f8fafc;margin:0 0 6px;font-size:${isMobile ? '.98rem' : '1.05rem'};line-height:1.4;">${item.title}</h4>
      <p style="font-size:${isMobile ? '.82rem' : '.88rem'};color:#94a3b8;margin:0;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${(item.problem || '').replace(/<[^>]*>?/gm, '')}</p>
    </div>
  `).join('');
}

function switchSampleTab(tab, lvl) {
  window._sampleTab = tab;
  const data = window._sampleData || getSamplesForGrade(lvl);
  const q = (document.getElementById('sample-search') || {}).value || '';
  
  let items = window._sampleAll;
  if (tab === 'math') items = data.math || [];
  else if (tab === 'lit') items = data.literature || [];
  else if (tab === 'eng') items = data.english || [];
  else if (tab === 'sci') items = data.science || [];
  else if (tab === 'soc') items = data.social || [];

  document.getElementById('sample-list').innerHTML = renderSampleCards(items, q, lvl);

  ['tab-all','tab-math','tab-lit','tab-eng','tab-sci','tab-soc'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.style.background = 'rgba(15,25,55,0.7)';
    btn.style.color = '#94a3b8';
    btn.style.border = '1px solid rgba(0,242,254,0.25)';
    btn.style.boxShadow = 'none';
  });

  const active = document.getElementById('tab-' + tab);
  if (active) {
    active.style.background = 'linear-gradient(135deg,#00f2fe,#3b82f6)';
    active.style.color = '#050c23';
    active.style.border = 'none';
    active.style.boxShadow = '0 0 12px rgba(0,242,254,0.3)';
  }
}

function filterSamples(lvl) {
  const q = document.getElementById('sample-search').value;
  const data = window._sampleData || getSamplesForGrade(lvl);
  const tab  = window._sampleTab || 'all';

  let items = window._sampleAll;
  if (tab === 'math') items = data.math || [];
  else if (tab === 'lit') items = data.literature || [];
  else if (tab === 'eng') items = data.english || [];
  else if (tab === 'sci') items = data.science || [];
  else if (tab === 'soc') items = data.social || [];

  document.getElementById('sample-list').innerHTML = renderSampleCards(items, q, lvl);
}

function openSingleSample(id, lvl) {
  const data = window._sampleData || getSamplesForGrade(lvl);
  const math = data.math || [];
  const lit = data.literature || [];
  const eng = data.english || [];
  const sci = data.science || [];
  const soc = data.social || [];
  const all  = [...math, ...lit, ...eng, ...sci, ...soc];
  const item = all.find(i => i.id === id);
  if (!item) return;

  const existing = document.getElementById('single-sample-modal');
  if (existing) existing.remove();

  const isMobile = window.innerWidth <= 768;

  // Check if item has analysis breakdown or full essay
  const hasAnalysisBreakdown = !!(item.analysis_breakdown || item.key_words);
  const hasFullEssay = !!item.full_essay;

  let solutionBodyHTML = '';

  if (hasAnalysisBreakdown || hasFullEssay) {
    solutionBodyHTML = `
      <!-- PHẦN 1: PHÂN TÍCH CHI TIẾT TỪNG ĐOẠN -->
      <div style="background:rgba(0,242,254,0.06);border:1.5px solid rgba(0,242,254,0.3);border-radius:18px;padding:${isMobile ? '14px' : '20px'};margin-bottom:18px;">
        <div style="font-weight:900;color:#00f2fe;font-size:${isMobile ? '.95rem' : '1.05rem'};margin-bottom:10px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-search-plus"></i>
          <span>PHẦN 1: DÀN Ý PHÂN TÍCH & TỪ NGỮ CHÌA KHÓA</span>
        </div>
        <div style="color:#e2e8f0;font-size:${isMobile ? '.88rem' : '.95rem'};line-height:1.75;">
          ${item.analysis_breakdown || item.solution}
        </div>
      </div>

      <!-- PHẦN 2: BÀI VĂN PHÂN TÍCH HOÀN CHỈNH (FULL ESSAY 2,500 CHỮ) -->
      ${hasFullEssay ? `
        <div style="background:rgba(168,85,247,0.08);border:1.5px solid rgba(168,85,247,0.35);border-radius:18px;padding:${isMobile ? '14px 12px' : '22px'};margin-bottom:20px;">
          <div style="font-weight:900;color:#c084fc;font-size:${isMobile ? '1rem' : '1.1rem'};margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-file-alt"></i>
            <span>PHẦN 2: BÀI VĂN MẪU PHÂN TÍCH HOÀN CHỈNH (FULL ESSAY)</span>
          </div>
          <div style="color:#f1f5f9;font-size:${isMobile ? '.9rem' : '.98rem'};line-height:1.9;white-space:pre-line;text-align:left;word-break:break-word;background:rgba(15,23,42,0.7);padding:${isMobile ? '14px 12px' : '20px'};border-radius:14px;border:1px solid rgba(168,85,247,0.2);">
            ${item.full_essay}
          </div>
        </div>
      ` : ''}
    `;
  } else {
    solutionBodyHTML = `
      <div style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);border-radius:18px;padding:${isMobile ? '14px' : '20px'};margin-bottom:20px;">
        <div style="font-weight:900;color:#34d399;font-size:${isMobile ? '.92rem' : '1rem'};margin-bottom:10px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-check-circle"></i>
          <span>LỜI GIẢI CHI TIẾT TỪNG BƯỚC / HƯỚNG DẪN HOÀN CHỈNH:</span>
        </div>
        <div style="color:#f1f5f9;font-size:${isMobile ? '.88rem' : '.98rem'};line-height:1.8;">${item.solution}</div>
      </div>
    `;
  }

  const html = `
  <div id="single-sample-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.94);backdrop-filter:blur(18px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:${isMobile ? '6px' : '16px'};animation:fadeIn .2s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.99) 0%, rgba(6,12,30,1) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:${isMobile ? '18px' : '28px'};max-width:840px;width:100%;height:${isMobile ? '98vh' : '92vh'};overflow-y:auto;padding:${isMobile ? '20px 14px' : '32px 28px'};position:relative;box-shadow:0 30px 80px rgba(0,0,0,.95), 0 0 50px rgba(0,242,254,0.12);-webkit-overflow-scrolling:touch;">
      
      <button onclick="document.getElementById('single-sample-modal').remove()" style="position:absolute;top:${isMobile ? '10px' : '20px'};right:${isMobile ? '10px' : '20px'};background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);width:42px;height:42px;border-radius:50%;cursor:pointer;font-size:1.2rem;color:#00f2fe;display:flex;align-items:center;justify-content:center;z-index:100;touch-action:manipulation;">✕</button>

      <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.74rem;padding:4px 12px;border-radius:12px;display:inline-block;margin-bottom:10px;">${item.tag || 'BÀI MẪU CHI TIẾT'}</span>
      <h2 style="font-size:${isMobile ? '1.2rem' : '1.5rem'};font-weight:900;color:#f8fafc;margin:0 0 16px;line-height:1.35;padding-right:40px;">${item.title}</h2>

      <!-- EDUCATIONAL DISCLAIMER BANNER -->
      <div style="background:rgba(245,158,11,0.12);border:1.5px solid rgba(245,158,11,0.4);border-radius:16px;padding:${isMobile ? '10px 14px' : '14px 20px'};margin-bottom:18px;display:flex;align-items:center;gap:10px;color:#fcd34d;font-size:${isMobile ? '.78rem' : '.88rem'};line-height:1.5;">
        <span style="font-size:1.3rem;flex-shrink:0;">⚠️</span>
        <div>
          <strong style="color:#fbbf24;font-size:${isMobile ? '.84rem' : '.95rem'};display:block;margin-bottom:2px;">LƯU Ý HỌC TẬP THAM KHẢO:</strong>
          Đây chỉ là những bài tham khảo có thể có sai sót. Các bài giải mẫu và bài văn phân tích được tổng hợp hỗ trợ học sinh mở rộng tư duy ôn luyện, có thể tồn tại sơ sót nhỏ. Học sinh nên kết hợp đối chiếu với bài giảng chính thức của Thầy/Cô giáo trên lớp để đạt kết quả tốt nhất.
        </div>
      </div>

      <!-- ĐỀ BÀI -->
      <div style="background:rgba(59,130,246,0.08);border:1.5px solid rgba(59,130,246,0.3);border-radius:18px;padding:${isMobile ? '14px' : '20px'};margin-bottom:18px;">
        <div style="font-weight:900;color:#60a5fa;font-size:${isMobile ? '.88rem' : '.92rem'};margin-bottom:6px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-clipboard-list"></i>
          <span>📋 ĐỀ BÀI / CÂU HỎI MẪU:</span>
        </div>
        <div style="color:#f8fafc;font-size:${isMobile ? '.9rem' : '1rem'};line-height:1.65;">${item.problem || item.title}</div>
      </div>

      <!-- LỜI GIẢI / PHÂN TÍCH -->
      ${solutionBodyHTML}

      <button onclick="document.getElementById('single-sample-modal').remove()" style="width:100%;padding:${isMobile ? '12px' : '14px'};background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;border:none;border-radius:16px;font-weight:900;font-size:${isMobile ? '.92rem' : '1rem'};cursor:pointer;box-shadow:0 6px 20px rgba(0,242,254,0.3);touch-action:manipulation;">
        ← Quay lại danh sách bài mẫu
      </button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}
