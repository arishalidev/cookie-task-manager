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
    const ovenDataString: string = localStorage.getItem(`oven_data_${ovenNumber}`) ?? '';

    if (ovenDataString.length === 0) {
        console.error(`Could not find data for oven #${ovenNumber}`);
        return "";
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

    return `
        <div class="m-4 p-3 bg-brown-200 rounded-2xl">
            <a href="./oven.html?oven_number=${ovenNumber}">
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

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
    loadOvens();
});
