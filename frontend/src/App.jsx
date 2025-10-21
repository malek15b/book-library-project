import './App.css'
import {Route, Routes} from "react-router-dom";
import BookList from "./BookList.js";
import MenuBar from "./MenuBar.js";
import LoginPage from "./LoginPage.js";
import BookEdit from "./BookEdit.js";
import BookAdd from "./BookAdd.js";

function App() {

    return (
        <>
            <MenuBar />
            <div className="p-4 sm:ml-64">
                <Routes>
                    <Route path={"/admin"}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/admin/books/edit/:bookId"} element={<BookEdit/>}/>
                    <Route path={"/admin/books/add"} element={<BookAdd/>}/>
                    <Route path={"/admin/books"} element={<BookList/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
