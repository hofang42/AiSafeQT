/** Sinh tự động từ bộ câu hỏi do nhóm tác giả cung cấp (file .docx). Không sửa tay. */
export const quizTopics = [
  {
    "id": "bao",
    "name": "Bão",
    "count": 79,
    "scenarios": 25
  },
  {
    "id": "atnd",
    "name": "Áp thấp nhiệt đới",
    "count": 6,
    "scenarios": 2
  },
  {
    "id": "locxoay",
    "name": "Lốc xoáy",
    "count": 44,
    "scenarios": 6
  },
  {
    "id": "dongset",
    "name": "Dông sét",
    "count": 69,
    "scenarios": 22
  },
  {
    "id": "dongdat",
    "name": "Động đất",
    "count": 49,
    "scenarios": 20
  },
  {
    "id": "lulut",
    "name": "Lũ lụt",
    "count": 70,
    "scenarios": 11
  },
  {
    "id": "nangnong",
    "name": "Nắng nóng",
    "count": 36,
    "scenarios": 9
  },
  {
    "id": "hanhan",
    "name": "Hạn hán",
    "count": 57,
    "scenarios": 15
  },
  {
    "id": "luquet",
    "name": "Lũ quét",
    "count": 79,
    "scenarios": 16
  },
  {
    "id": "satlo",
    "name": "Sạt lở đất",
    "count": 72,
    "scenarios": 21
  },
  {
    "id": "ret",
    "name": "Rét",
    "count": 80,
    "scenarios": 22
  },
  {
    "id": "ngaplut",
    "name": "Ngập lụt",
    "count": 76,
    "scenarios": 19
  },
  {
    "id": "xnm",
    "name": "Xâm nhập mặn",
    "count": 47,
    "scenarios": 10
  },
  {
    "id": "muada",
    "name": "Mưa đá",
    "count": 38,
    "scenarios": 7
  },
  {
    "id": "songthan",
    "name": "Sóng thần",
    "count": 34,
    "scenarios": 8
  }
] as const;
export const totalQuestions = 836;
export const totalScenarios = 213;
export type QuizTopicId = (typeof quizTopics)[number]["id"];
