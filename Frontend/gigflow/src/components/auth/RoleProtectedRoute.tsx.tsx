import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/auth";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleProtectedRoute = ({
  children,
  allowedRoles
}: Props) => {

  const user = getUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;