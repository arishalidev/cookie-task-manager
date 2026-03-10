import {validateLocalStorage} from "./utils/LocalStorage.js";
import {loadOvens} from "./components/OvensList.js";
import {loadOvenInformation} from "./components/OvenView.js"

document.addEventListener('DOMContentLoaded', () => {
    validateLocalStorage();
    
    loadOvens();
    loadOvenInformation()
});
