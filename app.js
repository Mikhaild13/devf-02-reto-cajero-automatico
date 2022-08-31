//Variables y arrays

const passwords = [
  { nombre: 'Mali', clave: 'mali' },
  { nombre: 'Gera', clave: 'gera' },
  { nombre: 'Maui', clave: 'maui' },
];

let accounts = [
  { nombre: 'Mali', saldo: 200 },
  { nombre: 'Gera', saldo: 290 },
  { nombre: 'Maui', saldo: 67 },
];

const screen1 = document.getElementById('screen1');
const usuario = document.getElementById('user');
const contra = document.getElementById('pass');
const loginBtn = document.getElementById('login');
const loginForm = document.getElementById('login-form');

const screen2 = document.getElementById('screen2');
const saldo = document.getElementById('saldo');
const saldoBtn = document.getElementById('funds');
const depositoBtn = document.getElementById('deposit');
const retiroBtn = document.getElementById('withdraw');

const montoForm = document.getElementById('ammount-form');
const depBox = document.getElementById('ammountDep');
const okDep = document.getElementById('okDep');
const retBox = document.getElementById('ammountRet');
const okRet = document.getElementById('okRet');
const transac = document.getElementById('transaction');

const warning = document.getElementById('error');
const alertBtn = document.getElementById('errorBtn');
const alertMsg = document.getElementById('errorMessage');

const warningLgn = document.getElementById('errorLgn');
const alertLgnBtn = document.getElementById('errorLgnBtn');
const alertLgnMsg = document.getElementById('errorLgnMessage');

const salir = document.getElementById('logOut');


//Login check

loginBtn.addEventListener('click', () => {

  if (usuario.value == '' || contra.value =='') {
    screen1.style.visibility = 'hidden';
    alertLgnMsg.innerText = 'Datos incompletos';
    warningLgn.style.visibility = 'visible';
  } else {
    let logincorrecto = passwords.filter( (pass) => usuario.value == pass.nombre && contra.value == pass.clave)
    console.log(logincorrecto)
      if (logincorrecto.length == 1) {
        screen1.style.display = 'none';
        screen2.style.display = 'flex';
        montoForm.style.visibility = 'hidden';
        localStorage.setItem('nombre', pass.nombre);
      } else {
        screen1.style.visibility = 'hidden';
        alertLgnMsg.innerText = 'Datos incorrectos';
        warningLgn.style.visibility = 'visible';
      }
  }
  loginForm.reset();
  saldo.innerText = `Bienvenido ${localStorage.getItem('nombre')}`;
})

//Mostrar saldo

saldoBtn.addEventListener('click', () => {

  accounts.map( (account) => {
    if (localStorage.getItem('nombre') == account.nombre) {
      montoForm.style.visibility = 'hidden';
      transac.style.visibility = 'hidden';
      saldo.innerText = `Saldo $${account.saldo}`;
    }
  })
})

//Depositar saldo

depositoBtn.addEventListener('click', () => {

  montoForm.style.visibility = 'visible';
  depBox.style.display = 'inline';
  okDep.style.display = 'inline';
  retBox.style.display = 'none';
  okRet.style.display = 'none';
  transac.style.visibility = 'hidden';

})

okDep.addEventListener('click', () => {

  if (depBox.value > 0) {

    accounts.forEach( (account) => {
      if (localStorage.getItem('nombre') == account.nombre) {
        if (account.saldo + depBox.valueAsNumber < 999) {
          account.saldo += depBox.valueAsNumber;
          transac.innerText = `Monto depositado: $${depBox.value}`
          depBox.value = '';
          montoForm.style.visibility = 'hidden';
          transac.style.visibility = 'visible';
          saldo.innerText = `Saldo $${account.saldo}`;
        } else {
          transac.style.visibility = 'hidden';
          screen2.style.visibility = 'hidden';
          montoForm.style.visibility = 'hidden';
          alertMsg.innerText = 'Su saldo no puede ser mayor a $999';
          warning.style.visibility = 'visible';
        }
      }
    })
  } else {
    screen2.style.visibility = 'hidden';
    montoForm.style.visibility = 'hidden';
    alertMsg.innerText = 'Ingrese un monto positivo';
    warning.style.visibility = 'visible';
  }

})

//Retirar saldo

retiroBtn.addEventListener('click', () => {

  montoForm.style.visibility = 'visible';
  retBox.style.display = 'inline';
  okRet.style.display = 'inline';
  depBox.style.display = 'none';
  okDep.style.display = 'none';
  transac.style.visibility = 'hidden';

})

okRet.addEventListener('click', () => {

  if (retBox.value > 0) {

    accounts.forEach( (account) => {
      if (localStorage.getItem('nombre') == account.nombre) {
        if (account.saldo - retBox.valueAsNumber > 9) {
          account.saldo -= retBox.valueAsNumber;
          transac.innerText = `Monto retirado: $${retBox.value}`
          retBox.value = '';
          montoForm.style.visibility = 'hidden';
          transac.style.visibility = 'visible';
          saldo.innerText = `Saldo $${account.saldo}`;
        } else {
          transac.style.visibility = 'hidden';
          screen2.style.visibility = 'hidden';
          montoForm.style.visibility = 'hidden';
          alertMsg.innerText = 'Su saldo no puede ser menor a $10';
          warning.style.visibility = 'visible';
        }
      }
    })
  } else {
    screen2.style.visibility = 'hidden';
    montoForm.style.visibility = 'hidden';
    alertMsg.innerText = 'Ingrese un monto positivo';
    warning.style.visibility = 'visible';
  }

})

//ventana de error screen1

alertLgnBtn.addEventListener('click', () => { 
  warningLgn.style.visibility = 'hidden';
  usuario.innerText = '';
  contra.innerText = '';
  screen1.style.visibility = 'visible';
})
//ventana de error screen2

alertBtn.addEventListener('click', () => { 
  depBox.value = '';
  retBox.value = '';
  warning.style.visibility = 'hidden';
  screen2.style.visibility = 'visible';
  montoForm.style.visibility = 'visible';
})

//Salir

salir.addEventListener('click', () => {
  depBox.value = '';
  retBox.value = '';
  screen1.style.display = 'inline'
  screen2.style.display = 'none'
})
