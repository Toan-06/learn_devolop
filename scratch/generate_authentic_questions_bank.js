const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '..', 'questions');

// Specialized question generators for ALL subjects across Grades 1-12
const questionTemplates = {
    // ----------------------------------------------------
    // MATHEMATICS (TOÁN HỌC)
    // ----------------------------------------------------
    math: {
        grade1_5: [
            {
                q: (i) => `Cho phép tính: ${12 + i * 3} + ${15 + i * 2} = ?`,
                opts: (i) => [`${27 + i * 5}`, `${25 + i * 5}`, `${30 + i * 5}`, `${28 + i * 5}`],
                c: 0,
                exp: (i) => `Ta thực hiện cộng từ phải sang trái: (${12 + i * 3}) + (${15 + i * 2}) = ${27 + i * 5}.`
            },
            {
                q: (i) => `Một hình chữ nhật có chiều dài ${10 + i} cm và chiều rộng ${5 + i} cm. Diện tích hình chữ nhật đó là:`,
                opts: (i) => [`${(10 + i) * (5 + i)} cm²`, `${(10 + i) * 2 + (5 + i) * 2} cm²`, `${(10 + i) * (5 + i) + 10} cm²`, `${(10 + i) * 5} cm²`],
                c: 0,
                exp: (i) => `Diện tích hình chữ nhật = Chiều dài × Chiều rộng = ${10 + i} × ${5 + i} = ${(10 + i) * (5 + i)} cm².`
            },
            {
                q: (i) => `Tìm x biết: x × ${2 + (i % 5)} = ${20 + i * 4}`,
                opts: (i) => [`x = ${(20 + i * 4) / (2 + (i % 5))}`, `x = ${(20 + i * 4) - (2 + (i % 5))}`, `x = ${(20 + i * 4) + (2 + (i % 5))}`, `x = ${(20 + i * 4) * 2}`],
                c: 0,
                exp: (i) => `Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết: x = (${20 + i * 4}) : (${2 + (i % 5)}) = ${(20 + i * 4) / (2 + (i % 5))}.`
            }
        ],
        grade6_9: [
            {
                q: (i) => `Giải phương trình bậc hai: $x^2 - ${(5 + i)}x + ${(6 + i * 4)} = 0$`,
                opts: (i) => [
                    `$x_1 = 2$, $x_2 = ${3 + i}$`,
                    `$x_1 = 1$, $x_2 = ${5 + i}$`,
                    `$x_1 = -2$, $x_2 = -${3 + i}$`,
                    `Vô nghiệm`
                ],
                c: 0,
                exp: (i) => `Áp dụng công thức Vi-ét hoặc tính $\\Delta = b^2 - 4ac = (-${5 + i})^2 - 4(1)(${6 + i * 4})$. Nghiệm thu được là $x_1 = 2$ và $x_2 = ${3 + i}$.`
            },
            {
                q: (i) => `Cho tam giác ABC vuông tại A, biết AB = ${3 + i} cm, AC = ${4 + i} cm. Độ dài cạnh huyền BC là:`,
                opts: (i) => [
                    `$BC = \\sqrt{(${3 + i})^2 + (${4 + i})^2}$ cm`,
                    `$BC = ${7 + 2 * i}$ cm`,
                    `$BC = ${12 + i}$ cm`,
                    `$BC = \\sqrt{(${4 + i})^2 - (${3 + i})^2}$ cm`
                ],
                c: 0,
                exp: (i) => `Áp dụng định lý Pytago trong tam giác vuông ABC: $BC^2 = AB^2 + AC^2 \\Rightarrow BC = \\sqrt{(${3 + i})^2 + (${4 + i})^2}$ cm.`
            }
        ],
        grade10_12: [
            {
                q: (i) => `Tính đạo hàm của hàm số $y = x^3 - ${(3 + i)}x^2 + ${(2 + i)}x - 7$:`,
                opts: (i) => [
                    `$y' = 3x^2 - ${2 * (3 + i)}x + ${2 + i}$`,
                    `$y' = 3x^2 - ${(3 + i)}x + ${2 + i}$`,
                    `$y' = x^2 - ${2 * (3 + i)}x + 1$`,
                    `$y' = 3x^2 - ${2 * (3 + i)}x$`
                ],
                c: 0,
                exp: (i) => `Áp dụng công thức tính đạo hàm $(x^n)' = n \\cdot x^{n-1}$: $y' = 3x^2 - 2 \\cdot (${3 + i})x + (${2 + i})$.`
            },
            {
                q: (i) => `Trong không gian Oxyz, cho mặt phẳng $(P): ${(1 + i)}x - 2y + z - ${(5 + i)} = 0$. Vectơ pháp tuyến $\\vec{n}$ của $(P)$ là:`,
                opts: (i) => [
                    `$\\vec{n} = (${1 + i}; -2; 1)$`,
                    `$\\vec{n} = (${1 + i}; 2; 1)$`,
                    `$\\vec{n} = (1; -2; -${5 + i})$`,
                    `$\\vec{n} = (-${1 + i}; -2; -1)$`
                ],
                c: 0,
                exp: (i) => `Mặt phẳng có dạng $Ax + By + Cz + D = 0$ có vectơ pháp tuyến $\\vec{n} = (A; B; C) = (${1 + i}; -2; 1)$.`
            },
            {
                q: (i) => `Tính tích phân $I = \\int_0^1 (${2 + i}x + 1) dx$:`,
                opts: (i) => [
                    `$I = ${(2 + i) / 2 + 1}$`,
                    `$I = ${2 + i}$`,
                    `$I = ${(2 + i) + 1}$`,
                    `$I = 1$`
                ],
                c: 0,
                exp: (i) => ` Nguyên hàm của $f(x) = ${2 + i}x + 1$ là $F(x) = \\frac{${2 + i}}{2}x^2 + x$. Thế biên $0 \\to 1$: $F(1) - F(0) = \\frac{${2 + i}}{2} + 1 = ${(2 + i) / 2 + 1}$.`
            }
        ]
    },

    // ----------------------------------------------------
    // PHYSICS (VẬT LÝ)
    // ----------------------------------------------------
    physics: [
        {
            q: (i) => `Một vật dao động điều hòa theo phương trình $x = ${(4 + i)}\\cos(${2 + i}\\pi t + \\pi/3)$ (cm). Biên độ dao động của vật là:`,
            opts: (i) => [`$A = ${4 + i}$ cm`, `$A = ${2 + i}$ cm`, `$A = \\pi/3$ cm`, `$A = ${8 + 2 * i}$ cm`],
            c: 0,
            exp: (i) => `Phương trình dao động điều hòa có dạng $x = A\\cos(\\omega t + \\varphi)$, suy ra biên độ $A = ${4 + i}$ cm.`
        },
        {
            q: (i) => `Cho mạch điện xoay chiều RLC nối tiếp. Độ lệch pha $\\varphi$ giữa điện áp u và dòng điện i được tính theo công thức:`,
            opts: (i) => [
                `$\\tan\\varphi = \\frac{Z_L - Z_C}{R}$`,
                `$\\tan\\varphi = \\frac{R}{Z_L - Z_C}$`,
                `$\\cos\\varphi = \\frac{Z_L - Z_C}{R}$`,
                `$\\tan\\varphi = \\frac{Z_L + Z_C}{R}$`
            ],
            c: 0,
            exp: (i) => `Độ lệch pha $\\varphi$ giữa u và i xác định bởi công thức $\\tan\\varphi = \\frac{Z_L - Z_C}{R} = \\frac{\\omega L - \\frac{1}{\\omega C}}{R}$.`
        },
        {
            q: (i) => `Trong thí nghiệm Y-âng về giao thoa ánh sáng, khoảng vân $i$ được tính bằng công thức:`,
            opts: (i) => [
                `$i = \\frac{\\lambda D}{a}$`,
                `$i = \\frac{\\lambda a}{D}$`,
                `$i = \\frac{a D}{\\lambda}$`,
                `$i = \\lambda \\cdot D \\cdot a$`
            ],
            c: 0,
            exp: (i) => `Khoảng vân $i$ là khoảng cách giữa 2 vân sáng hoặc 2 vân tối liên tiếp: $i = \\frac{\\lambda D}{a}$.`
        }
    ],

    // ----------------------------------------------------
    // CHEMISTRY (HÓA HỌC)
    // ----------------------------------------------------
    chemistry: [
        {
            q: (i) => `Thủy phân hoàn toàn este $CH_3COOC_2H_5$ trong dung dịch $NaOH$ đun nóng thu được sản phẩm gồm:`,
            opts: (i) => [
                `$CH_3COONa$ và $C_2H_5OH$`,
                `$HCOONa$ và $C_3H_7OH$`,
                `$CH_3COOH$ và $C_2H_5ONa$`,
                `$CH_3COONa$ và $CH_3OH$`
            ],
            c: 0,
            exp: (i) => `Phương trình phản ứng xà phòng hóa: $CH_3COOC_2H_5 + NaOH \\xrightarrow{t^o} CH_3COONa + C_2H_5OH$.`
        },
        {
            q: (i) => `Chất nào sau đây thuộc loại đisaccarit?`,
            opts: (i) => [`Saccarozơ`, `Glucozơ`, `Tinh bột`, `Xenlulozơ`],
            c: 0,
            exp: (i) => `Saccarozơ ($C_{12}H_{22}O_{11}$) là đisaccarit. Glucozơ và Fructozơ là monosaccarit; Tinh bột và Xenlulozơ là polisaccarit.`
        },
        {
            q: (i) => `Kim loại nào sau đây có tính dẫn điện tốt nhất trong tất cả các kim loại?`,
            opts: (i) => [`Bạc (Ag)`, `Đồng (Cu)`, `Vàng (Au)`, `Nhôm (Al)`],
            c: 0,
            exp: (i) => `Thứ tự dẫn điện giảm dần của kim loại là: Bạc (Ag) > Đồng (Cu) > Vàng (Au) > Nhôm (Al) > Sắt (Fe).`
        }
    ],

    // ----------------------------------------------------
    // BIOLOGY (SINH HỌC)
    // ----------------------------------------------------
    biology: [
        {
            q: (i) => `Đơn phân cấu tạo nên phân tử ADN là:`,
            opts: (i) => [
                `Nucleotit (A, T, G, X)`,
                `Axit amin`,
                `Glucozơ`,
                `Axit béo`
            ],
            c: 0,
            exp: (i) => `ADN được cấu tạo theo nguyên tắc đa phân, đơn phân là các Nucleotit thuộc 4 loại: Adenin (A), Timin (T), Guanin (G), Xitôzin (X).`
        },
        {
            q: (i) => `Trong quá trình giảm phân, sự phân ly độc lập và tổ hợp tự do của các cặp nhiễm sắc thể diễn ra ở:`,
            opts: (i) => [
                `Kỳ sau I`,
                `Kỳ đầu II`,
                `Kỳ giữa II`,
                `Kỳ cuối II`
            ],
            c: 0,
            exp: (i) => `Ở Kỳ sau I của giảm phân, mỗi NST kép trong cặp tương đồng phân ly về hai cực của tế bào một cách độc lập và ngẫu nhiên.`
        }
    ],

    // ----------------------------------------------------
    // HISTORY (LỊCH SỬ)
    // ----------------------------------------------------
    history: [
        {
            q: (i) => `Chiến dịch lịch sử nào đã kết thúc thắng lợi cuộc kháng chiến chống Pháp của nhân dân Việt Nam năm 1954?`,
            opts: (i) => [
                `Chiến dịch Điện Biên Phủ`,
                `Chiến dịch Hồ Chí Minh`,
                `Chiến dịch Biên giới 1950`,
                `Chiến dịch Việt Bắc thu - đông 1947`
            ],
            c: 0,
            exp: (i) => `Thắng lợi của Chiến dịch Điện Biên Phủ (07/05/1954) đã buộc thực dân Pháp phải ký Hiệp định Giơ-ne-vơ phục hồi hòa bình ở Đông Dương.`
        },
        {
            q: (i) => `Đại hội đại biểu toàn quốc lần thứ VI của Đảng (12/1986) đã đề ra đường lối quan trọng nào?`,
            opts: (i) => [
                `Đường lối Đổi mới toàn diện đất nước`,
                `Hoàn thành cải cách ruộng đất`,
                `Tiến hành công nghiệp hóa xã hội chủ nghĩa`,
                `Khôi phục kinh tế sau chiến tranh`
            ],
            c: 0,
            exp: (i) => `Đại hội VI (12/1986) mở ra bước ngoặt lịch sử với đường lối Đổi mới toàn diện, trọng tâm là đổi mới kinh tế.`
        }
    ],

    // ----------------------------------------------------
    // GEOGRAPHY (ĐỊA LÝ)
    // ----------------------------------------------------
    geography: [
        {
            q: (i) => `Căn cứ vào Atlat Địa lý Việt Nam, khí hậu nước ta mang đặc điểm cốt lõi nào?`,
            opts: (i) => [
                `Nhiệt đới ẩm gió mùa, có sự phân hóa đa dạng`,
                `Ôn đới lục địa khắc nghiệt`,
                `Khí hậu sa mạc khô hạn`,
                `Cận nhiệt đới không có gió mùa`
            ],
            c: 0,
            exp: (i) => `Vị trí địa lý nội nhiệt đới khu vực châu Á gió mùa quy định tính chất nhiệt đới ẩm gió mùa của thiên nhiên Việt Nam.`
        },
        {
            q: (i) => `Vùng kinh tế nào sau đây dẫn đầu cả nước về giá trị sản xuất công nghiệp và thu hút vốn đầu tư nước ngoài (FDI)?`,
            opts: (i) => [
                `Đông Nam Bộ`,
                `Đồng bằng sông Hồng`,
                `Tây Nguyên`,
                `Đồng bằng sông Cửu Long`
            ],
            c: 0,
            exp: (i) => `Đông Nam Bộ (trọng tâm là TP.HCM, Bình Dương, Đồng Nai, Bà Rịa - Vũng Tàu) là vùng kinh tế phát triển năng động nhất cả nước.`
        }
    ],

    // ----------------------------------------------------
    // ECONOMICS & LAW (KINH TẾ & PHÁP LUẬT)
    // ----------------------------------------------------
    economics_law: [
        {
            q: (i) => `Theo Hiến pháp năm 2013, cơ quan nào sau đây đại diện cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất của nước Cộng hòa XHCN Việt Nam?`,
            opts: (i) => [
                `Quốc hội`,
                `Chính phủ`,
                `Tòa án nhân dân tối cao`,
                `Viện kiểm sát nhân dân tối cao`
            ],
            c: 0,
            exp: (i) => `Quốc hội là cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất, thực hiện quyền lập hiến và lập pháp.`
        },
        {
            q: (i) => `Trong nền kinh tế thị trường, quy luật giá trị yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên cơ sở nào?`,
            opts: (i) => [
                `Hao phí lao động xã hội cần thiết`,
                `Ý muốn chủ quan của người bán`,
                `Giá trị hàng hóa nhập khẩu`,
                `Quy định cố định của doanh nghiệp`
            ],
            c: 0,
            exp: (i) => `Quy luật giá trị yêu cầu sản xuất và lưu thông hàng hóa phải căn cứ vào hao phí lao động xã hội cần thiết.`
        }
    ],

    // ----------------------------------------------------
    // ENGLISH (TIẾNG ANH)
    // ----------------------------------------------------
    english: [
        {
            q: (i) => `She ________ to the library every weekend to borrow books.`,
            opts: (i) => [`goes`, `went`, `is going`, `has gone`],
            c: 0,
            exp: (i) => `Dấu hiệu "every weekend" chỉ hành động lặp đi lặp lại ở hiện tại (Hiện tại đơn), chủ ngữ "She" đi với động từ thêm "es" -> goes.`
        },
        {
            q: (i) => `If I ________ enough money, I would buy a new laptop for my online studies.`,
            opts: (i) => [`had`, `have`, `will have`, `had had`],
            c: 0,
            exp: (i) => `Câu điều kiện loại 2 (giả định không có thật ở hiện tại): Mệnh đề If dùng Quá khứ đơn (had), mệnh đề chính dùng would + V.`
        },
        {
            q: (i) => `Mark the word whose underlined part differs from the other three in pronunciation:`,
            opts: (i) => [`work<u>ed</u>`, `play<u>ed</u>`, `clean<u>ed</u>`, `stay<u>ed</u>`],
            c: 0,
            exp: (i) => `Đuôi "-ed" trong "worked" được phát âm là /t/ (vì kết thúc bằng âm /k/). Ba từ còn lại phát âm đuôi "-ed" là /d/.`
        }
    ],

    // ----------------------------------------------------
    // LITERATURE & VIETNAMESE (NGỮ VĂN / TIẾNG VIỆT)
    // ----------------------------------------------------
    literature: [
        {
            q: (i) => `Tác phẩm "Tây Tiến" của nhà thơ Quang Dũng được khắc họa trên nền hình tượng người lính thời kỳ nào?`,
            opts: (i) => [
                `Thời kỳ đầu cuộc kháng chiến chống Pháp`,
                `Thời kỳ kháng chiến chống Mỹ cứu nước`,
                `Thời kỳ chiến tranh biên giới 1979`,
                `Thời kỳ sau Đổi mới 1986`
            ],
            c: 0,
            exp: (i) => `Đoàn quân Tây Tiến được thành lập đầu năm 1947, hợp thành bởi nhiều tầng lớp thanh niên Hà Nội trong kháng chiến chống Pháp.`
        },
        {
            q: (i) => `Trong đoạn trích "Đất Nước" (trích trường ca "Mặt đường khát vọng"), Nguyễn Khoa Điềm đã thể hiện tư tưởng cốt lõi nào?`,
            opts: (i) => [
                `Đất Nước của Nhân dân`,
                `Đất Nước của các triều đại anh hùng`,
                `Đất Nước của cảnh đẹp danh thắng`,
                `Đất Nước của thơ ca dân gian`
            ],
            c: 0,
            exp: (i) => `Tư tưởng "Đất Nước của Nhân dân" là tư tưởng chủ đạo xuyên suốt đoạn trích Đất Nước của Nguyễn Khoa Điềm.`
        }
    ]
};

function generateAuthenticQuestions() {
    let replacedCount = 0;
    const grades = fs.readdirSync(questionsDir).filter(f => f.startsWith('grade_'));

    grades.forEach(gradeFolder => {
        const gradePath = path.join(questionsDir, gradeFolder);
        if (!fs.statSync(gradePath).isDirectory()) return;

        const files = fs.readdirSync(gradePath).filter(f => f.endsWith('.json'));

        files.forEach(file => {
            const filePath = path.join(gradePath, file);
            const subKey = file.replace('.json', '');

            try {
                let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (Array.isArray(data)) {
                    let fileModified = false;
                    data.forEach((q, idx) => {
                        // Check if question is boilerplate template
                        if (q.question.includes('nguyên lý cốt lõi') || q.question.includes('Câu hỏi chuẩn GDPT') || q.question.includes('Phương pháp học tập') || q.question.includes('Theo chương trình')) {
                            let tmplBank = null;
                            if (subKey.includes('math')) {
                                tmplBank = gradeFolder.includes('grade_12') || gradeFolder.includes('grade_11') || gradeFolder.includes('grade_10') 
                                    ? questionTemplates.math.grade10_12 
                                    : (gradeFolder.includes('grade_9') || gradeFolder.includes('grade_8') || gradeFolder.includes('grade_7') || gradeFolder.includes('grade_6'))
                                    ? questionTemplates.math.grade6_9 
                                    : questionTemplates.math.grade1_5;
                            } else if (subKey.includes('physics')) {
                                tmplBank = questionTemplates.physics;
                            } else if (subKey.includes('chem')) {
                                tmplBank = questionTemplates.chemistry;
                            } else if (subKey.includes('bio')) {
                                tmplBank = questionTemplates.biology;
                            } else if (subKey.includes('hist')) {
                                tmplBank = questionTemplates.history;
                            } else if (subKey.includes('geo')) {
                                tmplBank = questionTemplates.geography;
                            } else if (subKey.includes('eco') || subKey.includes('law')) {
                                tmplBank = questionTemplates.economics_law;
                            } else if (subKey.includes('eng')) {
                                tmplBank = questionTemplates.english;
                            } else if (subKey.includes('lit') || subKey.includes('viet')) {
                                tmplBank = questionTemplates.literature;
                            } else if (subKey.includes('natural') || subKey.includes('science')) {
                                tmplBank = [...questionTemplates.physics, ...questionTemplates.chemistry, ...questionTemplates.biology];
                            } else if (subKey.includes('history_geography')) {
                                tmplBank = [...questionTemplates.history, ...questionTemplates.geography];
                            }

                            if (tmplBank && tmplBank.length > 0) {
                                const tmpl = tmplBank[idx % tmplBank.length];
                                q.question = tmpl.q(idx);
                                q.options = tmpl.opts(idx);
                                q.correct = tmpl.c;
                                q.explain = tmpl.exp(idx);
                                replacedCount++;
                                fileModified = true;
                            }
                        }
                    });

                    if (fileModified) {
                        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                    }
                }
            } catch (err) {
                console.error(`Error replacing in ${filePath}:`, err.message);
            }
        });
    });

    console.log(`\n🎉 Successfully replaced ${replacedCount} boilerplate questions across all subjects!`);
}

generateAuthenticQuestions();
