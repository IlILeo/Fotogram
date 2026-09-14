const pictures = [{ image: "./img/Talk.png", alt: "Talk" }, { image: "./img/Leo-may.PNG", alt: "Leo May" }, { image: "./img/Leo-juni.PNG", alt: "Leo June" }, { image: "./img/Leo-juli.png", alt: "Leo July" }, { image: "./img/IlILeo__winter.png", alt: "Leo Winter" }, { image: "./img/IlILeobird.png", alt: "Leo Bird" }, { image: "./img/IlILeostar.png", alt: "Leo Star" }, { image: "./img/Leo bird.png", alt: "Leo Bird 2" }, { image: "./img/Leo_Birb.png", alt: "Leo Birb" }];
const gallery = document.querySelector(".gallery");
gallery.innerHTML = [pictures.slice(0, 1), pictures.slice(1, 4), pictures.slice(4)].map((group) => `<div class="gallery-pics">${group.map((picture) => `<button type="button" data-picture="${pictures.indexOf(picture)}" aria-label="${picture.alt} öffnen"><img src="${picture.image}" alt="${picture.alt}" loading="lazy"></button>`).join("")}</div>`).join("");
fetch("diealog.html").then((response) => response.text()).then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);
    const dialog = document.querySelector(".dialog");
    const show = (index) => { const picture = pictures[index]; dialog.querySelector("h3").textContent = picture.alt; dialog.querySelector("img").src = picture.image; dialog.querySelector("img").alt = picture.alt; dialog.querySelector(".count").textContent = `${index + 1}/${pictures.length}`; dialog.dataset.index = index; dialog.showModal(); };
    gallery.addEventListener("click", (event) => { const button = event.target.closest("[data-picture]"); if (button) show(+button.dataset.picture); });
    dialog.addEventListener("click", (event) => { const action = event.target.dataset.action; if (action === "close") dialog.close(); if (["prev", "next"].includes(action)) show((+dialog.dataset.index + (action === "next" ? 1 : -1) + pictures.length) % pictures.length); });
}).catch(console.error);
