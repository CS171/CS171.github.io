function divWithText(text) {
    var result = document.createElement("div");
    var textNode = document.createTextNode(text);
    result.appendChild(textNode);
    return result;
}

// Styling the text by setting the position and color.
function textAt(text, x, y) {
    var node = divWithText(text);
    node.setAttribute("style", "position:absolute; left: " + x + "px; top: " + y + "px; color: rgb(" + text + ", " + 0 + ", 0)");
    return node;
}

function radians(v) {
    return v * (Math.PI / 180);
}