import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import BookList from "./BookList.js";

function App() {

    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate("/admin/books")}
                    className="bg-white-600 text-gray px-6 py-2 rounded-lg shadow-md
                    hover:bg-gray-600 hover:text-white
                    transition-all">Login
            </button>
            <Routes>
                <Route path={"/"}/>
                <Route path={"/admin/books"} element={<BookList/>}/>
            </Routes>
        </>
    )
}

export default App
