// ===== SAMPLE EXERCISES VIEWER SYSTEM (MOBILE OPTIMIZED) =====
// Problem statement (Đề bài) is positioned unconditionally at the VERY TOP of every modal view.

function getSamplesForGrade(lvl) {
  const g = parseInt(lvl) || 6;
  if (g <= 5)   return window.SAMPLES_GRADE_5  || (window.SAMPLES_GRADE_1_5 ? window.SAMPLES_GRADE_1_5[g] : null) || { math: [], literature: [], english: [], science: [], social: [] };
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
  <div id="sample-library-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.95);z-index:99999;display:flex;align-items:center;justify-content:center;padding:${isMobile ? '6px' : '16px'};animation:fadeIn .2s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.99) 0%, rgba(6,12,30,1) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:${isMobile ? '18px' : '28px'};max-width:960px;width:100%;height:${isMobile ? '98vh' : '92vh'};display:flex;flex-direction:column;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.95);animation:scaleUp .2s ease;">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(124,58,237,0.25) 100%);padding:${isMobile ? '14px 12px' : '20px 24px'};border-bottom:1px solid rgba(0,242,254,0.2);flex-shrink:0;position:relative;">
        <button onclick="document.getElementById('sample-library-modal').remove()" style="position:absolute;top:${isMobile ? '10px' : '16px'};right:${isMobile ? '10px' : '18px'};background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);width:38px;height:38px;border-radius:50%;color:#00f2fe;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;touch-action:manipulation;">✕</button>
        <div style="color:#00f2fe;font-weight:800;font-size:${isMobile ? '.7rem' : '.78rem'};letter-spacing:0.5px;margin-bottom:2px;padding-right:38px;">
          <span>📚 KHO BÀI GIẢI MẪU & BÀI VĂN PHÂN TÍCH</span>
        </div>
        <h2 style="color:#f8fafc;margin:0;font-size:${isMobile ? '1.15rem' : '1.5rem'};font-weight:900;line-height:1.3;">Lớp ${lvl} — Thư Viện Bài Mẫu (${all.length} Bài)</h2>
      </div>

      <!-- TABS + SEARCH -->
      <div style="background:rgba(10,18,40,0.9);padding:${isMobile ? '8px 10px' : '12px 20px'};border-bottom:1px solid rgba(0,242,254,0.15);flex-shrink:0;display:flex;flex-direction:${isMobile ? 'column' : 'row'};gap:8px;align-items:${isMobile ? 'stretch' : 'center'};">
        <div style="display:flex;gap:6px;overflow-x:auto;white-space:nowrap;padding-bottom:2px;-webkit-overflow-scrolling:touch;">
          <button id="tab-all"  onclick="switchSampleTab('all',${lvl})"  style="padding:6px 14px;border-radius:16px;border:none;font-weight:800;font-size:.78rem;cursor:pointer;background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;box-shadow:0 0 10px rgba(0,242,254,0.3);flex-shrink:0;">Tất cả (${all.length})</button>
          <button id="tab-math" onclick="switchSampleTab('math',${lvl})" style="padding:6px 14px;border-radius:16px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.78rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🧮 Toán (${math.length})</button>
          <button id="tab-lit"  onclick="switchSampleTab('lit',${lvl})"  style="padding:6px 14px;border-radius:16px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.78rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">✍️ Văn (${lit.length})</button>
          ${eng.length ? `<button id="tab-eng" onclick="switchSampleTab('eng',${lvl})" style="padding:6px 14px;border-radius:16px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.78rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🇬🇧 Anh (${eng.length})</button>` : ''}
          ${sci.length ? `<button id="tab-sci" onclick="switchSampleTab('sci',${lvl})" style="padding:6px 14px;border-radius:16px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.78rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">🔬 KHTN (${sci.length})</button>` : ''}
          ${soc.length ? `<button id="tab-soc" onclick="switchSampleTab('soc',${lvl})" style="padding:6px 14px;border-radius:16px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.78rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;flex-shrink:0;">📜 KHXH (${soc.length})</button>` : ''}
        </div>

        <input id="sample-search" type="text" placeholder="🔍 Tìm kiếm bài tập..." oninput="filterSamples(${lvl})"
          style="background:rgba(15,25,55,0.9);border:1.5px solid rgba(0,242,254,0.3);border-radius:16px;padding:6px 14px;font-size:.82rem;color:#f8fafc;outline:none;width:${isMobile ? '100%' : '200px'};margin-left:${isMobile ? '0' : 'auto'};" />
      </div>

      <!-- CONTENT LIST -->
      <div id="sample-list" style="overflow-y:auto;padding:${isMobile ? '10px 12px' : '16px 20px'};flex:1;-webkit-overflow-scrolling:touch;min-height:300px;">
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
    return `<div style="text-align:center;padding:30px 16px;color:#94a3b8;">
      <i class="fas fa-search" style="font-size:1.8rem;margin-bottom:8px;opacity:.5;"></i>
      <p style="margin:0;font-size:.85rem;">Không tìm thấy bài giải mẫu phù hợp.</p>
    </div>`;
  }

  const isMobile = window.innerWidth <= 768;

  return filtered.map(item => `
    <div class="sample-card" style="background:rgba(13,22,48,0.88);border-radius:16px;border:1.5px solid rgba(0,242,254,0.2);padding:${isMobile ? '12px 14px' : '16px'};margin-bottom:10px;cursor:pointer;transition:transform .2s ease, border-color .2s ease;touch-action:manipulation;" onclick="openSingleSample('${item.id}', ${lvl})">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;gap:6px;">
        <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.7rem;padding:2px 8px;border-radius:8px;">${item.tag || 'BÀI MẪU'}</span>
        <span style="color:#00f2fe;font-weight:700;font-size:${isMobile ? '.75rem' : '.82rem'};">Xem bài giải →</span>
      </div>
      <h4 style="font-weight:800;color:#f8fafc;margin:0 0 4px;font-size:${isMobile ? '.92rem' : '1.02rem'};line-height:1.35;">${item.title}</h4>
      <p style="font-size:${isMobile ? '.78rem' : '.85rem'};color:#94a3b8;margin:0;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${(item.problem || '').replace(/<[^>]*>?/gm, '')}</p>
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
    active.style.boxShadow = '0 0 10px rgba(0,242,254,0.3)';
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

function switchArticleSectionTab(sec) {
  ['essay', 'outline'].forEach(s => {
    const btn = document.getElementById('art-sec-tab-' + s);
    const box = document.getElementById('art-sec-box-' + s);
    if (btn) btn.classList.remove('active');
    if (box) box.style.display = 'none';
  });

  const activeBtn = document.getElementById('art-sec-tab-' + sec);
  const activeBox = document.getElementById('art-sec-box-' + sec);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeBox) activeBox.style.display = 'block';
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
  const hasFullEssay = !!item.full_essay;

  const html = `
  <div id="single-sample-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.95);z-index:999999;display:flex;align-items:center;justify-content:center;padding:${isMobile ? '4px' : '16px'};animation:fadeIn .2s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.99) 0%, rgba(6,12,30,1) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:${isMobile ? '16px' : '24px'};max-width:840px;width:100%;height:${isMobile ? '98vh' : '92vh'};display:flex;flex-direction:column;padding:${isMobile ? '14px 12px' : '24px 28px'};position:relative;box-shadow:0 30px 80px rgba(0,0,0,.95);overflow:hidden;">
      
      <!-- TOP HEADER BAR -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding-right:36px;flex-shrink:0;">
        <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.72rem;padding:3px 10px;border-radius:10px;">${item.tag || 'BÀI MẪU CHI TIẾT'}</span>
        <button onclick="document.getElementById('single-sample-modal').remove()" style="position:absolute;top:${isMobile ? '10px' : '18px'};right:${isMobile ? '10px' : '20px'};background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:1.1rem;color:#00f2fe;display:flex;align-items:center;justify-content:center;z-index:100;touch-action:manipulation;">✕</button>
      </div>

      <h2 style="font-size:${isMobile ? '1.1rem' : '1.35rem'};font-weight:900;color:#f8fafc;margin:0 0 10px;line-height:1.35;flex-shrink:0;">${item.title}</h2>

      <!-- SCROLLABLE ARTICLE BODY CONTAINER -->
      <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-right:4px;">
        
        <!-- 1. 📋 ĐỀ BÀI / CÂU HỎI MẪU (ALWAYS AT THE VERY TOP!) -->
        <div style="background:rgba(59,130,246,0.1);border:1.5px solid rgba(59,130,246,0.35);border-radius:14px;padding:${isMobile ? '12px' : '16px'};margin-bottom:12px;">
          <div style="font-weight:900;color:#60a5fa;font-size:${isMobile ? '.85rem' : '.92rem'};margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-clipboard-list"></i>
            <span>📋 ĐỀ BÀI / CÂU HỎI MẪU:</span>
          </div>
          <div style="color:#f8fafc;font-size:${isMobile ? '.88rem' : '.95rem'};line-height:1.6;font-weight:600;">${item.problem || item.title}</div>
        </div>

        <!-- 2. ⚠️ LƯU Ý HỌC TẬP THAM KHẢO BANNER (AT THE TOP BELOW PROBLEM) -->
        <div style="background:rgba(245,158,11,0.12);border:1.5px solid rgba(245,158,11,0.4);border-radius:14px;padding:${isMobile ? '10px 12px' : '12px 16px'};margin-bottom:14px;display:flex;align-items:center;gap:10px;color:#fcd34d;font-size:${isMobile ? '.76rem' : '.84rem'};line-height:1.5;">
          <span style="font-size:1.2rem;flex-shrink:0;">⚠️</span>
          <div>
            <strong style="color:#fbbf24;font-size:${isMobile ? '.82rem' : '.88rem'};display:block;margin-bottom:2px;">LƯU Ý HỌC TẬP THAM KHẢO:</strong>
            Đây chỉ là những bài tham khảo có thể có sai sót. Các bài giải mẫu và bài văn phân tích được tổng hợp hỗ trợ học sinh mở rộng tư duy ôn luyện, có thể tồn tại sơ sót nhỏ. Học sinh nên kết hợp đối chiếu với bài giảng chính thức của Thầy/Cô giáo trên lớp để đạt kết quả tốt nhất.
          </div>
        </div>

        <!-- 3. SUB-TABS IF ESSAY HAS FULL ESSAY AND OUTLINE -->
        ${hasFullEssay ? `
        <div style="display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;">
          <button id="art-sec-tab-essay" class="article-sec-tab active" onclick="switchArticleSectionTab('essay')">📜 Bài Văn Mẫu (2,500 chữ)</button>
          <button id="art-sec-tab-outline" class="article-sec-tab" onclick="switchArticleSectionTab('outline')">💡 Dàn Ý & Từ Khóa</button>
        </div>
        ` : ''}

        <!-- 4. LỜI GIẢI / BÀI VĂN PHÂN TÍCH SECTION -->
        <div id="art-sec-box-essay" style="display:block;">
          ${hasFullEssay ? `
            <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(168,85,247,0.3);border-radius:14px;padding:${isMobile ? '12px' : '20px'};margin-bottom:14px;">
              <div style="font-weight:900;color:#c084fc;font-size:${isMobile ? '.9rem' : '1.02rem'};margin-bottom:10px;display:flex;align-items:center;gap:8px;">
                <i class="fas fa-file-alt"></i>
                <span>BÀI VĂN PHÂN TÍCH HOÀN CHỈNH (FULL ESSAY):</span>
              </div>
              <div style="color:#f1f5f9;font-size:${isMobile ? '.88rem' : '.96rem'};line-height:1.85;white-space:pre-line;text-align:left;word-break:break-word;">
                ${item.full_essay}
              </div>
            </div>
          ` : `
            <div style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);border-radius:14px;padding:${isMobile ? '12px' : '18px'};margin-bottom:14px;">
              <div style="font-weight:900;color:#34d399;font-size:${isMobile ? '.88rem' : '1rem'};margin-bottom:8px;display:flex;align-items:center;gap:8px;">
                <i class="fas fa-check-circle"></i>
                <span>LỜI GIẢI CHI TIẾT TỪNG BƯỚC / HƯỚNG DẪN HOÀN CHỈNH:</span>
              </div>
              <div style="color:#f1f5f9;font-size:${isMobile ? '.85rem' : '.95rem'};line-height:1.75;">${item.solution}</div>
            </div>
          `}
        </div>

        <!-- OPTIONAL DÀN Ý & TỪ KHÓA BOX FOR ESSAYS -->
        ${hasFullEssay ? `
        <div id="art-sec-box-outline" style="display:none;">
          <div style="background:rgba(0,242,254,0.06);border:1.5px solid rgba(0,242,254,0.3);border-radius:14px;padding:${isMobile ? '12px' : '18px'};margin-bottom:14px;">
            <div style="font-weight:900;color:#00f2fe;font-size:${isMobile ? '.9rem' : '1rem'};margin-bottom:8px;display:flex;align-items:center;gap:8px;">
              <i class="fas fa-search-plus"></i>
              <span>DÀN Ý PHÂN TÍCH CHI TIẾT & TỪ NGỮ CHÌA KHÓA:</span>
            </div>
            <div style="color:#e2e8f0;font-size:${isMobile ? '.85rem' : '.92rem'};line-height:1.7;">
              ${item.analysis_breakdown || item.solution}
            </div>
          </div>
        </div>
        ` : ''}

      </div>

      <!-- FOOTER BUTTON -->
      <button onclick="document.getElementById('single-sample-modal').remove()" style="width:100%;padding:${isMobile ? '10px' : '14px'};background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;border:none;border-radius:14px;font-weight:900;font-size:${isMobile ? '.88rem' : '.95rem'};cursor:pointer;flex-shrink:0;margin-top:8px;touch-action:manipulation;">
        ← Quay lại danh sách bài mẫu
      </button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}
