import {useEffect, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/books")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Bücher <span className="text-gray-500">({books.length})</span>
                </h1>
                {books.length === 0 ? (
                    <p>Keine Bücher vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Author</th>
                            <th className="px-6 py-3">Erstellt am</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {books.map((b) => (
                            <tr className="hover:bg-gray-50" key={b.id}>
                                <td className="px-6 py-3" width={"30%"}>{b.name}</td>
                                <td className="px-6 py-3">{b.author}</td>
                                <td className="px-6 py-3">{new Date(Date.parse(b.createdAt)).toLocaleString()} </td>
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