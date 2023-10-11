// find the keyword this: aria-labelledby. This will show the expandables like general and etc.
// When you find scrape general form this make sure to take off -expand




console.log("before reading file");
var specifications;
//html txt file





function ifCarExist(htmlString){
    
    
    //Vehicle details not available yet looks for this tring. If not then we return false and stop the search immediatly
    for(var i = 0; i < htmlString; i++){
        if(htmlString[i]=='n' && htmlString[i+1]=='o' && htmlString[i+2]=='t' && htmlString[i+3]==' '&&htmlString[i+4]=='a'
        && htmlString[i+5] =='v' && htmlString[i+6] == 'a' && htmlString[i+7] == 'i' && htmlString[i+8] =='l' &&
        htmlString[i+9] == 'a' && htmlString[i+10] == 'b'){
            return false;
        }
    }

    return true;
}


function getSpecificationLabels(htmlString){
    //put the specifications into an array and send them to the mongoDB file
    var specification = [];
    var j = 0;
    for(var i  =0; i < htmlString.length; i++){
        if(htmlString[i]=='a' && htmlString[i+1]=='r' && htmlString[i+2]=='i' && htmlString[i+3]=='a'&&htmlString[i+4]=='-'
        && htmlString[i+5] =='l' && htmlString[i+6] == 'a' && htmlString[i+7] == 'b' && htmlString[i+8] =='e' &&
        htmlString[i+9] == 'l' && htmlString[i+10] == 'l'){
            i+=16 + 1
            specification[j++] = extractWord(htmlString, i, 'aria');
        }
    }
    specification = specification.map((str) => deleteExpandString(str));
    //printArray(specification);
    return specification;
}

function populateCarLabel(htmlString){
    var innerArray = [];
    var carSubLabels = [];
    var j = 0;
    var createEmptyArr = true;
        // use the same algo from above but instead find this text
        //w-2/5
        //then extract the word of course.. like Make, Model, Model Year
    for(var i = 0; i < htmlString.length; i++){
        if(htmlString[i]=='2' && htmlString[i+1]=='/' && htmlString[i+2]=='5'){
            i+=5;
            innerArray[j++] = extractWord(htmlString, i)
            //console.log(innerArray[j-1]);
        }
        if(htmlString[i]=='a' && htmlString[i+1]=='r' && htmlString[i+2]=='i' && htmlString[i+3]=='a'&&htmlString[i+4]=='-'
        && htmlString[i+5] =='l' && htmlString[i+6] == 'a' && htmlString[i+7] == 'b' && htmlString[i+8] =='e' &&
        htmlString[i+9] == 'l' && htmlString[i+10] == 'l' || (modalFoundEnd(htmlString, i) == true)){
            carSubLabels.push(innerArray);
            innerArray = []; // resets array
        }

    }

    carSubLabels = carSubLabels.map(removeEmptyItems);
    carSubLabels = carSubLabels.filter(arr => arr.length > 0);
    //printArray(carSubLabels);
    return carSubLabels;
}

function modalFoundEnd(htmlString, i){
    return (htmlString[i]=='m' && htmlString[i+1]=='o' && htmlString[i+2]=='d' && htmlString[i+3]=='a'&&htmlString[i+4]=='l')
}

function giveCarItems(htmlString){
    var carAns = [];

    var j =0;

    for(var i = 0; i < htmlString.length; i++){
        if(htmlString[i]=='3' && htmlString[i+1]=='/' && htmlString[i+2]=='5'){
            i+=5;
            carAns[j++] = extractWord(htmlString, i);
        }

    }

    //printArray(carAns);

    return carAns;


}

function removeEmptyItems(arr) {
    return arr.filter(item => item !== undefined);
  }

function extractWord(htmlString, i, identifier){
    var labels ="";

    if(identifier == 'aria'){
        while(htmlString[i] != '>'){
            labels+=htmlString[i++];
        }
        return labels.replace(/-/g,' '); //reg expressioin
    }
    else{
        while(htmlString[i] != '<'){
            labels+=htmlString[i++];
        }
        return labels;
    }

}

function deleteExpandString(specification){
    return specification.replace(/ expand"/g, ''); // reg expression
}

function printArray(specification){
    console.log(specification);
}

module.exports = {getSpecificationLabels, populateCarLabel, giveCarItems, ifCarExist};
