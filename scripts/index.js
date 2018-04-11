/*
Javascript Api Mash-up Project
Noah Johnson & Tristan Shaffer
CS-330
Luther College- Dr. Brad Miller

Type: JS ECMA 6
 */

class request{
    constructor(inputString){
        this.inputString = inputString;
        this.length = length(this.inputString);


        // Remove double spaces and trailing/leading spaces from the input string
        let workingString = this.inputString;
        while(workingString.lastIndexOf("  ") > -1){
            workingString = workingString.replace("  ", " ")
        }
        workingString = workingString.toLowerCase();

    }
    toString(){
        return this.inputString;
    }

}

