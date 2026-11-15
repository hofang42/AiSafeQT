# AI Safe QT: Học sinh chủ động ứng phó thiên tai (Quảng Trị)

Ứng dụng web giúp học sinh học cách phòng tránh bão, lũ lụt, lũ quét, sạt lở, dông sét và nắng nóng.
Phát triển từ mã nguồn mở [SecurEd](https://github.com/janvis11/SecurEd) (giấy phép MIT), được Việt hóa và viết lại theo 5 chức năng của đề tài.

## Chức năng
1. **Trợ lý AI hỏi đáp** (`/tro-ly`): gọi Gemini qua `api/chat.ts`, có chế độ offline dự phòng.
2. **Thư viện tình huống mô phỏng** (`/tinh-huong`): `src/data/scenarios.ts`.
3. **Trò chơi và kiểm tra** (`/tro-choi`): trắc nghiệm và gói túi khẩn cấp, `src/data/quiz.ts`.
4. **Bản đồ học tập an toàn** (`/ban-do`): sông, hồ chứa, bệnh viện, điểm ngập, lũ quét và số liệu các đợt lũ.
5. **Góc tuyên truyền** (`/tuyen-truyen`): khẩu hiệu, thẻ hướng dẫn, nguồn tài liệu.
6. **Tài khoản học sinh** (`/dang-nhap`, `/ho-so`): lưu tiến độ và huy hiệu ngay trên thiết bị (localStorage, chưa có máy chủ).

## Chạy thử
```
npm install
npm run dev
```
Triển khai Vercel: đặt biến môi trường `GEMINI_API_KEY` (tùy chọn `GEMINI_MODEL`) để bật chatbot thật.
Muốn đổi nội dung: chỉ sửa các file trong `src/data/`.

## Nguồn dữ liệu
- Hình dạng sông, hồ chứa, bệnh viện, địa danh: [OpenStreetMap](https://www.openstreetmap.org/copyright) (ODbL), thu thập 15/11/2026.
- Số liệu lũ, điểm ngập, sạt lở và khuyến cáo: các bài báo và văn bản chính thống, đã tóm tắt lại và ghi nguồn ngay trong `src/data/facts.ts`, `floods.ts`, `places.ts`.
- Điểm ngập và lũ quét đặt ở trung tâm xã nên chỉ là vị trí khu vực. Chưa có danh sách nhà tránh trú chính thức, cần lấy từ Ban Chỉ huy PCTT&TKCN tỉnh hoặc UBND xã.
