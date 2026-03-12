import {getOvenData} from "../utils/LocalStorage.js";

const ovenTitle = document.querySelector('#oven-title') as HTMLHeadingElement;
const rawSection = document.querySelector('#raw') as HTMLDivElement;
const gooeySection = document.querySelector('#gooey') as HTMLDivElement;
const chewySection = document.querySelector('#chewy') as HTMLDivElement;
const crispSection = document.querySelector('#crispy') as HTMLDivElement;
const crunchySection = document.querySelector('#crunchy') as HTMLDivElement;
const eatenSection = document.querySelector('#eaten') as HTMLDivElement;


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

        if (cookie === null) {
            console.error(`"Could not find cookie with id ${cookieId}`);
            return;
        }

        section.insertAdjacentHTML('beforeend', cookie.outerHTML);
        cookie.remove();

        e.preventDefault();

    });
}

export function loadOvenView() {
    const searchParams = new URLSearchParams(window.location.search);
    const ovenNumber = searchParams.get('oven_number');

    if (ovenNumber === null) {
        console.error("Could not find oven number in url!");
        return;
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
        console.error("Could not find raw section in oven view page!");
        return;
    }

    for (let cookie of ovenData.cookies) {
        const cookieHTML = `<div class="p-2 border rounded-md" draggable="true" id="cookie-num-${cookie.id}">
                                <span>
                                    ${cookie.description}
                                </span>
                            </div>`;

        if (cookie.doneness === "raw") {
            rawSection.insertAdjacentHTML("beforeend", cookieHTML);
        }
    }
}