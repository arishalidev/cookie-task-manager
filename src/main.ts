import {validateLocalStorage} from "./utils/LocalStorage.js";
import {loadOvens} from "./components/OvensView.js";

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
    loadOvens();

});
