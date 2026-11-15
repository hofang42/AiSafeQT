import { Layout } from "@/components/Layout";
import { QuizRunner } from "@/components/QuizRunner";

const Scenarios = () => (
  <Layout title="Thư viện tình huống mô phỏng" subtitle="Đặt mình vào các tình huống thật. Chọn cách xử lý và nhận phản hồi ngay lập tức.">
    <QuizRunner mode="scenario" />
  </Layout>
);

export default Scenarios;
