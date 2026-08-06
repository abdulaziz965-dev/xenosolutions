import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import PrivacyPolicy from "./pages/privacyploicy";
import Terms from "./pages/terms";
import NotFound from "./pages/notfound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}