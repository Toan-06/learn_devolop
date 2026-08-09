const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '..', 'questions');

const difficultyList = ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'];

const topicMap = {
    'math': ['Đại Số & Giải Tích', 'Hình Học', 'Số Học & Phép Tính', 'Hàm Số & Đồ Thị', 'Phương Trình & Bất Phương Trình'],
    'vietnamese': ['Tập Đọc & Đọc Hiểu', 'Luyện Từ & Câu', 'Chính Tả & Ngữ Pháp', 'Tập Làm Văn'],
    'english': ['Vocabulary & Topics', 'Grammar & Structure', 'Phonetics & Pronunciation', 'Reading Comprehension'],
    'literature': ['Đọc Hiểu Tác Phẩm', 'Nghị Luận Văn Học', 'Tiếng Việt & Phong Cách', 'Nghị Luận Xã Hội'],
    'natural_science': ['Vật Lý - Cơ Học', 'Hóa Học - Chất & Biến Đổi', 'Sinh Học - Cơ Thể Sống', 'Trái Đất & Bầu Trời'],
    'history_geography': ['Lịch Sử Việt Nam', 'Lịch Sử Thế Giới', 'Địa Lý Tự Nhiên', 'Địa Lý Dân Cư & Kinh Tế'],
    'physics': ['Cơ Học & Chuyển Động', 'Điện Học & Từ Trường', 'Quang Học', 'Vật Lý Hạt Nhân & Năng Lượng'],
    'chemistry': ['Hóa Học Vô Cơ', 'Hóa Học Hữu Cơ', 'Phản Ứng Hóa Học', 'Bảng Tuần Hoàn & Cấu Tạo Nguyên Tử'],
    'biology': ['Di Truyền Học & Biến Dị', 'Sinh Học Tế Bào', 'Sinh Thái Học & Môi Trường', 'Tiến Hóa Học'],
    'history': ['Lịch Sử Dân Tộc', 'Cách Mạng Thế Giới', 'Lịch Sử Hiện Đại', 'Cột Mốc Lịch Sử'],
    'geography': ['Địa Lý Tự Nhiên', 'Địa Lý Các Vùng Kinh Tế', 'Địa Lý Thế Giới', 'Địa Lý Dân Cư'],
    'economics_law': ['Pháp Luật Đại Cương', 'Quyền & Nghĩa Vụ Công Dân', 'Thị Trường Kinh Tế', 'Hoạt Động Sản Xuất Kinh Doanh']
};

function enrichQuestionsInDir() {
    let totalUpdated = 0;
    let fileCount = 0;

    const grades = fs.readdirSync(questionsDir).filter(f => f.startsWith('grade_'));

    grades.forEach(gradeFolder => {
        const gradePath = path.join(questionsDir, gradeFolder);
        if (!fs.statSync(gradePath).isDirectory()) return;

        const files = fs.readdirSync(gradePath).filter(f => f.endsWith('.json'));

        files.forEach(file => {
            const filePath = path.join(gradePath, file);
            const subKey = file.replace('.json', '');
            const topics = topicMap[subKey] || ['Kiến Thức Tổng Hợp'];

            try {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (Array.isArray(data)) {
                    data.forEach((q, idx) => {
                        // Assign difficulty: 35% Nhận biết, 35% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao
                        if (!q.difficulty) {
                            const diffIdx = (idx % 100 < 35) ? 0 : (idx % 100 < 70) ? 1 : (idx % 100 < 90) ? 2 : 3;
                            q.difficulty = difficultyList[diffIdx];
                        }
                        // Assign topic
                        if (!q.topic) {
                            q.topic = topics[idx % topics.length];
                        }
                        // ID
                        if (!q.id) {
                            q.id = `${gradeFolder}_${subKey}_${idx + 1}`;
                        }
                    });

                    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                    totalUpdated += data.length;
                    fileCount++;
                }
            } catch (err) {
                console.error(`Error processing ${filePath}:`, err.message);
            }
        });
    });

    console.log(`\n🎉 Successfully enriched metadata for ${totalUpdated} questions across ${fileCount} JSON files!`);
}

enrichQuestionsInDir();
