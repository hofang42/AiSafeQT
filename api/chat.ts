// Vercel serverless function: POST /api/chat
// Cần đặt biến môi trường GEMINI_API_KEY trên Vercel (không để lộ key ở trình duyệt).

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const SYSTEM_PROMPT = `Bạn là "Trợ lý AI Safe QT", hỗ trợ học sinh tỉnh Quảng Trị (Việt Nam), nhiều lứa tuổi về phòng tránh thiên tai.
Quy tắc:
- Chỉ trả lời về thiên tai (bão, lũ lụt, lũ quét, sạt lở, dông sét, nắng nóng, hạn hán), kỹ năng an toàn và sơ cứu cơ bản. Nếu câu hỏi ngoài chủ đề, từ chối nhẹ nhàng và gợi ý hỏi về thiên tai.
- Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu cho học sinh (dùng từ đơn giản, tự điều chỉnh theo cách người hỏi viết), dùng gạch đầu dòng tối đa 5 ý.
- Ưu tiên bối cảnh Quảng Trị (mùa bão tháng 9-11, lũ sông Thạch Hãn/Bến Hải, lũ quét vùng núi Hướng Hóa, Đakrông, gió Lào mùa hè).
- Khi nguy hiểm khẩn cấp: nhắc gọi người lớn và các số 112 (tổng đài cứu nạn cứu hộ quốc gia), 114 (cứu hỏa), 115 (cấp cứu), 113 (công an).
- Không bịa số liệu, không đưa chẩn đoán y tế. Nếu không chắc, nói không chắc và khuyên hỏi thầy cô hoặc chính quyền địa phương.
- Khuyên theo dõi cảnh báo từ cơ quan khí tượng thủy văn và chính quyền, không tin tin đồn.`;

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(503).json({ error: "Chưa cấu hình GEMINI_API_KEY" });
    return;
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const messages: Msg[] = Array.isArray(body?.messages) ? body.messages.slice(-10) : [];
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    res.status(400).json({ error: "Thiếu câu hỏi" });
    return;
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m.content).slice(0, 1000) }],
  }));

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
        }),
      },
    );
    if (!r.ok) {
      res.status(502).json({ error: "Dịch vụ AI đang bận" });
      return;
    }
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ?? "";
    res.status(200).json({ reply: text || "Xin lỗi, mình chưa trả lời được câu này." });
  } catch {
    res.status(502).json({ error: "Không kết nối được dịch vụ AI" });
  }
}
