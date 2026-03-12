import {getOvenData} from "../utils/LocalStorage.js";

const ovenTitle = document.querySelector('#oven-title') as HTMLHeadingElement;
const rawSection = document.querySelector('#raw') as HTMLDivElement;

export function loadOvenView() {
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
        console.error("Could not find oven title heading element!");
        return;
    }

    ovenTitle.innerHTML = ovenData.title;

    if (rawSection === null) {
        console.error("Could not find raw div element!");
        return;
    }

    for (let cookie of ovenData.cookies) {

        const cookieHTML = `<div class="p-2 border rounded-md">
                                <span>
                                    ${cookie.description}
                                </span>
                            </div>
                            <br>`;

        if (cookie.doneness === "raw") {
            rawSection.insertAdjacentHTML("beforeend", cookieHTML);
        }
    }
}