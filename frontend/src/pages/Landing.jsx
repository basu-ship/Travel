import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─── */
const C = {
  navy: "#0B1120",
  navy2: "#131D2E",
  gold: "#E8A838",
  gold2: "#F5C46A",
  goldDark: "#D4872A",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.55)",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.12)",
};

/* ─── GOOGLE FONTS INJECT ─── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: ${C.navy}; color: ${C.white}; overflow-x: hidden; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-28px) scale(1.05); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(1.6); }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
    .reveal.active { opacity: 1; transform: translateY(0); }

    .travel-card { position: relative; border-radius: 24px; overflow: hidden; cursor: pointer; }
    .travel-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s ease; display: block; }
    .travel-card:hover img { transform: scale(1.08); }
    .card-arrow { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center;
      font-size: 15px; transition: background .25s, transform .25s; }
    .travel-card:hover .card-arrow { background: ${C.gold}; transform: translate(2px,-2px); }

    .review-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px; padding: 28px; transition: border-color .3s, transform .3s; }
    .review-card:hover { border-color: rgba(232,168,56,0.35); transform: translateY(-5px); }

    .btn-primary { background: linear-gradient(135deg,${C.gold},${C.goldDark}); color: ${C.navy};
      font-family: 'DM Sans',sans-serif; font-weight: 700; font-size: 16px; padding: 15px 34px;
      border-radius: 50px; border: none; cursor: pointer; transition: transform .2s, box-shadow .2s; }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(232,168,56,0.4); }

    .btn-ghost { background: transparent; color: ${C.white}; font-family: 'DM Sans',sans-serif;
      font-size: 16px; font-weight: 500; padding: 15px 34px; border-radius: 50px;
      border: 1px solid rgba(255,255,255,0.25); cursor: pointer; transition: border-color .2s, color .2s; }
    .btn-ghost:hover { border-color: ${C.gold}; color: ${C.gold}; }

    .nav-link { color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 500;
      text-decoration: none; background: none; border: none; cursor: pointer;
      transition: color .2s; font-family: 'DM Sans',sans-serif; }
    .nav-link:hover { color: ${C.gold}; }

    .footer-li { font-size: 14px; color: rgba(255,255,255,0.45); cursor: pointer;
      transition: color .2s; list-style: none; }
    .footer-li:hover { color: ${C.white}; }

    .social-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center; font-size: 14px;
      cursor: pointer; transition: border-color .2s, background .2s; }
    .social-btn:hover { border-color: ${C.gold}; background: rgba(232,168,56,0.1); }

    @media (max-width: 768px) {
      .cards-grid { grid-template-columns: 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
      .reviews-grid { grid-template-columns: 1fr !important; }
      .footer-top { grid-template-columns: 1fr 1fr !important; }
      .footer-brand { grid-column: span 2; }
      .hero-stats { gap: 24px !important; }
      .nav-desktop { display: none !important; }
      .cta-box { padding: 40px 24px !important; }
    }
  `}</style>
);

/* ─── NAVBAR ─── */
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={{
      position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
      zIndex: 100, width: "90%", maxWidth: 1100,
      background: "rgba(11,17,32,0.75)", backdropFilter: "blur(20px)",
      border: `1px solid ${C.glassBorder}`, borderRadius: 60,
      padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: C.gold, letterSpacing: 1 }}>
        OnePass
      </span>

      <div className="nav-desktop" style={{ display: "flex", gap: 32 }}>
        <button className="nav-link" onClick={() => navigate("/")}>Home</button>
        <button className="nav-link" onClick={() => navigate("/search")}>Search</button>
        <button className="nav-link" onClick={() => navigate("/trips")}>My Trips</button>
      </div>

      <button
        className="btn-primary"
        style={{ fontSize: 14, padding: "10px 24px" }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </nav>
  );
};

/* ─── HERO ─── */
const Hero = () => {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,168,56,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 50%, rgba(24,95,165,0.15) 0%, transparent 50%),
          ${C.navy}`,
        zIndex: 0,
      }} />

      {/* Orbs */}
      {[
        { size: 480, color: C.gold, top: -100, right: -100, delay: "0s" },
        { size: 380, color: "#185FA5", bottom: -60, left: -80, delay: "3s" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute", width: orb.size, height: orb.size, borderRadius: "50%",
          background: `radial-gradient(${orb.color}, transparent)`,
          filter: "blur(80px)", opacity: 0.22,
          top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left,
          animation: `float 8s ${orb.delay} ease-in-out infinite`,
        }} />
      ))}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(232,168,56,0.1)", border: "1px solid rgba(232,168,56,0.28)",
          borderRadius: 50, padding: "8px 20px", marginBottom: 32,
          fontSize: 13, color: C.gold, fontWeight: 500,
          animation: "fadeUp .8s ease both",
        }}>
          <span style={{ width: 6, height: 6, background: C.gold, borderRadius: "50%", animation: "pulse 2s infinite" }} />
          Your all-in-one travel platform
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(48px, 8vw, 88px)", lineHeight: 1.05,
          marginBottom: 24, animation: "fadeUp .9s .1s ease both",
        }}>
          Travel <em style={{ fontStyle: "italic", color: C.gold }}>Smarter,</em>
          <br />Move Freely.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 18, color: "rgba(255,255,255,0.62)", lineHeight: 1.75,
          maxWidth: 520, margin: "0 auto 48px", fontWeight: 300,
          animation: "fadeUp 1s .2s ease both",
        }}>
          Book trains, buses & flights in one seamless experience.
          Find the best routes, compare prices, and journey with confidence.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeUp 1s .35s ease both",
        }}>
          <button className="btn-primary" onClick={() => navigate("/search")}>Start Exploring</button>
          <button className="btn-ghost" onClick={() => navigate("/login")}>Create Free Account</button>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{
          display: "flex", gap: 56, justifyContent: "center", marginTop: 72,
          animation: "fadeUp 1s .5s ease both",
        }}>
          {[
            { num: "2M+", label: "Happy Travellers" },
            { num: "500+", label: "Routes Daily" },
            { num: "98%", label: "On-Time Rate" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 38, color: C.gold, fontWeight: 900 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4, textTransform: "uppercase", letterSpacing: "1.2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── TRAVEL CARDS ─── */
const travelOptions = [
  { type: "train", label: "Rail Journeys", sub: "Scenic routes across India", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&q=80" },
  { type: "bus",   label: "Bus Routes",   sub: "Affordable city-to-city travel", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80" },
  { type: "flight",label: "Flights",      sub: "Fastest way to your destination", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80" },
];

const TravelCards = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const onScroll = () => els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add("active");
    });
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: C.gold, marginBottom: 8 }}>
            Where Do You Want To Go?
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,46px)", color: C.white }}>
            Choose Your Mode
          </h2>
        </div>
        <span style={{ fontSize: 14, color: C.gold, cursor: "pointer", borderBottom: "1px solid rgba(232,168,56,0.4)", paddingBottom: 2 }}>
          View All Routes →
        </span>
      </div>

      {/* Grid */}
      <div className="cards-grid reveal active" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {travelOptions.map((item) => (
          <div
            key={item.type}
            className="travel-card"
            style={{ height: 440 }}
            onClick={() => navigate(`/search?type=${item.type}`)}
          >
            <img src={item.image} alt={item.label} />
            {/* Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
            }} />
            <div className="card-arrow">→</div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
              <div style={{
                display: "inline-block", background: "rgba(232,168,56,0.18)",
                border: "1px solid rgba(232,168,56,0.38)", borderRadius: 50,
                padding: "4px 14px", fontSize: 11, fontWeight: 600,
                color: C.gold, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10,
              }}>
                {item.type}
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: C.white }}>{item.label}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", marginTop: 4 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── HOW IT WORKS ─── */
const steps = [
  { num: "01", icon: "🔍", title: "Search Your Route", desc: "Enter your origin and destination. We scan hundreds of options across trains, buses and flights instantly." },
  { num: "02", icon: "⚖️", title: "Compare & Choose",  desc: "Filter by price, duration, or comfort. All your options in one clean view — no tab-switching." },
  { num: "03", icon: "🎟️", title: "Book in Seconds",   desc: "Secure your seat with one tap. Your ticket goes straight to the app — ready when you are." },
];

const HowItWorks = () => (
  <div style={{
    background: "rgba(255,255,255,0.02)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "80px 24px",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: C.gold, marginBottom: 8 }}>
        Simple & Fast
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,46px)", color: C.white }}>
        How OnePass Works
      </h2>
      <div className="steps-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40, marginTop: 48 }}>
        {steps.map((s) => (
          <div key={s.num} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 64, fontWeight: 900, color: "rgba(232,168,56,0.14)", lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: C.white }}>{s.title}</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── REVIEWS ─── */
const reviews = [
  { name: "Rahul Sharma", loc: "Mumbai", initials: "RS", text: "The booking experience was incredibly smooth. I compared options easily and found the best deal — all without leaving the app." },
  { name: "Ananya Roy",   loc: "Kolkata", initials: "AR", text: "This platform saved me so much time. The interface is clean and modern, and it works seamlessly even on mobile." },
  { name: "Arjun Das",    loc: "Delhi",   initials: "AD", text: "From searching to booking, everything feels fast and well designed. I love how intuitive the entire process is." },
  { name: "Sneha Gupta",  loc: "Bangalore", initials: "SG", text: "Beautiful UI and top-notch performance. The results were accurate every time and I never experienced any lag." },
];

const Reviews = () => (
  <div style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: C.gold, marginBottom: 8 }}>
      Trusted By Millions
    </div>
    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(30px,5vw,46px)", color: C.white, marginBottom: 48 }}>
      What Travellers Say
    </h2>
    <div className="reviews-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
      {reviews.map((r) => (
        <div key={r.name} className="review-card">
          <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: C.gold, fontSize: 14 }}>★</span>)}
          </div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 22 }}>
            "{r.text}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg,${C.gold},${C.goldDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: C.navy, flexShrink: 0,
            }}>{r.initials}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.white }}>{r.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>{r.loc}, India</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── CTA STRIP ─── */
const CtaStrip = () => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
      <div className="cta-box reveal" style={{
        background: "linear-gradient(135deg,rgba(232,168,56,0.13),rgba(24,95,165,0.13))",
        border: "1px solid rgba(232,168,56,0.2)",
        borderRadius: 28, padding: "64px 48px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center top, rgba(232,168,56,0.07), transparent 60%)",
          pointerEvents: "none",
        }} />
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(28px,5vw,48px)", color: C.white, marginBottom: 16, position: "relative",
        }}>
          Ready For Your Next Adventure?
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.58)", marginBottom: 40, position: "relative" }}>
          Join over 2 million travellers who book smarter with OnePass.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <button className="btn-primary" onClick={() => navigate("/login")}>Create Free Account</button>
          <button className="btn-ghost" onClick={() => navigate("/search")}>Browse Routes</button>
        </div>
      </div>
    </div>
  );
};

/* ─── FOOTER ─── */
const Footer = () => (
  <footer style={{
    background: "rgba(0,0,0,0.45)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 24px 40px",
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div className="footer-top" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        <div className="footer-brand">
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: C.gold }}>OnePass</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, marginTop: 12, maxWidth: 220 }}>
            Your smart travel companion — trains, buses & flights in one seamless platform.
          </p>
        </div>
        {[
          { title: "Explore",   links: ["Search Routes", "My Trips", "Bookings", "Offers"] },
          { title: "Services",  links: ["Trains", "Buses", "Flights"] },
          { title: "Company",   links: ["About", "Contact", "Blog", "Help Center"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", color: C.gold, marginBottom: 16 }}>{col.title}</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              {col.links.map((l) => <li key={l} className="footer-li">{l}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: 32 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)" }}>© {new Date().getFullYear()} OnePass. All rights reserved.</p>
        <div style={{ display: "flex", gap: 12 }}>
          {["🌐", "📘", "🐦", "📸"].map((icon, i) => (
            <div key={i} className="social-btn">{icon}</div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

/* ─── MAIN ─── */
const Landing = () => (
  <>
    <FontLoader />
    <div style={{ minHeight: "100vh", background: C.navy }}>
      <Navbar />
      <Hero />
      <TravelCards />
      <HowItWorks />
      <Reviews />
      <CtaStrip />
      <Footer />
    </div>
  </>
);

export default Landing;