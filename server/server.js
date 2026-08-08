/**
 * Learn & Develop - Express.js REST API Server
 * SQL Server: Windows Authentication (localhost) | Database: User
 * Driver: ODBC Driver 18 for SQL Server
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'CyberLearnDevelopSecretKey2026';

// ===== Connection String SQL Server (Windows Authentication) =====
const connectionString = process.env.DB_CONNECTION_STRING || "Driver={ODBC Driver 18 for SQL Server};Server=localhost;Database=User;Trusted_Connection=yes;TrustServerCertificate=yes;";

let pool = null;

// Kết nối SQL Server và khởi tạo bảng dữ liệu tự động
async function initDbConnection() {
    try {
        pool = await new sql.ConnectionPool({ connectionString }).connect();
        console.log('====================================================');
        console.log('✅ [SQL Server] KẾT NỐI THÀNH CÔNG RỒI NHÉ!');
        console.log('   Server: localhost (Windows Authentication)');
        console.log('   Database: User (DESKTOP-JQSIC3A\\HP)');
        console.log('====================================================');

        // Tự tạo bảng Users và PasswordResetOTPs trong database User nếu chưa có
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
            BEGIN
                CREATE TABLE Users (
                    Id          INT IDENTITY(1,1) PRIMARY KEY,
                    FullName    NVARCHAR(100) NOT NULL,
                    Email       VARCHAR(150) NOT NULL UNIQUE,
                    Username    VARCHAR(50) NOT NULL UNIQUE,
                    PasswordHash VARCHAR(255) NOT NULL,
                    Role        NVARCHAR(20) DEFAULT 'Student',
                    GradeLevel  VARCHAR(10) DEFAULT '12',
                    CreatedAt   DATETIME DEFAULT GETDATE()
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PasswordResetOTPs' AND xtype='U')
            BEGIN
                CREATE TABLE PasswordResetOTPs (
                    Id        INT IDENTITY(1,1) PRIMARY KEY,
                    Email     VARCHAR(150) NOT NULL,
                    OTPCode   VARCHAR(6) NOT NULL,
                    IsUsed    BIT DEFAULT 0,
                    ExpiresAt DATETIME NOT NULL,
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Notifications' AND xtype='U')
            BEGIN
                CREATE TABLE Notifications (
                    Id          INT IDENTITY(1,1) PRIMARY KEY,
                    SenderName  NVARCHAR(100) DEFAULT N'Ban Quản Trị (Admin)',
                    Title       NVARCHAR(255) NOT NULL,
                    Content     NVARCHAR(MAX) NOT NULL,
                    Type        VARCHAR(20) DEFAULT 'broadcast',
                    CreatedAt   DATETIME DEFAULT GETDATE()
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='QuizResults' AND xtype='U')
            BEGIN
                CREATE TABLE QuizResults (
                    Id             INT IDENTITY(1,1) PRIMARY KEY,
                    UserId         INT NULL,
                    UserName       NVARCHAR(100),
                    UserEmail      VARCHAR(150),
                    Subject        NVARCHAR(100),
                    Score          INT,
                    TotalQuestions INT,
                    CorrectCount   INT,
                    WrongCount     INT,
                    WrongDetails   NVARCHAR(MAX),
                    CreatedAt      DATETIME DEFAULT GETDATE()
                );
            END
        `);
        console.log('✅ [SQL Server] Bảng Users, PasswordResetOTPs, Notifications và QuizResults đã sẵn sàng!');

        // Seed Admin Account if not existing
        const checkAdmin = await pool.request()
            .query("SELECT Id FROM Users WHERE Username = 'admin' OR Email = 'admin@yukii.vn'");

        if (checkAdmin.recordset.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const adminHash = await bcrypt.hash('admin123', salt);
            await pool.request()
                .input('fullName', sql.NVarChar, 'Ban Quản Trị (Admin)')
                .input('email', sql.VarChar, 'admin@yukii.vn')
                .input('username', sql.VarChar, 'admin')
                .input('passwordHash', sql.VarChar, adminHash)
                .input('role', sql.NVarChar, 'Admin')
                .query(`
                    INSERT INTO Users (FullName, Email, Username, PasswordHash, Role)
                    VALUES (@fullName, @email, @username, @passwordHash, @role)
                `);
            console.log('👑 [SQL Server] Tài khoản Admin (Email: admin@yukii.vn / User: admin | Pass: admin123) đã được khởi tạo!');
        }

        // Seed initial announcement if Notifications empty
        const checkNotif = await pool.request().query("SELECT COUNT(*) AS cnt FROM Notifications");
        if (checkNotif.recordset[0].cnt === 0) {
            await pool.request()
                .input('title', sql.NVarChar, '🎉 Chào mừng bạn đến với Hệ thống Cyber Learn & Develop!')
                .input('content', sql.NVarChar, 'Hệ thống đã cập nhật toàn bộ ngân hàng câu hỏi Lớp 1-12 và Luyện thi bằng lái xe A1, A2, B1, B2. Chúc các bạn học tập tốt!')
                .query("INSERT INTO Notifications (Title, Content) VALUES (@title, @content)");
        }
    } catch (err) {
        console.error('⚠️ [SQL Server Error]:', err.message || err);
    }
}

// ===== API 1: ĐĂNG KÝ (REGISTER) =====
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu!' });

        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const username = email.split('@')[0];

        const checkUser = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT Id FROM Users WHERE Email = @email');

        if (checkUser.recordset.length > 0)
            return res.status(400).json({ success: false, message: 'Email này đã tồn tại trong hệ thống SQL Server!' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const result = await pool.request()
            .input('fullName', sql.NVarChar, fullName)
            .input('email', sql.VarChar, email)
            .input('username', sql.VarChar, username)
            .input('passwordHash', sql.VarChar, hash)
            .query(`
                INSERT INTO Users (FullName, Email, Username, PasswordHash)
                OUTPUT INSERTED.Id, INSERTED.FullName, INSERTED.Email, INSERTED.Username, INSERTED.CreatedAt
                VALUES (@fullName, @email, @username, @passwordHash)
            `);

        return res.json({ success: true, message: 'Đăng ký tài khoản SQL Server thành công!', user: result.recordset[0] });
    } catch (err) {
        console.error('Register Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// ===== API 1.5: ĐỒNG BỘ HÀNG LOẠT TÀI KHOẢN TẠO OFFLINE VỀ SQL SERVER =====
app.post('/api/auth/sync-users', async (req, res) => {
    try {
        const { users } = req.body; // Array of { fullName, email, username, password }
        if (!Array.isArray(users) || users.length === 0) {
            return res.json({ success: true, syncedCount: 0, message: 'Không có tài khoản nào cần đồng bộ.' });
        }

        if (!pool) {
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });
        }

        let syncedCount = 0;
        for (const u of users) {
            if (!u.email) continue;
            const email = u.email;
            const fullName = u.fullName || u.email.split('@')[0];
            const username = u.username || u.email.split('@')[0];
            const rawPassword = u.password || '123456';

            // Check if already exists in SQL Server
            const checkUser = await pool.request()
                .input('email', sql.VarChar, email)
                .query('SELECT Id FROM Users WHERE Email = @email');

            if (checkUser.recordset.length === 0) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(rawPassword, salt);
                await pool.request()
                    .input('fullName', sql.NVarChar, fullName)
                    .input('email', sql.VarChar, email)
                    .input('username', sql.VarChar, username)
                    .input('passwordHash', sql.VarChar, hash)
                    .query(`
                        INSERT INTO Users (FullName, Email, Username, PasswordHash)
                        VALUES (@fullName, @email, @username, @passwordHash)
                    `);
                syncedCount++;
            }
        }

        console.log(`🔄 [SQL Sync] Đã tự động đồng bộ ${syncedCount} tài khoản mới vào SQL Server!`);
        return res.json({ success: true, syncedCount, message: `Đã đồng bộ ${syncedCount} tài khoản vào SQL Server!` });
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

        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const result = await pool.request()
            .input('identifier', sql.VarChar, identifier)
            .query('SELECT * FROM Users WHERE Email = @identifier OR Username = @identifier');

        if (result.recordset.length === 0)
            return res.status(400).json({ success: false, message: 'Tên đăng nhập hoặc Email không tồn tại trong SQL Server!' });

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.PasswordHash);
        if (!isMatch)
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác!' });

        const token = jwt.sign(
            { id: user.Id, email: user.Email, username: user.Username, role: user.Role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            success: true,
            message: 'Đăng nhập SQL Server thành công!',
            token,
            user: { id: user.Id, fullName: user.FullName, email: user.Email, username: user.Username, role: user.Role, gradeLevel: user.GradeLevel }
        });
    } catch (err) {
        console.error('Login Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
    }
});

// ===== API 3: QUÊN MẬT KHẨU - GỬI MÃ OTP (FORGOT PASSWORD) =====
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ success: false, message: 'Vui lòng cung cấp Email!' });

        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const checkUser = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT Id FROM Users WHERE Email = @email');

        if (checkUser.recordset.length === 0)
            return res.status(400).json({ success: false, message: 'Email này chưa được đăng ký trong SQL Server!' });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

        await pool.request()
            .input('email', sql.VarChar, email)
            .input('otpCode', sql.VarChar, otpCode)
            .input('expiresAt', sql.DateTime, expiresAt)
            .query('INSERT INTO PasswordResetOTPs (Email, OTPCode, ExpiresAt) VALUES (@email, @otpCode, @expiresAt)');

        console.log(`🔑 [SQL Server OTP Generated] Email: ${email} | Code: ${otpCode}`);
        return res.json({ success: true, message: 'Mã OTP đã được khởi tạo và lưu vào SQL Server!', otpCode });
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

        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const checkOTP = await pool.request()
            .input('email', sql.VarChar, email)
            .input('otpCode', sql.VarChar, otpCode)
            .query(`SELECT TOP 1 * FROM PasswordResetOTPs
                    WHERE Email=@email AND OTPCode=@otpCode AND IsUsed=0 AND ExpiresAt>GETDATE()
                    ORDER BY CreatedAt DESC`);

        if (checkOTP.recordset.length === 0)
            return res.status(400).json({ success: false, message: 'Mã OTP không hợp lệ hoặc đã hết hạn trong SQL Server!' });

        const otpRecord = checkOTP.recordset[0];
        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);

        await pool.request()
            .input('email', sql.VarChar, email)
            .input('newHash', sql.VarChar, newHash)
            .query('UPDATE Users SET PasswordHash=@newHash WHERE Email=@email');

        await pool.request()
            .input('id', sql.Int, otpRecord.Id)
            .query('UPDATE PasswordResetOTPs SET IsUsed=1 WHERE Id=@id');

        return res.json({ success: true, message: 'Đổi mật khẩu thành công trên SQL Server!' });
    } catch (err) {
        console.error('Reset Password Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi cập nhật mật khẩu: ' + err.message });
    }
});

// ===== API 5: LẤY DANH SÁCH THÔNG BÁO (GET NOTIFICATIONS) =====
app.get('/api/auth/notifications', async (req, res) => {
    try {
        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const result = await pool.request()
            .query('SELECT TOP 20 * FROM Notifications ORDER BY CreatedAt DESC');

        return res.json({ success: true, notifications: result.recordset });
    } catch (err) {
        console.error('Get Notifications Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy thông báo: ' + err.message });
    }
});

// ===== API 6: ADMIN GỬI THÔNG BÁO (POST NOTIFICATION) =====
app.post('/api/auth/notifications', async (req, res) => {
    try {
        const { title, content, senderName } = req.body;
        if (!title || !content)
            return res.status(400).json({ success: false, message: 'Vui lòng điền tiêu đề và nội dung thông báo!' });

        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const result = await pool.request()
            .input('title', sql.NVarChar, title)
            .input('content', sql.NVarChar, content)
            .input('senderName', sql.NVarChar, senderName || 'Ban Quản Trị (Admin)')
            .query(`
                INSERT INTO Notifications (Title, Content, SenderName)
                OUTPUT INSERTED.Id, INSERTED.Title, INSERTED.Content, INSERTED.SenderName, INSERTED.CreatedAt
                VALUES (@title, @content, @senderName)
            `);

        console.log(`📢 [Admin Broadcast] Đã phát thông báo mới: "${title}"`);
        return res.json({ success: true, message: 'Đã gửi thông báo đến toàn bộ người dùng!', notification: result.recordset[0] });
    } catch (err) {
        console.error('Broadcast Notification Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi gửi thông báo: ' + err.message });
    }
});

// ===== API 7: LẤY BẢNG XẾP HẠNG (GET LEADERBOARD) =====
app.get('/api/auth/leaderboard', async (req, res) => {
    try {
        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        // Lấy danh sách người dùng: Admin luôn xếp Hạng 1, các học sinh xếp theo Điểm tích lũy (TotalEXP) giảm dần
        const result = await pool.request()
            .query(`
                SELECT 
                    u.Id, 
                    u.FullName, 
                    u.Username, 
                    u.Email, 
                    u.Role, 
                    u.GradeLevel, 
                    u.CreatedAt,
                    ISNULL(SUM(q.Score), 0) AS TotalEXP,
                    COUNT(q.Id) AS TestsTaken
                FROM Users u
                LEFT JOIN QuizResults q ON u.Email = q.UserEmail OR u.Username = q.UserName
                GROUP BY u.Id, u.FullName, u.Username, u.Email, u.Role, u.GradeLevel, u.CreatedAt
                ORDER BY 
                    CASE WHEN LOWER(u.Role) = 'admin' THEN 1 ELSE 2 END ASC,
                    ISNULL(SUM(q.Score), 0) DESC,
                    u.CreatedAt DESC
            `);

        return res.json({ success: true, leaderboard: result.recordset, total: result.recordset.length });
    } catch (err) {
        console.error('Leaderboard Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy bảng xếp hạng: ' + err.message });
    }
});

// ===== API 8: THỐNG KÊ HỆ THỐNG (GET SYSTEM STATS) =====
app.get('/api/auth/stats', async (req, res) => {
    try {
        if (!pool)
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });

        const totalUsers = await pool.request()
            .query("SELECT COUNT(*) AS cnt FROM Users WHERE Role != 'Admin'");

        const todayUsers = await pool.request()
            .query("SELECT COUNT(*) AS cnt FROM Users WHERE Role != 'Admin' AND CAST(CreatedAt AS DATE) = CAST(GETDATE() AS DATE)");

        const weekUsers = await pool.request()
            .query("SELECT COUNT(*) AS cnt FROM Users WHERE Role != 'Admin' AND CreatedAt >= DATEADD(day, -7, GETDATE())");

        const monthUsers = await pool.request()
            .query("SELECT COUNT(*) AS cnt FROM Users WHERE Role != 'Admin' AND CreatedAt >= DATEADD(day, -30, GETDATE())");

        const totalNotifs = await pool.request()
            .query("SELECT COUNT(*) AS cnt FROM Notifications");

        // Số lượng user đăng ký theo từng ngày trong 7 ngày gần đây
        const dailyGrowth = await pool.request()
            .query(`
                SELECT CAST(CreatedAt AS DATE) AS RegDate, COUNT(*) AS RegCount
                FROM Users
                WHERE Role != 'Admin' AND CreatedAt >= DATEADD(day, -6, GETDATE())
                GROUP BY CAST(CreatedAt AS DATE)
                ORDER BY RegDate ASC
            `);

        return res.json({
            success: true,
            stats: {
                totalUsers: totalUsers.recordset[0].cnt,
                todayUsers: todayUsers.recordset[0].cnt,
                weekUsers: weekUsers.recordset[0].cnt,
                monthUsers: monthUsers.recordset[0].cnt,
                totalNotifications: totalNotifs.recordset[0].cnt,
                dailyGrowth: dailyGrowth.recordset
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

        if (!pool) {
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });
        }

        const detailsJson = typeof wrongDetails === 'string' ? wrongDetails : JSON.stringify(wrongDetails || []);

        await pool.request()
            .input('userId', sql.Int, userId || null)
            .input('userName', sql.NVarChar, userName || 'Khách')
            .input('userEmail', sql.VarChar, userEmail || 'guest@cyberlearn.vn')
            .input('subject', sql.NVarChar, subject || 'Bài luyện tập')
            .input('score', sql.Int, score || 0)
            .input('totalQuestions', sql.Int, totalQuestions || 0)
            .input('correctCount', sql.Int, correctCount || 0)
            .input('wrongCount', sql.Int, wrongCount || 0)
            .input('wrongDetails', sql.NVarChar, detailsJson)
            .query(`
                INSERT INTO QuizResults (UserId, UserName, UserEmail, Subject, Score, TotalQuestions, CorrectCount, WrongCount, WrongDetails)
                VALUES (@userId, @userName, @userEmail, @subject, @score, @totalQuestions, @correctCount, @wrongCount, @wrongDetails)
            `);

        return res.json({ success: true, message: 'Lưu kết quả bài thi thành công!' });
    } catch (err) {
        console.error('Save Quiz Result Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lưu kết quả: ' + err.message });
    }
});

// ===== API 10: LẤY TOÀN BỘ KẾT QUẢ VÀ LỖI SAI CỦA TẤT CẢ NGƯỜI DÙNG (ADMIN) =====
app.get('/api/auth/quiz-results', async (req, res) => {
    try {
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });
        }

        const result = await pool.request()
            .query('SELECT TOP 100 * FROM QuizResults ORDER BY CreatedAt DESC');

        return res.json({ success: true, quizResults: result.recordset });
    } catch (err) {
        console.error('Get Quiz Results Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy kết quả bài thi: ' + err.message });
    }
});

// ===== API 11: LẤY LỖI SAI CHI TIẾT THEO USER EMAIL/USERNAME (ADMIN DETAILED REPORT) =====
app.get('/api/auth/quiz-results/user/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;
        if (!pool) {
            return res.status(500).json({ success: false, message: 'Chưa kết nối tới SQL Server!' });
        }

        const result = await pool.request()
            .input('email', sql.VarChar, userEmail)
            .query('SELECT * FROM QuizResults WHERE UserEmail = @email OR UserName = @email ORDER BY CreatedAt DESC');

        return res.json({ success: true, userResults: result.recordset });
    } catch (err) {
        console.error('Get User Quiz Details Error:', err);
        return res.status(500).json({ success: false, message: 'Lỗi lấy chi tiết người dùng: ' + err.message });
    }
});

// Khởi động Express Server
app.listen(PORT, () => {

    console.log(`====================================================`);
    console.log(`🚀 Learn & Develop SQL Server API listening on port ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}/api/auth`);
    console.log(`====================================================`);
    initDbConnection();
});
