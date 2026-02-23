import React, { useState } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import SideBar from "./components/sidebar/SideBar";
import ComingSoonPage from "./pages/ComingSoonPage";
import Footer from "./components/Footer";
import CreateEventPage from "./pages/CreateEventPage";

function AppLayout() {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const currentPage = location.pathname.split("/")[1] || "home";
  const sidebarWidth = isSidebarExpanded
    ? "clamp(12rem, 16vw, 14rem)"
    : "clamp(4.5rem, 6vw, 5.5rem)";

  return (
    <div className="min-h-screen">
      <SideBar
        currentPage={currentPage}
        isExpanded={isSidebarExpanded}
        sidebarWidth={sidebarWidth}
        onToggle={() => setIsSidebarExpanded((prev) => !prev)}
      />
      <div className="flex flex-col transition-all duration-200" style={{ marginLeft: sidebarWidth }}>
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<ComingSoonPage />} />
        <Route path="/events" element={<ComingSoonPage />} />
        <Route path="/events/create" element={<CreateEventPage />} />
        <Route path="/notifications" element={<ComingSoonPage />} />
        <Route path="/calendar" element={<ComingSoonPage />} />
        <Route path="/map" element={<ComingSoonPage />} />
        <Route path="/friends" element={<ComingSoonPage />} />
        <Route path="/chats" element={<ComingSoonPage />} />
        <Route path="/profile" element={<ComingSoonPage />} />
        <Route path="/settings" element={<ComingSoonPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
