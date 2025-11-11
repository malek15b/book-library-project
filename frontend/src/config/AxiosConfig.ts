import axios from "axios";
import {showGlobalAlert} from "../showGlobalAlert";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        const method = response.config.method?.toUpperCase();
        if (["POST", "PUT", "DELETE"].includes(method)) {
            if(method === "DELETE") {
                showGlobalAlert("Entity wurde erfolgreich gelöscht.", "success");
            } else {
                showGlobalAlert("Entity wurde erfolgreich gespeichert.", "success");
            }
        }
        return response;
    },
    (error) => {
        showGlobalAlert("Leider ist etwas schief gelaufen.", "error");
        return error;
    }
);

export default api;