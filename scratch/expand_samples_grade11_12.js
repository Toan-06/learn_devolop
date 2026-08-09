const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'samples_grade11_12.js');

const fileContent = `// ===== BÀI MẪU LỚP 11 & LỚP 12 (ĐẠT CHUẨN THPT QUỐC GIA & HSG 9.5+) =====
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
    },
    { id:'g11m3', tag:'ĐẠO HÀM', title:"Tính f'(x) = (2x+1)/(x−1)",
      problem:"Tính đạo hàm hàm số phân thức: f(x) = (2x+1)/(x−1)",
      solution:\`Áp dụng công thức thương (u/v)' = (u'v − uv') / v²:<br>
u = 2x+1 → u' = 2<br>
v = x−1 → v' = 1<br>
f'(x) = [2(x−1) − (2x+1)(1)] / (x−1)² = (2x − 2 − 2x − 1) / (x−1)² = <b>−3 / (x−1)²</b>\`
    },
    { id:'g11m4', tag:'CỰC TRỊ', title:"Tìm cực trị hàm số f(x) = x³ − 3x",
      problem:"Tìm các điểm cực trị và giá trị cực trị của hàm số f(x) = x³ − 3x",
      solution:\`<b>1. TXĐ:</b> D = ℝ<br>
<b>2. Đạo hàm:</b> f'(x) = 3x² − 3. Cho f'(x) = 0 ⇔ 3(x² − 1) = 0 ⇔ x = 1 hoặc x = −1<br>
<b>3. Bảng xét dấu f'(x):</b><br>
- Qua x = −1, f'(x) đổi dấu từ dương (+) sang âm (−) → <b>x = −1 là điểm cực đại</b>. Giá trị cực đại y_CĐ = f(−1) = <b>2</b>.<br>
- Qua x = 1, f'(x) đổi dấu từ âm (−) sang dương (+) → <b>x = 1 là điểm cực tiểu</b>. Giá trị cực tiểu y_CT = f(1) = <b>−2</b>.\`
    },
    { id:'g11m5', tag:'LƯỢNG GIÁC', title:'Giải phương trình: sin(2x) + cos(x) = 0',
      problem:'Giải phương trình lượng giác: sin(2x) + cos(x) = 0',
      solution:\`Dùng công thức nhân đôi sin(2x) = 2sin(x)cos(x):<br>
2sin(x)cos(x) + cos(x) = 0 ⇔ cos(x)[2sin(x) + 1] = 0<br>
TH1: cos(x) = 0 ⇔ <b>x = π/2 + kπ (k ∈ ℤ)</b><br>
TH2: sin(x) = −1/2 ⇔ <b>x = −π/6 + k2π hoặc x = 7π/6 + k2π (k ∈ ℤ)</b>\`
    }
  ],
  literature: [
    { id:'g11l1', tag:'PHÂN TÍCH THƠ Chi Tiết 9.5+', title:'Phân Tích Chi Tiết 3 Khổ Thơ "Đây Thôn Vĩ Dạ" - Hàn Mặc Tử',
      problem:'Phân tích chi tiết từng từ ngữ, biện pháp nghệ thuật và viết bài văn phân tích hoàn chỉnh bài thơ "Đây thôn Vĩ Dạ" của Hàn Mặc Tử.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">Khổ 1: Bức tranh cảnh vườn Vĩ Dạ ban mai & Lời mời gọi tha thiết</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Sao anh không về thăm thôn Vĩ?"</b>: Câu hỏi tu từ vừa là lời trách móc nhẹ nhàng của người con gái Huế, vừa là lời tự vấn đầy khắc khoải của nhà thơ. Sử dụng thanh bằng chiếm ưu thế (6/7 tiếng) gợi giọng điệu êm dịu, tình tứ.</li>
    <li><b>"Nhìn nắng hàng cau nắng mới lên"</b>: Điệp từ <b>"nắng"</b> lặp lại hai lần kết hợp cụm từ <b>"nắng mới lên"</b> khắc họa ánh nắng ban mai tinh khôi, hắt qua các tàu cau xanh mướt còn đọng sương mai. Cây cau là cây cao nhất vườn, đón ánh nắng sớm nhất.</li>
    <li><b>"Vườn ai mướt quá xanh như ngọc"</b>: Từ láy <b>"mướt quá"</b> diễn tả vẻ đẹp óng ả, mượt mà, tràn đầy sức sống và hơi ướt đẫm sương đêm. Biện pháp so sánh <b>"xanh như ngọc"</b> tôn vinh vẻ đẹp sang trọng, trong trẻo của vườn sương Vĩ Dạ.</li>
    <li><b>"Lá trúc che ngang mặt chữ điền"</b>: Nghệ thuật cách điệu hóa hình ảnh con người xứ Huế. Nét mặt "chữ điền" phúc hậu, trung thực ẩn hiện sau cành trúc mềm mại tạo nét đẹp kín đáo, e ấp đặc trưng.</li>
  </ul>
</div>`,
      full_essay:\`<b>MỞ BÀI:</b>
"Văn học đối với tôi là một vật giải thoát, một cách để trò chuyện với chính mình trong những đêm dài cô quạnh." Thật vậy, nhà thơ Hàn Mặc Tử — ngôi sao kì dị và chói lọi nhất trên bầu trời Thơ Mới Việt Nam — đã trút toàn bộ nỗi đau đớn thể xác và tâm hồn vào những vần thơ đắm thắm, tha thiết nhất. Bài thơ "Đây thôn Vĩ Dạ" (rút trong tập "Dọc đường thi") được sáng tác khi nhà thơ đang điều trị căn bệnh phong quái ác tại trại Quy Hòa.

<b>THÂN BÀI:</b>
Mở đầu bài thơ là câu hỏi dịu dàng dẫn dắt người đọc trở về với bức tranh vườn Vĩ Dạ tràn ngập ánh sáng ban mai:
"Sao anh không về thăm thôn Vĩ?
Nhìn nắng hàng cau nắng mới lên
Vườn ai mướt quá xanh như ngọc
Lá trúc che ngang mặt chữ điền."
Câu hỏi tu từ "Sao anh không về..." vang lên mang hai tầng ngữ nghĩa: vừa là lời trách móc yêu thương nhẹ nhàng của người thiếu nữ xứ Huế, vừa là lời tự vấn xót xa của chính Hàn Mặc Tử.

<b>KẾT BÀI:</b>
Bài thơ "Đây thôn Vĩ Dạ" đã vượt qua thử thách của thời gian để trở thành một trong những bài thơ tình hay nhất của thi đàn Việt Nam.\`
    },
    { id:'g11l2', tag:'PHÂN TÍCH THƠ 9.5+', title:'Phân Tích Khát Vọng Sống "Vội Vàng" - Xuân Diệu',
      problem:'Phân tích triết lý nhân sinh và khát vọng sống vội vàng, cuống quýt trong bài thơ "Vội Vàng" của Xuân Diệu.',
      analysis_breakdown:\`
<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">Khát vọng đoạt quyền thiên nhiên & Bữa tiệc trần gian</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Tôi muốn tắt nắng đi / Cho màu đừng nhạt mất / Tôi muốn buộc gió lại / Cho hương đừng bay đi"</b>: Ước muốn táo bạo, phi lý nhưng thể hiện lòng yêu cuộc sống đến cuồng nhiệt. Điệp từ "Tôi muốn" đoạt lấy quyền năng vũ trụ để giữ lại hương sắc tươi trẻ.</li>
    <li><b>"Của ong bướm này đây tuần tháng mật..."</b>: Điệp từ "này đây" lặp lại rồn dập như bày ra trước mắt người đọc một thiên đường ngay trên mặt đất.</li>
  </ul>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b>
Xuân Diệu — "nhà thơ mới nhất trong các nhà thơ mới" — đã đem đến cho thi đàn Việt Nam một làn gió rạo rực, đắm say. Bài thơ "Vội Vàng" là tuyên ngôn nghệ thuật và triết lý sống gấp gáp, trân trọng từng phút giây của tuổi trẻ.

<b>THÂN BÀI:</b>
Mở đầu bài thơ là ước muốn táo bạo đoạt lấy quyền năng thiên nhiên:
"Tôi muốn tắt nắng đi
Cho màu đừng nhạt mất
Tôi muốn buộc gió lại
Cho hương đừng bay đi."
Điệp ngữ "Tôi muốn" cất lên mạnh mẽ. Xuân Diệu không tìm thiên đường ở cõi bồng lai hư vô mà khẳng định thiên đường nằm ngay trên mặt đất trong từng khoảnh khắc hiện tại.

<b>KẾT BÀI:</b>
"Vội Vàng" truyền cảm hứng mãnh liệt cho tuổi trẻ về thái độ sống chủ động, biết cống hiến và trân quý từng giây phút thanh xuân.\`
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
    },
    { id:'g12m2', tag:'SỐ PHỨC', title:'Tính tích số phức z = (2 + 3i)(1 − i)',
      problem:'Tính tích hai số phức z = (2 + 3i)(1 − i) và xác định phần thực, phần ảo của z.',
      solution:\`Áp dụng quy tắc nhân số phức và i² = −1:<br>
z = 2(1) + 2(−i) + 3i(1) + 3i(−i)<br>
= 2 − 2i + 3i − 3i²<br>
= 2 + i − 3(−1) = 2 + i + 3 = <b>5 + i</b><br>
→ Phần thực: <b>5</b>, Phần ảo: <b>1</b>\`
    },
    { id:'g12m3', tag:'HÌNH HỌC OXYZ', title:'Viết phương trình mặt phẳng (P) đi qua M(1;2;3) và có VTPT n = (2;-1;4)',
      problem:'Viết phương trình mặt phẳng (P) đi qua điểm M(1;2;3) và vuông góc với đường thẳng d có VTPT \\vec{n} = (2;-1;4).',
      solution:\`Phương trình mặt phẳng đi qua M(x₀,y₀,z₀) có VTPT \\vec{n}=(A,B,C):<br>
A(x − x₀) + B(y − y₀) + C(z − z₀) = 0<br>
2(x − 1) − 1(y − 2) + 4(z − 3) = 0<br>
⇔ 2x − 2 − y + 2 + 4z − 12 = 0<br>
⇔ <b>2x − y + 4z − 12 = 0</b>\`
    },
    { id:'g12m4', tag:'THỂ TÍCH', title:'Tính thể tích khối chóp S.ABC có đáy là tam giác vuông',
      problem:'Cho hình chóp S.ABC có SA ⊥ (ABC), SA = 6cm. Tam giác ABC vuông tại B có AB = 3cm, BC = 4cm. Tính thể tích V của khối chóp.',
      solution:\`<b>Bước 1:</b> Diện tích đáy S_ABC = 1/2 · AB · BC = 1/2 · 3 · 4 = 6 cm²<br>
<b>Bước 2:</b> Chiều cao h = SA = 6 cm<br>
<b>Bước 3:</b> Thể tích V = 1/3 · S_đáy · h = 1/3 · 6 · 6 = <b>12 cm³</b>\`
    }
  ],
  literature: [
    { id:'g12l1', tag:'PHÂN TÍCH THƠ THPTQG 9.5+', title:'Phân Tích Hình Tượng Người Lính Tây Tiến Chi Tiết Từng Câu Thơ - Quang Dũng',
      problem:'Phân tích chi tiết từng từ ngữ, biện pháp nghệ thuật và bài văn mẫu hoàn chỉnh phân tích hình tượng người lính Tây Tiến trong bài thơ "Tây Tiến" của Quang Dũng.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">Đoạn 1 & 2: Thiên nhiên Tây Bắc dữ dội & Nỗi nhớ lơ lửng</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Sông Mã xa rồi Tây Tiến ơi! / Nhớ về rừng núi nhớ chơi vơi"</b>: Câu cảm thán mở đầu vang lên tựa tiếng gọi tha thiết. Từ láy <b>"chơi vơi"</b> lặp lại kết hợp hiệp vần bằng gợi nỗi nhớ mênh mang, lơ lửng giữa không gian và kỷ niệm.</li>
    <li><b>"Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời"</b>: Điệp từ <b>"dốc"</b> cùng dãy từ láy tạo hình cực mạnh <b>"khúc khuỷu", "thăm thẳm", "heo hút"</b> khắc họa đèo cao chót vót. Biện pháp nhân hóa hóm hỉnh <b>"súng ngửi trời"</b> miêu tả độ cao ngút ngàn và tinh thần lạc quan của người lính.</li>
  </ul>
</div>
<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">Đoạn 3: Chân dung bi tráng của đoàn binh Tây Tiến</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm"</b>: Chi tiết tả thực nghiệt ngã <b>"không mọc tóc", "quân xanh màu lá"</b> phản ánh căn bệnh sốt xuất huyết rừng tàn khốc. Cụm từ <b>"đoàn binh"</b> và phép so sánh <b>"dữ oai hùm"</b> làm nổi bật khí thế oai phong lẫm liệt.</li>
    <li><b>"Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành"</b>: Cách nói giảm nói tránh <b>"về đất"</b> làm nhẹ bớt nỗi đau hi sinh. Tiếng <b>"gầm"</b> của Sông Mã như khúc đại bác tử sĩ tiễn đưa người anh hùng.</li>
  </ul>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b>
"Thơ là sản phẩm của tình cảm, nhưng không phải là tình cảm bộc phát mà là tình cảm được ngưng đọng qua những rung động mãnh liệt nhất của tâm hồn." Bàn về thi ca kháng chiến, bài thơ "Tây Tiến" của Quang Dũng sừng sững như một tượng đài bất tử khắc họa hình tượng người lính thời kỳ đầu chống Pháp.

<b>THÂN BÀI:</b>
Bức tranh thơ mở đầu bằng nỗi nhớ cuồn cuộn dâng trào về chốn đèo cao vực sâu Tây Bắc:
"Sông Mã xa rồi Tây Tiến ơi!
Nhớ về rừng núi nhớ chơi vơi."
Tiếng gọi "Tây Tiến ơi!" cất lên nghẹn ngào như hướng về người thân thiết. Từ láy "chơi vơi" kết hợp với phép điệp từ "nhớ" đã diễn tả xuất thần một nỗi nhớ lơ lửng, mênh mang.

Đoạn thơ khắc họa khí thế hiên ngang bi tráng:
"Tây Tiến đoàn binh không mọc tóc
Quân xanh màu lá dữ oai hùm
Mắt gửi mộng qua biên giới
Đêm mơ Hà Nội dáng kiều thơm."
Hình ảnh "dáng kiều thơm" là điểm tựa tinh thần hào hoa nuôi dưỡng tâm hồn người chiến sĩ Thủ đô.

<b>KẾT BÀI:</b>
Bài thơ "Tây Tiến" của Quang Dũng đã vượt qua thử thách của thời gian để trở thành một trong những kiệt tác xuất sắc nhất của thơ ca cách mạng Việt Nam.\`
    },
    { id:'g12l2', tag:'PHÂN TÍCH TÁC PHẨM THPTQG 9.5+', title:'Phân Tích Chi Tiết "Bát Cháo Hành" Trong Chí Phèo - Nam Cao',
      problem:'Phân tích chi tiết ý nghĩa nghệ thuật và giá trị nhân đạo của chi tiết bát cháo hành trong truyện ngắn "Chí Phèo" của Nam Cao.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">1. Ý nghĩa Hiện thực & Tình người (Bát cháo hành ấm áp)</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>Biểu tượng của Tình Thương</b>: Lần đầu tiên trong đời, Chí Phèo được một người chăm sóc mà không phải cướp giật hay dọa nạt. Bát cháo hành bốc khói nghi ngút là món quà đầu tiên và duy nhất của tình người giản dị mà Chí nhận được.</li>
  </ul>
</div>
<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">2. Ý nghĩa Thức tỉnh Nhân tính & Bi kịch cự tuyệt</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>Sự thức tỉnh nhân tính</b>: Bát cháo hành giúp Chí Phèo tỉnh rượu và tỉnh ngộ. Hương vị cháo hành đánh thức những cảm giác ngơ ngác, tiếc nuối tuổi trẻ và khát khao lương thiện: <i>"Hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao!"</i></li>
  </ul>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b>
"Chi tiết nhỏ làm nên nhà văn lớn." Trong nghệ thuật truyện ngắn, chi tiết "bát cháo hành" của Thị Nở trong kiệt tác "Chí Phèo" của Nam Cao chính là một chi tiết nghệ thuật thần kỳ.

<b>THÂN BÀI:</b>
Sự xuất hiện của bát cháo hành là một biến cố tâm lý to lớn đối với Chí Phèo. Lần đầu tiên trong đời, một kẻ chỉ biết cướp giật lại được nhận sự chăm sóc hoàn toàn tự nguyện. Hắn thấy mắt mình "hình như ướn ướt" — giọt nước mắt đầu tiên của niềm xúc động.

Hương vị bát cháo hành đã làm bừng tỉnh mọi giác quan của Chí:
"Hắn thấy lòng nhẹ nhõm... Hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao!"

<b>KẾT BÀI:</b>
Chi tiết bát cháo hành đã khẳng định tài năng bậc thầy của Nam Cao và tôn vinh sức mạnh cảm hóa kỳ diệu của tình người.\`
    },
    { id:'g12l3', tag:'PHÂN TÍCH THƠ 9.5+', title:'Phân Tích Tư Tưởng "Đất Nước Của Nhân Dân" - Nguyễn Khoa Điềm',
      problem:'Phân tích tư tưởng cốt lõi "Đất Nước của Nhân dân" được thể hiện trong đoạn trích "Đất Nước" (Mặt đường khát vọng) của Nguyễn Khoa Điềm.',
      analysis_breakdown:\`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">Sự cảm nhận Đất Nước trên các bình diện Lịch sử, Địa lý & Văn hóa</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>Về Địa lý</b>: Những núi Hòn Vọng Phu, hòn Trống Mái, núi Bút non Nghiên đều do những người dân bình dị hóa thân mà thành.</li>
    <li><b>Về Lịch sử</b>: "Để Đất Nước này là Đất Nước Nhân dân" — chính hàng triệu người vô danh đã chiến đấu và ngã xuống bảo vệ chủ quyền.</li>
  </ul>
</div>\`,
      full_essay:\`<b>MỞ BÀI:</b>
Đoạn trích "Đất Nước" của Nguyễn Khoa Điềm là một trong những áng thơ xuất sắc nhất viết về đề tài Tổ quốc. Tác giả đã đem đến một cái nhìn mới mẻ: Đất Nước không của riêng các triều đại hay anh hùng mà là "Đất Nước của Nhân dân".

<b>THÂN BÀI:</b>
Nguyễn Khoa Điềm định nghĩa Đất Nước bắt đầu từ những điều vô cùng gần gũi:
"Đất Nước bắt đầu với miếng trầu bây giờ bà ăn
Đất Nước lớn lên khi dân mình biết trồng tre mà đánh giặc."
Sự hóa thân của Nhân dân vào danh lam thắng cảnh khắp ba miền đất nước đã tạo nên diện mạo tâm hồn Việt Nam.

<b>KẾT BÀI:</b>
Tư tưởng "Đất Nước của Nhân dân" khơi dậy lòng tự hào dân tộc và trách nhiệm gắn bó của mỗi thế hệ học sinh đối với sự nghiệp xây dựng đất nước.\`
    }
  ]
};
`;

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('✅ Successfully expanded samples_grade11_12.js!');
