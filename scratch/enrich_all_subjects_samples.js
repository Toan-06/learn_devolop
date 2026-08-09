const fs = require('fs');
const path = require('path');

// ===== GRADE 11 & 12 ENRICHMENT =====
const g11_12_path = path.join(__dirname, '..', 'assets', 'samples_grade11_12.js');

const g11_12_content = `// ===== BÀI MẪU LỚP 11 & LỚP 12 (ĐẠT CHUẨN THPT QUỐC GIA & HSG 9.5+) =====
window.SAMPLES_GRADE_11 = {
  math: [
    { id:'g11m1', tag:'GIỚI HẠN', title:'Tính lim(x→2) của (x²−4)/(x−2)',
      problem:'Tính giới hạn: L = lim(x→2) (x²−4)/(x−2)',
      solution:\`<b>Bước 1:</b> Phân tích tử thức thành nhân tử: x² − 4 = (x − 2)(x + 2)<br>
<b>Bước 2:</b> Khử dạng vô định (0/0) bằng cách rút gọn (x − 2):<br>
L = lim(x→2) [(x − 2)(x + 2) / (x − 2)] = lim(x→2) (x + 2)<br>
<b>Bước 3:</b> Thay x = 2 vào biểu thức đã rút gọn: L = 2 + 2 = <b>4</b>\`
    },
    { id:'g11m2', tag:'ĐẠO HÀM', title:'Tính đạo hàm f(x) = x³ − 3x² + 2x − 5',
      problem:"Tính f'(x) với hàm số f(x) = x³ − 3x² + 2x − 5",
      solution:\`Áp dụng công thức (xⁿ)' = n·xⁿ⁻¹ và (c·u)' = c·u':<br>
(x³)' = 3x²<br>
(−3x²)' = −6x<br>
(2x)' = 2<br>
(−5)' = 0<br>
→ Kết quả: <b>f'(x) = 3x² − 6x + 2</b>\`
    }
  ],
  literature: [
    { id:'g11l1', tag:'PHÂN TÍCH THƠ 9.5+', title:'Phân Tích Chi Tiết 3 Khổ Thơ "Đây Thôn Vĩ Dạ" - Hàn Mặc Tử',
      problem:'Phân tích chi tiết từng từ ngữ, biện pháp nghệ thuật và viết bài văn phân tích hoàn chỉnh bài thơ "Đây thôn Vĩ Dạ" của Hàn Mặc Tử.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;">Khổ 1: Bức tranh vườn Vĩ Dạ ban mai</b>
  <p style="margin:6px 0 0;line-height:1.7;">"Sao anh không về thăm thôn Vĩ?" — Lời trách móc nhẹ nhàng của người xứ Huế và lời tự vấn xót xa của Hàn Mặc Tử. "Nắng hàng cau nắng mới lên" gợi ánh nắng tinh khôi của bình minh hắt qua lá cau.</p>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b> Hàn Mặc Tử là ngôi sao kì dị và chói lọi nhất trên bầu trời Thơ Mới Việt Nam. Bài thơ "Đây thôn Vĩ Dạ" là bức tranh thiên nhiên tuyệt mỹ và khúc ca đắm thắm tha thiết tình người.\`
    }
  ],
  english: [
    { id:'g11e1', tag:'RELATIVE CLAUSES', title:'Combining sentences using Relative Pronouns (Who, Which, That)',
      problem:'Combine the two sentences: "The girl is sitting next to me. She is a talented pianist."',
      solution:\`<b>Analysis:</b> The subject "The girl" is a person, and "She" in the second sentence refers to "The girl".<br>
<b>Rule:</b> Use relative pronoun <b>"who"</b> to replace "She".<br>
<b>Result:</b> "The girl <b>who is sitting next to me</b> is a talented pianist."\`
    },
    { id:'g11e2', tag:'CONDITIONALS', title:'Mixed Conditionals Type 2 & 3 Explanation',
      problem:'Rewrite using Mixed Conditionals: "I didn\'t eat breakfast this morning, so I am hungry now."',
      solution:\`<b>Cause:</b> Past action ("didn't eat") → If-clause uses Past Perfect (Had + V3).<br>
<b>Effect:</b> Present result ("am hungry now") → Main clause uses Would + Verb.<br>
<b>Result:</b> "If I <b>had eaten</b> breakfast this morning, I <b>wouldn't be</b> hungry now."\`
    }
  ],
  science: [
    { id:'g11s1', tag:'VẬT LÝ 11 - ĐIỆN TÍCH', title:'Tính lực tương tác Cu-lông giữa 2 điện tích q₁ và q₂',
      problem:'Cho hai điện tích q₁ = 2×10⁻⁸ C, q₂ = -4×10⁻⁸ C đặt cách nhau r = 3 cm = 0,03 m trong chân không. Tính độ lớn lực Cu-lông F.',
      solution:\`<b>Công thức ĐL Cu-lông:</b> F = k · |q₁·q₂| / r²<br>
• k = 9×10⁹ N·m²/C²<br>
• |q₁·q₂| = |2×10⁻⁸ × (-4×10⁻⁸)| = 8×10⁻¹⁶ C²<br>
• r² = (0,03)² = 9×10⁻⁴ m²<br>
<b>Thay số:</b> F = (9×10⁹ × 8×10⁻¹⁶) / 9×10⁻⁴ = (72×10⁻⁷) / 9×10⁻⁴ = <b>8×10⁻³ N = 0,008 N</b>\`
    },
    { id:'g11s2', tag:'HÓA HỌC 11 - ANKAN', title:'Bài toán phản ứng thế Halogen của Ankan (Mêtan + Clo)',
      problem:'Viết phương trình phản ứng thế tỉ lệ 1:1 giữa CH₄ và Cl₂ khi chiếu sáng, gọi tên sản phẩm.',
      solution:\`<b>Phương trình phản ứng thế:</b><br>
CH₄ + Cl₂ $\\\\xrightarrow{ánh\\\\ sáng}$ CH₃Cl + HCl<br>
• CH₃Cl: Đọc tên là <b>Clorometan</b> (hoặc Metyl clorua).<br>
<b>Cơ chế:</b> Thế gốc tự do (SR), nguyên tử Cl thế 1 nguyên tử H trong CH₄.\`
    }
  ],
  social: [
    { id:'g11so1', tag:'LỊCH SỬ 11', title:'Phân tích Ý nghĩa Lịch sử của Cách mạng Tháng Mười Nga 1917',
      problem:'Phân tích ý nghĩa lịch sử của Cách mạng tháng Mười Nga năm 1917 đối với nước Nga và thế giới.',
      solution:\`<b>1. Đối với nước Nga:</b><br>
• Lần đầu tiên trong lịch sử, giai cấp công nhân và nhân dân lao động lên nắm chính quyền.<br>
• Đập tan ách áp bức của chế độ Phong kiến Nga hoàng và giai cấp tư sản.<br><br>
<b>2. Đối với thế giới:</b><br>
• Mở ra thời đại mới — Thời kỳ Lịch sử Thế giới Hiện đại.<br>
• Cổ vũ mạnh mẽ phong trào giải phóng dân tộc ở các nước thuộc địa (trong đó có Việt Nam).\`
    }
  ]
};

window.SAMPLES_GRADE_12 = {
  math: [
    { id:'g12m1', tag:'TÍCH PHÂN', title:'Tính ∫₀¹ x·eˣ dx bằng phương pháp tích phân từng phần',
      problem:'Tính tích phân xác định: I = ∫₀¹ x·eˣ dx',
      solution:\`Dùng phương pháp tích phân từng phần: ∫ u dv = u·v − ∫ v du<br>
<b>Đặt:</b> u = x ⇒ du = dx<br>
dv = eˣ dx ⇒ v = eˣ<br>
<b>Khi đó:</b> I = [x·eˣ]₀¹ − ∫₀¹ eˣ dx<br>
= (1·e¹ − 0·e⁰) − [eˣ]₀¹<br>
= e − (e¹ − e⁰) = e − e + 1 = <b>1</b>\`
    }
  ],
  literature: [
    { id:'g12l1', tag:'PHÂN TÍCH THƠ 9.5+', title:'Phân Tích Bức Tranh Thiên Nhiên & Hình Tượng Người Lính Tây Tiến - Quang Dũng',
      problem:'Phân tích hoàn chỉnh bài thơ "Tây Tiến" của Quang Dũng.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;">Thiên nhiên dữ dội & Hào hoa bi tráng</b>
  <p style="margin:6px 0 0;line-height:1.7;">"Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời" — Biện pháp nhân hóa hóm hỉnh "súng ngửi trời" thể hiện tinh thần kiên cường lạc quan của người chiến sĩ Hà Thành.</p>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b> "Tây Tiến" là tượng đài bất tử bằng thơ khắc họa chân dung thế hệ trẻ Việt Nam thời kỳ đầu kháng chiến chống Pháp.\`
    }
  ],
  english: [
    { id:'g12e1', tag:'PASSIVE VOICE ADVANCED', title:'Special Passive Structures (It is said that... / Causative Form)',
      problem:'Rewrite into Passive Voice: "People say that he won the lottery last night."',
      solution:\`<b>Form 1 (Impersonal Passive):</b> "It is said that he won the lottery last night."<br>
<b>Form 2 (Personal Passive):</b> "He is said <b>to have won</b> the lottery last night." (Use "to have V3" because the winning action happened in the past relative to "is said").\`
    },
    { id:'g12e2', tag:'ESSAY WRITING THPTQG', title:'Sample Paragraph: The Benefits of Higher Education',
      problem:'Write a paragraph (150-180 words) about the importance of going to university.',
      solution:\`<b>Topic Sentence:</b> Pursuing higher education plays a pivotal role in opening up numerous career opportunities and personal growth.<br>
<b>Body Points:</b><br>
1. Acquire specialized knowledge and practical skills.<br>
2. Broaden social networks and improve critical thinking.<br>
<b>Concluding Sentence:</b> In conclusion, university education serves as a solid stepping stone for young individuals to thrive in the modern world.\`
    }
  ],
  science: [
    { id:'g12s1', tag:'VẬT LÝ 12 - MẠCH RLC', title:'Tính trở kháng Z và dòng điện hiệu dụng I trong mạch RLC nối tiếp',
      problem:'Cho mạch RLC nối tiếp có R = 30 Ω, cảm kháng Z_L = 80 Ω, tụ điện Z_C = 40 Ω. Điện áp hiệu dụng U = 100 V. Tính I.',
      solution:\`<b>Bước 1:</b> Tính tổng trở Z của mạch:<br>
Z = √[R² + (Z_L − Z_C)²] = √[30² + (80 − 40)²] = √[900 + 1600] = √[2500] = <b>50 Ω</b><br>
<b>Bước 2:</b> Tính cường độ dòng điện hiệu dụng I:<br>
I = U / Z = 100 / 50 = <b>2 A</b>\`
    },
    { id:'g12s2', tag:'HÓA HỌC 12 - ESTE', title:'Bài toán phản ứng xà phòng hóa Este Đơn Chức',
      problem:'Cho 8,8g este X có công thức C₄H₈O₂ tác dụng vừa đủ với 100ml dung dịch NaOH 1M. Cô cạn dung dịch thu được m gram muối. Xác định tên X và m.',
      solution:\`<b>Bước 1:</b> Số mol NaOH = 0,1 × 1 = 0,1 mol.<br>
<b>Bước 2:</b> M_X = 8,8 / 0,1 = 88 g/mol (Phù hợp C₄H₈O₂).<br>
<b>Bước 3:</b> Vì n_este = n_NaOH = 0,1 mol ⇒ X là este đơn chức RCOOR'.<br>
Nếu X là Etyl axetat (CH₃COOC₂H₅):<br>
Muối thu được là CH₃COONa (M = 82 g/mol).<br>
⇒ Khối lượng muối m = 0,1 × 82 = <b>8,2g</b>.\`
    },
    { id:'g12s3', tag:'SINH HỌC 12 - ADN', title:'Bài toán tính chiều dài và số liên kết hiđrô của phân tử ADN',
      problem:'Một gen có tổng số nuclêôtit N = 3000, trong đó A = 600. Tính chiều dài L và số liên kết hiđrô H.',
      solution:\`<b>1. Chiều dài gen (L):</b> L = (N / 2) × 3,4 Å = (3000 / 2) × 3,4 = 1500 × 3,4 = <b>5100 Å = 510 nm</b>.<br>
<b>2. Theo nguyên tắc bổ sung:</b> A = T = 600 ⇒ G = X = (N/2) − A = 1500 − 600 = 900.<br>
<b>3. Số liên kết hiđrô (H):</b> H = 2A + 3G = 2(600) + 3(900) = 1200 + 2700 = <b>3900 liên kết</b>.\`
    }
  ],
  social: [
    { id:'g12so1', tag:'LỊCH SỬ 12 - CM T8', title:'Phân tích Nguyên nhân thắng lợi của Cách mạng Tháng Bảy 1945',
      problem:'Phân tích nguyên nhân chủ quan quyết định thắng lợi của Cách mạng tháng Tám năm 1945.',
      solution:\`<b>1. Sự lãnh đạo sáng suốt của Đảng & Chủ tịch Hồ Chí Minh:</b><br>
• Đường lối cách mạng đúng đắn, chớp thời cơ ngàn năm có một khi Nhật đầu hàng Đồng minh.<br><br>
<b>2. Khối đại đoàn kết toàn dân tộc:</b><br>
• Sự chuẩn bị chu đáo suốt 15 năm (1930 - 1945) qua 3 phong trào cách mạng lớn.<br>
• Mặt trận Việt Minh tập hợp mọi tầng lớp nhân dân yêu nước.\`
    },
    { id:'g12so2', tag:'ĐỊA LÝ 12 - TỰ NHIÊN', title:'Phân tích Đặc điểm Thiên Nhiên Nhiệt Đới Ẩm Gió Mùa Việt Nam',
      problem:'Tại sao khí hậu Việt Nam mang tính chất nhiệt đới ẩm gió mùa?',
      solution:\`<b>1. Tính chất Nhiệt đới:</b> Vị trí nằm trong vùng nội chí tuyến Bắc bán cầu → Góc chiếu lớn, tổng bức xạ dồi dào, nhiệt độ TB > 20°C.<br>
<b>2. Tính chất Ẩm:</b> Giáp biển Đông rộng lớn, các khối khí đi qua biển mang lại lượng mưa lớn (1500 - 2000 mm/năm).<br>
<b>3. Tính chất Gió mùa:</b> Nằm trong vùng hoạt động của gió mùa Đông Nam Á (Gió mùa mùa đông & Gió mùa mùa hạ).\`
    }
  ]
};
`;

fs.writeFileSync(g11_12_path, g11_12_content, 'utf8');
console.log('✅ Successfully expanded Grade 11 & 12 sample solutions with English, Science, Social!');
