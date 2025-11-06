import {useEffect, useState} from "react";

interface AlertProps {
    message: string;
    type?: "success" | "error";
}

export default function AlertMessage({ message, type = "success" }: AlertProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const base =
        "fixed top-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-[9999]";
    const visibleClass = visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5";
    const color =
        type === "success"
            ? "bg-green-100 border border-green-400 text-green-700"
            : "bg-red-100 border border-red-400 text-red-700";

    return (
        <div className={`${base} ${visibleClass}`}>
            <div className={`rounded-lg px-6 py-3 shadow-md ${color}`}>
                {message}
            </div>
        </div>
    );
}