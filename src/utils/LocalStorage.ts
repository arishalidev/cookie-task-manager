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