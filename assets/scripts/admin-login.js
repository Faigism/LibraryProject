import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

import {
  getDatabase,
  ref,
  get,
  set,
  onValue,
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
const messageRef = ref(database, 'Library')

const adminBtn = document.querySelector('.admin-submit button')
const adminNameInput = document.querySelector('.username')
const adminPasswordInput = document.querySelector('.password')
const errorMessage = document.querySelector('.errorMessage')

adminNameInput.addEventListener('input', (e) => {
  if (e.data === ' ') {
    e.preventDefault()
    adminNameInput.value = adminNameInput.value.replace(/\s/g, '')
  }
  const inputValue = adminNameInput.value.trim()
  if (inputValue.length > 15) {
    e.preventDefault()
    adminNameInput.value = inputValue.slice(0, 15)
  }
})
adminPasswordInput.addEventListener('input', (e) => {
  if (e.data === ' ') {
    e.preventDefault()
    adminPasswordInput.value = adminPasswordInput.value.replace(/\s/g, '')
  }
  const inputValue = adminPasswordInput.value.trim()
  if (inputValue.length > 15) {
    e.preventDefault()
    adminPasswordInput.value = inputValue.slice(0, 15)
  }
})

adminBtn.addEventListener('click', (e) => {
  e.preventDefault()
  onValue(messageRef, (snap) => {
    const data = snap.val()
    if (data.admins) {
      const adminIds = Object.keys(data.admins)
      let isLoggedIn = false
      adminIds.forEach((id) => {
        const adminItem = data.admins[id]
        const username = adminItem.username
        const password = adminItem.password
        if (
          adminNameInput.value === username &&
          adminPasswordInput.value === password
        ) {
          localStorage.setItem('username', username)
          window.location.href = '/pages/admin.html'
          isLoggedIn = true
        } else {
          errorMessage.textContent = 'username ve ya sifre yanlisdir'
        }
      })
      if (!isLoggedIn) {
        errorMessage.textContent = 'username ve ya sifre yanlisdir'
      }
    }
  })
})
if (localStorage.getItem('username')) {
  window.location.href = '/pages/admin.html'
}
