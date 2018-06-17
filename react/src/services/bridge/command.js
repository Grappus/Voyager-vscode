
export default {
    run(command){
        if(window.cmd){
             return new Promise( (resolve, reject)=>{
                window.cmd.get(command, function(err, data, stderr){
                    if(err) reject({err, stderr})
                    resolve(data)
                })
             }) 
        }
        else{
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    alert('command executed successfully');
                },1000)
            })
        }
    }
}