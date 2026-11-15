/**
 * Số liệu lũ đã đối chiếu trực tiếp với nội dung bài báo gốc.
 * Chỉ ghi những gì bài nêu; chỗ bài không nêu thì để trống, không suy đoán.
 */
export interface Reading {
  river: string;
  station: string;
  level: string; // mực nước
  vsAlarm: string; // so với mức báo động
}

export interface FloodEvent {
  id: string;
  date: string;
  title: string;
  summary: string[];
  readings?: Reading[];
  source: string;
  url: string;
}

export const floodEvents: FloodEvent[] = [
  {
    id: "2024-10-qb",
    date: "28/10/2024",
    title: "Lũ lớn ở Quảng Bình (cũ), tháng 10/2024",
    summary: [
      "Lệ Thủy có 15.801 nhà bị ngập, Quảng Ninh 11.540 hộ, Đồng Hới khoảng 1.000 hộ.",
      "58 thôn bản ở Lệ Thủy và Quảng Ninh bị chia cắt. Tỉnh di dời hơn 1.200 hộ (3.522 nhân khẩu).",
      "Có 84 điểm ngập trên quốc lộ và tỉnh lộ, 37 vị trí sạt lở trên QL9B.",
      "Tỉnh có hơn 152 hồ chứa thủy lợi và 2 hồ thủy điện, dung tích hồ thủy lợi đạt 94,33% đến 98,92%.",
    ],
    readings: [
      { river: "Nhật Lệ", station: "Đồng Hới", level: "2,11 m (11 giờ ngày 28/10)", vsAlarm: "trên báo động III 0,11 m, vượt lũ lịch sử 1983 (2,05 m)" },
      { river: "Kiến Giang", station: "Lệ Thủy", level: "dao động", vsAlarm: "trên báo động III khoảng 1 m, thấp hơn lũ lịch sử 2020 khoảng 1,2 m" },
    ],
    source: "Báo Tuổi Trẻ và Báo Đại biểu Nhân dân, 28/10/2024",
    url: "https://tuoitre.vn/lu-tren-song-nhat-le-quang-binh-vuot-muc-lich-su-nam-1983-mien-trung-mua-lon-toi-30-10-20241028113544082.htm",
  },
  {
    id: "2020-10-kg",
    date: "19/10/2020",
    title: "Lũ lịch sử sông Kiến Giang, tháng 10/2020",
    summary: [
      "Đỉnh lũ sông Kiến Giang ngày 19/10/2020 là 4,88 m, cao hơn đỉnh lũ năm 1979 (3,91 m).",
      "Đồng bằng Lệ Thủy ngập 2 đến 4 m, kéo dài hơn 10 ngày.",
    ],
    source: "Báo VnExpress, 29/10/2024",
    url: "https://vnexpress.net/chay-lu-ben-dong-kien-giang-4809550.html",
  },
  {
    id: "2025-11",
    date: "3/11/2025",
    title: "Mưa lũ đầu tháng 11/2025",
    summary: [
      "Toàn tỉnh có 139 vị trí ngập và 51 điểm sạt lở.",
      "Hơn 5.027 hộ (15.337 nhân khẩu) nằm trong vùng ngập.",
      "Quốc lộ 9C (km29+100, khu vực Làng Ho) sạt lở hơn 1.000 m³ đất đá, giao thông bị chia cắt.",
    ],
    readings: [
      { river: "Thạch Hãn", station: "Đakrông", level: "33,87 m", vsAlarm: "trên báo động III 0,37 m" },
      { river: "Thạch Hãn", station: "Quảng Trị", level: "4,90 m", vsAlarm: "trên báo động II 0,4 m" },
      { river: "Hiếu", station: "Đầu Mầu", level: "24,13 m", vsAlarm: "trên báo động III 0,37 m" },
      { river: "Ô Lâu", station: "Mỹ Chánh", level: "5,97 m", vsAlarm: "trên báo động III 0,67 m" },
      { river: "Ô Lâu", station: "Hải Tân", level: "3,33 m", vsAlarm: "dưới báo động III 0,07 m" },
    ],
    source: "Báo Sài Gòn Giải Phóng, 03/11/2025",
    url: "https://www.sggp.org.vn/quang-tri-hon-5000-ho-dan-bi-ngap-sat-lo-hon-1000-m-dat-da-post821508.html",
  },
  {
    id: "2025-10",
    date: "23/10/2025",
    title: "17 điểm ngập và sạt lở sau mưa lớn",
    summary: [
      "Xã Ba Lòng: 4 điểm ngập tại các cầu tràn.",
      "Xã Bến Quan: sạt lở taluy âm tại Km24+820 và ngập cầu tràn.",
      "Xã Khe Sanh: xói trôi nhiều vị trí mặt đường, 4 vị trí sạt lở hoặc trôi đứt nền đường.",
      "Xã Đakrông: 1 điểm ngập.",
    ],
    source: "Báo Đại biểu Nhân dân, 23/10/2025",
    url: "https://daibieunhandan.vn/quang-tri-co-17-diem-ngap-sat-lo-do-mua-lon-10392615.html",
  },
  {
    id: "2020-10",
    date: "9 đến 18/10/2020",
    title: "Lũ lớn tháng 10/2020",
    summary: [
      "Đỉnh lũ sông Thạch Hãn tại Thạch Hãn là 7,4 m, cao hơn đỉnh lũ năm 1999 (7,3 m).",
      "Xã Hải Lâm (Hải Lăng): hơn 800 hộ bị cô lập, có nhà ngập đến nóc. Người dân cho biết lũ cao hơn đỉnh lũ năm 1983.",
      "Tỉnh huy động 8 xuồng và hơn 100 chiến sĩ, công an cứu hộ.",
    ],
    readings: [
      { river: "Thạch Hãn", station: "Thạch Hãn", level: "7,4 m", vsAlarm: "trên báo động III 1,4 m" },
      { river: "Hiếu", station: "Đông Hà", level: "5,35 m (3 giờ ngày 18/10)", vsAlarm: "trên báo động III 1,35 m" },
    ],
    source: "Báo Nhân Dân 18/10/2020 và Tuổi Trẻ 09/10/2020",
    url: "https://nhandan.vn/canh-bao-rui-ro-thien-tai-do-ngap-lut-lu-quet-sat-lo-dat-len-cap-gan-cao-nhat-post620910.html",
  },
];

export const floodRiskAreas = {
  source: "Báo Nhân Dân, 18/10/2020",
  url: "https://nhandan.vn/canh-bao-rui-ro-thien-tai-do-ngap-lut-lu-quet-sat-lo-dat-len-cap-gan-cao-nhat-post620910.html",
  flash: "Nguy cơ rất cao lũ quét, sạt lở đất: Hướng Hóa, Đakrông, Cam Lộ và phía Tây Vĩnh Linh, Gio Linh, Hải Lăng.",
  flood: "Ngập sâu diện rộng ở vùng trũng, đô thị: Hướng Hóa, Vĩnh Linh, Gio Linh, Cam Lộ, Triệu Phong, Hải Lăng, TP Đông Hà, TX Quảng Trị.",
};
