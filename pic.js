const pictures = [
    { image: "./img/Talk.png", alt: "Talk" },
    { image: "./img/Leo-may.PNG", alt: "Leo May" },
    { image: "./img/Leo-juni.PNG", alt: "Leo June" },
    { image: "./img/Leo-juli.png", alt: "Leo July" },
    { image: "./img/IlILeo__winter.png", alt: "Leo Winter" },
    { image: "./img/IlILeobird.png", alt: "Leo Bird" },
    { image: "./img/IlILeostar.png", alt: "Leo Star" },
    { image: "./img/Leo bird.png", alt: "Leo Bird 2" },
    { image: "./img/Leo_Birb.png", alt: "Leo Birb" }
];

function renderGallery() {
    const gallery = document.querySelector(".gallery");
    const galleryGroups = [
        pictures.slice(0, 1),
        pictures.slice(1, 4),
        pictures.slice(4)
    ];

    galleryGroups.forEach((group) => {
        const galleryPics = document.createElement("div");
        galleryPics.classList.add("gallery-pics");

        group.forEach((picture) => {
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", `${picture.alt} öffnen`);
            button.addEventListener("click", () => openDialog(pictures.indexOf(picture)));

            const image = document.createElement("img");
            image.src = picture.image;
            image.alt = picture.alt;
            image.loading = "lazy";

            button.appendChild(image);
            galleryPics.appendChild(button);
        });

        gallery.appendChild(galleryPics);
    });
}

async function loadDialog() {
    const response = await fetch("diealog.html");

    if (!response.ok) {
        throw new Error(`Dialoge konnten nicht geladen werden: ${response.status}`);
    }

    const html = await response.text();
    document.body.insertAdjacentHTML("afterbegin", html);
    document.querySelectorAll(".dialog").forEach((dialog) => {
        dialog.addEventListener("close", () => dialog.classList.remove("opened"));
    });
}

function openDialog(index) {
    const dialogId = typeof index === "string" ? index : `Dialog-${index + 1}`;
    const dialog = document.getElementById(dialogId);

    if (dialog) {
        document.querySelectorAll(".dialog[open]").forEach((openDialogElement) => {
            if (openDialogElement !== dialog) {
                openDialogElement.close();
            }
        });
        dialog.showModal();
        dialog.classList.add("opened");
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
        const currentIndex = Number(activeDialog.id.replace("Dialog-", "")) - 1;
        const direction = event.key === "ArrowRight" ? 1 : -1;

        if (!["ArrowLeft", "ArrowRight"].includes(event.key)) {
            return;
        }

        event.preventDefault();
        closeDialog(activeDialog.id);
        openDialog((currentIndex + direction + pictures.length) % pictures.length);
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

renderGallery();
loadDialog().catch((error) => {
    console.error(error);
});
