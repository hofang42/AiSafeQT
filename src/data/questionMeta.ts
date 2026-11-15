/** Sinh tự động từ bộ câu hỏi do nhóm tác giả cung cấp (file .docx). Không sửa tay. */
export const quizTopics = [
  {
    "id": "bao",
    "name": "Bão",
    "count": 79
  },
  {
    "id": "atnd",
    "name": "Áp thấp nhiệt đới",
    "count": 6
  },
  {
    "id": "locxoay",
    "name": "Lốc xoáy",
    "count": 44
  },
  {
    "id": "dongset",
    "name": "Dông sét",
    "count": 69
  },
  {
    "id": "dongdat",
    "name": "Động đất",
    "count": 49
  },
  {
    "id": "lulut",
    "name": "Lũ lụt",
    "count": 70
  },
  {
    "id": "nangnong",
    "name": "Nắng nóng",
    "count": 36
  },
  {
    "id": "hanhan",
    "name": "Hạn hán",
    "count": 57
  },
  {
    "id": "luquet",
    "name": "Lũ quét",
    "count": 79
  },
  {
    "id": "satlo",
    "name": "Sạt lở đất",
    "count": 72
  },
  {
    "id": "ret",
    "name": "Rét",
    "count": 80
  },
  {
    "id": "ngaplut",
    "name": "Ngập lụt",
    "count": 76
  },
  {
    "id": "xnm",
    "name": "Xâm nhập mặn",
    "count": 47
  },
  {
    "id": "muada",
    "name": "Mưa đá",
    "count": 38
  },
  {
    "id": "songthan",
    "name": "Sóng thần",
    "count": 34
  }
] as const;
export const totalQuestions = 836;
export type QuizTopicId = (typeof quizTopics)[number]["id"];
