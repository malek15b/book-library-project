import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Genre} from "./model/Genre";
import api from "./axiosConfig";
import GenreForm from "./GenreForm";

export default function GenreAdd() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [genre, setGenre] = useState<Genre>({
        id: "",
        name: "",
        color: null,
        createdAt: ""
    });

    function postGenre() {
        api.post(`/genres`, genre)
            .then(() => {
                navigate("/admin/genres")
            })
            .catch(err => console.error(err));
    }

    function handelSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postGenre();
    }

    function handelInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setGenre({
            ...genre,
            [name]: value
        })
    }

    function handelColorChange(color: string) {
        setGenre({
            ...genre,
            color: color
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 h-10">
                    Genre anlegen
                </h1>
                <div className="flex justify-end mb-6">
                    <button onClick={() => navigate("/admin/genres")} className="btn-default mr-3">Abbrechen</button>
                    <button className="btn-primary" onClick={() => formRef.current.requestSubmit()}>Speichern</button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <GenreForm genre={genre}
                           handelSubmit={handelSubmit}
                           handelInputChange={handelInputChange}
                           handelColorChange={handelColorChange}
                           formRef={formRef} />
            </div>
        </>
    )
}