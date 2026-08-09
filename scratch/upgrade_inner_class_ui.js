const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Upgrade Hero Banner inside PRIMARY_CLASS page
const oldHero = `                    <!-- HERO NEWSPAPER COVER BANNER -->
                    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 40px; color: white; margin-bottom: 30px; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);">
                        <div style="position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: rgba(59, 130, 246, 0.15); border-radius: 50%; blur(40px);"></div>
                        <div style="position: relative; z-index: 2;">
                            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; padding: 6px 16px; border-radius: 20px; font-weight: 800; font-size: 0.85rem; margin-bottom: 16px;">
                                🗞️ CỔNG THÔNG TIN & BÁO CHÍ HỌC TẬP LỚP \${lvl}
                            </div>
                            <h1 style="font-size: 2.4rem; font-weight: 900; line-height: 1.3; margin: 0 0 14px 0; color: #ffffff;">
                                Bảng Tin Bài Giảng & Kho Kiến Thức Trọng Tâm Lớp \${lvl}
                            </h1>
                            <p style="font-size: 1.05rem; color: #94a3b8; max-width: 800px; margin: 0 0 25px 0; line-height: 1.6;">
                                Chào mừng bạn đến với không gian học tập toàn diện Lớp \${lvl}. Nơi tổng hợp bài giảng, sơ đồ tư duy, ngân hàng câu hỏi trắc nghiệm tương tác và cẩm nang học tốt theo đúng chuẩn Bộ GD&ĐT.
                            </p>

                            <!-- Mini Stats Summary -->
                            <div style="display: flex; gap: 25px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                                <div>
                                    <div style="font-size: 1.4rem; font-weight: 900; color: #38bdf8;">\${primarySubjects.length} Môn Học</div>
                                    <div style="font-size: 0.85rem; color: #64748b;">Đầy đủ chương trình</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.4rem; font-weight: 900; color: #4ade80;">100% Chuẩn BGD</div>
                                    <div style="font-size: 0.85rem; color: #64748b;">Kiến thức chuẩn xác</div>
                                </div>
                                <div>
                                    <div style="font-size: 1.4rem; font-weight: 900; color: #facc15;">Trắc Nghiệm & Game</div>
                                    <div style="font-size: 0.85rem; color: #64748b;">Học mà chơi, chơi mà học</div>
                                </div>
                            </div>
                        </div>
                    </div>`;

const newHero = `                    <!-- HERO BANNER - PREMIUM CYBER DARK GLASSMORPHISM -->
                    <div style="background: linear-gradient(135deg, rgba(5,12,30,0.97) 0%, rgba(15,25,55,0.97) 100%); border: 1.5px solid rgba(0,242,254,0.3); border-radius: 32px; padding: 36px 32px; color: white; margin-bottom: 30px; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(0,242,254,0.08);">
                        <div style="position:absolute;top:-60px;right:-60px;width:300px;height:300px;background:radial-gradient(circle,rgba(0,242,254,0.15) 0%,transparent 70%);pointer-events:none;"></div>
                        <div style="position:absolute;bottom:-40px;left:-40px;width:200px;height:200px;background:radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%);pointer-events:none;"></div>
                        <div style="position: relative; z-index: 2;">
                            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                                <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(0,242,254,0.12); border:1px solid rgba(0,242,254,0.35); color:#00f2fe; padding:6px 18px; border-radius:22px; font-weight:800; font-size:0.82rem; letter-spacing:0.5px;">
                                    ⚡ CỔNG HỌC TẬP NÂNG CAO — LỚP \${lvl}
                                </div>
                                <button onclick="openSampleLibraryModal(\${lvl})" style="background:linear-gradient(135deg,#00f2fe,#3b82f6); border:none; border-radius:20px; color:#050c23; font-weight:900; font-size:0.85rem; padding:8px 20px; cursor:pointer; box-shadow:0 4px 15px rgba(0,242,254,0.3); transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                    📚 Mở Kho Bài Giải Mẫu →
                                </button>
                            </div>
                            <h1 style="font-size:2.2rem; font-weight:900; line-height:1.3; margin:0 0 12px 0; background:linear-gradient(135deg,#f8fafc 0%,#38bdf8 60%,#c084fc 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
                                Trung Tâm Học Tập Toàn Diện Lớp \${lvl} — \${levelTypeName}
                            </h1>
                            <p style="font-size:1rem; color:#94a3b8; max-width:800px; margin:0 0 24px 0; line-height:1.65;">
                                Khám phá đầy đủ <strong style="color:#38bdf8;">\${primarySubjects.length} môn học</strong> chuẩn GDPT 2018, 600+ bài giải mẫu chi tiết từng bước, ngân hàng câu hỏi trắc nghiệm tương tác và bộ trò chơi luyện tập AI thông minh.
                            </p>
                            <div style="display:flex; gap:20px; flex-wrap:wrap; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px;">
                                <div style="display:flex;align-items:center;gap:10px;">
                                    <span style="font-size:1.6rem;">📚</span>
                                    <div>
                                        <div style="font-size:1.2rem; font-weight:900; color:#38bdf8;">\${primarySubjects.length} Môn Học</div>
                                        <div style="font-size:0.78rem; color:#64748b; font-weight:700;">Chuẩn GDPT 2018</div>
                                    </div>
                                </div>
                                <div style="display:flex;align-items:center;gap:10px;">
                                    <span style="font-size:1.6rem;">🎯</span>
                                    <div>
                                        <div style="font-size:1.2rem; font-weight:900; color:#4ade80;">50+ Bài Mẫu</div>
                                        <div style="font-size:0.78rem; color:#64748b; font-weight:700;">Mỗi lớp — Mọi môn</div>
                                    </div>
                                </div>
                                <div style="display:flex;align-items:center;gap:10px;">
                                    <span style="font-size:1.6rem;">⚡</span>
                                    <div>
                                        <div style="font-size:1.2rem; font-weight:900; color:#facc15;">Game & Quiz AI</div>
                                        <div style="font-size:0.78rem; color:#64748b; font-weight:700;">Học mà chơi, chơi mà học</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

if (html.includes(oldHero)) {
  html = html.replace(oldHero, newHero);
  console.log('✅ Replaced Hero Banner with Cyber Dark Glassmorphism!');
} else {
  console.log('⚠️ Hero banner not matched exactly, trying normalized...');
  const normOld = oldHero.replace(/\r\n/g, '\n');
  const normHtml = html.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newHero);
    console.log('✅ Replaced Hero Banner via normalized match!');
  } else {
    console.log('❌ Could not match Hero Banner.');
  }
}

// 2. Upgrade Article Feed cards to dark glassmorphism
const oldArticleFeed = `                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 40px;">
                        \${newsFeedArticles.map(art => \`
                            <div onclick="openArticleReaderModal('\${art.key}')" style="background: rgba(13,21,44,0.88); backdrop-filter:blur(20px); border-radius: 24px; border: 1.5px solid rgba(56,189,248,0.15); padding: 24px; transition: all 0.3s ease; box-shadow: 0 8px 24px rgba(0,0,0,0.4); cursor: pointer;" onmouseover="this.style.transform='translateY(-6px)'; this.style.borderColor='rgba(56,189,248,0.4)'; this.style.boxShadow='0 16px 36px rgba(0,0,0,0.5)'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(56,189,248,0.15)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.4)'">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                    <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.78rem; padding: 4px 12px; border-radius: 12px;">\${art.tag}</span>
                                    <span style="font-size: 0.8rem; color: #94a3b8;">\${art.readTime}</span>
                                </div>
                                <h3 style="font-size: 1.2rem; font-weight: 800; color: #f1f5f9; margin: 0 0 10px 0; line-height: 1.4; display: flex; gap: 8px; align-items: flex-start;">
                                    <span>\${art.icon}</span> <span>\${art.title}</span>
                                </h3>
                                <p style="font-size: 0.92rem; color: #64748b; margin: 0 0 16px 0; line-height: 1.6;">\${art.desc}</p>
                                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                                    <span>🕒 \${art.time}</span>
                                    <span style="color: #2563eb; font-weight: 800; font-size: 0.9rem;">Đọc cẩm nang →</span>
                                </div>
                            </div>
                        \`).join('')}
                    </div>`;

const newArticleFeed = `                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: 22px; margin-bottom: 40px;">
                        \${newsFeedArticles.map(art => \`
                            <div onclick="openArticleReaderModal('\${art.key}')" style="background:rgba(13,22,48,0.92); backdrop-filter:blur(20px); border-radius:24px; border:1.5px solid rgba(0,242,254,0.15); padding:24px; transition:all 0.35s cubic-bezier(0.175,0.885,0.32,1.275); box-shadow:0 10px 28px rgba(0,0,0,0.5); cursor:pointer; position:relative; overflow:hidden;"
                              onmouseover="this.style.transform='translateY(-7px) scale(1.01)'; this.style.borderColor='rgba(0,242,254,0.45)'; this.style.boxShadow='0 20px 45px rgba(0,0,0,0.6), 0 0 20px rgba(0,242,254,0.1)';"
                              onmouseout="this.style.transform='none'; this.style.borderColor='rgba(0,242,254,0.15)'; this.style.boxShadow='0 10px 28px rgba(0,0,0,0.5)';">
                                <div style="position:absolute;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,#00f2fe,#3b82f6,#c084fc);"></div>
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                                    <span style="background:rgba(0,242,254,0.12); color:#00f2fe; border:1px solid rgba(0,242,254,0.3); font-weight:800; font-size:0.76rem; padding:4px 12px; border-radius:14px;">\${art.tag}</span>
                                    <span style="font-size:0.78rem; color:#64748b; font-weight:700;">⏱ \${art.readTime}</span>
                                </div>
                                <h3 style="font-size:1.15rem; font-weight:900; color:#f1f5f9; margin:0 0 10px 0; line-height:1.45; display:flex; gap:8px; align-items:flex-start;">
                                    <span style="font-size:1.4rem;">\${art.icon}</span>
                                    <span>\${art.title}</span>
                                </h3>
                                <p style="font-size:0.88rem; color:#94a3b8; margin:0 0 16px 0; line-height:1.65;">\${art.desc}</p>
                                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.82rem; border-top:1px solid rgba(255,255,255,0.08); padding-top:12px;">
                                    <span style="color:#64748b; font-weight:700;">🕒 \${art.time}</span>
                                    <span style="color:#00f2fe; font-weight:900; font-size:0.88rem;">Đọc chi tiết →</span>
                                </div>
                            </div>
                        \`).join('')}
                    </div>`;

if (html.includes(oldArticleFeed)) {
  html = html.replace(oldArticleFeed, newArticleFeed);
  console.log('✅ Upgraded Article Feed cards to dark glassmorphism!');
} else {
  const normOld = oldArticleFeed.replace(/\r\n/g, '\n');
  const normHtml = html.replace(/\r\n/g, '\n');
  if (normHtml.includes(normOld)) {
    html = normHtml.replace(normOld, newArticleFeed);
    console.log('✅ Upgraded Article Feed via normalized match!');
  } else {
    console.log('❌ Could not match Article Feed section.');
  }
}

// 3. Upgrade Article Reader Modal to dark mode
const oldArticleReader = `                    <div style="background: white; border-radius: 32px; max-width: 800px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); position: relative; animation: scaleUp 0.3s ease;">
                        <button onclick="document.getElementById('article-reader-modal').remove()" style="position: absolute; top: 25px; right: 25px; background: #f1f5f9; border: none; width: 44px; height: 44px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">✕</button>

                        <span style="background: #eff6ff; color: #2563eb; font-weight: 800; font-size: 0.85rem; padding: 6px 16px; border-radius: 16px; display: inline-block; margin-bottom: 15px;">\${art.tag}</span>
                        <h2 style="font-size: 2rem; font-weight: 900; color: #0f172a; margin: 0 0 15px 0; line-height: 1.3;">\${art.title}</h2>
                        
                        <div style="display: flex; align-items: center; gap: 15px; font-size: 0.88rem; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 25px;">
                            <span>✍️ \${art.author}</span> • <span>🕒 \${art.date}</span>
                        </div>

                        <div style="font-size: 1.05rem; color: #334155; line-height: 1.8; margin-bottom: 30px;">
                            \${art.content}
                        </div>

                        <button onclick="document.getElementById('article-reader-modal').remove()" class="btn btn-primary" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border: none; border-radius: 20px; padding: 14px 30px; font-weight: 800; width: 100%; font-size: 1rem; color: white;">
                            Đã Đọc Xong - Quay Lại Môn Học
                        </button>
                    </div>`;

const newArticleReader = `                    <div style="background:radial-gradient(circle at 50% 0%, rgba(15,25,55,0.98) 0%, rgba(6,12,30,0.99) 100%); border:1.5px solid rgba(0,242,254,0.35); border-radius:32px; max-width:820px; width:100%; max-height:88vh; overflow-y:auto; padding:36px 32px; position:relative; animation:scaleUp 0.3s cubic-bezier(0.175,0.885,0.32,1.275); box-shadow:0 30px 80px rgba(0,0,0,0.9),0 0 40px rgba(0,242,254,0.1);">
                        <button onclick="document.getElementById('article-reader-modal').remove()" style="position:absolute;top:22px;right:22px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);width:42px;height:42px;border-radius:50%;font-size:1.1rem;cursor:pointer;color:#00f2fe;transition:all 0.2s;" onmouseover="this.style.background='rgba(0,242,254,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">✕</button>

                        <span style="background:rgba(0,242,254,0.12);color:#00f2fe;border:1px solid rgba(0,242,254,0.3);font-weight:800;font-size:0.82rem;padding:5px 16px;border-radius:16px;display:inline-block;margin-bottom:16px;">\${art.tag}</span>
                        <h2 style="font-size:1.85rem;font-weight:900;color:#f8fafc;margin:0 0 16px 0;line-height:1.35;">\${art.title}</h2>
                        
                        <div style="display:flex;align-items:center;gap:15px;font-size:0.85rem;color:#64748b;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:16px;margin-bottom:24px;font-weight:700;">
                            <span>✍️ \${art.author}</span> • <span>🕒 \${art.date}</span>
                        </div>

                        <div style="font-size:1rem;color:#cbd5e1;line-height:1.85;margin-bottom:30px;">
                            \${art.content}
                        </div>

                        <button onclick="document.getElementById('article-reader-modal').remove()" style="background:linear-gradient(135deg,#00f2fe,#3b82f6);border:none;border-radius:20px;padding:14px 30px;font-weight:900;width:100%;font-size:1rem;color:#050c23;cursor:pointer;box-shadow:0 6px 20px rgba(0,242,254,0.3);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
                            ✅ Đã Đọc Xong — Quay Lại Môn Học
                        </button>
                    </div>`;

if (html.includes(oldArticleReader)) {
  html = html.replace(oldArticleReader, newArticleReader);
  console.log('✅ Upgraded Article Reader Modal to dark mode!');
} else {
  console.log('❌ Could not match Article Reader Modal section.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('🎉 All UI upgrades applied!');
