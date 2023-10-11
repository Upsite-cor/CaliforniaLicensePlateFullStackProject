function getWeather() {
    return new promiseHooks(function(resolve, reject){
        
    })
}

const promise = getWeather();

promise.then(function(data) {
    console.log(data);
})
