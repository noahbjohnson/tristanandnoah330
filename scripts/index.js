/*
Javascript Api Mash-up Project
Noah Johnson & Tristan Shaffer
CS-330
Luther College- Dr. Brad Miller

Type: JS ECMA 6
Requires: Jquery
 */

let languageList = ['ermagherd','leetspeak','vulcan'];
let requestsList = [];

class request{
    constructor(inputString,languageString){
        this.inputString = inputString;
        this.len = length(this.inputString);


        // Remove double spaces and trailing/leading spaces from the input string
        let workingString = this.inputString;
        while(workingString.lastIndexOf("  ") > -1){
            workingString = workingString.replace("  ", " ")
        }
        workingString = workingString.toLowerCase();
        workingString = workingString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        this.cleanString = workingString;
        this.uriString = encodeURI(this.cleanString);
    }
    toString(){
        return this.cleanString;
    }
}

function funTranslate(language,text='ermahgerd'){

}

function clickon() {
    let textInput = document.getElementById('inputText').value;
    let textLanguage = document.getElementById('language').value;
}

function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId);
    for (let s of sList) {
        let opt = document.createElement("option");
        opt.value = s;
        opt.innerHTML = s;
        sel.appendChild(opt)
    }
}


$( document ).ready(function() {
    populateSelect('language',languageList)
});




