const fs = require('fs');
const path = require('path');

// ===== GRADE 6 =====
const g6_content = `// ===== BÀI MẪU LỚP 6 (CHUẨN GDPT 2018 & ĐẠT 9.5+) =====
window.SAMPLES_GRADE_6 = {
  math: [
    {
      id:'g6m1', tag:'SỐ TỰ NHIÊN', title:'Tính giá trị biểu thức: 125 × 8 ÷ 4 + 36 − 12',
      problem:'Tính giá trị biểu thức: A = 125 × 8 ÷ 4 + 36 − 12',
      solution:\`<b>Bước 1:</b> 125 × 8 = 1000<br><b>Bước 2:</b> 1000 ÷ 4 = 250<br><b>Bước 3:</b> 250 + 36 = 286<br><b>Bước 4:</b> 286 − 12 = <b>274</b>\`
    }
  ],
  literature: [
    {
      id:'g6l1', tag:'VĂN KỂ CHUYỆN', title:'Kể lại câu chuyện "Sơn Tinh Thủy Tinh" bằng lời văn của em',
      problem:'Kể lại truyền thuyết "Sơn Tinh, Thủy Tinh" theo lời kể của em.',
      analysis_breakdown:\`<b style="color:#00f2fe;">Bố cục & Chi tiết thần kỳ:</b><p style="margin:4px 0 0;">"Nước dâng cao bao nhiêu, núi đắp cao bấy nhiêu" biểu tượng cho sức mạnh kiên cường của nhân dân ta trị thủy.</p>\`,
      full_essay:\`<b>MỞ BÀI:</b> Truyền thuyết "Sơn Tinh, Thủy Tinh" giải thích hiện tượng bão lũ và tôn vinh ý chí trị thủy của cha ông ta.\`
    }
  ],
  english: [
    {
      id:'g6e1', tag:'PRESENT SIMPLE', title:'Present Simple Tense vs Present Continuous',
      problem:'Complete: "Every day, Lan (walk) ______ to school, but today she (ride) ______ her bicycle."',
      solution:\`• "Every day" → Thói quen hằng ngày ⇒ Dùng Present Simple: <b>walks</b><br>• "today" → Hành động xảy ra hôm nay/tạm thời ⇒ Dùng Present Continuous: <b>is riding</b><br><b>Answer:</b> walks / is riding\`
    }
  ],
  science: [
    {
      id:'g6s1', tag:'KHTN 6 - TẾ BÀO', title:'Cấu tạo và Chức năng các thành phần chính của Tế Bào',
      problem:'Mô tả cấu tạo và chức năng của tế bào nhân thực.',
      solution:\`<b>1. Màng sinh chất:</b> Bảo vệ và trao đổi chất giữa tế bào với môi trường.<br><b>2. Tế bào chất:</b> Nơi diễn ra các hoạt động sống của tế bào.<br><b>3. Nhân tế bào:</b> Chứa vật chất di truyền (ADN), điều khiển mọi hoạt động sống.\`
    }
  ],
  social: [
    {
      id:'g6so1', tag:'LỊCH SỬ 6 - ĐỒNG NAI', title:'Nhà nước Văn Lang - Âu Lạc và Thành Cổ Loa',
      problem:'Tại sao An Dương Vương lại chọn Cổ Loa làm nơi xây dựng kinh đô?',
      solution:\`<b>1. Vị trí địa lý:</b> Cổ Loa (Đông Anh, Hà Nội) nằm ở trung tâm đất nước, là đầu mối giao thông đường thủy và đường bộ.<br><b>2. Quân sự:</b> Xây dựng 9 vòng thành kiên cố giúp phòng thủ hiệu quả trước nguy cơ xâm lược.\`
    }
  ]
};
`;

// ===== GRADE 7 =====
const g7_content = `// ===== BÀI MẪU LỚP 7 (CHUẨN GDPT 2018 & ĐẠT 9.5+) =====
window.SAMPLES_GRADE_7 = {
  math: [
    {
      id:'g7m1', tag:'SỐ HỮU TỈ', title:'Tính giá trị biểu thức: A = (-1/3)³ × 27 + (2/5) ÷ (-4/15)',
      problem:'Tính: A = (-1/3)³ × 27 + (2/5) ÷ (-4/15)',
      solution:\`(-1/27) × 27 = -1<br>(2/5) × (-15/4) = -3/2<br>A = -1 + (-3/2) = <b>-5/2</b>\`
    }
  ],
  literature: [
    {
      id:'g7l1', tag:'PHÂN TÍCH THƠ', title:'Phân tích bài thơ "Bánh trôi nước" - Hồ Xuân Hương',
      problem:'Phân tích bài thơ "Bánh trôi nước" của Hồ Xuân Hương.',
      analysis_breakdown:\`<b style="color:#00f2fe;">Hình ảnh ẩn dụ hai tầng nghĩa:</b><p style="margin:4px 0 0;">Chiếc bánh trôi đại diện cho vẻ đẹp và số phận chìm nổi nhưng kiên trinh của người phụ nữ.</p>\`,
      full_essay:\`<b>MỞ BÀI:</b> Hồ Xuân Hương cất lên tiếng nói cảm thông cho thân phận người phụ nữ trong xã hội cũ.\`
    }
  ],
  english: [
    {
      id:'g7e1', tag:'COMPARATIVES', title:'Comparative & Superlative Adjectives',
      problem:'Write the correct forms: "Hanoi is (big) ______ than Da Nang, but Ho Chi Minh City is the (large) ______ city in Vietnam."',
      solution:\`• Comparative of "big" → <b>bigger</b><br>• Superlative of "large" → <b>largest</b><br><b>Answer:</b> bigger / largest\`
    }
  ],
  science: [
    {
      id:'g7s1', tag:'KHTN 7 - QUANG HỌC', title:'Giải thích Định luật Phản xạ Ánh sáng',
      problem:'Cho tia tới SI hợp với mặt gương phẳng một góc 30°. Tính góc phản xạ i\'.',
      solution:\`<b>Bước 1:</b> Pháp tuyến IN ⊥ mặt gương ⇒ Góc tới i = 90° − 30° = <b>60°</b>.<br><b>Bước 2:</b> Theo ĐL Phản xạ ánh sáng: Góc phản xạ i\' = i = <b>60°</b>.\`
    }
  ],
  social: [
    {
      id:'g7so1', tag:'LỊCH SỬ 7 - LÝ TRẦN', title:'Ý nghĩa Trận Bạch Đằng năm 1288 của Hưng Đạo Vương Trần Quốc Tuấn',
      problem:'Phân tích nguyên nhân thắng lợi của cuộc kháng chiến chống quân Nguyên - Mông lần thứ ba (1288).',
      solution:\`<b>1. Chiến thuật thiên tài:</b> Cắm cọc gỗ trên sông Bạch Đằng, lừa thuyền giặc vào bẫy khi thủy triều rút.<br><b>2. Tinh thần đoàn kết:</b> "Vua tôi đồng lòng, anh em hòa thuận, cả nước góp sức" (Lời Trần Quốc Tuấn).\`
    }
  ]
};
`;

// ===== GRADE 8 =====
const g8_content = `// ===== BÀI MẪU LỚP 8 (CHUẨN GDPT 2018 & ĐẠT 9.5+) =====
window.SAMPLES_GRADE_8 = {
  math: [
    {
      id:'g8m1', tag:'HẰNG ĐẲNG THỨC', title:'Phân tích đa thức thành nhân tử: x³ − 6x² + 12x − 8',
      problem:'Phân tích đa thức P = x³ − 6x² + 12x − 8 thành nhân tử.',
      solution:\`Dạng lập phương một hiệu: (a − b)³ = a³ − 3a²b + 3ab² − b³<br>P = (x − 2)³\`
    }
  ],
  literature: [
    {
      id:'g8l1', tag:'PHÂN TÍCH TÁC PHẨM', title:'Phân tích nhân vật chị Dậu trong "Tức nước vỡ bờ"',
      problem:'Phân tích hình tượng nhân vật chị Dậu qua đoạn trích "Tức nước vỡ bờ".',
      analysis_breakdown:\`<b style="color:#00f2fe;">Thái độ phản kháng bộc phát:</b><p style="margin:4px 0 0;">Quy luật "Ở đâu có áp bức, ở đó có đấu tranh".</p>\`,
      full_essay:\`<b>MỞ BÀI:</b> Ngô Tất Tố ca ngợi sức mạnh tiềm tàng, tinh thần phản kháng mạnh mẽ của người phụ nữ nông dân.\`
    }
  ],
  english: [
    {
      id:'g8e1', tag:'REPORTED SPEECH', title:'Converting Direct Speech to Reported Speech',
      problem:'Change into reported speech: "I will visit my grandparents tomorrow," Nam said.',
      solution:\`• Pronoun change: I → he<br>• Tense backshift: will → would<br>• Time expression change: tomorrow → the following day<br><b>Answer:</b> Nam said that he <b>would visit his grandparents the following day</b>.\`
    }
  ],
  science: [
    {
      id:'g8s1', tag:'KHTN 8 - HÓA HỌC', title:'Tính nồng độ phần trăm C% và nồng độ mol C_M',
      problem:'Hòa tan 20g NaOH vào 80g nước thu được 100ml dung dịch. Tính C% và C_M.',
      solution:\`<b>1. Khối lượng dung dịch:</b> m_dd = 20 + 80 = 100g.<br><b>2. C%:</b> C% = (20 / 100) × 100% = <b>20%</b>.<br><b>3. C_M:</b> n_NaOH = 20 / 40 = 0,5 mol. C_M = 0,5 / 0,1 = <b>5M</b>.\`
    }
  ],
  social: [
    {
      id:'g8so1', tag:'LỊCH SỬ 8 - PHONG TRÀO CẦN VƯƠNG', title:'Phân tích Tinh thần yêu nước trong Phong trào Cần Vương (1885 - 1896)',
      problem:'Tại sao Vua Hàm Nghi lại ra Chiếu Cần Vương?',
      solution:\`Sau thất bại ở kinh thành Huế (1885), Tôn Thất Thuyết đưa Vua Hàm Nghi ra Tân Sở (Quảng Trị) xuống Chiếu Cần Vương kêu gọi văn thân, sĩ phu và nhân dân cả nước đứng lên giúp vua cứu nước.\`
    }
  ]
};
`;

// ===== GRADE 9 =====
const g9_content = `// ===== BÀI MẪU LỚP 9 (CHUẨN GDPT 2018 & ÔN THI 10 ĐẠT 9.5+) =====
window.SAMPLES_GRADE_9 = {
  math: [
    { id:'g9m1', tag:'CĂN BẬC HAI', title:'Rút gọn biểu thức: A = √(12) + √(27) − √(48)',
      problem:'Rút gọn: A = √(12) + √(27) − √(48)',
      solution:\`2√3 + 3√3 − 4√3 = <b>√3</b>\`
    }
  ],
  literature: [
    { id:'g9l1', tag:'PHÂN TÍCH THƠ ÔN THI 10', title:'Phân tích bài thơ "Đồng Chí" - Chính Hữu',
      problem:'Phân tích bài thơ "Đồng Chí" của Chính Hữu.',
      analysis_breakdown:\`<b style="color:#00f2fe;">Biểu tượng "Đầu súng trăng treo":</b><p style="margin:4px 0 0;">Súng tượng trưng chiến đấu khốc liệt, trăng tượng trưng cho hòa bình và thơ mộng.</p>\`,
      full_essay:\`<b>MỞ BÀI:</b> "Đồng Chí" của Chính Hữu là tượng đài thi ca về tình đồng đội sâu sắc của người lính nông dân.\`
    }
  ],
  english: [
    { id:'g9e1', tag:'WISH CLAUSES & SUGGESTIONS', title:'Structures with Wish and Suggest + V-ing',
      problem:'Rewrite: "I don\'t have a laptop." → "I wish..." AND "Let\'s protect the environment." → "I suggest..."',
      solution:\`• Wish clause (unreal in present): "I wish <b>I had a laptop</b>."<br>• Suggestion: "I suggest <b>protecting the environment</b>." (or "that we should protect...")\`
    }
  ],
  science: [
    { id:'g9s1', tag:'KHTN 9 - ĐỊNH LUẬT ÔM', title:'Tính điện trở tương đương R_tđ của đoạn mạch hỗn hợp',
      problem:'Cho R₁ = 6 Ω nối tiếp với cụm (R₂ // R₃) biết R₂ = 4 Ω, R₃ = 12 Ω. Tính R_tđ.',
      solution:\`<b>1. Điện trở cụm song song R₂₃:</b> R₂₃ = (R₂ × R₃) / (R₂ + R₃) = (4 × 12) / (4 + 12) = 48 / 16 = 3 Ω.<br><b>2. Điện trở tương đương toàn mạch R_tđ:</b> R_tđ = R₁ + R₂₃ = 6 + 3 = <b>9 Ω</b>.\`
    }
  ],
  social: [
    { id:'g9so1', tag:'LỊCH SỬ 9 - ĐIỆN BIÊN PHỦ', title:'Phân tích Ý nghĩa Lịch sử lừng lẫy của Chiến thắng Điện Biên Phủ 1954',
      problem:'Tại sao nói Chiến thắng Điện Biên Phủ "Lừng lẫy năm châu, chấn động địa cầu"?',
      solution:\`<b>1. Trong nước:</b> Đập tan hoàn toàn Kế hoạch Nava của Pháp - Mỹ, buộc Pháp ký Hiệp định Giơ-ne-vơ chấm dứt chiến tranh.<br><b>2. Thế giới:</b> Cổ vũ các dân tộc bị áp bức đứng lên đấu tranh giải phóng dân tộc trên toàn thế giới.\`
    }
  ]
};
`;

// ===== GRADE 10 =====
const g10_content = `// ===== BÀI MẪU LỚP 10 (CHUẨN GDPT 2018 & ĐẠT 9.5+) =====
window.SAMPLES_GRADE_10 = {
  math: [
    {
      id:'g10m1', tag:'HÀM SỐ BẬC HAII', title:'Khảo sát sự biến thiên hàm số y = x² − 4x + 3',
      problem:'Khảo sát sự biến thiên và vẽ đồ thị y = x² − 4x + 3.',
      solution:\`Đỉnh Parabol I(2; -1). Trục đối xứng x = 2.\`
    }
  ],
  literature: [
    {
      id:'g10l1', tag:'VĂN HỌC CỔ ĐIỂN', title:'Phân tích đoạn trích "Trao duyên" - Nguyễn Du',
      problem:'Phân tích đoạn trích "Trao duyên".',
      analysis_breakdown:\`<b style="color:#00f2fe;">Đỉnh cao nghệ thuật tả nội tâm:</b><p style="margin:4px 0 0;">Thúy Kiều giằng xé khi trao duyên cho em nhưng tâm hồn vẫn trọn vẹn dành cho Kim Trọng.</p>\`,
      full_essay:\`<b>MỞ BÀI:</b> "Trao duyên" thể hiện tấm lòng nhân đạo bao la của Nguyễn Du dành cho Thúy Kiều.\`
    }
  ],
  english: [
    {
      id:'g10e1', tag:'INVERSION STRUCTURES', title:'Inversion with Hardly... when / No sooner... than',
      problem:'Rewrite using Inversion: "As soon as he arrived home, it started to rain."',
      solution:\`<b>Structure:</b> No sooner + had + S + V3 + THAN + S + V2<br><b>Result:</b> "<b>No sooner had he arrived</b> home <b>than</b> it started to rain."\`
    }
  ],
  science: [
    {
      id:'g10s1', tag:'VẬT LÝ 10 - NƠ-TƠN', title:'Áp dụng Định luật II Nơ-tơn tính gia tốc a và lực F',
      problem:'Vật m = 2 kg chuyển động từ nghỉ dưới tác dụng của lực F không đổi. Sau 4 giây vật đạt vận tốc v = 8 m/s. Tính F.',
      solution:\`<b>1. Gia tốc:</b> a = (v − v₀) / t = (8 − 0) / 4 = 2 m/s².<br><b>2. Lực F:</b> F = m × a = 2 × 2 = <b>4 N</b>.\`
    }
  ],
  social: [
    {
      id:'g10so1', tag:'LỊCH SỬ 10 - BÌNH NGÔ ĐẠI CÁO', title:'Phân tích Tư tưởng Nhân nghĩa trong "Bình Ngô Đại Cáo" - Nguyễn Trãi',
      problem:'Định nghĩa tư tưởng nhân nghĩa của Nguyễn Trãi.',
      solution:\`"Yên dân" (lo cho cuộc sống bình yên của nhân dân) và "Trừ bạo" (diệt trừ giặc Minh xâm lược). Nhân nghĩa gắn liền với lòng tự hào dân tộc và chủ quyền đất nước.\`
    }
  ]
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'assets', 'samples_grade6.js'), g6_content, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'samples_grade7.js'), g7_content, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'samples_grade8.js'), g8_content, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'samples_grade9.js'), g9_content, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'samples_grade10.js'), g10_content, 'utf8');

console.log('🎉 Successfully enriched Grades 6 through 10 with English, Science, Social sample solutions!');
