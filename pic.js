const pictures = [{ image: "./img/Talk.png", alt: "Talk" }, { image: "./img/Leo-may.PNG", alt: "Leo May" }, { image: "./img/Leo-juni.PNG", alt: "Leo June" }, { image: "./img/Leo-juli.png", alt: "Leo July" }, { image: "./img/IlILeo__winter.png", alt: "Leo Winter" }, { image: "./img/IlILeobird.png", alt: "Leo Bird" }, { image: "./img/IlILeostar.png", alt: "Leo Star" }, { image: "./img/Leo bird.png", alt: "Leo Bird 2" }, { image: "./img/Leo_Birb.png", alt: "Leo Birb" }];
let current = 0;
const gallery = document.querySelector(".gallery");
fetch("diealog.html").then((response) => response.text()).then((dialogFile) => {
document.body.insertAdjacentHTML("afterbegin", dialogFile);
const dialog = document.querySelector("#dialog"), title = document.querySelector("#dialog-title"), image = document.querySelector("#dialog-image"), counter = document.querySelector("#dialog-counter");
function show(index) { current = (index + pictures.length) % pictures.length; const picture = pictures[current]; title.textContent = picture.alt; image.src = picture.image; image.alt = picture.alt; counter.textContent = `${current + 1}/${pictures.length}`; dialog.showModal(); dialog.classList.add("opened"); }
const groups = [0, 1, 4]; pictures.forEach((picture, index) => { const button = document.createElement("button"), photo = document.createElement("img"); button.type = "button"; button.setAttribute("aria-label", `${picture.alt} öffnen`); photo.src = picture.image; photo.alt = picture.alt; photo.loading = "lazy"; button.append(photo); button.onclick = () => show(index); const row = groups.includes(index) ? document.createElement("div") : gallery.lastElementChild; if (groups.includes(index)) { row.className = "gallery-pics"; gallery.append(row); } row.append(button); });
document.querySelector("#dialog-close").onclick = () => dialog.close();
document.querySelector("#dialog-prev").onclick = () => show(current - 1);
document.querySelector("#dialog-next").onclick = () => show(current + 1);
document.addEventListener("keydown", (event) => { if (dialog.open && ["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); show(current + (event.key === "ArrowRight" ? 1 : -1)); } });
});
