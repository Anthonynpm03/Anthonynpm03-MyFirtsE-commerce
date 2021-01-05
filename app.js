cargoProductos(listadoDeProductos);
ChequearLocalStorage();

emailUsuario.addEventListener("blur", ()=>{
    let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!regexEmail.test(emailUsuario.value)) {
        document.getElementById("advertenciaEmail").innerText = "Verifica de direccion de Email"
    } else {
        document.getElementById("advertenciaEmail").innerText = ""
        emailCheck = true;
    }
})


passwordUsuario.addEventListener("blur", ()=>{
  if(passwordUsuario.value.length < 8){
      document.getElementById("advertenciaPassword").innerText = "La contraseña debe tener mas de 8 caracteres"
  } else {
      document.getElementById("advertenciaPassword").innerText = ""
  }
})

confirmacion.addEventListener("change", ()=> {
    if(confirmacion.value != passwordUsuario.value){
        document.getElementById("advertenciaConfirmacion").innerText = "Debe ser igual a tu contraseña"
    } else{
        document.getElementById("advertenciaConfirmacion").innerText = ""
    }
})

