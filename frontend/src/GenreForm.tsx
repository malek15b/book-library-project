import {ChangeEvent, FormEvent, Ref} from "react";
import {Genre} from "./model/Genre";

type GenreProps = {
    genre: Genre,
    handelSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handelInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    formRef: Ref<HTMLFormElement>
}

export default function GenreForm(props: GenreProps) {

    const genre = props.genre;

    return (
        <>
            <form ref={props.formRef} className="max-w-sm mx-auto" onSubmit={props.handelSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Name</label>
                    <input value={genre.name} onChange={props.handelInputChange} name={"name"} type="text" id="name"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="author"
                           className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Color</label>
                    <div className="flex">
                    <input value={genre.color ?? "#FFF"} onChange={props.handelInputChange} name={"color"} type="text" id="color"/>
                    <div className="input-color" style={{background: genre.color ?? "#FFF"}}></div>
                    </div>
                </div>
            </form>
        </>
    )
}