import { hazards } from "@/data/hazards";

const keywords: Record<string, string[]> = {
  bao: ["bão", "bao", "áp thấp", "gió mạnh"],
  lu: ["lũ", "lụt", "ngập"],
  luquet: ["lũ quét", "sạt lở", "sạt", "núi", "suối"],
  set: ["sét", "sấm", "dông"],
  nang: ["nắng", "nóng", "hạn", "say nắng", "gió lào"],
};

/** Trả lời dự phòng khi không gọi được AI: tra từ kho kiến thức có sẵn. */
export function offlineAnswer(question: string): string {
  const q = question.toLowerCase();
  // ưu tiên từ khoá dài/cụ thể (lũ quét) trước
  const order = ["luquet", "set", "nang", "bao", "lu"];
  for (const id of order) {
    if (keywords[id].some((k) => q.includes(k))) {
      const h = hazards.find((x) => x.id === id)!;
      const pick = (a: string[]) => a.map((s) => `• ${s}`).join("\n");
      const part = q.includes("sau") ? ["Sau khi xảy ra", h.after] : q.includes("trước") || q.includes("chuẩn bị") ? ["Chuẩn bị trước", h.before] : ["Khi đang xảy ra", h.during];
      return `${h.emoji} ${h.name}\n${h.summary}\n\n${part[0]}:\n${pick(part[1] as string[])}\n\n(Đang dùng chế độ offline. Khi cần khẩn cấp hãy gọi người lớn và số 114/115.)`;
    }
  }
  return "Mình hiện chỉ trả lời về phòng tránh bão, lũ lụt, lũ quét, sạt lở, sét và nắng nóng. Bạn thử hỏi, ví dụ: \"Khi có bão em cần làm gì?\".";
}
