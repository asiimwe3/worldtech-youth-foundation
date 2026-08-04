import { useEffect, useState } from "react";

export function DeryCodeAd() {
  const [showTop, setShowTop] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    // Show top banner after 2s
    const t1 = setTimeout(() => setShowTop(true), 2000);
    // Auto-hide after 15s, show floating
    const t2 = setTimeout(() => {
      setShowTop(false);
      setShowFloat(true);
    }, 17000);
    // Re-show top banner every 60s
    const interval = setInterval(() => {
      setShowTop(true);
      setTimeout(() => setShowTop(false), 8000);
    }, 60000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Top Banner Ad */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99998,
          background: "linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0d1b0d 100%)",
          borderBottom: "1px solid rgba(212,160,23,0.3)",
          padding: 0,
          overflow: "hidden",
          transition: "transform 0.4s ease",
          transform: showTop ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
            <img
              src="https://derycode.publicvm.com/logo.webp"
              alt="DeryCode"
              style={{ width: 32, height: 32, borderRadius: 6, flexShrink: 0 }}
              loading="lazy"
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "system-ui,sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
                <span style={{ color: "#D4A017" }}>Dery</span>
                <span style={{ color: "#00FF9D" }}>Code</span>
                <span style={{ color: "#555", margin: "0 6px" }}>·</span>
                <span style={{ color: "#aaa", fontSize: 12, fontWeight: 500 }}>Uganda's #1 Tech Company</span>
              </div>
              <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 11, color: "#777", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Software · Blockchain · AI · Web3 · Mobile Apps · Banking Systems
              </div>
            </div>
          </div>
          <a
            href="https://derycode.publicvm.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink: 0,
              fontFamily: "system-ui,sans-serif",
              background: "linear-gradient(135deg,#D4A017,#00FF9D)",
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 18px",
              borderRadius: 20,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Get a Quote →
          </a>
          <button
            onClick={() => { setShowTop(false); setShowFloat(true); }}
            style={{
              flexShrink: 0,
              background: "none",
              border: "none",
              color: "#555",
              fontSize: 20,
              cursor: "pointer",
              padding: "0 4px",
              lineHeight: 1,
            }}
            title="Close ad"
          >
            ×
          </button>
        </div>
        <div
          style={{
            height: 2,
            background: "linear-gradient(90deg,transparent,#D4A017,transparent)",
            animation: "derycode-shimmer 3s linear infinite",
          }}
        />
      </div>

      {/* Floating Side Ad */}
      {showFloat && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 99997,
            animation: "derycode-float-in 0.5s ease",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#0a0a0a,#1a1a2e)",
              border: "1px solid rgba(212,160,23,0.4)",
              borderRadius: 16,
              padding: 16,
              maxWidth: 260,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                  src="https://derycode.publicvm.com/logo.webp"
                  alt="DeryCode"
                  style={{ width: 24, height: 24, borderRadius: 4 }}
                  loading="lazy"
                />
                <span style={{ fontFamily: "system-ui,sans-serif", fontWeight: 800, fontSize: 14 }}>
                  <span style={{ color: "#D4A017" }}>Dery</span>
                  <span style={{ color: "#00FF9D" }}>Code</span>
                </span>
              </div>
              <button
                onClick={() => setShowFloat(false)}
                style={{ background: "none", border: "none", color: "#444", fontSize: 16, cursor: "pointer", padding: 0, lineHeight: 1 }}
                title="Close"
              >
                ×
              </button>
            </div>
            <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 12, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
              Need software, blockchain, or AI solutions? Uganda's leading tech company is ready to build for you.
            </div>
            <a
              href="https://derycode.publicvm.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "system-ui,sans-serif",
                background: "linear-gradient(135deg,#D4A017,#00FF9D)",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: 13,
                padding: 8,
                borderRadius: 20,
                textDecoration: "none",
              }}
            >
              Visit DeryCode →
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes derycode-shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes derycode-float-in{0%{transform:translateX(100%);opacity:0}100%{transform:translateX(0);opacity:1}}
      `}</style>
    </>
  );
}
