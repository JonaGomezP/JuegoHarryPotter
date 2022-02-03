window.onload = () => {

    // //Creo la opacidad de fondo al recargar la página donde se muestran los botones de "jugar" y las dificultades
    // let padre = document.querySelector("body");
    // var opacidadFondo = document.createElement("div");
    // opacidadFondo.id = "primeraPantalla";

    // //Agrego al body el la opacidad de fondo antes del primer hijo que tenga
    // padre.insertBefore(opacidadFondo, padre.firstChild);

    // //Creamos el botón que inicia el juego y le aplicamos estilos
    // let boton = document.createElement("input");
    // boton.onclick = function () {
    //     padre.removeChild(opacidadFondo)
    // }

    // //Creo el botón que inicia el juego (imagen de Harry Potter)
    // boton.id = "botonHarry";
    // boton.value = "!JUGAR¡";
    // boton.type = "image";
    // boton.src = "/img/harry.png"
    // boton.position = "absolute";

    // boton.onmouseover = function () {
    //     boton.style["-webkit-transition"] = "-webkit-transform 500ms linear";
    //     boton.style["-webkit-transform"] = "scale(1.2)";
    //     boton.style["transform"] = "transform:scale(1.2)";
    // }
    // boton.onmouseout = function () {
    //     boton.style["-webkit-transition"] = "-webkit-transform 500ms linear";
    //     boton.style["-webkit-transform"] = "scale(1)";
    //     boton.style["transform"] = "transform:scale(1)";
    // }

    // //Añado el botón a la opacidad previamente creada
    // opacidadFondo.appendChild(boton);

    // //Creo la caja que tendrá las instrucciones del juego
    // let cajaReglas = document.createElement("div");
    // cajaReglas.id = "cajaReglas";

    // //Creo el párrafo que tendrá el texto de las reglas
    // let parrafoReglas = document.createElement("p");
    // parrafoReglas.id = "parrafoReglas"

    // //Creo el texto de las reglas
    // let textoReglas = document.createTextNode("Bienvenido a Medwarts, donde la magia solo es para unos pocos.\n¿Serás capaz de robar los exámenes de Historia de la Magia? Se encuentran en la mesa del profesor Jeisnake así que solo tienes que llegar a ella pero !CUIDADO¡, el profesor está vigilando. \nSolo podrás moverte una casilla en horizontal o en vertical en cada turno que te toque pero recuerda, el malvado profesor también se moverá de la misma manera en tu búsqueda.\nUna vez tengas los exámenes la puerta encantada se abrirá y podras volver a tu habitación con el tesoro. !SUERTE¡ ");

    // parrafoReglas.appendChild(textoReglas)
    // cajaReglas.appendChild(parrafoReglas);
    // opacidadFondo.appendChild(cajaReglas);


    // Ajustamos el volumen del audio y la velocidad del video
    // let audio = document.querySelector("audio");
    // audio.volume = 0.1;
    // audio.play();

    //------------------------------------------------------------------------------------------------------

    // Selecciono todas las celdas de la tabla
    let celdas = document.querySelectorAll("td");

    // Coloco al protagonista y guardo su posición en una variable
    let posicion_prota = 0;
    celdas[posicion_prota].id = "prota";

    //Coloco la puerta de salida cerrada
    let salida = celdas[celdas.length - 1];



    // Genero la posición de los examenes, guardo dicha posición en una variable y coloco los examenes en el tablero
    let posicion_examenes = parseInt(Math.random() * 62 + 1);
    celdas[posicion_examenes].id = "examenes";
    if (posicion_examenes == posicion_prota) { //CREO QUE NO HACE FALTA
        posicion_examenes++;
    }

    //Posición inicial malo
    let posicion_malo = parseInt(Math.random() * ((celdas.length - 1) - 31) + 31);
    if (posicion_malo == posicion_examenes) {
        posicion_malo++;
    }
    celdas[posicion_malo].id = "malo";

    // Creo una variable inicializada a "false" para almacenar los examenes (false: no tiene los examenes  --  True: tiene los examenes)
    let examanes_inventario = false;

    // Selecciono el "inventario"
    let inventario = document.getElementById("inventario");

    // Recorro todas las celdas de la tabla
    celdas.forEach((i) => {
        // Añado el evento "onclick" a cada una de las celdas
        i.onclick = (e) => {
            // Compruebo si el movimiento que quiere hacer el usuario es correcto
            if (posicion_prota + 1 == Array.from(celdas).indexOf(e.target) || posicion_prota - 1 == Array.from(celdas).indexOf(e.target) || posicion_prota + 8 == Array.from(celdas).indexOf(e.target) || posicion_prota - 8 == Array.from(celdas).indexOf(e.target)) {

                //Llamo a la función "comprobar salida" para ver si la puerta está abierta
                // comprobarSalida(posicion_prota, celdas, salida);

                celdas[posicion_prota].id = "";
                posicion_prota = Array.from(celdas).indexOf(e.target);
                e.target.id = "prota";

                // Compruebo si el protagonista ha conseguido los examenes
                if (posicion_prota == posicion_examenes) {
                    examanes_inventario = true;
                    salida.id = "puertaAbierta";
                    document.getElementById("box-inventario").style.display = 'flex';
                }

                //Cuando se mueve al prota, llamo a la función "comprobarSalida" para saber si ha ganado o no y llamo a la función "moverMalo" que mueve automáticamente al malo después de 1 s
                let timer = setTimeout(moverMalo, 300, examanes_inventario, celdas);
            }
            else if (posicion_prota == Array.from(celdas).indexOf(e.target)) {
                alert("El protagonista no se puede quedar en la misma posición. Intente moverlo a otra posición diferente a la que se encuentra.");
            }
            else {
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }

        }
    });

    // Compruebo si el protagonista ha conseguido los examenes  NO SE PORQUE ESTÁ ESTO AQUÍ
    // if (posicion_prota == posicion_examenes) {
    //     examanes_inventario = true;
    //     inventario.textContent = "Examenes";
    //     salida.id = "puertaAbierta";
    // }

    // Mover pulsando culsores del teclado
    let derecha = [7, 15, 23, 31, 39, 47, 55, 63];
    document.addEventListener('keyup', (e) => {

        //Llamo a la función "comprobar salida" para ver si la puerta está abierta
        comprobarSalida(posicion_prota, celdas, salida);

        // Mover a la izquierda
        if (e.keyCode == 37) {
            if (derecha.includes(posicion_prota - 1) || posicion_prota - 1 < 0) {
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
            else {
                celdas[posicion_prota].id = "";
                posicion_prota -= 1;
                celdas[posicion_prota].id = "prota";
                //Cuando se mueve al prota, llamo a la función "comprobarSalida" para saber si ha ganado o no y llamo a la función "moverMalo" que mueve automáticamente al malo después de 1 s
                let timer = setTimeout(moverMalo, 300, examanes_inventario, celdas);
            }
        }
        // Mover a la derecha
        else if (e.keyCode == 39) {
            if ((posicion_prota + 1) % 8 == 0 || posicion_prota + 1 == celdas.length) {
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
            else {
                celdas[posicion_prota].id = "";
                posicion_prota += 1;
                celdas[posicion_prota].id = "prota";
                //Cuando se mueve al prota, llamo a la función "comprobarSalida" para saber si ha ganado o no y llamo a la función "moverMalo" que mueve automáticamente al malo después de 1 s
                let timer = setTimeout(moverMalo, 300, examanes_inventario, celdas);
            }
        }
        // Mover arriba
        else if (e.keyCode == 38) {
            if (posicion_prota - 8 < 0) {
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
            else {
                celdas[posicion_prota].id = "";
                posicion_prota -= 8;
                celdas[posicion_prota].id = "prota";
                //Cuando se mueve al prota, llamo a la función "comprobarSalida" para saber si ha ganado o no y llamo a la función "moverMalo" que mueve automáticamente al malo después de 1 s
                let timer = setTimeout(moverMalo, 300, examanes_inventario, celdas);
            }
        }
        // Mover abajo
        else if (e.keyCode == 40) {
            // console.log((posicion_prota+8)+">"+celdas.length);
            if (posicion_prota + 8 >= 64) { //celdas.length
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
            else {
                celdas[posicion_prota].id = "";
                posicion_prota += 8;
                celdas[posicion_prota].id = "prota";
                //Cuando se mueve al prota, llamo a la función "comprobarSalida" para saber si ha ganado o no y llamo a la función "moverMalo" que mueve automáticamente al malo después de 1 s
                let timer = setTimeout(moverMalo, 300, examanes_inventario, celdas);
            }
        }

        // Compruebo si el protagonista ha conseguido los examenes
        if (posicion_prota == posicion_examenes) {
            examanes_inventario = true;
            salida.id = "puertaAbierta";
            document.getElementById("box-inventario").style.display = 'flex';
        }

    });


}

//Creo la función "comprobarSalida" que recibe como parámetros la posición del prota y la lista de celdas. Si la celda en la que está tiene el id "puertaAbierta" significa que tiene los exámenes y puede salir
function comprobarSalida(pos_prota, listaCeldas) {
    let posicion_prota = pos_prota;
    let celdas = listaCeldas;

    if ((((posicion_prota + 1) == celdas.length - 1) || ((posicion_prota + 8) == celdas.length - 1)) && (celdas[celdas.length - 1].id == "puertaAbierta")) {
        alert("Has ganado!!!")
    }
}

//MOVER MALO
function moverMalo(examenes, listaCeldas) {

    //Guardo el estado de los exámenes
    let examanes_inventario = examenes;

    let celdas = listaCeldas;

    //Creo la tablero donde voy a almacenar las celdas
    let tablero = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    //Creo dos variables que usaré para almacenar las celdas
    let contadorFila = 0;
    let indice = 0;
    let coordenadas = new Map();

    prueba = 0;
    celdas.forEach(element => {
        indice++;
        tablero[contadorFila].push(element);
        //Guardo las coordenadas del protagonista
        if (element.id == "prota") {
            coordenadas.filaProta = contadorFila;
            coordenadas.columnaProta = tablero[contadorFila].indexOf(element);
        }
        if (element.id == "malo") {
            coordenadas.filaMalo = contadorFila;
            coordenadas.columnaMalo = tablero[contadorFila].indexOf(element);
        }

        if (element.id == "examenes") {
            coordenadas.filaExamenes = contadorFila;
            coordenadas.columnaExamenes = tablero[contadorFila].indexOf(element);
        }

        if (indice % 8 == 0) {
            contadorFila++;
        }

        if (indice == celdas.length) {
            //Llamo a la función "cambiarMalo" y le paso las coordenadas del prota como parámetros
            // cambiarMalo(coordenadas, tablero);
        }
    });







    tablero[coordenadas.filaMalo][coordenadas.columnaMalo].id = "";

    if ((coordenadas.filaProta < coordenadas.filaMalo) && (coordenadas.columnaProta < coordenadas.columnaMalo)) {

        if ((((coordenadas.filaMalo % 2) == 0) && ((coordenadas.columnaMalo % 2) == 0)) || (((coordenadas.filaMalo % 2) == 1) && ((coordenadas.columnaMalo % 2) == 1))) {
            tablero[coordenadas.filaMalo][coordenadas.columnaMalo - 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo - 1;
            console.log("columna cambiada malo");
        } else {
            tablero[coordenadas.filaMalo - 1][coordenadas.columnaMalo].id = "malo";
            // coordenadas.filaMalo = (coordenadas.filaMalo - 1);
            coordenadas.filaMalo = coordenadas.filaMalo - 1;
            console.log("fila cambiada malo");


        }



    } else if ((coordenadas.filaProta < coordenadas.filaMalo) && (coordenadas.columnaProta > coordenadas.columnaMalo)) {

        if ((((coordenadas.filaMalo % 2) == 0) && ((coordenadas.columnaMalo % 2) == 0)) || (((coordenadas.filaMalo % 2) == 1) && ((coordenadas.columnaMalo % 2) == 1))) {
            tablero[coordenadas.filaMalo][coordenadas.columnaMalo + 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo + 1;
        } else {
            tablero[coordenadas.filaMalo - 1][coordenadas.columnaMalo].id = "malo";
            coordenadas.filaMalo = coordenadas.filaMalo - 1;
        }



    } else if ((coordenadas.filaProta > coordenadas.filaMalo) && (coordenadas.columnaProta < coordenadas.columnaMalo)) {

        if ((((coordenadas.filaMalo % 2) == 0) && ((coordenadas.columnaMalo % 2) == 0)) || (((coordenadas.filaMalo % 2) == 1) && ((coordenadas.columnaMalo % 2) == 1))) {
            tablero[coordenadas.filaMalo][coordenadas.columnaMalo - 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo - 1;
        } else {
            tablero[coordenadas.filaMalo + 1][coordenadas.columnaMalo].id = "malo";
            coordenadas.filaMalo = coordenadas.filaMalo + 1;
        }



    } else if ((coordenadas.filaProta > coordenadas.filaMalo) && (coordenadas.columnaProta > coordenadas.columnaMalo)) {

        if ((((coordenadas.filaMalo % 2) == 0) && ((coordenadas.columnaMalo % 2) == 0)) || (((coordenadas.filaMalo % 2) == 1) && ((coordenadas.columnaMalo % 2) == 1))) {
            tablero[coordenadas.filaMalo][coordenadas.columnaMalo + 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo + 1;
        } else {
            tablero[coordenadas.filaMalo + 1][coordenadas.columnaMalo].id = "malo";
            coordenadas.filaMalo = coordenadas.filaMalo + 1;
        }


    } else {

        if ((coordenadas.filaProta == coordenadas.filaMalo) && (coordenadas.columnaProta < coordenadas.columnaMalo)) {

            tablero[coordenadas.filaMalo][coordenadas.columnaMalo - 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo - 1;

        } else if ((coordenadas.filaProta == coordenadas.filaMalo) && (coordenadas.columnaProta > coordenadas.columnaMalo)) {

            tablero[coordenadas.filaMalo][coordenadas.columnaMalo + 1].id = "malo";
            coordenadas.columnaMalo = coordenadas.columnaMalo + 1;

        } else if ((coordenadas.columnaProta == coordenadas.columnaProta) && (coordenadas.filaProta < coordenadas.filaMalo)) {

            tablero[coordenadas.filaMalo - 1][coordenadas.columnaMalo].id = "malo";
            coordenadas.filaMalo = coordenadas.filaMalo - 1;

        } else {
            tablero[coordenadas.filaMalo + 1][coordenadas.columnaMalo].id = "malo";
            coordenadas.filaMalo = coordenadas.filaMalo + 1;
        }

    }



    //Llamo a la función "perder" pasando como parámetros el tablero y las coordenadas del prota y el malo. 
    perder(coordenadas)




}


// Comprueba si al moverse el malo pilla o no al prota, recibiendo el tablero y las coordendas como parámetros
function perder(coord) {
    coordenadas = coord;

    if (coordenadas.filaMalo === coordenadas.filaProta && coordenadas.columnaMalo === coordenadas.columnaProta) {
        // Creo el elemento de audio
        let audio = document.createElement("audio");
        // Asigno el atributo autoplay al elemento audio
        audio.autoplay = true;
        // Creo el elemento de source
        let source = document.createElement("source");
        // Le asigno la ruta del audio
        source.src = "audio/risa.mp3";
        // Le asigno el tipo de audio
        source.type = "audio/mpeg";
        // Enchancho el source al elemento audio
        audio.appendChild(source);
        // Engancho el audio al body
        document.body.appendChild(audio);

        //Le doy play al audio
        audio.play();

        let perdedor = confirm("Te han pillado!!! \n ¿Quieres volver a jugar?");
        if (perdedor) {
            location.reload();
        }
    }
}