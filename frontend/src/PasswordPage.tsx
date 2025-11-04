import {useLocation, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";

export default function PasswordPage() {
    const location = useLocation();
    const username = location.state?.username || "";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username,
        password: "",
    });

    function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postLogin()
    }

    function postLogin() {
        axios.post("/api/auth/login", formData)
            .then((res) => {
                if(res.data) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/admin/books")
                }
            })
            .catch(err => console.error(err));
    }

    function handelInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center px-6 lg:px-8 pt-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm p-5 bg-white shadow-2xl">

                    <h1 className="text-2xl mb-5 h-10 text-center">Anmelden</h1>

                    <form className="max-w-sm mx-auto" onSubmit={login}>
                        <div className="mb-5 text-gray-700">
                            <label htmlFor="username" className="block mb-2 font-medium text-gray-600">
                                E-Mail-Adresse</label>
                            <input value={formData.username} onChange={handelInputChange} name={"username"} type="text" id="username" required/>
                        </div>
                        <div className="mb-5 text-gray-700">
                            <label htmlFor="password" className="block mb-2 font-medium text-gray-600">
                                Password</label>
                            <input value={formData.password} onChange={handelInputChange} name={"password"} type="text" id="password" required/>
                        </div>
                        <div className="mb-5">
                            <button type={"submit"} className="flex w-full justify-center btn-primary">Anmelden</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}