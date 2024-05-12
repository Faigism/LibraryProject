import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

import {
  getDatabase,
  ref,
  get,
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

const allBookData = (await get(ref(database, 'Library/books'))).val()
const searchInputSelector = document.querySelector('.searchInput')
const searchBtnSelector = document.querySelector('.searchBtn')
const searchContainer = document.querySelector('.searchImage')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
const slider = document.querySelector('.slider')
const searchNotFound = document.querySelector('.searchNotFound')
let slideIndex = 0

function showSlide(n, slideIndex) {
  const slides = document.getElementsByClassName('slide')
  if (n >= slides.length) {
    slideIndex = 0
  }
  if (n < 0) {
    slideIndex = slides.length - 1
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active')
    slides[i].classList.add('d-none')
  }
  slides[slideIndex].classList.remove('d-none')
  slides[slideIndex].classList.add('active')
}

function nextSlide() {
  showSlide(++slideIndex, slideIndex)
}

function prevSlide() {
  showSlide(--slideIndex, slideIndex)
}

nextBtn.addEventListener('click', nextSlide)
prevBtn.addEventListener('click', prevSlide)
function createSlide(book) {
  const slide = document.createElement('div')
  slide.classList.add('slide')

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('searchBookImg')

  const bookImage = document.createElement('img')
  bookImage.src = book.url
  imageContainer.appendChild(bookImage)

  const textContainer = document.createElement('div')
  textContainer.classList.add('searchBookRight')

  const bookTitle = document.createElement('h2')
  bookTitle.textContent = book.title.substring(0, 30) + ' ...'
  textContainer.appendChild(bookTitle)

  const bookAuthor = document.createElement('p')
  bookAuthor.textContent = book.author
  textContainer.appendChild(bookAuthor)

  const bookDescription = document.createElement('p')
  bookDescription.textContent = book.description.substring(0, 400) + ' ...'
  textContainer.appendChild(bookDescription)

  slide.appendChild(imageContainer)
  slide.appendChild(textContainer)

  slider.appendChild(slide)
  showSlide(0, slideIndex)
}

function clearSlider() {
  slider.innerHTML = ''
}

function searchDataDisplay(books) {
  if (books.length === 0) {
    searchContainer.classList.add('d-none')
    searchNotFound.classList.remove('d-none')
    return
  }
  searchContainer.classList.remove('d-none')
  clearSlider()
  books.forEach((book) => {
    createSlide(book)
  })
}

searchBtnSelector.addEventListener('click', (e) => {
  e.preventDefault()
  searchNotFound.classList.add('d-none')
  const data = Object.values(allBookData).filter(
    (book) =>
      book.title
        .toLowerCase()
        .includes(searchInputSelector.value.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(searchInputSelector.value.toLowerCase())
  )

  if (data.length <= 1) {
    prevBtn.classList.add('d-none')
    nextBtn.classList.add('d-none')
    searchContainer.classList.add('d-none')
  } else {
    prevBtn.classList.remove('d-none')
    nextBtn.classList.remove('d-none')
  }

  searchDataDisplay(data)
})
