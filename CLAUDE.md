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

### 🔲 Việc cần làm tiếp

**[UNBLOCK — data]**
- [ ] Upload ảnh cho `cong-vien-1` và `park-river-walk` lên R2 → bật `active=true`
- [ ] Paste YouTube showreel ID vào Supabase `site_config.showreel_video_id`
- [ ] Thêm `video_id` cho các dự án khi có video

**[HIGH]**
- [ ] Testimonials — 3 quote thật (tên, chức vụ, công ty)
- [ ] Footer — email, địa chỉ studio

**[MEDIUM]**
- [ ] Favicon 32×32 + 192×192 (OG meta tags đã có, chỉ còn favicon)

**[PHASE 2]**
- [ ] Next.js 14 migration
- [ ] Trang `/portfolio` với filter
- [ ] Form `/contact`

### Quyết định quan trọng
- **Supabase URL không có `/rest/v1/`** — SDK tự thêm path
- **Slug R2 phải không dấu, gạch nối** — khoảng trắng gây 404
- **service_role key** — luôn lấy dòng `eyJ...` trong Supabase Settings → API, không dùng publishable key
- **Showreel ID trong Supabase** — `site_config.showreel_video_id`, thay trực tiếp trên Supabase không cần redeploy
- **`var(--dim)=#444` không dùng cho text** — tương phản quá thấp (~2.7:1), chỉ dùng `var(--muted)=#888` trở lên
- **Slash commands `/add-project`** — dùng để thêm dự án mới, xuất SQL + R2 path sẵn, không viết tay
