import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
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

        <p
          style={{
            color: "#666",
            letterSpacing: "3px",
            fontSize: "12px",
            marginBottom: "12px",
          }}
        >
          LEGAL
        </p>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 900,
            marginBottom: "40px",
          }}
        >
          Privacy Policy
        </h1>

        <div style={{ color: "#b3b3b3", lineHeight: 1.9, fontSize: "16px" }}>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>Information We Collect</h2>
          <p>
            We collect information that you voluntarily provide through our contact form,
            including your name, email address, company name, and project details.
          </p>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>How We Use Your Information</h2>
          <p>
            Your information is used solely to respond to inquiries, provide quotations,
            deliver requested services, and improve our customer experience.
          </p>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>Third-Party Services</h2>
          <p>
            Our website may use trusted third-party providers such as EmailJS for contact
            form delivery and hosting providers to operate our website securely.
          </p>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information
            against unauthorized access, alteration, or disclosure.
          </p>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal information
            by contacting us directly.
          </p>

          <h2 style={{ color: "#fff", marginTop: "40px" }}>Contact</h2>
          <p>
            For any privacy-related questions, please contact XenoSolutions through our
            Contact page.
          </p>

          <p
            style={{
              marginTop: "60px",
              color: "#666",
            }}
          >
            Last Updated: August 2026
          </p>

        </div>
      </div>
    </div>
  );
}