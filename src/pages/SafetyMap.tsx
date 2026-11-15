import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Layout } from "@/components/Layout";
import { ExternalIcon, InfoIcon, PinIcon } from "@/components/icons";
import { places, kindMeta, basisLabel, PlaceKind, Place } from "@/data/places";
import { rivers } from "@/data/rivers";
import { floodEvents, floodRiskAreas } from "@/data/floods";

/** Nguồn nền bản đồ: thử lần lượt, nguồn trước lỗi thì chuyển sang nguồn sau. */
const basemaps = [
  { url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", subdomains: "abc", attr: "Tiles &copy; Esri" },
  { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", subdomains: "abc", attr: "&copy; OpenStreetMap" },
];

const pinHtml = (color: string) =>
  `<svg width="34" height="42" viewBox="0 0 34 42" aria-hidden="true"><path d="M17 40S4 28.6 4 16.5a13 13 0 0126 0C30 28.6 17 40 17 40z" fill="${color}" stroke="#fff" stroke-width="2.5"/><circle cx="17" cy="16.5" r="5" fill="#fff"/></svg>`;

const LegendPin = ({ color }: { color: string }) => (
  <svg width="18" height="22" viewBox="0 0 34 42" aria-hidden="true"><path d="M17 40S4 28.6 4 16.5a13 13 0 0126 0C30 28.6 17 40 17 40z" fill={color} /><circle cx="17" cy="16.5" r="5" fill="#fff" /></svg>
);

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

const MAIN_RIVERS = ["Thạch Hãn", "Hiếu", "Bến Hải", "Ô Lâu"];

const SafetyMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const riverRef = useRef<L.LayerGroup | null>(null);
  const markers = useRef<Record<string, L.Marker>>({});
  const [filter, setFilter] = useState<PlaceKind | "all">("all");
  const [showRivers, setShowRivers] = useState(true);
  const [source, setSource] = useState(0);
  const errors = useRef(0);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([16.82, 107.0], 9);
    riverRef.current = L.layerGroup().addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const b = basemaps[source];
    errors.current = 0;
    const layer = L.tileLayer(b.url, { subdomains: b.subdomains, attribution: b.attr + " | Dữ liệu: OpenStreetMap", maxZoom: 18 }).addTo(map);
    layer.on("tileerror", () => {
      errors.current += 1;
      if (errors.current === 4 && source < basemaps.length - 1) setSource(source + 1);
    });
    return () => { layer.remove(); };
  }, [source]);

  // Lớp sông chính (OpenStreetMap)
  useEffect(() => {
    const g = riverRef.current;
    if (!g) return;
    g.clearLayers();
    if (!showRivers) return;
    Object.entries(rivers).forEach(([name, lines]) => {
      lines.forEach((pts) => {
        L.polyline(pts, { color: "#1e88e5", weight: MAIN_RIVERS.includes(name) ? 4 : 2.5, opacity: 0.85 })
          .bindTooltip(`Sông ${name}`, { sticky: true })
          .addTo(g);
      });
    });
  }, [showRivers]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    markers.current = {};
    places.filter((p) => filter === "all" || p.kind === filter).forEach((p) => {
      const icon = L.divIcon({ className: "", html: pinHtml(kindMeta[p.kind].color), iconSize: [34, 42], iconAnchor: [17, 40], popupAnchor: [0, -36] });
      const src = p.url ? `<br/><a href="${esc(p.url)}" target="_blank" rel="noreferrer">${esc(p.source ?? "Nguồn")}</a>` : p.source ? `<br/><small>${esc(p.source)}</small>` : "";
      const m = L.marker([p.lat, p.lng], { icon, title: p.name, keyboard: true })
        .bindPopup(`<strong>${esc(p.name)}</strong><br/>${esc(p.area)} · ${esc(kindMeta[p.kind].label)}<br/>${esc(p.note)}<br/><small><em>${basisLabel[p.basis]}</em></small>${src}`)
        .addTo(layer);
      markers.current[p.id] = m;
    });
  }, [filter]);

  const focus = (p: Place) => {
    mapRef.current?.flyTo([p.lat, p.lng], 11, { duration: 0.8 });
    markers.current[p.id]?.openPopup();
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const shown = places.filter((p) => filter === "all" || p.kind === filter);

  return (
    <Layout title="Bản đồ học tập an toàn" subtitle="Xem vùng ngập lụt, nơi dễ lũ quét sạt lở, hồ chứa, sông chính và bệnh viện tại Quảng Trị. Chạm vào ghim để xem nguồn.">
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="group" aria-label="Lọc theo loại">
        {([["all", "Tất cả", "#12537a"], ...(Object.keys(kindMeta) as PlaceKind[]).map((k) => [k, kindMeta[k].label, kindMeta[k].color])] as [string, string, string][]).map(([k, label, color]) => (
          <button
            key={k}
            onClick={() => setFilter(k as PlaceKind | "all")}
            aria-pressed={filter === k}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 min-h-10 text-sm font-medium transition ${filter === k ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:border-primary"}`}
          >
            <LegendPin color={filter === k ? "#fff" : color} />
            {label}
          </button>
        ))}
        <button
          onClick={() => setShowRivers(!showRivers)}
          aria-pressed={showRivers}
          className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-4 min-h-10 text-sm font-medium transition ${showRivers ? "bg-[#1e88e5] text-white border-[#1e88e5]" : "bg-card hover:border-primary"}`}
        >
          <span className="h-1 w-5 rounded-full" style={{ background: showRivers ? "#fff" : "#1e88e5" }} aria-hidden />
          Sông chính
        </button>
      </div>

      <div className="mt-3">
        <div ref={ref} className="h-[62dvh] min-h-80 rounded-lg border bg-muted" role="application" aria-label="Bản đồ vùng ngập, lũ quét, hồ chứa và bệnh viện" />
      </div>

      <div className="mt-4 flex gap-2.5 rounded-xl bg-secondary/25 p-3 text-sm max-w-3xl">
        <InfoIcon size={20} className="shrink-0 mt-0.5" />
        <p>
          Hình dạng sông, hồ chứa và bệnh viện lấy từ OpenStreetMap. Các điểm ngập và lũ quét đặt tại trung tâm xã theo tin báo chí và bản tin cảnh báo, nên chỉ cho biết khu vực, không phải vị trí chính xác từng điểm.
          Bản đồ chưa có danh sách nhà tránh trú chính thức: hãy hỏi UBND xã hoặc Ban Chỉ huy PCTT&TKCN tỉnh.
        </p>
      </div>

      <h2 className="text-xl font-bold mt-10 mb-1">Các đợt lũ gần đây</h2>
      <p className="text-sm text-muted-foreground mb-4">Số liệu chép đúng theo bài báo gốc. Chỗ bài không nêu thì không ghi.</p>
      <div className="grid gap-4 lg:grid-cols-3">
        {floodEvents.map((e) => (
          <article key={e.id} className="panel p-5 flex flex-col">
            <p className="text-sm text-muted-foreground">{e.date}</p>
            <h3 className="font-bold text-lg leading-snug">{e.title}</h3>
            <ul className="list-disc pl-5 mt-3 space-y-1.5 text-sm">{e.summary.map((s) => <li key={s}>{s}</li>)}</ul>
            {e.readings && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <caption className="sr-only">Mực nước đo được</caption>
                  <thead><tr className="text-left text-muted-foreground"><th className="py-1 pr-3 font-medium">Sông, trạm</th><th className="py-1 pr-3 font-medium">Mực nước</th><th className="py-1 font-medium">So với báo động</th></tr></thead>
                  <tbody>
                    {e.readings.map((r) => (
                      <tr key={r.river + r.station} className="border-t">
                        <td className="py-1.5 pr-3">{r.river}, {r.station}</td>
                        <td className="py-1.5 pr-3 font-semibold whitespace-nowrap">{r.level}</td>
                        <td className="py-1.5">{r.vsAlarm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <a href={e.url} target="_blank" rel="noreferrer" className="mt-auto pt-4 text-sm text-primary underline inline-flex items-center gap-1.5">{e.source}<ExternalIcon size={14} /></a>
          </article>
        ))}
      </div>
      <div className="panel p-5 mt-4 text-sm max-w-4xl">
        <p className="font-semibold mb-1">Khu vực có nguy cơ (cảnh báo tháng 10/2020)</p>
        <p>{floodRiskAreas.flash}</p>
        <p className="mt-1">{floodRiskAreas.flood}</p>
        <a href={floodRiskAreas.url} target="_blank" rel="noreferrer" className="text-primary underline inline-flex items-center gap-1.5 mt-2">{floodRiskAreas.source}<ExternalIcon size={14} /></a>
      </div>

      <h2 className="text-xl font-bold mt-10 mb-3">Danh sách địa điểm ({shown.length})</h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.id}>
            <button onClick={() => focus(p)} className="panel card-lift w-full h-full text-left p-4 flex gap-3">
              <span className="mt-0.5 shrink-0"><LegendPin color={kindMeta[p.kind].color} /></span>
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{p.name}</span>
                <span className="block text-sm text-muted-foreground">{p.area} · {kindMeta[p.kind].label}</span>
                <span className="block text-sm mt-1">{p.note}</span>
                <span className="block text-xs text-muted-foreground mt-1">{basisLabel[p.basis]}</span>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-2"><PinIcon size={14} />Xem trên bản đồ</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default SafetyMap;
