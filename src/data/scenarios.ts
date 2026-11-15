import type { HazardId } from "./hazards";

export interface Choice {
  text: string;
  correct: boolean;
  feedback: string;
}
export interface Step {
  situation: string;
  choices: Choice[];
}
export interface Scenario {
  id: string;
  hazard: HazardId;
  title: string;
  intro: string;
  steps: Step[];
}

export const scenarios: Scenario[] = [
  {
    id: "bao-o-nha",
    hazard: "bao",
    title: "Bão đổ bộ khi em ở nhà",
    intro: "Đài khí tượng thông báo bão sẽ đổ bộ vào Quảng Trị tối nay. Em đang ở nhà cùng ông bà.",
    steps: [
      {
        situation: "Chiều nay trời đã nổi gió. Em nên làm gì trước tiên?",
        choices: [
          { text: "Cùng người lớn chằng chống cửa, cất đồ ngoài sân, chuẩn bị đèn pin và nước uống", correct: true, feedback: "Đúng! Chuẩn bị sớm giúp giảm thiệt hại và an toàn hơn." },
          { text: "Ra sân quay video gió bão để đăng mạng", correct: false, feedback: "Nguy hiểm! Gió giật có thể làm bay vật nặng, cây đổ." },
          { text: "Đợi tối rồi tính", correct: false, feedback: "Khi bão đã mạnh sẽ rất khó chuẩn bị. Hãy chuẩn bị ngay từ sớm." },
        ],
      },
      {
        situation: "Gió rất mạnh, kính cửa sổ rung lên. Em nên ở đâu?",
        choices: [
          { text: "Đứng sát cửa sổ để nhìn ra ngoài", correct: false, feedback: "Kính có thể vỡ và gây thương tích." },
          { text: "Ở phòng kín, xa cửa kính, tập trung cùng người thân", correct: true, feedback: "Chính xác! Hãy ở nơi kiên cố, xa cửa kính." },
          { text: "Chạy ra ngoài sang nhà hàng xóm", correct: false, feedback: "Di chuyển lúc gió mạnh rất nguy hiểm." },
        ],
      },
      {
        situation: "Sáng hôm sau bão đã tan. Em thấy dây điện đứt rơi xuống đường. Em làm gì?",
        choices: [
          { text: "Lại gần xem cho rõ", correct: false, feedback: "Dây điện có thể còn điện, rất nguy hiểm." },
          { text: "Dùng cây khều dây ra chỗ khác", correct: false, feedback: "Cây ẩm có thể dẫn điện. Tuyệt đối không tự xử lý." },
          { text: "Tránh xa, báo người lớn và điện lực", correct: true, feedback: "Đúng! Không chạm vào, báo ngay cho người có trách nhiệm." },
        ],
      },
    ],
  },
  {
    id: "lu-duong-ngap",
    hazard: "lu",
    title: "Đi học về gặp nước ngập",
    intro: "Mưa lớn nhiều giờ. Trên đường về nhà, em thấy đoạn đường phía trước bị ngập, nước chảy khá xiết.",
    steps: [
      {
        situation: "Bạn em nói: \"Lội qua cho nhanh, chắc không sao đâu!\". Em nên làm gì?",
        choices: [
          { text: "Lội cùng bạn vì nhìn nước không sâu", correct: false, feedback: "Nước chảy xiết có thể cuốn người, dưới nước có thể có hố, cống hở." },
          { text: "Dừng lại, không qua, quay về trường hoặc nhờ người lớn giúp", correct: true, feedback: "Đúng! Không bao giờ lội qua nước chảy xiết." },
          { text: "Đi xe đạp qua cho nhanh", correct: false, feedback: "Xe đạp cũng dễ bị cuốn trôi, rất nguy hiểm." },
        ],
      },
      {
        situation: "Về đến nhà, nước bắt đầu vào sân. Em cần làm gì?",
        choices: [
          { text: "Cùng gia đình kê cao đồ đạc, giấy tờ, sách vở; tắt cầu dao khi nước gần ổ điện", correct: true, feedback: "Chính xác! Tránh hư hỏng và nguy cơ điện giật." },
          { text: "Bật hết đèn và quạt để xua ẩm", correct: false, feedback: "Nước vào gần ổ điện cực kỳ nguy hiểm." },
          { text: "Đi chơi dưới nước với bạn", correct: false, feedback: "Nước lũ bẩn và rất nguy hiểm." },
        ],
      },
    ],
  },
  {
    id: "luquet-vung-nui",
    hazard: "luquet",
    title: "Mưa lớn ở vùng núi",
    intro: "Em đang ở nhà người thân tại vùng núi phía Tây Quảng Trị. Mưa lớn đã kéo dài từ đêm qua.",
    steps: [
      {
        situation: "Em nghe thấy tiếng ầm lớn từ phía đồi, nước suối chuyển sang đục ngầu và dâng nhanh. Em làm gì?",
        choices: [
          { text: "Ra suối xem nước dâng thế nào", correct: false, feedback: "Lũ quét đến rất nhanh, không được ra gần suối." },
          { text: "Báo người lớn và di chuyển ngay lên chỗ cao, xa suối và sườn dốc", correct: true, feedback: "Đúng! Đây là dấu hiệu cảnh báo nguy hiểm, phải sơ tán ngay." },
          { text: "Ở trong nhà ngủ tiếp", correct: false, feedback: "Nhà dưới chân dốc có nguy cơ bị sạt lở." },
        ],
      },
      {
        situation: "Khi đi sơ tán gặp ngầm tràn nước đang chảy. Em làm gì?",
        choices: [
          { text: "Chạy nhanh qua trước khi nước lên", correct: false, feedback: "Nước có thể dâng bất ngờ." },
          { text: "Không qua, tìm đường khác lên cao hoặc chờ lực lượng hỗ trợ", correct: true, feedback: "Đúng! Tuyệt đối không băng qua ngầm tràn khi có nước chảy." },
        ],
      },
    ],
  },
  {
    id: "set-san-truong",
    hazard: "set",
    title: "Dông sét giữa sân trường",
    intro: "Em đang chơi ngoài sân trường thì trời đột ngột tối sầm, nghe sấm vang gần.",
    steps: [
      {
        situation: "Em nên làm gì ngay lập tức?",
        choices: [
          { text: "Chạy vào phòng học, hành lang kín", correct: true, feedback: "Đúng! Nhà kiên cố là nơi trú an toàn nhất." },
          { text: "Trú dưới gốc cây phượng to giữa sân", correct: false, feedback: "Cây cao dễ bị sét đánh, rất nguy hiểm." },
          { text: "Cầm ô kim loại đi ra cổng", correct: false, feedback: "Vật kim loại cao dễ thu hút sét." },
        ],
      },
    ],
  },
  {
    id: "nang-gio-lao",
    hazard: "nang",
    title: "Nắng nóng gió Lào",
    intro: "Trưa hè nóng 39°C. Lớp em có buổi hoạt động ngoài trời, một bạn bỗng đỏ mặt, chóng mặt, mệt lả.",
    steps: [
      {
        situation: "Em và các bạn nên làm gì?",
        choices: [
          { text: "Đưa bạn vào chỗ mát, cho uống nước, báo thầy cô", correct: true, feedback: "Đúng! Đây là dấu hiệu say nắng, cần làm mát và báo người lớn." },
          { text: "Bảo bạn cố gắng chịu đựng thêm", correct: false, feedback: "Say nắng nặng có thể nguy hiểm đến tính mạng." },
          { text: "Đổ nước đá lạnh nhiều lên người bạn thật nhanh", correct: false, feedback: "Làm mát từ từ, nhờ người lớn hướng dẫn." },
        ],
      },
    ],
  },
  {
    id: "bao-ngu-dan",
    hazard: "bao",
    title: "Ba làm nghề biển, bão sắp đến",
    intro: "Gia đình em ở vùng ven biển. Ba em muốn ở lại trên thuyền neo đậu để trông thuyền khi bão tiến gần.",
    steps: [
      {
        situation: "Em và mẹ nên khuyên ba thế nào?",
        choices: [
          { text: "Lên bờ, vào nơi trú ẩn an toàn cùng cả nhà", correct: true, feedback: "Đúng! Cơ quan chức năng khuyến cáo không ở lại trên tàu thuyền, chòi canh, lồng bè khi bão ảnh hưởng." },
          { text: "Để ba ở lại, bão chắc không mạnh", correct: false, feedback: "Bão có thể mạnh lên rất nhanh, tính mạng quan trọng hơn tài sản." },
          { text: "Cả nhà ra thuyền ở cùng ba", correct: false, feedback: "Thuyền neo đậu không an toàn khi có bão." },
        ],
      },
      {
        situation: "Chính quyền thông báo sơ tán. Em chuẩn bị gì mang theo?",
        choices: [
          { text: "Túi khẩn cấp, giấy tờ bọc ni lông, thuốc men, nước uống, đèn pin", correct: true, feedback: "Chính xác! Mang đủ đồ thiết yếu rồi đi ngay." },
          { text: "Thật nhiều đồ đạc lớn trong nhà", correct: false, feedback: "Mang quá nhiều đồ làm chậm việc sơ tán." },
          { text: "Không mang gì, đợi về sau", correct: false, feedback: "Giấy tờ, thuốc men và nước uống rất cần ở nơi sơ tán." },
        ],
      },
    ],
  },
  {
    id: "bao-mat-dien-dem",
    hazard: "bao",
    title: "Đêm bão mất điện, nước vào nhà",
    intro: "Nửa đêm bão mạnh, điện mất, nước bắt đầu dâng vào nhà em.",
    steps: [
      {
        situation: "Việc cần làm trước tiên khi nước vào nhà là gì?",
        choices: [
          { text: "Báo người lớn, ngắt cầu dao và khóa van gas trước khi nước dâng cao", correct: true, feedback: "Đúng! Ngắt điện, khóa gas giúp tránh điện giật và cháy nổ." },
          { text: "Cắm sạc điện thoại để gọi cho bạn", correct: false, feedback: "Nước vào nhà gần ổ điện cực kỳ nguy hiểm." },
          { text: "Thắp nến đặt sát rèm cửa", correct: false, feedback: "Dễ gây cháy. Hãy dùng đèn pin." },
        ],
      },
      {
        situation: "Nước tiếp tục dâng cao. Gia đình nên làm gì?",
        choices: [
          { text: "Đưa người già, trẻ nhỏ lên nơi cao, sẵn sàng sơ tán và gọi 112 nếu cần", correct: true, feedback: "Chính xác! Ưu tiên an toàn cho người, nói rõ vị trí khi gọi 112." },
          { text: "Ra ngoài lội đi tìm nhà bạn", correct: false, feedback: "Lội nước lúc đêm tối rất nguy hiểm." },
        ],
      },
    ],
  },
  {
    id: "luquet-ngam-tran",
    hazard: "luquet",
    title: "Đường đi học qua ngầm tràn",
    intro: "Sáng nay mưa lớn. Đường đến trường của em phải qua một ngầm tràn, nước đang chảy qua mặt ngầm.",
    steps: [
      {
        situation: "Các bạn trong nhóm muốn thử đi qua. Em làm gì?",
        choices: [
          { text: "Không qua, báo thầy cô và chờ nước rút hoặc có người lớn hỗ trợ", correct: true, feedback: "Đúng! Tuyệt đối không đi qua ngầm, tràn đang có nước chảy." },
          { text: "Đi nhanh qua vì chỉ ngập đến đầu gối", correct: false, feedback: "Nước chảy xiết có thể cuốn người dù không sâu." },
          { text: "Dắt xe đạp qua cho chắc", correct: false, feedback: "Phương tiện cũng bị cuốn, và em có thể bị kéo theo." },
        ],
      },
      {
        situation: "Một bạn nói \"Đi vớt củi trôi ở suối cho vui\". Em nên:",
        choices: [
          { text: "Từ chối và rủ bạn ra xa bờ suối", correct: true, feedback: "Chính xác! Không vớt củi, đánh cá ở sông suối khi có lũ." },
          { text: "Đi cùng vì củi gần bờ", correct: false, feedback: "Nước lên nhanh và dòng chảy rất mạnh." },
        ],
      },
    ],
  },
  {
    id: "luquet-so-tan",
    hazard: "luquet",
    title: "Loa phường báo sơ tán",
    intro: "Mưa lớn kéo dài suốt đêm. Sáng sớm loa xã thông báo người dân vùng nguy cơ sạt lở di dời đến nhà văn hóa.",
    steps: [
      {
        situation: "Nhà em ở chân đồi, có vết nứt mới trên sườn dốc sau nhà. Em làm gì?",
        choices: [
          { text: "Báo người lớn, mang túi khẩn cấp và giấy tờ, đi ngay theo hướng dẫn", correct: true, feedback: "Đúng! Vết nứt là dấu hiệu nguy hiểm, không chần chừ." },
          { text: "Ở nhà thêm vài giờ xem mưa có tạnh không", correct: false, feedback: "Sạt lở có thể xảy ra bất ngờ." },
          { text: "Quay lại nhà lấy thêm đồ chơi", correct: false, feedback: "Không quay lại khi chưa an toàn." },
        ],
      },
      {
        situation: "Đến nhà văn hóa, em nên làm gì tiếp theo?",
        choices: [
          { text: "Báo tin cho người thân, ở lại khu tập trung và chờ thông báo", correct: true, feedback: "Chính xác! Chỉ quay về khi chính quyền thông báo khu vực an toàn." },
          { text: "Tự đi về xem nhà", correct: false, feedback: "Khu vực có thể vẫn còn nguy cơ sạt lở." },
        ],
      },
    ],
  },
  {
    id: "lu-sau-lu",
    hazard: "lu",
    title: "Giúp gia đình dọn nhà sau lũ",
    intro: "Nước đã rút. Gia đình em trở về nhà, bùn đất phủ khắp nơi, ổ điện còn ẩm.",
    steps: [
      {
        situation: "Trước khi dọn dẹp, em cần chú ý điều gì?",
        choices: [
          { text: "Mang ủng, găng tay; nhờ người lớn kiểm tra điện, không chạm ổ điện ẩm", correct: true, feedback: "Đúng! An toàn điện và bảo hộ là ưu tiên." },
          { text: "Đi chân đất cho tiện", correct: false, feedback: "Dễ bị thương và nhiễm khuẩn." },
          { text: "Cắm quạt để làm khô nhanh", correct: false, feedback: "Ổ điện ẩm có thể gây giật, chập cháy." },
        ],
      },
      {
        situation: "Em khát nước và thấy chai nước trong bếp bị ngâm lũ. Em làm gì?",
        choices: [
          { text: "Dùng nước đã đun sôi ít nhất 3 phút hoặc nước đóng chai", correct: true, feedback: "Chính xác! Nước sau lũ dễ nhiễm khuẩn." },
          { text: "Uống luôn vì nước trông trong", correct: false, feedback: "Nước trông trong vẫn có thể có vi khuẩn." },
        ],
      },
    ],
  },
  {
    id: "set-ao-ho",
    hazard: "set",
    title: "Đang chơi bên ao, trời sắp dông",
    intro: "Chiều hè em và các bạn đang chơi gần ao làng. Mây đen kéo tới nhanh, gió lạnh thổi và nghe sấm từ xa.",
    steps: [
      {
        situation: "Em nên làm gì ngay?",
        choices: [
          { text: "Rời khỏi ao, hồ, chạy vào nhà hoặc nơi kiên cố gần nhất", correct: true, feedback: "Đúng! Khi có dấu hiệu giông, không ở gần sông, hồ, biển." },
          { text: "Trú dưới gốc cây to bên bờ ao", correct: false, feedback: "Cây cao đơn độc rất dễ bị sét đánh." },
          { text: "Ngồi tại chỗ chờ xem mưa", correct: false, feedback: "Dông có thể kéo đến chỉ trong 10 đến 15 phút." },
        ],
      },
      {
        situation: "Về đến nhà, sấm vẫn nổ lớn. Em nên:",
        choices: [
          { text: "Tránh xa cửa sổ, vòi nước, thiết bị điện đang cắm", correct: true, feedback: "Chính xác! Tránh nơi ẩm ướt và đồ điện khi có sét." },
          { text: "Vừa tắm vừa nghe nhạc bằng điện thoại sạc", correct: false, feedback: "Rất nguy hiểm khi có sét." },
        ],
      },
    ],
  },
  {
    id: "nang-tre-nho",
    hazard: "nang",
    title: "Trông em nhỏ ngày nắng nóng",
    intro: "Trưa nắng 38°C. Em ở nhà trông em nhỏ 3 tuổi, em đỏ bừng mặt, mồ hôi nhiều và hơi lờ đờ.",
    steps: [
      {
        situation: "Em cần làm gì ngay?",
        choices: [
          { text: "Đưa em vào chỗ râm mát, thoáng gió, nới bớt quần áo, cho uống nước và gọi người lớn", correct: true, feedback: "Đúng! Làm mát ngay, bù nước, gọi hỗ trợ." },
          { text: "Cho em ra sân chơi để tỉnh lại", correct: false, feedback: "Ngoài nắng làm tình trạng nặng hơn." },
          { text: "Đắp thật nhiều chăn cho ra mồ hôi", correct: false, feedback: "Càng nóng hơn, có thể nguy hiểm." },
        ],
      },
      {
        situation: "Sau khi làm mát em vẫn lờ đờ, không đỡ. Em làm gì?",
        choices: [
          { text: "Báo người lớn đưa đi cơ sở y tế ngay, gọi 115 nếu nặng", correct: true, feedback: "Chính xác! Nếu không đỡ cần đi khám ngay." },
          { text: "Chờ đến tối xem sao", correct: false, feedback: "Không nên chờ, say nắng có thể nguy hiểm." },
        ],
      },
    ],
  },
  {
    id: "lu-ho-xa-lu",
    hazard: "lu",
    title: "Nghe thông báo hồ xả lũ",
    intro: "Mưa lớn nhiều ngày. Loa xã thông báo hồ chứa phía thượng nguồn sắp xả lũ. Nhà em ở ven sông phía hạ lưu.",
    steps: [
      {
        situation: "Em và gia đình nên làm gì?",
        choices: [
          { text: "Nghe kỹ thông báo, đưa người và đồ đạc quan trọng lên nơi cao, chuẩn bị sơ tán nếu được yêu cầu", correct: true, feedback: "Đúng! Khi hồ xả lũ, nước ở hạ lưu có thể dâng nhanh." },
          { text: "Ra bờ sông xem nước dâng", correct: false, feedback: "Bờ sông có thể sạt lở và nước chảy xiết, rất nguy hiểm." },
          { text: "Đợi nước vào sân rồi mới chuẩn bị", correct: false, feedback: "Nước có thể lên rất nhanh nên cần chuẩn bị ngay." },
        ],
      },
      {
        situation: "Mất điện, trời tối, nước đang lên. Em nên:",
        choices: [
          { text: "Dùng đèn pin, ngắt cầu dao, theo người lớn đến nơi tập kết", correct: true, feedback: "Chính xác! Ưu tiên an toàn điện và đi cùng người lớn." },
          { text: "Tự lội ra đường tìm nhà bạn", correct: false, feedback: "Lội nước ban đêm rất nguy hiểm." },
        ],
      },
    ],
  },
];
