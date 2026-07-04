# SURPRISE — Portfolio/Interactive Surprise Template

یک قالب تعاملی ساده برای ساخت صفحات تبریک/خاطره‌نگاری به زبان فارسی. این مخزن شامل HTML/CSS/JS و دارایی‌های صوتی و تصویری است تا بتوانید یک صفحه شخصی‌سازی‌شده برای مناسبت‌ها بسازید.

**ویژگی‌ها**
- ساختار ساده و قابل ویرایش با HTML/CSS/JS
- دو صفحه نمونه: `index.html` و `surprise.html`
- پوشه `img/`, `music/`, `script/`, `style/` برای دارایی‌ها
- آماده برای میزبانی در GitHub Pages

**ساختار پروژه**
- `index.html` — صفحه اصلی
- `surprise.html` — نسخه دوم/صفحه خاطرات
- `img/` — تصاویر و آیکن‌ها
- `music/` — فایل‌های صوتی
- `script/` — کدهای جاوااسکریپت
- `style/` — فایل‌های CSS

**شروع سریع (locally)**
نیازمندی: `node` و `npm` (برای اسکریپت‌های کمکی) یا یک HTTP server ساده.

برای اجرا محلی با `live-server` (پیشنهاد شده):

```bash
# یکبار در صورت نیاز نصب کنید
npm install

# سرور توسعه
npm start
```

یا می‌توانید با Python ساده صفحه را سرو کنید:

```bash
# Python 3
python3 -m http.server 8080
```

سپس مرورگر را باز کنید: http://localhost:8080

**دپلوی به GitHub**
برای انتشار عمومی روی `github.com/raastin`:

```bash
# 1) اگر هنوز repository محلی ندارید
cd /path/to/project
git init
git add .
git commit -m "Initial: project restructure and docs"

# 2) روی گیت‌هاب یک ریپوزیتوری جدید بسازید، سپس:
# SSH
git remote add origin git@github.com:raastin/<REPO>.git
# یا HTTPS
git remote add origin https://github.com/raastin/<REPO>.git

# 3) پوش به ریموت (ممکن است نیاز به وارد کردن احراز هویت باشد)
git branch -M main
git push -u origin main
```

اگر می‌خواهید من ریپوزیتوری را برای شما ایجاد و پوش کنم، توکن دسترسی (GitHub Personal Access Token) لازم است یا باید کلید SSH روی سیستم شما تنظیم باشد؛ در صورت تمایل راهنمایی می‌کنم چگونه امن عمل کنیم.

**لایسنس**
این پروژه با مجوز MIT منتشر شده است. جزئیات در فایل `LICENSE`.

**مشارکت**
اگر مایل به مشارکت هستید، لطفاً پیش از ارسال Pull Request دستورالعمل‌های `CONTRIBUTING.md` را بخوانید.

**تماس**
صفحه GitHub: https://github.com/raastin
