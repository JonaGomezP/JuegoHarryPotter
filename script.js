window.onload = () =>{
    // Selecciono todas las celdas de la tabla
    let celdas = document.querySelectorAll("td");
    
    // Coloco al protagonista y guardo su posición en una variable
    let posicion_prota = 0;
    celdas[posicion_prota].id = "prota";

    // Genero la posición de los examenes, guardo dicha posición en una variable y coloco los examenes en el tablero
    let posicion_examenes = parseInt(Math.random()*62+1);
    celdas[posicion_examenes].id = "examenes";

    // Creo una variable inicializada a "false" para almacenar los examenes (false: no tiene los examenes  --  True: tiene los examenes)
    let examanes_inventario = false;

    // Selecciono el "inventario"
    let inventario = document.getElementById("inventario");

    // Recorro todas las celdas de la tabla
    celdas.forEach((i)=>{
        // Añado el evento "onclick" a cada una de las celdas
        i.onclick = (e)=>{
            // Compruebo si el movimiento que quiere hacer el usuario es correcto
            if (posicion_prota+1==Array.from(celdas).indexOf(e.target) || posicion_prota-1==Array.from(celdas).indexOf(e.target) || posicion_prota+8==Array.from(celdas).indexOf(e.target) || posicion_prota-8==Array.from(celdas).indexOf(e.target)) {
                celdas[posicion_prota].id = "";
                posicion_prota = Array.from(celdas).indexOf(e.target);
                e.target.id = "prota";
                // Compruebo si el protagonista ha conseguido los examenes
                if (posicion_prota == posicion_examenes) {
                    examanes_inventario = true;
                    inventario.textContent = "Examenes";
                }
            }
            else if (posicion_prota==Array.from(celdas).indexOf(e.target)) {
                alert("El protagonista no se puede quedar en la misma posición. Intente moverlo a otra posición diferente a la que se encuentra.");
            }
            else{
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
        }
    });

}