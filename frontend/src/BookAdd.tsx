import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate} from "react-router-dom";
import api from "./config/AxiosConfig";
import {Genre} from "./model/Genre";
import BookForm from "./BookForm";
import {BookResponse} from "./model/BookResponse";

export default function BookAdd() {

    const navigate = useNavigate();
    const formRef = useRef(null);
    const [book, setBook] = useState<Book>({
        id: "",
        name: "",
        author: "",
        genreId: null,
        borrowedBy: null,
        borrowedAt: null,
        createdAt: ""
    });

    function postBook() {
        api.post("/books", book)
            .then(() => {
                navigate("/admin/books")
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postBook();
    }

    function handelInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    function handelGenreChange(e: ChangeEvent<HTMLSelectElement>, genres: Genre[]) {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    function setBookResponse(bookResponse: BookResponse) {
        setBook({
            ...book,
            name: bookResponse.name,
            author: bookResponse.author
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Buch anlegen
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/books")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <BookForm book={book}
                          setBookResponse={setBookResponse}
                          handelSubmit={handelSubmit}
                          handelInputChange={handelInputChange}
                          handelGenreChange={handelGenreChange}
                          formRef={formRef}/>
            </div>
        </>
    )
}