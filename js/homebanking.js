//Declaración de variables
let nombreUsuario = 'mike';
let saldoCuenta = 10000;
let limiteExtraccion = saldoCuenta * 0.9;

const Agua = {
    nombre: 'agua',
    Precio: 3500
}
const Telefono = {
    nombre: 'Telefono',
    Precio: 4250
}
const Luz = {
    nombre: 'Luz',
    Precio: 2100
}
const Internet = {
    nombre: 'Internet',
    Precio: 5700
}

const cuentaAmiga1 = {
    nombre: 'Cuenta amiga 1',
    numeroCuenta: 1234567
}

const cuentaAmiga2 = {
    nombre: 'Cuenta amiga 2',
    numeroCuenta: 7654321
}

const servicios = [Agua, Telefono, Luz, Internet];
const cuentasAmiga = [cuentaAmiga1, cuentaAmiga2];


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar


function CalcularTransaccion(accion) {
    const value = prompt(`Digita la cantidad de dinero a ${accion}:`);
    if ("" !== value && value !== null) {
        if (!isNaN(value)) {
            switch (accion) {
                case 'depositar':
                    Transaccion(value, accion);
                    break;
                case 'retirar':
                    if (parseInt(value) <= saldoCuenta) {
                        if (parseInt(value) <= limiteExtraccion) {
                            if (parseInt(value) % 100 === 0) {
                                Transaccion(value, accion);
                            } else {
                                swal("Upss", "Solo puedes retirar en billetes de 100", "error");
                            }
                        } else {
                            swal("Upss", "La cantidad a retirar es mayor al límite de extracción", "error");
                        }
                    } else {
                        swal("Upss", "La cantidad a retirar es mayor al saldo actual", "error");
                    }
                    break;
                case 'transferir':
                    if (parseInt(value) <= saldoCuenta && (parseInt(value) <= limiteExtraccion)) {
                        transferirCuenta(value, accion);
                    } else {
                        swal("Upss", "No se puede transferir esa cantidad de dinero", "error");
                    }
                    break;
                default:
                    swal("Upss!", "No has seleccionado una opción correcta", "error");
                    break;
            }
        }
        else {
            swal("Upss", "No es un valor valido", "error");
        }
    } else {
        swal("Upss", "No has digitado ningún valor", "error");
    }
}

// Realiza funcion de depositar y retirar.
function Transaccion(value, accion) {
    var saldoActual = saldoCuenta;
    if (accion == 'depositar') {
        saldoCuenta += parseInt(value);
        limiteExtraccion = saldoCuenta * 0.9;
        swal("Genial!", `Has depositado: $${value} 
                                Saldo anterior: $${saldoActual} 
                                Saldo actual: $${saldoCuenta}`);

    }
    else {
        saldoCuenta -= parseInt(value);
        limiteExtraccion = saldoCuenta * 0.9;
        swal("Genial!", `Has retirado: $${value} 
                                Saldo anterior: $${saldoActual} 
                                Saldo actual: $${saldoCuenta}`);
    }
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

/// transferir a la cuenta de un amigo.
function transferirCuenta(valorCuenta, accion) {
    let cuenta = prompt('Digita la cuenta amiga a transferir de dinero');
    if (!isNaN(cuenta)) {
        cuenta = parseInt(cuenta);
        debugger
        switch (cuenta) {
            case cuentasAmiga[0].numeroCuenta:
                TransferirAmigo(valorCuenta, cuentasAmiga[0].numeroCuenta);
                break;
            case cuentasAmiga[1].numeroCuenta:
                TransferirAmigo(valorCuenta, cuentasAmiga[1].numeroCuenta);
                break;
            default:
                swal("Upss", "Has digitado un número de cuenta que no esta en tu lista de referidos", "error");
                break;
        }
    }
    else {
        swal("Upss", "No es un valor valido", "error");
    }
}

/// Transferencia a un amigo.
function TransferirAmigo(valorCuenta, amigo) {
    if ("" !== valorCuenta && valorCuenta !== null) {
        if (parseInt(valorCuenta) <= saldoCuenta) {
            if (parseInt(valorCuenta) <= limiteExtraccion) {
                var saldoActual = saldoCuenta;
                saldoCuenta -= parseInt(valorCuenta);
                limiteExtraccion = saldoCuenta * 0.9;
                alert(`Has transferido: $${valorCuenta} \nCuenta destino: ${amigo}`);
                actualizarSaldoEnPantalla();
                actualizarLimiteEnPantalla();
            } else {
                swal("Upss", "La cantidad a transferir es mayor al límite de extracción", "error");
            }
        } else {
            swal("Upss", "La cantidad a transferir es mayor al saldo actual", "error");
        }
    } else {
        swal("Upss", "No has digitado ningún valor", "error");
    }
}

/// Realiza pago a servicios.
function realizarPago() {
    swal("Servicios", "Ingresa el numero del servicio a pagar \n 1.agua - $3500 \n 2.telefono - $4250 \n 3.luz - $2100 \n 4.Internet - $5700", {
        content: "input",
    })
        .then((value) => {
            if ("" !== value && value !== null) {
                let servicio = parseInt(value);
                servicio -= 1;
                switch (servicio) {
                    case 0:
                        PagoServicio(servicio);
                        break;
                    case 1:
                        PagoServicio(servicio);
                        break;
                    case 2:
                        PagoServicio(servicio);
                        break;
                    case 3:
                        PagoServicio(servicio);
                        break;
                    default:
                        swal("Upss", "No existe el servicio que ha seleccionado", "error");
                        break;
                }
            }
            else {
                swal("Upss", "No has seleccionado ningún servicio", "error");
            }
        });
}

/// pago de servicio
function PagoServicio(servicio) {
    if (servicios[servicio].Precio <= saldoCuenta && servicios[servicio].Precio <= limiteExtraccion) {
        var saldoActual = saldoCuenta;
        saldoCuenta -= servicios[servicio].Precio;
        limiteExtraccion = saldoCuenta * 0.9;
        swal("Genial!", `Has pagado el servicio de ${servicios[servicio].nombre}.
                            Saldo anterior: $${saldoActual} 
                            Dinero descontado: $${servicios[servicio].Precio} 
                            Saldo actual: $${saldoCuenta}`);
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    } else {
        swal("Upss", "No hay suficiente saldo en la cuenta para pagar este servicio", "error");
    }
}

function cambiarLimiteDeExtraccion() {
    let limite = prompt('Digita el nuevo valor de transacción');
    if (!isNaN(limite)) {
        if (limite <= saldoCuenta) {
            var limiteActual = limiteExtraccion;
            limiteExtraccion = parseInt(limite);
            swal("Genial!", `Has cambiado el limite de extracción. 
                    limite anterior: $${limiteActual} 
                    limite actual: $${limite}`);
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();
        }
        else {
            swal("Upss", "El monto es mayor al saldo en la cuenta", "error");
        }
    }
    else {

    }
}

function extraerDinero(dineroARetirar) {
    CalcularTransaccion('retirar');
}

function depositarDinero() {
    CalcularTransaccion('depositar');
}

function pagarServicio() {
    realizarPago();
}

function transferirDinero() {
    CalcularTransaccion('transferir');
}

function Salir() {
    window.location.href = "./index.html";
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    swal("Bienvenido/a", "Ya puedes empezar a realizar operaciones", "success");
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + sessionStorage.getItem("usuario");
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}