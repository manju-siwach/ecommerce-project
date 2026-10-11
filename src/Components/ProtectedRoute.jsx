import React from 'react'

const ProtectedRoute = ({ children }) => {
    const jwttoken = localStorage.getItem("jwttoken");
    if (!jwttoken) {
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute
