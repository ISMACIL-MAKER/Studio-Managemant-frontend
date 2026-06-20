import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// 🌟 1. Soo iimport-garee Thunk-ka cusub iyo clearState-ka gaarka u ah passwordSlice
import { forgotPasswordThunk, clearPasswordStates } from "../features/passwordSlice";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // 🌟 2. Ka soo dhex bixi states-ka Redux Store (password reducer)
  const { loading, error, successMessage } = useSelector((state) => state.password);

  // 🌟 3. Nadiifi states-ka hore (error iyo success) marka bogga la soo galo ama laga tago
  useEffect(() => {
    dispatch(clearPasswordStates());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🌟 4. U yeer Thunk-ka saxda ah adoo u dhiibaya email-ka
    dispatch(forgotPasswordThunk({ email }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📸 LensSuite</h2>
        <h3 style={styles.subTitle}>Ilowday Password-ka?</h3>
        <p style={styles.text}>
          Geli email-kaaga si aan kuugu soo dirno link-ga dib-u-dajinta password-ka.
        </p>

        {/* Muuji fariimaha guusha ama khaldka ee ka soo laabta Redux Store */}
        {successMessage && <div style={styles.successAlert}>📬 {successMessage}</div>}
        {error && <div style={styles.errorAlert}>❌ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="example@gmail.com"
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Waa la dirayaa..." : "Send Reset Link"}
          </button>
        </form>

        <div style={styles.footer}>
          <Link to="/" style={styles.link}>
            ← Ku noqo Loginn
          </Link>
        </div>
      </div>
    </div>
  );
}

// 🎨 Inline Styles ee la jaanqaada LensSuite Admin UI
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
  title: {
    margin: "0 0 10px 0",
    color: "#333",
    fontSize: "24px",
  },
  subTitle: {
    margin: "0 0 10px 0",
    color: "#555",
    fontSize: "18px",
  },
  text: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cccccc",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
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
    transition: "background-color 0.2s",
  },
  successAlert: {
    padding: "10px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "left",
  },
  errorAlert: {
    padding: "10px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "left",
  },
  footer: {
    marginTop: "20px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
};