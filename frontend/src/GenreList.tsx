import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "./config/AxiosConfig";
import {Genre} from "./model/Genre";
import Actions from "./Actions";

export default function GenreList() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/genres")
            .then((res) => {
                const sorted = res.data.sort(
                    (a:Genre, b:Genre) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setGenres(res.data)
            })
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function deleteGenre(genreId: string) {
        if(confirm("Löschen?")) {
            api.delete(`/genres/${genreId}`)
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
                <div className="flex justify-between mb-6">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Suche eingeben.." className="w-1/2" value={search} name={"search"} type="text" id="search"/>
                    <button className="btn-primary" onClick={() => navigate("/admin/genres/add")}>Genre anlegen</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                {genres.length === 0 ? (
                    <p>Keine Genres vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3"></th>
                            <th className="px-6 py-3 w-1/8"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {
                            genres.filter(g =>
                                g.name && g.name.toLowerCase().includes(search.toLowerCase())
                            ).map((g) => (
                            <tr className="hover:bg-gray-50" key={g.id}>
                                <td className="px-6 py-3">{g.name}</td>
                                <td className="px-6 py-3">
                                    <div className="w-6 h-6 rounded-full" style={{background: g.color}}></div>
                                </td>
                                <td className="px-6 py-3 font-medium">
                                    <div className="flex gap-2 justify-end">
                                    <Actions
                                        details={null}
                                        edit={() => navigate(`/admin/genres/edit/${g.id}`)}
                                        delete={() => deleteGenre(g.id)} />
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