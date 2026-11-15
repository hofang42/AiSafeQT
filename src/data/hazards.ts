export type HazardId = "bao" | "lu" | "luquet" | "set" | "nang";

export interface Hazard {
  id: HazardId;
  name: string;
  emoji: string;
  color: string; // tailwind bg class
  summary: string;
  signs: string[];
  before: string[];
  during: string[];
  after: string[];
}

export const hazards: Hazard[] = [
  {
    id: "bao",
    name: "Bão và áp thấp nhiệt đới",
    emoji: "🌀",
    color: "bg-sky-600",
    summary: "Gió mạnh, mưa lớn, nước dâng; thường ảnh hưởng Quảng Trị từ tháng 9 đến tháng 11.",
    signs: ["Bản tin dự báo bão của đài khí tượng", "Gió giật mạnh, mây đen kéo đến nhanh", "Biển động, sóng lớn"],
    before: ["Theo dõi bản tin thời tiết hằng ngày", "Chằng chống nhà cửa, cất đồ vật dễ bay", "Chuẩn bị đèn pin, nước uống, lương khô, thuốc men"],
    during: ["Ở trong nhà kiên cố, tránh xa cửa kính", "Không ra ngoài khi gió mạnh", "Ngắt cầu dao điện khi nhà bị ngập hoặc dột"],
    after: ["Tránh xa dây điện bị đứt", "Không uống nước chưa đun sôi", "Kiểm tra nhà cửa trước khi vào ở lại"],
  },
  {
    id: "lu",
    name: "Lũ lụt, ngập úng",
    emoji: "🌊",
    color: "bg-blue-600",
    summary: "Nước sông dâng cao, ngập nhà và đường; các vùng trũng ven sông Thạch Hãn, Bến Hải, Hiếu, Nhật Lệ, Kiến Giang dễ bị ngập.",
    signs: ["Mưa to kéo dài nhiều giờ", "Mực nước sông lên nhanh", "Nước tràn lên đường, vào sân nhà"],
    before: ["Biết điểm cao, nơi trú ẩn gần nhà", "Kê cao đồ đạc, giấy tờ, sách vở", "Học bơi và cách dùng phao cứu sinh"],
    during: ["Không lội qua nơi nước chảy xiết, ngầm tràn", "Tắt điện, không chạm vào thiết bị điện khi ướt", "Gọi người lớn, lực lượng cứu hộ khi cần"],
    after: ["Vệ sinh nhà cửa, khử khuẩn nguồn nước", "Không ăn thức ăn bị ngâm nước", "Cẩn thận rắn, rết xuất hiện sau lũ"],
  },
  {
    id: "luquet",
    name: "Lũ quét, sạt lở đất",
    emoji: "⛰️",
    color: "bg-amber-700",
    summary: "Nguy cơ cao ở khu vực miền núi như Hướng Hóa, Đakrông khi mưa lớn kéo dài.",
    signs: ["Mưa lớn kéo dài nhiều giờ", "Nước suối đục ngầu, dâng nhanh", "Vết nứt trên mái dốc, cây nghiêng, nghe tiếng ầm"],
    before: ["Biết nhà mình có nằm ở vùng nguy cơ không", "Thỏa thuận điểm tập kết khi có cảnh báo", "Không xây nhà dưới chân dốc, ven suối"],
    during: ["Di chuyển ngay lên nơi cao, xa suối và sườn dốc", "Không băng qua suối khi nước dâng", "Nghe loa, kẻng báo động của địa phương"],
    after: ["Không quay lại khi chưa có thông báo an toàn", "Tránh khu vực đất đá còn bở rời", "Báo cho chính quyền nếu thấy vết nứt mới"],
  },
  {
    id: "set",
    name: "Dông, sét",
    emoji: "⚡",
    color: "bg-yellow-500",
    summary: "Thường xảy ra vào chiều, nhất là mùa hè; nguy hiểm ở sân trường, đồng trống, dưới cây cao.",
    signs: ["Mây đen vũ tụ nhanh", "Gió lạnh đột ngột, nghe sấm xa", "Tóc dựng, nghe tiếng xè xè"],
    before: ["Xem dự báo dông trước khi đi chơi, đi học", "Biết vị trí nhà có chống sét"],
    during: ["Vào nhà hoặc xe kín, tránh gốc cây, cột điện", "Không dùng điện thoại cắm sạc, tắt thiết bị điện", "Ở ngoài trống: ngồi thấp, chụm chân, không nằm"],
    after: ["Chờ 30 phút sau tiếng sấm cuối mới ra ngoài", "Gọi cấp cứu nếu có người bị sét đánh"],
  },
  {
    id: "nang",
    name: "Nắng nóng, hạn hán",
    emoji: "☀️",
    color: "bg-orange-500",
    summary: "Gió Lào nóng khô vào mùa hè ở Quảng Trị, dễ gây say nắng, thiếu nước.",
    signs: ["Nhiệt độ trên 37°C kéo dài", "Gió Tây Nam khô nóng", "Chóng mặt, đau đầu, mệt lả"],
    before: ["Mang mũ, nón, nước uống khi ra ngoài", "Hạn chế hoạt động ngoài trời giữa trưa"],
    during: ["Uống đủ nước, nghỉ nơi thoáng mát", "Khi say nắng: đưa vào chỗ mát, lau mát, gọi cấp cứu"],
    after: ["Bù nước và điện giải", "Tiết kiệm nước trong mùa khô"],
  },
];

export const hazardById = (id: HazardId) => hazards.find((h) => h.id === id)!;
