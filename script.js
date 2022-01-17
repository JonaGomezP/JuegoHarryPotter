window.onload = () =>{
    // Posición inicial prota
    let posicion_prota = 0;

    // Genero la posición de los examenes y los coloco en el tablero
    let posicion_examenes = parseInt(Math.random()*62+1);
    let examenes = document.querySelectorAll("td")[posicion_examenes];
    examenes.id = "examenes";
    
    // Selecciono la celda en la que se encuentra el prota
    let prota = document.querySelectorAll("td")[posicion_prota];

    // Asigno a la celda en la que se encuentra el prota el id "prota"
    prota.id = "prota";

    // Selecciono el formulario y los botones que hay en su interior
    let form = document.querySelector("form");
    let arriba = form.arriba;
    let izquierda = form.izquierda;
    let derecha = form.derecha;
    let abajo = form.abajo;

    // Deshabilito los botones de arriba e izquierda
    arriba.disabled = true;
    izquierda.disabled = true;

    // Creo una variable inicializada a "false" para almacenar los examenes (false: no tiene los examenes  --  True: tiene los examenes)
    let examanes_inventario = false;

    // Selecciono el "inventario"
    let inventario = document.getElementById("inventario");

    // Mover hacia abajo
    abajo.onclick = () => {
        if (arriba.disabled) {
            arriba.disabled = false;
        }
        prota.id = "";
        posicion_prota += 8;
        prota = document.querySelectorAll("td")[posicion_prota];
        prota.id = "prota";
        if (posicion_prota>=56 && posicion_prota<=63) {
            abajo.disabled = true;
        }
        if (posicion_prota == posicion_examenes) {
            examanes_inventario = true;
            inventario.textContent = "Examenes";
        }
    }

    // Mover hacia arriba
    arriba.onclick = () => {
        if (abajo.disabled) {
            abajo.disabled = false;
        }
        prota.id = "";
        posicion_prota -= 8;
        prota = document.querySelectorAll("td")[posicion_prota];
        prota.id = "prota";
        if (posicion_prota>=0 && posicion_prota<=7) {
            arriba.disabled = true;
        }
        if (posicion_prota == posicion_examenes) {
            examanes_inventario = true;
            inventario.textContent = "Examenes";
        }
    }

    // Mover hacia la izquierda
    izquierda.onclick = () => {
        if (derecha.disabled) {
            derecha.disabled = false;
        }
        prota.id = "";
        posicion_prota -= 1;
        prota = document.querySelectorAll("td")[posicion_prota];
        prota.id = "prota";
        if (posicion_prota%8==0 || posicion_prota==0) {
            izquierda.disabled = true;
        }
        if (posicion_prota == posicion_examenes) {
            examanes_inventario = true;
            inventario.textContent = "Examenes";
        }
    }

    // Mover hacia la derecha
    derecha.onclick = () => {
        if (izquierda.disabled) {
            izquierda.disabled = false;
        }
        const fin_derecha = [7,15,23,31,39,47,55,63];
        prota.id = "";
        posicion_prota += 1;
        prota = document.querySelectorAll("td")[posicion_prota];
        prota.id = "prota";
        if (fin_derecha.includes(posicion_prota)) {
            derecha.disabled = true;
        }
        if (posicion_prota == posicion_examenes) {
            examanes_inventario = true;
            inventario.textContent = "Examenes";
        }
    }
}