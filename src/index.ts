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
    // Display ovens and cookies in home page

    newOvenForm?.reset();
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
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

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
});