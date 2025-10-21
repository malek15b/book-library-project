import {ChangeEvent, FormEvent, Ref, useEffect, useState} from "react";
import {Genre} from "./model/Genre";
import {Book} from "./model/Book";
import axios from "axios";

type BookProps = {
    book: Book,
    handelSubmit: (event: FormEvent<HTMLFormElement>) => void,
    handelInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handelGenreChange: (e: ChangeEvent<HTMLSelectElement>, genre: Genre[]) => void,
    formRef: Ref<HTMLFormElement>
}

export default function BookForm(props: BookProps) {

    const book = props.book;
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        axios.get("/api/genres")
            .then((res) => setGenres(res.data))
            .catch((err) => console.error("Error Loading:", err));
    }, []);

    return (
        <>
            <form ref={props.formRef} className="max-w-sm mx-auto" onSubmit={props.handelSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Name</label>
                    <input value={book.name} onChange={props.handelInputChange} name={"name"} type="text" id="name"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="author"
                           className="block mb-2 font-medium text-gray-900 dark:text-white">
                        Author</label>
                    <input value={book.author} onChange={props.handelInputChange} name={"author"} type="text" id="author"
                           required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="genres"
                           className="block mb-2 font-medium text-gray-900 dark:text-white">Genre</label>
                    <select id="genres" onChange={(e) => props.handelGenreChange(e, genres)} name={"genre"} value={book.genre?.id}
                            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="0">Genre auswählen</option>
                        {
                            genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </>
    )
}