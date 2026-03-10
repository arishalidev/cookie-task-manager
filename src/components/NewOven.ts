import {validateLocalStorage} from "../utils/LocalStorage.js";
import {CookieData} from "../types/Cookie.js";
import {OvenData} from "../types/Oven.js";
import {loadOvens} from "./OvensList.js";

const newOvenForm = document.querySelector<HTMLFormElement>('#newOvenForm');
const definedCookies = document.querySelector<HTMLLabelElement>('#defined-cookies');

newOvenForm?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(newOvenForm);

    const ovenTitle: string = formData.get('title') as string ?? "";
    const ovenDescription: string = formData.get('description') as string ?? "";
    const ovenCookies: string[] = formData.getAll('cookies') as string[] ?? [];
    const ovenTags: string[] = formData.getAll('newOvenTag') as string[] ?? [];
    const ovenPriority: string = formData.get('newOvenPriority') as string ?? "";

    const cookies: CookieData[] = [];
    for (let i: number = 0; i < ovenCookies.length; i++) {

        if (ovenCookies.at(i)?.length === 0) {
            continue;
        }

        const cookie: CookieData = {
            description: ovenCookies[i]
        }

        cookies.push(cookie);
    }

    const ovenData: OvenData = {
        title: ovenTitle,
        description: ovenDescription,
        tags: ovenTags,
        priority: ovenPriority,
        cookies: cookies
    };

    let index: number = Number(localStorage.getItem('number_of_ovens'));

    if (Number.isNaN(index)) {
        validateLocalStorage();
        index = 0;
    }

    const key = 'oven_data_' + (index).toString();
    localStorage.setItem(key, JSON.stringify(ovenData));
    localStorage.setItem('number_of_ovens', (index + 1).toString());

    newOvenForm?.reset();
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();

    // Tell ovens view file to update ovens if
    loadOvens(true);
});

newOvenForm?.addEventListener('reset', () => {
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
    resetDefinedCookies();
})

definedCookies?.addEventListener('input', (e) => {
    const labelElement = e.target as HTMLLabelElement;
    if (labelElement.tagName === 'INPUT') {
        const numOfDefinedCookies = definedCookies?.querySelectorAll('input').length;
        if ('defined-cookie-' + numOfDefinedCookies === labelElement.id) {
            const newDefinedCookieHTML = `
                - <input name="cookies" id="defined-cookie-${numOfDefinedCookies + 1}"
             class="bg-brown-300 rounded-md m-2 px-2 py-1" type="text"> <br>`;

            if (definedCookies === null) {
                console.error(`Could not find definedCookies label element!`);
                return;
            }

            definedCookies.insertAdjacentHTML('beforeend', newDefinedCookieHTML);
        }
    }
});

export function resetDefinedCookies() {
    if (definedCookies === null) {
        console.error(`Could not find definedCookies label element!`);
        return;
    }

    definedCookies.innerHTML = `
        - <input name="cookies" id="defined-cookie-1"
     class="bg-brown-300 rounded-md m-2 px-2 py-1" type="text"> <br>`;
}