import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
  const { token, userCustomer } = useSelector((state) => state.auth);

  // 1. Haddii aanu qofku login ahayn gabi ahaanba, u ror bogga hore (Login)
  if (!token || !userCustomer) {
    return <Navigate to="/" replace />;
  }

  // 2. Haddii uu login yahay laakiin uu isku dayo waddo aan loo oggolaan (Prevent Loop)
  if (allowedRoles && !allowedRoles.includes(userCustomer.role)) {
    return userCustomer.role === "superadmin" 
      ? <Navigate to="/Admin/AdminDashboard" replace /> 
      : <Navigate to="/Dashboard" replace />;
  }

  // 3. Haddii wax walba sax yihiin, u oggolaan nidaamka
  return <Outlet />;
}