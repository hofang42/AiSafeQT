import { Layout } from "@/components/Layout";
import { ExternalIcon } from "@/components/icons";
import { guides, slogans } from "@/data/media";
import { facts, sources } from "@/data/facts";

const Campaign = () => (
  <Layout title="Góc tuyên truyền" subtitle="Khẩu hiệu, thẻ hướng dẫn nhanh và các nguồn tài liệu chính thống để em chia sẻ với gia đình, bạn bè.">
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Khẩu hiệu</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {slogans.map((s, i) => (
          <li key={s} className={`rounded-lg p-5 font-display text-xl font-bold leading-snug ${i % 2 ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}>
            {s}
          </li>
        ))}
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Thẻ hướng dẫn nhanh</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((g) => (
          <article key={g.title} className="panel p-5">
            <h3 className="font-bold mb-3">{g.title}</h3>
            <ol className="space-y-2 text-sm list-decimal pl-5">
              {g.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </article>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">Tóm tắt từ khuyến cáo của Cục Quản lý đê điều và Phòng, chống thiên tai và UNICEF Việt Nam.</p>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Số liệu và khuyến cáo có nguồn</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {facts.map((f) => (
          <article key={f.title} className="panel p-5">
            <h3 className="font-bold">{f.title}</h3>
            <p className="text-sm mt-2">{f.body}</p>
            <a href={f.url} target="_blank" rel="noreferrer" className="text-sm text-primary underline mt-3 inline-block">{f.source}</a>
          </article>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-2">Tài liệu và cuộc thi để em tìm hiểu thêm</h2>
      <p className="text-sm text-muted-foreground mb-4">Các liên kết dẫn tới trang gốc. Nhóm tác giả có thể thêm video, hình ảnh của riêng mình vào mục này.</p>
      <ul className="panel divide-y">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer" className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-4 hover:bg-muted">
              <span className="text-xs font-semibold rounded bg-secondary/30 px-2 py-0.5">{s.kind}</span>
              <span className="font-medium text-primary underline inline-flex items-center gap-1.5">{s.title}<ExternalIcon size={14} /></span>
              <span className="text-sm text-muted-foreground">{s.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default Campaign;
