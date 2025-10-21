import {useEffect, useState} from "react";
import {Book} from "./model/Book";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/books")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function deleteBook(bookId: string) {
        axios.delete(`/api/books/${bookId}`)
            .then(() => {
                setBooks(books.filter((b) => b.id !== bookId))
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Bücher <span className="text-gray-500">({books.length})</span>
                </h1>
                <div className="flex justify-end mb-6">
                    <button className="btn-primary" onClick={() => navigate("/admin/books/add")}>Buch anlegen</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                {books.length === 0 ? (
                    <p>Keine Bücher vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Autor</th>
                            <th className="px-6 py-3 w-1/8">Genre</th>
                            <th className="px-6 py-3">Erstellt am</th>
                            <th className="px-6 py-3 w-1/5">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {books.map((b) => (
                            <tr className="hover:bg-gray-50" key={b.id}>
                                <td className="px-6 py-3">{b.name}</td>
                                <td className="px-6 py-3">{b.author}</td>
                                <td className="px-6 py-3">{b.genre?.name}</td>
                                <td className="px-6 py-3">{new Date(Date.parse(b.createdAt)).toLocaleString()} </td>
                                <td className="px-6 py-3 font-medium">
                                    <Link to={`/admin/books/edit/${b.id}`}
                                          className="text-blue-600 pr-2">Bearbeiten</Link>
                                    <button onClick={() => deleteBook(b.id)}
                                            className="text-red-700 float-end">Löschen
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}