import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import PrivacyPolicy from "./pages/privacyploicy";
import Terms from "./pages/terms";
import NotFound from "./pages/notfound";
import GMMessage from "./pages/GMMessage";

function ReferenceHome() {
  const referenceConfig = new URLSearchParams({
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
    supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "",
    emailServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
    emailTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
    emailPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
  }).toString();

  return (
    <iframe
      title="Xenosys Solutions"
      src={`/xenosys-reference.html?${referenceConfig}`}
      style={{
        display: "block",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        border: 0,
      }}
    />
  );
}

function ReferenceShell({ children }: { children: React.ReactNode }) {
  const isGMMessage = window.location.pathname === "/gm-message";

  return (
    <div className="reference-shell">
      <header className="site-header">
        {isGMMessage ? (
          <Link to="/" className="nav-cta gm-back-home">← Back to Home</Link>
        ) : (
          <Link to="/" className="brand">
            <img src="/logo.png" alt="Xenosys Solutions" />
          </Link>
        )}
        <nav className="desktop-nav">
          {!isGMMessage && <>
            <Link to="/#services">Services</Link>
            <Link to="/#work">Work</Link>
            <Link to="/#about">About</Link>
            <Link to="/#reviews">Reviews</Link>
          </>}
          <Link className="nav-cta" to="/#contact">Start a project</Link>
        </nav>
      </header>
      {children}
      <footer>
        <div className="wrap footer-row">
          <span>© 2026 Xenosys Solutions</span>
          <div>
            <Link to="/#services">Services</Link>
            <Link to="/#work">Work</Link>
            <Link to="/#about">About</Link>
            <Link to="/#contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReferenceHome />} />
        <Route path="/privacy-policy" element={<ReferenceShell><PrivacyPolicy /></ReferenceShell>} />
        <Route path="/terms" element={<ReferenceShell><Terms /></ReferenceShell>} />
        <Route path="/gm-message" element={<ReferenceShell><GMMessage /></ReferenceShell>} />
        <Route path="*" element={<ReferenceShell><NotFound /></ReferenceShell>} />
      </Routes>
    </BrowserRouter>
  );
}