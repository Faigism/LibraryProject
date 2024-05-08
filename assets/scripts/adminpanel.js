import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'
import {
  getDatabase,
  ref,
  get,
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
let keyWord
let bookDataHaveImg
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
    document.querySelector('.bookName').value = title
    document.querySelector('.authorName').value = author
    document.querySelector('.bookUrl').value = url
    document.querySelector('.bookDesc').value = description
    document.querySelector('.bookType').value = bookType
    const allBookData = {
      title,
      author,
      url,
      description,
      bookType,
    }
    bookAddDatabaseBtn.addEventListener('click', (e) => {
      set(ref(database, `Library/books/${title}`), allBookData)
    })
  }
})

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
})
writeAllInfo()
function writeAllInfo() {
  const allBook = Object.values(allDataLibrary.books)
  let dataes = ''
  for (let i = 0; i < allBook.length; i++) {
    dataes += `<tr>
                <td>${i + 1}</td>
                <td>${allBook[i].title.substring(0, 25)}</td>
                <td>${allBook[i].description.substring(0, 25)}</td>
                <td>${allBook[i].bookType.substring(0, 25)}</td>
                <td>${allBook[i].author.substring(0, 25)}</td>
              </tr> `
  }
  allBooksInformation.innerHTML = dataes
}
