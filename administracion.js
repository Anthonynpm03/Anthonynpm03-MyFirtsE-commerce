let carrito = [];
let items = [];
let changuito = "";
let campoProductos = document.getElementById("campoProductos");
let listadoDeProductos = document.getElementById("listadoDeProductos");
let modalProduct = document.getElementById("modalProduct");
let closeModal = document.getElementsByClassName("close");
let modalProduct__smallImg = document.getElementById("modalProduct__smallImg");
let modalProduct__bigImg = document.getElementById("modalProduct__bigImg"); 
let modalConfirmacion = document.getElementById("modalConfirmacion");
let contenidoCarrito = document.getElementById("contenidoCarrito");
let totalesCarrito = document.getElementById("totalesCarrito");
let divCarrito = document.getElementById("carrito");
let campoRegistro = document.getElementById("registro");
let formRegistro = document.getElementById("formRegistro");
let nameUsuario = document.getElementById("name");
let emailUsuario = document.getElementById("email");
let passwordUsuario = document.getElementById("password");
let confirmacion = document.getElementById("confirmacion");
let emailCheck = false;
let emailIngreso = document.getElementById("emailIngreso");
let passwordIngreso = document.getElementById("passwordIngreso");
let ingresado = false;

function ChequearLocalStorage(){
    if (localStorage.getItem("USUARIOS") != undefined){
        USUARIOS = JSON.parse(localStorage.USUARIOS);
    }
}


function cargoProductos(div) {
    let contenido = "<p>No hay contenido disponible</p>"
    if (PICADAS.length > 0) {
        contenido = ""
        for (let i in PICADAS) {
            contenido += `
                         <div class="cardProduct" onclick="cargarModal(${i})">
                            <div class="cardProduct__img">
                               <img src="${PICADAS[i].imagen}">
                            </div>
                            <div class="cardProduct__info">
                               <div class="cardProduct__infoVisible">
                                  <h3>${PICADAS[i].nombre}</h3>
                                  <h4>Ingredientes:</h4>
                                  <p>${PICADAS[i].ingredientes}</p>
                               </div>
                               <div class="cardProduct__infoHide">
                                  <h3>$ ${PICADAS[i].precio} </h3>
                                  <p>3x $ ${(PICADAS[i].precio/3).toFixed(2)} sin interés
                               </div>
                            </div>
                         </div>
                          `                 
        }
    }
    div.innerHTML = contenido;
} 

function cargarModal(i){

    modalProduct__smallImg.innerHTML = `<img src="${PICADAS[i].miniaturas[0]}" onmousemove="cambioFondo(${i}, 0)">
                                        <img src="${PICADAS[i].miniaturas[1]}" onmousemove="cambioFondo(${i}, 1)">
                                        <img src="${PICADAS[i].miniaturas[2]}" onmousemove="cambioFondo(${i}, 2)">`;                           
    
    modalProduct__bigImg.style.backgroundImage = `url(${PICADAS[i].imagen})`;

    modalProduct__text.innerHTML = ` 
                                     <h3>${PICADAS[i].nombre}</h3>
                                     <h3>${PICADAS[i].cantidad}</h3>
                                     <h4>Ingredientes:</h4>
                                     <p>${PICADAS[i].ingredientes}</p>
                                     <p>Indicar en la caja de comentarios cualquier cambio que desee realizar.</p>
                                     <span>${PICADAS[i].precio}</span>
                                     <p>3x ${(PICADAS[i].precio/3).toFixed(2)} sin interés</p>
                                     <a href="#">Ver medios de pagos</a>
                                     `;

    document.getElementById("contenedorBotonCarrito").innerHTML = `<button id="botonCarrito" class="botondesactivado" onclick="verificarItem(${PICADAS[i].id})">Agregar a Carrito</button>`

    modalProduct.classList.toggle("hide");
    document.getElementById("cantidad").addEventListener("change", () => subTotal(PICADAS[i].precio));
    document.getElementById("cantidad").addEventListener("change", () => activarBoton());
    
}

function cambioFondo(i, miniatura){
    modalProduct__bigImg.style.backgroundImage = `url(${PICADAS[i].miniaturas[miniatura]})`;
}

function activarBoton(){
    let cantidad = document.getElementById("cantidad").value;
    if (cantidad != "0"){
        document.getElementById("botonCarrito").classList.remove("botondesactivado");
        document.getElementById("botonCarrito").classList.add("botonactivado");
    } else if (cantidad == "0"){
        document.getElementById("botonCarrito").classList.remove("botonactivado");
        document.getElementById("botonCarrito").classList.add("botondesactivado");
    }
}

function subTotal(precio){
    let cantidad = document.getElementById("cantidad").value;
    document.getElementById("subTotal").innerText = (precio * cantidad).toFixed(2);
}

function ocultarModal(){
    document.getElementById("comentario").value = "";
    document.getElementById("cantidad").value = "0";
    document.getElementById("subTotal").innerText = "0.00";
    modalProduct.classList.toggle("hide");
}

function verificarItem(picadaid){
    if (ingresado == true){
        let mensaje = document.getElementById("mensajeNotificacion");
   let cardConfirmacion__botones = document.getElementById("cardConfirmacion__botones");
   let botonacepto = "";
   let verificacion = true;
   if (verificacion == true){
    for (i in carrito){
        if (picadaid == carrito[i]){
            mensaje.innerText = "Ya tiene incluido este producto en tu carrito. ¿Deseas agregarlo nuevamente?"
            botonacepto = ` <button id="cancelarNotificacion" onclick="cerrarNotificacion()">Cancelar</button>
                            <button onclick="agregarItem(${picadaid}), cerrarNotificacion()" id="aceptoNotificacion">Aceptar</button>`
            cardConfirmacion__botones.innerHTML = botonacepto;
            abrirNotificacion();
            verificacion = false;
            break
        }         
      }
   }
    if (verificacion == true) {
        mensaje.innerText = "¿Desea incluir este producto a su carrito?";
        botonacepto = ` <button id="cancelarNotificacion" onclick="cerrarNotificacion()">Cancelar</button>
                        <button onclick="agregarCarrito(${picadaid}), cerrarNotificacion()" id="aceptoNotificacion">Aceptar</button>`
        cardConfirmacion__botones.innerHTML = botonacepto;
        abrirNotificacion();
    }
    } else {
        alert("Debes iniciar sesion para agregar articulos al carrito");
    }
   
    
}

function abrirNotificacion(){
    modalConfirmacion.classList.toggle("hide");
}

function cerrarNotificacion(){
    modalConfirmacion.classList.toggle("hide");
}

function aceptoNotificacion(){
    modalConfirmacion.classList.toggle("hide");
    alert("Se agrego el producto a tu carrito!");
}

function agregarCarrito(picadaid){
    
    let cantidad = document.getElementById("cantidad").value;
    let comentario = document.getElementById("comentario").value;
    switch (cantidad){
        case "0":

            break;
        case "1":
            carrito.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario = comentario;
                }
            }
            break
        case "2":
            carrito.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario = comentario;
                }
            }
            break
        case "3":
            carrito.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario = comentario;
                }
            }
            break
        case "4":
            carrito.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario = comentario;
                }
            }
            break
    }
}

function agregarItem(picadaid){
   
    let cantidad = document.getElementById("cantidad").value;
    let comentario = document.getElementById("comentario").value;
    switch (cantidad){
        case "0":

            break;
        case "1":
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario += ` ${comentario}`;
                }
            }
            break
        case "2":
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario += ` ${comentario}`;
                }
            }
            break
        case "3":
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario += ` ${comentario}`;
                }
            }
            break
        case "4":
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            items.push(picadaid);
            document.getElementById("articulos").innerText = items.length;
            for (let i in PICADAS) {
                if (PICADAS[i].id == picadaid){
                    PICADAS[i].cantidadComprada += Number(cantidad);
                    PICADAS[i].comentario += ` ${comentario}`;
                }
            }
            break
    }
}

function cargarCarrito() {
    changuito = new shoppingCar(carrito, PICADAS, items);
    if (carrito.length == 0) {
        changuito.verCompra(contenidoCarrito);
        changuito.verTotales(totalesCarrito);
        campoProductos.classList.add("block");
        divCarrito.classList.remove("block");
        alert("no tienes articulos agregados a tu carrito");
    } else {
        changuito.verCompra(contenidoCarrito);
        changuito.verTotales(totalesCarrito);
        campoProductos.classList.add("block");
        divCarrito.classList.remove("block");
    }
}

function AumentoCantidad(indiceJson) {
    changuito.aumentarCantidad(indiceJson);
    cargarCarrito();
}

function disminuyoCantidad(indiceJson) {
    changuito.disminuirCantidad(indiceJson);
    if (PICADAS[indiceJson].cantidadComprada == 0){
        for (let i in carrito){
            if (carrito[i] == PICADAS[indiceJson].id){
                carrito.splice(i, 1);
                cargarCarrito();
            }
        }
    } else {
        cargarCarrito();
    }
   
}

function editoComentario(indiceJson){
    changuito.editarComentario(indiceJson);
}

function guardoNuevoComentario(indiceJson){
    changuito.guardarNuevoComemtario(indiceJson);
    cargarCarrito();
}

function VolveraListado() {
    campoProductos.classList.remove("block");
    divCarrito.classList.add("block");
}

function consultaEliminar() {
    document.getElementById("modalEliminar").classList.remove("hide");
}

function cerrarEliminar(){
    document.getElementById("modalEliminar").classList.add("hide");
}

function eliminardelCarrito(indiceJson){
    changuito.eliminarDelCarrito(indiceJson);
}

function abrirRegistro(){
    campoProductos.classList.add("block");
    campoRegistro.classList.remove("block");
    campoRegistro.classList.add("alinear");
    document.getElementById("banner").classList.add("block");
}

function guardoRegistro(){
    if (USUARIOS.length == 0){
        USUARIOS.push(
            {"nombre": `${nameUsuario.value}`, 
             "email": `${emailUsuario.value}`, 
             "password": `${passwordUsuario.value}`,}
             );
             alert("Tu registro se completo exitosamente");
    } else{
        let existe = false
        for (let i in USUARIOS){
            if (USUARIOS[i].email == document.getElementById("email").value){
                alert("Este email ya esta siendo utilizado");
                existe = true;
                break;
            }
        }
        if(existe == false){
            USUARIOS.push(
                {"nombre": `${nameUsuario.value}`, 
                 "email": `${emailUsuario.value}`, 
                 "password": `${passwordUsuario.value}`,}
                    );
            alert("Tu registro se completo exitosamente");
        }
    }
    localStorage.setItem("USUARIOS", JSON.stringify(USUARIOS));
    nameUsuario.value = "";
    emailUsuario.value = "";
    passwordUsuario.value = "";
    confirmacion.value = "";
}

function verificarRegistro(){
    if (emailCheck= true  && passwordUsuario.value == confirmacion.value){
        if (passwordUsuario.value.length > 8){
            guardoRegistro()
        document.getElementById("advertenciaForm").innerText = ""
        } else{
            document.getElementById("advertenciaForm").innerText = "Por favor revisa tu informacion"
        }
    } else{
        document.getElementById("advertenciaForm").innerText = "Por favor revisa tu informacion"
    }
}

function Ingreso(){
    console.log("hola")
    let email = emailIngreso.value;
    let password = passwordIngreso.value;
    if (USUARIOS == ""){
        alert("No estas registrado");
    } else {
        for (let i in USUARIOS) {
            if (email == USUARIOS[i].email && password == USUARIOS[i].password){
                alert("ingresaste con exito")
                yaIngresado(USUARIOS[i].nombre)
                ingresado = true;
                break;
                x|x|x
            } 
        }
        if (ingresado == false){
            alert("Usuario o constraseña invalidos");
        emailIngreso.value = "";
        passwordIngreso.value = "";
        } 
    }
}

function yaIngresado(usuario){
    document.getElementById("usuario").innerHTML = `<details>
                                                         <summary>
                                                            Hola, ${usuario}
                                                         </summary>
                                                        <p onclick="cerrarSesion()">Cerrar sesión</p>
                                                    </details>`;
}

function cerrarSesion(){
    alert("Regresa pronto!")
    ingresado = false;
    document.getElementById("usuario").innerHTML = `<li>
                                                        <details>
                                                            <summary>
                                                                 Ingresar
                                                            </summary>
                                                            <input id="emailIngreso" type="email" placeholder="Example@gmail.com">
                                                            <input id="passwordIngreso" type="password" placeholder="*********">
                                                            <p onclick="Ingreso()">INGRESAR</p>
                                                        </details>
                                                    </li>
                                                    <li><a href="#" onclick="abrirRegistro()">Registrarse</a></li>`
    items = "";
    carrito = "";
    changuito.verCompra(contenidoCarrito);
    document.getElementById("articulos").innerText = items.length;

}

function mostrarInicio(){
    campoProductos.classList.remove("block");
    divCarrito.classList.add("block");
    campoRegistro.classList.add("block");
    campoRegistro.classList.remove("alinear");
}







