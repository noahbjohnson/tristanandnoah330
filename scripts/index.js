/*
Javascript Api Mash-up Project
Noah Johnson & Tristan Shaffer
CS-330
Luther College- Dr. Brad Miller

Type: JS ECMA 6
Requires: Jquery
 */

let languageListFun = [/*'ermahgerd',*/'leetspeak','vulcan','brooklyn','uk2us','us2uk','morse','cockney','fudd'];
let languageListReal = ['Spanish','English','French','Catalan','German','Danish','Greek','Italian','Norwegian',];
let languageDictionaryReal = {'Afrikaans':'af','Catalan':'ca','Czech':'cs','Danish':'da','German':'de','Greek':'el','English':'en','Spanish':'es','French':'fr','Italian':'it','Norwegian':'nb'};
let requestsList = [];
let buffer = '';

class request{
    constructor(inputString,languageString){
        this.inputString = inputString;
        this.language = languageString;
        this.outputString = '';

        // Remove double spaces and trailing/leading spaces from the input string
        let workingString = this.inputString;
        while(workingString.lastIndexOf("  ") > -1){
            workingString = workingString.replace("  ", " ")
        }
        workingString = workingString.toLowerCase();
        workingString = workingString.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        this.cleanString = workingString;

        // create an api friendly string from the cleaned text
        this.uriString = encodeURI(this.cleanString);

        // create a full url for the api



    }
    toString(){
        return this.cleanString;
    }
    async callTranslate(){
        if(languageListFun.indexOf(this.language) > -1) {
            this.url = 'http://api.funtranslations.com/translate/'.concat(this.language).concat('.json?text=').concat(this.uriString);
            this.response = funTranslate(this.url);
        }else{
            this.url = 'https://translation.googleapis.com/language/translate/v2?q='.concat(this.uriString).concat('&key=AIzaSyC5p55eVsQ5yaOvHmdqjXrM3TsXwye017U&target=').concat(languageCode(this.language))
            this.outputString = googleTranslate(this.url)
        }
    }
}

async function funTranslate(url){
    try {
        await fetch(url).then((response) => {
            console.log(response);
            response.json().then((data) => {
                console.log(data);
                buffer = data["contents"]["translated"];
                requestsList[requestsList.length - 1].outputString = data["contents"]["translated"];
                document.getElementById('output').innerHTML = data["contents"]["translated"];
            });
        });
    }
    catch(error) {
        alert('Error! Have you exceeded the 5/hr limit for fun translations?')
    }
    console.log(buffer);
    return buffer
}

async function googleTranslate(url){
    await fetch(url).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
            console.log(data['data']["translations"][0]["translatedText"]);
            buffer = data['data']["translations"][0]["translatedText"];
            //buffer = data["contents"]["translated"];
            //requestsList[requestsList.length -1].outputString = data["contents"]["translated"];
            document.getElementById('output').innerHTML = buffer;
        });
    });
    console.log(buffer);
    return buffer
}

function languageCode(language){
    return languageDictionaryReal[language]
}


function clickedOn() { // handles the submit onclick
    let textInput = document.getElementById('inputText').value;
    let textLanguage = document.getElementById('language').value;

    // form validation
    if(textLanguage === null){
        alert("You must select a language");
        return 1
    }
    if(textInput === null){
        alert("You must input text");
        return 1
    }

    // create new request object and append to list
    requestsList.push(new request(textInput,textLanguage));

    // call the api
    let current = requestsList[requestsList.length -1];
    current.callTranslate();

    // update html content
    $('#inputText').val(''); // clears input box
}

function populateLanguageSelect(selectId, sList, group) {
    let sel = document.getElementById(selectId);
    let grp = document.createElement('optgroup');
    grp.label = group;
    for (let s of sList) {
        let opt = document.createElement("option");
        opt.value = s;
        opt.innerHTML = s;
        grp.appendChild(opt)
    }
    sel.appendChild(grp)
}


$( document ).ready(function() {
    populateLanguageSelect('language',languageListReal,'Real Languages');
    populateLanguageSelect('language',languageListFun,'Fun Languages')
});




