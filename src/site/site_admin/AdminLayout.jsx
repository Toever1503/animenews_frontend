import { getAuth } from "../../axios/default_api";


export default function AdminLayout() {
    const auth = getAuth();

    return (
        <>
            AdminLayout
        </>
    );
}

function Layout() {
    return (
        <>
            AdminLayout
        </>
    );
}

function ForceAdmin(){
    return (
        <>
            force admin
        </>
    );
}