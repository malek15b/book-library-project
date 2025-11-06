import { createRoot } from 'react-dom/client'
import AlertMessage from "./AlertMessage";

export function showGlobalAlert(message: string, type: "success" | "error" = "success") {
    const old = document.getElementById("global-alert");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "global-alert";
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(<AlertMessage message={message} type={type} />);

    setTimeout(() => {
        root.unmount();
        div.remove();
    }, 3500);
}