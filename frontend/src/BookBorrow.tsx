import {FormEvent, useEffect, useRef, useState} from "react";
import {Book} from "./model/Book";
import axios from "axios";
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
        borrowedAt: null,
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
    const [member, setMember] = useState<Member>();

    useEffect(() => {
        axios.get("/api/members")
            .then((res) => setMembers(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    useEffect(() => {
        if (members.length > 0 && book?.borrowedBy) {
            const m = getMember(book.borrowedBy);
            setMember(m);
        } else {
            setMember(undefined);
        }
    }, [members, book.borrowedBy]);

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
            borrowedBy: member.id,
            borrowedAt: new Date().toISOString()
        })
    }

    function removeMember() {
        setBook({
            ...book,
            borrowedBy: null,
            borrowedAt: null
        })
        setMember(null)
    }

    function getMember(memberId: string) {
        const [member] = members.filter((m) => m.id === memberId);
        return member;
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
                <div className="max-w-lg mx-auto mb-5">
                    <p className="text-2xl mb-2">{book.name}</p>
                    <p>{book.author}</p>
                </div>
                {book.id &&
                    <div className="max-w-lg mx-auto">
                        <form ref={formRef} onSubmit={handelSubmit}>
                            <div className="mb-5">
                                <label className="block mb-2 font-medium text-gray-900">Ausleihen an:</label>
                                {members.length !== 0 &&
                                    <SearchableSelect
                                        options={members}
                                        member={member}
                                        handelSelectChange={handelSelectChange}
                                    />
                                }
                            </div>
                        </form>
                        { book.borrowedBy &&
                        <button onClick={removeMember} className="btn-danger mr-3">Zurückgeben</button>
                        }
                    </div>
                }

            </div>
        </>
    )
}