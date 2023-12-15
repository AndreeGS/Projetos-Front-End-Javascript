const horas = document.getElementById("horas")
const minutos = document.getElementById("minutos")
const segundos = document.getElementById("segundos")

const relogio = setInterval(function time(){

    let dateToday = new Date ();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();
   

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;

})