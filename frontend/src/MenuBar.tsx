import {Link, useLocation} from "react-router-dom";
import {appUser} from "./model/appUser";
import {useState} from "react";
import {Book} from "./model/Book";

type LogoutProps = {
    logout: () => void,
    user: appUser
}

export default function MenuBar(props: LogoutProps) {

    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };


    return (
        <>
            <aside id="sidebar-multi-level-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div
                    className="font-medium h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-gray-50">
                    <div className="border-b-gray-200 text-blue-600 border-b p-2 ms-3 mb-10 whitespace-nowrap">
                        BookLibrary
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to={"/admin/books"}
                                className={`${isActive("/admin/books") ? "active " : ""} flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-50 group`}>
                                <span className="flex-1 ms-3 whitespace-nowrap">Bücher</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/genres"}
                                className={`${isActive("/admin/genres") ? "active " : ""} flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-50 group`}>
                                <span className="ms-3 whitespace-nowrap">Genres</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/members"}
                                className={`${isActive("/admin/members") ? "active " : ""} flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-50 group`}>
                                <span className="ms-3 whitespace-nowrap">Mitglieder</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-auto">
                        <div className="text-blue-600 p-2 ms-3 pb-0 whitespace-nowrap">
                            {props.user.username}
                        </div>
                        <button
                            onClick={props.logout}
                            className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group w-full">
                            <span className="ms-3 whitespace-nowrap">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}