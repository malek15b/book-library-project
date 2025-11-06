import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useRef, useState} from "react";
import api from "./axiosConfig";
import {Member} from "./model/Member";
import MemberForm from "./MemberForm";

export default function MemberEdit() {
    const {memberId} = useParams();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [member, setMember] = useState<Member>({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        active: true,
        createdAt: ""
    });

    useEffect(() => {
        api.get(`/members/${memberId}`)
            .then(res => {
                setMember(res.data)
            })
            .catch(err => console.error(err));
    }, [memberId]);

    function putMember() {
        api.put(`/members/${memberId}`, member)
            .then(() => {
                navigate("/admin/members", { state: { saved: true }});
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        putMember();
    }

    const handleInputChange = (e) => {
        const {name, type, checked, value} = e.target;

        setMember((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    {member.firstname} {member.lastname}
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/members")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                {member.id &&
                    <MemberForm member={member}
                                handelSubmit={handelSubmit}
                                handelInputChange={handleInputChange}
                                formRef={formRef}/>
                }
            </div>
        </>
    )
}