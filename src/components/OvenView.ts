import {getOvenData} from "../utils/LocalStorage.js";

const ovenTitle = document.querySelector('#oven-title') as HTMLHeadingElement;

export function loadOvenInformation() {
    const searchParams = new URLSearchParams(window.location.search);
    const ovenNumber = searchParams.get('oven_number');

    if (ovenNumber === null) {
        console.error("Could not find oven number in url!");
        return
    }

    const ovenData = getOvenData(Number(ovenNumber));

    if (ovenData === null) {
        console.error(`Could not get oven data for oven number ${ovenNumber}`);
        return;
    }

    if (ovenTitle === null) {
        return;
    }

    ovenTitle.innerHTML = ovenData.title;

}