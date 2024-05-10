//        << fetching data from database >>   

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js'
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
const allbooks = (await get(ref(database, 'Library/books'))).val()
const dataForFetch = Object.entries(allbooks)

const carousel = document.querySelector('.carousel');
const bestseller = document.querySelector('.bestseller-items');

const allBookCard = dataForFetch.map(i => {
    // console.log(i);
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
        <h5>${i[1].author}</h5>
        <button class="btn">READ ME</button>
    </li>`
})

carousel.innerHTML = allBookCard.join('');

const allBestsellerCard = dataForFetch.map (i => {
    console.log(i[1].bestsellers);
    if (i[1].bestsellers == "true") {
        return `
        <li class="items">
            <div class="image">
                <img
                    src=""
                    alt=""
                    draggable="false"
                />
            </div>
            <h3>${i[0]}</h3>
            <h5>${i[1].author}</h5>
            <button class="btn">READ ME</button>
        </li>`
    }
})
bestseller.innerHTML = allBestsellerCard.join("");





console.log(dataForFetch);


//          << carousel js codes >>

const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstCardWidth = carousel.querySelector('.items').offsetWidth;
const rightBtn = document.getElementById('right');
const timePeriod = 1000;

let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    carousel.scrollLeft = e.pageX;
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

setInterval(() => {
    rightBtn.click();
    // console.log(carousel.scrollLeft);
    // if (carousel.scrollLeft >= (carousel.scrollWidth - 966)) {
    //     carousel.scrollLeft = 0;
    // }
}, timePeriod);

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
