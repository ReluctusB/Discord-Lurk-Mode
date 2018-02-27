// ==UserScript==
// @name         DiscordLurkMode
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Adds a lurk mode, which disables Discord's text box. Now 20% more sylish!
// @author       RB
// @match        https://discordapp.com/*
// @grant        none
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/ReluctusB/Discord-Lurk-Mode/master/DiscordLurkMode.user.js
// @downloadURL  https://raw.githubusercontent.com/ReluctusB/Discord-Lurk-Mode/master/DiscordLurkMode.user.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function createBox() {
    if (document.getElementsByTagName('textarea')[0]){
        var outDiv = document.createElement("DIV");
        outDiv.className = "lurkDiv";
        var outLabel = document.createElement("LABEL");
        outLabel.className = "lurkSwitch";
        var outSpan = document.createElement("SPAN");
        outSpan.className = "lurkSlider round";
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.id = "checker";
        addGlobalStyle('.lurkSwitch {position: relative; display: inline-block; width: 25px; height: 15px;}');
        addGlobalStyle('.lurkSwitch input {display:none;}');
        addGlobalStyle('.lurkSlider {position: absolute;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .2s;transition: .2s;}');
        addGlobalStyle('.lurkSlider:before {position: absolute;content: "";height: 15px; width: 15px;left: 0px;bottom: 0px;background-color: white;-webkit-transition: .2s;transition: .2s;}');
        addGlobalStyle('input:checked + .lurkSlider {background-color: #8B0000;}');
        addGlobalStyle('input:focus + .lurkSlider {box-shadow: 0 0 1px #8B0000;}');
        addGlobalStyle('input:checked + .lurkSlider:before {-webkit-transform: translateX(10px);-ms-transform: translateX(10px);transform: translateX(10px);}');
        addGlobalStyle('.lurkSlider.round {border-radius: 20px;}');
        addGlobalStyle('.lurkSlider.round:before {border-radius: 50%;}');
        addGlobalStyle('.lurkDiv {position:absolute;bottom:17px;left:170px;zIndex:5}');
        var appFront = document.getElementById('app-mount');
        appFront.parentNode.insertBefore(outDiv, appFront.nextSibling);
        outDiv.appendChild(outLabel);
        outLabel.appendChild(checkBox);
        outLabel.appendChild(outSpan);
    } else {
        setTimeout(createBox,1000);
    }
}

function recheck(){
    var messageBox = document.getElementsByTagName('textarea')[0];
    if (document.getElementById('checker').checked === true) {
        messageBox.setAttribute('disabled', true);
    } else {
        messageBox.removeAttribute('disabled');}
}

window.addEventListener("load", createBox, false);
window.addEventListener("click", recheck, false);
