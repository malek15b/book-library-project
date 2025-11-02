import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Member} from "./model/Member";
import {Book} from "./model/Book";

export default function MemberDetails() {
    const {memberId} = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([])

    const [member, setMember] = useState<Member>();

    useEffect(() => {
        axios.get(`/api/members/${memberId}`)
            .then(res => {
                setMember(res.data)
            })
            .catch(err => console.error(err));
    }, [memberId]);

    useEffect(() => {
        axios.get(`/api/members/books/${memberId}`)
            .then(res => {
                setBooks(res.data)
            })
            .catch(err => console.error(err));
    }, [memberId]);

    function localData(data: string) {
        return new Date(data).toLocaleString();
    }

    return (
        <>
            {member &&
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4 h-10">
                        {member.firstname} {member.lastname}
                    </h1>
                    <div className="flex justify-end mb-6">
                        <button onClick={() => navigate("/admin/members")} className="btn-default mr-3">Abbrechen
                        </button>
                    </div>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                    <div className="max-w-lg mx-auto">
                        <label className="font-bold mb-5">Name</label>
                        <div className="mb-5">{member.firstname} {member.lastname}</div>
                        <label className="font-bold mb-5">Email</label>
                        <div className="mb-5">{member.email}</div>
                        <div className="flex items-center mb-5">
                            <div className={"h-2.5 w-2.5 rounded-full " + (member.active ?"bg-green-400" :"bg-gray-500") + " me-2"}></div>
                            {(member ? "Aktiv" : "Inaktiv")}
                        </div>
                    </div>

                    <div className="mx-auto">
                        {books.length !== 0 && (
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-6 py-3 w-1/3">Name</th>
                                    <th className="px-6 py-3">Author</th>
                                    <th className="px-6 py-3">Ausgeliehen am</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {
                                    books.map((b) => (
                                        <tr className="hover:bg-gray-50" key={b.id}>
                                            <td className="px-6 py-3">{b.name}</td>
                                            <td className="px-6 py-3">{b.author}</td>
                                            <td className="px-6 py-3">{localData(b.borrowedAt)}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            }
        </>
    )
}