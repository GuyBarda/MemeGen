"use strict";

function renderMemeText(idx, txt) {
    setLine(idx, txt);
    renderCanvas();
}

function resizeCanvas(image = "") {
    const elContainer = document.querySelector(".canvas-container");
    if (!image) {
        gElCanvas.width = elContainer.offsetWidth / 2;
        gElCanvas.height = elContainer.offsetHeight / 2;
        return;
    }
    const img = new Image();
    img.src = image.url;
    let imgHeight = img.naturalHeight;
    let imgWidth = img.naturalWidth;
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = (elContainer.offsetWidth * imgHeight) / imgWidth;
}

function renderCanvas() {
    let meme = getMeme();
    if (!meme) {
        gCtx.fillStyle = "#ede5ff";
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
        return;
    }

    // render the image
    const img = new Image();
    img.src = meme.img.url;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);

    // render the lines
    meme.lines.forEach((line, idx) => {
        if (idx === meme.selectedLineIdx) drawText(line, true);
        else drawText(line);
    });
}

function drawText({ color, size, align, txt }, isSelected = false) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Poppins`;
    gCtx.textAlign = align;
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };
    if (align === "center") {
        gCtx.fillText(txt, center.x, 50);
        gCtx.strokeText(txt, center.x, 50);
    } else if (align === "left") {
        gCtx.fillText(txt, 10, 50);
        gCtx.strokeText(txt, 10, 50);
    } else if (align === "right") {
        gCtx.fillText(txt, gElCanvas.width - 10, 50);
        gCtx.strokeText(txt, gElCanvas.width - 10, 50);
    }
    if (isSelected) {
        // console.log(gCtx.measureText(txt));
        // console.log((gElCanvas.width - gCtx.measureText(txt).width) / 2);
        gCtx.strokeStyle = "grey";
        gCtx.strokeRect((gElCanvas.width - gCtx.measureText(txt).width) / 2, 50, gCtx.measureText(txt).width, size);
        gCtx.fillStyle = "orange";
    }
}

function onSwitchLine() {
    switchLine();
    renderCanvas();
}

function onDeleteLine(elInput) {
    deleteLine();
    elInput.value = "";
    renderCanvas();
}

function onChangeFont(action) {
    let meme = getMeme();
    // if (meme.lines[idx].size === 8 || meme.lines[idx].size === 24) return; //לץקן
    setFontSize(action);
    renderCanvas();
}

function onAlignText(align) {
    setTextAlign(align);
    renderCanvas();
}

function onSaveMeme() {
    saveMeme();
}

// function renderMeme() {
//     let meme = getMeme();
//     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };
//     gCtx.font = `${meme.lines[0].size}px ${settings.font}`;
//     gCtx.textAlign = `${meme.lines[0].align}`;
//     const text = gCtx.measureText(`${meme.lines[0].txt}`);
//     gCtx.fillText(`${meme.lines[0].txt}`, center.x - text.width / 2, 50);
// }
