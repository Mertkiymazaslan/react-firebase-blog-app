import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!
  //BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!
  //BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!
  //BU PROJEYİ GİTHUBA KOYARKEN LOCAL.ENV DOSYASI OLMUYOR BUNA BİR ALTERNATİF BUL!                BU YORUM SATIRLARI FİREBASE.JSDEN DE SİL

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(location.pathname === "/login" ? "/" : location.pathname);
    } catch (error) {
      console.log(error.message);
      setError("Failed to log in");
    }
    setLoading(false);
  }

  const signInWithGoogleHandler = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate(location.pathname === "/login" ? "/" : location.pathname);
    } catch (error) {
      console.log(error.message);
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
      <div className="loginSignup">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
              <br />
            </Form>
            <button
              onClick={signInWithGoogleHandler}
              className="w-100 text-center mt-3 login-with-google-btn"
            >
              Sign In with Google
            </button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
  );
};

export default Login;
