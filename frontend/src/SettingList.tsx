import {useState} from "react";

export default function SettingList() {

    const [search, setSearch] = useState<string>("");

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Einstellungen
                </h1>
                <div className="flex justify-between mb-6">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Suche eingeben.." className="w-1/2"
                           value={search} name={"search"} type="text" id="search"/>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0"/>

                <div className="max-w-lg mx-auto">
                <div
                    className="max-w-sm bg-white hover:bg-gray-50 border border-gray-200 shadow-sm mb-2">
                    <div className="p-5">
                        <h5>Benutzer / Rolle</h5>
                    </div>
                </div>
                    <div
                        className="max-w-sm bg-white hover:bg-gray-50 border border-gray-200 shadow-sm mb-2">
                        <div className="p-5">
                            <h5>Import / Export</h5>
                        </div>
                    </div>
                    <div
                        className="max-w-sm bg-white hover:bg-gray-50 border border-gray-200 shadow-sm mb-2">
                        <div className="p-5">
                            <h5>Sprachen</h5>
                        </div>
                    </div>
                    <div
                        className="max-w-sm bg-white hover:bg-gray-50 border border-gray-200 shadow-sm mb-2">
                        <div className="p-5">
                            <h5>Zusatzfelder</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}