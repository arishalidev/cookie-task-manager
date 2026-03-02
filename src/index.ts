const newOvenForm = document.querySelector<HTMLFormElement>('#newOvenForm');

interface CookieData {
    description: string;
}

interface OvenData {
    title: string;
    description: string;
    tags: string[];
    priority: string;
    cookies: CookieData[];
}

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

    //TODO:
    // Add a popup informing user new oven is created
    // Implement tag and priority buttons
    // Implement dynamic number of cookies when creating oven

    newOvenForm?.reset();
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
    loadOvens(true);
});

newOvenForm?.addEventListener('reset', () => {
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
})

function validateLocalStorage() {
    const numOfOvens = localStorage.getItem('number_of_ovens')
    if (numOfOvens === null) {
        localStorage.setItem('number_of_ovens', '0');
    }

    const numOfCookies = localStorage.getItem('number_of_cookies')
    if (numOfCookies === null) {
        localStorage.setItem('number_of_cookies', '0');
    }
}

function loadOvens(onlyLoadLastOven: boolean = false) {
    let numOfOvens: number = Number(localStorage.getItem('number_of_ovens') ?? '0');
    if (Number.isNaN(numOfOvens)) {
        numOfOvens = 0;
    }

    const ovensDiv = document.querySelector<HTMLDivElement>('#ovensDiv');

    if (ovensDiv === null) {
        console.error("Could not find ovensDiv!");
        return;
    }

    let ovenNumber = 0
    let ovensDivInnerHTML: string = "";

    if (onlyLoadLastOven) {
        ovenNumber = numOfOvens - 1;
    }

    for (; ovenNumber < numOfOvens; ovenNumber++) {

        const ovenDataString: string = localStorage.getItem(`oven_data_${ovenNumber}`) ?? '';

        if (ovenDataString.length === 0) {
            console.error(`Could not find data for oven #${ovenNumber}`);
            continue;
        }

        const ovenJSON: OvenData = JSON.parse(ovenDataString);
        const ovenTitle: string = ovenJSON.title;
        const ovenCookies: CookieData[] = ovenJSON.cookies;


        let ovensListItemsHTML: string = '';
        if (ovenCookies.length != 0) {
            ovensListItemsHTML += `
            <div class="my-2 p-3 bg-brown-300 rounded-2xl">
                <ul>`;

            for (let i = 0; i < ovenCookies.length; i++) {
                ovensListItemsHTML += `<li>${ovenCookies.at(i)?.description}</li>`;
            }

            ovensListItemsHTML += `
                </ul>
            </div>`
        }

        ovensDivInnerHTML += `
            <div class="m-4 p-3 bg-brown-200 rounded-2xl">
                <a href="./oven.html">
                    <div class="flex">
                        <h2 class="text-2xl flex-1 text-center">${ovenTitle}</h2>
                        <div class="w-16 text-center">
                            <button>Menu</button>
                        </div>
                    </div>
                    ${ovensListItemsHTML}
                </a>
            </div>`;
    }

    if (onlyLoadLastOven) {
        ovensDiv.innerHTML += ovensDivInnerHTML;
    } else {
        ovensDiv.innerHTML = ovensDivInnerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
    loadOvens();
});