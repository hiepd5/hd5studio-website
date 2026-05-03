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
| Hero showreel video | Supabase → `site_config.showreel_video_id` (chỉ ID ngắn 11 ký tự) |
| Hero showreel poster | Supabase → `site_config.showreel_poster_url` (URL ảnh thumbnail fallback) |
| Dự án ảnh 360° | Supabase → bảng `tour360` (độc lập) — R2 path: `portfolio/{slug}/306_xx.webp` |

---

## Trạng thái hiện tại — 2026-05-04 (cập nhật session 8)

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

### ✅ Đã hoàn thành (session 4 — 2026-05-02)
- **Tách Tour 360° thành section độc lập** — không còn phụ thuộc bảng `portfolio`. Bảng riêng `tour360` trong Supabase, API riêng `api/tour360.js`.
- **`api/tour360.js`** — Vercel serverless mới, fetch từ bảng `tour360`, cache s-maxage=300. Portfolio cards không còn nút 🔮 360°.
- **3 dự án 360° live:**
  - `360-danko-bac-giang` — 10 ảnh (file tên `306_xx.webp`)
  - `360-vic-grand-viet-tri` — 6 ảnh
  - `360-danko-riverside` — 5 ảnh
- **Fix CORS R2** — thêm CORS policy cho bucket `hd5-studio-assets` cho phép `hd5studio.com` + `localhost:3000`. Pannellum dùng XHR nên bắt buộc cần CORS header.
- **Mobile bottom nav 360° viewer** — thanh điều hướng nổi phía dưới viewer trên mobile: nút "← Trước" và "Tiếp →" lớn, counter giữa, nền blur. Side buttons ẩn trên mobile.
- **Nâng điểm review 63 → ~75/80:**
  - Canonical link + LocalBusiness JSON-LD schema
  - `var(--dim)` → `var(--muted)` toàn bộ body text (WCAG AA)
  - Xóa `svc-grid` responsive rule 768px chồng chéo (logic sai)
  - `aria-label` đầy đủ cho tất cả lightbox/modal/yt buttons
  - `lb-img alt` cập nhật động theo tên dự án khi load ảnh
  - Avatar testimonials sửa đúng initial: H/K/L
  - Navbar buttons: class `.btn-sm` thay inline style

### ✅ Đã hoàn thành (session 5 — 2026-05-03)
- **Cinema tilt hero showreel (v1 — tilt 3D)** — thay `.hero-reel` card phẳng + SVG bằng màn hình nghiêng 3D:
  - `.cinema-wrap` với `perspective: 1400px` + `.cinema-stage` rotateX(10deg)
  - YouTube iframe nhúng trực tiếp autoplay muted/loop, không dùng modal
  - Xóa toàn bộ `.hero-reel` HTML (~250 dòng SVG) + CSS (~150 dòng) + JS handler cũ
- **Cinema hero redesign (v2 — full-width overlay, Option A)** — sau khi thấy khoảng đen + UX gap:
  - `cinema-wrap` full-width `min-height: 72vh`, không tilt — video phủ toàn màn hình
  - iframe cover trick: `width: 100vw; height: 56.25vw; translate(-50%,-50%)` để fill 16:9 bất kể container
  - Text (label + h1 + desc + CTAs) `position: absolute; bottom: 0` với gradient đen tăng dần từ giữa xuống
  - `hero-stats` liền ngay dưới cinema, `border-top: none` để liền mạch
  - Poster fallback: load `site_config.showreel_poster_url` làm `background-image` khi video chưa ready
  - Mobile 768px: `min-height: 55vh`, ẩn `hero-desc`, text nhỏ hơn
  - Mobile 520px: `min-height: 48vh`, font nhỏ hơn
  - Xóa `hero-bg-glow`, `hero-line`, `hero-dots` — không cần khi có video background
- **Supabase `site_config`** — cần 2 field: `showreel_video_id` (ID ngắn) + `showreel_poster_url` (URL ảnh thumbnail)

### ✅ Đã hoàn thành (session 6 — 2026-05-04)
- **Lightbox v2 — vertical scroll gallery** — thay UX "1 ảnh + prev/next" bằng cuộn dọc xem tất cả ảnh:
  - Header bar: `[← Dự án] [Trở về]` nhóm trái | tên dự án giữa | counter gold + nút video phải
  - Ảnh `100vw` full-bleed, `aspect-ratio: 16/9`, `object-fit: cover; object-position: center` — hiển thị phần giữa ảnh
  - Shimmer loading animation `::after` trên mỗi item trước khi ảnh load xong
  - Lazy load: chỉ ảnh đầu (`idx`) load ngay, còn lại dùng `data-src` + IntersectionObserver `rootMargin: 200px`
  - Counter `1/7` dùng IntersectionObserver `rootMargin: '-10% 0px -89% 0px'` — chính xác với ảnh panorama
  - Fade-in `opacity 0→1` khi mở, fade-out khi đóng (220ms)
  - Focus trap: focus nhảy vào nút "Trở về" khi lightbox mở (`lb-close.focus()`)
  - `role="dialog" aria-modal="true" aria-labelledby="lb-title"` — accessibility đầy đủ
  - Floating arrows `‹ ›` hai bên desktop (ẩn mobile), click scroll mượt đến ảnh trước/sau
  - Arrow keys ↑← = ảnh trước, ↓→ = ảnh sau; ESC đóng zoom trước rồi mới đóng lightbox
  - Click ảnh → zoom overlay full `96vw×96vh` với nút đóng và click ngoài để thoát
  - `safe-area-inset-top` trên nút đóng — không bị che bởi notch iPhone
  - Project switcher panel: click "← Dự án" → grid thumbnail tất cả dự án, dự án đang xem highlight gold
  - `_portfolioItems` lưu toàn cục khi `loadPortfolio()` chạy → lightbox có thể render switcher bất cứ lúc nào
  - Xóa sạch code cũ: `loadImage`, `slideTo`, `prev/next`, `zoom/pan`, drag/touch handlers, slide CSS classes (~290 dòng)

### ✅ Đã hoàn thành (session 7 — 2026-05-04)
- **YouTube showreel quality** — thêm `&vq=hd1080` vào embed URL cinema hero → YouTube ưu tiên stream 1080p
- **Film strip thumbnail (thử nghiệm → đã xóa)** — thêm dải thumbnail ngang bên dưới header, thử tilt -5°, sau đó bỏ tilt, cuối cùng xóa hoàn toàn vì gây lag và không cải thiện UX
- **Lightbox v3 — ảnh full tự nhiên** — bỏ `aspect-ratio: 16/9` + `object-fit: cover`, ảnh hiển thị `width: 100%; height: auto` — xem toàn bộ render không cần click zoom
- **Fix ảnh chồng nhau desktop** — xóa `display: flex` + `object-fit: contain` xung đột nhau, đơn giản hóa CSS về `display: block; width: 100%; height: auto`

### ✅ Đã hoàn thành (session 8 — 2026-05-04)
- **Trust bar** — thay 8 tên placeholder bằng khách hàng thật: Fly Media, Archivina JSC, C.A.T Hanoi Company, Danko Group, VNC Ocean Park, Eagle Land, Stavian Land, MIK Group
- **Hero showreel chất lượng 1440p desktop** — `vq=hd1440` trên desktop, `vq=hd1080` trên mobile (≤768px)
- **Nút unmute/mute hero showreel** — button overlay góc dưới phải video, dùng YouTube `postMessage API` (`enablejsapi=1`) toggle mute/unmute không cần reload iframe; icon SVG đổi giữa muted/unmuted state
- **Nhạc nền lightbox + 360°** — `audioMgr` object với fade in/out 800ms, 2 track MP3 từ R2:
  - `audio/lightbox-ambient.mp3` — phát khi mở lightbox portfolio
  - `audio/tour360-ambient.mp3` — phát khi mở 360° viewer
  - Nút 🔊/🔇 nổi góc dưới phải, chỉ hiện khi đang phát nhạc
  - Cross-fade tự động khi chuyển giữa lightbox và 360°
- **Fix race condition audio** — chuyển `<audio>` + `#audio-mute-btn` lên trước `<script>audioMgr.init()</script>` riêng để đảm bảo DOM ready
- **Fix CSS comment YouTube Modal** — thêm `/*` mở đầu bị thiếu → không còn CSS parse error
- **Fix hero h1 font-size** — `clamp(36px,5vw,72px)` → `clamp(42px,5.5vw,80px)` đúng design spec
- **Testimonials thật** — 3 khách hàng thật: Tuấn Trần (Fly Media), Bùi Ngọc Lâm (Archivina JSC), Phạm Thị Lan Anh (VNC Ocean Park). 100K view thay vì 500K
- **Nội dung chỉnh sửa đồng bộ:**
  - "48h" → "72h" đồng bộ 4 chỗ: hero stats counter, feature list, KPI Standard, dashboard avg
  - "Giao hàng chuẩn" → "Giao hàng từ 3 ngày"
  - "Post-processing trong Lightroom" → "Post-processing trong D5 Render"
  - "Revision không giới hạn đến khi ưng ý" → "Hỗ trợ chỉnh sửa trong phạm vi yêu cầu ban đầu"
- **Xóa section Feature 2 (Tốc độ/Dashboard)** — bỏ hoàn toàn section "Giao hàng nhanh, không để bạn chờ" (-88 dòng) để trang tập trung vào sản phẩm

### 🔲 Việc cần làm tiếp

**[UNBLOCK — bạn tự làm]**
- [ ] Supabase `site_config` → sửa `showreel_video_id` = chỉ ID ngắn 11 ký tự (bỏ `&list=...`)
- [ ] Supabase `site_config` → thêm `showreel_poster_url` = URL thumbnail YouTube (làm fallback khi video chưa load)
- [ ] Upload ảnh cho `cong-vien-1` lên R2 → bật `active=true`
- [ ] Thêm `video_id` cho các dự án khi có video YouTube

**[HIGH]**
- [ ] Footer — thêm email liên hệ, địa chỉ studio
- [ ] Favicon 32×32 + 192×192 (ảnh hưởng SEO + professional look)

**[MEDIUM]**
- [ ] Thay khung "D5 Render Settings" (Feature 1) bằng ảnh/animation 3 giai đoạn quy trình render — đang thảo luận hướng triển khai
- [ ] Cập nhật `/add-project` command thêm trường `urls_360`

**[PHASE 2]**
- [ ] Next.js 14 migration
- [ ] Trang `/portfolio` với filter category
- [ ] Form `/contact`

### Quyết định quan trọng
- **Supabase URL không có `/rest/v1/`** — SDK tự thêm path
- **Slug R2 phải không dấu, gạch nối** — khoảng trắng gây 404
- **service_role key** — luôn lấy dòng `eyJ...` trong Supabase Settings → API, không dùng publishable key
- **Showreel ID trong Supabase** — `site_config.showreel_video_id`, chỉ lưu 11 ký tự ID ngắn (không full URL, không `&list=...`), thay trực tiếp trên Supabase không cần redeploy
- **`var(--dim)=#444` không dùng cho text** — tương phản quá thấp (~2.7:1), chỉ dùng `var(--muted)=#888` trở lên
- **Slash commands `/add-project`** — dùng để thêm dự án mới, xuất SQL + R2 path sẵn, không viết tay
- **Cinema showreel dùng autoplay muted iframe thay vì modal** — đặt ở đầu hero, video chạy nền khi load page; khác session 3 (dùng click-to-modal) vì cinema screen đặt ở vị trí visual hero nên autoplay muted phù hợp hơn; `pointer-events: none` trên iframe để không chặn scroll/tilt interaction
- **Cinema hero layout: text overlay (Option A) thay vì tilt card** — v1 tilt 3D gây khoảng đen + gap lớn giữa khung và text; v2 full-width overlay giải quyết triệt để: text luôn hiện above-the-fold, không bao giờ có khoảng trống, mobile thấy nội dung ngay
- **iframe cover trick cho video background** — YouTube iframe 16:9 không thể dùng `object-fit: cover`; giải pháp: `width: 100vw; height: 56.25vw; min-height: 100%; min-width: 177.78vh; translate(-50%,-50%)` — đảm bảo luôn fill container bất kể tỉ lệ màn hình
- **Poster fallback từ `showreel_poster_url`** — YouTube autoplay bị Chrome block trong một số trường hợp; dùng thumbnail ảnh tĩnh làm `background-image` trên `cinema-screen` → luôn có ảnh đẹp ngay cả khi video không load
- **Pannellum lazy load** — CDN JS (~150KB) chỉ load khi user click mở viewer lần đầu, không ảnh hưởng page load score
- **Tour 360° dùng bảng `tour360` độc lập** — không dùng `portfolio.urls_360`; lý do: 360° là sản phẩm riêng biệt, có thể có dự án 360° không thuộc portfolio thường, quản lý tách biệt dễ hơn
- **R2 CORS bắt buộc cho Pannellum** — `<img>` không cần CORS nhưng Pannellum dùng `XMLHttpRequest` để đọc binary → R2 phải có CORS policy cho phép domain production
- **File ảnh 360° thực tế tên `306_xx.webp`** — user upload nhầm tên (306 thay vì 360); fix bằng cách cập nhật URL trong Supabase thay vì upload lại — nhanh hơn
- **WebP cho ảnh 360°** — dùng WebP (không phải JPG) vì Pannellum hỗ trợ tốt và tiết kiệm ~35% dung lượng; target ≤1.5MB/ảnh ở 8000×4000px
- **Mobile 360° viewer** — side buttons ẩn hoàn toàn trên mobile (khó bấm khi đang xoay panorama), thay bằng bottom nav bar pill riêng dễ bấm hơn
- **`aria-label` trên tất cả icon-only buttons** — screen reader đọc `✕` là "cross" không phải "đóng"; luôn thêm aria-label cho button chỉ có ký tự Unicode
- **Lightbox scroll-dọc thay vì prev/next** — portfolio kiến trúc có ảnh panorama rộng, cuộn dọc tự nhiên hơn click next; user xem theo nhịp riêng, không bị gián đoạn giữa ảnh; phù hợp hành vi scroll mobile
- **`object-fit: cover; object-position: center` cho ảnh lightbox** — ảnh render kiến trúc thường panorama 21:9+; nếu dùng `height: auto` thì ảnh hiện thành dải mỏng, mất tác động thị giác; crop về 16:9 center đảm bảo mỗi ảnh đều có "impact" ngay khi hiện
- **Lazy load ảnh lightbox bằng `data-src` + IntersectionObserver riêng** — không dùng `loading="lazy"` trên img tạo bằng JS (thuộc tính này không hoạt động đáng tin cậy khi set sau khi append vào DOM); dùng observer với `rootMargin: 200px` để preload trước khi scroll đến
- **Counter IntersectionObserver `rootMargin: '-10% 0px -89% 0px'`** — pin vùng "đang xem" vào 1/10 đầu của scroll container; threshold=0.5 cũ không đáng tin với ảnh panorama rất dài/rộng
- **Nút "← Dự án" và "Trở về" nhóm cùng bên trái header** — user cần nhận ra ngay 2 lối thoát: đổi dự án (không đóng lightbox) và về trang chính; đặt cùng nhóm trái giúp mắt tìm theo thói quen đọc trái-phải, không nhầm với counter/video bên phải
- **`_portfolioItems` global array** — lưu kết quả fetch portfolio ở scope module thay vì chỉ dùng trong `renderPortfolio()`; cho phép lightbox project switcher render grid mà không cần fetch lại
- **Film strip thumbnail không hiệu quả cho portfolio kiến trúc** — thử tilt -5° gây lag vì CSS transform trên nhiều phần tử cùng lúc; bỏ tilt rồi bỏ luôn strip vì không thêm giá trị khi ảnh đã cuộn dọc liên tục; quyết định: lightbox chỉ cần header + scroll đơn giản
- **Lightbox ảnh full `height: auto` thay vì crop 16:9** — ảnh render kiến trúc có tỉ lệ đa dạng (panorama, portrait, standard); crop 16:9 cắt mất nội dung; user muốn xem toàn bộ ảnh không cần click; `display: block; width: 100%; height: auto` là CSS đơn giản nhất và đúng nhất
- **Tránh kết hợp `display: flex` + `object-fit: contain` + `height: auto`** — ba thuộc tính này xung đột nhau: `object-fit` chỉ hoạt động khi cả width lẫn height được set cứng; khi dùng `height: auto` thì `object-fit` vô nghĩa; `flex` làm container không tính height đúng từ img; kết quả: ảnh chồng nhau trên desktop. Giải pháp: bỏ hết, dùng `display: block` thuần túy
- **YouTube unmute dùng postMessage thay vì src rebuild** — thay đổi `mute=1` trong src sẽ reload toàn bộ iframe (video restart); `postMessage({func:'unMute'})` toggle tiếng ngay lập tức không gián đoạn; yêu cầu thêm `enablejsapi=1` vào embed URL
- **Audio phát khi mở lightbox/360° thay vì autoplay hero** — browser chặn audio autoplay khi chưa có user interaction; lightbox/360° là user-initiated action (click) nên audio được phép phát; không cần consent riêng
- **`audioMgr.init()` phải chạy sau khi `#audio-mute-btn` có trong DOM** — đặt `<audio>` + `<button id="audio-mute-btn">` TRƯỚC `<script>audioMgr.init()</script>`; nếu ngược lại `this._btn = null` và button mute không hoạt động
- **Xóa Feature 2 (Tốc độ) thay vì giữ** — section dashboard mockup (The Manor Central Park, Biệt thự Phú Quốc...) là nội dung giả, không thuyết phục; user muốn tập trung vào sản phẩm thật; quyết định: bỏ hẳn, không thay thế
- **Content testimonials dùng số thực tế** — 100K view (không phải 500K) để credible hơn; tên/công ty khớp với trust bar (Fly Media, Archivina JSC, VNC Ocean Park)
- **Giao hàng "từ 3 ngày" thay vì "48h"** — 48h không thực tế cho mọi dự án; "từ 3 ngày" (72h) trung thực hơn và tránh kỳ vọng sai; đồng bộ toàn bộ 4 chỗ trong trang
