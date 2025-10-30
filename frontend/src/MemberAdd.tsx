import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {Member} from "./model/Member";
import MemberForm from "./MemberForm";

export default function MemberAdd() {
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


    function postMember() {
        axios.post(`/api/members`, member)
            .then(() => {
                navigate("/admin/members")
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postMember();
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
                    Mitglied anlegen
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/members")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <MemberForm member={member}
                            handelSubmit={handelSubmit}
                            handelInputChange={handleInputChange}
                            formRef={formRef}/>
            </div>
        </>
    )
}