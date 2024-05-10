import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

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
const database = getDatabase(app)
const usersRef = set(ref(database, "Library"))

let fullName = "ad"
let email = "mail"
let userdata = {
  fullName,
  email
}
set(ref(database, `Library/users/${fullName}`), userdata)



const messageRef = ref(database, 'Library')

onValue(messageRef, (snap) => {
  const data = snap.val()
  console.log({ data })
})

// setTimeout(() => {
//   set(ref(database, 'Library/about/storeImg'), 'https://images.adsttc.com/')
// }, 2500)

// let names = 'Faiq'
// let info = {
//   address: 'Baku Xirdalan',
//   emailAddress: 'faiq@gmail.com',
//   fullName: 'faiq',
//   phoneNumber: '+213212132',
// }
// set(ref(database, `Library/contacts/${names}`), info)

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

// messageRef.on('value', (snapshot) => {
//   const firebaseData = snapshot.val();
//   console.log({ firebaseData });

// fetch('https://www.googleapis.com/books/v1/volumes?q=qaraqan')
//   .then(response => response.json())
//   .then(data => {

//     const bookInfo = data.items[0].volumeInfo;
//     document.getElementById('aboutContent').innerHTML = `
//       <h3>${bookInfo.title}</h3>
//       <p>Author(s): ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}</p>
//       <p>Description: ${bookInfo.description ? bookInfo.description : 'No description available'}</p>
//       <p>Publisher: ${bookInfo.publisher ? bookInfo.publisher : 'Unknown'}</p>
//       <p>Published Date: ${bookInfo.publishedDate ? bookInfo.publishedDate : 'Unknown'}</p>
//       <h3>Bookstore Info from Firebase</h3>`;
//     //   <p>Store Name: ${firebaseData.storeName}</p>
//     //   <p>Founder: ${firebaseData.founder}</p>
//     //   <p>Founding Year: ${firebaseData.foundingYear}</p>

//     // `;
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });



