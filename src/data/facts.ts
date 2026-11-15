/**
 * Dữ liệu thu thập từ các nguồn công khai (đã tóm tắt lại bằng lời riêng).
 * Mỗi mục đều ghi nguồn để học sinh có thể kiểm chứng.
 */
export interface Fact {
  title: string;
  body: string;
  source: string;
  url: string;
}

export const facts: Fact[] = [
  {
    title: "Lũ tháng 10/2020 cao hơn lũ lịch sử 1999",
    body: "Đỉnh lũ sông Thạch Hãn tại Thạch Hãn là 7,4 m, cao hơn đỉnh lũ năm 1999 (7,3 m) và trên báo động III là 1,4 m. Sông Hiếu tại Đông Hà đạt 5,35 m, trên báo động III là 1,35 m.",
    source: "Báo Nhân Dân, 18/10/2020",
    url: "https://nhandan.vn/canh-bao-rui-ro-thien-tai-do-ngap-lut-lu-quet-sat-lo-dat-len-cap-gan-cao-nhat-post620910.html",
  },
  {
    title: "Đợt mưa lũ đầu tháng 11/2025",
    body: "Toàn tỉnh có 139 vị trí ngập và 51 điểm sạt lở. Hơn 5.027 hộ (15.337 nhân khẩu) nằm trong vùng ngập.",
    source: "Báo Sài Gòn Giải Phóng, 03/11/2025",
    url: "https://www.sggp.org.vn/quang-tri-hon-5000-ho-dan-bi-ngap-sat-lo-hon-1000-m-dat-da-post821508.html",
  },
  {
    title: "17 điểm ngập và sạt lở ngày 23/10/2025",
    body: "Xã Ba Lòng có 4 điểm ngập ở các cầu tràn. Xã Bến Quan sạt lở taluy âm tại Km24+820. Xã Khe Sanh có 4 vị trí sạt lở hoặc trôi đứt nền đường.",
    source: "Báo Đại biểu Nhân dân, 23/10/2025",
    url: "https://daibieunhandan.vn/quang-tri-co-17-diem-ngap-sat-lo-do-mua-lon-10392615.html",
  },
  {
    title: "Kế hoạch sơ tán khi bão số 5 (tháng 8/2025)",
    body: "Theo phương án ứng phó cấp độ 4, Quảng Trị dự kiến sơ tán 67.257 hộ với 245.636 nhân khẩu. Nơi sơ tán gồm trường học, trụ sở UBND và nhà văn hóa cộng đồng.",
    source: "Báo Đại biểu Nhân dân, 24/08/2025",
    url: "https://daibieunhandan.vn/quang-tri-hop-ban-ngay-trong-dem-truoc-gio-bao-so-5-do-bo-10384473.html",
  },
  {
    title: "Vùng nguy cơ lũ quét và sạt lở ở Quảng Trị",
    body: "Bản tin cảnh báo của cơ quan khí tượng thủy văn thường nêu nguy cơ cao ở các xã miền núi như Đakrông, Hướng Lập, Hướng Phùng, Lao Bảo, Khe Sanh, Tà Rụt.",
    source: "Đài Khí tượng Thủy văn, bản tin 01/9/2026",
    url: "https://kttv.gov.vn//upload/thuyvan2/2026/9/1/dbqg_lqsl_20260901_0730.pdf",
  },
  {
    title: "Cục Quản lý đê điều và PCTT khuyến cáo khi mưa lớn (24/9/2026)",
    body: "Không đi qua ngầm, tràn, cầu, cống đang ngập; tránh xoáy nước ở miệng cống, hố ga; không vớt củi, đánh cá khi lũ; ngắt điện và khóa van gas trước khi nước dâng; gọi 112 khi khẩn cấp.",
    source: "Cục Quản lý đê điều và Phòng, chống thiên tai (qua cổng thông tin Hà Tĩnh)",
    url: "https://hatinh.gov.vn/vi/bai-viet/huong-dan-dam-bao-an-toan-khi-co-mua-lon-lu-ngap-lut-lu-quet-va-sat-lo-dat-cho-khu-vuc-tu-nghe-an-den-quang-tri",
  },
  {
    title: "Nước sau lũ cần đun sôi ít nhất 3 phút",
    body: "Nước chưa xử lý sau lũ có thể gây tiêu chảy và các bệnh khác. Khi dọn dẹp cần mang găng tay, ủng cao su và kiểm tra điện trước.",
    source: "UNICEF Việt Nam",
    url: "https://www.unicef.org/vietnam/vi/an-toan-lu-quet-sat-lo-dat",
  },
  {
    title: "Học sinh là tuyên truyền viên an toàn",
    body: "Chuyên gia khuyến nghị đưa kỹ năng thành phản xạ: tránh vùng ngập sâu, không trú dưới cây khi dông sét, nhận biết dấu hiệu sạt lở, lập túi khẩn cấp và sơ đồ thoát hiểm.",
    source: "Báo Nông nghiệp và Môi trường, 21/07/2026",
    url: "https://nongnghiepmoitruong.vn/dua-ky-nang-phong-chong-thien-tai-vao-hoc-duong-d822468.html",
  },
];

export interface Source {
  title: string;
  url: string;
  kind: "Hướng dẫn" | "Cuộc thi" | "Tin tức";
  note: string;
}

export const sources: Source[] = [
  { title: "Hướng dẫn an toàn khi mưa lớn, lũ, lũ quét, sạt lở (Nghệ An đến Quảng Trị)", url: "https://hatinh.gov.vn/vi/bai-viet/huong-dan-dam-bao-an-toan-khi-co-mua-lon-lu-ngap-lut-lu-quet-va-sat-lo-dat-cho-khu-vuc-tu-nghe-an-den-quang-tri", kind: "Hướng dẫn", note: "Cục Quản lý đê điều và PCTT" },
  { title: "Hướng dẫn an toàn trước lũ quét và sạt lở đất", url: "https://www.unicef.org/vietnam/vi/an-toan-lu-quet-sat-lo-dat", kind: "Hướng dẫn", note: "UNICEF Việt Nam" },
  { title: "Dấu hiệu nhận biết nguy cơ lũ quét, sạt lở đất và cách phòng tránh", url: "https://vietnamnet.vn/dau-hieu-nhan-biet-nguy-co-lu-quet-sat-lo-dat-nguyen-nhan-va-cach-phong-tranh-2243777.html", kind: "Hướng dẫn", note: "VietNamNet" },
  { title: "Khuyến cáo ứng phó bão và mưa lũ sau bão", url: "https://daibieunhandan.vn/ung-pho-voi-bao-so-5-kajiki-va-mua-lu-sau-bao-10384430.html", kind: "Hướng dẫn", note: "Báo Đại biểu Nhân dân" },
  { title: "Khuyến cáo những việc cần làm sau bão", url: "https://hatinh.gov.vn/vi/bai-viet/khuyen-cao-nhung-viec-can-lam-sau-bao", kind: "Hướng dẫn", note: "Cổng thông tin Hà Tĩnh" },
  { title: "Mưa dông kèm lốc sét: những kỹ năng phòng tránh cần biết", url: "https://baoquocte.vn/mua-dong-kem-loc-set-nhung-ky-nang-phong-tranh-can-biet-427693.html", kind: "Hướng dẫn", note: "Báo Thế giới và Việt Nam" },
  { title: "Bộ Y tế khuyến cáo hạn chế ra ngoài trời từ 10 giờ đến 16 giờ", url: "https://nongnghiepmoitruong.vn/bo-y-te-khuyen-cao-han-che-ra-ngoai-troi-tu-10-gio-den-16-gio-d813366.html", kind: "Hướng dẫn", note: "Báo Nông nghiệp và Môi trường" },
  { title: "Phòng tránh say nắng, say nóng cho trẻ em", url: "https://nhandan.vn/ocop/phong-tranh-say-nang-say-nong-cho-tre-em-post758969.html", kind: "Hướng dẫn", note: "Báo Nhân Dân" },
  { title: "Đưa kỹ năng phòng chống thiên tai vào học đường", url: "https://nongnghiepmoitruong.vn/dua-ky-nang-phong-chong-thien-tai-vao-hoc-duong-d822468.html", kind: "Tin tức", note: "Báo Nông nghiệp và Môi trường" },
  { title: "Cuộc thi \"1 phút xanh\" - Cùng em hành động sớm", url: "https://www.unicef.org/vietnam/vi/1phutxanhpctt", kind: "Cuộc thi", note: "UNICEF và Tổng cục PCTT, dành cho học sinh 13–18 tuổi" },
  { title: "Phóng viên nhí về phòng, chống thiên tai", url: "https://www.unicef.org/vietnam/vi/phong-vien-nhi-pctt", kind: "Cuộc thi", note: "UNICEF, dành cho trẻ 11–15 tuổi" },
  { title: "Nâng cao kiến thức phòng chống thiên tai cho trẻ em từ khi trong nhà trường", url: "https://vietnamnet.vn/nang-cao-kien-thuc-phong-chong-thien-tai-cho-tre-em-ngay-tu-khi-trong-nha-truong-2243368.html", kind: "Tin tức", note: "VietNamNet" },
];
