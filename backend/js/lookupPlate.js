//I commented some things out right nwo I am using lookupaplate,com/california so I don't need to add the dropdown menu thing
//There is an issue where the waitfornavigation goes to the wrong page.
// It shoukd go to the one I liked however, if this is the case then I will have to figure out 
// Another way to enter the url by default
//NOTE: If puppeteer is not WORKING make sure to check if you downloaded the latest node LTS


//We can search it up through the vin: https://vincheck.info/check/report-summary.php?vin=JT2SW21M3M0012386

const  puppeteer = require('puppeteer');

async function initateSearch(LPnumber)
{
    try{
    const browser = await puppeteer.launch({
        headless:"false" 
    });

    const options = {
        path: 'web.pdf',
        format:'A4',
    }
    const page = await browser.newPage();
    await page.goto('https://www.lookupaplate.com/california/');

    //License plate classname = input.input.input-bordered.text-black
    await page.type("input.input.input-bordered.text-black",LPnumber);

        await Promise.all([
            page.click("button.btn.btn-primary"),
            page.waitForNavigation(),
        ]);

       
       await page.goto(`view-source:https://www.lookupaplate.com/california/${LPnumber}/`);
       //const content = await page.content();
       //const fs = require('fs');
       //fs.writeFileSync('web.html', content);
        //await page.screenshot({path: 'example.png'});
        console.log("done");
    await browser.close();
    }catch(error){
        console.error("Error: ", error);
    }
}

module.exports = {initateSearch};

