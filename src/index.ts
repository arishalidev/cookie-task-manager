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

    console.log(formData.getAll('newOvenTag'));
    console.log(formData.get('newOvenPriority'));

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

    localStorage.setItem('oven_data', JSON.stringify(ovenData));

    //TODO:
    // Add a popup informing user new oven is created
    // Implement tag and priority buttons
    // Implement dynamic number of cookies when creating oven
    // Allow for multiple ovens being saved in browser
    // Display ovens and cookies in home page

    newOvenForm?.reset();
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
});

newOvenForm?.addEventListener('reset', () => {
    document.querySelector<HTMLDivElement>('#newOvenPopover')?.hidePopover();
})