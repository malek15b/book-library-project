import {useEffect, useState} from "react";
import {Book} from "./model/Book";
import {useNavigate} from "react-router-dom";
import api from "./config/AxiosConfig";
import {Genre} from "./model/Genre";
import Actions from "./Actions";

export default function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/books")
            .then((res) => {
                setBooks(res.data)
            })
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    useEffect(() => {
        api.get("/genres")
            .then((res) => setGenres(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function deleteBook(bookId: string) {
        if (confirm("Löschen?")) {
            api.delete(`/books/${bookId}`)
                .then(() => {
                    setBooks(books.filter((b) => b.id !== bookId))
                })
                .catch(err => console.error(err));
        }
    }

    function getGenre(genreId: string) {
        const [genre] = genres.filter((g) => g.id === genreId);
        return genre;
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Bücher <span className="text-gray-500">({books.length})</span>
                </h1>
                <div className="flex justify-between mb-6">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Suche eingeben.." className="w-1/2"
                           value={search} name={"search"} type="text" id="search"/>
                    <button className="btn-primary" onClick={() => navigate("/admin/books/add")}>Buch anlegen</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                {books.length === 0 ? (
                    <p>Keine Bücher vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="w-02"></th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Autor</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 w-1/8">Genre</th>
                            <th className="px-6 py-3 w-1/8"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {books.filter(b =>
                            b.name && b.name.toLowerCase().includes(search.toLowerCase()) ||
                            b.author && b.author.toLowerCase().includes(search.toLowerCase()) ||
                            getGenre(b.genreId)?.name && getGenre(b.genreId)?.name.toLowerCase().includes(search.toLowerCase())
                        ).map((b) => (
                            <tr className="hover:bg-gray-50" key={b.id}>
                                <td style={{background: getGenre(b.genreId)?.color ?? "#FFF"}}></td>
                                <td className="px-6 py-3 w-1/3">{b.name}</td>
                                <td className="px-6 py-3">{b.author}</td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center">
                                        <div className={"h-2.5 w-2.5 rounded-full " + (!b.borrowedBy ?"bg-green-400" :"bg-gray-500") + " me-2"}></div>
                                        {(b.borrowedBy ? "Ausgeliehen" : "Verfügbar")}
                                    </div>
                                </td>
                                <td className="px-6 py-3">{getGenre(b.genreId)?.name}</td>
                                <td className="px-6 py-3 font-medium">
                                    <div className="flex gap-2 justify-end">
                                        <button title="ausleihen/zurückgeben"
                                                onClick={() => navigate(`/admin/books/borrow/${b.id}`)} className="inline-flex items-center justify-center p-2
                                         hover:bg-gray-100 text-gray-600">

                                            <svg className={ "w-6 h-6 " + (b.borrowedBy ?"text-green-400" :"text-gray-500")} aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd"
                                                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                        <Actions
                                            details={null}
                                            edit={() => navigate(`/admin/books/edit/${b.id}`)}
                                            delete={!b.borrowedBy && (() => deleteBook(b.id))}/>
                                    </div>
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