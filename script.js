
window.onload = () => {

    //Creo la opacidad de fondo al recargar la página donde se muestran los botones de "jugar" y las dificultades
    let padre = document.querySelector("body");
    var opacidadFondo = document.createElement("div");
    opacidadFondo.style.zIndex = "1";
    opacidadFondo.style.backgroundColor = "black";
    opacidadFondo.style.opacity = "1";
    opacidadFondo.style.width = padre.offsetWidth + "px";
    opacidadFondo.style.width = "100%";
    opacidadFondo.style.minHeight = screen.availHeight + "px";
    opacidadFondo.style.position = "fixed";
    opacidadFondo.style.top = "0";
    opacidadFondo.style.left = "0";
    opacidadFondo.style.display = "flex";
    opacidadFondo.style.justifyContent = "center";
    opacidadFondo.style.alignItems = "center";
    opacidadFondo.style.flexDirection = "column";
    opacidadFondo.style.margin = "0";
    //Agrego al body el la opacidad de fondo antes del primer hijo que tenga
    padre.insertBefore(opacidadFondo, padre.firstChild);

    //Creamos el botón que inicia el juego y le aplicamos estilos
    let boton = document.createElement("input");
    boton.onclick = function () {
        padre.removeChild(opacidadFondo);
    }

    boton.value = "!JUGAR¡";
    boton.type = "image";
    boton.src = "img/harry.png";
    boton.position = "absolute";
    boton.style.fontSize = "66px";
    boton.style.boxShadow = "5px 10px";
    boton.style.width = "30%";

    boton.zIndex = "2";
    boton.onmouseover = function () {
        boton.style["-webkit-transition"] = "-webkit-transform 500ms linear";
        boton.style["-webkit-transform"] = "scale(1.2)";
        boton.style["transform"] = "transform:scale(1.2)";
    }
    boton.onmouseout = function () {
        boton.style["-webkit-transition"] = "-webkit-transform 500ms linear";
        boton.style["-webkit-transform"] = "scale(1)";
        boton.style["transform"] = "transform:scale(1)";
    }


    opacidadFondo.appendChild(boton);





//------------------------------------------------------------------------------------------------------


    // Selecciono todas las celdas de la tabla
    let celdas = document.querySelectorAll("td");

    // Coloco al protagonista y guardo su posición en una variable
    let posicion_prota = 0;
    celdas[posicion_prota].id = "prota";


    // Genero la posición de los examenes, guardo dicha posición en una variable y coloco los examenes en el tablero
    let posicion_examenes = parseInt(Math.random() * 62 + 1);
    celdas[posicion_examenes].id = "examenes";

    //Posición inicial malo
    let posicion_malo = parseInt(Math.random() * (63 - 31) + 31);
    if (posicion_malo == posicion_examenes) {
        posicion_malo = posicion_malo++;
    }
    let malo = document.querySelectorAll("td")[posicion_malo];
    malo.id = "malo";

    // Creo una variable inicializada a "false" para almacenar los examenes (false: no tiene los examenes  --  True: tiene los examenes)
    let examanes_inventario = false;

    // Selecciono el "inventario"
    let inventario = document.getElementById("inventario");

    // Recorro todas las celdas de la tabla (Mover con ratón)
    celdas.forEach((i) => {
        // Añado el evento "onclick" a cada una de las celdas
        i.onclick = (e) => {
            // Compruebo si el movimiento que quiere hacer el usuario es correcto (Compruebo la celda en la que clica el usuario con las posibles opciones a las que puede moverse el prota)
            if (posicion_prota + 1 == Array.from(celdas).indexOf(e.target) || posicion_prota - 1 == Array.from(celdas).indexOf(e.target) || posicion_prota + 8 == Array.from(celdas).indexOf(e.target) || posicion_prota - 8 == Array.from(celdas).indexOf(e.target)) {
                celdas[posicion_prota].id = "";
                posicion_prota = Array.from(celdas).indexOf(e.target);
                e.target.id = "prota";
                // Compruebo si el protagonista ha conseguido los examenes
                if (posicion_prota == posicion_examenes) {
                    examanes_inventario = true;
                    inventario.textContent = "Examenes";
                }

                //Cuando se mueve al prota, se mueve automáticamente al malo
                let timer = setTimeout(moverMalo, 1000, celdas, Array.from(celdas).indexOf(e.target));
            }
            else if (posicion_prota == Array.from(celdas).indexOf(e.target)) {
                alert("El protagonista no se puede quedar en la misma posición. Intente moverlo a otra posición diferente a la que se encuentra.");
            }
            else {
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }

        }
    });

    // Mover pulsando culsores del teclado
    let derecha = [7,15,23,31,39,47,55,63];
    document.addEventListener('keyup',(e)=>{
            // Mover a la izquierda
            if (e.keyCode==37) {
                if (derecha.includes(posicion_prota-1) || posicion_prota-1<0) {
                    alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
                }
                else{
                    celdas[posicion_prota].id = "";
                    posicion_prota -= 1;
                    celdas[posicion_prota].id = "prota";
                }
            }
            // Mover a la derecha
            else if (e.keyCode==39) {
                if ((posicion_prota+1)%8==0 || posicion_prota+1==celdas.length) {
                    alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
                }
                else{
                    celdas[posicion_prota].id = "";
                    posicion_prota += 1;
                    celdas[posicion_prota].id = "prota";
                }
            }
            // Mover arriba
            else if (e.keyCode==38) {
                if (posicion_prota-8<0) {
                    alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
                }
                else{
                    celdas[posicion_prota].id = "";
                    posicion_prota -= 8;
                    celdas[posicion_prota].id = "prota";
                }
            }
            // Mover abajo
            else if (e.keyCode==40) {
                if (posicion_prota+8>=celdas.length) {
                    alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
                }
                else{
                    celdas[posicion_prota].id = "";
                    posicion_prota += 8;
                    celdas[posicion_prota].id = "prota";
                }
            }
            // Comprueba si el prota ha conseguido llegar a la celda de los examenes
            if (posicion_prota == posicion_examenes) {
                examanes_inventario = true;
                inventario.textContent = "Examenes";
            }
        });

}

function moverMalo(celdas, pos_prota) {
    //Cambio la colección html a array
    celdas = Array.from(celdas)

    //Creo la matriz donde voy a almacenar las celdas
    let matriz = [
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
    let contador = 0;
    let indice = 0;
    celdas.forEach(element => {
        indice++;
        matriz[contador].push(element);
        if (indice % 8 == 0) {
            contador++;
        }
        //Guardo las coordenadas del protagonista
        if(element.id =="prota"){
            let filaProta = contador;
            let columnaProta = matriz[filaProta].indexOf(element);
        }
    });

    //Recorro la matriz para cambiar la posición del malo en función de las coordenadas del prota
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j].id == "malo") {
                matriz[i][j].id = "";
                if(i < fila){
                    matriz[i-1][j].id = "malo";
                }
            }
        }
    }

    // for (const e of matriz) {
    //     for (const i of e) {
    //         if(i.id == "prota"){

    //         }
    //         if(i.id == "malo"){
    //             i.id == "";
    //         }
    //     }
    // }





    // //Recorro las celdas de la tabla para encontrar la del malo
    // celdas.forEach(e => {
    //     if (e.id == "malo") {
    //         e.id = "";
    //         // if (pos_prota < celdas.indexOf(e)) {
    //         //     celdas[celdas.indexOf(e) - 1].id = "malo";
    //         // }
    //         if ((pos_prota == celdas.indexOf(e) - 8) || (pos_prota == celdas.indexOf(e) - 16) || (pos_prota == celdas.indexOf(e) - 24) || (pos_prota == celdas.indexOf(e) - 32) || (pos_prota == celdas.indexOf(e) - 40) || (pos_prota == celdas.indexOf(e) - 48) || (pos_prota == celdas.indexOf(e) - 56)) {
    //             celdas[celdas.indexOf(e) - 8].id = "malo";
    //         }
    //     }
    // });
}
