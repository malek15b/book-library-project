import {useNavigate} from "react-router-dom";

type LoginProps = {
    login: () => void
}
export default function LoginPage(props: LoginProps) {

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center">
                        <button onClick={props.login}
                                className="btn-primary">Login with Github
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}