//        << fetching data from database >>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

import {
  getDatabase,
  get,
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
const loading = document.querySelector('.loadingSection')
loading.classList.add('loading')
const allbooks = (await get(ref(database, 'Library/books'))).val()
const dataForFetch = Object.entries(allbooks)
const carousel = document.querySelector('.carousel')
const bestseller = document.querySelector('.bestseller-items')
const newReleases = document.querySelector('.new-items')
const allBtn = document.querySelector('.allBtn')
const category = document.querySelectorAll('.category')

const allBookCard = dataForFetch.map((i) => {
  if (i[1].newReleases) {
    return `
        <li class="items">
            <div class="image">
                <img
                    src="${i[1].url}"
                    alt=""
                    draggable="false"
                />
            </div>
            <h3>${i[0].substring(0, 16)}</h3>
            <h5>${i[1].author.substring(0, 20)}</h5>
            <button id = "${
              i[1].bookId
            }" class="btn carouselBtns">READ ME</button>
            <div class="new">NEW</div>
        </li>`
  } else {
    return `
        <li class="items">
            <div class="image">
                <img
                    src="${i[1].url}"
                    alt=""
                    draggable="false"
                />
            </div>
            <h3>${i[0].substring(0, 16)}</h3>
            <h5>${i[1].author.substring(0, 20)}</h5>
            <button id = "${
              i[1].bookId
            }" class="btn carouselBtns">READ ME</button>
        </li>`
  }
})
carousel.innerHTML = allBookCard.join('')

const allBestsellerCard = dataForFetch
  .filter((i) => i[1].bestsellers === true)
  .slice(0, 5)
  .map(
    (i) => `
    <li class="items">
        <div class="image">
            <img
                src="${i[1].url}"
                alt=""
                draggable="false"
            />
        </div>
        <h3>${i[0].substring(0, 16)}</h3>
        <h5>${i[1].author.substring(0, 20)}</h5>
        <button id="${i[1].bookId}" class="btn carouselBtns">Read me</button>
    </li>`
  )

bestseller.innerHTML = allBestsellerCard.join('')

const arrayOfNew = []
dataForFetch.map((i) => {
  if (i[1].newReleases === true) {
    arrayOfNew.push(i)
  }
})

const newReleasesItems = arrayOfNew.slice(0, 5).map((e) => {
  return `
    <li class="items">
        <div class="image">
            <img
                src="${e[1].url}"
                alt=""
                draggable="false"
            />
        </div>
        <h3>${e[0].substring(0, 16)}</h3>
        <h5>${e[1].author.substring(0, 20)}</h5>
        <button id = "${e[1].bookId}" class="btn carouselBtns">READ ME</button>
        <div class="new">NEW</div>
    </li>`
})
newReleases.innerHTML = newReleasesItems.join('')
document.querySelector('.all-books').addEventListener('click', () => {
  newReleases.innerHTML = ''
  newReleases.innerHTML = newReleasesItems.join('')
})

// ---------------------------------------------------------------

//         << Category js >>

allBtn.addEventListener('click', () => {
  category.forEach((item) => {
    item.style.color = ''
  })
  carousel.innerHTML = allBookCard.join('')
  const buttons = document.querySelectorAll('.carouselBtns')
  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const bookId = this.id
      const bookDetails = Object.entries(allbooks).filter(
        (book) => book[1].bookId === bookId
      )[0][1]
      set(ref(database, `Library/detailInfo`), bookDetails)
      window.location.href = '/pages/detail.html'
    })
  })
})

const ulCategories = document.querySelector('.genres')
let arrayOfCategories = []
category.forEach((item) => {
  item.addEventListener('click', (e) => {
    category.forEach((categoryItem) => {
      categoryItem.style.color = ''
    })
    e.target.style.color = '#ff8400'
  })
})
ulCategories.addEventListener('click', (e) => {
  let clickedBefore = false
  e.target.classList.add('clicked-cat')

  if (e.target && e.target.matches('li.category')) {
    let element = e.target.textContent

    e.target.classList.remove('clicked-cat')
    dataForFetch.map((item) => {
      if (item[1].bookType == element) {
        if (arrayOfCategories.includes(item)) {
          return item
        } else {
          arrayOfCategories.push(item)
          for (let a = 0; a < arrayOfCategories.length - 1; a++) {
            const itm = arrayOfCategories[a]
            if (itm[1].bookType != arrayOfCategories[a + 1][1].bookType) {
              arrayOfCategories.shift()
            }
          }
          // arrayOfCategories = []
          // console.log(arrayOfCategories)
        }
      }
    })
    const arrOfPerCategory = arrayOfCategories.map((item) => {
      return `
                <li class="items">
                    <div class="image">
                        <img
                            src="${item[1].url}"
                            alt=""
                            draggable="false"
                        />
                    </div>
                    <h3>${item[0].substring(0, 16)}</h3>
                    <h5>${item[1].author.substring(0, 20)}</h5>
                    <button id = "${
                      item[1].bookId
                    }" class="btn carouselBtns">READ ME</button>
                </li>`
    })
    if (!clickedBefore) {
      carousel.innerHTML = arrOfPerCategory.join('')
      const buttons = document.querySelectorAll('.carouselBtns')
      buttons.forEach((button) => {
        button.addEventListener('click', function () {
          const bookId = this.id
          const bookDetails = Object.entries(allbooks).filter(
            (book) => book[1].bookId === bookId
          )[0][1]
          set(ref(database, `Library/detailInfo`), bookDetails)
          window.location.href = '/pages/detail.html'
        })
      })
    }
    clickedBefore = !clickedBefore
  }
})

//          << I need to add function that when click other category remove clicked-cat class of current category >>

// window.addEventListener('click', function(event){
//     if (event.target.matches("li.category")){
//         event.target.classList.remove("clicked-cat")
//     }
// })

// ---------------------------------------------------------------

//          << carousel js codes >>

const arrowBtns = document.querySelectorAll('.slider-wrapper i')
const firstCardWidth = carousel.querySelector('.items').offsetWidth
const rightBtn = document.getElementById('right')
const timePeriod = 3000

let isDragging = false,
  startX,
  startScrollLeft

arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = (e) => {
  isDragging = true
  carousel.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
  carousel.scrollLeft = e.pageX
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove('dragging')
}

setInterval(() => {
  rightBtn.click()
}, timePeriod)

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mouseup', dragStop)
rightBtn.click()
// console.log(carousel.scrollLeft);
// if (carousel.scrollLeft >= (carousel.scrollWidth - 966)) {
//     carousel.scrollLeft = 0;
// }
// }, timePeriod)

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mouseup', dragStop)

// read me buttonlara click eventi

const buttons = document.querySelectorAll('.carouselBtns')
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const bookId = this.id
    const bookDetails = Object.entries(allbooks).filter(
      (book) => book[1].bookId === bookId
    )[0][1]
    set(ref(database, `Library/detailInfo`), bookDetails)
    window.location.href = '/pages/detail.html'
  })
})

loading.classList.remove('loading')
