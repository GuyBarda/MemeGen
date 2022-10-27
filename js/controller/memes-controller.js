"use strict";

function onContinueEdit(id) {
    console.log("continue");
    let meme = getMemeById(id);
    setMemeFromMemes(meme);
    document.querySelector(".gallery").classList.add("hidden");
    document.querySelector(".editor").classList.remove("hidden");
    document.querySelector(".memes").classList.add("hidden");
    resizeCanvas(meme.img);
    renderCanvas();
}
