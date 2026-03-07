import {validateLocalStorage} from "./utils/LocalStorage.js";
import {loadOvens} from "./components/OvensView.js";
import {loadOvenInformation} from "./components/Oven.js"

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
    loadOvens();

    loadOvenInformation()
});
