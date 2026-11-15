import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { ArrowRight, CheckIcon, CrossIcon, RefreshIcon, hazardIcons } from "@/components/icons";
import { useAuth } from "@/lib/auth";
import { scenarios, Scenario } from "@/data/scenarios";
import { hazardById, hazards, HazardId } from "@/data/hazards";

const letters = ["A", "B", "C", "D"];

const Player = ({ scenario, onExit }: { scenario: Scenario; onExit: () => void }) => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const total = scenario.steps.length;
  const done = step >= total;
  const current = scenario.steps[step];
  const { user, recordScenario } = useAuth();
  const H = hazardIcons[scenario.hazard];

  useEffect(() => {
    if (done) recordScenario(scenario.id, score, total);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (current.choices[i].correct) setScore((s) => s + 1);
  };
  const restart = () => { setStep(0); setPicked(null); setScore(0); };

  if (done) {
    const perfect = score === total;
    return (
      <section className="panel max-w-2xl p-6 rise" aria-live="polite">
        <p className="text-sm text-muted-foreground">{scenario.title}</p>
        <h2 className="text-3xl font-extrabold mt-1">Em xử lý đúng {score}/{total} tình huống</h2>
        <p className="mt-3">{perfect ? "Rất tốt. Em đã nắm vững cách xử lý này." : "Hãy xem lại các phản hồi và thử lần nữa để an toàn hơn."}</p>
        {!user && (
          <p className="mt-3 text-sm text-muted-foreground">
            <Link to="/dang-nhap" className="text-primary underline">Đăng nhập</Link> để lưu kết quả và nhận huy hiệu.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={restart} className="min-h-11 gap-2"><RefreshIcon size={18} />Chơi lại</Button>
          <Button variant="outline" onClick={onExit} className="min-h-11">Chọn tình huống khác</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl">
      <button onClick={onExit} className="text-sm text-primary underline mb-4 min-h-10">Quay lại danh sách</button>
      <div className="panel p-5 md:p-6">
        <div className="flex items-center gap-3">
          <span className={`hz-${scenario.hazard} hz-solid h-12 w-12 rounded-full flex items-center justify-center shrink-0`}><H size={26} /></span>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{hazardById(scenario.hazard).name}</p>
            <h2 className="text-xl font-bold leading-tight">{scenario.title}</h2>
          </div>
        </div>

        <ol className="flex gap-1.5 mt-5" aria-label={`Tình huống ${step + 1} trên ${total}`}>
          {scenario.steps.map((_, i) => (
            <li key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-secondary" : "bg-muted"}`} />
          ))}
        </ol>

        {step === 0 && <p className="mt-5 rounded-md bg-muted p-3 text-sm">{scenario.intro}</p>}
        <p className="mt-5 font-semibold text-lg">{current.situation}</p>

        <div className="mt-4 space-y-2.5" role="group" aria-label="Các cách xử lý">
          {current.choices.map((c, i) => {
            const show = picked !== null;
            const isPicked = picked === i;
            const state = !show ? "idle" : c.correct ? "right" : isPicked ? "wrong" : "dim";
            const cls = {
              idle: "bg-card hover:border-primary active:scale-[0.99]",
              right: "border-success bg-success/10",
              wrong: "border-destructive bg-destructive/10",
              dim: "opacity-55",
            }[state];
            return (
              <button key={i} onClick={() => choose(i)} disabled={show} aria-pressed={isPicked}
                className={`w-full text-left border rounded-lg p-3.5 flex gap-3 transition ${cls}`}>
                <span className={`h-7 w-7 shrink-0 rounded-full border flex items-center justify-center text-sm font-semibold ${state === "right" ? "bg-success text-success-foreground border-success" : state === "wrong" ? "bg-destructive text-destructive-foreground border-destructive" : ""}`}>
                  {state === "right" ? <CheckIcon size={16} /> : state === "wrong" ? <CrossIcon size={16} /> : letters[i]}
                </span>
                <span className="text-[15px]">
                  {c.text}
                  {show && (isPicked || c.correct) && (
                    <span className="block mt-1.5 text-sm font-medium">{c.correct ? "Đúng. " : "Chưa đúng. "}{c.feedback}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <Button onClick={() => { setPicked(null); setStep(step + 1); }} className="mt-5 min-h-11 gap-2 rise">
            {step + 1 === total ? "Xem kết quả" : "Tình huống tiếp theo"} <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </section>
  );
};

const Scenarios = () => {
  const [active, setActive] = useState<Scenario | null>(null);
  const { progress } = useAuth();
  const [params, setParams] = useSearchParams();
  const loai = (params.get("loai") as HazardId | null) ?? "all";
  const list = scenarios.filter((s) => loai === "all" || s.hazard === loai);

  return (
    <Layout title="Thư viện tình huống mô phỏng" subtitle="Đặt mình vào các tình huống thật. Chọn cách xử lý và nhận phản hồi ngay lập tức.">
      {active ? (
        <Player scenario={active} onExit={() => setActive(null)} />
      ) : (
        <>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="group" aria-label="Lọc theo loại thiên tai">
          {[{ id: "all", name: "Tất cả" }, ...hazards].map((h) => (
            <button key={h.id} aria-pressed={loai === h.id} onClick={() => setParams(h.id === "all" ? {} : { loai: h.id })}
              className={`shrink-0 rounded-full border px-4 min-h-10 text-sm font-medium transition ${loai === h.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary"}`}>
              {h.name}
            </button>
          ))}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-2">
          {list.map((s) => {
            const h = hazardById(s.hazard);
            const I = hazardIcons[s.hazard];
            const best = progress.scenarios[s.id];
            return (
              <li key={s.id}>
                <button onClick={() => setActive(s)} className={`hz-${s.hazard} panel card-lift w-full h-full text-left p-5 flex flex-col gap-3`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="hz-solid h-14 w-14 rounded-full flex items-center justify-center"><I size={30} /></span>
                    {best && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-success/15 text-success px-2.5 py-1">
                        <CheckIcon size={14} />{best.score}/{best.total}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">{h.name}</span>
                  <span className="font-display font-bold text-lg leading-snug">{s.title}</span>
                  <span className="text-sm text-muted-foreground">{s.intro}</span>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Bắt đầu ({s.steps.length} tình huống) <ArrowRight size={16} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        </>
      )}
    </Layout>
  );
};

export default Scenarios;
