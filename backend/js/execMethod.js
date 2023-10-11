const {exec} = require('child_process');
const { stderr } = require('process');
//var command = 'wget -O /Users/bryan/Documents/seniorProj/webDraft2/LicensePlateLookup/js/output.html https://www.lookupaplate.com/california/8GVE612/';


function cmd(command){
    exec(command, (error, stdout, stderr) =>{
        //error comes out if the command is not found or missing arguments
        if(error){
            console.log(`error: ${error.message}`);
            return
        }
        if(stderr){
            console.log(`stderror: ${stderr}`)
            return 
        }
        console.log(`stdout: ${stdout}`);
    })
}


module.exports = {cmd};

