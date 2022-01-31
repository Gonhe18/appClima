//Se obtiene la info de la hora local y se toma los valores por separada para mejor presentación
let d = new Date();
let año = d.getFullYear();
let mes = d.getMonth() + 1; //Toma los meses del 0 al 11, se agrega +1 para que figure del 1 al 12
let dia = d.getDate();
let hora = d.getHours();
let min = d.getMinutes();

let $btn1 = document.querySelector("#btn-clima");
$btn1.addEventListener("click",()=>{
//Ingreso de ciudad a consultar
    let city = document.querySelector("#input-ciudad").value;
//Filtrado de Api
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=d3491c204cc549a885ecfd03578534ae`)
    .then(resp => resp.json())
    .then(resp =>{
    //Se agrega evento a botón para que resetee la web y permita ingresar nueva consulta.
        let $btn3 = document.querySelector("#btn-reset");
        $btn3.addEventListener("click", ()=>{
            document.querySelector("#btn-reset").innerHTML = location.reload();
        })
    //Se empieza a trabajar con la Api
        document.querySelector("#btn-info").removeAttribute("class","oculto");
        document.querySelector("#btn-reset").removeAttribute("class","oculto");
        document.querySelector("#consulta").setAttribute("class","oculto");
        document.querySelectorAll("span")[0].innerHTML = `<img src="./Icon/Pais.png" title="País"> <br> ${resp.sys.country}`;
        document.querySelectorAll("span")[1].innerHTML = `<img src="./Icon/Ciudad.png" title="Ciudad"> <br> ${resp.name}`;
        document.querySelectorAll("span")[2].innerHTML = `<img src="./Icon/Temp.png" title="Temperatura actual"> <br> ${resp.main.temp}°C`;
        document.querySelectorAll("span")[3].innerHTML = `<img src="http://openweathermap.org/img/w/${resp.weather[0].icon}.png" title="Estado del cielo"> <br> ${resp.weather[0].description}`;
    //Se muestra info oculta, se habilita con btn "mas info" y oculta alguna info para que no ocupe lugar 
        let $btn2 = document.getElementById("btn-info");
        $btn2.addEventListener("click",()=>{
            document.querySelector("#info-1").removeAttribute("class","oculto");
            document.querySelector("#btn-info").setAttribute("class","oculto");
            document.querySelector("#consulta").setAttribute("class","oculto");
            document.querySelector(".muestra-1").innerHTML = "";
            document.getElementById("Pais").innerHTML = `<img src="./Icon/Pais.png" title="País"> <br> ${resp.sys.country}`;
            document.getElementById("Ciudad").innerHTML = `<img src="./Icon/Ciudad.png" title="Ciudad"> <br> ${resp.name}`
            document.getElementById("Descripcion").innerHTML = `<img src="http://openweathermap.org/img/w/${resp.weather[0].icon}.png" title="Estado del cielo"> <br> ${resp.weather[0].description}`;
            document.getElementById("Temp").innerHTML = `<img src="./Icon/Temp.png" title="Temperatura actual"> <br> ${resp.main.temp}°C`
            document.getElementById("Temp_max").innerHTML = `<img src="./Icon/Temp_max.png" title="Temperatura máxima"> <br> ${resp.main.temp_max}°C`;
            document.getElementById("Temp_min").innerHTML = `<img src="./Icon/Temp_min.png" title="Temperatura mínima"> <br> ${resp.main.temp_min}°C`;
            document.getElementById("St").innerHTML = `<img src="./Icon/St.png" title="Sensación térmica"> <br> ${resp.main.feels_like}°C`;
            document.getElementById("Humedad").innerHTML = `<img src="./Icon/Humedad.png" title="Humedad"> <br> ${resp.main.humidity}%`;
            document.getElementById("Nubosidad").innerHTML = `<img src="./Icon/Nubosidad.png" title="Nubosidad"> <br> ${resp.clouds.all}%`;
            document.getElementById("Viento").innerHTML = `<img src="./Icon/Viento.png" title="Velocidad del viento"> <br> ${(((resp.wind.speed*60)*60)/1000).toFixed(2)}Km/h`
            document.querySelector("#horario").innerHTML = `Consulta realizada a las ${hora}:${min} hs del ${dia}/${mes}/${año} (hora local)`;    
        })
    })
    .catch(err => {
        console.log(err);
        alert("Dato incorrecto, verifique la ciudad ingresada")})
})

