"use strict";

const memesKey = "MemesKey";
var gKeywordSearchCountMap = { funny: 0, cat: 0, baby: 0 };
var gImgs = createImages();
var gMeme;
var gMemes = [];

function createImages() {
    let images = [];
    for (let i = 0; i < 18; i++) {
        images.push(createImage(i + 1, ["funny", "cat"]));
    }
    return images;
}

function createImage(id, keywords) {
    return {
        id,
        url: `meme-imgs-square/${id}.jpg`,
        keywords,
    };
}

function createMeme(img) {
    return {
        img,
        selectedLineIdx: 0,
        lines: [createLine()],
    };
}

function createLine(txt = "", size = "16", align = "center", color = "white") {
    return {
        txt,
        size,
        align,
        color,
    };
}

function getMeme() {
    return gMeme;
}

function setMeme(img = null) {
    gMeme = createMeme(img);
}

function setLine(idx, txt) {
    if (!gMeme.lines.length) gMeme.lines.push(createLine(txt));
    gMeme.lines[idx].txt = txt;
}

function getImages() {
    return gImgs;
}

function getImageById(id) {
    return gImgs.find((img) => img.id === id);
}

function deleteLine(idx = 0) {
    gMeme.lines.splice(idx, 1);
    console.log(gMeme.lines);
}
function saveMeme() {
    gMemes.push(gMeme);
    saveMemesToStorage();
}

function saveMemesToStorage() {
    saveToStorage(gMemes, memesKey);
}

function setFontSize(action, idx = 0) {
    if (action === "+") gMeme.lines[idx].size++;
    else gMeme.lines[idx].size--;
}

function setTextAlign(align, idx = 0) {
    gMeme.lines[idx].align = align;
}
