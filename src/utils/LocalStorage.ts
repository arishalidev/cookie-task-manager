import {OvenData} from "../types/Oven.js";
import {CookieData} from "../types/Cookie";

export function validateLocalStorage() {
    const numOfOvens = localStorage.getItem('number_of_ovens')
    if (numOfOvens === null) {
        localStorage.setItem('number_of_ovens', '0');
    }
}

export function getAllOvens() {

}

export function getOvenData(ovenNumber: number) {
    const ovenDataString: string = localStorage.getItem(`oven_data_${ovenNumber}`) ?? '';

    if (ovenDataString.length === 0) {
        throw new Error(`Could not find data for oven #${ovenNumber}`);
    }

    const oven: OvenData = JSON.parse(ovenDataString);
    return oven;
}

export function createNewOven(title: string, description: string, tags: string[], priority: string, cookies: CookieData[]) {
    const id: number = getNumberOfOvens();

    const oven: OvenData = {
        title: title,
        id: id,
        description: description,
        tags: tags,
        priority: priority,
        cookies: cookies
    };

    const key = 'oven_data_' + (id).toString();
    localStorage.setItem(key, JSON.stringify(oven));
    incrementNumberOfOvens(id);
    return oven;
}

export function setOvenData(oven: OvenData) {
    const key = 'oven_data_' + (oven.id).toString();
    localStorage.setItem(key, JSON.stringify(oven));
    return true;
}

export function getAllCookies() {

}

export function getCookieData(ovenId: number, cookieId: number) {

    const oven: OvenData = getOvenData(ovenId)
    let cookie: CookieData | undefined;

    for (let cookieCheck of oven.cookies) {
        if (cookieCheck.id === cookieId) {
            cookie = {
                id: cookieCheck.id,
                description: cookieCheck.description,
                doneness: cookieCheck.doneness
            }
            break;
        }
    }

    return cookie;
}

export function createNewCookie(ovenId: number, description: string, doneness: string) {
    const oven: OvenData = getOvenData(ovenId);
    const cookieId: number = oven.cookies.length + 1;

    const cookie: CookieData = {
        id: cookieId,
        description: description,
        doneness: doneness
    }

    oven.cookies.push(cookie);

    setOvenData(oven)

    return cookieId;
}

export function setCookieData(ovenId: number, cookieData: CookieData) {
    const ovenData = getOvenData(ovenId);

    if (ovenData === null) {
        console.error(`Could not find oven data for oven id ${ovenId}`);
        return;
    }

    for (let i = 0; i < ovenData.cookies.length; i++) {
        let cookieCheck = ovenData.cookies.at(i);
        if (cookieCheck === undefined) {
            console.error("Could not find cookie data!")
            break;
        }

        if (cookieCheck.id === cookieData.id) {
            ovenData.cookies[i] = {
                id: cookieData.id,
                description: cookieData.description,
                doneness: cookieData.doneness
            }
            break;
        }
    }

    setOvenData(ovenData);
}

export function deleteCookie(ovenId: number, cookieId: number) {
    const oven: OvenData = getOvenData(ovenId)

    for (let i = 0; i < oven.cookies.length; i++) {
        if (oven.cookies.at(i)?.id === cookieId) {
            oven.cookies.splice(i, 1);
            setOvenData(oven);
            return true;
        }
    }

    return false;

}

export function getNumberOfOvens() {
    let ovenCount: number = Number(localStorage.getItem('number_of_ovens'));

    if (Number.isNaN(ovenCount)) {
        validateLocalStorage();
        ovenCount = 0;
    }

    return ovenCount;
}

export function incrementNumberOfOvens(numberOfOvens?: number) {

    if (numberOfOvens === undefined) {
        numberOfOvens = getNumberOfOvens();
    }

    localStorage.setItem('number_of_ovens', (numberOfOvens + 1).toString());
}
