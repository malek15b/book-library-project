import './App.css'
import {Route, Routes} from "react-router-dom";
import BookList from "./BookList.js";

function App() {

  return (
    <>
        <Routes>
            <Route path={"/"} />
            <Route path={"/books"} element={<BookList/>}/>
        </Routes>
    </>
  )
}

export default App
