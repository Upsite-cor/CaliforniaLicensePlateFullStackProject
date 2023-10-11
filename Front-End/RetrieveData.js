var formEl = document.querySelector('.form');
var Lnumber;

function getLicenseNumber(){
    formEl.addEventListener('submit', event => {
      setTimeout(()=>{
        window.location.href = "http://localhost:3000/loadData";
      },3000)

      
        event.preventDefault();

          const formData = new FormData(formEl);
        //  const data = Object.formData(formData);
          //console.log(data);

          const urlEncoded = new URLSearchParams(formData).toString();

        //This sends data to the server then I can import
        //my main file to make this work
          fetch('http://localhost:3000/upload', {
            method:'POST',
            body:urlEncoded,
            headers:{
              'Content-type': 'application/x-www-form-urlencoded',
            }
          })

          



      });
}


getLicenseNumber();


