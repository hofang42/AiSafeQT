import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { ArrowRight, BagIcon, CheckIcon, CrossIcon, InfoIcon, RefreshIcon, TargetIcon, bagIconFor } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { quiz, bagItems } from "@/data/quiz";

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
const letters = ["A", "B", "C", "D"];

const Quiz = () => {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => shuffle(quiz).slice(0, 10), [seed]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const { user, recordQuiz } = useAuth();
  const finished = i >= questions.length;

  useEffect(() => {
    if (finished) recordQuiz(score, questions.length);
  }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => { setSeed((s) => s + 1); setI(0); setPicked(null); setScore(0); };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="panel max-w-2xl p-6 rise" aria-live="polite">
        <p className="text-sm text-muted-foreground">Kết quả bài trắc nghiệm</p>
        <p className="font-display text-6xl font-extrabold mt-1">{pct}<span className="text-3xl text-muted-foreground">%</span></p>
        <p className="mt-2">Em đúng {score}/{questions.length} câu. {pct >= 80 ? "Kiến thức rất vững." : pct >= 50 ? "Khá tốt, em ôn thêm phần sai nhé." : "Em hãy xem lại phần Tình huống và hỏi Trợ lý AI rồi làm lại."}</p>
        {!user && <p className="mt-3 text-sm text-muted-foreground"><Link to="/dang-nhap" className="text-primary underline">Đăng nhập</Link> để lưu điểm và nhận huy hiệu.</p>}
        <Button onClick={reset} className="mt-5 min-h-11 gap-2"><RefreshIcon size={18} />Làm bài mới</Button>
      </section>
    );
  }

  const q = questions[i];
  return (
    <section className="panel max-w-2xl p-5 md:p-6">
      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <span>Câu {i + 1} trên {questions.length}</span>
        <span>Đúng {score}</span>
      </div>
      <ol className="flex gap-1 mt-2" aria-hidden>
        {questions.map((_, k) => <li key={k} className={`h-1.5 flex-1 rounded-full ${k < i ? "bg-primary" : k === i ? "bg-secondary" : "bg-muted"}`} />)}
      </ol>
      <h2 className="text-xl font-bold mt-5 leading-snug">{q.question}</h2>

      <div className="mt-4 space-y-2.5" role="group" aria-label="Các đáp án">
        {q.options.map((o, idx) => {
          const show = picked !== null;
          const state = !show ? "idle" : idx === q.answer ? "right" : picked === idx ? "wrong" : "dim";
          const cls = { idle: "bg-card hover:border-primary active:scale-[0.99]", right: "border-success bg-success/10", wrong: "border-destructive bg-destructive/10", dim: "opacity-55" }[state];
          return (
            <button key={idx} disabled={show} onClick={() => { setPicked(idx); if (idx === q.answer) setScore((s) => s + 1); }}
              className={`w-full text-left border rounded-lg p-3.5 flex gap-3 items-start transition ${cls}`}>
              <span className={`h-7 w-7 shrink-0 rounded-full border flex items-center justify-center text-sm font-semibold ${state === "right" ? "bg-success text-success-foreground border-success" : state === "wrong" ? "bg-destructive text-destructive-foreground border-destructive" : ""}`}>
                {state === "right" ? <CheckIcon size={16} /> : state === "wrong" ? <CrossIcon size={16} /> : letters[idx]}
              </span>
              <span className="text-[15px] pt-0.5">{o}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4 rise">
          <p className="flex gap-2 rounded-md bg-muted p-3 text-sm"><InfoIcon size={18} className="shrink-0 mt-0.5 text-primary" />{q.explain}</p>
          <Button onClick={() => { setPicked(null); setI(i + 1); }} className="mt-4 min-h-11 gap-2">
            {i + 1 === questions.length ? "Xem kết quả" : "Câu tiếp theo"} <ArrowRight size={18} />
          </Button>
        </div>
      )}
    </section>
  );
};

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
            <button key={it.name} onClick={() => toggle(it.name)} aria-pressed={on} className={`border rounded-lg p-3 text-center text-sm min-h-28 flex flex-col items-center gap-2 transition active:scale-[0.98] ${cls}`}>
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
  <Layout title="Trò chơi và kiểm tra kiến thức" subtitle="Thử thách bản thân với bài trắc nghiệm và trò chơi chuẩn bị túi khẩn cấp.">
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
