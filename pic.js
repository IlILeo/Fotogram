
async function loadDialog() {
    const response = await fetch('diealog.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('afterbegin', html);
}

function openDialog(dialogId) {
    const dialogref = document.getElementById(dialogId);
    if (dialogref) {
        dialogref.showModal();
        dialogref.classList.add("opened");
    }
}

function closeDialog(dialogId) {
    const dialogref = document.getElementById(dialogId);
    if (dialogref) {
        dialogref.close();
        dialogref.classList.remove("opened");
    }
}

loadDialog();
