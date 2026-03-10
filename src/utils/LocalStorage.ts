import {OvenData} from "../types/Oven.js";

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

    return oven
}