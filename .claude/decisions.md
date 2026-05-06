# Quyết định kỹ thuật — HD5 Studio

## Bảo mật API
- **Vercel API Route** proxy thay vì gọi Supabase trực tiếp từ browser — key không lộ trong DevTools
- Dùng **`service_role` key** server-side (bypass RLS an toàn) — không dùng `anon` key
- `SUPABASE_SERVICE_KEY` chỉ trong Vercel Env Vars + `.env.local` — không bao giờ trong code

## Database / CMS
- **`active = true` filter ở RLS policy** (không filter trong JS) — Supabase chỉ trả rows cần thiết
- **`full_urls` là array** — mỗi dự án có nhiều góc chụp → slideshow lightbox, dễ mở rộng
- **Cache `s-maxage=300`** trên API routes — load từ Vercel Edge, không chờ Supabase round-trip
- **`showreel_video_id`** — chỉ 11 ký tự ID ngắn, không full URL, không `&list=...`
- **Slug R2 phải không dấu, gạch nối** — khoảng trắng gây 404
- **Tour 360° dùng bảng `tour360` độc lập** — không dùng `portfolio.urls_360`; 360° là sản phẩm riêng biệt

## UX / Frontend
- **Skeleton loading** thay spinner toàn trang — user thấy layout ngay khi API cold start (~200ms)
- **Tách nút 🔍 và ▶ trên card** — click ảnh = lightbox, click video = YouTube, tránh nhầm
- **`iframe.src = ''` khi đóng modal** — video dừng hẳn, không âm thanh nền khi hidden
- **Lightbox scroll dọc thay vì prev/next** — portfolio kiến trúc có panorama rộng; cuộn dọc tự nhiên hơn, phù hợp mobile
- **Ảnh lightbox `height:auto`** — xem toàn bộ render không crop; không kết hợp `display:flex` + `object-fit` + `height:auto` (xung đột, ảnh chồng nhau desktop)
- **Lazy load bằng `data-src` + IntersectionObserver** — không dùng `loading="lazy"` trên img tạo bằng JS (không đáng tin)
- **Counter `rootMargin: '-10% 0px -89% 0px'`** — chính xác với ảnh panorama dài

## YouTube / Audio
- **YouTube unmute dùng `postMessage({func:'unMute'})`** — không rebuild src (video restart); yêu cầu `enablejsapi=1`
- **Audio phát khi mở lightbox/360° (user-initiated)** — không autoplay hero (browser chặn); 2 track R2: `audio/lightbox-ambient.mp3`, `audio/tour360-ambient.mp3`
- **`audioMgr.init()` chạy SAU khi `#audio-mute-btn` có trong DOM** — đặt `<audio>` + button TRƯỚC `<script>audioMgr.init()</script>`

## Hero Cinema
- **iframe cover trick**: `width:100vw; height:56.25vw; min-height:100%; min-width:177.78vh; translate(-50%,-50%)` — fill container bất kể tỉ lệ màn hình
- **Poster fallback từ `showreel_poster_url`** — luôn có ảnh khi video chưa load
- **`pointer-events:none` trên iframe** — không chặn scroll/interaction

## Tour 360°
- **R2 CORS bắt buộc cho Pannellum** — dùng XHR không phải `<img>` → phải có CORS policy
- **Pannellum lazy load CDN** (~150KB) chỉ khi click mở lần đầu
- **Mobile: side buttons ẩn**, dùng bottom nav bar pill thay thế

## CSS
- **`var(--dim)=#444` không dùng cho text** — tương phản ~2.7:1; chỉ dùng `var(--muted)=#888` trở lên
- **`aria-label` trên tất cả icon-only buttons** — screen reader đọc `✕` là "cross" không phải "đóng"

## Portfolio Category Sections
- **3 sections luôn hiển thị thay vì tab filter** — user thấy ngay 3 loại sản phẩm khi scroll, không cần click tab; phù hợp với mục tiêu showcase
- **Max 6 dự án mỗi section + nút "Xem thêm"** — tránh trang quá dài, dự án quan trọng nhất (sort_order thấp) luôn hiện đầu
- **`buildCard(p, hidden)` + `registerCardEvents(grid)` tách riêng** — renderCategoryGrid gọi lại 3 lần, cần hàm reusable tránh duplicate code
- **Services link dùng native anchor `#cat-kientru`** — không cần JS handler; tránh xung đột với global smooth scroll `a[href^="#"]`
- **R2 upload ảnh `.jpg` không phải `.webp`** — Supabase SQL phải dùng đúng extension file đã upload; lỗi phổ biến khi copy template SQL cũ dùng `.webp`

## Agents
- **3 sub-agents tách biệt** — reviewer / researcher / guide chạy độc lập, không làm nặng context chính
- **guide agent có context HD5 nhúng sẵn** — không cần giải thích lại bối cảnh mỗi lần hỏi
