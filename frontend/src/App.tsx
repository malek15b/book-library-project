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
import ProtectedRoutes from "./ProtectedRoutes";
import {appUser} from "./model/appUser";
import MemberList from "./MemberList";
import MemberEdit from "./MemberEdit";
import MemberAdd from "./MemberAdd";

function App() {

    const [user, setUser] = useState<appUser>(undefined)

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
        <Routes>
            <Route path="/login" element={<LoginPage login={login} />} />
            <Route path="/" element={<LoginPage login={login} />} />

            <Route element={<ProtectedRoutes user={user} />}>
                <Route
                    path="/admin/*"
                    element={
                        <>
                            <MenuBar logout={logout} user={user} />
                            <div className="p-5 sm:ml-64 bg-white h-full">
                                <Routes>
                                    <Route path="books/edit/:bookId" element={<BookEdit />} />
                                    <Route path="books/add" element={<BookAdd />} />
                                    <Route path="books" element={<BookList />} />

                                    <Route path="genres/edit/:genreId" element={<GenreEdit />} />
                                    <Route path="genres/add" element={<GenreAdd />} />
                                    <Route path="genres" element={<GenreList />} />

                                    <Route path="members" element={<MemberList />} />
                                    <Route path="members/edit/:memberId" element={<MemberEdit />} />
                                    <Route path="members/add" element={<MemberAdd />} />
                                </Routes>
                            </div>
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
