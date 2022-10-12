import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({
  user,
  isAdminPath,
  redirectPath = "/",
  children,
}) => {
  if (isAdminPath) {
    if (user && user.admin) {
      // Outlet is what you wrapped in the protected route
      // So if a component is nested under this ProtectedAdminRoute as it's child
      // that will be rendered
      return children ? children : <Outlet />;
    }
  } else {
    if (user) {
      return children ? children : <Outlet />;
    }
  }
  // return <Navigate to={redirectPath} replace/>
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        fontSize: "4rem",
        backgroundColor: "#FF9494",
      }}
    >
      <h2>UNAUTHORIZED</h2>
    </div>
  );
};

export default ProtectedAdminRoute;
