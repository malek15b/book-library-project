import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Genre} from "./model/Genre";

export default function GenreList() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/genres")
            .then((res) => setGenres(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function deleteGenre(genreId: string) {
        if(confirm("Löschen?")) {
            axios.delete(`/api/genres/${genreId}`)
                .then(() => {
                    setGenres(genres.filter((b) => b.id !== genreId))
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Genres <span className="text-gray-500">({genres.length})</span>
                </h1>
                <div className="flex justify-end mb-6">
                    <button className="btn-primary" onClick={() => navigate("/admin/genres/add")}>Genre anlegen</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                {genres.length === 0 ? (
                    <p>Keine Genres vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3"></th>
                            <th className="px-6 py-3 w-1/5">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {genres.map((g) => (
                            <tr className="hover:bg-gray-50" key={g.id}>
                                <td className="px-6 py-3">{g.name}</td>
                                <td className="px-6 py-3">
                                    <div className="genre-color" style={{background: g.color}}></div>
                                </td>
                                <td className="px-6 py-3 font-medium">
                                    <Link to={`/admin/genres/edit/${g.id}`}
                                          className="text-blue-600 pr-2">Bearbeiten</Link>
                                    <button onClick={() => deleteGenre(g.id)}
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