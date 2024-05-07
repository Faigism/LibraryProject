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

onValue(messageRef, (snap) => {
  const data = snap.val()
  console.log({ data })
})

// const newAdminRef = push(child(messageRef, 'admins'))
// set(newAdminRef, {
//   username: 'Faiq',
//   password: 'admin123',
// })
// const newBookRef = push(child(messageRef, 'books'))
// set(newBookRef, {
//   bookName: 'Cinayet ve Ceza',
//   authorName: 'Dostoyevski',
//   imageUrl: 'https:/image.png',
//   description: 'iqwjdijwqijdiqw diqwdiwnidnqw',
//   category: 'Detective',
// })
// const newUserRef = push(child(messageRef, 'users'))
// set(newUserRef, {
//   fullName: 'Faiq Ismayilov',
//   emailAddress: 'faiq@gmail.com',
// })
// const newContactRef = push(child(messageRef, 'contact'))
// set(newContactRef, {
//   fullName: 'Subhan Muradli',
//   Address: 'Baku Xirdalan',
//   emailAddress: 'subhan@gmail.com',
//   phoneNumber: '+213212132',
// })
// const newAboutRef = push(child(messageRef, 'about'))
// set(newAboutRef, {
//   Title: 'uiwqeouqweiuwoi',
//   ImageUrl: 'https:/image.png',
//   Description: 'asjdjwsd jasdnas jsandjsa',
// })
//!remove
// const usersRef = child(messageRef, 'users')
// remove(usersRef)
//update
