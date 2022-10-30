"use strict";

function onContinueEdit(id) {
    let meme = getMemeById(id);
    setMemeFromMemes(meme);
    document.querySelector('.text').value = meme.lines[meme.selectedLineIdx].txt;
    document.querySelector(".gallery").classList.add("hidden");
    document.querySelector(".editor").classList.remove("hidden");
    document.querySelector(".memes").classList.add("hidden");
    resizeCanvas(meme.img);
    renderCanvas();
}
