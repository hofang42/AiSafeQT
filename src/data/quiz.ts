/** Mini game: gói đồ vào túi khẩn cấp */
export interface BagItem {
  name: string;
  emoji: string;
  needed: boolean;
  why: string;
}

export const bagItems: BagItem[] = [
  { name: "Đèn pin", emoji: "🔦", needed: true, why: "Cần khi mất điện." },
  { name: "Nước uống", emoji: "💧", needed: true, why: "Nước sạch là thiết yếu." },
  { name: "Lương khô", emoji: "🍪", needed: true, why: "Cung cấp năng lượng khi bị cô lập." },
  { name: "Thuốc và đồ sơ cứu", emoji: "🩹", needed: true, why: "Xử lý vết thương nhỏ, bệnh thường gặp." },
  { name: "Còi", emoji: "📣", needed: true, why: "Báo hiệu khi cần được cứu." },
  { name: "Giấy tờ quan trọng (bọc ni lông)", emoji: "📄", needed: true, why: "Giữ khô, cần khi sơ tán." },
  { name: "Áo mưa", emoji: "🧥", needed: true, why: "Giữ ấm, khô." },
  { name: "Pin dự phòng / đài radio", emoji: "📻", needed: true, why: "Cập nhật tin tức khi mất điện." },
  { name: "Máy chơi game", emoji: "🎮", needed: false, why: "Không cần thiết, chiếm chỗ và hết pin." },
  { name: "Pháo / bật lửa", emoji: "🧨", needed: false, why: "Nguy hiểm khi gặp nước hoặc cháy nổ." },
  { name: "Đồ chơi lớn", emoji: "🧸", needed: false, why: "Nặng, cồng kềnh." },
  { name: "Giày cao gót / quần áo đẹp", emoji: "👠", needed: false, why: "Không phù hợp khi di chuyển trong thiên tai." },
];
