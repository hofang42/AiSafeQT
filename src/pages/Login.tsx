import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";

const Field = ({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} name={id} {...rest} />
  </div>
);

const Login = () => {
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = (fn: (f: FormData) => Promise<string | null>) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await fn(new FormData(e.currentTarget));
    setBusy(false);
    if (err) setError(err);
    else nav("/ho-so");
  };

  const s = (f: FormData, k: string) => String(f.get(k) ?? "");

  return (
    <Layout title="Đăng nhập" subtitle="Có tài khoản, tiến độ học tập và huy hiệu của em sẽ được lưu lại.">
      <div className="max-w-md panel p-6">
        <Tabs defaultValue="login" onValueChange={() => setError(null)}>
          <TabsList className="grid grid-cols-2 mb-5">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Tạo tài khoản</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form className="space-y-4" onSubmit={submit((f) => login(s(f, "username"), s(f, "password")))}>
              <Field id="username" label="Tên đăng nhập" autoComplete="username" required />
              <Field id="password" label="Mật khẩu" type="password" autoComplete="current-password" required />
              <Button type="submit" className="w-full" disabled={busy}>Đăng nhập</Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form
              className="space-y-4"
              onSubmit={submit((f) =>
                register({ name: s(f, "name"), username: s(f, "username"), password: s(f, "password"), school: s(f, "school"), grade: s(f, "grade") }),
              )}
            >
              <Field id="name" label="Họ và tên" autoComplete="name" required />
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2"><Field id="school" label="Trường" placeholder="Tên trường của em" /></div>
                <Field id="grade" label="Lớp" placeholder="7A" />
              </div>
              <Field id="username" label="Tên đăng nhập" placeholder="chữ không dấu, số" autoComplete="username" required />
              <Field id="password" label="Mật khẩu (ít nhất 6 ký tự)" type="password" autoComplete="new-password" required />
              <Button type="submit" className="w-full" disabled={busy}>Tạo tài khoản</Button>
            </form>
          </TabsContent>
        </Tabs>

        {error && <p role="alert" className="mt-4 text-sm text-destructive font-medium">{error}</p>}
        <p className="mt-5 text-xs text-muted-foreground">
          Tài khoản được lưu trên thiết bị này. Đổi sang máy hoặc điện thoại khác, em cần tạo tài khoản mới.
        </p>
      </div>
    </Layout>
  );
};

export default Login;
