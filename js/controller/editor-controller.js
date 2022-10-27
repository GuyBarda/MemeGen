"use strict";

function renderMemeText(txt) {
    setLine(txt);
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
        drawLine(line, idx, meme.selectedLineIdx);
    });
}

function drawLine(line, idx, selectedLineIdx) {
    const { x, y, xRect, yRect } = setPositionByAlignAndIdx(line, idx);
    drawText(line, x, y);
    if (idx === selectedLineIdx) drawTextRect(xRect, yRect, gCtx.measureText(line.txt).width + 20, line.size);
}

function setPositionByAlignAndIdx({ align, txt, size }, idx) {
    let x = gElCanvas.width / 2;
    let y = 50;
    let xRect = (gElCanvas.width - gCtx.measureText(txt).width - 20) / 2;
    let yRect = 53 - size;

    if (idx === 1) {
        y = gElCanvas.height - 50;
        yRect = gElCanvas.height - 45 - size;
    } else if (idx >= 2) {
        y = gElCanvas.height / 2;
        yRect = gElCanvas.height / 2 - size + 5;
    }

    if (align === "left") {
        x = 10;
        xRect = 0;
    } else if (align === "right") {
        x = gElCanvas.width - 10;
        xRect = gElCanvas.width - gCtx.measureText(txt).width - 20;
    }

    return { x, y, xRect, yRect };
}

function drawText({ color, size, align, txt, strokeColor }, x, y) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Poppins`;
    gCtx.textAlign = align;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function drawTextRect(x, y, width, height) {
    gCtx.strokeStyle = "red";
    gCtx.strokeRect(x, y, width, height);
    gCtx.fillStyle = "orange";
}

function onSwitchLine() {
    const elInput = document.querySelector(".text");
    let value = switchLine();
    elInput.value = value;
    elInput.focus();
    renderCanvas();
}

function onDeleteLine() {
    deleteLine();
    document.querySelector(".text").value = "";
    renderCanvas();
}

function onAddLine() {
    const elInput = document.querySelector(".text");
    addLine();
    switchLine();
    elInput.value = "";
    elInput.focus();
    renderCanvas();
}

function onChangeFont(action) {
    setFontSize(action);
    document.querySelector(".text").focus();
    renderCanvas();
}

function onAlignText(align) {
    setTextAlign(align);
    document.querySelector(".text").focus();
    renderCanvas();
}

function onChangeStrokeColor(color) {
    changeStrokeColor(color);
    renderCanvas();
}

function onChangeColor(color) {
    changeColor(color);
    renderCanvas();
}

function onSaveMeme() {
    saveMeme();
}

function onDownloadMeme(elLink) {
    removeSelectedLine();
    renderCanvas();
    const data = gElCanvas.toDataURL();
    console.log("data", data);
    elLink.href = data;
    elLink.download = "My Meme";
}

// function renderMeme() {
//     let meme = getMeme();
//     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 };
//     gCtx.font = `${meme.lines[0].size}px ${settings.font}`;
//     gCtx.textAlign = `${meme.lines[0].align}`;
//     const text = gCtx.measureText(`${meme.lines[0].txt}`);
//     gCtx.fillText(`${meme.lines[0].txt}`, center.x - text.width / 2, 50);
// }
