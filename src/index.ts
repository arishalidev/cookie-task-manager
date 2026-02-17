function createNewOven() {
    window.location.href = "./oven.html"
}

const newOvenButton = document.getElementById("newOven");
newOvenButton?.addEventListener("click", createNewOven);