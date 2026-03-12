import {OvenData} from "../types/Oven.js";
import {CookieData} from "../types/Cookie";

export function validateLocalStorage() {
    const numOfOvens = localStorage.getItem('number_of_ovens')
    if (numOfOvens === null) {
        localStorage.setItem('number_of_ovens', '0');
    }

    const numOfCookies = localStorage.getItem('number_of_cookies')
    if (numOfCookies === null) {
        localStorage.setItem('number_of_cookies', '0');
    }
}

export function getAllOvens() {

}

export function getOvenData(ovenNumber: number) {
    const ovenDataString: string = localStorage.getItem(`oven_data_${ovenNumber}`) ?? '';

    if (ovenDataString.length === 0) {
        console.error(`Could not find data for oven #${ovenNumber}`);
        return null;
    }

    const ovenJSON: OvenData = JSON.parse(ovenDataString);

    const oven: OvenData = {
        title: ovenJSON.title,
        description: ovenJSON.description,
        tags: ovenJSON.tags,
        priority: ovenJSON.priority,
        cookies: ovenJSON.cookies
    };

    return oven;
}

export function createNewOven() {

}

export function setOvenData() {

}

export function getAllCookies() {

}

export function getCookieData(ovenId: number, cookieId: number) {
    const ovenDataString = localStorage.getItem(`oven_data_${ovenId}`);

    if (ovenDataString === null) {
        console.error(`Could not find data for oven #${ovenId}`);
        return undefined;
    }

    const ovenJSON: OvenData = JSON.parse(ovenDataString);

    let cookie: CookieData | undefined;

    for (let cookieCheck of ovenJSON.cookies) {
        if (cookieCheck.id === cookieId) {
            cookie = {
                id: cookieId,
                description: cookieCheck.description,
                doneness: cookieCheck.doneness
            }
            break;
        }
    }

    return cookie;
}

export function createNewCookie() {

}

export function setCookieData() {

}
