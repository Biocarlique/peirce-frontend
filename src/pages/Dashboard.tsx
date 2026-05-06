import { useAuthStore } from "@/store/authStore";

export const Dashboard = () => {
    const logout = useAuthStore((state) => state.logout);
    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl mb-4">Dashboard in production</h1>
                <button onClick={logout} className="border px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        </>
    );
};
