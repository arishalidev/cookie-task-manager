import {CookieData} from "./Cookie.js";

export interface OvenData {
    title: string;
    id: number;
    description: string;
    tags: string[];
    priority: string;
    cookies: CookieData[];
}
