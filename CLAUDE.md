# HD5 Studio — Website

**Owner:** HiepD5 (Vương Đắc Hiệp) · 0979 591 156
**Stack:** Static HTML/CSS/JS (`index.html`) + Vercel Serverless (`api/`) + Supabase CMS + Cloudflare R2
**Phase 2:** Next.js 14 — xem `.claude/rules/nextjs.md`
**Screenshot:** `node screenshot.js` → `screenshot_v1.png` + `screenshot_v1_mobile.png`
**Quyết định kiến trúc:** `.claude/decisions.md`

---

## Rules theo task

| Task | File |
|---|---|
| Màu, font, spacing, hiệu ứng | `.claude/rules/design.md` |
| Nội dung tiếng Việt | `.claude/rules/content.md` |
| Component, animation, layout | `.claude/rules/components.md` |
| Performance, ảnh, font load | `.claude/rules/performance.md` |
| Cấu trúc trang, sections | `.claude/rules/structure.md` |
| Migration Next.js | `.claude/rules/nextjs.md` |

## Sub-agents & Slash Commands

| Lệnh | Dùng khi |
|---|---|
| `/reviewer` | Sau thay đổi lớn — chấm 8 tiêu chí UI/UX/code |
| `/researcher [chủ đề]` | Tìm trend/kỹ thuật — tóm tắt, không dump vào context |
| `/guide [câu hỏi]` | Hỏi deploy, R2, Supabase, YouTube — hướng dẫn click-by-click |
| `/add-project [slug]` | Thêm dự án mới — hỏi thông tin → xuất SQL + đường dẫn R2 |
| `/deploy` | Nhắc quy trình git commit → push → Vercel deploy |

## Non-negotiable
- Nền luôn dark `#080808` / `#0f0f0f` — không dùng nền sáng
- Gold `#c8a96e` chỉ cho CTA, label, accent
- Heading tiếng Việt: **Be Vietnam Pro** — không dùng Syne
- Không Lorem ipsum — chỉ nội dung thật tiếng Việt
- Không API key trong HTML/JS — dùng Vercel API Routes proxy
- Trả lời và giải thích bằng **tiếng Việt**

## Mandatory
1. **Screenshot & Review** — `node screenshot.js` sau mỗi thay đổi lớn → `/reviewer`
2. **Mobile-first** — 320px → 768px → 1280px+
3. **Scroll reveal** — `.rx` (fade+slide) hoặc `.rs` (scale), trigger bằng IntersectionObserver

## Cập nhật nội dung (không cần sửa code)

| Muốn thay | Làm ở đâu |
|---|---|
| Ảnh thumbnail dự án | Supabase → `portfolio.thumb_url` |
| Ảnh full size lightbox | Supabase → `portfolio.full_urls` (array) |
| Video dự án | Supabase → `portfolio.video_id` |
| Hero showreel | Supabase → `site_config.showreel_video_id` |
| Ảnh 360° dự án | Supabase → `portfolio.urls_360` (array) — R2 path: `portfolio/{slug}/360_01.jpg` |

---

## Trạng thái hiện tại — 2026-05-02

### ✅ Đã hoàn thành (session 1 — 2026-05-01)
- `index.html` — landing page đầy đủ 11 sections
- `api/portfolio.js` + `api/config.js` — Vercel proxy bảo mật
- Portfolio dynamic từ Supabase + skeleton loading
- Lightbox 4K + zoom/pan/slideshow + touch swipe mobile
- YouTube modal (lazy iframe)
- Git repo → `github.com/hiepd5/hd5studio-website` ✅
- Deploy Vercel + domain `hd5studio.com` live qua Namecheap A + CNAME ✅
- Supabase schema: bảng `portfolio` + `site_config` + RLS policy ✅
- R2 bucket `hd5-studio-assets` — public URL bật ✅
- Dự án đầu tiên "Cảnh Quan Đô Thị Xanh" (`do-thi-xanh`) live ✅
- Slash commands: `/add-project`, `/deploy`, `/guide` trong `.claude/commands/` ✅

### ✅ Đã hoàn thành (session 2 — 2026-05-02)
- **Slash commands hoạt động** — tạo và test `/add-project`, thêm 2 dự án mới:
  - `cong-vien-1` — Công Viên Vui Chơi Trẻ Em (sort_order 2)
  - `park-river-walk` — Tổ Hợp Cao Tầng Cao Cấp Park River Walk (sort_order 3, 7 ảnh)
- **Fix bugs từ `/reviewer`** (điểm 61/80 → đã fix):
  - Color contrast: 16 selector `var(--dim)` → `var(--muted)` (WCAG AA)
  - `lbContainer` khai báo sai thứ tự gây crash swipe mobile
  - `reel-play-btn` đổi `<div>` → `<button aria-label>`
  - Trust ticker 2 bản đồng bộ (SUNSHINE GROUP)
  - OG + Twitter meta tags đầy đủ
- **Nâng cấp animations:**
  - Lightbox swipe trượt ngang mượt (slide-out/slide-in CSS transition)
  - Portfolio card parallax tilt 7deg theo chuột
  - Hero stats counter đếm từ 0 khi vào viewport
  - Scroll progress bar gold 2px ở top page
  - Portfolio cards stagger wave đều (d0→d5)
  - Navbar ẩn khi scroll xuống nhanh, hiện khi scroll lên
- **Hero showreel** — xóa vùng đen trống (`justify-content: center`), load YouTube ID từ `site_config.showreel_video_id` tự động

### ✅ Đã hoàn thành (session 3 — 2026-05-02)
- **4 dự án live** — `do-thi-xanh`, `cong-vien-1`, `park-river-walk` + 1 dự án thêm trực tiếp qua Supabase
- **Fix hero khoảng đen** — đổi `justify-content: center` → `flex-start`, padding-top 96px → 88px. Nội dung bắt đầu ngay dưới navbar.
- **Showreel click-to-play** — thay vì replace innerHTML bằng autoplay iframe (hay bị browser block), giờ click vào showreel/play button mở YouTube modal hiện có. Đáng tin cậy 100%, không phụ thuộc autoplay policy.
- **Services 4 card** — thêm "🔮 Ảnh 360° & Virtual Tour". Grid 4 cột → 2 cột (≤1100px) → 1 cột (≤520px).
- **Section Tour 360°** (`#tour-360`) — tự động hiện khi có dự án có `urls_360` trong Supabase. Ẩn hoàn toàn nếu chưa có data. Cards có thumbnail + nút play vàng 64px.
- **Pannellum viewer** (`#modal-360`) — full-screen 360° panorama viewer. Lazy load CDN `pannellum@2.5.6` chỉ khi mở lần đầu. Hỗ trợ prev/next nhiều ảnh, ESC đóng, không memory leak.
- **Portfolio cards** — nút "🔮 360°" gold xuất hiện khi dự án có `urls_360`.
- **`api/portfolio.js`** — thêm `urls_360` vào SELECT.
- **Fix HTML bug** — `</button>` đóng sai ở `reel-play-btn` (dùng `</div>` thay vì `</button>`) từ session 2, đã sửa.

### 🔲 Việc cần làm tiếp

**[UNBLOCK — bạn tự làm trong Supabase]**
- [ ] Chạy SQL: `ALTER TABLE portfolio ADD COLUMN urls_360 text[] DEFAULT NULL;`
- [ ] Kiểm tra `site_config` có row `key=showreel_video_id` chưa — nếu chưa thêm row + paste YouTube ID
- [ ] Upload ảnh 360° lên R2: `portfolio/{slug}/360_01.jpg` → update `urls_360` array trong Supabase
- [ ] Upload ảnh cho `cong-vien-1` lên R2 → bật `active=true`
- [ ] Thêm `video_id` cho các dự án khi có video

**[HIGH]**
- [ ] Testimonials — 3 quote thật (tên, chức vụ, công ty)
- [ ] Footer — email, địa chỉ studio

**[MEDIUM]**
- [ ] Favicon 32×32 + 192×192
- [ ] Cập nhật `/add-project` command thêm câu hỏi ảnh 360°

**[PHASE 2]**
- [ ] Next.js 14 migration
- [ ] Trang `/portfolio` với filter category
- [ ] Form `/contact`

### Quyết định quan trọng
- **Supabase URL không có `/rest/v1/`** — SDK tự thêm path
- **Slug R2 phải không dấu, gạch nối** — khoảng trắng gây 404
- **service_role key** — luôn lấy dòng `eyJ...` trong Supabase Settings → API, không dùng publishable key
- **Showreel ID trong Supabase** — `site_config.showreel_video_id`, thay trực tiếp trên Supabase không cần redeploy
- **`var(--dim)=#444` không dùng cho text** — tương phản quá thấp (~2.7:1), chỉ dùng `var(--muted)=#888` trở lên
- **Slash commands `/add-project`** — dùng để thêm dự án mới, xuất SQL + R2 path sẵn, không viết tay
- **Showreel dùng click-to-modal thay vì autoplay iframe** — YouTube autoplay iframe bị Chrome block khi không có user gesture trước đó; modal approach (openYtModal) đáng tin cậy hơn, không phụ thuộc autoplay policy
- **Section Tour 360° ẩn mặc định** — `hidden` attribute trên `<section>`, JS bỏ hidden khi có data. Tránh khoảng trắng xấu khi chưa có ảnh 360
- **Pannellum lazy load** — CDN JS (~150KB) chỉ load khi user click mở viewer lần đầu, không ảnh hưởng page load score
- **`urls_360` là array** — hỗ trợ nhiều góc nhìn (nội thất, ngoại thất, sân vườn...) per dự án, viewer có prev/next
- **R2 ảnh 360° dùng JPG không phải WebP** — equirectangular panorama thường rất lớn (8000×4000px+), JPG quality 85 cho file size hợp lý; WebP gain không đáng kể ở resolution này
