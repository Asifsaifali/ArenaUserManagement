import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Hero from "./pages/Hero/Hero";

function App() {
  return (
    // <Routes>
    //   <Route path="/dashboard/*" element={<Dashboard />} />
    //   <Route path="/auth/*" element={<Auth />} />
    //   <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    // </Routes>
    <Hero/>
  );
}

export default App;
