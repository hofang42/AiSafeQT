import type { HazardId } from "./hazards";

export interface QuizQuestion {
  id: string;
  hazard: HazardId;
  question: string;
  options: string[];
  answer: number;
  explain: string;
}

export const quiz: QuizQuestion[] = [
  { id: "b1", hazard: "bao", question: "Khi có bão mạnh, em nên ở đâu?", options: ["Sát cửa sổ để quan sát", "Trong nhà kiên cố, xa cửa kính", "Ngoài sân xem bão", "Dưới gốc cây lớn"], answer: 1, explain: "Nhà kiên cố, xa cửa kính giúp tránh gió giật và mảnh vỡ." },
  { id: "b2", hazard: "bao", question: "Vật dụng nào cần có trong túi khẩn cấp khi có bão?", options: ["Đèn pin, nước uống, thuốc men", "Đồ chơi điện tử", "Pháo hoa", "Quần áo mới"], answer: 0, explain: "Đèn pin, nước sạch, lương khô, thuốc men rất cần khi mất điện." },
  { id: "b3", hazard: "bao", question: "Sau bão, thấy dây điện đứt rơi xuống đất, em nên:", options: ["Lại gần xem", "Dùng gậy gạt ra", "Tránh xa và báo người lớn", "Chụp ảnh gần"], answer: 2, explain: "Dây điện có thể còn điện, tuyệt đối không chạm hay lại gần." },
  { id: "b4", hazard: "bao", question: "Nên tìm thông tin bão ở đâu cho đáng tin cậy?", options: ["Tin đồn trên mạng xã hội", "Bản tin của đài khí tượng thủy văn, chính quyền", "Lời kể của bạn bè", "Video không rõ nguồn"], answer: 1, explain: "Chỉ tin nguồn chính thống từ cơ quan khí tượng và chính quyền." },
  { id: "l1", hazard: "lu", question: "Gặp đoạn đường ngập, nước chảy xiết, em nên:", options: ["Lội qua nhanh", "Không qua, tìm đường khác hoặc nhờ người lớn", "Đi xe đạp qua", "Rủ bạn cùng qua"], answer: 1, explain: "Nước chảy xiết có thể cuốn trôi người dù nhìn không sâu." },
  { id: "l2", hazard: "lu", question: "Khi nước lũ vào nhà, việc cần làm với điện là:", options: ["Bật quạt cho nhanh khô", "Tắt cầu dao điện, không chạm thiết bị ướt", "Cắm sạc điện thoại", "Dùng máy sấy tóc"], answer: 1, explain: "Nước và điện kết hợp gây điện giật rất nguy hiểm." },
  { id: "l3", hazard: "lu", question: "Sau lũ, nước uống cần:", options: ["Uống trực tiếp nước giếng", "Đun sôi hoặc dùng nước đóng chai", "Uống nước mưa đọng", "Uống nước sông"], answer: 1, explain: "Nước sau lũ dễ bị nhiễm khuẩn, cần đun sôi trước khi uống." },
  { id: "l4", hazard: "lu", question: "Dấu hiệu nào cho thấy lũ đang lên nhanh?", options: ["Trời nắng đẹp", "Mưa lớn kéo dài, nước sông dâng nhanh", "Gió nhẹ", "Chim hót nhiều"], answer: 1, explain: "Mưa lớn kéo dài và mực nước dâng nhanh là cảnh báo cần di chuyển." },
  { id: "q1", hazard: "luquet", question: "Ở vùng núi, nước suối đục ngầu và dâng nhanh, em phải:", options: ["Ra xem cho rõ", "Di chuyển lên nơi cao, xa suối và sườn dốc", "Tắm suối", "Ở lại nhà dưới chân đồi"], answer: 1, explain: "Đây là dấu hiệu lũ quét, phải sơ tán ngay lên chỗ cao." },
  { id: "q2", hazard: "luquet", question: "Dấu hiệu nào cảnh báo nguy cơ sạt lở đất?", options: ["Vết nứt trên sườn dốc, cây nghiêng, nước đục chảy ra", "Trời nắng nóng", "Gió nhẹ", "Có nhiều chim"], answer: 0, explain: "Vết nứt, cây nghiêng, nước đục là dấu hiệu sạt lở sắp xảy ra." },
  { id: "q3", hazard: "luquet", question: "Gặp ngầm tràn đang có nước chảy, em nên:", options: ["Chạy nhanh qua", "Không qua, chờ nước rút hoặc nhờ hỗ trợ", "Lái xe máy qua", "Bơi qua"], answer: 1, explain: "Tuyệt đối không băng qua ngầm tràn khi có nước chảy." },
  { id: "s1", hazard: "set", question: "Khi có dông sét ngoài sân trường, em nên:", options: ["Trú dưới gốc cây to", "Vào phòng học kiên cố", "Cầm ô kim loại", "Nằm xuống đất"], answer: 1, explain: "Nhà kiên cố là nơi an toàn nhất khi có sét." },
  { id: "s2", hazard: "set", question: "Khi có sấm sét, điều nào KHÔNG nên làm?", options: ["Tắt thiết bị điện", "Dùng điện thoại đang cắm sạc", "Ở trong nhà", "Tránh xa cửa sổ"], answer: 1, explain: "Dùng thiết bị điện đang cắm điện khi có sét rất nguy hiểm." },
  { id: "n1", hazard: "nang", question: "Dấu hiệu của say nắng là:", options: ["Đỏ mặt, chóng mặt, đau đầu, mệt lả", "Buồn ngủ sau bữa ăn", "Hắt hơi", "Đói bụng"], answer: 0, explain: "Cần đưa vào chỗ mát, làm mát, cho uống nước và báo người lớn." },
  { id: "n2", hazard: "nang", question: "Khi trời nắng nóng, em nên:", options: ["Chơi thể thao ngoài trời giữa trưa", "Uống đủ nước, đội mũ, nghỉ nơi thoáng mát", "Nhịn uống nước", "Mặc áo dày"], answer: 1, explain: "Uống đủ nước và tránh nắng gắt giúp phòng say nắng." },
  { id: "c1", hazard: "bao", question: "Số điện thoại cấp cứu y tế ở Việt Nam là:", options: ["113", "114", "115", "116"], answer: 2, explain: "115 là cấp cứu y tế, 114 là cứu hỏa, 113 là công an." },
  { id: "c2", hazard: "bao", question: "Số điện thoại báo cháy và cứu nạn cứu hộ là:", options: ["113", "114", "115", "117"], answer: 1, explain: "114 là số của lực lượng phòng cháy chữa cháy và cứu nạn cứu hộ." },
  // ---- Bổ sung từ khuyến cáo của Cục Quản lý đê điều và PCTT, UNICEF, Bộ Y tế ----
  { id: "b5", hazard: "bao", question: "Trước khi bão đổ bộ, việc nào giúp nhà an toàn hơn?", options: ["Gia cố, chằng chống nhà; cắt tỉa cành cây gần nhà", "Mở hết cửa cho thoáng", "Treo thêm biển quảng cáo", "Để đồ đạc ngoài sân"], answer: 0, explain: "Chằng chống nhà, cắt tỉa cành cây, tháo biển quảng cáo giúp giảm thiệt hại do gió giật." },
  { id: "b6", hazard: "bao", question: "Khi bão ảnh hưởng, người đang ở trên tàu thuyền neo đậu, chòi canh, lồng bè cần:", options: ["Ở lại trông coi tài sản", "Lên bờ, vào nơi trú ẩn an toàn", "Ra khơi tránh bão", "Buộc thêm dây rồi ngủ"], answer: 1, explain: "Cơ quan chức năng khuyến cáo không ở lại trên tàu thuyền, chòi canh, lồng bè khi bão ảnh hưởng." },
  { id: "b7", hazard: "bao", question: "Gia đình nên dự trữ nước, lương thực, thuốc men đủ dùng ít nhất bao lâu khi có bão?", options: ["1 giờ", "Nửa ngày", "Khoảng 7 ngày", "Không cần dự trữ"], answer: 2, explain: "Sau bão có thể bị cô lập, mất điện nước nhiều ngày nên cần dự trữ đủ dùng khoảng 7 ngày." },
  { id: "b8", hazard: "bao", question: "Sau bão đi trên đường, em cần chú ý gì?", options: ["Cây xanh, biển quảng cáo bị nghiêng đổ", "Chỉ chú ý đèn giao thông", "Không cần chú ý gì", "Chạy thật nhanh"], answer: 0, explain: "Cây và biển quảng cáo bị gió làm nghiêng có thể đổ bất ngờ." },
  { id: "b9", hazard: "bao", question: "Mỗi gia đình nên làm gì để chuẩn bị cho bão?", options: ["Xác định vị trí trú ẩn an toàn nhất cho mọi người", "Mỗi người tự đi một nơi", "Chờ bão đến rồi tính", "Không cần bàn bạc"], answer: 0, explain: "Cả nhà cần thống nhất nơi trú ẩn và chủ động sơ tán khi chính quyền yêu cầu." },
  { id: "l5", hazard: "lu", question: "Vì sao cần tránh xa miệng cống, hố ga khi đường ngập?", options: ["Có thể có xoáy nước hút người xuống", "Vì có mùi hôi", "Vì làm bẩn giày", "Không có lý do"], answer: 0, explain: "Miệng cống, hố ga có thể tạo xoáy nước rất nguy hiểm." },
  { id: "l6", hazard: "lu", question: "Trước khi nước dâng cao vào nhà, cần làm gì với điện và gas?", options: ["Bật hết đèn lên", "Ngắt nguồn điện và khóa van gas", "Chỉ tắt tivi", "Không làm gì"], answer: 1, explain: "Ngắt điện và khóa van gas giúp tránh điện giật, cháy nổ khi nước vào nhà." },
  { id: "l7", hazard: "lu", question: "Mùa mưa lũ, đường đi học phải qua suối, tràn thì:", options: ["Tự đi một mình cho nhanh", "Nên có người lớn đưa đón hoặc nghỉ học khi nước dâng", "Rủ cả nhóm bạn lội qua", "Đi xe đạp qua cho nhanh"], answer: 1, explain: "Các hướng dẫn cho phụ huynh khuyến cáo đưa đón trẻ khi qua suối, sông, đập tràn mùa mưa lũ." },
  { id: "l8", hazard: "lu", question: "Khi nước lũ đang lên, việc nào KHÔNG nên làm?", options: ["Vớt củi, đánh cá ở sông suối", "Theo dõi bản tin cảnh báo", "Kê cao đồ đạc", "Nghe lệnh sơ tán"], answer: 0, explain: "Không vớt củi, đánh cá, bơi lội trên sông suối khi mưa lớn và lũ." },
  { id: "l9", hazard: "lu", question: "Tổng đài quốc gia khi cần cứu nạn, cứu hộ khẩn cấp là:", options: ["112", "1080", "113 duy nhất", "Không có"], answer: 0, explain: "Gọi 112 và cung cấp chính xác vị trí, tình trạng nguy hiểm." },
  { id: "l10", hazard: "lu", question: "Khi nước dâng, xe máy, ô tô của gia đình nên được:", options: ["Đưa xuống tầng hầm", "Đưa đến nơi cao, tránh tầng hầm", "Để nguyên ngoài đường", "Đỗ gần sông"], answer: 1, explain: "Tầng hầm dễ ngập nhanh, cần đưa phương tiện lên nơi cao." },
  { id: "q4", hazard: "luquet", question: "Dấu hiệu nào sau đây cho thấy sạt lở, lũ quét có thể sắp xảy ra?", options: ["Tiếng nổ, tiếng động lạ, mặt đất rung hoặc nứt, đất đá rơi", "Trời nắng nhẹ", "Nghe tiếng chim hót", "Gió thổi nhẹ"], answer: 0, explain: "Tiếng động lạ, đất nứt, nước suối chuyển đục là các dấu hiệu cần sơ tán ngay." },
  { id: "q5", hazard: "luquet", question: "Khi có lệnh sơ tán, em cần:", options: ["Mang túi khẩn cấp, giấy tờ rồi đi ngay cùng gia đình", "Ở lại thu dọn hết đồ đạc", "Đợi nước vào nhà rồi mới đi", "Đi xem tình hình trước"], answer: 0, explain: "Không chần chừ: mang túi khẩn cấp, giấy tờ tùy thân và đi theo hướng dẫn." },
  { id: "q6", hazard: "luquet", question: "Gia đình nên thống nhất điều gì để phòng khi bị lạc nhau lúc thiên tai?", options: ["Một địa điểm gặp nhau", "Mỗi người tự lo", "Không cần thống nhất", "Chỉ liên lạc qua mạng xã hội"], answer: 0, explain: "Điểm gặp được thống nhất trước giúp tìm nhau nhanh khi mất liên lạc." },
  { id: "q7", hazard: "luquet", question: "Sau lũ quét, sạt lở, khi nào được quay về nhà?", options: ["Ngay khi mưa ngớt", "Khi chính quyền thông báo khu vực đã an toàn", "Khi bạn bè rủ", "Khi thấy trời sáng"], answer: 1, explain: "Chỉ quay về khi chính quyền công bố khu vực an toàn." },
  { id: "q8", hazard: "luquet", question: "Ở Quảng Trị, nơi sơ tán dân khi có bão lớn thường là:", options: ["Trường học, trụ sở UBND, nhà văn hóa kiên cố", "Bãi biển", "Dưới gốc cây lớn", "Nhà tạm ven suối"], answer: 0, explain: "Phương án của tỉnh dùng trường học, trụ sở UBND, nhà văn hóa cộng đồng làm nơi sơ tán." },
  { id: "q9", hazard: "luquet", question: "Nước chưa qua xử lý sau lũ cần đun sôi ít nhất bao lâu trước khi uống?", options: ["10 giây", "30 giây", "3 phút", "Không cần đun"], answer: 2, explain: "UNICEF khuyến cáo đun sôi ít nhất 3 phút để tránh bệnh tiêu chảy." },
  { id: "s3", hazard: "set", question: "Dấu hiệu nào cho thấy sắp có dông, sét?", options: ["Mây dông phát triển mạnh, gió lạnh đột ngột, nghe sấm xa", "Trời quang mây tạnh", "Gió rất nhẹ", "Sương mù buổi sáng"], answer: 0, explain: "Khi có sấm xa hoặc gió lạnh thổi tới, dông có thể kéo đến trong vài chục phút." },
  { id: "s4", hazard: "set", question: "Khi có dấu hiệu giông, em nên:", options: ["Ra sông, hồ chơi cho mát", "Vào nơi kiên cố, tránh xa sông hồ", "Ngồi dưới cây to", "Chơi bóng ngoài sân"], answer: 1, explain: "Không ở ngoài trời, nhất là gần sông, hồ, biển khi có giông." },
  { id: "s5", hazard: "set", question: "Trong lúc dông sét, trong nhà em nên tránh:", options: ["Phòng khách kín", "Đồ dùng điện, vòi nước, buồng tắm", "Ngồi xa cửa sổ", "Đọc sách"], answer: 1, explain: "Tránh xa thiết bị điện, nơi ẩm ướt, vòi nước khi có sét." },
  { id: "n3", hazard: "nang", question: "Bộ Y tế khuyến cáo hạn chế ra ngoài trời trong khung giờ nào khi nắng nóng?", options: ["Từ 10 giờ đến 16 giờ", "Từ 5 giờ đến 7 giờ", "Từ 19 giờ đến 21 giờ", "Cả ngày không ra ngoài"], answer: 0, explain: "Khung giờ này nhiệt độ cao nhất, dễ say nắng, say nóng." },
  { id: "n4", hazard: "nang", question: "Nguyên tắc sơ cứu khi nghi ngờ bạn bị say nắng là:", options: ["Làm mát ngay, bù nước, gọi hỗ trợ y tế", "Cho chạy thêm vài vòng", "Để nằm ngoài nắng", "Cho uống nước đá thật nhiều"], answer: 0, explain: "Đưa vào chỗ râm mát, nới lỏng quần áo, bù nước và báo người lớn, cơ sở y tế." },
  { id: "n5", hazard: "nang", question: "Nạn nhân say nắng cần được đưa đến:", options: ["Nơi râm mát, thoáng gió", "Phòng kín không có gió", "Chỗ đang nắng gắt", "Sân bóng"], answer: 0, explain: "Nơi râm mát, thoáng gió giúp cơ thể thoát nhiệt." },
  { id: "l11", hazard: "lu", question: "Lũ tháng 10/2020, đỉnh lũ sông Thạch Hãn là 7,4 m. So với lũ lịch sử năm 1999 (7,3 m) thì:", options: ["Thấp hơn", "Bằng nhau", "Cao hơn", "Không so sánh được"], answer: 2, explain: "Đỉnh lũ 2020 cao hơn đỉnh lũ lịch sử 1999 là 0,1 m, cho thấy lũ có thể vượt mức đã từng ghi nhận." },
  { id: "l12", hazard: "lu", question: "Cầu tràn, ngầm tràn ở vùng núi thường bị ngập khi mưa lớn. Em nên:", options: ["Chờ nước rút hoặc đi đường khác an toàn", "Chạy xe qua thật nhanh", "Lội qua cho gần", "Đứng giữa tràn xem nước"], answer: 0, explain: "Các điểm ngập ở cầu tràn như xã Ba Lòng khiến nhiều nơi bị chia cắt, không được băng qua khi có nước." },
  { id: "q10", hazard: "luquet", question: "Ở Quảng Trị, nguy cơ lũ quét và sạt lở đất cao nhất thường ở khu vực nào?", options: ["Vùng núi phía Tây như Hướng Hóa, Đakrông", "Bãi biển Cửa Việt", "Trung tâm thành phố Đông Hà", "Đảo Cồn Cỏ"], answer: 0, explain: "Cảnh báo thường nêu Hướng Hóa, Đakrông, Cam Lộ và phía Tây Vĩnh Linh, Gio Linh, Hải Lăng." },
  { id: "l13", hazard: "lu", question: "Hồ chứa nước xả lũ có thể làm vùng hạ lưu:", options: ["Không thay đổi gì", "Ngập nhanh, cần nghe thông báo của địa phương", "Khô hạn ngay", "Chỉ ảnh hưởng vùng biển"], answer: 1, explain: "Khi hồ xả lũ, nước ở hạ lưu có thể dâng nhanh. Hãy nghe loa, tin nhắn cảnh báo và làm theo hướng dẫn." },
];

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
