class shoppingCar {
    constructor(carrito, picadas, items) {
        let subtotal = 0
        this.carrito = carrito;
        this.picadas = picadas
        this.items = items
        this.verCompra = function(grillacarrito) {
            let grilla = "";
            for (let i in this.carrito) {
                for(let j in this.picadas){
                     if (carrito[i] == this.picadas[j].id){
                         grilla += `<tr>
                                        <td><img src="${this.picadas[j].miniaturas[0]}"></td>
                                        <td><p>${this.picadas[j].nombre}</p></td>
                                        <td><i onclick="AumentoCantidad(${j})" class="fas fa-sort-up"></i><p>${this.picadas[j].cantidadComprada}</p><i onclick="disminuyoCantidad(${j})" class="fas fa-sort-down"></i></td>
                                        <td><p>$ ${this.picadas[j].precio}</p></td>
                                        <td><p>${this.picadas[j].precio * this.picadas[j].cantidadComprada}</p></td>
                                        <td ondblclick="editoComentario(${j})" id="celdaComentario${j}"><p>${this.picadas[j].comentario}</p><span>Haz doble click para editar</span></td>
                                        <td><button onclick="consultaEliminar()">Eliminar</button></td>
                                    </tr>`
                        let botonesEliminar = ` <button onclick="cerrarEliminar()">Cancelar</button>
                                                <button onclick="eliminardelCarrito(${j})">Si, eliminar</button>`
                        document.getElementById("modalEliminar__botones").innerHTML = botonesEliminar; 
                         subtotal += this.picadas[j].precio * this.picadas[j].cantidadComprada;
                     }
                }
            }
            grillacarrito.innerHTML = grilla;
        }
        this.aumentarCantidad = function(indiceJson){
            this.picadas[indiceJson].cantidadComprada =  this.picadas[indiceJson].cantidadComprada + 1;
            this.items.push(indiceJson);
            document.getElementById("articulos").innerText = items.length;
        }
        this.disminuirCantidad = function(indiceJson){
            this.picadas[indiceJson].cantidadComprada =  this.picadas[indiceJson].cantidadComprada - 1;
            this.items.pop();
            document.getElementById("articulos").innerText = items.length;
        }
        this.editarComentario = function(indiceJson){
            let comentario = document.getElementById(`celdaComentario${indiceJson}`)
            comentario.innerHTML = `<textarea name="comentario" id="comentario2${indiceJson}" cols="40" rows="5"></textarea>
                                    <button onclick="guardoNuevoComentario(${indiceJson})">Aceptar</button>`;
            let comentario2 = document.getElementById("comentario2");
            comentario2.value = this.picadas[indiceJson].comentario;
        }
        this.guardarNuevoComemtario = function(indiceJson) {
            this.picadas[indiceJson].comentario = document.getElementById(`comentario2${indiceJson}`).value;
        }
        this.verTotales = function(grillatotales){
            let descuento = 0;
            let totalFinal = subtotal;
            if (items.length >= 3){
                descuento = subtotal*0.1
                let totalFinal = subtotal - descuento
                let grilla = `<tr><td>SUBTOTAL</td><td>$ ${subtotal.toFixed(2)}</td></tr>
                              <tr><td>DESCUENTO</td><td>$ ${descuento.toFixed(2)}</td></tr>
                              <tr><td>TOTAL</td><td>$ ${totalFinal.toFixed(2)}</td></tr>`
                              
                grillatotales.innerHTML = grilla;
            } else {
                let grilla = `<tr><td>SUBTOTAL</td><td>$ ${subtotal.toFixed(2)}</td></tr>
                              <tr><td>DESCUENTO</td><td>$ ${descuento.toFixed(2)}</td></tr>
                              <tr><td>TOTAL</td><td>$ ${totalFinal.toFixed(2)}</td></tr>`
                grillatotales.innerHTML = grilla;
            }
        }
        this.eliminarDelCarrito = function(indiceJson){
            let cantidadEliminar = document.getElementById("cantidadEliminar").value;
            if (cantidadEliminar > this.picadas[indiceJson].cantidadComprada ){
                this.picadas[indiceJson].cantidadComprada = 0;
            } else {
                this.picadas[indiceJson].cantidadComprada =  this.picadas[indiceJson].cantidadComprada - Number(cantidadEliminar);
            }
            if (this.picadas[indiceJson].cantidadComprada <= 0){
                for (let i in this.carrito){
                    if (this.picadas[indiceJson].id == carrito[i]){
                        this.carrito.splice(i, 1);
                        this.picadas[indiceJson].comentario = "";
                        switch (cantidadEliminar){
                            case "1":
                                this.items.pop();
                                break;
                            case "2":
                                this.items.pop();
                                this.items.pop();
                                break
                            case "3":
                                this.items.pop();
                                this.items.pop();
                                this.items.pop();
                                break
                            case "4":
                                this.items.pop();
                                this.items.pop();
                                this.items.pop();
                                this.items.pop();
                                break
                        }
                        document.getElementById("articulos").innerText  = this.items.length;
                        document.getElementById("cantidadEliminar").value = "";
                        cerrarEliminar();
                        cargarCarrito();
                    }
                }
            
            } else {
                switch (cantidadEliminar){
                    case "1":
                        this.items.pop();
                        break;
                    case "2":
                        this.items.pop();
                        this.items.pop();
                        break
                    case "3":
                        this.items.pop();
                        this.items.pop();
                        this.items.pop();
                        break
                    case "4":
                        this.items.pop();
                        this.items.pop();
                        this.items.pop();
                        this.items.pop();
                        break
                }
                document.getElementById("articulos").innerText = this.items.length;
                document.getElementById("cantidadEliminar").value = "";
                cerrarEliminar();
                cargarCarrito();
            }
        }
    }
}