import {ChangeEvent, FormEvent, Ref, useEffect, useRef, useState} from "react";
import {Genre} from "./model/Genre";
import {Book} from "./model/Book";
import axios from "axios";
import ISBNInput from "./ISBNInput";
import {BookResponse} from "./model/BookResponse";
import SearchableSelect from "./SearchableSelect";
import {Member} from "./model/Member";
import {useNavigate, useParams} from "react-router-dom";

export default function BookBorrow() {

    const {bookId} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [book, setBook] = useState<Book>({
        id: "",
        name: "",
        author: "",
        genreId: null,
        borrowedBy: null,
        createdAt: ""
    });

    useEffect(() => {
        axios.get(`/api/books/${bookId}`)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.error(err));
    }, [bookId]);

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        axios.get("/api/members")
            .then((res) => setMembers(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function putBook() {
        axios.put(`/api/books/${bookId}`, book)
            .then(() => {
                navigate("/admin/books")
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        putBook()
    }

    function handelSelectChange(member: Member) {
        setBook({
            ...book,
            borrowedBy: member.id
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
                <form ref={formRef} className="max-w-sm mx-auto" onSubmit={handelSubmit}>
                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-900">Ausleihen</label>
                        <SearchableSelect
                            options={members}
                            handelSelectChange={handelSelectChange}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}