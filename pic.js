const pictures = [
    { image: "./img/talk.png", alt: "Talk" },
    { image: "./img/Leo-may.PNG", alt: "Leo May" },
    { image: "./img/Leo-juni.PNG", alt: "Leo June" },
    { image: "./img/Leo-juli.png", alt: "Leo July" },
    { image: "./img/IlILeo__winter.png", alt: "Leo Winter" },
    { image: "./img/IlILeobird.png", alt: "Leo Bird" },
    { image: "./img/IlILeostar.png", alt: "Leo Star" },
    { image: "./img/Leo bird.png", alt: "Leo Bird 2" },
    { image: "./img/Leo_Birb.png", alt: "Leo Birb" }
];

let current = 0;
const gallery = document.querySelector(".gallery");

fetch("diealog.html")
    .then((response) => response.text())
    .then((dialogHtml) => {
        document.body.insertAdjacentHTML("afterbegin", dialogHtml);

        const dialog = document.querySelector("#dialog");
        const title = document.querySelector("#dialog-title");
        const image = document.querySelector("#dialog-image");
        const counter = document.querySelector("#dialog-counter");

        function showPicture(index) {
            current = (index + pictures.length) % pictures.length;

            const picture = pictures[current];
            title.textContent = picture.alt;
            image.src = picture.image;
            image.alt = picture.alt;
            counter.textContent = `${current + 1}/${pictures.length}`;

            dialog.showModal();
        }

        let row;
        pictures.forEach((picture, index) => {
            if (index === 0 || index === 1 || index === 4) {
                row = document.createElement("div");
                row.className = "gallery-pics";
                gallery.append(row);
            }

            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("aria-label", `${picture.alt} öffnen`);

            const photo = document.createElement("img");
            photo.src = picture.image;
            photo.alt = picture.alt;
            photo.loading = "lazy";

            button.append(photo);
            button.onclick = () => showPicture(index);
            row.append(button);
        });

        document.querySelector("#dialog-close").onclick = () => dialog.close();
        document.querySelector("#dialog-prev").onclick = () => showPicture(current - 1);
        document.querySelector("#dialog-next").onclick = () => showPicture(current + 1);

        document.addEventListener("keydown", (event) => {
            if (!dialog.open) {
                return;
            }

            if (event.key === "ArrowLeft") {
                showPicture(current - 1);
            } else if (event.key === "ArrowRight") {
                showPicture(current + 1);
            }
        });
});
