"use strict";

var gElCanvas, gCtx;

function onInit() {
    gElCanvas = document.querySelector("canvas");
    gCtx = gElCanvas.getContext("2d");

    renderImgaes();
    resizeCanvas();
    renderCanvas();
}

function renderImgaes() {
    let images = getImages();
    let strHTMLs = images.map(
        ({ id, url }) =>
            `
            <img src="${url}" alt="" style="" onclick="openEditor(${id})"/>
            `
    );
    document.querySelector(".images-container").innerHTML = strHTMLs.join();
}

function openEditor(id) {
    let img = getImageById(id);
    document.querySelector(".gallery").classList.add("hidden");
    document.querySelector(".editor").classList.remove("hidden");
    setMeme(img);
    resizeCanvas();
    renderCanvas();
}

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
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    console.log(img);
    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    //     console.log(img);
    // };

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

function onSaveMeme() {
    saveMeme();
}
