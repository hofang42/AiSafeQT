import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import Scenarios from "./pages/Scenarios";
import Play from "./pages/Play";
import SafetyMap from "./pages/SafetyMap";
import Campaign from "./pages/Campaign";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tro-ly" element={<Assistant />} />
          <Route path="/tinh-huong" element={<Scenarios />} />
          <Route path="/tro-choi" element={<Play />} />
          <Route path="/ban-do" element={<SafetyMap />} />
          <Route path="/tuyen-truyen" element={<Campaign />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/ho-so" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
