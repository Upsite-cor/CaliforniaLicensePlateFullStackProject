// var formEl = document.querySelector('.form');
// var Lnumber;
// var message = document.getElementById('message');
// var img = document.createElement('img');



// const displaySearchingMessage = () => {
//   message.innerText = 'Searching...';
//   message.style.color = 'yellow';
//   img.src = 'http://localhost:3000/searchingImage'; // URL where the error image is served
//   message.appendChild(img);
// }

// function getLicenseNumber() {
//   formEl.addEventListener('submit', async (event) => {


//     //this should always be on top
//     event.preventDefault();
//     const formData = new FormData(formEl);
//     const urlEncoded = new URLSearchParams(formData).toString();
//     let licensePlateNum = urlEncoded.split("=")[1];
//     console.log(licensePlateNum);





//     try {
//       displaySearchingMessage()
//       const response = await fetch('http://localhost:3000/upload', {
//         method: 'POST',
//         body: urlEncoded,
//         headers: {
//           'Content-type': 'application/x-www-form-urlencoded',
//         }
//       })



//       const data = await response.json();
//       let carObj = JSON.parse(data.carDescription)

//       //if car is in mongoDB and it processes it then we send them
//       // to the react url
//       if (data) {
//         console.log(carObj)
//         // message.innerText = 'Success...';
//         // message.style.color = '#0f0';
//         // const img = document.createElement('img');
//         // img.src = 'http://localhost:3000/searchingImage'; // URL where the error image is served
//         // message.appendChild(img);
//         window.location.href = "http://localhost:4000"
//       }
//     } catch (error) {
//       message.innerText = 'Car not found';
//       errorMessage.style.color = 'red';
//       img.src = 'http://localhost:3000/errorImage'; // URL where the error image is served
//     }







//   });
// }


// getLicenseNumber();



const formEl = document.querySelector('.form');
const message = document.getElementById('message');

const displaySearchingMessage = async() => {
  message.innerText = 'Searching...';
  message.style.color = 'yellow';

  const img = document.createElement('img');
  img.src = 'http://localhost:3000/searchingImage'; // URL where the searching image is served
  message.appendChild(img);
}


const displayNotFoundMessage = () =>{
  message.innerText = 'Car not found';
  message.style.color = 'red';
  const img = document.createElement('img');
  img.src = 'http://localhost:3000/errorImage'; // URL where the error image is served
  message.appendChild(img);
}


const checkIfCarExistOneMoreTime = async ()=>{
  console.log(carObj);


  message.innerText = 'Car found!'
  message.style.color = 'green'
  const img = document.createElement('img');
  img.src = 'http://localhost:3000/happyImage'; // URL where the error image is served
  message.appendChild(img);

  await delay(1000)
  window.location.href = "http://localhost:4000";
}

const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const getLicenseNumber = async () => {
  formEl.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const urlEncoded = new URLSearchParams(formData).toString();
    let licensePlateNum = urlEncoded.split("=")[1];
    console.log(licensePlateNum);

    displaySearchingMessage();

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: urlEncoded,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      }
    });





    try {
      const data = await response.json();
      console.log(data.found)
      var carObj = data.carDescription
      console.log("carObj: ", carObj)
      
      if (data.found) {
        //console.log(carObj);


        message.innerText = 'Car found!'
        message.style.color = 'green'
        const img = document.createElement('img');
        img.src = 'http://localhost:3000/happyImage'; // URL where the error image is served
        message.appendChild(img);
        

        if(carObj.age == "old"){
          await delay(1000)
        }
        else{
          await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: urlEncoded,
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            }
          });
        }
          

        window.location.href = "http://localhost:4000";
      }else{
        displayNotFoundMessage();
      }
    } catch (error) {
      console.log("ERROR: ", error)
      displayNotFoundMessage();
    }
  });
}



getLicenseNumber();
