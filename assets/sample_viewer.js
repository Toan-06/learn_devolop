// ===== SAMPLE EXERCISES VIEWER SYSTEM (DARK CYBER THEME) =====
// Loads the correct grade data and renders a searchable exercise library modal

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

  const modalHTML = `
  <div id="sample-library-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.88);backdrop-filter:blur(16px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .3s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.98) 0%, rgba(6,12,30,0.99) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:28px;max-width:960px;width:100%;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.85), 0 0 40px rgba(0,242,254,0.1);animation:scaleUp .3s cubic-bezier(.175,.885,.32,1.275);">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg, rgba(0,242,254,0.15) 0%, rgba(124,58,237,0.25) 100%);padding:24px 28px;border-bottom:1px solid rgba(0,242,254,0.2);flex-shrink:0;position:relative;">
        <button onclick="document.getElementById('sample-library-modal').remove()" style="position:absolute;top:18px;right:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);width:38px;height:38px;border-radius:50%;color:#00f2fe;font-size:1.1rem;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(0,242,254,0.3)'" onmouseout="this.style.background='rgba(255,255,255,.1)'">✕</button>
        <div style="color:#00f2fe;font-weight:800;font-size:.8rem;letter-spacing:1px;margin-bottom:6px;display:flex;align-items:center;gap:6px;">
          <span>📚 KHO BÀI GIẢI MẪU CHI TIẾT TẤT CẢ CÁC MÔN HỌC (TOÁN, VĂN, ANH, LÝ, HÓA, SINH, SỬ, ĐỊA)</span>
        </div>
        <h2 style="color:#f8fafc;margin:0;font-size:1.65rem;font-weight:900;letter-spacing:-0.5px;">Lớp ${lvl} — Thư Viện Bài Mẫu Đa Môn Hóa (${all.length}+ Bài Giải Chi Tiết)</h2>
        <p style="color:#94a3b8;margin:8px 0 0;font-size:.9rem;">Lời giải tự luận step-by-step • Ngữ pháp & Viết đoạn Tiếng Anh • Bài văn mẫu THPTQG • Sơ đồ tư duy Lịch Sử & Địa Lý</p>
      </div>

      <!-- TABS + SEARCH -->
      <div style="background:rgba(10,18,40,0.8);padding:14px 24px;border-bottom:1px solid rgba(0,242,254,0.15);flex-shrink:0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <button id="tab-all"  onclick="switchSampleTab('all',${lvl})"  style="padding:8px 16px;border-radius:20px;border:none;font-weight:800;font-size:.82rem;cursor:pointer;background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;box-shadow:0 0 12px rgba(0,242,254,0.3);">Tất cả (${all.length})</button>
        <button id="tab-math" onclick="switchSampleTab('math',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.82rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;">🧮 Toán (${math.length})</button>
        <button id="tab-lit"  onclick="switchSampleTab('lit',${lvl})"  style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.82rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;">✍️ Văn (${lit.length})</button>
        ${eng.length ? `<button id="tab-eng" onclick="switchSampleTab('eng',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.82rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;">🇬🇧 Tiếng Anh (${eng.length})</button>` : ''}
        ${sci.length ? `<button id="tab-sci" onclick="switchSampleTab('sci',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.82rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;">🔬 KHTN / Lý / Hóa / Sinh (${sci.length})</button>` : ''}
        ${soc.length ? `<button id="tab-soc" onclick="switchSampleTab('soc',${lvl})" style="padding:8px 16px;border-radius:20px;border:1px solid rgba(0,242,254,0.25);font-weight:800;font-size:.82rem;cursor:pointer;background:rgba(15,25,55,0.7);color:#94a3b8;">📜 Sử / Địa / GDCD (${soc.length})</button>` : ''}
        
        <input id="sample-search" type="text" placeholder="🔍 Tìm tên bài, chủ đề..." oninput="filterSamples(${lvl})"
          style="margin-left:auto;background:rgba(15,25,55,0.9);border:1.5px solid rgba(0,242,254,0.3);border-radius:20px;padding:8px 16px;font-size:.85rem;color:#f8fafc;outline:none;width:220px;max-width:100%;" />
      </div>

      <!-- CONTENT -->
      <div id="sample-list" style="overflow-y:auto;padding:20px 24px;flex:1;">
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
    return `<div style="text-align:center;padding:40px;color:#94a3b8;">
      <i class="fas fa-search" style="font-size:2rem;margin-bottom:10px;opacity:.5;"></i>
      <p style="margin:0;">Không tìm thấy bài giải mẫu phù hợp với từ khóa.</p>
    </div>`;
  }

  return filtered.map(item => `
    <div class="sample-card" style="background:rgba(13,22,48,0.85);border-radius:20px;border:1.5px solid rgba(0,242,254,0.2);padding:20px;margin-bottom:14px;cursor:pointer;transition:all .3s cubic-bezier(0.16, 1, 0.3, 1);backdrop-filter:blur(10px);" onclick="openSingleSample('${item.id}', ${lvl})"
      onmouseover="this.style.borderColor='#00f2fe';this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 25px rgba(0,242,254,0.18)';"
      onmouseout="this.style.borderColor='rgba(0,242,254,0.2)';this.style.transform='none';this.style.boxShadow='none';">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.76rem;padding:4px 12px;border-radius:12px;">${item.tag || 'BÀI MẪU'}</span>
        <span style="color:#00f2fe;font-weight:700;font-size:.85rem;display:flex;align-items:center;gap:6px;">Xem bài giải chi tiết →</span>
      </div>
      <h4 style="font-weight:800;color:#f8fafc;margin:0 0 8px;font-size:1.05rem;">${item.title}</h4>
      <p style="font-size:.88rem;color:#94a3b8;margin:0;line-height:1.5;">${(item.problem || '').replace(/<[^>]*>?/gm, '').substring(0, 110)}${(item.problem||'').length > 110 ? '...' : ''}</p>
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

  // Check if this item has advanced literary analysis breakdown or full essay
  const hasAnalysisBreakdown = !!(item.analysis_breakdown || item.key_words);
  const hasFullEssay = !!item.full_essay;

  let solutionBodyHTML = '';

  if (hasAnalysisBreakdown || hasFullEssay) {
    // Advanced 3-Part Structural Layout for Literary Analysis & High Level Essays
    solutionBodyHTML = `
      <!-- PHẦN 1: PHÂN TÍCH TỪNG ĐOẠN & NGHỆ THUẬT / TỪ NGỮ CHÌA KHÓA -->
      <div style="background:rgba(0,242,254,0.06);border:1.5px solid rgba(0,242,254,0.3);border-radius:20px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:900;color:#00f2fe;font-size:1.05rem;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-search-plus" style="font-size:1.1rem;"></i>
          <span>PHẦN 1: PHÂN TÍCH CHI TIẾT TỪNG ĐOẠN & TỪ NGỮ NGHỆ THUẬT CHÌA KHÓA</span>
        </div>
        <div style="color:#e2e8f0;font-size:.95rem;line-height:1.8;">
          ${item.analysis_breakdown || item.solution}
        </div>
      </div>

      <!-- PHẦN 2: BÀI VĂN PHÂN TÍCH HOÀN CHỈNH (MỞ BÀI - THÂN BÀI - KẾT BÀI) -->
      ${hasFullEssay ? `
        <div style="background:rgba(168,85,247,0.08);border:1.5px solid rgba(168,85,247,0.35);border-radius:20px;padding:22px;margin-bottom:24px;">
          <div style="font-weight:900;color:#c084fc;font-size:1.1rem;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-file-alt" style="font-size:1.2rem;"></i>
            <span>PHẦN 2: BÀI VĂN MẪU PHÂN TÍCH HOÀN CHỈNH (FULL ESSAY)</span>
          </div>
          <div style="color:#f1f5f9;font-size:.98rem;line-height:1.95;white-space:pre-line;text-align:justify;background:rgba(15,23,42,0.6);padding:20px;border-radius:14px;border:1px solid rgba(168,85,247,0.2);">
            ${item.full_essay}
          </div>
        </div>
      ` : ''}
    `;
  } else {
    // Standard solution
    solutionBodyHTML = `
      <div style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);border-radius:20px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:900;color:#34d399;font-size:1rem;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-check-circle"></i>
          <span>LỜI GIẢI CHI TIẾT TỪNG BƯỚC / HƯỚNG DẪN HOÀN CHỈNH:</span>
        </div>
        <div style="color:#f1f5f9;font-size:.98rem;line-height:1.8;">${item.solution}</div>
      </div>
    `;
  }

  const html = `
  <div id="single-sample-modal" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(5,10,25,.92);backdrop-filter:blur(18px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .25s ease;">
    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.98) 0%, rgba(6,12,30,1) 100%);border:1.5px solid rgba(0,242,254,0.35);border-radius:28px;max-width:840px;width:100%;max-height:92vh;overflow-y:auto;padding:32px 28px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.9), 0 0 50px rgba(0,242,254,0.12);animation:scaleUp .25s ease;">
      
      <button onclick="document.getElementById('single-sample-modal').remove()" style="position:absolute;top:20px;right:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);width:40px;height:40px;border-radius:50%;cursor:pointer;font-size:1.1rem;color:#00f2fe;transition:all .2s;" onmouseover="this.style.background='rgba(0,242,254,0.3)'" onmouseout="this.style.background='rgba(255,255,255,.1)'">✕</button>

      <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:.78rem;padding:5px 14px;border-radius:14px;display:inline-block;margin-bottom:14px;">${item.tag || 'BÀI MẪU CHI TIẾT'}</span>
      <h2 style="font-size:1.5rem;font-weight:900;color:#f8fafc;margin:0 0 22px;line-height:1.35;">${item.title}</h2>

      
      <!-- EDUCATIONAL DISCLAIMER BANNER -->
      <div style="background:rgba(245,158,11,0.12);border:1.5px solid rgba(245,158,11,0.4);border-radius:18px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;gap:14px;color:#fcd34d;font-size:0.88rem;line-height:1.6;">
        <span style="font-size:1.5rem;flex-shrink:0;">⚠️</span>
        <div>
          <strong style="color:#fbbf24;font-size:0.95rem;display:block;margin-bottom:4px;">LƯU Ý HỌC TẬP THAM KHẢO:</strong>
          Đây chỉ là những bài tham khảo có thể có sai sót. Các bài giải mẫu và bài văn phân tích được tổng hợp hỗ trợ học sinh mở rộng tư duy ôn luyện, có thể tồn tại sơ sót nhỏ. Học sinh nên kết hợp đối chiếu với bài giảng chính thức của Thầy/Cô giáo trên lớp để đạt kết quả tốt nhất.
        </div>
      </div>

      <!-- ĐỀ BÀI -->
      <div style="background:rgba(59,130,246,0.08);border:1.5px solid rgba(59,130,246,0.3);border-radius:20px;padding:20px;margin-bottom:24px;">
        <div style="font-weight:900;color:#60a5fa;font-size:.92rem;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-clipboard-list"></i>
          <span>📋 ĐỀ BÀI / CÂU HỎI MẪU:</span>
        </div>
        <div style="color:#f8fafc;font-size:1rem;line-height:1.75;">${item.problem || item.title}</div>
      </div>

      <!-- LỜI GIẢI / PHÂN TÍCH -->
      ${solutionBodyHTML}

      <button onclick="document.getElementById('single-sample-modal').remove()" style="width:100%;padding:14px;background:linear-gradient(135deg,#00f2fe,#3b82f6);color:#050c23;border:none;border-radius:18px;font-weight:900;font-size:1rem;cursor:pointer;box-shadow:0 6px 20px rgba(0,242,254,0.3);transition:all .2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
        ← Quay lại danh sách bài mẫu
      </button>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}
