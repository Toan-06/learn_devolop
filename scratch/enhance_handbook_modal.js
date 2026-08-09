const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const origLen = html.length;

// Replace the sp-content-formulas block with a much richer handbook layout
const oldFormulasBlock = `            <!-- Tab 2: Formulas Cheat Sheet -->
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
            </div>`;

const newFormulasBlock = `            <!-- Tab 2: Formulas Cheat Sheet & Sample Library Banner -->
            <div id="sp-content-formulas" style="flex:1; display:none; padding:20px; overflow-y:auto; background:rgba(10,15,36,0.95); color:#f1f5f9;">
                <!-- Call to action button to open full sample library modal -->
                <div style="background:linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.2) 100%); border:1.5px solid rgba(56,189,248,0.35); border-radius:20px; padding:18px 24px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; box-shadow:0 8px 25px rgba(0,0,0,0.4);">
                    <div>
                        <h3 style="margin:0 0 4px 0; color:#38bdf8; font-size:1.1rem; font-weight:900; display:flex; align-items:center; gap:8px;">
                            <span>📚 Kho Bài Giải Mẫu & Dàn Ý Văn Mẫu Chi Tiết</span>
                        </h3>
                        <p style="margin:0; color:#cbd5e1; font-size:0.85rem;">Tra cứu bài tập giải chi tiết từng bước & bài văn mẫu đạt chuẩn 9.5+ kỳ thi THPTQG</p>
                    </div>
                    <button onclick="closeScratchpadModal(); openSampleLibraryModal();" style="background:linear-gradient(135deg, #00f2fe 0%, #3b82f6 100%); color:#050c23; border:none; padding:10px 20px; border-radius:14px; font-weight:900; font-size:0.88rem; cursor:pointer; box-shadow:0 4px 15px rgba(0,242,254,0.35); transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
                        Mở Thư viện Bài Mẫu →
                    </button>
                </div>

                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:16px;">
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(56,189,248,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#38bdf8; font-weight:800; font-size:0.95rem;">🧮 Hằng Đẳng Thức & Toán Học</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (a + b)² = a² + 2ab + b²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (a - b)² = a² - 2ab + b²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• a² - b² = (a - b)(a + b)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (a + b)³ = a³ + 3a²b + 3ab² + b³</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• PT bậc 2: Δ = b² - 4ac</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(168,85,247,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#c084fc; font-weight:800; font-size:0.95rem;">📐 Đạo Hàm & Tích Phân (Lớp 11-12)</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (xⁿ)' = n · xⁿ⁻¹ | (ln x)' = 1/x</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (sin x)' = cos x | (cos x)' = -sin x</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• (eˣ)' = eˣ | (u/v)' = (u'v - uv') / v²</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Tích phân từng phần: ∫u dv = uv - ∫v du</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Thể tích chóp: V = ⅓ S_đáy · h</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(245,158,11,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#facc15; font-weight:800; font-size:0.95rem;">⚡ Vật Lý - Dao Động & Mạch RLC</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Dao động: x = A·cos(ωt + φ)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Chu kỳ con lắc đơn: T = 2π√(l/g)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Trở kháng RLC: Z = √(R² + (Z_L - Z_C)²)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Giao thoa Y-âng: i = λ·D / a</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Định luật Ôm: I = U / R</p>
                    </div>
                    <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(34,197,94,0.2); border-radius:16px; padding:16px;">
                        <h4 style="margin:0 0 10px 0; color:#4ade80; font-weight:800; font-size:0.95rem;">🧪 Hóa Học - Công Thức & Phản Ứng</h4>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Số mol: n = m / M = V / 22.4</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Nồng độ M: C_M = n / V (lít)</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Nồng độ %: C% = (m_ct / m_dd) · 100%</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• pH = -log[H+] | Este + NaOH -> Muối + Ancol</p>
                        <p style="margin:4px 0; font-size:0.82rem; font-family:monospace; color:#cbd5e1;">• Bảo toàn khối lượng & Bảo toàn electron</p>
                    </div>
                </div>
            </div>`;

if (html.includes(oldFormulasBlock)) {
    html = html.replace(oldFormulasBlock, newFormulasBlock);
    console.log('✅ Replaced sp-content-formulas with enhanced handbook banner & cards!');
} else {
    // Try normalized match
    const normOld = oldFormulasBlock.replace(/\r\n/g, '\n');
    const normHtml = html.replace(/\r\n/g, '\n');
    if (normHtml.includes(normOld)) {
        html = normHtml.replace(normOld, newFormulasBlock);
        console.log('✅ Replaced sp-content-formulas via normalized match!');
    } else {
        console.log('⚠️ oldFormulasBlock marker not found!');
    }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 Handbook modal enhancement complete! Size:', origLen, '->', html.length);
