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

function setLine(txt) {
    if (!gMeme.lines.length) gMeme.lines.push(createLine(txt));
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function addLine() {
    gMeme.lines.push(createLine());
    console.log(gMeme);
}

function switchLine() {
    gMeme.selectedLineIdx++;
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function removeSelectedLine() {
    gMeme.selectedLineIdx = -1;
    setTimeout(() => (gMeme.selectedLineIdx = 0), 1);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
    console.log(gMeme.lines);
}

function setFontSize(action) {
    const { lines, selectedLineIdx } = gMeme;
    if (action === "+" && lines[selectedLineIdx].size <= 40) lines[selectedLineIdx].size++;
    else if (action === "-" && lines[selectedLineIdx].size >= 20) lines[selectedLineIdx].size--;
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy;
}
