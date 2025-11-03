import {ChangeEvent, FormEvent, Ref} from "react";
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
                <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                    <input checked={member.active} onChange={props.handelInputChange} id="bordered-checkbox-1" type="checkbox"
                           name={"active"}
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"/>
                    <label htmlFor="bordered-checkbox-1"
                           className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aktiv</label>
                </div>
            </form>
        </>
    )
}