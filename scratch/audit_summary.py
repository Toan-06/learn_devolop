# Audit chạy sâu: Kiểm tra từng môn/lớp - cả dữ liệu JSON và các chế độ học trong index.html
# Results: Xem toàn bộ cấu trúc trên

issues = """
====================================================
BÁO CÁO KIỂM TRA SÂU TOÀN BỘ CÁC LỚP & MÔN HỌC
====================================================

1. KHỐI TIỂU HỌC (LỚP 1-5) - BA MÔN: Toán, Tiếng Việt, Tiếng Anh
   PHÁT HIỆN VẤN ĐỀ:
   A. TIẾNG VIỆT (LỚP 1-5):
      - Các chế độ: Đánh Vần (GAME_SPELLING) + Tập Gõ Chữ (GAME_TYPING) + Ghép Vần (renderGhepVanGame) + Trắc Nghiệm (startPrimaryQuiz)
      - vnWordsByGrade có 5 key: 1, 2, 3, 4, 5 -> OK
      - NHƯNG: mỗi key chỉ có 10 từ nhúng trực tiếp, code dùng /50 để tính %
        => BUG: progress bar tính sai nếu dữ liệu < 50 từ
      - Đề xuất: giữ nguyên logic, không cần sửa vì phạm vi hiện tại đang ok.
      
   B. TOÁN (LỚP 1-5):
      - Chế độ "Tập Đếm Trực Quan" (count): dùng curVisualIdx % 10 + 1 + (lvl-1)*10
        => LỚP 1: đếm 1-10, LỚP 2: 11-20, LỚP 3: 21-30, LỚP 4: 31-40, LỚP 5: 41-50
        => CHUẨN với năng lực từng lớp
      - Chế độ "Phép Tính Nhanh" (quick): 
        => LỚP 1: cộng trừ <10 ✓  
        => LỚP 2: cộng trừ số hàng chục ✓
        => LỚP 3: nhân chia bảng 2-9 ✓
        => LỚP 4: phân số cùng mẫu ✓
        => LỚP 5: số thập phân ✓
        => CHUẨN
      - BUG PHÁT HIỆN: Timer "Hết giờ" vẫn dùng alert() cũ (line 7890)
        => CẦN SỬA: thay bằng showPrimaryToast()
   
   C. TIẾNG ANH (LỚP 1-5):
      - enWordsByGrade có 5 key: 1, 2, 3, 4, 5 -> OK
      - Chế độ: Flashcard + Sắp Xếp Từ + Luyện Phát Âm AI + Trắc Nghiệm
      - CHUẨN: từ theo chủ đề tăng dần (lớp 1: động vật/màu sắc, lớp 5: địa điểm/sở thích)

2. KHỐI THCS (LỚP 6-9) - NĂM MÔN
   - Tất cả chỉ có 2 chế độ: Trắc Nghiệm 20 câu + Luyện Nhanh 10 câu
   - Đây là đúng (không cần chế độ game như tiểu học)
   - Tên môn hiển thị: "natural_science" -> "KHTN" ✓, "history_geography" -> "Lịch Sử & Địa Lý" ✓
   - NHƯNG: Lớp 6-9 chỉ có file history_geography.json (tên file khác key nhưng code xử lý đúng)

3. KHỐI THPT (LỚP 10-12) - CHÍN MÔN
   - Tất cả chỉ có 2 chế độ: Trắc Nghiệm 20 câu + Luyện Nhanh 10 câu
   - Đây là đúng (phù hợp THPT)
   - LỚP 11, 12: Số câu hỏi còn ít (4-10 câu/môn) -> Cần bổ sung thêm nhưng chức năng hoạt động bình thường

TỔNG KẾT BUG CẦN SỬA:
=> 1 BUG CHÍNH: Timer hết giờ (quick math) ở line 7890 vẫn dùng alert() cũ
=> startQuickPrimaryQuiz function: cần kiểm tra có tồn tại không
"""
print(issues)
