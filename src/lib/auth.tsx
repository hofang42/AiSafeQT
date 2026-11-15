import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Tài khoản học sinh lưu ngay trên thiết bị (localStorage).
 * Không cần máy chủ, nhưng tài khoản và tiến độ không đồng bộ giữa các thiết bị.
 * Mật khẩu được băm (PBKDF2) kèm muối, không lưu dạng chữ thường.
 */

export interface User {
  id: string;
  name: string;
  username: string;
  school: string;
  grade: string;
  salt: string;
  hash: string;
  createdAt: number;
}

export interface Progress {
  quiz: { attempts: number; best: number; last: number }; // điểm theo %
  scenarios: Record<string, { score: number; total: number }>;
  bag: { best: number };
}

const emptyProgress = (): Progress => ({ quiz: { attempts: 0, best: 0, last: 0 }, scenarios: {}, bag: { best: 0 } });

const K_USERS = "aisafe.users";
const K_SESSION = "aisafe.session";
const kProgress = (id: string) => `aisafe.progress.${id}`;

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* bộ nhớ bị chặn: bỏ qua, ứng dụng vẫn chạy */
  }
};

const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");

async function hashPassword(password: string, salt: string): Promise<string> {
  if (globalThis.crypto?.subtle) {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 100000, hash: "SHA-256" },
      key,
      256,
    );
    return toHex(bits);
  }
  // Dự phòng khi trình duyệt không có crypto.subtle (trang http thường)
  let h = 5381;
  for (const ch of salt + password) h = ((h << 5) + h + ch.charCodeAt(0)) | 0;
  return "x" + (h >>> 0).toString(16);
}

const randomSalt = () => toHex((globalThis.crypto || ({} as Crypto)).getRandomValues?.(new Uint8Array(16)).buffer ?? new TextEncoder().encode(String(Math.random())).buffer);

interface Ctx {
  user: User | null;
  progress: Progress;
  register: (d: { name: string; username: string; password: string; school: string; grade: string }) => Promise<string | null>;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  recordQuiz: (score: number, total: number) => void;
  recordScenario: (id: string, score: number, total: number) => void;
  recordBag: (score: number) => void;
}

const AuthCtx = createContext<Ctx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>(emptyProgress());

  useEffect(() => {
    const id = read<string | null>(K_SESSION, null);
    if (!id) return;
    const u = read<User[]>(K_USERS, []).find((x) => x.id === id) ?? null;
    setUser(u);
    if (u) setProgress({ ...emptyProgress(), ...read<Progress>(kProgress(u.id), emptyProgress()) });
  }, []);

  const start = (u: User) => {
    setUser(u);
    write(K_SESSION, u.id);
    setProgress({ ...emptyProgress(), ...read<Progress>(kProgress(u.id), emptyProgress()) });
  };

  const register: Ctx["register"] = async (d) => {
    const username = d.username.trim().toLowerCase();
    if (d.name.trim().length < 2) return "Hãy nhập họ tên của em.";
    if (!/^[a-z0-9._-]{3,20}$/.test(username)) return "Tên đăng nhập gồm 3 đến 20 ký tự: chữ không dấu, số, dấu chấm hoặc gạch.";
    if (d.password.length < 6) return "Mật khẩu cần ít nhất 6 ký tự.";
    const users = read<User[]>(K_USERS, []);
    if (users.some((u) => u.username === username)) return "Tên đăng nhập này đã có người dùng. Hãy chọn tên khác.";
    const salt = randomSalt();
    const u: User = {
      id: `u${Date.now().toString(36)}`,
      name: d.name.trim(),
      username,
      school: d.school.trim(),
      grade: d.grade.trim(),
      salt,
      hash: await hashPassword(d.password, salt),
      createdAt: Date.now(),
    };
    write(K_USERS, [...users, u]);
    start(u);
    return null;
  };

  const login: Ctx["login"] = async (username, password) => {
    const u = read<User[]>(K_USERS, []).find((x) => x.username === username.trim().toLowerCase());
    if (!u || u.hash !== (await hashPassword(password, u.salt))) return "Tên đăng nhập hoặc mật khẩu chưa đúng.";
    start(u);
    return null;
  };

  const logout = () => {
    setUser(null);
    setProgress(emptyProgress());
    write(K_SESSION, null);
  };

  const update = useCallback(
    (fn: (p: Progress) => Progress) => {
      if (!user) return;
      setProgress((prev) => {
        const next = fn(prev);
        write(kProgress(user.id), next);
        return next;
      });
    },
    [user],
  );

  const recordQuiz = useCallback((score: number, total: number) => {
    const pct = Math.round((score / total) * 100);
    update((p) => ({ ...p, quiz: { attempts: p.quiz.attempts + 1, best: Math.max(p.quiz.best, pct), last: pct } }));
  }, [update]);

  const recordScenario = useCallback((id: string, score: number, total: number) => {
    update((p) => {
      const old = p.scenarios[id];
      if (old && old.score >= score) return p;
      return { ...p, scenarios: { ...p.scenarios, [id]: { score, total } } };
    });
  }, [update]);

  const recordBag = useCallback((score: number) => {
    update((p) => ({ ...p, bag: { best: Math.max(p.bag.best, score) } }));
  }, [update]);

  const value = useMemo(
    () => ({ user, progress, register, login, logout, recordQuiz, recordScenario, recordBag }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, progress, recordQuiz, recordScenario, recordBag],
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth cần nằm trong AuthProvider");
  return c;
};
