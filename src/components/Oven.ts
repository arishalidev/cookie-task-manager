export function loadOvenInformation() {
    const searchParams = new URLSearchParams(window.location.search);
    const ovenNumber = searchParams.get('oven_number');

    if (ovenNumber === null) {
        console.error("Could not find oven number search parameter!");
    }
}