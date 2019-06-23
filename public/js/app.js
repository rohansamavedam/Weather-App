

const form = document.querySelector('form')
const search = document.querySelector('input')
form.addEventListener('submit', (e) => {
    document.getElementById("message-one").innerHTML = "Loading.....";
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if(data.error){
            document.getElementById("message-one").innerHTML = data.error;
        }else{
            document.getElementById("message-one").innerHTML = data.location;
            document.getElementById("message-two").innerHTML = 'It is currently ' + data.forecast.temp + ' degrees, and it is ' + data.forecast.summary + '. There is ' + data.forecast.rain + ' chance of rain';
        }
    })
})
})