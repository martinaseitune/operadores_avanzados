//Datos Cliente//

function Cliente (nombre, mail) {
    this.nombre = nombre;
    this.mail = mail;
}


//Datos Servicio//

class Datos {
    
    constructor(tipoEvento, cantidadPersonas, barraTragos, vajilla, mesaDulce){
        this.tipoEvento = tipoEvento;
        this.cantidadPersonas = parseInt(cantidadPersonas);
        this.barraTragos = barraTragos;
        this.vajilla = vajilla;
        this.mesaDulce = mesaDulce;
    }
}


//Servicios Extra//

class Servicio{
    constructor(nombre, precioExtra){
        this.nombre = nombre;
        this.precioExtra = precioExtra;
    }
}

class Cotizacion{
    constructor(tipo){
        this.tipo = tipo;
        this.lista = [];
        this.total = 0;
        this.cantidadPersonas = 0;
        this.precioPersona = 0;
    }

    definirCantidad(cantidad){
        this.cantidadPersonas = parseInt(cantidad);
        this.precioPersona = eleccionEvento(datosDelServicio.tipoEvento);
        this.total += cantidad * this.precioPersona; 
    }

    agregarServicio(item){
        this.lista.push(item);
        this.total += item.precioExtra * this.cantidadPersonas
    }
}

const serviciosContratados = new Cotizacion;
const datosDelServicio = obtenerDatos();

//Precios//

function eleccionEvento (tipoEvento) {
    
    let precioPersona = 0;
    
    switch(tipoEvento){

        case "social":
            if(serviciosContratados.cantidadPersonas <= 100){
                precioPersona = 4500;
            } else if (serviciosContratados.cantidadPersonas <= 500){
                precioPersona = 4000;
            } else {
                precioPersona = 3500;
            }
            break;

        case "corporativo":
            if(serviciosContratados.cantidadPersonas <= 100){
                precioPersona = 5000;
            } else if (serviciosContratados.cantidadPersonas <= 500){
                precioPersona = 4500;
            } else {
                precioPersona = 4000;
            }
            break;
    }
    return precioPersona;
}


function agregarExtras(){
    datosDelServicio.barraTragos == "si" && serviciosContratados.agregarServicio(new Servicio("Barra de Tragos", 4500));
     
    datosDelServicio.vajilla == "si" && serviciosContratados.agregarServicio(new Servicio("Vajilla de Color", 2500));

    datosDelServicio.mesaDulce == "si" && serviciosContratados.agregarServicio(new Servicio("Mesa Dulce", 3000));
    
}


//Obtener datos del form//

function obtenerDatos(){
    let tipoEvento = document.getElementById("selectEvento").value;
    let cantidadPersonas = document.getElementById("cantInvitados").value;
    let barraTragos = document.getElementById("selectTragos").value;
    let vajilla = document.getElementById("selectVajilla").value;
    let mesaDulce = document.getElementById("selectDulce").value;
    
    let datos = new Datos(tipoEvento, cantidadPersonas, barraTragos, vajilla, mesaDulce);
    return datos;
 }

 function obtenerCliente(){
     let nombreCliente = document.getElementById("nombreCliente").value;
     let mailCliente = document.getElementById("mailCliente").value;

     let cliente = new Cliente(nombreCliente, mailCliente);
     return cliente;
 }



//Valido datos//

function validarNombre(valor) {
    if(valor == null || valor.length == 0) {
      return false;
    } 
    return true;
}

function validarMail(valor) {
    if(valor == null || valor.length == 0) {
      return false;
    } 
    return true;
}

function validarInvitados(valor) {
    if(valor == null || valor.length == 0 || valor == isNaN) {
      return false;
    } 
    return true;
}



let formulario = document.getElementById("formPresupuesto");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
});

function submitForm() {

    guardarCliente(obtenerCliente());
    
    serviciosContratados.definirCantidad(document.getElementById("cantInvitados").value);
    agregarExtras();
    
    mostrarPresupuesto();

}

let botonCalcular = document.getElementById("btnCalcular");

botonCalcular.onclick = () => {
    let nombreValido = validarNombre(document.getElementById("nombreCliente").value);
    let mailValido = validarMail(document.getElementById("mailCliente").value);
    let invitadosValido = validarInvitados(document.getElementById("cantInvitados").value);

    if(nombreValido && mailValido && invitadosValido){
        submitForm();
    } else{
        if(nombreValido == false){
            let nombreFalse = document.getElementById("validar-nombre");
            nombreFalse.innerHTML = "<h6>Nombre inválido</h6>";
          }
          if(mailValido == false){
            let mailFalse = document.getElementById("validar-mail");
            mailFalse.innerHTML = "<h6>Mail inválido</h6>";
          }
          if(invitadosValido == false){
            let invitadosFalse = document.getElementById("validar-invitados");
            invitadosFalse.innerHTML = "<h6>Número inválido</h6>";
          }
          return false;
    }
}



function mostrarPresupuesto(){

    let totalPresupuesto = serviciosContratados.total;

    let divPresupuesto = document.createElement("div");

    divPresupuesto.innerHTML = `<h4>Tu presupuesto total es de:</h4>
                            <h4>$${totalPresupuesto}</h4>`

    let detallePresupuesto = document.getElementById("mostrarPresupuesto");

    detallePresupuesto.append(divPresupuesto);

}

let botonLimpiar = document.getElementById("btnLimpiar");
botonLimpiar.onclick = () => {
    eliminarPresupuesto();
    localStorage.clear();
}


function eliminarPresupuesto(){

    let eliminarDiv = divPresupuesto;
    eliminarDiv.remove();
}


//Local storage

function guardarCliente(cliente) {
    let jsonCliente = { nombre: cliente.nombre, mail: cliente.mail }
    let stringifyJson = JSON.stringify(jsonCliente);
    localStorage.setItem('cliente', stringifyJson);
}
  
cargarCliente();
  
function cargarCliente() {
    let stringifyClient = localStorage.getItem('cliente');
    let cliente = JSON.parse(stringifyClient);
    if (cliente != null) {
        document.getElementById("nombreCliente").value = cliente.nombre;
        document.getElementById("mailCliente").value = cliente.mail;
  } 
  
}


