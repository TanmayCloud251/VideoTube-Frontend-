import axios from "axios";
import { api } from "./api";

export const searchService = async (query: string) =>{
    const res = await api.get(`/search?q=${query}`);
    return res.data;
}