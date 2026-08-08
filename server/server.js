/**
 * Learn & Develop - Express.js REST API Server
 * Database: MongoDB Atlas (Cloud 24/7)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'CyberLearnDevelopSecretKey2026';
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://toan_dev:21062006@ac-hqf0k07-shard-00-00.bwizvt3.mongodb.net:27017,ac-hqf0k07-shard-00-02.bwizvt3.mongodb.net:27017,ac-hqf0k07-shard-00-01.bwizvt3.mongodb.net:27017/wanderviet_planner?ssl=true&authSource=admin&replicaSet=atlas-4kw7rc-shard-0&retryWrites=true&w=majority&appName=Cluster0";

// ===== MONGOOSE SCHEMAS & MODELS =====
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'Student' },
    gradeLevel: { type: String, default: '12' },
    totalEXP: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const PasswordResetOTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otpCode: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
    senderName: { type: String, default: 'Ban Quản Trị (Admin)' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, default: 'broadcast' },
    createdAt: { type: Date, default: Date.now }
});

const QuizResultSchema = new mongoose.Schema({
    userId: { type: String, default: null },
    userName: { type: String, default: 'Khách' },
    userEmail: { type: String, default: 'guest@cyberlearn.vn' },
    subject: { type: String, default: 'Bài luyện tập' },
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    wrongDetails: { type: String, default: '[]' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const PasswordResetOTP = mongoose.model('PasswordResetOTP', PasswordResetOTPSchema);
const Notification = mongoose.model('Notification', NotificationSchema);
const QuizResult = mongoose.model('QuizResult', QuizResultSchema);

// Kết nối MongoDB Atlas và khởi tạo dữ liệu mẫu nếu cần
async function initDbConnection() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('====================================================');
        console.log('✅ [MongoDB Atlas] KẾT NỐI ĐÁM MÂY THÀNH CÔNG RỒI NHÉ!');
        console.log('   Database: wanderviet_planner (MongoDB Atlas 24/7)');
        console.log('====================================================');

        // Seed Admin Account nếu chưa tồn tại
        const adminUser = await User.findOne({ $or: [{ username: 'admin' }, { email: 'admin@yukii.vn' }] });
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const adminHash = await bcrypt.hash('admin123', salt);
            await User.create({
                fullName: 'Ban Quản Trị (Admin)',
                email: 'admin@yukii.vn',
                username: 'admin',
                passwordHash: adminHash,
                role: 'Admin',
                totalEXP: 999999
            });
            console.log('👑 [MongoDB Atlas] Tài khoản Admin (Email: admin@yukii.vn / User: admin | Pass: admin123) đã sẵn sàng!');
        }

        // Seed Announcement ban đầu nếu danh sách thông báo trống
        const notifCount = await Notification.countDocuments();
        if (notifCount === 0) {
            await Notification.create({
                title: '🎉 Chào mừng bạn đến với Hệ thống Cyber Learn & Develop!',
                content: 'Hệ thống kết nối MongoDB Đám Mây 24/7. Đã cập nhật toàn bộ ngân hàng câu hỏi Lớp 1-12 và Luyện thi bằng lái xe!'
            });
        }
    } catch (err) {
        console.error('⚠️ [MongoDB Atlas Error]:', err.message || err);
    }
}

// ===== API 1: ĐĂNG KÝ (REGISTER) =====
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu!' });

        const username = email.split('@')[0];
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ success: false, message: 'Email này đã tồn tại trong hệ thống MongoDB Atlas!' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            username,
            passwordHash: hash,
            role: 'Student'
        });

        return res.json({
            success: true,
            message: 'Đăng ký tài khoản MongoDB Atlas thành công!',
            user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email, username: newUser.username, createdAt: newUser.createdAt }
        });
    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// ===== API 1.5: ĐỒNG BỘ HÀNG LOẠT TÀI KHOẢN TẠO OFFLINE VỀ MONGODB ATLAS =====
app.post('/api/auth/sync-users', async (req, res) => {
    try {
        const { users } = req.body;
        if (!Array.isArray(users) || users.length === 0) {
            return res.json({ success: true, syncedCount: 0, message: 'Không có tài khoản nào cần đồng bộ.' });
        }

        let syncedCount = 0;
        for (const u of users) {
            if (!u.email) continue;
            const email = u.email;
            const fullName = u.fullName || u.email.split('@')[0];
            const username = u.username || u.email.split('@')[0];
            const rawPassword = u.password || '123456';

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(rawPassword, salt);
                await User.create({
                    fullName,
                    email,
                    username,
                    passwordHash: hash,
                    role: 'Student'
                });
                syncedCount++;
            }
        }

        console.log(`🔄 [MongoDB Sync] Đã đồng bộ ${syncedCount} tài khoản mới vào Đám Mây MongoDB Atlas!`);
        return res.json({ success: true, syncedCount, message: `Đã đồng bộ ${syncedCount} tài khoản vào MongoDB Atlas!` });
    } catch (err) {
        console.error('Sync Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi đồng bộ: ' + err.message });
    }
});

// ===== API 2: ĐĂNG NHẬP (LOGIN) =====
app.post('/api/auth/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password)
            return res.status(400).json({ success: false, message: 'Vui lòng nhập tên đăng nhập/email và mật khẩu!' });

        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user)
            return res.status(400).json({ success: false, message: 'Tên đăng nhập hoặc Email không tồn tại trong hệ thống!' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác!' });

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            success: true,
            message: 'Đăng nhập MongoDB Atlas thành công!',
            token,
            user: { id: user._id, fullName: user.fullName, email: user.email, username: user.username, role: user.role, gradeLevel: user.gradeLevel, exp: user.totalEXP }
        });
    } catch (err) {
        console.error('Login Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// ===== API 3: QUÊN MẬT KHẨU - GỬI MÃ OTP =====
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Email!' });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ success: false, message: 'Email này chưa được đăng ký trong hệ thống!' });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await PasswordResetOTP.create({ email, otpCode, expiresAt });

        console.log(`🔑 [MongoDB OTP Generated] Email: ${email} | Code: ${otpCode}`);
        return res.json({ success: true, message: 'Mã OTP đã được khởi tạo và lưu vào MongoDB Atlas!', otpCode });
    } catch (err) {
        console.error('Forgot Password Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi tạo OTP: ' + err.message });
    }
});

// ===== API 4: ĐẶT LẠI MẬT KHẨU (RESET PASSWORD) =====
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { email, otpCode, newPassword } = req.body;
        if (!email || !otpCode || !newPassword)
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp email, mã OTP và mật khẩu mới!' });

        const otpRecord = await PasswordResetOTP.findOne({
            email,
            otpCode,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        }).sort({ createdAt: -1 });

        if (!otpRecord)
            return res.status(400).json({ success: false, message: 'Mã OTP không hợp lệ hoặc đã hết hạn!' });

        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);

        await User.updateOne({ email }, { passwordHash: newHash });
        await PasswordResetOTP.updateOne({ _id: otpRecord._id }, { isUsed: true });

        return res.json({ success: true, message: 'Đổi mật khẩu thành công trên MongoDB Atlas!' });
    } catch (err) {
        console.error('Reset Password Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi cập nhật mật khẩu: ' + err.message });
    }
});

// ===== API 5: LẤY DANH SÁCH THÔNG BÁO =====
app.get('/api/auth/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
        return res.json({ success: true, notifications });
    } catch (err) {
        console.error('Get Notifications Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy thông báo: ' + err.message });
    }
});

// ===== API 6: ADMIN GỬI THÔNG BÁO =====
app.post('/api/auth/notifications', async (req, res) => {
    try {
        const { title, content, senderName } = req.body;
        if (!title || !content)
            return res.status(400).json({ success: false, message: 'Vui lòng điền tiêu đề và nội dung thông báo!' });

        const newNotif = await Notification.create({
            title,
            content,
            senderName: senderName || 'Ban Quản Trị (Admin)'
        });

        console.log(`📢 [Admin Broadcast] Đã phát thông báo mới: "${title}"`);
        return res.json({ success: true, message: 'Đã gửi thông báo đến toàn bộ người dùng!', notification: newNotif });
    } catch (err) {
        console.error('Broadcast Notification Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi gửi thông báo: ' + err.message });
    }
});

// ===== API 7: LẤY BẢNG XẾP HẠNG (GET LEADERBOARD) =====
app.get('/api/auth/leaderboard', async (req, res) => {
    try {
        const users = await User.find().sort({ totalEXP: -1, createdAt: -1 });

        // Định dạng danh sách: Admin luôn giữ top 1 (Max XP)
        const sortedLeaderboard = users.map(u => {
            const isAdminRow = u.role && u.role.toLowerCase() === 'admin';
            return {
                Id: u._id,
                FullName: u.fullName,
                Username: u.username,
                Email: u.email,
                Role: u.role,
                GradeLevel: u.gradeLevel,
                TotalEXP: isAdminRow ? 999999 : (u.totalEXP || 0),
                CreatedAt: u.createdAt
            };
        }).sort((a, b) => {
            if (a.Role && a.Role.toLowerCase() === 'admin') return -1;
            if (b.Role && b.Role.toLowerCase() === 'admin') return 1;
            return b.TotalEXP - a.TotalEXP;
        });

        return res.json({ success: true, leaderboard: sortedLeaderboard, total: sortedLeaderboard.length });
    } catch (err) {
        console.error('Leaderboard Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy bảng xếp hạng: ' + err.message });
    }
});

// ===== API 8: THỐNG KÊ HỆ THỐNG (GET SYSTEM STATS) =====
app.get('/api/auth/stats', async (req, res) => {
    try {
        const nonAdminQuery = { role: { $ne: 'Admin' } };
        const totalUsers = await User.countDocuments(nonAdminQuery);

        const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
        const todayUsers = await User.countDocuments({ ...nonAdminQuery, createdAt: { $gte: startOfDay } });

        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const weekUsers = await User.countDocuments({ ...nonAdminQuery, createdAt: { $gte: sevenDaysAgo } });

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const monthUsers = await User.countDocuments({ ...nonAdminQuery, createdAt: { $gte: thirtyDaysAgo } });

        const totalNotifications = await Notification.countDocuments();

        return res.json({
            success: true,
            stats: {
                totalUsers,
                todayUsers,
                weekUsers,
                monthUsers,
                totalNotifications
            }
        });
    } catch (err) {
        console.error('Stats Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy thống kê: ' + err.message });
    }
});

// ===== API 9: LƯU KẾT QUẢ BÀI THI & LỖI SAI (SAVE QUIZ RESULT) =====
app.post('/api/auth/quiz-results', async (req, res) => {
    try {
        const { userId, userName, userEmail, subject, score, totalQuestions, correctCount, wrongCount, wrongDetails } = req.body;
        const detailsJson = typeof wrongDetails === 'string' ? wrongDetails : JSON.stringify(wrongDetails || []);

        const cCount = parseInt(correctCount) || 0;
        const tCount = parseInt(totalQuestions) || 0;
        const earnedExp = (cCount * 10) + (tCount > 0 && cCount === tCount ? 50 : 0) + 20;

        const newResult = await QuizResult.create({
            userId,
            userName: userName || 'Khách',
            userEmail: userEmail || 'guest@cyberlearn.vn',
            subject: subject || 'Bài luyện tập',
            score: score || earnedExp,
            totalQuestions: totalQuestions || 0,
            correctCount: correctCount || 0,
            wrongCount: wrongCount || 0,
            wrongDetails: detailsJson
        });

        // Cập nhật tích lũy EXP vào tài khoản MongoDB Atlas
        if (userEmail || userName) {
            await User.updateOne(
                { $or: [{ email: userEmail }, { username: userName }, { email: userName }] },
                { $inc: { totalEXP: earnedExp } }
            );
        }

        return res.json({ success: true, message: `Lưu kết quả thành công! Bạn nhận được +${earnedExp} EXP.`, earnedExp, result: newResult });
    } catch (err) {
        console.error('Save Quiz Result Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lưu kết quả: ' + err.message });
    }
});

// ===== API 9.5: CỘNG ĐIỂM EXP TRỰC TIẾP CHO TÀI KHOẢN (UPDATE USER EXP) =====
app.post('/api/auth/update-exp', async (req, res) => {
    try {
        const { userEmail, username, expToAdd } = req.body;
        const points = parseInt(expToAdd) || 0;
        if (points <= 0) return res.json({ success: true, message: 'Số EXP không hợp lệ' });

        await User.updateOne(
            { $or: [{ email: userEmail }, { username: username }, { email: username }] },
            { $inc: { totalEXP: points } }
        );

        return res.json({ success: true, message: `Đã cộng +${points} EXP vào MongoDB Atlas thành công!` });
    } catch (err) {
        console.error('Update EXP Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi cộng EXP: ' + err.message });
    }
});

// ===== API 10: LẤY TOÀN BỘ KẾT QUẢ VÀ LỖI SAI (ADMIN) =====
app.get('/api/auth/quiz-results', async (req, res) => {
    try {
        const quizResults = await QuizResult.find().sort({ createdAt: -1 }).limit(100);
        return res.json({ success: true, quizResults });
    } catch (err) {
        console.error('Get Quiz Results Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy kết quả bài thi: ' + err.message });
    }
});

// ===== API 11: LẤY LỖI SAI CHI TIẾT THEO USER EMAIL/USERNAME =====
app.get('/api/auth/quiz-results/user/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        const userResults = await QuizResult.find({
            $or: [{ userEmail: userEmail }, { userName: userEmail }]
        }).sort({ createdAt: -1 });

        return res.json({ success: true, userResults });
    } catch (err) {
        console.error('Get User Quiz Details Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy chi tiết người dùng: ' + err.message });
    }
});

// Khởi động Express Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Learn & Develop MongoDB Cloud API listening on port ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}/api/auth`);
    console.log(`====================================================`);
    initDbConnection();
});
