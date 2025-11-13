import {useEffect, useState} from "react";
import {Member} from "./model/Member";
import axios from "axios";

type SearchableSelectProps = {
    members: Member[],
    handelSelectChange: (option: Member) => void
    memberId: string
}

export default function SearchableSelect(props: SearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>("");

    const filteredOptions = props.members.filter((member) =>
        member.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function getMember(memberId: string) {
        const [member] = props.members.filter((m) => m.id === memberId);
        return member;
    }

    useEffect(() => {
        const member = getMember(props.memberId)
        setSelected(fullName(member))
    }, [props.memberId]);

    const handleSelect = (option: Member) => {
        setSelected(fullName(option));
        props.handelSelectChange(option);
        setOpen(false);
        setSearchTerm("");
    };

    function fullName(member: Member) {
        if(member) {
            return `${member.firstname} ${member.lastname}`;
        }
        return ""
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                type="button"
                className="w-full bg-white border border-gray-300 px-3 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none">
                {selected || "Mitglied suchen..."}
            </button>

            {open && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg">
                    <input
                        type="text"
                        placeholder="Suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border-b border-gray-200 px-3 py-2 focus:outline-none"
                    />

                    <ul className="max-h-50 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option: Member) => (
                                <li key={option.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className="text-left w-full px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                    >
                                        { fullName(option) }
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-500">Keine Ergebnisse</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}