import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { BagIcon, CheckIcon, CrossIcon, RefreshIcon, TargetIcon, bagIconFor } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { bagItems } from "@/data/quiz";
import { QuizRunner } from "@/components/QuizRunner";

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

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

const Play = () => {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("aisafe.play.tab") || "quiz"; } catch { return "quiz"; }
  });
  const change = (v: string) => {
    setTab(v);
    try { localStorage.setItem("aisafe.play.tab", v); } catch { /* bỏ qua */ }
  };
  return (
  <Layout title="Trò chơi và kiểm tra kiến thức" subtitle="Làm bài trắc nghiệm theo từng loại thiên tai hoặc chơi trò chuẩn bị túi khẩn cấp.">
    <Tabs value={tab} onValueChange={change}>
      <TabsList className="mb-4 h-12">
        <TabsTrigger value="quiz" className="gap-2 min-h-10 px-4"><TargetIcon size={18} />Trắc nghiệm</TabsTrigger>
        <TabsTrigger value="bag" className="gap-2 min-h-10 px-4"><BagIcon size={18} />Túi khẩn cấp</TabsTrigger>
      </TabsList>
      <TabsContent value="quiz"><QuizRunner mode="quiz" /></TabsContent>
      <TabsContent value="bag"><Bag /></TabsContent>
    </Tabs>
  </Layout>
  );
};

export default Play;
