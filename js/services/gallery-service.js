"use strict";

var gKeywordSearchCountMap = { funny: 0, cat: 0, dog: 0, baby: 0 };
var gImgs = createImages();
var gFilterBy = "";

function createImages() {
    let images = [];
    for (let i = 0; i < 18; i++) {
        images.push(createImage(i + 1, ["funny", "cat"]));
    }
    images[0].keywords = ["trump", "face", "funny", "usa"];
    images[1].keywords = ["dogs", "funny", "lick"];
    images[2].keywords = ["dog", "baby", "funny", "sleep", "bed"];
    images[3].keywords = ["cat", "sleep", "keyboard", "computer"];
    images[4].keywords = ["baby", "success", "punch", "sand"];
    images[5].keywords = ["guy", "history", "HS", "hands"];
    images[6].keywords = ["baby", "black", "surprised"];
    images[7].keywords = ["willy wonka", "face", "silly"];
    images[8].keywords = ["kid", "evil", "laugh", "grass"];
    images[9].keywords = ["obama", "black", "smile", "funny", "usa"];
    images[10].keywords = ["black", "guys", "kiss", "nohomo", "basketball"];
    images[11].keywords = ["Haim", "tzadik", "funny", "you"];
    images[12].keywords = ["leonardo dicaprio", "wine", "impressed"];
    images[13].keywords = ["morpheus ", "matrix", "black"];
    images[14].keywords = ["ned", "stark", "simple", "game of thrones", "hand"];
    images[15].keywords = ["startrek", "silly", "funny"];
    images[16].keywords = ["putin", "russia", "fingers", "walking"];
    images[17].keywords = ["buzz light year", "woody", "funny"];

    return images;
}

function createImage(id, keywords) {
    return {
        id,
        url: `meme-imgs-square/${id}.jpg`,
        keywords,
    };
}

function getImages() {
    let images = gImgs.filter((img) => img.keywords.some((keyword) => keyword.includes(gFilterBy)));
    return images;
}

function getImageById(id) {
    return gImgs.find((img) => img.id === id);
}

function setKeywordCount(keyword) {
    gKeywordSearchCountMap[keyword]++;
    console.log(gKeywordSearchCountMap);
}

function getKeywordCount(keyword) {
    return gKeywordSearchCountMap[keyword];
}
