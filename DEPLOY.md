# Cách Deploy lên Vercel (Miễn phí)

## Cách 1: Deploy nhanh qua GitHub (Khuyến nghị)

### Bước 1: Tạo repository GitHub
1. Vào https://github.com
2. Đăng nhập → Click "New repository"
3. Đặt tên: `d-quizz`
4. Click "Create repository"

### Bước 2: Upload code
1. Trong repository mới, click "uploading an existing file"
2. Kéo thả file `index.html` vào
3. Click "Commit changes"

### Bước 3: Deploy với Vercel
1. Vào https://vercel.com
2. Đăng nhập (dùng tài khoản GitHub)
3. Click "Add New" → "Project"
4. Chọn repository `d-quizz`
5. Click "Deploy"
6. Đợi 30 giây → Xong! 🎉

**Link web của bạn sẽ có dạng:** `https://d-quizz.vercel.app`

---

## Cách 2: Deploy không cần GitHub

1. Vào https://vercel.com
2. Đăng nhập bằng email
3. Click "Add New" → "Project"
4. Click "Import Third-Party Git Repository"
5. Paste link này: `https://github.com/YOUR_USERNAME/d-quizz`
6. Deploy!

---

## Cách 3: Dùng Vercel CLI

```bash
# Cài đặt
npm i -g vercel

# Deploy
cd d:\quizz
vercel

# Làm theo hướng dẫn trên màn hình
```

---

## Sau khi deploy thành công

Bạn sẽ có:
- ✅ Website online 24/7
- ✅ Miễn phí
- ✅ Link chia sẻ cho bạn bè
- ✅ Không cần server riêng

**Ví dụ:** `https://d-quizz.vercel.app`

---

## Cập nhật website

Sau khi sửa code, chỉ cần push lên GitHub, Vercel sẽ tự động cập nhật!

```bash
git add .
git commit -m "Update quiz"
git push
```

Chúc bạn thành công! 🚀
