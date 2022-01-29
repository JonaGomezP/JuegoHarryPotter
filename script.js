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

    // Selecciono el "inventario" y sus elementos
    let inventario = document.getElementById("boxs-inventario");
    let img_inventario = document.getElementById("img");
    let info_inventario = document.getElementById("info");

    // Recorro todas las celdas de la tabla
    celdas.forEach((i)=>{
        // Añado el evento "onclick" a cada una de las celdas
        i.onclick = (e)=>{
            // Comprueba que ya tiene los examenes
            if (examanes_inventario) {
                celdas[posicion_prota].id = "";
                posicion_prota = Array.from(celdas).indexOf(e.target);
                e.target.id = "prota_con_ex";
            }
            // Compruebo si el movimiento que quiere hacer el usuario es correcto
            else if (posicion_prota+1==Array.from(celdas).indexOf(e.target) || posicion_prota-1==Array.from(celdas).indexOf(e.target) || posicion_prota+8==Array.from(celdas).indexOf(e.target) || posicion_prota-8==Array.from(celdas).indexOf(e.target)) {
                celdas[posicion_prota].id = "";
                posicion_prota = Array.from(celdas).indexOf(e.target);
                e.target.id = "prota";
                // Compruebo si el protagonista ha conseguido los examenes y los añado al inventario
                if (posicion_prota == posicion_examenes) {
                    examanes_inventario = true;
                    e.target.id = "prota_con_ex";
                    inventario.style.display = "block";
                    let examenes = document.createElement("img");
                    examenes.src = "img/examenes_inv.png";
                    // examenes.style.margin = "5%";  //NO SE HACE BIEN
                    img_inventario.appendChild(examenes);
                    let texto = document.createElement("span");
                    // texto.style.margin = "5%";  //NO SE HACE BIEN
                    texto.appendChild(document.createTextNode("Examenes"));
                    info_inventario.appendChild(texto);
                }
            }
            // Compruebo que el movimiento es a la misma posición en la que se encuentra
            else if (posicion_prota==Array.from(celdas).indexOf(e.target)) {
                alert("El protagonista no se puede quedar en la misma posición. Intente moverlo a otra posición diferente a la que se encuentra.");
            }
            // Compruebo que el movimiento no es correcto
            else{
                alert("Ha esa posición no se puede mover. Intentelo de nuevo con otra posición.");
            }
        }
    });

}