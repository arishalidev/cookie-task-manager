import {validateLocalStorage} from "./utils/LocalStorage.js";
import {loadOvens} from "./components/OvensList.js";
import {loadOvenInformation} from "./components/OvenView.js"

const pageType = document.body.getAttribute("page-type");

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();

    if (pageType === "home") {
        loadOvens();
    } else if (pageType === "oven-view") {
        loadOvenInformation();
    }
});
