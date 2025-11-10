const video = document.querySelector("#intro>video");
const options = document.getElementById("options");
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const memeImg = document.getElementById("meme");
const phoneInp = document.getElementById("phone-inp");
const okBtn = document.querySelector("#phone-inp>button");

video.addEventListener("timeupdate", () => {
    if (video.currentTime >= video.duration - 0.1)
        options.style.display = "flex";
});

let noClickCnt = 0;
let memes = [
    "./assets/meme/meme1.webp",
    "./assets/meme/meme2.jpg"
];

noBtn.addEventListener("click", () => {
    noClickCnt++;
    if (noClickCnt <= memes.length) {
        memeImg.src = memes[noClickCnt - 1];
        memeImg.style.display = "block";

        yesBtn.disabled = true;
        noBtn.disabled = true;

        setTimeout(() => {
            memeImg.style.display = "none";
            
            yesBtn.disabled = false;
            noBtn.disabled = false;
        }, 2000);
    }
    else if (noClickCnt >= 3 && noClickCnt < 6) {
        options.classList.toggle("swap-buttons");
    }
    else {
        yesBtn.textContent = "Có";
        noBtn.textContent = "Có";

        noBtn.addEventListener("click", () => {
            phoneInp.style.display = "flex";
        })
    }
})

yesBtn.addEventListener("click", () => {
    phoneInp.style.display = "flex";
})

okBtn.addEventListener("click", () => {
    phoneInp.style.display = "none";
    options.style.display = "none";
})

