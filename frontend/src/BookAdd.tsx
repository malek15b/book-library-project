import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function BookAdd() {

    const navigate = useNavigate();
    const formRef = useRef(null);

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
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Neues Buch anlegen
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/books")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <form ref={formRef} className="max-w-sm mx-auto" onSubmit={handelSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name</label>
                        <input value={book.name} onChange={handelInputChange} name={"name"} type="text" id="name"
                               required/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="author"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Author</label>
                        <input value={book.author} onChange={handelInputChange} name={"author"} type="text" id="author"
                               required/>
                    </div>
                </form>
            </div>
        </>
    )
}