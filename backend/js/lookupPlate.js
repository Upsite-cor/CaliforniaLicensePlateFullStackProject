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

    await page.type("input.input.input-bordered.text-black",LPnumber);

        await Promise.all([
            page.click("button.btn.btn-primary"),
            page.waitForNavigation(),
        ]);

       
       await page.goto(`view-source:https://www.lookupaplate.com/california/${LPnumber}/`);
        console.log("done");
    await browser.close();
    }catch(error){
        console.error("Error: ", error);
    }
}

module.exports = {initateSearch};

