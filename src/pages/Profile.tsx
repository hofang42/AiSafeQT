import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress as Bar } from "@/components/ui/progress";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { scenarios } from "@/data/scenarios";
import { bagItems } from "@/data/quiz";
import { MedalIcon, CheckIcon } from "@/components/icons";

const Profile = () => {
  const { user, progress, logout } = useAuth();
  if (!user) return <Navigate to="/dang-nhap" replace />;

  const done = Object.keys(progress.scenarios).length;
  const perfect = Object.values(progress.scenarios).filter((s) => s.score === s.total).length;
  const bagMax = bagItems.length;

  const badges = [
    { name: "Bước đầu an toàn", got: done >= 1, how: "Hoàn thành 1 tình huống" },
    { name: "Người luyện tình huống", got: done >= 5, how: "Hoàn thành 5 tình huống" },
    { name: "Xử lý hoàn hảo", got: perfect >= 3, how: "Đúng toàn bộ ở 3 tình huống" },
    { name: "Kiến thức vững", got: progress.quiz.best >= 80, how: "Đạt từ 80% ở bài trắc nghiệm" },
    { name: "Túi khẩn cấp chuẩn", got: progress.bag.best >= bagMax, how: `Chọn đúng ${bagMax}/${bagMax} món` },
  ];

  return (
    <Layout title={`Xin chào, ${user.name}`} subtitle={[user.grade && `Lớp ${user.grade}`, user.school].filter(Boolean).join(" · ") || "Tiến độ học tập của em"}>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">Tình huống đã hoàn thành</p>
          <p className="font-display text-4xl font-bold mt-1">{done}<span className="text-xl text-muted-foreground">/{scenarios.length}</span></p>
          <Bar className="mt-3" value={(done / scenarios.length) * 100} />
        </div>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">Điểm trắc nghiệm cao nhất</p>
          <p className="font-display text-4xl font-bold mt-1">{progress.quiz.best}<span className="text-xl text-muted-foreground">%</span></p>
          <p className="text-sm text-muted-foreground mt-3">Đã làm {progress.quiz.attempts} lần</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">Túi khẩn cấp tốt nhất</p>
          <p className="font-display text-4xl font-bold mt-1">{progress.bag.best}<span className="text-xl text-muted-foreground">/{bagMax}</span></p>
          <Bar className="mt-3" value={(progress.bag.best / bagMax) * 100} />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">Huy hiệu</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {badges.map((b) => (
          <li key={b.name} className={`panel p-4 flex items-start gap-3 ${b.got ? "border-secondary border-2" : "opacity-70"}`}>
            <span className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center ${b.got ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>{b.got ? <MedalIcon size={22} /> : <MedalIcon size={22} className="opacity-50" />}</span>
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-muted-foreground inline-flex items-center gap-1">{b.got ? <><CheckIcon size={14} />Đã đạt</> : b.how}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link to="/tinh-huong"><Button>Luyện tình huống</Button></Link>
        <Link to="/tro-choi"><Button variant="outline">Làm bài kiểm tra</Button></Link>
        <Button variant="ghost" onClick={logout}>Đăng xuất</Button>
      </div>
    </Layout>
  );
};

export default Profile;
