import { Link } from "react-router-dom";

export default function GMMessage() {
  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Hero */}
      <section
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-32"
      >
        <Link
          to="/"
          style={{
            color: "#888",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "60px",
          }}
        >
          ← Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
          <div>
            <p
              style={{
                color: "#666",
                letterSpacing: "3px",
                fontSize: "12px",
                marginBottom: "20px",
              }}
            >
              MESSAGE FROM THE GENERAL MANAGER
            </p>

            <h1
              style={{
                fontSize: "clamp(3rem,7vw,5rem)",
                lineHeight: 1,
                marginBottom: "30px",
                fontWeight: 900,
              }}
            >
              Leadership Through
              <br />
              Experience &
              <br />
              Innovation
            </h1>

            <p
              style={{
                color: "#999",
                fontSize: "clamp(16px,2vw,20px)",
                lineHeight: 1.8,
                maxWidth: "100%",
              }}
            >
              Building long-term partnerships through trust, quality, and
              innovative digital solutions.
            </p>
          </div>

          <div
            className="bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 text-center"
          >
            <img
  src="/gm.jpg"
  alt="Mohammed Fazlur Rahman"
  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 mx-auto rounded-full object-cover border-2 border-white/20 shadow-2xl"
/>

            <h2 style={{ marginBottom: 8 }}>
              Mohammed Fazlur Rahman
            </h2>

            <p style={{ color: "#888", marginBottom: 20 }}>
              General Manager
            </p>

            <p style={{ color: "#666" }}>
              MSc (Wales, UK)
              <br />
              MBA (Coventry, UK)
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24"
      >
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ["30+", "Years Experience"],
            ["6", "Countries"],
            ["4", "Languages"],
            ["100%", "Client Focus"],
          ].map(([num, text]) => (
            <div
              key={text}
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "20px",
                padding: "clamp(20px,3vw,35px)",
                textAlign: "center",
              }}
            >
              <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>{num}</h2>
              <p style={{ color: "#888" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profile */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >
        <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", marginBottom: "40px" }}>
          Meet Our General Manager
        </h2>

        <p style={{ color: "#aaa", lineHeight: 1.9 }}>
          Mohammed Fazlur Rahman is an accomplished industry professional with
          over 30 years of experience across Qatar, the United Kingdom, Oman,
          the UAE, Saudi Arabia, and India. Holding an MSc from Wales (UK) and
          an MBA from Coventry (UK), he has built a distinguished career in
          business leadership, strategic planning, customer acquisition,
          operations management, and organizational development.
        </p>

        <p
          style={{
            color: "#aaa",
            lineHeight: 1.9,
            marginTop: "25px",
          }}
        >
          Fluent in English, Arabic, Urdu, and Hindi, he is passionate about
          mentoring teams, fostering innovation, and delivering exceptional
          customer experiences. His leadership is built on integrity,
          collaboration, and a commitment to long-term business success.
        </p>
      </section>

      {/* Message */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "24px",
            padding: "clamp(24px,5vw,50px)",
          }}
        >
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", marginBottom: "35px" }}>
            A Message to Our Clients
          </h2>

          <p style={{ color: "#aaa", lineHeight: 2 }}>
            Dear Valued Clients and Partners,
            <br />
            <br />
            Welcome to XenoSolutions.
            <br />
            <br />
            Technology continues to transform businesses at an unprecedented
            pace, and our mission is to help organizations embrace this
            transformation with confidence. At XenoSolutions, we are committed
            to delivering reliable, innovative, and scalable digital solutions
            that create measurable business value.
            <br />
            <br />
            Throughout my professional journey across multiple countries and
            industries, I have learned that lasting success is built on trust,
            quality, and meaningful partnerships. These principles continue to
            guide every project we undertake.
            <br />
            <br />
            Whether you are a startup or an established enterprise, our team is
            dedicated to helping you achieve your digital ambitions with
            professionalism, integrity, and technical excellence.
            <br />
            <br />
            Thank you for your trust in XenoSolutions. We look forward to
            building the future together.
          </p>

          <div style={{ marginTop: "50px" }}>
            <strong style={{ fontSize: "22px" }}>
              Mohammed Fazlur Rahman
            </strong>

            <p style={{ color: "#888", marginTop: "10px" }}>
              General Manager
              <br />
              XenoSolutions
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            marginBottom: "50px",
          }}
        >
          Leadership Philosophy
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {[
            ["Integrity", "Building trust through honesty and transparency."],
            ["Innovation", "Leveraging technology to solve business challenges."],
            ["Excellence", "Delivering quality without compromise."],
            ["Customer Success", "Your success is our greatest achievement."],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "20px",
                padding: "30px",
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>{title}</h3>
              <p style={{ color: "#888", lineHeight: 1.8 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) clamp(16px,4vw,40px)",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", marginBottom: "20px" }}>
          Let's Build the Future Together
        </h2>

        <p
          style={{
            color: "#888",
            maxWidth: "700px",
            margin: "0 auto 40px",
            lineHeight: 1.8,
          }}
        >
          We look forward to partnering with organizations that value
          innovation, quality, and long-term success.
        </p>

        <Link
          to="/#contact"
          style={{
            display: "inline-block",
            padding: "16px 40px",
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            borderRadius: "999px",
            fontWeight: 700,
          }}
        >
          Start Your Project
        </Link>
      </section>
    </main>
  );
}