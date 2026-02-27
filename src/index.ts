const newOvenForm = document.querySelector<HTMLFormElement>('#newOvenForm');

interface CookieData {
    description: string;
}

interface OvenData {
    title: string;
    description: string;
    tag: number;
    priority: number;
    cookies: CookieData[];

}

newOvenForm?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(newOvenForm);

    const ovenTitle: string = formData.get('title') as string ?? "";
    const ovenDescription: string = formData.get('description') as string ?? "";
    const ovenCookies: string[] = formData.getAll('cookies') as string[] ?? [];

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
        tag: 0,
        priority: 0,
        cookies: cookies
    };

    localStorage.setItem('oven_data', JSON.stringify(ovenData));
});