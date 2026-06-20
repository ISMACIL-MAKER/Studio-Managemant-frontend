import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  resetPasswordThunk,
  clearPasswordStates,
} from "../features/passwordSlice";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // Ka soo dhex bixi states-ka Redux Store (password reducer)
  const { loading, error, successMessage } = useSelector(
    (state) => state.password,
  );

  useEffect(() => {
    dispatch(clearPasswordStates());
  }, [dispatch]);

  // Haddii uu si guul leh u beddelmo, 3 ilbiriqsi ka dib u weeci Login-ka
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      return setLocalError("Labada Password isma laha!");
    }

    dispatch(resetPasswordThunk({ token, password }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📸 LensSuite</h2>
        <h3 style={styles.subTitle}>Abuur Password Cusub</h3>
        <p style={styles.text}>Fadlan qor password-kaaga cusub hoos.</p>

        {successMessage && (
          <div style={styles.successAlert}>
            ✅ {successMessage} - Waxaa loo weecinayaa Login...
          </div>
        )}
        {(error || localError) && (
          <div style={styles.errorAlert}>❌ {error || localError}</div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
            placeholder="Password-ka Cusub"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Ku celi Password-ka"
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Waa la beddelayaa..." : "Update Password"}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>
            Ku noqo Login
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: { margin: "0 0 10px 0", color: "#333", fontSize: "24px" },
  subTitle: { margin: "0 0 10px 0", color: "#555", fontSize: "18px" },
  text: { color: "#777", fontSize: "14px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cccccc",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  successAlert: {
    padding: "10px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  errorAlert: {
    padding: "10px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  footer: { marginTop: "20px" },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
};
