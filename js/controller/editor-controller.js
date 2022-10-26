"use strict";

function renderMemeText(idx, txt) {
    setLine(idx, txt);
    renderCanvas();
}

function resizeCanvas() {
    const elContainer = document.querySelector(".editor");
    gElCanvas.width = elContainer.offsetWidth / 2;
    gElCanvas.height = elContainer.offsetHeight / 2;
}

function renderCanvas() {
    let meme = getMeme();
    if (!meme) {
        gCtx.fillStyle = "#ede5ff";
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
        return;
    }

    const img = new Image();
    img.src = meme.img.url;
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // console.log(img);

    let imgHeight = img.naturalHeight;
    let imgWidth = img.naturalWidth;
    const elContainer = document.querySelector(".editor-mode");
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = (elContainer.offsetWidth * imgHeight) / imgWidth;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

    meme.lines.forEach((line) => {
        drawText(line);
    });
}

function drawText(line) {
    console.log(line);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, 100, 100); // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, 100, 100); // Draws (strokes) a given text at the given (x, y) position.
}

function onDeleteLine(elInput, idx = 0) {
    deleteLine(idx);
    elInput.value = "";
    renderCanvas();
}

function onChangeFont(action, idx = 0) {
    let meme = getMeme();
    if (meme.lines[idx].size === 8 || meme.lines[idx].size === 24) return;
    setFontSize(action);
    renderCanvas();
}

function onAlignText(align, idx = 0) {
    setTextAlign(align);
    renderCanvas();
}

function onSaveMeme() {
    saveMeme();
}

// function resizeAndRenderCanvas(imgId) {
//     var photo = getImg(imgId);
//     const img = new Image();
//     // console.log(photo.img.url);
//     img.src = "img/" + photo.url;
//     var ratio = img.naturalHeight / img.naturalWidth;
//     let imgHeight = img.naturalHeight;
//     let imgWidth = img.naturalWidth;
//     const elContainer = document.querySelector(".canvas-container");
//     gElCanvas.width = elContainer.offsetWidth;
//     gElCanvas.height = (elContainer.offsetWidth * imgHeight) / imgWidth;
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }
