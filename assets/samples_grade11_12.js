// ===== BÀI MẪU LỚP 11 & LỚP 12 (ĐẠT CHUẨN THPT QUỐC GIA & HSG 9.5+) =====
window.SAMPLES_GRADE_11 = {
  math: [
    { id:'g11m1', tag:'GIỚI HẠN', title:'Tính lim(x→2) của (x²−4)/(x−2)',
      problem:'Tính giới hạn: L = lim(x→2) (x²−4)/(x−2)',
      solution:`<b>Bước 1:</b> Phân tích tử thức thành nhân tử: x² − 4 = (x − 2)(x + 2)<br>
<b>Bước 2:</b> Khử dạng vô định (0/0) bằng cách rút gọn (x − 2):<br>
L = lim(x→2) [(x − 2)(x + 2) / (x − 2)] = lim(x→2) (x + 2)<br>
<b>Bước 3:</b> Thay x = 2 vào biểu thức đã rút gọn: L = 2 + 2 = <b>4</b>`
    },
    { id:'g11m2', tag:'ĐẠO HÀM', title:'Tính đạo hàm f(x) = x³ − 3x² + 2x − 5',
      problem:"Tính f'(x) với hàm số f(x) = x³ − 3x² + 2x − 5",
      solution:`Áp dụng công thức (xⁿ)' = n·xⁿ⁻¹ và (c·u)' = c·u':<br>
(x³)' = 3x²<br>
(−3x²)' = −6x<br>
(2x)' = 2<br>
(−5)' = 0<br>
→ Kết quả: <b>f'(x) = 3x² − 6x + 2</b>`
    },
    { id:'g11m3', tag:'ĐẠO HÀM', title:"Tính f'(x) = (2x+1)/(x−1)",
      problem:"Tính đạo hàm hàm số phân thức: f(x) = (2x+1)/(x−1)",
      solution:`Áp dụng công thức thương (u/v)' = (u'v − uv') / v²:<br>
u = 2x+1 → u' = 2<br>
v = x−1 → v' = 1<br>
f'(x) = [2(x−1) − (2x+1)(1)] / (x−1)² = (2x − 2 − 2x − 1) / (x−1)² = <b>−3 / (x−1)²</b>`
    },
    { id:'g11m4', tag:'CỰC TRỊ', title:"Tìm cực trị hàm số f(x) = x³ − 3x",
      problem:"Tìm các điểm cực trị và giá trị cực trị của hàm số f(x) = x³ − 3x",
      solution:`<b>1. TXĐ:</b> D = ℝ<br>
<b>2. Đạo hàm:</b> f'(x) = 3x² − 3. Cho f'(x) = 0 ⇔ 3(x² − 1) = 0 ⇔ x = 1 hoặc x = −1<br>
<b>3. Bảng xét dấu f'(x):</b><br>
- Qua x = −1, f'(x) đổi dấu từ dương (+) sang âm (−) → <b>x = −1 là điểm cực đại</b>. Giá trị cực đại y_CĐ = f(−1) = <b>2</b>.<br>
- Qua x = 1, f'(x) đổi dấu từ âm (−) sang dương (+) → <b>x = 1 là điểm cực tiểu</b>. Giá trị cực tiểu y_CT = f(1) = <b>−2</b>.`
    },
    { id:'g11m5', tag:'LƯỢNG GIÁC', title:'Giải phương trình: sin(2x) + cos(x) = 0',
      problem:'Giải phương trình lượng giác: sin(2x) + cos(x) = 0',
      solution:`Dùng công thức nhân đôi sin(2x) = 2sin(x)cos(x):<br>
2sin(x)cos(x) + cos(x) = 0 ⇔ cos(x)[2sin(x) + 1] = 0<br>
TH1: cos(x) = 0 ⇔ <b>x = π/2 + kπ (k ∈ ℤ)</b><br>
TH2: sin(x) = −1/2 ⇔ <b>x = −π/6 + k2π hoặc x = 7π/6 + k2π (k ∈ ℤ)</b>`
    }
  ],
  literature: [
    { id:'g11l1', tag:'PHÂN TÍCH THƠ Chi Tiết 9.5+', title:'Phân Tích Chi Tiết 3 Khổ Thơ "Đây Thôn Vĩ Dạ" - Hàn Mặc Tử',
      problem:'Phân tích chi tiết từng từ ngữ, biện pháp nghệ thuật và viết bài văn phân tích hoàn chỉnh bài thơ "Đây thôn Vĩ Dạ" của Hàn Mặc Tử.',
      analysis_breakdown:`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">Khổ 1: Bức tranh cảnh vườn Vĩ Dạ ban mai & Lời mời gọi tha thiết</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Sao anh không về thăm thôn Vĩ?"</b>: Câu hỏi tu từ vừa là lời trách móc nhẹ nhàng của người con gái Huế, vừa là lời tự vấn đầy khắc khoải của nhà thơ. Sử dụng thanh bằng chiếm ưu thế (6/7 tiếng) gợi giọng điệu êm dịu, tình tứ.</li>
    <li><b>"Nhìn nắng hàng cau nắng mới lên"</b>: Điệp từ <b>"nắng"</b> lặp lại hai lần kết hợp cụm từ <b>"nắng mới lên"</b> khắc họa ánh nắng ban mai tinh khôi, hắt qua các tàu cau xanh mướt còn đọng sương mai. Cây cau là cây cao nhất vườn, đón ánh nắng sớm nhất.</li>
    <li><b>"Vườn ai mướt quá xanh như ngọc"</b>: Từ láy <b>"mướt quá"</b> diễn tả vẻ đẹp óng ả, mượt mà, tràn đầy sức sống và hơi ướt đẫm sương đêm. Biện pháp so sánh <b>"xanh như ngọc"</b> tôn vinh vẻ đẹp sang trọng, trong trẻo của vườn sương Vĩ Dạ.</li>
    <li><b>"Lá trúc che ngang mặt chữ điền"</b>: Nghệ thuật cách điệu hóa hình ảnh con người xứ Huế. Nét mặt "chữ điền" phúc hậu, trung thực ẩn hiện sau cành trúc mềm mại tạo nét đẹp kín đáo, e ấp đặc trưng.</li>
  </ul>
</div>

<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">Khổ 2: Cảnh sông nước đêm trăng & Nỗi chia ly tan vỡ</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Gió theo lối gió, mây đường mây"</b>: Phép đối và nghệ thuật tách đôi hai hình ảnh vốn luôn đi liền (gió - mây). Điệp từ "lối gió", "đường mây" khẳng định sự chia rẽ, ngược dòng, tan vỡ của tình yêu.</li>
    <li><b>"Dòng nước buồn thiu, hoa hoa lay"</b>: Nhân hóa <b>"buồn thiu"</b> thổi tâm trạng u sầu của thi nhân vào dòng sông Hương. Từ láy <b>"hoa lay"</b> miêu tả nhịp chuyển động khẽ khàng càng nhấn mạnh sự vắng lặng chốn sông hồ.</li>
    <li><b>"Thuyền ai đậu bến sông trăng đó / Có chở trăng về kịp tối nay?"</b>: Đại từ mờ ảo <b>"ai"</b> tạo không gian mộng mơ. Động từ <b>"kịp"</b> bộc lộ niềm phấp phỏng, lo âu trước ranh giới ngắn ngủi của thời gian và sinh mệnh.</li>
  </ul>
</div>

<div style="background:rgba(234,179,8,0.05);padding:14px;border-radius:14px;border-left:4px solid #facc15;">
  <b style="color:#facc15;font-size:1.05rem;">Khổ 3: Hư ảo cõi mộng & Nỗi trăn trở nhân thế</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Mơ khách đường xa, khách đường xa"</b>: Điệp ngữ <b>"khách đường xa"</b> nhấn mạnh khoảng cách xa xôi diệu vợi giữa thực tại nghiệt ngã và cõi ước mơ mộng tưởng.</li>
    <li><b>"Áo em trắng quá nhìn không ra"</b>: Sắc trắng sương khói hư ảo, tượng trưng cho vẻ đẹp tinh khôi vượt ngoài tầm với.</li>
    <li><b>"Ở đây sương khói mờ nhân ảnh / Ai biết tình ai có đậm đà?"</b>: Cụm từ "mờ nhân ảnh" gợi cõi thực mộng đan xen. Câu hỏi kết bài trăn trở nỗi hoài nghi nhưng sâu xa là khát vọng mãnh liệt được gắn bó với cuộc đời.</li>
  </ul>
</div>`,
      full_essay:`<b>MỞ BÀI:</b>
"Văn học đối với tôi là một vật giải thoát, một cách để trò chuyện với chính mình trong những đêm dài cô quạnh." Thật vậy, nhà thơ Hàn Mặc Tử — ngôi sao kì dị và chói lọi nhất trên bầu trời Thơ Mới Việt Nam — đã trút toàn bộ nỗi đau đớn thể xác và tâm hồn vào những vần thơ đắm thắm, tha thiết nhất. Bài thơ "Đây thôn Vĩ Dạ" (rút trong tập "Dọc đường thi") được sáng tác khi nhà thơ đang điều trị căn bệnh phong quái ác tại trại Quy Hòa, sau khi nhận được tấm bưu thiếp vẽ cảnh sông nước xứ Huế của Hoàng Thị Kim Cúc. Bài thơ không chỉ là bức tranh thiên nhiên tuyệt mỹ mà còn là khúc ca tâm trạng trăn trở, tha thiết yêu cuộc sống đến khắc khoải của thi nhân.

<b>THÂN BÀI:</b>
Mở đầu bài thơ là câu hỏi dịu dàng dẫn dắt người đọc trở về với bức tranh vườn Vĩ Dạ tràn ngập ánh sáng ban mai:
"Sao anh không về thăm thôn Vĩ?
Nhìn nắng hàng cau nắng mới lên
Vườn ai mướt quá xanh như ngọc
Lá trúc che ngang mặt chữ điền."
Câu hỏi tu từ "Sao anh không về..." vang lên mang hai tầng ngữ nghĩa: vừa là lời trách móc yêu thương nhẹ nhàng của người thiếu nữ xứ Huế, vừa là lời tự vấn xót xa của chính Hàn Mặc Tử. Hình ảnh "nắng hàng cau nắng mới lên" miêu tả ánh nắng tinh khôi của buổi bình minh hắt trên những tàu cau còn vương sương sớm. Cau là loài cây cao nhất trong vườn, đón những tia nắng đầu tiên của ngày mới. Đặc biệt, từ láy "mướt quá" phối hợp cùng phép so sánh "xanh như ngọc" đã khắc họa vẻ đẹp óng ả, tươi tốt đến kiệt cùng của thiên nhiên xứ Huế. Hình ảnh con người "mặt chữ điền" ẩn sau "lá trúc che ngang" tạo nên nét đẹp phúc hậu, kín đáo và e ấp đầy thi vị.

Tuy nhiên, từ thế giới tràn ngập ánh sáng ở khổ thơ thứ nhất, cảm xúc thơ đột ngột lắng xuống gam màu trầm sầu, chia lìa ở khổ thứ hai:
"Gió theo lối gió, mây đường mây
Dòng nước buồn thiu, hoa hoa lay
Thuyền ai đậu bến sông trăng đó
Có chở trăng về kịp tối nay?"
Hình ảnh "gió theo lối gió, mây đường mây" sử dụng nghệ thuật đối lập và điệp từ để diễn tả sự rẽ đôi, ngược hướng. Trong tự nhiên, gió thổi thì mây bay, nhưng ở đây gió mây lại chia lìa đôi ngả như chính mối tình vô vọng của tác giả. Dòng sông Hương qua cái nhìn tâm tưởng trở thành "dòng nước buồn thiu", nhịp hoa lay khẽ khàng làm tăng thêm sự vắng lặng. Trăng xuất hiện như một người bạn tri kỷ duy nhất, nhưng câu hỏi "Có chở trăng về kịp tối nay?" với động từ "kịp" chứa đựng niềm phấp phỏng, cuống quýt trước sự ngắn ngủi của quỹ thời gian còn lại.

Đến khổ thơ cuối cùng, bài thơ chìm hoàn toàn vào cõi hư ảo của tâm tưởng:
"Mơ khách đường xa, khách đường xa
Áo em trắng quá nhìn không ra
Ở đây sương khói mờ nhân ảnh
Ai biết tình ai có đậm đà?"
Điệp ngữ "khách đường xa" lặp lại hai lần diễn tả khoảng cách diệu vợi, mờ mịt giữa Hàn Mặc Tử và người ngoài cõi sống. Hình ảnh "Áo em trắng quá nhìn không ra" là sắc trắng của hoài niệm, của sự trong sạch tinh khôi vượt ngoài tầm tay với. Bài thơ khép lại bằng câu hỏi nghi vấn "Ai biết tình ai có đậm đà?" chứa đựng nỗi trăn trở hoài nghi nhân thế, nhưng đằng sau sự hoài nghi ấy là một khát vọng mãnh liệt đến cháy lòng: khát vọng được yêu thương, được cảm thông và được sống trọn vẹn với cuộc đời.

<b>ĐÁNH GIÁ NGHỆ THUẬT & NỘI DUNG:</b>
Thành công của "Đây thôn Vĩ Dạ" đến từ bút pháp lãng mạn kết hợp cùng yếu tố tượng trưng, siêu thực độc đáo. Ngôn ngữ thơ tinh tế, giàu tính tạo hình và biểu cảm; hình ảnh thơ chuyển biến linh hoạt từ thực sang mộng, từ ánh sáng sang bóng tối. Bài thơ đã thể hiện trọn vẹn tình yêu thiên nhiên đất nước tha thiết và nỗi niềm khắc khoải của một tâm hồn thơ tài hoa nhưng bất hạnh.

<b>KẾT BÀI:</b>
"Nhà văn chết đi nhưng tác phẩm của ông thì sống mãi." Bài thơ "Đây thôn Vĩ Dạ" đã vượt qua thử thách của thời gian để trở thành một trong những bài thơ tình hay nhất của thi đàn Việt Nam. Khép lại trang thơ, hình ảnh bóng trăng thôn Vĩ và tiếng thở dài khắc khoải của Hàn Mặc Tử vẫn còn ngân vang mãi trong lòng người đọc nhiều thế hệ.`
    }
  ]
};

window.SAMPLES_GRADE_12 = {
  math: [
    { id:'g12m1', tag:'TÍCH PHÂN', title:'Tính ∫₀¹ x·eˣ dx',
      problem:'Tính tích phân xác định: I = ∫₀¹ x·eˣ dx',
      solution:`Dùng phương pháp tích phân từng phần: ∫ u dv = u·v − ∫ v du<br>
<b>Đặt:</b> u = x ⇒ du = dx<br>
dv = eˣ dx ⇒ v = eˣ<br>
<b>Khi đó:</b> I = [x·eˣ]₀¹ − ∫₀¹ eˣ dx<br>
= (1·e¹ − 0·e⁰) − [eˣ]₀¹<br>
= e − (e¹ − e⁰) = e − e + 1 = <b>1</b>`
    },
    { id:'g12m2', tag:'SỐ PHỨC', title:'Tính tích số phức (2 + 3i)(1 − i)',
      problem:'Tính tích hai số phức z = (2 + 3i)(1 − i) và xác định phần thực, phần ảo của z.',
      solution:`Áp dụng quy tắc nhân số phức và i² = −1:<br>
z = 2(1) + 2(−i) + 3i(1) + 3i(−i)<br>
= 2 − 2i + 3i − 3i²<br>
= 2 + i − 3(−1) = 2 + i + 3 = <b>5 + i</b><br>
→ Phần thực: <b>5</b>, Phần ảo: <b>1</b>`
    }
  ],
  literature: [
    { id:'g12l1', tag:'PHÂN TÍCH THƠ THPTQG 9.5+', title:'Phân Tích Hình Tượng Người Lính Tây Tiến Chi Tiết Từng Câu Thơ - Quang Dũng',
      problem:'Phân tích chi tiết từng từ ngữ, biện pháp nghệ thuật và bài văn mẫu hoàn chỉnh phân tích hình tượng người lính Tây Tiến trong bài thơ "Tây Tiến" của Quang Dũng.',
      analysis_breakdown:`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">Đoạn 1 & 2: Thiên nhiên Tây Bắc dữ dội & Nỗi nhớ lơ lửng</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Sông Mã xa rồi Tây Tiến ơi! / Nhớ về rừng núi nhớ chơi vơi"</b>: Câu cảm thán mở đầu vang lên tựa tiếng gọi tha thiết. Từ láy <b>"chơi vơi"</b> lặp lại kết hợp hiệp vần bằng gợi nỗi nhớ mênh mang, lơ lửng giữa không gian và kỷ niệm.</li>
    <li><b>"Dốc lên khúc khuỷu dốc thăm thẳm / Heo hút cồn mây súng ngửi trời"</b>: Điệp từ <b>"dốc"</b> cùng dãy từ láy tạo hình cực mạnh <b>"khúc khuỷu", "thăm thẳm", "heo hút"</b> khắc họa đèo cao chót vót, vực sâu thăm thẳm. Biện pháp nhân hóa hóm hỉnh <b>"súng ngửi trời"</b> miêu tả độ cao ngút ngàn và tinh thần lạc quan, tếu táo của người lính.</li>
    <li><b>"Ngàn thước lên cao, ngàn thước xuống / Nhà ai Pha Luông mưa xa khơi"</b>: Phép đối xứng "ngàn thước lên / ngàn thước xuống" ngắt nhịp 4/3 gấp gáp, câu sau hoàn toàn thanh bằng tạo sự thư thái nhẹ nhàng sau gian khổ.</li>
  </ul>
</div>

<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">Đoạn 3: Chân dung bi tráng của đoàn binh Tây Tiến</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>"Tây Tiến đoàn binh không mọc tóc / Quân xanh màu lá dữ oai hùm"</b>: Chi tiết tả thực nghiệt ngã <b>"không mọc tóc", "quân xanh màu lá"</b> phản ánh căn bệnh sốt xuất huyết rừng tàn khốc. Cụm từ <b>"đoàn binh"</b> và phép so sánh <b>"dữ oai hùm"</b> làm nổi bật khí thế oai phong lẫm liệt của chúa tể sơn lâm.</li>
    <li><b>"Mắt gửi mộng qua biên giới / Đêm mơ Hà Nội dáng kiều thơm"</b>: Tâm hồn lãng mạn hào hoa của thế hệ thanh niên trí thức Hà Thành. Cụm từ <b>"dáng kiều thơm"</b> là hình ảnh nốt trầm xao xuyến nơi đáy tim người lính.</li>
    <li><b>"Rải rác biên cương mồ xa xứ / Chiến trường đi chẳng tiếc đời xanh"</b>: Từ Hán Việt "biên cương", "xa xứ" tạo không khí trang trọng. Thành ngữ <b>"chẳng tiếc đời xanh"</b> khẳng định lý tưởng cống hiến tuổi trẻ cho đất nước.</li>
    <li><b>"Áo bào thay chiếu anh về đất / Sông Mã gầm lên khúc độc hành"</b>: Cách nói giảm nói tránh <b>"về đất"</b> làm nhẹ bớt nỗi đau hi sinh. Tiếng <b>"gầm"</b> của Sông Mã như khúc đại bác tử sĩ tiễn đưa người anh hùng.</li>
  </ul>
</div>`,
      full_essay:`<b>MỞ BÀI:</b>
"Thơ là sản phẩm của tình cảm, nhưng không phải là tình cảm bộc phát mà là tình cảm được ngưng đọng qua những rung động mãnh liệt nhất của tâm hồn." Bàn về thi ca kháng chiến, bài thơ "Tây Tiến" của Quang Dũng sừng sững như một tượng đài bất tử khắc họa hình tượng người lính thời kỳ đầu chống Pháp. Được sáng tác vào năm 1948 tại Phù Lưu Chanh khi nhà thơ chia tay đơn vị cũ, bài thơ là khúc ca lãng mạn, bi tráng ghi lại chân dung những người con ưu tú của Thủ đô đã dâng trọn tuổi xuân cho độc lập dân tộc.

<b>THÂN BÀI:</b>
Bức tranh thơ mở đầu bằng nỗi nhớ cuồn cuộn dâng trào về chốn đèo cao vực sâu Tây Bắc:
"Sông Mã xa rồi Tây Tiến ơi!
Nhớ về rừng núi nhớ chơi vơi."
Tiếng gọi "Tây Tiến ơi!" cất lên nghẹn ngào như hướng về người thân thiết. Từ láy "chơi vơi" kết hợp với phép điệp từ "nhớ" đã diễn tả xuất thần một nỗi nhớ lơ lửng, mênh mang, trôi nổi giữa cõi kỷ niệm. Nỗi nhớ ấy kéo theo khung cảnh thiên nhiên Tây Bắc dữ dội, hiểm trở:
"Dốc lên khúc khuỷu dốc thăm thẳm
Heo hút cồn mây súng ngửi trời
Ngàn thước lên cao, ngàn thước xuống
Nhà ai Pha Luông mưa xa khơi."
Bằng việc sử dụng mật độ dày đặc các từ láy giàu tính tạo hình như "khúc khuỷu", "thăm thẳm", "heo hút", Quang Dũng đã vẽ nên những cung đường đèo gập gềnh, chênh vệnh. Hình ảnh nhân hóa "súng ngửi trời" là một sáng tạo nghệ thuật độc đáo: nòng súng của người lính chạm đến mây trời, bộc lộ nét hóm hỉnh, yêu đời bất chấp gian nguy. Phép đối "ngàn thước lên cao, ngàn thước xuống" tạo nên nhịp điệu thơ gấp gáp, như bước chân ngắt nhịp của người lính trên đỉnh núi. Để rồi ngay sau đó, câu thơ hoàn toàn thanh bằng "Nhà ai Pha Luông mưa xa khơi" xoa dịu lòng người bằng một khung cảnh lãng mạn, dịu êm.

Nếu như hai khổ thơ đầu là khúc dạo đầu về thiên nhiên, thì đến khổ thứ ba, bức chân dung người lính Tây Tiến hiện lên trọn vẹn nét bi tráng và lãng mạn:
"Tây Tiến đoàn binh không mọc tóc
Quân xanh màu lá dữ oai hùm."
Quang Dũng đã tôn trọng sự thật lịch sử khi miêu tả cái đói, cái rét và bệnh sốt rét rừng tàn khốc qua hình ảnh "không mọc tóc", "quân xanh màu lá". Thế nhưng, nhà thơ không hề rơi vào bi lụy khi sử dụng các từ Hán Việt "đoàn binh" và phép ẩn dụ "dữ oai hùm" để khẳng định khí thế oai nghiêm, kiêu hãnh của đoàn quân.

Đằng sau nét gân guốc ngoài chiến trường là một tâm hồn vô cùng hào hoa, nhạy cảm:
"Mắt gửi mộng qua biên giới
Đêm mơ Hà Nội dáng kiều thơm."
Hình ảnh "dáng kiều thơm" đại diện cho những người con gái Hà Nội thanh lịch, là điểm tựa tinh thần tiếp thêm sức mạnh cho các chiến sĩ.

Sự hi sinh của họ được tác giả khắc họa bằng cảm hứng bi tráng tuyệt vời:
"Rải rác biên cương mồ xa xứ
Chiến trường đi chẳng tiếc đời xanh
Áo bào thay chiếu anh về đất
Sông Mã gầm lên khúc độc hành."
Cụm từ "chẳng tiếc đời xanh" là lời thề quyết tử cho Tổ quốc quyết sinh của thế hệ trẻ. Cách nói giảm nói tránh "về đất" biến cái chết thành sự trở về nhẹ nhàng trong lòng Mẹ Thiên Nhiên. Khúc gầm dữ dội của dòng sông Mã vang lên như tiếng kèn tiễn biệt hùng tráng, tôn vinh sự hi sinh cao cả của người lính.

<b>ĐÁNH GIÁ NGHỆ THUẬT & NỘI DUNG:</b>
Bài thơ thành công rực rỡ nhờ kết hợp bút pháp lãng mạn với chất bi tráng độc đáo. Ngôn ngữ thơ vừa hiện thực vừa đong đầy từ Hán Việt trang trọng; nhịp thơ biến hóa linh hoạt lúc gấp gáp, lúc êm dịu. "Tây Tiến" đã tạc nên tượng đài nghệ thuật bất tử về người lính Việt Nam thời kỳ đầu kháng chiến chống Pháp.

<b>KẾT BÀI:</b>
"Tác phẩm nghệ thuật chân chính bao giờ cũng mang giá trị vĩnh cửu." Trải qua hơn nửa thế kỷ, bài thơ "Tây Tiến" của Quang Dũng vẫn vẹn nguyên sức hút, làm rung động hàng triệu trái tim người đọc. Hình ảnh người lính Tây Tiến hào hoa, dũng cảm sẽ mãi là niềm tự hào và bài học sâu sắc về lòng yêu nước cho thế hệ trẻ hôm nay và mai sau.`
    },
    { id:'g12l2', tag:'PHÂN TÍCH TÁC PHẨM THPTQG 9.5+', title:'Phân Tích Ý Nghĩa Chi Tiết "Bát Cháo Hành" Trong Chí Phèo - Nam Cao',
      problem:'Phân tích chi tiết ý nghĩa nghệ thuật và giá trị nhân đạo của chi tiết bát cháo hành trong truyện ngắn "Chí Phèo" của Nam Cao.',
      analysis_breakdown:`
<div style="background:rgba(0,242,254,0.05);padding:14px;border-radius:14px;margin-bottom:14px;border-left:4px solid #00f2fe;">
  <b style="color:#00f2fe;font-size:1.05rem;">1. Ý nghĩa Hiện thực & Tình người (Bát cháo hành ấm áp)</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>Hoàn cảnh xuất hiện</b>: Sau đêm say rượu nằm ngoài bờ sông, Chí Phèo bị cảm nặng. Thị Nở thương tình nấu bát cháo hành mang sang cho Chí.</li>
    <li><b>Biểu tượng của Tình Thương</b>: Lần đầu tiên trong đời, Chí Phèo được một người chăm sóc mà không phải cướp giật hay dọa nạt. Bát cháo hành bốc khói nghi ngút là món quà đầu tiên và duy nhất của tình người giản dị mà Chí nhận được.</li>
  </ul>
</div>

<div style="background:rgba(168,85,247,0.05);padding:14px;border-radius:14px;border-left:4px solid #c084fc;">
  <b style="color:#c084fc;font-size:1.05rem;">2. Ý nghĩa Thức tỉnh Nhân tính & Bi kịch cự tuyệt</b>
  <ul style="margin:8px 0 0 18px;padding:0;line-height:1.8;">
    <li><b>Sự thức tỉnh nhân tính</b>: Bát cháo hành giúp Chí Phèo tỉnh rượu và tỉnh ngộ. Hương vị cháo hành đánh thức những cảm giác ngơ ngác, tiếc nuối tuổi trẻ và khát khao lương thiện: <i>"Hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao!"</i></li>
    <li><b>Nghệ thuật chi tiết đắt giá</b>: Chi tiết nhỏ làm nên nhà văn lớn. Bát cháo hành là chất xúc tác ngưng đọng bi kịch của Chí Phèo khi bị bà cô Thị Nở cự tuyệt, dẫn đến bước đường cùng của kiếp người bị tha hóa.</li>
  </ul>
</div>`,
      full_essay:`<b>MỞ BÀI:</b>
"Chi tiết nhỏ làm nên nhà văn lớn." Trong nghệ thuật truyện ngắn, có những chi tiết tưởng chừng như giản đơn nhưng lại mang sức chứa tư tưởng vô cùng lớn lao. Chi tiết "bát cháo hành" của Thị Nở trong kiệt tác "Chí Phèo" của Nam Cao chính là một chi tiết nghệ thuật thần kỳ như thế. Bát cháo hành bốc khói ấy không chỉ giải độc cho thể xác Chí Phèo sau trận cảm lạnh mà còn là chiếc chìa khóa vạn năng thức tỉnh phần nhân tính bị chôn vùi bấy lâu của một quỷ dữ làng Vũ Đại.

<b>THÂN BÀI:</b>
Chí Phèo từ một anh nông dân hiền lành, giàu tự trọng đã bị bàn tay tàn bạo của Bá Kiến và tù túng xã hội phong kiến biến thành con quỷ dữ. Hắn sống trong cơn say dài vô tận, rạch mặt ăn tăm, đập phá và làm tay sai cho kẻ thù. Thế nhưng, cuộc đời Chí đã ngoặt sang một hướng khác khi gặp Thị Nở — người phụ nữ xấu ma chê quỷ hờn ở làng Vũ Đại.

Sau đêm trăng ở bờ sông, Chí Phèo bị cảm nặng. Thị Nở thương tình chạy về nhà nấu cho Chí một bát cháo hành còn nghi ngút khói. Sự xuất hiện của bát cháo hành là một biến cố tâm lý to lớn đối với Chí Phèo. Lần đầu tiên trong đời, một kẻ chỉ biết cướp giật và dọa nạt lại được nhận sự chăm sóc hoàn toàn tự nguyện từ một người khác. Hắn thấy mắt mình "hình như ướn ướt" — những giọt nước mắt đầu tiên của niềm xúc động và sự ngạc nhiên.

Hương vị bát cháo hành đã làm bừng tỉnh mọi giác quan của Chí:
"Hắn thấy lòng nhẹ nhõm... Hắn thèm lương thiện, hắn muốn làm hòa với mọi người biết bao!"
Bát cháo hành không chỉ là liều thuốc chữa lành thể xác mà chính là hương vị của tình người — thứ ánh sáng duy nhất len lỏi vào tâm hồn tăm tối của Chí. Bát cháo ấy đánh thức khao khát có một mái ấm gia đình bình dị: chồng cày thuê cuốc mướn, vợ dệt vải.

Tuy nhiên, bát cháo hành cũng mở ra bi kịch đau đớn nhất đời Chí. Khi bị bà cô Thị Nở cự tuyệt vì "ai lại đi lấy đứa không cha không mẹ, chỉ biết rạch mặt ăn tăm", bát cháo hành trở thành kỷ niệm duy nhất kéo Chí về với thực tại phũ phàng. Hắn ôm mặt khóc vung vãi, rượu uống vào lại càng tỉnh ra, và hương vị cháo hành cứ thoang thoảng bay về như một sự tiếc nuối khôn nguôi. Cuối cùng, Chí Phèo đã cầm dao đến nhà Bá Kiến đâm chết hắn và tự sát để giữ vẹn phần nhân tính vừa mới hồi sinh.

<b>ĐÁNH GIÁ NGHỆ THUẬT & NỘI DUNG:</b>
Bằng bút pháp hiện thực phê phán sâu sắc, Nam Cao đã biến chi tiết bát cháo hành thành biểu tượng của giá trị nhân đạo cao cả: Dù con người có bị tha hóa đến đâu, phần bản chất lương thiện bên trong vẫn không bao giờ mất đi hoàn toàn, chỉ cần có tình thương chạm vào là sẽ bừng sáng.

<b>KẾT BÀI:</b>
Chi tiết bát cháo hành trong "Chí Phèo" đã khẳng định tài năng bậc thầy của Nam Cao trong việc miêu tả tâm lý nhân vật và sáng tạo chi tiết nghệ thuật. Hình ảnh bát cháo hành sẽ mãi mãi là biểu tượng ấm áp của tình người trong văn học dân tộc.`
    }
  ]
};
