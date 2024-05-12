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
const allDataLibrary = (await get(ref(database, 'Library'))).val()

const searchInput = document.querySelector('.searchInputForAdd')
const searchIcon = document.querySelector('.searchIconForAdd')
const modalSelector = document.querySelector('#modalForSearch')
const modalContext = document.querySelector('.modalContent')
const bookAddDatabaseBtn = document.querySelector('.bookAddDatabaseBtn')
const storeTitle = document.querySelector('.storeTitle')
const storeImgUrl = document.querySelector('.storeImgUrl')
const storeDescription = document.querySelector('.storeDescription')
const storeAboutBtn = document.querySelector('.storeAboutBtn')
const allBooksInformation = document.querySelector('.allBooksInformation')
const joinUsBody = document.querySelector('.joinUsBody')
let keyWord
let bookDataHaveImg
let bookId
let publishedDate

onValue(ref(database, 'Library/books'), (snap) => {
  writeAllInfo(Object.values(snap.val()))
})

onValue(ref(database, 'Library/users'), (snap) => {
  writeJoinUs(snap.val())
})

onValue(ref(database, 'Library/contacts'), (snap) => {
  contactUs(snap.val())
})

searchIcon.addEventListener('click', (e) => {
  keyWord = searchInput.value
  getData(keyWord)
})
const getData = async function (keyWord) {
  try {
    const dataFetch = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyWord}`
    )
    const resultData = await dataFetch.json()
    bookDataHaveImg = resultData.items.filter(
      (book) => book.volumeInfo.readingModes.image != false
    )
    openModal(bookDataHaveImg)
  } catch (error) {
    console.log(error)
  }
}
modalSelector.addEventListener('click', (e) => {
  if (e.target.closest('.modalLine') != null) {
    let booksId = e.target.closest('.modalLine').id

    modalSelector.setAttribute('style', 'display: none;')

    const bookInfo = bookDataHaveImg.filter((item) => item.id == booksId)[0]
      .volumeInfo

    const title = bookInfo.title
    const author = bookInfo.authors[0]
    const url = bookInfo.imageLinks.smallThumbnail
    const description = bookInfo.description
    const bookType = bookInfo.categories[0]
    bookId = bookDataHaveImg.filter((item) => item.id == booksId)[0].id
    publishedDate = bookInfo.publishedDate

    titleSelector.value = title
    authorSelector.value = author
    urlSelector.value = url
    descriptionSelector.value = description
    typeSelector.value = bookType

    searchInput.value = ''
  }
})
const titleSelector = document.querySelector('.bookName')
const authorSelector = document.querySelector('.authorName')
const urlSelector = document.querySelector('.bookUrl')
const descriptionSelector = document.querySelector('.bookDesc')
const typeSelector = document.querySelector('.bookType')

bookAddDatabaseBtn.addEventListener('click', (e) => {

  let day = String(new Date().getDate()).padStart(2, '0');
  let month = String(new Date().getMonth() + 1).padStart(2, '0');
  let year = new Date().getFullYear();

  let formattedDate = `${month}.${day}.${year}`;


  const title = titleSelector.value
  const bookData = {
    addedTime: formattedDate,
    title: titleSelector.value,
    author: authorSelector.value,
    url: urlSelector.value,
    description: descriptionSelector.value,
    bookType: typeSelector.value,
    newReleases: checkCheckboxStatus("new-releases"),
    bestsellers: checkCheckboxStatus("bestsellers"),
    publishedDate,
    bookId
  }

  set(ref(database, `Library/books/${title}`), bookData)
  titleSelector.value = ''
  authorSelector.value = ''
  urlSelector.value = ''
  descriptionSelector.value = ''
  typeSelector.value = ''
})

function checkCheckboxStatus(checkboxId) {
  return document.getElementById(checkboxId).checked;
}

function openModal(allBooks) {
  modalSelector.setAttribute('style', 'display: block;')
  let allBooksForModal = ''
  allBooks.filter((book) => {
    const bookImg = book.volumeInfo.imageLinks.smallThumbnail
    const bookTitle = book.volumeInfo.title
    allBooksForModal += `
        <div class="modalLine" id="${book.id}">
            <div class="imgCont">
                <img src="${bookImg}" alt>
            </div>
            <p>${bookTitle.substring(0, 20)}</p>
        </div>`
  })
  modalContext.innerHTML = allBooksForModal
}

storeAboutBtn.addEventListener('click', () => {
  const storeName = storeTitle.value
  const storeImg = storeImgUrl.value
  const description = storeDescription.value
  set(ref(database, `Library/about`), { storeName, storeImg, description })
  storeTitle.value = ''
  storeImgUrl.value = ''
  storeDescription.value = ''
})


function writeAllInfo(allBook) {
  allBooksInformation.innerHTML = allBook
    .map(
      (book, i) => `<tr>
                <td>${i + 1}</td>
                <td>${book.title}</td>
                <td>${book.description.substring(0, 100) + '...'}</td>
                <td>${book.bookType}</td>
                <td>${book.author}</td>
              </tr> `
    )
    .join('')
}

function writeJoinUs(DataInUsers) {
  joinUsBody.innerHTML = Object.values(DataInUsers)
    .map(
      (user, i) =>
        `<tr>
        <td>${i + 1}</td>
        <td>${user.userName}</td>
        <td>${user.userEmail}</td>
        </tr>`
    )
    .join('')
}

function contactUs(DataInContact) {
  document.querySelector('.contactUsBody').innerHTML = Object.values(
    DataInContact
  )
    .map(
      (contactInfo, index) =>
        `<tr>
      <td>${index + 1}</td>
      <td>${contactInfo.fullName}</td>
      <td>${contactInfo.address}</td>
      <td>${contactInfo.emailAddress}</td>
      <td>${contactInfo.phoneNumber}</td>
    </tr>`
    )
    .join('')
}


