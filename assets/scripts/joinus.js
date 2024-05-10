
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

import {
  getDatabase,
  ref,
  set,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyB8mt1jGbUSFDmTi3E4UZo5halIrR6t1UQ',
  authDomain: 'books-3aa24.firebaseapp.com',
  databaseURL: 'https://books-3aa24-default-rtdb.firebaseio.com',
  projectId: 'books-3aa24',
  storageBucket: 'books-3aa24.appspot.com',
  messagingSenderId: '552713213518',
  appId: '1:552713213518:web:49e0a2784b52897863551f',
  measurementId: 'G-JQ7DXNZY66',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const modalInputsSelector = document.querySelectorAll(".modal_inner_div input")

const usernameJoin = document.getElementById("joinUsFullname")
const emailJoin = document.getElementById("joinUsEmail")

document.getElementById("join").addEventListener("click", function () {
  var fullName = usernameJoin.value;
  var email = emailJoin.value;

  if (checkInputs(modalInputsSelector)) {
    if (isValidEmail(email)) {

      const userdata = {
        fullName,
        email
      }
      set(ref(database, `Library/users/${fullName}`), userdata)
      usernameJoin.value = ''
      emailJoin.value = ''

    } else {
      emailJoin.setAttribute("style", "border: 3px solid red;")

      setTimeout(() => {
        emailJoin.removeAttribute("style", "border: 3px solid red;")
      }, 1000);

    }
  }

});



function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function checkInputs(inputs) {

  let result = true

  inputs.forEach(item => {

    if (!item.value) {
      item.setAttribute("style", "border: 3px solid red;")

      setTimeout(() => {
        item.removeAttribute("style", "border: 3px solid red;")
      }, 1000);

      result = false
    }
  })
  return result
}
