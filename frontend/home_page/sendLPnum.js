
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
