// Variables

const tiempo = document.getElementById("tiempo")
const puntuacion = document.getElementById("puntuacion")
const dimension = parseInt(document.getElementById("dimension").innerText)
const tablero = document.getElementById('tablero')
let celdas = []

var tiempo_transcurrido = 0;
var temporizador = 0;
var iniciado = false
var ultima = 0;
// Funciones

var arraysMatch = function (arr1, arr2) {

    if (arr1.length !== arr2.length) return false;
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;

};

function dibujaTablero() {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            celda = document.createElement('div')
            celda.innerHTML = 0
            tablero.appendChild(celda)
            celdas.push(celda)
        }
    }
    nuevo_numero();
    nuevo_numero();
}

function nuevo_numero() {
    let aleatorio = Math.floor(Math.random() * celdas.length)
    console.log(aleatorio);
    if (celdas[aleatorio].innerHTML == 0) {
        if (Math.random() < 1 / 2) {
            celdas[aleatorio].className = "4"
            celdas[aleatorio].innerHTML = 4
        } else {
            celdas[aleatorio].className = "2"
            celdas[aleatorio].innerHTML = 2
        }
    } else nuevo_numero();




}

function izquierda() {
    for (let i = 0; i < (dimension * dimension); i++) {
        if (i % 4 === 0) {
            let fila = []
            for (let j = 0; j < dimension; j++) {
                fila.push(parseInt(celdas[i + j].innerHTML))
            }

            let fila_filtrada = fila.filter(num => num);
            let restantes = dimension - fila_filtrada.length;
            let ceros = Array(restantes).fill(0);
            console.log(ceros)

            let nueva_fila = fila_filtrada.concat(ceros)

            for (let j = 0; j < dimension; j++) {
                celdas[i + j].className = nueva_fila[j].toString()
                celdas[i + j].innerHTML = nueva_fila[j]

            }
        }
    }
}
function derecha() {
    for (let i = 0; i < (dimension * dimension); i++) {
        if (i % 4 === 0) {
            let fila = []
            for (let j = 0; j < dimension; j++) {
                fila.push(parseInt(celdas[i + j].innerHTML))
            }

            let fila_filtrada = fila.filter(num => num);
            let restantes = dimension - fila_filtrada.length;
            let ceros = Array(restantes).fill(0);
            console.log(ceros)

            let nueva_fila = ceros.concat(fila_filtrada);

            for (let j = 0; j < dimension; j++) {
                celdas[i + j].className = nueva_fila[j].toString()
                celdas[i + j].innerHTML = nueva_fila[j]

            }
        }
    }
}

function abajo() {
    for (let i = 0; i < dimension; i++) {
        let columna = []
        for (let j = 0; j < dimension; j++) {
            columna.push(parseInt(celdas[i + (dimension * j)].innerHTML))
        }

        let columna_filtrada = columna.filter(num => num)
        let restantes = dimension - columna_filtrada.length
        let ceros = Array(restantes).fill(0)
        let nueva_columna = ceros.concat(columna_filtrada)

        for (let j = 0; j < dimension; j++) {
            celdas[i + (dimension * j)].className = nueva_columna[j].toString()
            celdas[i + (dimension * j)].innerHTML = nueva_columna[j]
        }
    }
}

function arriba() {
    n_celdas = [...celdas]
    for (let i = 0; i < dimension; i++) {
        let columna = []
        for (let j = 0; j < dimension; j++) {
            columna.push(parseInt(celdas[i + (dimension * j)].innerHTML))
        }

        let columna_filtrada = columna.filter(num => num)
        let restantes = dimension - columna_filtrada.length
        let ceros = Array(restantes).fill(0)
        let nueva_columna = columna_filtrada.concat(ceros)

        for (let j = 0; j < dimension; j++) {
            n_celdas[i + (dimension * j)].className = nueva_columna[j].toString()
            n_celdas[i + (dimension * j)].innerHTML = nueva_columna[j]
        }
    }
}

function sumaFila() {
    var mod = false;
    for (let i = 0; i < (dimension * dimension) - 1; i++) {
        if (celdas[i].innerHTML === celdas[i + 1].innerHTML) {
            let suma = parseInt(celdas[i].innerHTML) + parseInt(celdas[i + 1].innerHTML)
            celdas[i].className = suma.toString()
            celdas[i].innerHTML = suma
            celdas[i + 1].className = ""
            celdas[i + 1].innerHTML = 0
        }
    }
}


function sumaColumna() {
    for (let i = 0; i < (dimension * (dimension - 1)); i++) {
        if (celdas[i].innerHTML === celdas[i + dimension].innerHTML) {
            let suma = parseInt(celdas[i].innerHTML) + parseInt(celdas[i + dimension].innerHTML)
            celdas[i].className = suma.toString()
            celdas[i].innerHTML = suma
            celdas[i + dimension].innerHTML = 0
        }
    }
}


function incrementaTiempo() {
    tiempo_transcurrido++;
    let segundos_transcurridos = tiempo_transcurrido % 60
    let minutos_transcurridos = Math.floor(tiempo_transcurrido / 60)
    if (segundos_transcurridos < 10) {
        tiempo.innerText = `${minutos_transcurridos}:0${segundos_transcurridos}`;
    } else {
        tiempo.innerText = `${minutos_transcurridos}:${segundos_transcurridos}`;
    }
}


function inicia_contador() {
    if (!iniciado) {
        iniciado = true;
        temporizador = window.setInterval(incrementaTiempo, 1000);
    }
}


function actualiza(direccion) {
    n_celdas = [...celdas]
    switch (direccion.keyCode) {
        case 37:
            inicia_contador();
            console.log("Se pulso izquierda")
            izquierda();
            sumaFila();
            izquierda();
            break;
        case 38:
            ultima = 38;
            inicia_contador();
            console.log("Se pulso arriba")
            arriba();
            sumaColumna();
            arriba();
            break;
        case 39:
            ultima = 39;
            inicia_contador();
            console.log("Se pulso derecha")
            derecha();
            sumaFila();
            derecha();
            break;
        case 40:
            ultima = 40;
            inicia_contador();
            console.log("Se pulso abajo")
            abajo();
            sumaColumna();
            abajo();
            break;
        default:
            break;
    }
    if ((celdas.map((celda) => parseInt(celda.innerHTML)).includes(0))) {
        nuevo_numero();
        puntuacion.innerText = Math.max(...celdas.map((celda) => celda.innerHTML))
    } else {
        iniciado = false;
        fin();
    }

}

function fin() {
    window.clearInterval(temporizador);
    console.log("Ha finalizado el juego")
    document.removeEventListener('keyup', actualiza)

}


dibujaTablero()
document.addEventListener('keyup', actualiza)

