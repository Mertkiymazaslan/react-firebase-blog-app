import Signup from "./pages/Signup";
import "./App.css";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
            <Route
              path="/myposts"
              element={
                <PrivateRoute>
                  <MyPosts />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
