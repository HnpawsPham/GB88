const slides = document.getElementById("slides");
const dotContainer = document.getElementById("dots");
const imgs = slides.querySelectorAll("img");
const total = imgs.length;
let index = 0;
let auto = null;

function renderDots() {
    for (let i = 0; i < total; i = i + 1) {
        const d = document.createElement("div");
        d.dataset.i = i;
        d.onclick = () => go(i);
        dotContainer.appendChild(d);
    }
}

function update() {
    slides.style.transform = `translateX(${index * -100}%)`;
    const dots = dotContainer.children;
    for (let i = 0; i < total; i = i + 1)
        dots[i].classList.toggle("active", i === index);
}

function next() {
    index = (index + 1) % total;
    update();
}

function prev() {
    index = (index - 1 + total) % total;
    update();
}

function go(i) {
    index = i;
    update();
}

function autoPlay() {
    clearInterval(auto);
    auto = setInterval(next, 3000);
}

document.getElementById("next").onclick = () => {
    next();
    autoPlay();
};
document.getElementById("prev").onclick = () => {
    prev();
    autoPlay();
};

renderDots();
update();
autoPlay();
