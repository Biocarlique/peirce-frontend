import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";

import { Login } from "@/pages/Login";
import { Dashboard } from "@/pages/Dashboard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useAuthStore((state) => state.token);
    if (!token) {
        return <Navigate to={"/login"} replace />;
    }
    return <>{children}</>;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/*"
                element={
                    <ProtectedRoute>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
