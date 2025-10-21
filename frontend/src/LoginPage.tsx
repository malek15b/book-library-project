import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex items-center justify-center">
                <button onClick={() => navigate("/admin/books")}
                        className="btn-primary">Login
                </button>
            </div>
        </>
    )
}