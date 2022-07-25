import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Login />;
}