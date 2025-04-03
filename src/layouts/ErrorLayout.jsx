import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";

class ErrorBoundaryWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught an error:", error, errorInfo);
        window.location.href = "/error";
    }

    render() {
        if (this.state.hasError) {
            return <Navigate to="/error" replace />;
        }
        return this.props.children;
    }
}

export default ErrorBoundaryWrapper;