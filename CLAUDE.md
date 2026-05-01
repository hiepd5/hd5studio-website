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

## Sub-agents

| Agent | Lệnh | Dùng khi |
|---|---|---|
| reviewer | `/reviewer` | Sau thay đổi lớn — chấm 8 tiêu chí UI/UX/code |
| researcher | `/researcher [chủ đề]` | Tìm trend/kỹ thuật — tóm tắt, không dump vào context |
| guide | `/guide [câu hỏi]` | Hỏi deploy, R2, Supabase, YouTube — hướng dẫn click-by-click |

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

## Trạng thái hiện tại — 2026-04-30

### ✅ Đã hoàn thành
- `index.html` — landing page đầy đủ 11 sections
- `api/portfolio.js` + `api/config.js` — Vercel proxy bảo mật
- Portfolio dynamic từ Supabase + skeleton loading
- Lightbox 4K + zoom/pan/slideshow
- YouTube modal (lazy iframe)
- Supabase schema: bảng `portfolio` + `site_config` ✅
- Vercel env vars đã set ✅
- 3 sub-agents: reviewer / researcher / guide ✅
- Kế hoạch deploy chi tiết (lưu trong plan file)

### 🔲 Việc cần làm tiếp

**[UNBLOCK — làm trước]**
- [ ] Git init → push GitHub → import Vercel → deploy
- [ ] Trỏ domain `hd5studio.com` về Vercel
- [ ] Upload ảnh WebP lên R2 → nhập URLs vào Supabase
- [ ] Paste YouTube showreel ID vào `site_config`

**[HIGH]**
- [ ] Testimonials — 3 quote thật (tên, chức vụ, công ty)
- [ ] Footer — email, địa chỉ studio

**[MEDIUM]**
- [ ] SEO — OG image 1200×630, Twitter card, canonical
- [ ] Favicon 32×32 + 192×192

**[PHASE 2]**
- [ ] Next.js 14 migration
- [ ] Trang `/portfolio` với filter
- [ ] Form `/contact`
