import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "10rem",
            fontWeight: 900,
            margin: 0,
            color: "transparent",
            WebkitTextStroke: "2px white",
          }}
        >
          404
        </h1>

        <h2 style={{ marginTop: 20 }}>
          This page doesn't exist.
        </h2>

        <p
          style={{
            color: "#888",
            maxWidth: "500px",
            margin: "20px auto 40px",
          }}
        >
          The page you're looking for may have been moved, renamed,
          or never existed.
        </p>

        <Link
          to="/"
          style={{
            color: "#000",
            background: "#fff",
            padding: "14px 32px",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}