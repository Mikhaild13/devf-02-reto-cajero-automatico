//Variables y arrays

let passwords = [
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
const loginbtn = document.getElementById('login');
const loginForm = document.getElementById('login-form');

const screen2 = document.getElementById('screen2');
const saldo = document.getElementById('saldo');
const saldobtn = document.getElementById('funds');
const depositobtn = document.getElementById('deposit');
const retirobtn = document.getElementById('withdraw');

const montoForm = document.getElementById('ammount-form');
const depbox = document.getElementById('ammountdep');
const okdep = document.getElementById('okdep');
const retbox = document.getElementById('ammountret');
const okret = document.getElementById('okret');
const transac = document.getElementById('transaction');

const warning = document.getElementById('error');
const alertbtn = document.getElementById('errorbtn');
const alertmsg = document.getElementById('errormessage');

const warninglgn = document.getElementById('errorlgn');
const alertlgnbtn = document.getElementById('errorlgnbtn');
const alertlgnmsg = document.getElementById('errorlgnmessage');

const salir = document.getElementById('logout');


//Login check

loginbtn.addEventListener('click', () => {

  if (usuario.value == '' || contra.value =='') {
    screen1.style.visibility = 'hidden';
    alertlgnmsg.innerText = 'Datos incompletos';
    warninglgn.style.visibility = 'visible';
  } else {
    passwords.filter( (pass) => {
    if (usuario.value == pass.nombre && contra.value == pass.clave) {
      screen1.style.display = 'none';
      screen2.style.display = 'flex';
      montoForm.style.visibility = 'hidden';
      localStorage.setItem('nombre', pass.nombre);
    } 
    // alert('Usuario y/o contraseña incorrecto');
  })
  }
    
  loginForm.reset();
  saldo.innerText = `Bienvenido ${localStorage.getItem('nombre')}`;
})

//Mostrar saldo

saldobtn.addEventListener('click', () => {

  accounts.map( (account) => {
    if (localStorage.getItem('nombre') == account.nombre) {
      montoForm.style.visibility = 'hidden';
      transac.style.visibility = 'hidden';
      saldo.innerText = `Saldo $${account.saldo}`;
    }
  })
})

//Depositar saldo

depositobtn.addEventListener('click', () => {

  montoForm.style.visibility = 'visible';
  depbox.style.display = 'inline';
  okdep.style.display = 'inline';
  retbox.style.display = 'none';
  okret.style.display = 'none';
  transac.style.visibility = 'hidden';

})

okdep.addEventListener('click', () => {

  if (depbox.value > 0) {

    accounts.forEach( (account) => {
      if (localStorage.getItem('nombre') == account.nombre) {
        if (account.saldo + depbox.valueAsNumber < 999) {
          account.saldo += depbox.valueAsNumber;
          transac.innerText = `Monto depositado: $${depbox.value}`
          depbox.value = '';
          montoForm.style.visibility = 'hidden';
          transac.style.visibility = 'visible';
          saldo.innerText = `Saldo $${account.saldo}`;
        } else {
          transac.style.visibility = 'hidden';
          screen2.style.visibility = 'hidden';
          montoForm.style.visibility = 'hidden';
          alertmsg.innerText = 'Su saldo no puede ser mayor a $999';
          warning.style.visibility = 'visible';
        }
      }
    })
  } else {
    screen2.style.visibility = 'hidden';
    montoForm.style.visibility = 'hidden';
    alertmsg.innerText = 'Ingrese un monto positivo';
    warning.style.visibility = 'visible';
  }

})

//Retirar saldo

retirobtn.addEventListener('click', () => {

  montoForm.style.visibility = 'visible';
  retbox.style.display = 'inline';
  okret.style.display = 'inline';
  depbox.style.display = 'none';
  okdep.style.display = 'none';
  transac.style.visibility = 'hidden';

})

okret.addEventListener('click', () => {

  if (retbox.value > 0) {

    accounts.forEach( (account) => {
      if (localStorage.getItem('nombre') == account.nombre) {
        if (account.saldo - retbox.valueAsNumber > 9) {
          account.saldo -= retbox.valueAsNumber;
          transac.innerText = `Monto retirado: $${retbox.value}`
          retbox.value = '';
          montoForm.style.visibility = 'hidden';
          transac.style.visibility = 'visible';
          saldo.innerText = `Saldo $${account.saldo}`;
        } else {
          transac.style.visibility = 'hidden';
          screen2.style.visibility = 'hidden';
          montoForm.style.visibility = 'hidden';
          alertmsg.innerText = 'Su saldo no puede ser menor a $10';
          warning.style.visibility = 'visible';
        }
      }
    })
  } else {
    screen2.style.visibility = 'hidden';
    montoForm.style.visibility = 'hidden';
    alertmsg.innerText = 'Ingrese un monto positivo';
    warning.style.visibility = 'visible';
  }

})

//ventana de error screen1

alertlgnbtn.addEventListener('click', () => { 
  warninglgn.style.visibility = 'hidden';
  usuario.innerText = '';
  contra.innerText = '';
  screen1.style.visibility = 'visible';
})
//ventana de error screen2

alertbtn.addEventListener('click', () => { 
  depbox.value = '';
  retbox.value = '';
  warning.style.visibility = 'hidden';
  screen2.style.visibility = 'visible';
  montoForm.style.visibility = 'visible';
})

//Salir

salir.addEventListener('click', () => {
  depbox.value = '';
  retbox.value = '';
  screen1.style.display = 'inline'
  screen2.style.display = 'none'
})
