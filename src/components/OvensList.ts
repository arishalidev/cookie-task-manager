import {resetDefinedCookies} from "./NewOven.js";
import {getOvenData} from "../utils/LocalStorage.js";

export function loadAllOvens(onlyLoadLastOven: boolean = false) {

    // Only run this code on the home page
    if (!window.location.pathname.includes("index.html")) {
        return;
    }

    let numOfOvens: number = Number(localStorage.getItem('number_of_ovens') ?? '0');
    if (Number.isNaN(numOfOvens)) {
        numOfOvens = 0;
    }

    const ovensDiv = document.querySelector<HTMLDivElement>('#ovensDiv');

    if (ovensDiv === null) {
        console.error("Could not find ovensDiv!");
        return;
    }

    if (onlyLoadLastOven) {
        ovensDiv.insertAdjacentHTML('beforeend', getOvenHTML(numOfOvens - 1));
    }

    let ovensDivInnerHTML: string = "";

    for (let ovenNumber = 0; ovenNumber < numOfOvens; ovenNumber++) {
        ovensDivInnerHTML += getOvenHTML(ovenNumber);
    }

    ovensDiv.innerHTML = ovensDivInnerHTML;
    resetDefinedCookies();
}

function getOvenHTML(ovenNumber: number) {

    const ovenData = getOvenData(ovenNumber);

    if (ovenData === null) {
        console.error(`Could not find data for oven #${ovenNumber}`);
        return "";
    }


    let ovensListItemsHTML: string = '';

    if (ovenData.cookies.length != 0) {
        ovensListItemsHTML += `
            <div class="my-2 p-3 bg-brown-300 rounded-2xl">
                <ul>`;

        for (let i = 0; i < ovenData.cookies.length; i++) {
            ovensListItemsHTML += `<li>${ovenData.cookies.at(i)?.description}</li>`;
        }

        ovensListItemsHTML += `
            </ul>
        </div>`
    }

    return `
        <div class="m-4 p-3 bg-brown-200 rounded-2xl">
            <a href="./oven.html?oven_number=${ovenNumber}">
                <div class="flex">
                    <h2 class="text-2xl flex-1 text-center">${ovenData.title}</h2>
                    <div class="w-16 text-center">
                        <button>Menu</button>
                    </div>
                </div>
                ${ovensListItemsHTML}
            </a>
        </div>`;

}
