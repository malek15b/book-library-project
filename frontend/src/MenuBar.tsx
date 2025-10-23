import {Link} from "react-router-dom";

type LogoutProps = {
    logout: () => void
}

export default function MenuBar(props: LogoutProps) {

    return (
        <>
            <aside id="sidebar-multi-level-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div
                    className="font-medium h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to={"/admin/books"}
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Bücher</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/admin/genres"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                                <span className="flex-1 ms-3 whitespace-nowrap">Genres</span>
                            </Link>
                        </li>
                    </ul>

                    <button
                        onClick={props.logout}
                        className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                        <span className="ms-3 whitespace-nowrap">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}