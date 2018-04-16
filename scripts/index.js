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
    constructor(inputString,languageString){ // constructs the request class -- not to be confused with Request class which is a built-in
        this.inputString = inputString;
        this.language = languageString;
        this.outputString = ''; // Declare output for later assignment by translation function

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

    }
    toString(){ // returns the input, and if translated successfully, the output after
        if(outputString.length > 0) {
            return this.cleanString.concat(':').concat(outputString);
        }else{
            return this.cleanString
        }
    }
    async callTranslate(){ // determine which translate api to use and pass the call to the fetch function for the type
        if(languageListFun.indexOf(this.language) > -1) {
            this.url = 'http://api.funtranslations.com/translate/'.concat(this.language).concat('.json?text=').concat(this.uriString);
            this.response = funTranslate(this.url);
        }else{
            this.url = 'https://translation.googleapis.com/language/translate/v2?q='.concat(this.uriString).concat('&key=AIzaSyC5p55eVsQ5yaOvHmdqjXrM3TsXwye017U&target=').concat(languageCode(this.language))
            this.outputString = googleTranslate(this.url)
        }
    }
}

async function funTranslate(url){ // translates requests where the target language is in the 'fun list'
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

async function googleTranslate(url){ // translates request where the target language is a real language
    await fetch(url).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
            console.log(data['data']["translations"][0]["translatedText"]);
            buffer = data['data']["translations"][0]["translatedText"];
            document.getElementById('output').innerHTML = buffer;
        });
    });
    console.log(buffer);
    return buffer
}

function languageCode(language){ // returns the ISO language code for use in the google translate api call
    return languageDictionaryReal[language]
}

function storeRequests(){ // stores the list of requests
    localStorage.setItem("Requests",JSON.stringify(requestsList))
}

function loadRequests() {
    if(localStorage.getItem("Requests")) {
        requestsList = JSON.parse(localStorage.getItem("Requests"))
    }
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
    if(textInput.length > 2500){
        alert("input too long!");
        return 1
    }

    // create new request object and append to list
    requestsList.push(new request(textInput,textLanguage));

    // call the api
    let current = requestsList[requestsList.length -1];
    current.callTranslate();

    $('#inputText').val(''); // clears input box

    // Store updated request list in local 'Requests'
    storeRequests();

}

function populateLanguageSelect(selectId, sList, group) { // populates a drop-down with sections
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
    // Populate the language options on page ready
    populateLanguageSelect('language',languageListReal,'Real Languages');
    populateLanguageSelect('language',languageListFun,'Fun Languages');

    // Load history from local
    loadRequests()
});




