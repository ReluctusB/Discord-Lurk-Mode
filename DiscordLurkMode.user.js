// ==UserScript==
// @name         DiscordLurkMode
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Adds a lurk mode, which disables Discord's text box. Now 20% more sylish!
// @author       RB
// @match        https://discordapp.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/ReluctusB/Discord-Lurk-Mode/master/DiscordLurkMode.user.js
// @downloadURL  https://raw.githubusercontent.com/ReluctusB/Discord-Lurk-Mode/master/DiscordLurkMode.user.js
// ==/UserScript==

function createBox() {
    if (document.getElementsByTagName('textarea')[0]){
        var frag = document.createDocumentFragment();
        var outDiv = document.createElement("DIV");
        outDiv.className = "lurkDiv";
        var outLabel = document.createElement("LABEL");
        outLabel.className = "lurkSwitch";
        var outSpan = document.createElement("SPAN");
        outSpan.className = "lurkSlider round";
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.id = "checker";
        var style = document.createElement("style");
		var sheet = document.head.appendChild(style).sheet;
        sheet.insertRule('.lurkSwitch {position: relative; display: inline-block; width: 25px; height: 15px;}',sheet.cssRules.length);
        sheet.insertRule('.lurkSwitch input {display:none;}',sheet.cssRules.length);
        sheet.insertRule('.lurkSlider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .2s;transition: .2s;}',sheet.cssRules.length);
        sheet.insertRule('.lurkSlider:before {position: absolute;content: "";height: 15px; width: 15px;left: 0px;bottom: 0px;background-color: white;-webkit-transition: .2s;transition: .2s;}',sheet.cssRules.length);
        sheet.insertRule('input:checked + .lurkSlider {background-color: #8B0000;}',sheet.cssRules.length);
        sheet.insertRule('input:focus + .lurkSlider {box-shadow: 0 0 1px #8B0000;}',sheet.cssRules.length);
        sheet.insertRule('input:checked + .lurkSlider:before {-webkit-transform: translateX(10px);-ms-transform: translateX(10px);transform: translateX(10px);}',sheet.cssRules.length);
        sheet.insertRule('.lurkSlider.round {border-radius: 20px;}',sheet.cssRules.length);
        sheet.insertRule('.lurkSlider.round:before {border-radius: 50%;}',sheet.cssRules.length);
        sheet.insertRule('.lurkDiv {position:absolute;bottom:17px;left:170px;zIndex:5}',sheet.cssRules.length);
        frag.appendChild(outDiv);
        outDiv.appendChild(outLabel);
        outLabel.appendChild(checkBox);
        outLabel.appendChild(outSpan);
        var appFront = document.getElementById('app-mount');
        appFront.parentNode.insertBefore(frag, appFront.nextSibling);
    } else {
        setTimeout(createBox,1000);
    }
}

function recheck(){
    var messageBox = document.getElementsByTagName('textarea')[0];
    if (messageBox) {
        if (document.getElementById('checker').checked === true) {
            messageBox.setAttribute('disabled', true);
        } else {
            messageBox.removeAttribute('disabled');}
    }
}

window.addEventListener("load", createBox, false);
window.addEventListener("click", recheck, false);
