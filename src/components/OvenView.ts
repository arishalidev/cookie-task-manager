import {getOvenData, getCookieData, setCookieData, deleteCookie, createNewCookie} from "../utils/LocalStorage.js";
import {CookieData} from "../types/Cookie";

const ovenTitle = document.querySelector('#oven-title') as HTMLHeadingElement;
const rawSection = document.querySelector('#raw') as HTMLDivElement;
const gooeySection = document.querySelector('#gooey') as HTMLDivElement;
const chewySection = document.querySelector('#chewy') as HTMLDivElement;
const crispSection = document.querySelector('#crispy') as HTMLDivElement;
const crunchySection = document.querySelector('#crunchy') as HTMLDivElement;
const eatenSection = document.querySelector('#eaten') as HTMLDivElement;

const backButton = document.querySelector('#back-button') as HTMLButtonElement;

const createRawCookieButton = document.querySelector('#create-raw-cookie') as HTMLButtonElement;

function getOvenNumber() {
    const searchParams = new URLSearchParams(window.location.search);
    const ovenNumber = searchParams.get('oven_number');

    if (ovenNumber === null) {
        throw new Error("Could not find oven number in search parameters!");
    }

    if (isNaN(Number(ovenNumber))) {
        throw new Error("Invalid oven number in search parameters!");
    }

    return Number(ovenNumber);

}

export function loadAllDndSections() {
    loadDnDSection(rawSection);
    loadDnDSection(gooeySection);
    loadDnDSection(chewySection);
    loadDnDSection(crispSection);
    loadDnDSection(crunchySection);
    loadDnDSection(eatenSection);
}

function loadDnDSection(section: HTMLDivElement) {
    section?.addEventListener('dragstart', (e: DragEvent) => {
        const cookieClicked = e.target as HTMLDivElement;

        e.dataTransfer?.setData('text/plain', cookieClicked.id);
    });

    section?.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
    });

    section?.addEventListener('drop', (e) => {
        const cookieId: string = e.dataTransfer?.getData('text/plain') as string ?? "id-not-found";
        const cookie = document.querySelector(`#${cookieId}`);
        const sectionDoneness = section.id;

        if (cookie === null) {
            console.error(`"Could not find cookie with id ${cookieId}`);
            return;
        }

        //Get current oven number
        const ovenNumber = getOvenNumber();
        const cookieData = getCookieData(Number(ovenNumber), Number(cookie.id.substring(11)));

        if (cookieData === undefined) {
            console.error(`Could not find cookie data for oven id ${ovenNumber} and cookie id ${cookie.id}`)
            return;
        }

        cookieData.doneness = sectionDoneness;

        console.log(sectionDoneness)
        if (sectionDoneness === "eaten") {
            deleteCookie(Number(ovenNumber), cookieData.id);
            cookie.remove();
            return;
        }

        setCookieData(Number(ovenNumber), cookieData)

        section.insertAdjacentHTML('beforeend', cookie.outerHTML);
        cookie.remove();

        e.preventDefault();

    });
}

export function loadOvenView() {
    const ovenData = getOvenData(getOvenNumber());


    if (ovenTitle === null) {
        console.error("Could not find oven title heading element!");
        return;
    }

    ovenTitle.innerHTML = ovenData.title;

    for (let cookie of ovenData.cookies) {
        const cookieHTML = `<div class="p-2 border rounded-md m-2" draggable="true" id="cookie-num-${cookie.id}">
                                <span>
                                    ${cookie.description}
                                </span>
                            </div>`;

        if (cookie.doneness === "raw") {
            rawSection.insertAdjacentHTML("beforeend", cookieHTML);
        }
        if (cookie.doneness === "gooey") {
            gooeySection.insertAdjacentHTML("beforeend", cookieHTML);
        }
        if (cookie.doneness === "chewy") {
            chewySection.insertAdjacentHTML("beforeend", cookieHTML);
        }
        if (cookie.doneness === "crispy") {
            crispSection.insertAdjacentHTML("beforeend", cookieHTML);
        }
        if (cookie.doneness === "crunchy") {
            crunchySection.insertAdjacentHTML("beforeend", cookieHTML);
        }
        if (cookie.doneness === "eaten") {
            eatenSection.insertAdjacentHTML("beforeend", cookieHTML);
        }
    }
}

backButton?.addEventListener('click', () => {
    window.location.href = './index.html'
});

createRawCookieButton?.addEventListener('click', () => {

    const cookie: CookieData = {
        id: -1,
        description: "hi",
        doneness: "raw"
    }

    const cookieId: number = createNewCookie(getOvenNumber(), cookie.description, cookie.doneness);

    const cookieHTML = `<div class="p-2 border rounded-md m-2" draggable="true" id="cookie-num-${cookieId}">
                                <span>
                                    ${cookie.description}
                                </span>
                            </div>`;

    rawSection.insertAdjacentHTML('beforeend', cookieHTML);

});