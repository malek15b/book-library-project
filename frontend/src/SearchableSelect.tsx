import {useState} from "react";
import {Member} from "./model/Member";

type SearchableSelectProps = {
    options: Member[],
    handelSelectChange: (option: Member) => void
}

export default function SearchableSelect(props: SearchableSelectProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const filteredOptions = props.options.filter((member) =>
        member.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option: Member) => {
        setSelected(fullName(option));
        props.handelSelectChange(option);
        setOpen(false);
        setSearchTerm("");
    };

    function fullName(member: Member) {
        return `${member.firstname} ${member.lastname}`;
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                type="button"
                className="w-full bg-white border border-gray-300 px-3 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none">
                {selected || "Bitte wählen..."}
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

                    <ul className="max-h-40 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option: Member) => (
                                <li
                                    key={option.id}
                                    onClick={() => handleSelect(option)}
                                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                >
                                    { fullName(option) }
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