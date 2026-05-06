# HD5 Studio — Website

**Owner:** HiepD5 (Vương Đắc Hiệp) · 0979 591 156
**Stack:** Static HTML/CSS/JS (`index.html`) + Vercel Serverless (`api/`) + Supabase CMS + Cloudflare R2
**Live:** `hd5studio.com` · Repo: `github.com/hiepd5/hd5studio-website`

---

## Non-negotiable
- Nền luôn dark `#080808` / `#0f0f0f` — không dùng nền sáng
- Gold `#c8a96e` chỉ cho CTA, label, accent
- Heading tiếng Việt: **Be Vietnam Pro** — không dùng Syne
- Không Lorem ipsum — chỉ nội dung thật tiếng Việt
- Không API key trong HTML/JS — dùng Vercel API Routes proxy
- Trả lời và giải thích bằng **tiếng Việt**

## Rules theo task (đọc khi liên quan)

| Task | File |
|---|---|
| Màu, font, spacing, hiệu ứng | `.claude/rules/design.md` |
| Nội dung tiếng Việt | `.claude/rules/content.md` |
| Component, animation, layout | `.claude/rules/components.md` |
| Performance, ảnh, font load | `.claude/rules/performance.md` |
| Cấu trúc trang, sections | `.claude/rules/structure.md` |
| Migration Next.js | `.claude/rules/nextjs.md` |
| Quyết định kỹ thuật đã đưa ra | `.claude/decisions.md` |

## Sub-agents & Slash Commands

| Lệnh | Dùng khi |
|---|---|
| `/reviewer` | Sau thay đổi lớn — chấm 8 tiêu chí UI/UX/code |
| `/researcher [chủ đề]` | Tìm trend/kỹ thuật — tóm tắt ngắn gọn |
| `/guide [câu hỏi]` | Hỏi deploy, R2, Supabase, YouTube |
| `/add-project [slug]` | Thêm dự án mới → xuất SQL + R2 path |
| `/deploy` | Quy trình git commit → push → Vercel |

---

## Cập nhật nội dung (không cần sửa code)

| Muốn thay | Làm ở đâu |
|---|---|
| Ảnh thumbnail / full size lightbox | Supabase → `portfolio.thumb_url` / `full_urls` |
| Video dự án | Supabase → `portfolio.video_id` |
| Hero showreel video | Supabase → `site_config.showreel_video_id` (11 ký tự) |
| Hero showreel poster | Supabase → `site_config.showreel_poster_url` |
| Dự án ảnh 360° | Supabase → bảng `tour360` · R2: `portfolio/{slug}/306_xx.webp` |
| Nhạc lightbox / 360° | R2 → `audio/lightbox-ambient.mp3` · `audio/tour360-ambient.mp3` |

---

## Trạng thái hiện tại — session 9 (2026-05-07)

### Đã hoàn thành
- Landing page đầy đủ, live `hd5studio.com`
- Portfolio dynamic từ Supabase + skeleton loading
- Lightbox v3 — scroll dọc, ảnh `height:auto`, nhạc nền fade in/out
- Cinema hero showreel fullscreen autoplay + nút unmute/mute + `vq=hd1440` desktop
- Tour 360° Pannellum viewer (bảng `tour360` độc lập)
- Nhạc nền: 2 track R2 (`audio/lightbox-ambient.mp3`, `audio/tour360-ambient.mp3`)
- Trust bar 8 khách hàng thật (Fly Media, Danko Group, MIK Group...)
- Testimonials 3 khách hàng thật (Fly Media, Archivina JSC, VNC Ocean Park)
- Section Feature 2 (Tốc độ/Dashboard) đã xóa
- **Portfolio redesign: 3 sections category luôn hiển thị** — Kiến trúc / Quy hoạch / TVC, max 6 dự án mỗi section, nút "Xem thêm" nếu >6
- **Services deep-link**: "Tìm hiểu thêm" scroll thẳng đến đúng category section (`#cat-kientru`, `#cat-quyhoach`, `#cat-tvc`)
- **Bug fix `_fadeOut`**: edge case volume=0 gây infinite loop → thêm guard early return
- Dự án `qh-6000ha` đã INSERT vào Supabase portfolio (`.jpg` không phải `.webp`)

### Việc cần làm tiếp

**[UNBLOCK — bạn tự làm trong Supabase/R2]**
- [ ] `site_config.showreel_video_id` = ID ngắn 11 ký tự (bỏ `&list=...`)
- [ ] `site_config.showreel_poster_url` = URL thumbnail YouTube
- [ ] Đảm bảo `category` các dự án Supabase dùng đúng tên: `Diễn họa Kiến trúc` / `Diễn họa Quy hoạch` / `TVC Bất động sản`

**[HIGH]**
- [ ] Footer — thêm email liên hệ, địa chỉ studio
- [ ] Favicon 32×32 + 192×192

**[MEDIUM]**
- [ ] Thay khung "D5 Render Settings" (Feature 1) bằng visual quy trình render thật
- [ ] Cập nhật `/add-project` thêm trường `urls_360`

**[PHASE 2]**
- [ ] Next.js 14 migration · Trang `/portfolio` filter · Form `/contact`
