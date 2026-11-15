import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckIcon, CrossIcon, InfoIcon, RefreshIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { quizTopics, totalQuestions, totalScenarios } from "@/data/questionMeta";

interface Q {
  id: string;
  t: string;
  q: string;
  o: string[];
  a: number[];
  e?: string;
  s?: number;
}

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const letters = ["A", "B", "C", "D", "E", "F", "G"];
const sameSet = (a: number[], b: Set<number>) => a.length === b.size && a.every((x) => b.has(x));

/**
 * Bộ làm bài dùng chung cho "Trắc nghiệm" (mọi câu) và "Tình huống" (chỉ các câu đặt em vào một hoàn cảnh).
 * Nguồn: bộ câu hỏi do nhóm tác giả cung cấp, giữ nguyên nội dung.
 */
export const QuizRunner = ({ mode }: { mode: "quiz" | "scenario" }) => {
  const scenario = mode === "scenario";
  const sizes = scenario ? [5, 10, 20] : [10, 20, 30];
  const [all, setAll] = useState<Q[] | null>(null);
  const [topic, setTopic] = useState("all");
  const [size, setSize] = useState(sizes[0]);
  const [run, setRun] = useState<Q[] | null>(null);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, recordQuiz, recordScenario } = useAuth();
  // Mỗi tài khoản trên thiết bị có bài làm riêng; chưa đăng nhập thì dùng chung một chỗ.
  const owner = (() => {
    try { return JSON.parse(localStorage.getItem("aisafe.session") || "null") || "guest"; } catch { return "guest"; }
  })();
  const KEY = `aisafe.quiz.${mode}.${owner}`;
  const recorded = useRef(false); // đã ghi điểm cho lượt này chưa
  const ready = useRef(false); // đã khôi phục xong, từ đây mới bắt đầu lưu

  // Khôi phục bài đang làm dở khi học sinh quay lại trang
  useEffect(() => {
    let saved: { savedAt?: number; ids?: string[]; topic?: string; size?: number; i?: number; sel?: number[]; checked?: boolean; score?: number } | null = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { /* bỏ qua */ }
    if (saved && Date.now() - (saved.savedAt ?? 0) > 30 * 24 * 3600 * 1000) saved = null; // bài làm dở quá 30 ngày thì bỏ
    if (!saved || !Array.isArray(saved.ids) || saved.ids.length === 0) { ready.current = true; return; }
    const ids = saved.ids;
    const snap = saved;
    let alive = true;
    setLoading(true);
    import("@/data/questions.json")
      .then((m) => {
        if (!alive) return;
        const data = (m as unknown as { default: Q[] }).default;
        setAll(data);
        const byId = new Map(data.map((q) => [q.id, q]));
        const qs = ids.map((id) => byId.get(id)).filter(Boolean) as Q[];
        if (qs.length === ids.length) {
          setTopic(snap.topic ?? "all"); setSize(snap.size ?? sizes[0]); setRun(qs);
          setI(snap.i ?? 0); setSel(new Set(snap.sel ?? [])); setChecked(!!snap.checked); setScore(snap.score ?? 0);
          recorded.current = (snap.i ?? 0) >= qs.length; // lượt đã xong thì không ghi điểm lại
        }
        setLoading(false);
        ready.current = true;
      })
      .catch(() => { setLoading(false); ready.current = true; });
    return () => { alive = false; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lưu tiến độ sau mỗi thay đổi (localStorage: giữ lại cả khi đóng trình duyệt, tối đa 30 ngày)
  useEffect(() => {
    if (!ready.current) return;
    try {
      if (!run) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), ids: run.map((q) => q.id), topic, size, i, sel: [...sel], checked, score }));
    } catch { /* bỏ qua */ }
  }, [run, topic, size, i, sel, checked, score]); // eslint-disable-line react-hooks/exhaustive-deps

  const finished = run !== null && i >= run.length;
  useEffect(() => {
    if (!finished || !run || recorded.current) return;
    recorded.current = true;
    if (scenario) recordScenario(topic, score, run.length);
    else recordQuiz(score, run.length);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = async () => {
    setLoading(true);
    let data = all;
    if (!data) {
      data = ((await import("@/data/questions.json")) as unknown as { default: Q[] }).default;
      setAll(data);
    }
    const pool = data.filter((q) => (topic === "all" || q.t === topic) && (!scenario || q.s));
    recorded.current = false;
    setRun(shuffle(pool).slice(0, size));
    setI(0); setSel(new Set()); setChecked(false); setScore(0);
    setLoading(false);
  };

  const topicName = (id: string) => quizTopics.find((x) => x.id === id)?.name ?? "";
  const countOf = (t: (typeof quizTopics)[number]) => (scenario ? t.scenarios : t.count);
  const total = scenario ? totalScenarios : totalQuestions;
  const unit = scenario ? "tình huống" : "câu";

  /* màn chọn chủ đề */
  if (!run) {
    return (
      <section className="max-w-3xl">
        <h2 className="text-xl font-bold">{scenario ? "Chọn loại thiên tai để luyện tình huống" : "Chọn chủ đề để làm bài"}</h2>
        <p className="text-muted-foreground mt-1">
          {scenario
            ? `${total} tình huống đặt em vào một hoàn cảnh cụ thể và hỏi em sẽ làm gì.`
            : `Tổng cộng ${total} câu hỏi, chia theo ${quizTopics.length} loại thiên tai.`}
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Chủ đề">
          {[{ id: "all", name: "Tất cả chủ đề", count: total, scenarios: total }, ...quizTopics].map((t) => {
            const n: number = t.id === "all" ? total : countOf(t as (typeof quizTopics)[number]);
            return (
              <button key={t.id} onClick={() => setTopic(t.id)} aria-pressed={topic === t.id} disabled={n === 0}
                className={`rounded-xl border p-3 text-left min-h-16 transition active:scale-[0.98] disabled:opacity-40 ${topic === t.id ? "border-primary bg-primary/10" : "bg-card hover:border-primary"}`}>
                <span className="block font-semibold leading-tight">{t.name}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{n} {unit}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Số {unit} mỗi lượt:</span>
          {sizes.map((n) => (
            <button key={n} onClick={() => setSize(n)} aria-pressed={size === n}
              className={`rounded-full border px-4 min-h-10 text-sm font-medium ${size === n ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{n}</button>
          ))}
        </div>
        <Button onClick={start} disabled={loading} className="mt-5 min-h-12 px-6 text-base gap-2">
          {loading ? "Đang tải" : "Bắt đầu"} <ArrowRight size={18} />
        </Button>
      </section>
    );
  }

  /* màn kết quả */
  if (finished) {
    const pct = Math.round((score / run.length) * 100);
    return (
      <section className="panel max-w-2xl p-6 rise" aria-live="polite">
        <p className="text-sm text-muted-foreground">Kết quả: {topic === "all" ? "Tất cả chủ đề" : topicName(topic)}</p>
        <p className="font-display text-6xl font-extrabold mt-1">{pct}<span className="text-3xl text-muted-foreground">%</span></p>
        <p className="mt-2">Em đúng {score}/{run.length} {unit}.</p>
        {!user && <p className="mt-3 text-sm text-muted-foreground"><Link to="/dang-nhap" className="text-primary underline">Đăng nhập</Link> để lưu kết quả và nhận huy hiệu.</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={start} className="min-h-11 gap-2"><RefreshIcon size={18} />Làm lượt mới</Button>
          <Button variant="outline" onClick={() => setRun(null)} className="min-h-11">Chọn chủ đề khác</Button>
        </div>
      </section>
    );
  }

  /* màn làm bài */
  const q = run[i];
  const multi = q.a.length > 1;
  const correct = sameSet(q.a, sel);
  const rightNow = multi ? correct : q.a[0] === [...sel][0];

  const pick = (idx: number) => {
    if (checked) return;
    if (!multi) {
      setSel(new Set([idx]));
      setChecked(true);
      if (q.a[0] === idx) setScore((s) => s + 1);
      return;
    }
    const s = new Set(sel);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setSel(s);
  };
  const check = () => { setChecked(true); if (correct) setScore((s) => s + 1); };
  const next = () => { setI(i + 1); setSel(new Set()); setChecked(false); };

  return (
    <section className="panel max-w-3xl p-5 md:p-6">
      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <span>{scenario ? "Tình huống" : topicName(q.t)} {i + 1} trên {run.length}{scenario ? ` · ${topicName(q.t)}` : ""}</span>
        <span>Đúng {score}</span>
      </div>
      <ol className="flex gap-1 mt-2" aria-hidden>
        {run.map((_, k) => <li key={k} className={`h-1.5 flex-1 rounded-full ${k < i ? "bg-primary" : k === i ? "bg-secondary" : "bg-muted"}`} />)}
      </ol>
      <h2 className="text-xl font-bold mt-5 leading-snug">{q.q}</h2>
      {multi && <p className="mt-2 text-sm font-medium text-primary">Có nhiều đáp án đúng. Em chọn tất cả đáp án đúng rồi bấm Kiểm tra.</p>}

      <div className="mt-4 space-y-2.5" role="group" aria-label="Các đáp án">
        {q.o.map((o, idx) => {
          const isRight = q.a.includes(idx);
          const chosen = sel.has(idx);
          const state = !checked ? (chosen ? "chosen" : "idle") : isRight ? "right" : chosen ? "wrong" : "dim";
          const cls = { idle: "bg-card hover:border-primary active:scale-[0.99]", chosen: "border-primary bg-primary/10", right: "border-success bg-success/10", wrong: "border-destructive bg-destructive/10", dim: "opacity-55" }[state];
          const badge = state === "right" ? "bg-success text-success-foreground border-success" : state === "wrong" ? "bg-destructive text-destructive-foreground border-destructive" : state === "chosen" ? "bg-primary text-primary-foreground border-primary" : "";
          return (
            <button key={idx} disabled={checked} onClick={() => pick(idx)} aria-pressed={chosen}
              className={`w-full text-left border rounded-xl p-3.5 flex gap-3 items-start transition ${cls}`}>
              <span className={`h-7 w-7 shrink-0 ${multi ? "rounded-md" : "rounded-full"} border flex items-center justify-center text-sm font-semibold ${badge}`}>
                {state === "right" ? <CheckIcon size={16} /> : state === "wrong" ? <CrossIcon size={16} /> : letters[idx]}
              </span>
              <span className="text-[15px] pt-0.5">{o}</span>
            </button>
          );
        })}
      </div>

      {multi && !checked && <Button onClick={check} disabled={sel.size === 0} className="mt-4 min-h-11">Kiểm tra</Button>}

      {checked && (
        <div className="mt-4 rise">
          <p className={`font-semibold ${rightNow ? "text-success" : "text-destructive"}`}>
            {rightNow ? "Đúng rồi." : `Chưa đúng. Đáp án đúng: ${q.a.map((x) => letters[x]).join(", ")}.`}
          </p>
          {q.e && <p className="flex gap-2 rounded-md bg-muted p-3 text-sm mt-2"><InfoIcon size={18} className="shrink-0 mt-0.5 text-primary" />{q.e}</p>}
          <Button onClick={next} className="mt-4 min-h-11 gap-2">
            {i + 1 === run.length ? "Xem kết quả" : scenario ? "Tình huống tiếp theo" : "Câu tiếp theo"} <ArrowRight size={18} />
          </Button>
        </div>
      )}
    </section>
  );
};
