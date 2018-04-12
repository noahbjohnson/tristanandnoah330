/*
Javascript Api Mash-up Project
Noah Johnson & Tristan Shaffer
CS-330
Luther College- Dr. Brad Miller

Type: JS ECMA 6
Requires: Jquery
 */

let languageList = [/*'ermahgerd',*/'leetspeak','vulcan','brooklyn','uk2us','us2uk','morse','cockney','fudd'];
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
        this.url = 'http://api.funtranslations.com/translate/'.concat(this.language).concat('.json?text=').concat(this.uriString);


    }
    toString(){
        return this.cleanString;
    }
    async callTranslate(){
        // call the api function to translate the uri
        this.response = funTranslate(this.url);
        //this.translatedString = apiResponse.contents
        // return this.apiResponse;
    }
}

async function funTranslate(url){
    // create the full api call url and content blob
    // url = 'https://crossorigin.me/'.concat('http://api.funtranslations.com/translate/').concat(language).concat('.json');
    // blob = new Blob([JSON.stringify(uri)], {type : 'application/json'});
    // create the request object and return the response
    //apiRequest = new Request(url, {method: 'POST',mode: "no-cors"});
    //let headers = new Headers;
    //let ip = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0);
    //headers.append('X-Forwarded-For', ip);


    await fetch(url).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
            buffer = data["contents"]["translated"];
            requestsList[requestsList.length -1].outputString = data["contents"]["translated"];
            document.getElementById('output').innerHTML = data["contents"]["translated"];
        });
    });
    //response = fetch(apiRequest);
    // response = fetchJsonp(apiRequest)
    //     .then(res => res.json())
    //     .then(json => console.log(json));

    console.log(buffer);
    return buffer
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




