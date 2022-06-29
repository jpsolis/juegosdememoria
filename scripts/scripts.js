let arregloImagen = [];
let totalImagenes = null;
let imagenesMatch = 0;
let conteoErrores = 0;
let cantidadImagenes = 0;
let imagenesCompletadas = 0;
let usuarioIngresado = null;

var seconds;
var localStorageKeyName = 'data';


//const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

// open.addEventListener('click', () => {
//     modal_container.classList.add('show');
// });

// close.addEventListener('click', () => {
//     modal_container.classList.remove('show');
// });


function mostrarImagen(clicked_id) {
    let elemento = document.getElementById(clicked_id).getElementsByTagName('img');
    let botonClickeado = document.getElementsByTagName('button');
    console.log("Texto boton" +botonClickeado[0].textContent);
   

    elemento[0].hidden = false;

    console.log("elemento: " + elemento[0].src);

    var imagenSeleccionada = elemento[0].src;
    var idImagenSeleccionada = elemento[0].id;

    totalImagenes = agregarImagen(imagenSeleccionada, idImagenSeleccionada);

    if (totalImagenes.length == 4) {
        // comparo el arreglo    

        console.log("Total listado1: " + totalImagenes[1])
        console.log("Total listado2: " + totalImagenes[3]);

        if (totalImagenes[1] === totalImagenes[3]) {
            console.log("Son iguales !!!!");

            imagenesMatch = document.getElementsByTagName('img').length;
            imagenesCompletadas = imagenesCompletadas + 2;
            cantidadImagenes = imagenesMatch - imagenesCompletadas;

            if (cantidadImagenes == 0) {
                alert("Juego terminado !!!");
                end();

                // aqui guardo los datos para ranking

                guardarData();

                mostrarRanking();

            }

            arregloImagen = [];
            totalImagenes = null;
        }
        else {

            console.log("No son iguales !!!");
            conteoErrores++;

            setTimeout(setAviso, 1000);
        }
    }
}

function mostrarRanking() {
    const constModal = document.getElementById('modal_container');

  const list = constModal.classList.add('show');
   //modal.style.display = 'block';

    // Get the <span> element that closes the modal
    //var span = document.getElementsByClassName("close")[0];

}



function setAviso() {
    alert("Favor elegir otra imagen...");
    let elemento1 = document.getElementById(totalImagenes[0]).getElementsByTagName('img');
    let elemento2 = document.getElementById(totalImagenes[2]).getElementsByTagName('img');

    elemento1[0].hidden = true;
    elemento2[0].hidden = true;

    arregloImagen = [];
    totalImagenes = null;

    document.getElementById('erroresConcursante').innerHTML = 'Errores : ' + conteoErrores;
}


function agregarImagen(imagenSeleccionada, idImagenSeleccionada) {

    if (arregloImagen.length < 4) {

        arregloImagen.push(idImagenSeleccionada, imagenSeleccionada);

        console.log("ArregloImagenActual:" + arregloImagen);

    }

    return arregloImagen;

}

var startTime, endTime;

function start() {
    startTime = performance.now();
};

function end() {
    endTime = performance.now();
    var timeDiff = endTime - startTime; //in ms 
    // strip the ms 
    timeDiff /= 1000;




    // get seconds 
    seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");


    document.getElementById('tiempoTotalConcursante').innerHTML = 'Tiempo total :' + seconds + " segundos";

}


function guardarData() {
    var nombre = usuarioIngresado //document.getElementById('usuarioConcursante'),
    errores = conteoErrores,
        tiempo = seconds;


    console.log("nombre : " + usuarioIngresado + "errores: " + conteoErrores + "tiempo: " + seconds);

    // Validar
    //  if(usuarioIngresado.length  === 0 || !parseInt(conteoErrores.value) || !parseInt(seconds.value)) return;

    var usuarioAGuardar = {
        nombre: usuarioIngresado,
        errores: conteoErrores,
        tiempo: seconds
    }          

    agregarObjetoALocalStorage(usuarioAGuardar);

}

function agregarObjetoALocalStorage(obj) {
    var usuarios = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName);



    if (dataInLocalStorage !== null) {
        usuarios = JSON.parse(dataInLocalStorage);
    }

    usuarios.push(obj);

    localStorage.setItem(localStorageKeyName, JSON.stringify(usuarios));


    cargarDesdeLocalStorage();
}

function cargarDesdeLocalStorage() {

    var usuarios = [],
        dataInLocalStorage = localStorage.getItem(localStorageKeyName),
        gridBody = document.querySelector('#grillaTabla tbody');

    if (dataInLocalStorage !== null) {
        usuarios = JSON.parse(dataInLocalStorage);

    }

    gridBody.innerHTML = '';

    usuarios.forEach(function (x, i) {
        var tr = document.createElement('tr'),
            tdNombre = document.createElement('td'),
            tdErrores = document.createElement('td'),
            tdTiempo = document.createElement('td');

        tdNombre.innerHTML = x.nombre;
        tdErrores.innerHTML = x.errores;
        tdTiempo.innerHTML = x.tiempo;

        tr.appendChild(tdNombre);
        tr.appendChild(tdErrores);
        tr.appendChild(tdTiempo);

        gridBody.appendChild(tr);


    });

}


function cerrarModal()
{
  document.getElementById('modal_container').innerHTML = '';
  window.close();

  location.reload();

  

}


