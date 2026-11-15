import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { ArrowRight, BagIcon, CheckIcon, CrossIcon, InfoIcon, RefreshIcon, TargetIcon, bagIconFor } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { bagItems } from "@/data/quiz";
import { quizTopics, totalQuestions } from "@/data/questionMeta";

interface Q {
  id: string;
  t: string;
  q: string;
  o: string[];
  a: number[];
  e?: string;
}

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const letters = ["A", "B", "C", "D", "E", "F", "G"];
const sameSet = (a: number[], b: Set<number>) => a.length === b.size && a.every((x) => b.has(x));

/* ---------- Trắc nghiệm: bộ câu hỏi do nhóm tác giả cung cấp ---------- */
const Quiz = () => {
  const [all, setAll] = useState<Q[] | null>(null);
  const [topic, setTopic] = useState<string>("all");
  const [size, setSize] = useState(10);
  const [run, setRun] = useState<Q[] | null>(null);
  const [i, setI] = useState(0);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, recordQuiz } = useAuth();

  const finished = run !== null && i >= run.length;
  useEffect(() => {
    if (finished && run) recordQuiz(score, run.length);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = async (t = topic) => {
    setLoading(true);
    let data = all;
    if (!data) {
      data = ((await import("@/data/questions.json")) as unknown as { default: Q[] }).default;
      setAll(data);
    }
    const pool = data.filter((q) => t === "all" || q.t === t);
    setRun(shuffle(pool).slice(0, size));
    setI(0); setSel(new Set()); setChecked(false); setScore(0);
    setLoading(false);
  };

  const topicName = (id: string) => quizTopics.find((x) => x.id === id)?.name ?? "";

  /* màn chọn chủ đề */
  if (!run) {
    return (
      <section className="max-w-3xl">
        <h2 className="text-xl font-bold">Chọn chủ đề để làm bài</h2>
        <p className="text-muted-foreground mt-1">Tổng cộng {totalQuestions} câu hỏi, chia theo {quizTopics.length} loại thiên tai.</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Chủ đề">
          {[{ id: "all", name: "Tất cả chủ đề", count: totalQuestions }, ...quizTopics].map((t) => (
            <button key={t.id} onClick={() => setTopic(t.id)} aria-pressed={topic === t.id}
              className={`rounded-xl border p-3 text-left min-h-16 transition active:scale-[0.98] ${topic === t.id ? "border-primary bg-primary/10" : "bg-card hover:border-primary"}`}>
              <span className="block font-semibold leading-tight">{t.name}</span>
              <span className="block text-xs text-muted-foreground mt-0.5">{t.count} câu</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Số câu mỗi lượt:</span>
          {[10, 20, 30].map((n) => (
            <button key={n} onClick={() => setSize(n)} aria-pressed={size === n}
              className={`rounded-full border px-4 min-h-10 text-sm font-medium ${size === n ? "bg-primary text-primary-foreground border-primary" : "bg-card"}`}>{n}</button>
          ))}
        </div>
        <Button onClick={() => start()} disabled={loading} className="mt-5 min-h-12 px-6 text-base gap-2">
          {loading ? "Đang tải câu hỏi" : "Bắt đầu"} <ArrowRight size={18} />
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
        <p className="mt-2">Em đúng {score}/{run.length} câu.</p>
        {!user && <p className="mt-3 text-sm text-muted-foreground"><Link to="/dang-nhap" className="text-primary underline">Đăng nhập</Link> để lưu điểm và nhận huy hiệu.</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={() => start()} className="min-h-11 gap-2"><RefreshIcon size={18} />Làm lượt mới</Button>
          <Button variant="outline" onClick={() => setRun(null)} className="min-h-11">Chọn chủ đề khác</Button>
        </div>
      </section>
    );
  }

  /* màn làm bài */
  const q = run[i];
  const multi = q.a.length > 1;
  const correct = sameSet(q.a, sel);

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
        <span>{topicName(q.t)} · Câu {i + 1} trên {run.length}</span>
        <span>Đúng {score}</span>
      </div>
      <ol className="flex gap-1 mt-2" aria-hidden>
        {run.map((_, k) => <li key={k} className={`h-1.5 flex-1 rounded-full ${k < i ? "bg-primary" : k === i ? "bg-secondary" : "bg-muted"}`} />)}
      </ol>
      <h2 className="text-xl font-bold mt-5 leading-snug">{q.q}</h2>
      {multi && <p className="mt-2 text-sm font-medium text-primary">Câu này có nhiều đáp án đúng. Em chọn tất cả đáp án đúng rồi bấm Kiểm tra.</p>}

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

      {multi && !checked && (
        <Button onClick={check} disabled={sel.size === 0} className="mt-4 min-h-11">Kiểm tra</Button>
      )}

      {checked && (
        <div className="mt-4 rise">
          <p className={`font-semibold ${(multi ? correct : q.a[0] === [...sel][0]) ? "text-success" : "text-destructive"}`}>
            {(multi ? correct : q.a[0] === [...sel][0]) ? "Đúng rồi." : `Chưa đúng. Đáp án đúng: ${q.a.map((x) => letters[x]).join(", ")}.`}
          </p>
          {q.e && <p className="flex gap-2 rounded-md bg-muted p-3 text-sm mt-2"><InfoIcon size={18} className="shrink-0 mt-0.5 text-primary" />{q.e}</p>}
          <Button onClick={next} className="mt-4 min-h-11 gap-2">
            {i + 1 === run.length ? "Xem kết quả" : "Câu tiếp theo"} <ArrowRight size={18} />
          </Button>
        </div>
      )}
    </section>
  );
};

/* ---------- Trò chơi túi khẩn cấp ---------- */
const Bag = () => {
  const items = useMemo(() => shuffle(bagItems), []);
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const { recordBag } = useAuth();
  const score = items.filter((it) => chosen.has(it.name) === it.needed).length;

  useEffect(() => {
    if (checked) recordBag(score);
  }, [checked]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (n: string) => {
    if (checked) return;
    const s = new Set(chosen);
    s.has(n) ? s.delete(n) : s.add(n);
    setChosen(s);
  };

  return (
    <section className="panel max-w-3xl p-5 md:p-6">
      <h2 className="text-xl font-bold flex items-center gap-2"><BagIcon size={24} className="text-primary" />Chuẩn bị túi khẩn cấp</h2>
      <p className="text-muted-foreground mt-1">Bão sắp đổ bộ. Chạm để chọn những món nên cho vào túi sơ tán. Đã chọn {chosen.size} món.</p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {items.map((it) => {
          const on = chosen.has(it.name);
          const ok = on === it.needed;
          const I = bagIconFor(it.name);
          const cls = checked ? (ok ? "border-success bg-success/10" : "border-destructive bg-destructive/10") : on ? "border-primary bg-primary/10" : "bg-card hover:border-primary";
          return (
            <button key={it.name} onClick={() => toggle(it.name)} aria-pressed={on} className={`border rounded-xl p-3 text-center text-sm min-h-28 flex flex-col items-center gap-2 transition active:scale-[0.98] ${cls}`}>
              <span className={`h-10 w-10 rounded-full flex items-center justify-center ${checked ? (ok ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground") : on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {checked ? (ok ? <CheckIcon size={20} /> : <CrossIcon size={20} />) : <I size={22} />}
              </span>
              <span className="font-medium leading-tight">{it.name}</span>
              {checked && <span className="text-xs text-muted-foreground">{it.why}</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {checked ? (
          <>
            <p className="font-semibold">Em chọn đúng {score}/{items.length} món.</p>
            <Button onClick={() => { setChosen(new Set()); setChecked(false); }} className="min-h-11 gap-2"><RefreshIcon size={18} />Chơi lại</Button>
          </>
        ) : (
          <Button onClick={() => setChecked(true)} className="min-h-11" disabled={chosen.size === 0}>Kiểm tra túi</Button>
        )}
      </div>
    </section>
  );
};

const Play = () => (
  <Layout title="Trò chơi và kiểm tra kiến thức" subtitle="Làm bài trắc nghiệm theo từng loại thiên tai hoặc chơi trò chuẩn bị túi khẩn cấp.">
    <Tabs defaultValue="quiz">
      <TabsList className="mb-4 h-12">
        <TabsTrigger value="quiz" className="gap-2 min-h-10 px-4"><TargetIcon size={18} />Trắc nghiệm</TabsTrigger>
        <TabsTrigger value="bag" className="gap-2 min-h-10 px-4"><BagIcon size={18} />Túi khẩn cấp</TabsTrigger>
      </TabsList>
      <TabsContent value="quiz"><Quiz /></TabsContent>
      <TabsContent value="bag"><Bag /></TabsContent>
    </Tabs>
  </Layout>
);

export default Play;
