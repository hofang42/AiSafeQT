export const slogans: string[] = [
  "Chủ động phòng tránh, an toàn mọi nhà.",
  "Biết trước, chuẩn bị sớm, bình an mùa mưa bão.",
  "Không lội qua nước chảy xiết. Mạng sống là quan trọng nhất.",
  "Nghe cảnh báo, hành động kịp thời, cùng nhau vượt qua thiên tai.",
  "Mỗi học sinh là một tuyên truyền viên an toàn.",
];

export interface Guide {
  title: string;
  steps: string[];
}

/** Thẻ hướng dẫn nhanh, tóm tắt từ khuyến cáo của Cục Quản lý đê điều và PCTT, UNICEF. */
export const guides: Guide[] = [
  { title: "5 việc làm ngay khi mưa lớn", steps: ["Xem bản tin cảnh báo mới nhất", "Kê cao đồ đạc, giấy tờ, sách vở", "Lưu số 112, 114, 115", "Biết đường lên nơi cao gần nhà", "Chuẩn bị túi khẩn cấp"] },
  { title: "Không bao giờ", steps: ["Lội qua ngầm, tràn đang ngập", "Đứng gần miệng cống, hố ga", "Vớt củi, đánh cá khi có lũ", "Trú dưới gốc cây khi có sét", "Vượt rào chắn của lực lượng cứu hộ"] },
  { title: "Sau lũ", steps: ["Chỉ về nhà khi chính quyền báo an toàn", "Đun sôi nước ít nhất 3 phút", "Mang găng tay, ủng khi dọn dẹp", "Kiểm tra điện trước khi dùng", "Báo tin cho người thân"] },
];
