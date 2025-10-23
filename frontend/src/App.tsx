import './App.css'
import {Route, Routes} from "react-router-dom";
import BookList from "./BookList.js";
import MenuBar from "./MenuBar.js";
import LoginPage from "./LoginPage.js";
import BookEdit from "./BookEdit.js";
import BookAdd from "./BookAdd.js";
import GenreList from "./GenreList.js";
import GenreEdit from "./GenreEdit.js";
import GenreAdd from "./GenreAdd.js";

import axios from "axios";
import {useEffect, useState} from "react";

function App() {

    const [user, setUser] = useState<string | null | undefined>(undefined)

    function login() {
        const host: string = window.location.host === "localhost:5173" ?
            "http://localhost:8080" : window.location.origin;
        window.open(host + '/oauth2/authorization/github', '_self');
    }

    function logout() {
        const host: string = window.location.host === "localhost:5173" ?
            "http://localhost:8080" : window.location.origin;
        window.open(host + '/logout', '_self');
    }

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                setUser(response.data)
            })
            .catch(() => setUser(null))
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <MenuBar />
            <div className="p-4 sm:ml-64">

                <div>
                    {!user ?
                        <button className="btn-default" onClick={login}>Login</button>
                        :
                        <button className="btn-default" onClick={logout}>Logout</button>
                    }
                </div>

                <Routes>
                    <Route path={"/admin"}/>
                    <Route path={"/login"} element={<LoginPage/>}/>

                    <Route path={"/admin/books/edit/:bookId"} element={<BookEdit/>}/>
                    <Route path={"/admin/books/add"} element={<BookAdd/>}/>
                    <Route path={"/admin/books"} element={<BookList/>}/>

                    <Route path={"/admin/genres/edit/:genreId"} element={<GenreEdit/>}/>
                    <Route path={"/admin/genres/add"} element={<GenreAdd/>}/>
                    <Route path={"/admin/genres"} element={<GenreList/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
