//TODO: Display info into the html using JS btw you can use carInfo.methods and object.methods to help you display em.

console.log('fetching')
var carInfo;
fetch('/api/cars')
.then(response =>response.json())
.then(car=>{
    carInfo = car;
    carInfo = JSON.parse(carInfo); //okay so only use this IF and ONLY IF your data is in mongoDB
    displayCarInfoHTML(carInfo)
    displayCSS(carInfo)
})




function displayCarInfoHTML(carInfo){

    console.log("This is the carInfo ", carInfo);
    var carInfoDiv = document.querySelector('.carInfo');
    carInfoDiv.innerHTML = '';
    var licensePlateDisplayed = false;
    var num = 1;

    for(var key in carInfo){
      if(carInfo.hasOwnProperty(key)){
        var carItemDiv = document.createElement('div');
        carItemDiv.classList.add('carItem');
        var keyHeading = document.createElement('h2');
        keyHeading.textContent = key;
        carItemDiv.appendChild(keyHeading);

        if(!licensePlateDisplayed){
          licensePlateDisplayed = true;
          var carlicensePlate = carInfo[key];
          var p = document.createElement("p");
          p.textContent = carlicensePlate;
          carInfoDiv.appendChild(carItemDiv);
          carItemDiv.appendChild(p);
          continue;
        }



        
        
        
        var carItemList = document.createElement('ul')
        for(var carItem in carInfo[key]){
          var carItemProperty = document.createElement('li');
          carItemProperty.textContent = carItem + " : " + carInfo[key][carItem];
          carItemList.appendChild(carItemProperty);
        }
        carInfoDiv.appendChild(carItemDiv); 
        carItemDiv.appendChild(carItemList);
        



      }
    }


}

function classSize(carInfo){
  return Object.keys(carInfo).length;
}

function displayCSS(carInfo){
    //document.querySelector('div').childNodes grabs all divs in the html file
}






//Create something like this to display the data into the html file
/*
var generalInfo = carInfo;

// Iterate through the properties of the 'general' object
for (var key in generalInfo) {
  if (generalInfo.hasOwnProperty(key)) {
    console.log(key + ': ' + generalInfo[key]);
  }
}

*/