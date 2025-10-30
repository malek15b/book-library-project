import {useEffect, useState} from "react";

export default function SuccessAlert({ message, duration = 2000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div
            className={`fixed top-2 left-1/2 transform -translate-x-1/2 transition-all duration-200
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
        >
            <div className="rounded-lg bg-green-100 border border-green-400 text-green-700 px-6 py-3 shadow-md">
                <span className="font-semibold"></span> {message}
            </div>
        </div>
    );
}