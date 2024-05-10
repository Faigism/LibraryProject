import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'
import {
  getDatabase,
  ref,
  onValue,
  push,
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
// const analytics = getAnalytics(app)
const database = getDatabase(app)

const messageRef = ref(database, 'Library')

const about = document.querySelector('.loadingSection')
about.classList.add('loading')
onValue(ref(database, 'Library/about'), (snap) => {
  const data = snap.val()
  const storeTitle = data.storeName
  const storeImg = data.storeImg
  const storeDesc = data.description
  document.getElementById('title').textContent = storeTitle
  document.getElementById('image').src = storeImg
  document.getElementById('description').textContent = storeDesc
  about.classList.remove('loading')
})

// function func() {}
