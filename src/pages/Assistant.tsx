import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import { ChatIcon, SendIcon, UserIcon, WarningIcon } from "@/components/icons";
import { offlineAnswer } from "@/lib/offlineAnswer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = import.meta.env.VITE_CHAT_URL || "https://morning-morning-64c7.hoangk5fc5.workers.dev";

const quick = [
  "Khi có bão em cần làm gì?",
  "Dấu hiệu nào cho biết sắp có lũ quét?",
  "Gặp đường ngập nước chảy xiết thì sao?",
  "Đang có sấm sét, em nên trú ở đâu?",
  "Chuẩn bị túi khẩn cấp cần những gì?",
  "Bị say nắng thì sơ cứu thế nào?",
];

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Xin chào! Mình là Trợ lý AI Safe QT. Em có thể hỏi mình về bão, lũ lụt, lũ quét, sạt lở, dông sét, nắng nóng và cách giữ an toàn." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Chỉ cuộn bên trong khung chat, không cuộn cả trang
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next: Message[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    let reply: string;
    try {
      const r = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m, i) => i > 0 || m.role === "user") }),
      });
      if (!r.ok) throw new Error("api");
      reply = (await r.json()).reply;
    } catch {
      reply = offlineAnswer(q);
    }
    setMessages([...next, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <Layout title="Trợ lý AI hỏi đáp về thiên tai" subtitle="Đặt câu hỏi về các loại hình thiên tai, dấu hiệu nguy hiểm và cách phòng tránh.">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold mb-2">Gợi ý câu hỏi</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {quick.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="shrink-0 rounded-full border bg-card px-4 min-h-10 text-sm hover:border-primary hover:text-primary active:scale-[0.98] transition"
            >
              {q}
            </button>
          ))}
        </div>

        <section className="panel mt-3 flex flex-col" aria-label="Cuộc trò chuyện">
          <div ref={logRef} className="h-[52dvh] min-h-72 overflow-y-auto overscroll-contain p-4 space-y-4" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${m.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}>
                  {m.role === "user" ? <UserIcon size={18} /> : <ChatIcon size={18} />}
                </span>
                <div className={`rounded-lg px-3.5 py-2.5 whitespace-pre-wrap text-sm leading-relaxed max-w-[85%] ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5" aria-label="Trợ lý đang trả lời">
                <span className="h-8 w-8 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center"><ChatIcon size={18} /></span>
                <div className="rounded-lg bg-muted px-4 py-3 flex gap-1.5" aria-hidden>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${d * 120}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="flex gap-2 p-3 border-t" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="chat-input" className="sr-only">Câu hỏi của em</label>
            <Input id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập câu hỏi của em" maxLength={300} className="min-h-11" />
            <Button type="submit" disabled={loading || !input.trim()} className="min-h-11 min-w-11 px-3" aria-label="Gửi câu hỏi">
              <SendIcon size={20} />
            </Button>
          </form>
        </section>

        <p className="flex gap-2 text-xs text-muted-foreground mt-3">
          <WarningIcon size={16} className="shrink-0 mt-0.5" />
          AI có thể trả lời chưa chính xác. Em hãy theo dõi cảnh báo của cơ quan khí tượng và chính quyền địa phương. Khi nguy hiểm, gọi người lớn và số 112, 114, 115.
        </p>
      </div>
    </Layout>
  );
};

export default Assistant;
