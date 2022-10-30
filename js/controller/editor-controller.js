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
    console.log('xrect', xRect);
    
    setLinePos({xRect, yRect, width: gCtx.measureText(line.txt).width + 20})
    drawText(line, x, y);
    if (idx === selectedLineIdx)
        drawTextRect(
            line.strokeColor,
            xRect,
            yRect,
            gCtx.measureText(line.txt).width + 20,
            line.size
        );
}

function setPositionByAlignAndIdx({ align, txt, size }, idx) {
    console.log(txt);
    
    console.log('txt',gCtx.measureText(txt).width);
    
    let x = gElCanvas.width / 2;
    let y = 80;
    let xRect = (gElCanvas.width - gCtx.measureText(txt).width - 20) / 2;
    let yRect = 85 - size;

    if (idx === 1) {
        y = gElCanvas.height - 80;
        yRect = gElCanvas.height - 75 - size;
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

function drawTextRect(color, x, y, width, height) {
    gCtx.strokeStyle = color;
    gCtx.strokeRect(x, y, width, height);
    console.log(height);
    
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

function addMouseListeners() {
    gElCanvas.addEventListener("mousemove", onMove);
    gElCanvas.addEventListener("mousedown", onDown);
    gElCanvas.addEventListener("mouseup", onUp);
}

function onDown(ev) {
    // console.log("Im from onDown");
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev);
    console.log(gMeme.lines[gMeme.selectedLineIdx].pos);
    
    console.log('click', pos);
    
    if(isLineClicked(pos)) console.log('clicked the line');
    
    // if (!isLineClicked(pos)) return;
    setLineDrag(true);
    //Save the pos we start from
    // gStartPos = pos;
    document.body.style.cursor = "grabbing";
}

function onMove(ev) {
    // console.log("Im from onMove");
    // const { isDrag } = getCircle();
    // if (!isDrag) return;
    // const pos = getEvPos(ev);
    // //Calc the delta , the diff we moved
    // const dx = pos.x - gStartPos.x;
    // const dy = pos.y - gStartPos.y;
    // moveCircle(dx, dy);
    // //Save the last pos , we remember where we`ve been and move accordingly
    // gStartPos = pos;
    // //The canvas is render again after every move
    // renderCanvas();
}

function onUp() {
    console.log("Im from onUp");
    setLineDrag(false);
    document.body.style.cursor = "grab";
}

function getEvPos(ev) {
    return { x: ev.offsetX, y: ev.offsetY };
}
