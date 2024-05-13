import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'
import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  child,
  set,
  remove,
  update,
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

const allDataBooks = (await get(ref(database, 'Library/books'))).val()
const catalogBody = document.querySelector('.catalogBody')

let catalogItems = []

Object.values(allDataBooks).map((book) => {
  let item = `<li class="catalogItem" id="${book.bookType}">${book.bookType}</li>`
  if (!catalogItems.includes(item) && catalogItems.length < 9) {
    catalogItems.push(item)
  }
})

catalogBody.innerHTML = catalogItems.join('')

// document.querySelector('.goToCatalogBtn').addEventListener('click', () => {})

// aşağıdakı sətrlər kataloqdakı görünən elementlərə klik olarkən id qaytarır əgər lazım olmazsa silərik, əgər lazım olarsa id ilə databasedən filtr etmək olar
document.querySelector('.catalogBody').addEventListener('click', (e) => {
  if (e.target.attributes.class.value === 'catalogItem') {
    window.location.href = './pages/catalog.html'
  }
})
