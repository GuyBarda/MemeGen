"use strict";

var gMemes = loadFromStorage(memesKey) || [];
console.log(gMemes);

function getSavedMemes() {
    return gMemes;
}

function saveMeme() {
    let meme = getMeme();
    console.log(gMemes);
    gMemes.push(meme);
    saveMemesToStorage();
}

function saveMemesToStorage() {
    saveToStorage(memesKey, gMemes);
}
