"use strict";

var gElCanvas, gCtx;

function onInit() {
    gElCanvas = document.querySelector("canvas");
    gCtx = gElCanvas.getContext("2d");

    gFilterBy = "";
    gMemes = [];
    gMeme = null;
    gKeywordSearchCountMap = { funny: 0, cat: 0, dog: 0, baby: 0 };

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
    document.querySelector(".images-container").innerHTML = strHTMLs.join("");
}

function onShowGallery() {
    document.querySelector(".gallery").classList.remove("hidden");
    document.querySelector(".editor").classList.add("hidden");
    document.querySelector(".memes").classList.add("hidden");
}

function onShowMemes() {
    document.querySelector(".gallery").classList.add("hidden");
    document.querySelector(".editor").classList.add("hidden");
    document.querySelector(".memes").classList.remove("hidden");
    renderMemes();
}

function openEditor(id) {
    let img = getImageById(id);
    document.querySelector(".gallery").classList.add("hidden");
    document.querySelector(".editor").classList.remove("hidden");
    document.querySelector(".memes").classList.add("hidden");
    setMeme(img);
    resizeCanvas(img);
    renderCanvas();
}

function onFilterBy(filterBy) {
    setFilterBy(filterBy);
    renderImgaes();
}

function onFilterButton(elbtn, filterBy) {
    setFilterBy(filterBy);
    setKeywordCount(filterBy);
    console.log(getKeywordCount());
    elbtn.style.fontSize += getKeywordCount() + "px";
    // console.log(elbtn.style.fontSize);
    renderImgaes();
}

function renderMemes() {
    let memes = getSavedMemes();
    const elMemes = document.querySelector(".memes");
    if (!memes || !memes.length) {
        elMemes.innerHTML = "Save some memes so you can edit them later";
        return;
    }

    let strHTMLs = memes.map(({ img, id }) => `<img src="${img.url}" alt="" onclick="onContinueEdit('${id}')"/>`);
    elMemes.innerHTML = strHTMLs.join();
}
