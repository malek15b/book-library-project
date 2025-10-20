import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function BookAdd() {

    const navigate = useNavigate();
    const [book, setBook] = useState<Book>({
        id: "",
        name: "",
        author: "",
        createdAt: ""
    });

    function postBook() {
        axios.post("/api/books", book)
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

    return (
        <>
            <form className="max-w-sm mx-auto" onSubmit={handelSubmit}>
                <div className="mb-5" >
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name</label>
                    <input value={book.name} onChange={handelInputChange} name={"name"} type="text" id="name"
                            required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Author</label>
                    <input value={book.author} onChange={handelInputChange} name={"author"} type="text" id="author"
                           required/>
                </div>
                <button type="submit"
                        className="btn-primary">Speichern
                </button>
            </form>
        </>
    )
}