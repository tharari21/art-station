import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({user, isAdminPath, redirectPath="/", children}) => {
  console.log('from protected',user)
  // PROBLEM - user takes a sec to load and by the time it does we 
  // we already redirect
  // const [loading, setLoading] = useState(false)
  
  // useEffect(() => {
  //   if (user) {
  //     setLoading(false)
  //   }
  //   else {
  //     setLoading(true)

  //   }
  // }, [user])
  // if (loading) {
  //   return (
  //     <>LOADING</>
  //   )
  // } else {

    if (isAdminPath) {
      if (user && user.admin) {
        return children ? children : <Outlet />;
      }
      
      
    }
    else {
      if (user) {
        return children ? children : <Outlet />;
      }
      
    }
    // return <Navigate to={redirectPath} replace/>
    return <>YOU MUST BE AN ADMIN TO VIEW THIS PAGE</>
  }
// };

export default ProtectedAdminRoute;
