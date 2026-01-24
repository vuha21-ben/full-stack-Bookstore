



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

import "./Auth.css";

function Auth() {
  // toggle login / register
  const [isLogin, setIsLogin] = useState(true);

  // ===== LOGIN STATE =====
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ===== REGISTER STATE =====
  const [registerUsername, setRegisterUsername] = useState("");

//   const [registerEmail, setRegisterEmail] = useState("");

  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  // ===== SHOW / HIDE PASSWORD =====
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);




  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginUsername || !loginPassword) {
      setLoginError("Vui lòng nhập đầy đủ username và password");
      return;
    }

    try {
      setLoginLoading(true);

      const res = await axiosClient.post("/users/login", {
        username: loginUsername,
        password: loginPassword,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch (err) {
      setLoginError("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoginLoading(false);
    }
  };

  // ===== REGISTER =====
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");

    if (!registerUsername || !registerPassword) {
        setRegisterError("Vui lòng nhập đầy đủ username và password");
        return;
    }

    try {
      setRegisterLoading(true);

        await axiosClient.post("/users/register", {
        username: registerUsername,
        password: registerPassword,
        });

      // reset + quay về login
      setRegisterUsername("");
    //   setRegisterEmail("");
      setRegisterPassword("");
      setIsLogin(true);
    } catch (err) {
      setRegisterError("Đăng ký thất bại");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

        <img
          src="book.png"
          alt="Book Store"
          className="auth-logo"
        />
      {/* 🔥 PHẢI LÀ auth-container */}
      <div className={`auth-container ${isLogin ? "" : "active"}`}>

        {/* ===== SIGN UP ===== */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>

            <input
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required
            />

            {/* <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            /> */}

            <div style={{ position: "relative", width: "100%" }}>
            <input
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
            />

            <span
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                title={showRegisterPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
                userSelect: "none",
                }}
            >
                {showRegisterPassword ? "🙈" : "👁"}
            </span>
            </div>


            {registerError && (
              <p className="error-text">{registerError}</p>
            )}

            <button type="submit" disabled={registerLoading}>
              {registerLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* ===== SIGN IN ===== */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>




            <h1>Sign In</h1>

            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
            />

            <div style={{ position: "relative", width: "100%" }}>
                <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />

                <span
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    title={showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                    userSelect: "none",
                    }}
                >
                    {showLoginPassword ? "🙈" : "👁"}
                </span>
            </div>


            {loginError && (
              <p className="error-text">{loginError}</p>
            )}

            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* ===== TOGGLE ===== */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button
                type="button"
                className="hidden"
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Don't have an account?</p>
              <button
                type="button"
                className="hidden"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Auth;



