import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* system core config */
const THEME = {
  bgPrimary: "#070B15",
  bgSurface: "#0D1527",
  accentGold: "#F1C40F",
  accentBronze: "#D4AC0D",
  textMain: "#FFFFFF",
  textMuted: "#8A99AD",
  borderGlass: "rgba(255, 255, 255, 0.08)"
};

/* global production style sheet */
const Stylesheet = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cabinet+Grotesk:wght@700;800&display=swap');
    
    /* Engine Resets */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: ${THEME.bgPrimary}; color: ${THEME.textMain}; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    
    /* Layout Foundations */
    .view-boundary { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section-spacing { padding: 100px 0; }
    .tagline-element { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2.5px; color: ${THEME.accentGold}; margin-bottom: 16px; display: block; }
    .heading-element { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(32px, 4.5vw, 48px); font-weight: 800; line-height: 1.15; color: ${THEME.textMain}; letter-spacing: -0.02em; }
    
    /* Native Dynamic Visibility Engine */
    .scroll-target { opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1); }
    .scroll-target.in-view { opacity: 1; transform: translateY(0); }

    /* Button Interfaces */
    .btn-solid { background: ${THEME.textMain}; color: ${THEME.bgPrimary}; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px; padding: 16px 36px; border-radius: 12px; border: none; cursor: pointer; transition: all 0.25s ease; text-align: center; }
    .btn-solid:hover { background: ${THEME.accentGold}; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(241, 196, 15, 0.2); }
    
    .btn-outlined { background: rgba(255, 255, 255, 0.02); color: ${THEME.textMain}; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500; padding: 16px 36px; border-radius: 12px; border: 1px solid ${THEME.borderGlass}; cursor: pointer; transition: all 0.25s ease; backdrop-filter: blur(8px); text-align: center; }
    .btn-outlined:hover { border-color: ${THEME.textMain}; background: rgba(255,255,255,0.05); transform: translateY(-2px); }

    /* Structural Segment Rules */
    .hero-container { min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding: 100px 0 60px 0; }
    .hero-ambient-glow { position: absolute; top: -10%; left: 50%; transform: translateX(-50%); width: 600px; height: 400px; background: radial-gradient(circle, rgba(241, 196, 15, 0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
    .hero-stats-row { display: flex; gap: 64px; justify-content: center; flex-wrap: wrap; border-top: 1px solid ${THEME.borderGlass}; padding-top: 32px; }
    
    .transit-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
    .transit-item-card { position: relative; border-radius: 20px; overflow: hidden; cursor: pointer; height: 450px; border: 1px solid ${THEME.borderGlass}; background: ${THEME.bgSurface}; }
    .transit-item-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1); display: block; filter: brightness(0.8); }
    .transit-item-card:hover img { transform: scale(1.04); filter: brightness(0.9); }
    
    .workflow-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 64px; }
    .workflow-node { background: rgba(255,255,255,0.01); border: 1px solid ${THEME.borderGlass}; border-radius: 20px; padding: 40px 32px; }

    .feedback-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 64px; }
    .feedback-bubble { background: rgba(255,255,255,0.02); border: 1px solid ${THEME.borderGlass}; border-radius: 20px; padding: 36px; backdrop-filter: blur(10px); }

    .conversion-banner { background: linear-gradient(135deg, rgba(255,255,255,0.01), rgba(241, 196, 15, 0.02)); border: 1px solid ${THEME.borderGlass}; border-radius: 28px; padding: 80px 48px; text-align: center; position: relative; overflow: hidden; }
    .footer-structure { background: #04070E; border-top: 1px solid ${THEME.borderGlass}; padding: 80px 0 48px; }
    .footer-column-group { display: grid; grid-template-columns: 2.5fr 1fr 1fr 1.5fr; gap: 48px; margin-bottom: 64px; }
    
    .anchor-clean { color: ${THEME.textMuted}; text-decoration: none; font-size: 14px; transition: color 0.2s ease; cursor: pointer; }
    .anchor-clean:hover { color: ${THEME.textMain}; }
    
    .social-profile-icon { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 12px; border: 1px solid ${THEME.borderGlass}; background: rgba(255,255,255,0.02); color: ${THEME.textMuted}; text-decoration: none; transition: all 0.2s ease; }
    .social-profile-icon svg { width: 18px; height: 18px; fill: currentColor; transition: fill 0.2s ease; }
    .social-profile-icon:hover { border-color: ${THEME.textMain}; color: ${THEME.textMain}; background: rgba(255,255,255,0.05); transform: translateY(-2px); }

    /* ─── PRODUCTION RESPONSIVE ADAPTATION ─── */
    @media (max-width: 968px) {
      .section-spacing { padding: 80px 0; }
      
      .transit-grid, .workflow-grid, .feedback-grid { 
        grid-template-columns: 1fr !important; 
        gap: 24px !important;
        margin-top: 40px !important;
      }
      
      .transit-item-card { 
        height: auto !important; 
        aspect-ratio: 4 / 3 !important; 
      }
      
      .hero-stats-row {
        flex-direction: column !important;
        gap: 24px !important;
        align-items: center !important;
      }
      
      .footer-column-group { 
        grid-template-columns: 1fr !important; 
        gap: 40px !important; 
        margin-bottom: 48px !important;
      }
      
      .footer-brand-summary { 
        grid-column: span 1 !important; 
      }
      
      .conversion-banner { 
        padding: 56px 24px !important; 
      }
    }

    @media (max-width: 580px) {
      .transit-item-card { 
        aspect-ratio: 1.1 / 1 !important; 
      }
      .btn-solid, .btn-outlined {
        width: 100% !important;
      }
      .heading-element {
        text-align: left !important;
      }
      .hero-container p {
        text-align: left !important;
      }
    }
  `}</style>
);

/*hero*/
const Hero = () => {
  const navigate = useNavigate();

  return (
    <header className="hero-container view-boundary">
      <div className="hero-ambient-glow" />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 860 }}>
        <span className="tagline-element">
          Unified Transit Ecosystem
        </span>
        <h1 className="heading-element" style={{ fontSize: "clamp(38px, 8.5vw, 76px)", letterSpacing: "-0.03em", marginBottom: 24 }}>
          Travel Smarter.<br />Move Freely.
        </h1>
        <p style={{ fontSize: "16px", color: THEME.textMuted, lineHeight: 1.65, maxWidth: 540, margin: "0 auto 44px" }}>
          Book high-speed rail, regional coaches, and flights directly within a single unified engine. No redirects. No fragmented checkouts.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          <button className="btn-solid" onClick={() => navigate("/search")}>Start Exploring</button>
          <button className="btn-outlined" onClick={() => navigate("/login")}>Create Free Account</button>
        </div>
        
        <div className="hero-stats-row">
          <div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 32, fontWeight: 700 }}>2M+</div>
            <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4, textTransform: "uppercase", letterSpacing: "1.5px" }}>Active Users</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 32, fontWeight: 700 }}>500+</div>
            <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4, textTransform: "uppercase", letterSpacing: "1.5px" }}>Daily Routes</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 32, fontWeight: 700 }}>98%</div>
            <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4, textTransform: "uppercase", letterSpacing: "1.5px" }}>On-Time Log</div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* model sections */
const TravelCards = () => {
  const navigate = useNavigate();

  return (
    <section className="view-boundary section-spacing" style={{ paddingTop: 40 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 16 }}>
        <div>
          <span className="tagline-element">Transit Hub</span>
          <h2 className="heading-element">Choose Your Mode</h2>
        </div>
        <span className="anchor-clean" style={{ color: THEME.accentGold, fontWeight: 500, borderBottom: `1px solid ${THEME.accentGold}`, paddingBottom: 2 }} onClick={() => navigate("/search")}>
          View All Active Sectors →
        </span>
      </div>

      <div className="transit-grid scroll-target in-view">
        <div className="transit-item-card" onClick={() => navigate("/search?type=train")}>
          <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=700&q=80" alt="Rail" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #070B15 0%, rgba(7,11,21,0.3) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: THEME.accentGold, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 8 }}>Sovereign Rail</span>
            <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Rail Journeys</h3>
            <p style={{ fontSize: 13, color: THEME.textMuted, marginTop: 4 }}>Scenic transcontinental routes.</p>
          </div>
        </div>

        <div className="transit-item-card" onClick={() => navigate("/search?type=bus")}>
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80" alt="Bus" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #070B15 0%, rgba(7,11,21,0.3) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: THEME.accentGold, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 8 }}>City-Link Link</span>
            <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Bus Routes</h3>
            <p style={{ fontSize: 13, color: THEME.textMuted, marginTop: 4 }}>Affordable regional transits.</p>
          </div>
        </div>

        <div className="transit-item-card" onClick={() => navigate("/search?type=flight")}>
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80" alt="Flight" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #070B15 0%, rgba(7,11,21,0.3) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: THEME.accentGold, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 8 }}>Air Transport</span>
            <h3 style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 22, fontWeight: 700 }}>Flights</h3>
            <p style={{ fontSize: 13, color: THEME.textMuted, marginTop: 4 }}>Fastest long-distance arrivals.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* system action flow */
const HowItWorks = () => (
  <section style={{ background: "rgba(255,255,255,0.01)", borderTop: `1px solid ${THEME.borderGlass}`, borderBottom: `1px solid ${THEME.borderGlass}` }}>
    <div className="view-boundary section-spacing">
      <span className="tagline-element">Core Engine Architecture</span>
      <h2 className="heading-element">How OnePass Operates</h2>
      
      <div className="workflow-grid scroll-target in-view">
        <div className="workflow-node">
          <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textMuted, marginBottom: 16 }}>01 / RUN TIME SEARCH</div>
          <div style={{ fontSize: 28, marginBottom: 16 }}>🔍</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Find Your Optimal Route</h3>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6 }}>Input origin and target hubs. Our router maps connection options instantly across rail, roads, and air networks.</p>
        </div>

        <div className="workflow-node">
          <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textMuted, marginBottom: 16 }}>02 / MATRIX EVALUATION</div>
          <div style={{ fontSize: 28, marginBottom: 16 }}>⚖️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Compare and Select</h3>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6 }}>Sort systematically by pricing velocity, transit hours, or tier comfort metrics. Everything renders in a master window.</p>
        </div>

        <div className="workflow-node">
          <div style={{ fontSize: 13, fontWeight: 600, color: THEME.textMuted, marginBottom: 16 }}>03 / LEDGER CHECKOUT</div>
          <div style={{ fontSize: 28, marginBottom: 16 }}>🎟️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Secure Direct Ticketing</h3>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6 }}>Finalize reservations instantly. Universal mobile tokens settle instantly onto your internal profile system.</p>
        </div>
      </div>
    </div>
  </section>
);

/* reviews */
const Reviews = () => (
  <section className="view-boundary section-spacing">
    <div style={{ marginBottom: 12 }}>
      <span className="tagline-element">Network Telemetry</span>
      <h2 className="heading-element">What Travellers Say</h2>
    </div>
    
    <div className="feedback-grid scroll-target in-view">
      <div className="feedback-bubble">
        <div style={{ color: THEME.accentGold, marginBottom: 16, fontSize: 12 }}>★★★★★</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: THEME.textMain, opacity: 0.95, marginBottom: 24 }}>
          "The routing logic worked beautifully. Sifting pricing options across disparate travel layers happens seamlessly inside a singular interface window."
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>RS</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: THEME.textMuted }}>Mumbai, India</div>
          </div>
        </div>
      </div>

      <div className="feedback-bubble">
        <div style={{ color: THEME.accentGold, marginBottom: 16, fontSize: 12 }}>★★★★★</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: THEME.textMain, opacity: 0.95, marginBottom: 24 }}>
          "This fundamentally cuts overhead friction when managing multi-city itineraries. Renders quickly without mobile interface performance drop-offs."
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>AR</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Ananya Roy</div>
            <div style={{ fontSize: 12, color: THEME.textMuted }}>Kolkata, India</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* call to action strip */
const CtaStrip = () => {
  const navigate = useNavigate();

  return (
    <section className="view-boundary" style={{ paddingBottom: 100 }}>
      <div className="conversion-banner scroll-target in-view">
        <h2 className="heading-element" style={{ fontSize: "clamp(26px, 4vw, 42px)", marginBottom: 16 }}>Ready For Your Next Journey?</h2>
        <p style={{ fontSize: 16, color: THEME.textMuted, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          Deploy unified, multi-modal schedules alongside thousands of monthly transit passengers.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-solid" onClick={() => navigate("/login")}>Create Free Account</button>
          <button className="btn-outlined" onClick={() => navigate("/search")}>Browse Routes</button>
        </div>
      </div>
    </section>
  );
};

/* footer */
const Footer = () => {
  return (
    <footer className="footer-structure">
      <div className="view-boundary">
        <div className="footer-column-group">
          <div className="footer-brand-summary">
            <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 24, fontWeight: 800 }}>OnePass</div>
            <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6, marginTop: 12, maxWidth: 260 }}>
              Seamless high-speed multi-modal logistics routing engine.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>Explore</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              <li><span className="anchor-clean">Search Routes</span></li>
              <li><span className="anchor-clean">My Trips</span></li>
              <li><span className="anchor-clean">Bookings</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>Services</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              <li><span className="anchor-clean">Trains Network</span></li>
              <li><span className="anchor-clean">Bus Matrix</span></li>
              <li><span className="anchor-clean">Flight Sectors</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>Connect With Me</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <a href="https://x.com/Mon340Basudev" target="_blank" rel="noopener noreferrer" className="social-profile-icon" title="Twitter / X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/basudev-mondal-a9a7282b3/" target="_blank" rel="noopener noreferrer" className="social-profile-icon" title="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://github.com/basu-ship" target="_blank" rel="noopener noreferrer" className="social-profile-icon" title="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://www.instagram.com/rockbasu89/" target="_blank" rel="noopener noreferrer" className="social-profile-icon" title="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: `1px solid ${THEME.borderGlass}`, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: THEME.textMuted }}>&copy; {new Date().getFullYear()} Copyright OnePass Platform. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

/* system action flow */
const Landing = () => {
  useEffect(() => {
    const trackingTargets = document.querySelectorAll(".scroll-target");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, { threshold: 0.05 });
    
    trackingTargets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Stylesheet />
      <div>
        <Hero />
        <TravelCards />
        <HowItWorks />
        <Reviews />
        <CtaStrip />
        <Footer />
      </div>
    </>
  );
};

export default Landing;