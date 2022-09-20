import { Redirect } from "react-router-dom";

const AdminRoute = (Component) => {
  const Authorize = ({ isAuth }) => {
    if (isAuth) {
      return <Component />;
    } else {
      return <Redirect to="/" />;
    }
  };
  return Authorize;
};

export default AdminRoute;
