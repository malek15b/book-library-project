import {ChangeEvent, FormEvent, Ref} from "react";
import {Genre} from "./model/Genre";
import IsbnInput from "./ISBNInput";

type GenreProps = {
    genre: Partial<Genre>,
    handelSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handelInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handelColorChange: (color: string) => void,
    formRef: Ref<HTMLFormElement>
}

export default function GenreForm(props: GenreProps) {

    const genre = props.genre;

    return (
        <>
            <form ref={props.formRef} className="max-w-lg mx-auto" onSubmit={props.handelSubmit}>
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
                    <div className="flex gap-2 mb-3">
                        {["#FF6B6B", "#4dd0e1", "#4caf50", "#4D96FF", "#C77DFF", "#ffeb3b", "#ffca28", "#3f51b5", "#795548", "#000000"].map((color, i) => (
                            <div
                                key={i}
                                className="w-6 h-6 rounded-full border cursor-pointer hover:scale-110 transition-transform"
                                style={{backgroundColor: color}}
                                onClick={() => props.handelColorChange(color)}
                            ></div>
                        ))}
                    </div>
                    <div className="flex relative">
                        <input value={genre.color ?? "#FFF"} onChange={props.handelInputChange} name={"color"}
                               type="text" id="color"/>
                        <div className="input-color" style={{background: genre.color ?? "#FFF"}}></div>
                    </div>
                </div>
            </form>
        </>
    )
}