// ==UserScript==
// @name         CCU 勞僱時數小工具
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在網頁上添加按鈕，按下後自動選擇 select 裡的指定 option
// @author       你
// @match        https://www026190.ccu.edu.tw/parttime/control2.php
// @grant        none
// ==/UserScript==
// TODO 建立時段array
// TODO 建立選擇星期array

(function() {

    const selectTargetValue = "L080大學甄選入學委員會"; // 學習暨勞僱單位
    const workinValue = "log分析";
    const timeSet = [{"start":{"hour":"08", "minute":"00"}, "end":{"hour":"12", "minute":"00"}}]


    function selectOption(iframeDocument) {
        let target = 'select[name="type"]';
        let selectElement = iframeDocument.querySelector('select[name="type"]');
        if (selectElement) {
            selectElement.value = selectTargetValue;
            selectElement.dispatchEvent(new Event('change')); // 觸發 change 事件
        } else {
            alert("找不到 <"+target+">");
        }
    }

    function workinKeyIn(iframeDocument) {
        let target = 'input[name="workin"]';
        let inputText = iframeDocument.querySelector(target);
        if (inputText) {
            inputText.value = workinValue;
        } else {
            alert("找不到 <"+target+">");
        }
    }

    function setTime(iframeDocument, n) {
        let target = 'input[name="shour"]';
        let shour = iframeDocument.querySelector(target);
        shour.value = timeSet[n].start.hour;

        target = 'input[name="smin"]';
        let smin = iframeDocument.querySelector(target);
        smin.value = timeSet[n].start.minute;

        target = 'input[name="ehour"]';
        let ehour = iframeDocument.querySelector(target);
        ehour.value = timeSet[n].end.hour;

        target = 'input[name="emin"]';
        let emin = iframeDocument.querySelector(target);
        emin.value = timeSet[n].end.minute;
    }



    function nextWeekday(iframeDocument,weekday){
        //根據當前年月日，選出下一個weekday
        let nowy =iframeDocument.querySelector('input[name="yy"]');
        let nowm =iframeDocument.querySelector('input[name="mm"]');
        let nowd =iframeDocument.querySelector('input[name="dd"]');
        nowy = parseInt(nowy);
        //TODO ing


    }

    function addWorkinButton(iframeDocument) {
        if (iframeDocument.getElementById("workin-button")) return; // 防止重複添加

        let button = iframeDocument.createElement("button");
        button.id = "workin-button";
        button.innerText = "自動填入勞雇單位與內容";
        button.style.position = "fixed";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.zIndex = "9999";
        button.style.padding = "10px";
        button.style.backgroundColor = "#28a745";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.addEventListener("click", () => {selectOption(iframeDocument);workinKeyIn(iframeDocument);});
        iframeDocument.body.appendChild(button);
    }



    function addSetTimeButton(iframeDocument) {
        if (iframeDocument.getElementById("set-time-button")) return; // 防止重複添加

        let button = iframeDocument.createElement("button");
        button.id = "set-time-button";
        button.innerText = "填入時段n";
        button.style.position = "fixed";
        button.style.top = "50px";
        button.style.right = "10px";
        button.style.zIndex = "9999";
        button.style.padding = "10px";
        button.style.backgroundColor = "#28a745";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.addEventListener("click", () => {nextWeekday(iframeDocument,0);});
        iframeDocument.body.appendChild(button);
    }


    function addNextWeekdayBtn(iframeDocument) {
        if (iframeDocument.getElementById("set-time-button")) return; // 防止重複添加

        let button = iframeDocument.createElement("button");
        button.id = "set-time-button";
        button.innerText = "填入時段n";
        button.style.position = "fixed";
        button.style.top = "90px";
        button.style.right = "10px";
        button.style.zIndex = "9999";
        button.style.padding = "10px";
        button.style.backgroundColor = "#28a745";
        button.style.color = "white";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";

        button.addEventListener("click", () => {nextWeekday(iframeDocument,0);});
        iframeDocument.body.appendChild(button);
    }


    function handleIframe() {
        console.log("running handle...")
        let iframe = document.querySelector('frame[name="main"]'); // 找到 name="main" 的 iframe
        if (iframe) {
            iframe.addEventListener("load", function () {
                let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDocument) {
                    addWorkinButton(iframeDocument);
                }
            });
            // 如果 iframe 已經載入，直接處理
            if (iframe.contentDocument) {
                addWorkinButton(iframe.contentDocument);
                addSetTimeButton(iframe.contentDocument);
                //addNextWeekdayBtn(iframe.contentDocument);
            }
        } else {
            console.warn("未找到 iframe[name='main']");
        }
    }
setTimeout(() => {
     handleIframe()},3000)
})();