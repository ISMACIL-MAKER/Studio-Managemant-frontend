import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { RegisterStudio } from "../features/authSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(RegisterStudio({ username, email, password })).unwrap();
      navigate("/");
    } catch {
      // Error is already managed in Redux state.
    }
  };

  return (
    <div className="Container">
      <div className="Content-login">
        <div className="content-Right">
          <div className="right-conten">
            <h2 className="Title-Right">
              <span>📸</span>LensSuite Admin
            </h2>
            <h1 className="subTitile">Empower your photography business.</h1>

            <p className="subContent">
              The all-in-one workspace for modern photographers. Manage your
              client relationships, organize high-res folders, and handle your
              finances in a single, beautiful interface.
            </p>
          </div>
        </div>

        <div className="content-Left">
          <div className="Form-login">
            <div className="Header-top">
              <h1 className="title-left"> Create Studio Account </h1>
              <p className="left-content">
                Please enter your details to access your studio.
              </p>
            </div>
            <div className="From-container">
              <form className="from-item" onSubmit={handleSubmit}>
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="input"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  className="input"
                  type="password"
                  placeholder="password......"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {successMessage && <p className="success-text">{successMessage}</p>}
                {error && <p className="error-text">{error}</p>}
                <button className="from-button" disabled={loading}>
                  {loading ? "Loading....." : "Register Studio"}
                </button>
              </form>
              <p className="register-text">
                account ma leedahay?{" "}
                <Link to="/" className="register-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
