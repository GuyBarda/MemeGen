"use strict";

var gMeme;

function createMeme(img) {
    return {
        img,
        selectedLineIdx: 0,
        lines: [createLine()],
    };
}

function createLine(txt = "", size = "35", align = "center", color = "white") {
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

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
    console.log(gMeme.selectedLineIdx);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    console.log(gMeme.lines);
}
function saveMeme() {
    gMemes.push(gMeme);
    saveMemesToStorage();
}

function saveMemesToStorage() {
    saveToStorage(memesKey, gMemes);
}

function setFontSize(action) {
    if (action === "+") gMeme.lines[gMeme.selectedLineIdx].size++;
    else gMeme.lines[gMeme.selectedLineIdx].size--;
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy;
}
