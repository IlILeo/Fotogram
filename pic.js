
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

document.addEventListener("keydown", (event) => {
    const activeDialog = document.querySelector(".dialog.opened");

    if (activeDialog) {
        const currentNumber = Number(activeDialog.id.replace("Dialog-", ""));
        let nextNumber;

        if (event.key === "ArrowRight") {
            nextNumber = currentNumber === 9 ? 1 : currentNumber + 1;
        } else if (event.key === "ArrowLeft") {
            nextNumber = currentNumber === 1 ? 9 : currentNumber - 1;
        } else {
            return;
        }

        event.preventDefault();
        closeDialog(activeDialog.id);
        openDialog(`Dialog-${nextNumber}`);
        return;
    }

    const galleryButtons = [...document.querySelectorAll(".gallery button")];
    const currentIndex = galleryButtons.indexOf(document.activeElement);

    if (currentIndex === -1 || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
        return;
    }

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + galleryButtons.length) % galleryButtons.length;

    event.preventDefault();
    galleryButtons[nextIndex].focus();
});

loadDialog();
