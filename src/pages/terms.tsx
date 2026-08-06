import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#666",
            textDecoration: "none",
            marginBottom: "24px",
            fontSize: "14px",
          }}
        >
          <span>← Back to Home</span>
        </Link>

        <p style={{ color: "#666", letterSpacing: "3px", fontSize: "12px" }}>
          LEGAL
        </p>

        <h1 style={{ fontSize: "64px", fontWeight: 900, margin: "20px 0 40px" }}>
          Terms & Conditions
        </h1>

        <div style={{ color: "#b3b3b3", lineHeight: 1.9 }}>

          <h2 style={{ color: "#fff" }}>Acceptance of Terms</h2>
          <p>
            By accessing this website, you agree to comply with these Terms &
            Conditions and all applicable laws.
          </p>

          <h2 style={{ color: "#fff", marginTop: 40 }}>Services</h2>
          <p>
            XenoSolutions provides website development, hosting, debugging,
            consulting, and related digital services.
          </p>

          <h2 style={{ color: "#fff", marginTop: 40 }}>Intellectual Property</h2>
          <p>
            All content, branding, graphics, and source code on this website
            remain the property of XenoSolutions unless otherwise stated.
          </p>

          <h2 style={{ color: "#fff", marginTop: 40 }}>Project Payments</h2>
          <p>
            Client projects may require milestone-based payments. Final project
            delivery occurs after agreed payments are completed.
          </p>

          <h2 style={{ color: "#fff", marginTop: 40 }}>Limitation of Liability</h2>
          <p>
            XenoSolutions shall not be liable for indirect or consequential
            damages arising from the use of this website or our services.
          </p>

          <h2 style={{ color: "#fff", marginTop: 40 }}>Contact</h2>
          <p>
            Questions regarding these terms may be submitted through our Contact
            page.
          </p>

          <p style={{ marginTop: 60, color: "#666" }}>
            Last Updated: August 2026
          </p>

        </div>
      </div>
    </div>
  );
}