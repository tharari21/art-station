import {Redirect} from 'react-router-dom'

const ProtectedRoute = (Component) => {
    const AdminRoute = () => {
        if (isAdmin) {
            return <Component />
        } else {
            return <Redirect to="/"/>
        }

    }
    return AdminRoute
}

export default ProtectedRoute