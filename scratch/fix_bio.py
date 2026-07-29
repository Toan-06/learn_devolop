with open('d:/quizz/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find start of the old innerHTML block inside renderBioPage
func_start = content.find('function renderBioPage()')
marker = 'app.innerHTML = `'
old_start = content.find(marker, func_start)
# Find the closing backtick-semicolon of this specific template literal
old_end = content.find('`;\n            const items', old_start) + 2  # ends after the backtick-semicolon

print(f'Found innerHTML block from {old_start} to {old_end}')
print('Old start sample:', repr(content[old_start:old_start+60]))
print('Old end sample:', repr(content[old_end-40:old_end+10]))

new_html = r"""app.innerHTML = `
                <div class="bio-page-container" style="max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; animation: fadeIn 0.4s ease;">
                    <div class="back-btn-container" style="text-align: left; margin-bottom: 25px;">
                        <button class="back-btn" onclick="navigateTo('MAIN_HOME')">
                            <i class="fas fa-arrow-left"></i> Quay lại Trang chủ
                        </button>
                    </div>
                    <div class="bio-profile-card" style="background: url('assets/bio-bg.jpg') center/cover no-repeat; border-radius: 24px; padding: 35px 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,180,255,0.15); border: 1.5px solid rgba(0,200,255,0.35); position: relative; overflow: hidden; margin-bottom: 30px;">
                        <div style="position: absolute; inset: 0; background: rgba(5, 12, 35, 0.55); border-radius: 24px; z-index: 0;"></div>
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #00f2fe, #4f46e5, #a855f7); z-index: 2;"></div>
                        <div style="position: relative; z-index: 1;">
                            <div class="bio-avatar" style="width: 130px; height: 130px; border-radius: 50%; margin: 0 auto 20px auto; border: 3px solid rgba(0,242,254,0.6); box-shadow: 0 0 25px rgba(0,180,255,0.5), 0 8px 20px rgba(0,0,0,0.5); overflow: hidden;">
                                <img src="assets/yukii-avatar.jpg" alt="Yukii development avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                            </div>
                            <h2 style="font-size: 1.85rem; font-weight: 900; color: #f8fafc; margin: 0 0 5px 0; text-shadow: 0 2px 10px rgba(0,0,0,0.6);">Yukii development</h2>
                            <p style="font-size: 1rem; color: #7dd3fc; font-weight: 600; margin: 0 0 20px 0; letter-spacing: 0.3px;">Developer &amp; Founder of Traffic Practice</p>
                            <p style="font-size: 0.95rem; color: #e2e8f0; line-height: 1.7; margin: 0 0 30px 0; background: rgba(0,0,0,0.35); padding: 15px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); text-align: justify; backdrop-filter: blur(6px);">
                                Chào bạn! Mình là Yukii development, người xây dựng nền tảng Traffic Practice giúp ôn luyện thi lý thuyết lái xe một cách nhanh chóng, hiệu quả và hiện đại nhất. Hãy kết nối với mình qua các kênh bên dưới nhé!
                            </p>
                            <div class="bio-links-list" style="display: flex; flex-direction: column; gap: 15px;">
                                <a href="https://www.facebook.com/share/14hPmCvE1RK/" target="_blank" class="bio-link-item" style="display: flex; align-items: center; gap: 15px; padding: 16px 20px; background: #1877F2; color: white; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(24, 119, 242, 0.4);">
                                    <i class="fab fa-facebook" style="font-size: 1.5rem; width: 30px;"></i>
                                    <span style="flex-grow: 1; text-align: left;">Kết nối qua Facebook</span>
                                    <i class="fas fa-chevron-right" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                </a>
                                <a href="#" onclick="alert('Link Instagram sẽ được cập nhật sau!'); return false;" class="bio-link-item" style="display: flex; align-items: center; gap: 15px; padding: 16px 20px; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: white; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(220, 39, 67, 0.35);">
                                    <i class="fab fa-instagram" style="font-size: 1.5rem; width: 30px;"></i>
                                    <span style="flex-grow: 1; text-align: left;">Instagram (Chưa có link, sẽ thêm sau)</span>
                                    <i class="fas fa-chevron-right" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                </a>
                                <a href="https://zalo.me/0388064851" target="_blank" class="bio-link-item" style="display: flex; align-items: center; gap: 15px; padding: 16px 20px; background: #0068FF; color: white; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0, 104, 255, 0.4);">
                                    <i class="fas fa-comment-dots" style="font-size: 1.5rem; width: 30px;"></i>
                                    <span style="flex-grow: 1; text-align: left;">Chat Zalo: 0388064851</span>
                                    <i class="fas fa-chevron-right" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                </a>
                                <a href="mailto:buit21062006@gmail.com" class="bio-link-item" style="display: flex; align-items: center; gap: 15px; padding: 16px 20px; background: #ea4335; color: white; border-radius: 16px; text-decoration: none; font-weight: 700; font-size: 1.05rem; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(234, 67, 53, 0.4);">
                                    <i class="fas fa-envelope" style="font-size: 1.5rem; width: 30px;"></i>
                                    <span style="flex-grow: 1; text-align: left;">Gửi thư (buit21062006@gmail.com)</span>
                                    <i class="fas fa-chevron-right" style="font-size: 0.9rem; opacity: 0.8;"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;"""

new_content = content[:old_start] + new_html + content[old_end:]

with open('d:/quizz/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('SUCCESS: Bio page updated. New file length:', len(new_content))

# Verify
with open('d:/quizz/index.html', 'r', encoding='utf-8') as f:
    verify = f.read()
if 'assets/bio-bg.jpg' in verify and 'assets/yukii-avatar.jpg' in verify:
    print('VERIFIED: New images are present in file')
if 'function generateRandomMockExam' in verify:
    print('VERIFIED: generateRandomMockExam function intact')
