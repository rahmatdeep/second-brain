import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ContentsProvider } from "./hooks/useContent";

export default function App() {
  return (
    <ContentsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ContentsProvider>
  );
}
