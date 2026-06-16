import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      fontFamily: "sans-serif",
      backgroundColor: "#f8fafc",
      color: "#0f172a"
    }}>
      <h1 style={{ fontSize: "72px", margin: "0", color: "#ef4444" }}>403</h1>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Oggolaansho Ma Lahid!</h2>
      <p style={{ color: "#64748b", marginBottom: "20px", textAlign: "center", maxWidth: "400px" }}>
        Boggan waxaa u oggolaan oo kaliya maamulayaasha sare (Superadmin) ee LensSuite.
      </p>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500"
        }}
      >
        ← Dib u Noqo
      </button>
    </div>
  );
}