import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import BookForm from "./BookForm";
import {Genre} from "./model/Genre";

export default function BookEdit() {

    const {bookId} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [book, setBook] = useState<Book>({
        id: "",
        name: "",
        author: "",
        genre: null,
        createdAt: ""
    });

    useEffect(() => {
        axios.get(`/api/books/${bookId}`)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.error(err));
    }, [bookId]);

    function putBook() {
        axios.put(`/api/books/${bookId}`, book)
            .then(() => {
                navigate("/admin/books")
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        putBook();
    }

    function handelInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    function handelGenreChange(e: ChangeEvent<HTMLSelectElement>, genres: Genre[]) {
        const {value} = e.target;
        setBook({
            ...book,
            "genre": genres.filter((v) => value == v.id)[0]
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    {book.name}
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/books")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <BookForm book={book}
                          handelSubmit={handelSubmit}
                          handelInputChange={handelInputChange}
                          handelGenreChange={handelGenreChange}
                          formRef={formRef} />
            </div>
        </>
    )
}