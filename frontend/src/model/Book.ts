import {Genre} from "./Genre";

export type Book = {
    id: string;
    name: string;
    author: string;
    genre: Genre
    createdAt: string;
}