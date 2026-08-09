const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '..', 'questions');

function analyzeQuestions() {
    const grades = fs.readdirSync(questionsDir).filter(f => f.startsWith('grade_'));
    let totalQuestions = 0;
    let templateCount = 0;

    grades.forEach(gradeFolder => {
        const gradePath = path.join(questionsDir, gradeFolder);
        if (!fs.statSync(gradePath).isDirectory()) return;

        const files = fs.readdirSync(gradePath).filter(f => f.endsWith('.json'));

        files.forEach(file => {
            const filePath = path.join(gradePath, file);
            try {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (Array.isArray(data)) {
                    totalQuestions += data.length;
                    data.forEach(q => {
                        if (q.question.includes('nguyên lý cốt lõi') || q.question.includes('Câu hỏi chuẩn GDPT') || q.question.includes('Phương pháp học tập')) {
                            templateCount++;
                        }
                    });
                }
            } catch (err) {}
        });
    });

    console.log(`Total questions analyzed: ${totalQuestions}`);
    console.log(`Template/boilerplate questions found: ${templateCount}`);
}

analyzeQuestions();
