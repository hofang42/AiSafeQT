import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { BagIcon, BranchIcon, ChatIcon, CloseIcon, MegaphoneIcon, MenuIcon, PinIcon, ShieldCheck, TargetIcon, UserIcon } from "./icons";

const tabs = [
  { to: "/tinh-huong", label: "Tình huống", icon: BranchIcon },
  { to: "/tro-ly", label: "Trợ lý AI", icon: ChatIcon },
  { to: "/tro-choi", label: "Trò chơi", icon: TargetIcon },
  { to: "/ban-do", label: "Bản đồ", icon: PinIcon },
];

const desktopLinks = [...tabs, { to: "/tuyen-truyen", label: "Tuyên truyền", icon: MegaphoneIcon }];

export const Navigation = () => {
  const [more, setMore] = useState(false);
  const { user } = useAuth();
  const { pathname } = useLocation();
  const account = user ? { to: "/ho-so", label: user.name.split(" ").slice(-1)[0] } : { to: "/dang-nhap", label: "Đăng nhập" };

  useEffect(() => {
    setMore(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="risk-strip" aria-hidden />
        <nav className="page-wrap flex items-center justify-between h-14" aria-label="Điều hướng chính">
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg text-primary min-h-11">
            <ShieldCheck size={26} />
            AI Safe QT
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {desktopLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 border-b-2 transition-colors ${isActive ? "border-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to={account.to} className="inline-flex items-center gap-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground px-4 min-h-10 hover:opacity-90 active:scale-[0.98] transition">
              <UserIcon size={18} />
              {account.label}
            </NavLink>
          </div>

          <NavLink to={account.to} className="md:hidden inline-flex items-center gap-1.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground px-3 min-h-10" aria-label={account.label}>
            <UserIcon size={18} />
            {account.label}
          </NavLink>
        </nav>
      </header>

      {/* Thanh điều hướng dưới cho điện thoại: 4 mục chính + "Thêm" */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t" aria-label="Điều hướng nhanh" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <ul className="grid grid-cols-5">
          {tabs.map((t) => (
            <li key={t.to}>
              <NavLink
                to={t.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`h-7 w-12 rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-secondary/40" : ""}`}>
                      <t.icon size={22} />
                    </span>
                    {t.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setMore(!more)}
              aria-expanded={more}
              aria-controls="more-menu"
              className="w-full flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-medium text-muted-foreground"
            >
              <span className="h-7 w-12 rounded-full flex items-center justify-center">{more ? <CloseIcon size={22} /> : <MenuIcon size={22} />}</span>
              Thêm
            </button>
          </li>
        </ul>
      </nav>

      {more && (
        <div id="more-menu" className="md:hidden fixed inset-x-0 z-30 bg-background border-t shadow-lg" style={{ bottom: "calc(3.5rem + env(safe-area-inset-bottom, 0px))" }}>
          <ul className="page-wrap py-2">
            {[
              { to: "/", label: "Trang chủ", icon: ShieldCheck },
              { to: "/tuyen-truyen", label: "Góc tuyên truyền", icon: MegaphoneIcon },
              { to: account.to, label: user ? "Hồ sơ của em" : "Đăng nhập hoặc tạo tài khoản", icon: UserIcon },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex items-center gap-3 min-h-12 text-base font-medium border-b last:border-0">
                  <l.icon size={22} className="text-primary" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
