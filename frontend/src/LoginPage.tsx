import {useNavigate} from "react-router-dom";

type LoginProps = {
    login: () => void
}
export default function LoginPage(props: LoginProps) {

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="max-w-sm mx-auto">
                        <div className="mb-5 text-gray-700">
                            <label htmlFor="username" className="block mb-2 font-medium text-gray-700">
                                E-Mail / Username</label>
                            <input name={"username"} type="text" id="username" required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
                                Password</label>
                            <input name={"password"} type="text" id="password" required/>
                        </div>
                        <div className="mb-5">
                            <button className="flex w-full justify-center btn-primary">Einloggen</button>
                        </div>
                    </form>
                    <div className="inline-flex items-center justify-center w-full mb-5">
                        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                        <span
                            className="absolute px-3 font-medium text-gray-700 -translate-x-1/2 bg-white left-1/2">oder</span>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <button onClick={props.login}
                                className="btn-primary w-full">Login with Github
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}