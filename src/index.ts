const newOvenForm = document.querySelector<HTMLFormElement>('#newOvenForm');

newOvenForm?.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(newOvenForm);
    const data = Object.fromEntries(formData.entries());

    console.log('Form Data:', data);
});