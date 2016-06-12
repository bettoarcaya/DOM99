//readTextFile.js
/*jslint
    es6, maxerr: 15, browser, devel, fudge, maxlen: 100
*/
/*global
    dom99, FileReader, Promise
*/
const readTextFile = (function (D) {
    "use strict";

    const fileInputDescription = {
        "tagName": "input",
        "type": "file",
        "data-fx": "xReadFileStart"
    };

    const readerOnLoadPrepare = function (inputElement) {
        return function (event) {
            inputElement.remove();
            inputElement.readFileResolve(event.target.result);
        };
    };

    D.fx.xReadFileStart = function (event) {
        const fileObject = event.target.files[0]; // FileList object
        const reader = new FileReader();
        reader.onload = readerOnLoadPrepare(event.target);
        reader.readAsText(fileObject);
    };

    const readFileSetup = function (resolve, reject) {
        const fileInput = D.createElement2(fileInputDescription);
        fileInput.readFileResolve = resolve;
        fileInput.readFileReject = reject;
        D.linkJsAndDom(fileInput);
        D.el.readTextFileContainer.appendChild(fileInput);
        fileInput.click();
    };

    return function () {
        return new Promise(readFileSetup);
    };
}(dom99));