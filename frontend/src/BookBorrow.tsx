import {FormEvent, useEffect, useRef, useState} from "react";
import {Book} from "./model/Book";
import api from "./config/AxiosConfig";
import SearchableSelect from "./SearchableSelect";
import {Member} from "./model/Member";
import {useNavigate, useParams} from "react-router-dom";

export default function BookBorrow() {

    const {bookId} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [book, setBook] = useState<Book>();

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        api.get(`/books/${bookId}`)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.error(err));
    }, [bookId]);

    useEffect(() => {
        api.get("/members?active=1")
            .then((res) => setMembers(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, [book]);

    function putBook() {
        api.put(`/books/${bookId}`, book)
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

    function removeMember() {
        if (confirm("Zurückgeben?")) {
            setBook({
                ...book,
                borrowedBy: null,
                borrowedAt: null
            })
        }
    }

    return (
        <>
            {book &&
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4 h-10">
                        {book.name}
                    </h1>
                    <div className="flex justify-end mb-6">
                        <button onClick={() => navigate("/admin/books")} className="btn-default mr-3">Abbrechen</button>
                        <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern
                        </button>
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="max-w-lg mx-auto mb-5">
                        <p className="text-2xl mb-2">{book.name}</p>
                        <p>{book.author}</p>
                    </div>
                    <div className="max-w-lg mx-auto">
                        <form ref={formRef} onSubmit={handelSubmit}>
                            <div className="mb-5">
                                <label className="block mb-2 font-medium text-gray-900">
                                    {book.borrowedBy ? "Ausgeliehen an" : "Ausleihen an"}
                                </label>
                                {members.length !== 0 &&
                                    <SearchableSelect
                                        members={members}
                                        memberId={book.borrowedBy}
                                        handelSelectChange={handelSelectChange}
                                    />
                                }
                            </div>
                        </form>
                        <div className="flex justify-end">
                            {book.borrowedBy &&
                                <button onClick={removeMember} className="btn-danger">Zurückgeben</button>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}