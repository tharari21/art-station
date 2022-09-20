import {Redirect} from 'react-router-dom'

const AdminRoute = (Component) => {
    const Authorize = ({isAdmin}) => {
        if (isAdmin) {
            return <Component />
        } else {
            return <Redirect to="/"/>
        }

    }
    return Authorize;
}

export default AdminRoute;