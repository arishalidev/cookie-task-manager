import {validateLocalStorage} from "./utils/LocalStorage.js";
import {loadAllOvens} from "./components/OvensList.js";
import {loadOvenView} from "./components/OvenView.js"

const pageType = document.body.getAttribute("page-type");

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();

    if (pageType === "home") {
        loadAllOvens();
    } else if (pageType === "oven-view") {
        loadOvenView();
    }
});
