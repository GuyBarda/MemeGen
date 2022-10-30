"use strict";

const memesKey = "MemesKey";

var gMemes = loadFromStorage(memesKey) || [];

function getSavedMemes() {
    return gMemes;
}

function saveMeme() {
    let meme = getMeme();
    gMemes.push(meme);
    saveMemesToStorage();
}

function saveMemesToStorage() {
    saveToStorage(memesKey, gMemes);
}

function getMemeById(id) {
    return gMemes.find((meme) => meme.id === id);
}
