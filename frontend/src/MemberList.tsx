import {useEffect, useState} from "react";
import {Member} from "./model/Member";
import axios from "axios";
import Actions from "./Actions";
import {useNavigate} from "react-router-dom";

export default function MemberList() {

    const [members, setMembers] = useState<Member[]>([]);
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/members")
            .then((res) => setMembers(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    function localData(data: string) {
        return new Date(data).toLocaleString();
    }

    function deleteMember(memberId: string) {
        if(confirm("Löschen?")) {
            axios.delete(`/api/members/${memberId}`)
                .then(() => {
                    setMembers(members.filter((b) => b.id !== memberId))
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Mitglieder <span className="text-gray-500">({members.length})</span>
                </h1>
                <div className="flex justify-between mb-6">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Suche eingeben.." className="w-1/2" value={search} name={"search"} type="text" id="search"/>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                {members.length === 0 ? (
                    <p>Keine Mitglieder vorhanden.</p>
                ) : (
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Vorname</th>
                            <th className="px-6 py-3">Nachname</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Active</th>
                            <th className="px-6 py-3">Erstellt am</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {
                            members.map((m) => (
                            <tr className="hover:bg-gray-50" key={m.id}>
                                <td className="px-6 py-3">{m.firstname}</td>
                                <td className="px-6 py-3">{m.lastname}</td>
                                <td className="px-6 py-3">{m.email}</td>
                                <td className="px-6 py-3">{m.active ? "Ja": "Nein"}</td>
                                <td className="px-6 py-3">{localData(m.createdAt)}</td>
                                <td className="px-6 py-3 font-medium">
                                    <Actions
                                        edit={() => navigate(`/admin/members/edit/${m.id}`)}
                                        delete={() => deleteMember(m.id)} />
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