"use strict";

var gMeme;

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

function deleteLine(idx = 0) {
    gMeme.lines.splice(idx, 1);
    console.log(gMeme.lines);
}
function saveMeme() {
    gMemes.push(gMeme);
    saveMemesToStorage();
}

function saveMemesToStorage() {
    saveToStorage(memesKey, gMemes);
}

function setFontSize(action, idx = 0) {
    if (action === "+") gMeme.lines[idx].size++;
    else gMeme.lines[idx].size--;
}

function setTextAlign(align, idx = 0) {
    gMeme.lines[idx].align = align;
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy;
}
