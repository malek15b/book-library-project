import {Outlet, Navigate} from "react-router";
import {appUser} from "./model/appUser";

type ProtectedRoutesProps = {
    user: appUser
}

export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {

    if (props.user === undefined) {
        return <div>Loading...</div>;
    }

    if (!props.user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}