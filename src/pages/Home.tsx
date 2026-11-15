import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Layout";
import { HeroScene } from "@/components/HeroScene";
import { ArrowRight, BranchIcon, ChatIcon, MegaphoneIcon, PhoneIcon, PinIcon, TargetIcon, hazardIcons } from "@/components/icons";
import { hazards } from "@/data/hazards";
import { facts } from "@/data/facts";
import { scenarios } from "@/data/scenarios";
import { totalQuestions } from "@/data/questionMeta";

const features = [
  { to: "/tinh-huong", icon: BranchIcon, tone: "hz-bao", title: "Tình huống mô phỏng", desc: `${scenarios.length} tình huống thật. Em chọn cách xử lý, mình phản hồi ngay.` },
  { to: "/tro-choi", icon: TargetIcon, tone: "hz-nang", title: "Trò chơi và kiểm tra", desc: `${totalQuestions} câu trắc nghiệm, 15 chủ đề, và trò chơi gói túi khẩn cấp.` },
  { to: "/tro-ly", icon: ChatIcon, tone: "hz-lu", title: "Hỏi trợ lý AI", desc: "Có điều chưa hiểu? Cứ hỏi, trợ lý trả lời bằng lời dễ hiểu." },
  { to: "/ban-do", icon: PinIcon, tone: "hz-luquet", title: "Bản đồ an toàn", desc: "Xem vùng nguy cơ và nơi trú ẩn quanh Quảng Trị." },
  { to: "/tuyen-truyen", icon: MegaphoneIcon, tone: "hz-set", title: "Góc tuyên truyền", desc: "Khẩu hiệu, thẻ hướng dẫn để chia sẻ cùng gia đình, bạn bè." },
];

const phones = [
  { n: "112", l: "Cứu nạn, cứu hộ" },
  { n: "114", l: "Cứu hỏa" },
  { n: "115", l: "Cấp cứu" },
];

const Home = () => (
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main className="flex-1">
      <section className="sky pt-24 pb-6 overflow-hidden">
        <div className="page-wrap grid gap-6 lg:grid-cols-[1.1fr_1fr] items-center">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-card border px-3.5 py-1.5 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden />
              Cùng học cách giữ an toàn mùa mưa bão
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08]">
              Mưa bão đến, em đã biết phải làm gì chưa?
            </h1>
            <p className="mt-4 text-lg text-foreground/75 max-w-xl">
              Chơi tình huống, trả lời câu hỏi và hỏi trợ lý AI để biết cách bảo vệ mình, gia đình và bạn bè khi có bão, lũ, sạt lở, dông sét hay nắng nóng.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tinh-huong"><Button size="lg" className="min-h-12 px-6 text-base gap-2">Chơi tình huống đầu tiên <ArrowRight size={18} /></Button></Link>
              <Link to="/tro-ly"><Button size="lg" variant="outline" className="min-h-12 px-6 text-base bg-card">Hỏi trợ lý AI</Button></Link>
            </div>
          </div>
          <HeroScene className="w-full max-w-xl mx-auto lg:max-w-none" />
        </div>
      </section>

      <section className="bg-card border-y" aria-label="Số điện thoại khẩn cấp">
        <div className="page-wrap py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="font-display font-bold">Gặp nguy hiểm, gọi ngay:</p>
          <ul className="flex flex-wrap gap-2">
            {phones.map((p) => (
              <li key={p.n}>
                <a href={`tel:${p.n}`} className="inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground pl-3 pr-4 min-h-11 font-semibold active:scale-[0.97] transition">
                  <PhoneIcon size={18} />
                  <span className="font-display text-lg">{p.n}</span>
                  <span className="text-sm font-medium opacity-90">{p.l}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-wrap py-12">
        <h2 className="text-2xl md:text-3xl font-bold">Em muốn tìm hiểu về điều gì?</h2>
        <p className="text-muted-foreground mt-1 mb-6">Chọn một loại thiên tai để luyện tình huống tương ứng.</p>
        <ul className="grid gap-3 grid-cols-2 md:grid-cols-5 [&>li:last-child]:col-span-2 md:[&>li:last-child]:col-span-1">
          {hazards.map((h) => {
            const I = hazardIcons[h.id];
            return (
              <li key={h.id}>
                <Link to={`/tinh-huong?loai=${h.id}`} className={`hz-${h.id} hz-soft card-lift border-2 h-full rounded-2xl p-4 flex flex-col items-center text-center gap-3`}>
                  <span className="hz-solid h-16 w-16 rounded-full flex items-center justify-center"><I size={34} /></span>
                  <span className="font-display font-bold leading-tight">{h.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-muted py-12">
        <div className="page-wrap">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Em có thể làm gì ở đây</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.to}>
                <Link to={f.to} className="panel card-lift h-full p-5 flex gap-4 items-start">
                  <span className={`${f.tone} hz-tile h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center`}><f.icon size={28} /></span>
                  <span>
                    <span className="block font-display font-bold text-lg leading-tight">{f.title}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{f.desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-wrap py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Cẩm nang nhanh</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">Nhấn vào từng loại thiên tai để xem dấu hiệu nhận biết và cách làm trước, trong và sau khi xảy ra.</p>
        <div className="grid gap-3 md:grid-cols-2 items-start">
          {hazards.map((h) => {
            const I = hazardIcons[h.id];
            return (
              <details key={h.id} className={`hz-${h.id} panel overflow-hidden`}>
                <summary className="flex items-center gap-3 cursor-pointer p-4 list-none min-h-20">
                  <span className="hz-solid h-12 w-12 shrink-0 rounded-full flex items-center justify-center"><I size={26} /></span>
                  <span>
                    <span className="block font-display font-bold text-lg leading-tight">{h.name}</span>
                    <span className="block text-sm text-muted-foreground mt-0.5">{h.summary}</span>
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-4 border-t grid gap-4 sm:grid-cols-3 text-sm">
                  <div className="hz-soft sm:col-span-3 rounded-xl border p-3">
                    <p className="font-semibold mb-1">Dấu hiệu cần chú ý</p>
                    <ul className="list-disc pl-4 space-y-1">{h.signs.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                  {([["Trước khi xảy ra", h.before], ["Khi đang xảy ra", h.during], ["Sau khi xảy ra", h.after]] as const).map(([t, items]) => (
                    <div key={t}>
                      <p className="font-semibold mb-1">{t}</p>
                      <ul className="list-disc pl-4 space-y-1">{items.map((s) => <li key={s}>{s}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="page-wrap">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Thông tin có nguồn để em kiểm chứng</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {facts.slice(0, 4).map((f) => (
              <article key={f.title} className="panel p-5">
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm mt-2">{f.body}</p>
                <a href={f.url} target="_blank" rel="noreferrer" className="text-sm text-primary underline mt-3 inline-block">{f.source}</a>
              </article>
            ))}
          </div>
          <p className="mt-5"><Link to="/tuyen-truyen" className="text-primary font-semibold underline">Xem thêm thông tin và nguồn tài liệu</Link></p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Home;
