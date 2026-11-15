export type PlaceKind = "ngap" | "luquet" | "ho" | "y-te" | "ven-bien";

export interface Place {
  id: string;
  name: string;
  kind: PlaceKind;
  area: string;
  lat: number;
  lng: number;
  note: string;
  /** "bao-chi": từ bài báo đã đối chiếu; "osm": toạ độ lấy từ OpenStreetMap; "gan-dung": vị trí khu vực */
  basis: "bao-chi" | "osm" | "gan-dung";
  source?: string;
  url?: string;
}

export const kindMeta: Record<PlaceKind, { label: string; color: string }> = {
  ngap: { label: "Điểm ngập lụt", color: "#1565c0" },
  luquet: { label: "Lũ quét, sạt lở", color: "#8d4b1f" },
  ho: { label: "Hồ chứa, thủy điện", color: "#00838f" },
  "y-te": { label: "Cơ sở y tế", color: "#2e7d32" },
  "ven-bien": { label: "Ven biển, nước dâng", color: "#6a1b9a" },
};

export const basisLabel: Record<Place["basis"], string> = {
  "bao-chi": "Theo bài báo đã đối chiếu",
  osm: "Toạ độ từ OpenStreetMap",
  "gan-dung": "Vị trí khu vực, gần đúng",
};

/**
 * Toạ độ địa danh và cơ sở hạ tầng lấy từ OpenStreetMap (ODbL), thu thập 15/11/2026, gồm cả Quảng Bình (cũ) nay thuộc tỉnh Quảng Trị sau sáp nhập.
 * Các điểm ngập, sạt lở lấy từ bài báo, đặt ở trung tâm xã nên chỉ là vị trí khu vực.
 * Chưa có danh sách nhà tránh trú chính thức: hỏi Ban Chỉ huy PCTT&TKCN tỉnh hoặc UBND xã.
 */
const DMN = "Báo Đại biểu Nhân dân, 23/10/2025";
const DMN_URL = "https://daibieunhandan.vn/quang-tri-co-17-diem-ngap-sat-lo-do-mua-lon-10392615.html";
const KTTV = "Đài Khí tượng Thủy văn, bản tin 01/9/2026";
const KTTV_URL = "https://kttv.gov.vn//upload/thuyvan2/2026/9/1/dbqg_lqsl_20260901_0730.pdf";

export const places: Place[] = [
  /* Điểm ngập, sạt lở (bài báo đã đối chiếu) */
  { id: "n1", name: "Xã Ba Lòng", kind: "ngap", area: "Đakrông", lat: 16.6591, lng: 106.9509, note: "4 điểm ngập tại các cầu tràn (đợt mưa 23/10/2025).", basis: "bao-chi", source: DMN, url: DMN_URL },
  { id: "n2", name: "Xã Đakrông", kind: "ngap", area: "Đakrông", lat: 16.6614, lng: 106.8228, note: "1 điểm ngập (23/10/2025). Sông Thạch Hãn tại Đakrông lên 33,87 m, trên báo động III 0,37 m (3/11/2025).", basis: "bao-chi", source: DMN, url: DMN_URL },
  { id: "n3", name: "Thị xã Quảng Trị", kind: "ngap", area: "Sông Thạch Hãn", lat: 16.7539, lng: 107.1859, note: "Sông Thạch Hãn tại Quảng Trị 4,90 m, trên báo động II 0,4 m (3/11/2025).", basis: "gan-dung", source: "Báo Sài Gòn Giải Phóng, 03/11/2025", url: "https://www.sggp.org.vn/quang-tri-hon-5000-ho-dan-bi-ngap-sat-lo-hon-1000-m-dat-da-post821508.html" },
  { id: "n4", name: "Thành phố Đông Hà", kind: "ngap", area: "Sông Hiếu", lat: 16.8203, lng: 107.0982, note: "Đỉnh lũ sông Hiếu tại Đông Hà 5,35 m, trên báo động III 1,35 m (18/10/2020). Nằm trong vùng ngập sâu diện rộng.", basis: "gan-dung", source: "Báo Nhân Dân, 18/10/2020", url: "https://nhandan.vn/canh-bao-rui-ro-thien-tai-do-ngap-lut-lu-quet-sat-lo-dat-len-cap-gan-cao-nhat-post620910.html" },
  { id: "n5", name: "Xã Hải Lâm (khu vực Hải Lăng)", kind: "ngap", area: "Hải Lăng", lat: 16.7229, lng: 107.2056, note: "Lũ 10/2020: hơn 800 hộ bị cô lập, có nhà ngập đến nóc. Vị trí đặt ở thị trấn Hải Lăng, gần đúng.", basis: "gan-dung", source: "Báo Tuổi Trẻ, 09/10/2020", url: "https://tuoitre.vn/cuu-hang-tram-nguoi-dan-tren-noc-nha-giua-tam-lu-lich-su-o-quang-tri-20201009205832549.htm" },

  /* Lũ quét, sạt lở */
  { id: "q1", name: "Xã Bến Quan", kind: "luquet", area: "Vĩnh Linh", lat: 17.0224, lng: 106.9029, note: "Sạt lở taluy âm tại Km24+820 và ngập cầu tràn (23/10/2025).", basis: "bao-chi", source: DMN, url: DMN_URL },
  { id: "q2", name: "Xã Khe Sanh", kind: "luquet", area: "Hướng Hóa", lat: 16.6273, lng: 106.7377, note: "Xói trôi nhiều vị trí mặt đường, 4 vị trí sạt lở hoặc trôi đứt nền đường (23/10/2025). Có trong cảnh báo lũ quét 01/9/2026.", basis: "bao-chi", source: DMN, url: DMN_URL },
  { id: "q3", name: "Xã Lao Bảo", kind: "luquet", area: "Hướng Hóa", lat: 16.6136, lng: 106.5981, note: "Nằm trong danh sách có nguy cơ lũ quét trên sông suối nhỏ, sạt lở sườn dốc.", basis: "gan-dung", source: KTTV, url: KTTV_URL },
  { id: "q4", name: "Xã Hướng Lập", kind: "luquet", area: "Hướng Hóa", lat: 16.8867, lng: 106.5685, note: "Nằm trong danh sách có nguy cơ lũ quét, sạt lở đất.", basis: "gan-dung", source: KTTV, url: KTTV_URL },
  { id: "q5", name: "Xã Hướng Phùng", kind: "luquet", area: "Hướng Hóa", lat: 16.7419, lng: 106.5817, note: "Nằm trong danh sách có nguy cơ lũ quét, sạt lở đất.", basis: "gan-dung", source: KTTV, url: KTTV_URL },
  { id: "q6", name: "Xã Tà Rụt", kind: "luquet", area: "Đakrông", lat: 16.3926, lng: 106.9879, note: "Nằm trong danh sách có nguy cơ lũ quét; ngầm tràn thường bị ngập khi mưa lớn.", basis: "gan-dung", source: KTTV, url: KTTV_URL },
  { id: "q7", name: "Cam Lộ", kind: "luquet", area: "Cam Lộ", lat: 16.8075, lng: 106.9935, note: "Nằm trong vùng nguy cơ rất cao lũ quét, sạt lở đất.", basis: "gan-dung", source: KTTV, url: KTTV_URL },

  /* Ven biển */
  { id: "b1", name: "Cửa Việt", kind: "ven-bien", area: "Gio Linh", lat: 16.9066, lng: 107.1776, note: "Vùng cửa sông, ven biển chịu gió bão và nước dâng.", basis: "gan-dung" },
  { id: "b2", name: "Đảo Cồn Cỏ", kind: "ven-bien", area: "Đặc khu Cồn Cỏ", lat: 17.1541, lng: 107.341, note: "Đảo ngoài khơi, chịu ảnh hưởng trực tiếp của bão.", basis: "gan-dung" },

  /* Hồ chứa, thủy điện (OpenStreetMap) */
  { id: "h1", name: "Hồ Rào Quán", kind: "ho", area: "Đakrông", lat: 16.7102, lng: 106.6956, note: "Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh. Hãy nghe thông báo xả lũ của địa phương.", basis: "osm" },
  { id: "h2", name: "Thủy điện Đakrông 2", kind: "ho", area: "Đakrông", lat: 16.6552, lng: 106.8129, note: "Công trình thủy điện trên sông Đakrông.", basis: "osm" },
  { id: "h3", name: "Thủy điện Đakrông 3", kind: "ho", area: "Đakrông", lat: 16.561, lng: 106.9545, note: "Công trình thủy điện trên sông Đakrông.", basis: "osm" },
  { id: "h4", name: "Hồ Lìa", kind: "ho", area: "Hướng Hóa", lat: 16.4672, lng: 106.7149, note: "Hồ chứa vùng núi phía Tây. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h5", name: "Hồ Triệu Ái", kind: "ho", area: "Triệu Phong", lat: 16.7578, lng: 107.1146, note: "Hồ chứa trên địa bàn Triệu Phong.", basis: "osm" },
  { id: "h6", name: "Hồ Khe Mây", kind: "ho", area: "Cam Lộ", lat: 16.8094, lng: 107.078, note: "Hồ chứa trên địa bàn Cam Lộ.", basis: "osm" },
  { id: "h7", name: "Hồ Trúc Kinh", kind: "ho", area: "Gio Linh", lat: 16.875, lng: 107.0489, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h8", name: "Hồ Kinh Môn", kind: "ho", area: "Gio Linh", lat: 16.95, lng: 107.0042, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h9", name: "Hồ Hà Thượng", kind: "ho", area: "Gio Linh", lat: 16.9149, lng: 107.0386, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h10", name: "Hồ Bảo Đài", kind: "ho", area: "Vĩnh Linh", lat: 17.0648, lng: 106.9054, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h11", name: "Hồ La Ngà", kind: "ho", area: "Vĩnh Linh", lat: 17.0131, lng: 106.9382, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },

  /* Cơ sở y tế (OpenStreetMap) */
  { id: "y1", name: "Bệnh viện Đa khoa tỉnh Quảng Trị", kind: "y-te", area: "Đông Hà", lat: 16.7907, lng: 107.1099, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y2", name: "Trung tâm Y tế khu vực Đông Hà", kind: "y-te", area: "Đông Hà", lat: 16.8106, lng: 107.1093, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y3", name: "Bệnh viện Đa khoa khu vực Hướng Hóa", kind: "y-te", area: "Hướng Hóa", lat: 16.6243, lng: 106.7319, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y4", name: "Bệnh viện Đa khoa khu vực Triệu Hải", kind: "y-te", area: "Quảng Trị", lat: 16.7565, lng: 107.1918, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y5", name: "Bệnh viện Đa khoa khu vực Vĩnh Linh", kind: "y-te", area: "Vĩnh Linh", lat: 17.0739, lng: 107.0093, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y6", name: "Trung tâm Y tế khu vực Gio Linh", kind: "y-te", area: "Gio Linh", lat: 16.9264, lng: 107.0873, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y7", name: "Trung tâm Y tế khu vực Triệu Phong", kind: "y-te", area: "Triệu Phong", lat: 16.7654, lng: 107.1655, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y8", name: "Trung tâm Y tế khu vực Hải Lăng", kind: "y-te", area: "Hải Lăng", lat: 16.7012, lng: 107.2535, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y9", name: "Trung tâm Y tế khu vực Đakrông", kind: "y-te", area: "Đakrông", lat: 16.6977, lng: 106.8803, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y10", name: "Trung tâm Y tế khu vực Cam Lộ", kind: "y-te", area: "Cam Lộ", lat: 16.8077, lng: 107.0045, note: "Cấp cứu: gọi 115.", basis: "osm" },
  /* Quảng Bình (cũ), nay thuộc tỉnh Quảng Trị sau sáp nhập */
  { id: "n6", name: "Huyện Lệ Thủy", kind: "ngap", area: "Quảng Bình (cũ)", lat: 17.2239, lng: 106.7864, note: "28/10/2024: 15.801 nhà bị ngập. Lũ tháng 10/2020 làm đồng bằng Lệ Thủy ngập 2 đến 4 m, kéo dài hơn 10 ngày. Đỉnh lũ sông Kiến Giang ngày 19/10/2020 là 4,88 m, cao hơn đỉnh lũ 1979 (3,91 m).", basis: "gan-dung", source: "Báo Đại biểu Nhân dân, 28/10/2024 và Báo VnExpress, 29/10/2024", url: "https://daibieunhandan.vn/quang-binh-mua-lon-don-dap-so-nha-ngap-tang-len-hon-28-000-ho-10350409.html" },
  { id: "n7", name: "Huyện Quảng Ninh", kind: "ngap", area: "Quảng Bình (cũ)", lat: 17.4023, lng: 106.6403, note: "28/10/2024: 11.540 hộ bị ngập. Có 58 thôn bản ở Lệ Thủy và Quảng Ninh bị chia cắt.", basis: "gan-dung", source: "Báo Đại biểu Nhân dân, 28/10/2024", url: "https://daibieunhandan.vn/quang-binh-mua-lon-don-dap-so-nha-ngap-tang-len-hon-28-000-ho-10350409.html" },
  { id: "n8", name: "Thành phố Đồng Hới", kind: "ngap", area: "Quảng Bình (cũ)", lat: 17.4668, lng: 106.6045, note: "28/10/2024: khoảng 1.000 hộ bị ngập. Sông Nhật Lệ tại Đồng Hới đạt 2,11 m, trên báo động III 0,11 m và vượt đỉnh lũ lịch sử 1983 (2,05 m).", basis: "gan-dung", source: "Báo Tuổi Trẻ, 28/10/2024", url: "https://tuoitre.vn/lu-tren-song-nhat-le-quang-binh-vuot-muc-lich-su-nam-1983-mien-trung-mua-lon-toi-30-10-20241028113544082.htm" },
  { id: "h12", name: "Hồ Phú Vinh", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.455, lng: 106.5415, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h13", name: "Hồ Cẩm Ly", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.2023, lng: 106.6496, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h14", name: "Hồ Rào Đá", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.2631, lng: 106.6127, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h15", name: "Hồ Bàu Trạng", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.62, lng: 106.4241, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h16", name: "Hồ Vực Nồi", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.6009, lng: 106.4562, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h17", name: "Hồ Tiên Lang", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.7979, lng: 106.3216, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h18", name: "Hồ Vực Tròn", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.9001, lng: 106.3496, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "h19", name: "Hồ Đá Cờ", kind: "ho", area: "Quảng Bình (cũ)", lat: 17.9495, lng: 106.4729, note: "Hồ chứa nước. Khi hồ xả lũ, vùng hạ lưu có thể ngập nhanh.", basis: "osm" },
  { id: "y11", name: "Bệnh viện Đa khoa khu vực Đồng Hới", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.4536, lng: 106.6214, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y12", name: "Bệnh viện Hữu nghị Việt Nam - Cuba Đồng Hới", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.4743, lng: 106.6007, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y13", name: "Bệnh viện Đa khoa khu vực Quảng Ninh", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.3656, lng: 106.6751, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y14", name: "Bệnh viện Đa khoa khu vực Lệ Thủy", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.2202, lng: 106.7864, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y15", name: "Bệnh viện Đa khoa khu vực Bố Trạch", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.5892, lng: 106.5194, note: "Cấp cứu: gọi 115.", basis: "osm" },
  { id: "y16", name: "Bệnh viện Đa khoa khu vực Bắc Quảng Trị (Ba Đồn)", kind: "y-te", area: "Quảng Bình (cũ)", lat: 17.7571, lng: 106.4339, note: "Cấp cứu: gọi 115.", basis: "osm" },
];
