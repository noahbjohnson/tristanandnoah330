/*
Javascript Api Mash-up Project
Noah Johnson & Tristan Shaffer
CS-330
Luther College- Dr. Brad Miller

Type: JS ECMA 6
Requires: Jquery
 */

let languageList = ['ermahgerd','leetspeak','vulcan'];
let requestsList = [];

class request{
    constructor(inputString,languageString){
        this.inputString = inputString;
        this.language = languageString;


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
    callAPI(){
        // call the api function to translate the uri
        this.apiResponse = funTranslate(this.language,this.url);

    }
}

function funTranslate(language,url){
    // create the full api call url and content blob
    // url = 'https://crossorigin.me/'.concat('http://api.funtranslations.com/translate/').concat(language).concat('.json');
    // blob = new Blob([JSON.stringify(uri)], {type : 'application/json'});
    // create the request object and return the response
    //apiRequest = new Request(url, {method: 'POST',mode: "no-cors"});
    response = fetch(url).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
    });
    //response = fetch(apiRequest);
    // response = fetchJsonp(apiRequest)
    //     .then(res => res.json())
    //     .then(json => console.log(json));

    console.log(response);
    return response
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
    current.callAPI();

    // update html content
    $('#inputText').val(''); // clears input box
    $('#outputText').val(current)

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




