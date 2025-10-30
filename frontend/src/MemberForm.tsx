import {ChangeEvent, FormEvent, Ref} from "react";
import {Genre} from "./model/Genre";
import IsbnInput from "./ISBNInput";
import {Member} from "./model/Member";

type MemberProps = {
    member: Member,
    handelSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handelInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    formRef: Ref<HTMLFormElement>
}

export default function MemberForm(props: MemberProps) {

    const member = props.member;

    return (
        <>
            <form ref={props.formRef} className="max-w-sm mx-auto" onSubmit={props.handelSubmit}>
                <div className="mb-5">
                    <label htmlFor="firstname" className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Vorname</label>
                    <input value={member.firstname} onChange={props.handelInputChange} name={"firstname"} type="text"
                           id="firstname"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="lastname" className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Nachname</label>
                    <input value={member.lastname} onChange={props.handelInputChange} name={"lastname"} type="text"
                           id="lastname"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-white">
                        E-Mail</label>
                    <input value={member.email} onChange={props.handelInputChange} name={"email"} type="text" id="email"
                           required/>
                </div>
                <div className="flex items-center mb-4">
                    <input checked={member.active} onChange={props.handelInputChange} name={"active"} type="checkbox"
                           id="active"
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"/>
                    <label htmlFor="default-checkbox"
                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aktiv</label>
                </div>
            </form>
        </>
    )
}