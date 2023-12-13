const {exec} = require('child_process');
const { stderr } = require('process');



function cmd(command){
    exec(command, (error, stdout, stderr) =>{
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

