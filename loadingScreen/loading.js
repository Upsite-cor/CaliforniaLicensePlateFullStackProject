function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function yourFunction() {
    await delay(20000);
    document.getElementsByTagName('h1')[0].innerHTML = 'DONE';
    window.location.href = "http://localhost:4000/displayData";
  }


  /*
  async function yourFunction() {
    await delay(20000);
    document.getElementsByTagName('h1')[0].innerHTML = 'DONE';
    window.location.href = "http://localhost:3000";
  }
  */
  yourFunction();
  