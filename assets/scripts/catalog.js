//        << fetching data from database >>   

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';

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
const newReleases = document.querySelector('.new-items');


const allBookCard = dataForFetch.map(i => {
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
        <button class="btn carouselBtns">READ ME</button>
    </li>`
})

carousel.innerHTML = allBookCard.join('');

const allBestsellerCard = dataForFetch.map(i => {
    if (i[1].bestsellers == true) {
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
            <button class="btn carouselBtns">READ ME</button>
        </li>`
    }
})
bestseller.innerHTML = allBestsellerCard.join("");

const arrayOfNew = [];
dataForFetch.map(i => {
    if (i[1].newReleases === true) {
        arrayOfNew.push(i);
    }
})

const newReleasesItems = arrayOfNew.slice(0, 5).map(e => {
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
        <h5>${e[1].author}</h5>
        <button id = "${e[1].bookId}" class="btn">READ ME</button>
        <div class="new">NEW</div>
    </li>`
})
newReleases.innerHTML = newReleasesItems.join("");
document.querySelector('.all-books').addEventListener("click", () => {
    newReleases.innerHTML = ""
    newReleases.innerHTML = newReleasesItems.join("");
})

// console.log(dataForFetch);


// ---------------------------------------------------------------


//         << Category js >>

// const categoryClicking = document.querySelectorAll('.category')
// for (let index = 0; index < categoryClicking.length; index++) {
//     const element = categoryClicking[index]
//     console.log(element);
// }
// element.addEventListener('click', () => {
//     console.log("test");
// })

// for (let index = 0; index < categoryClicking.length; index++) {
//     const element = categoryClicking[index].textContent;
//     dataForFetch.forEach(item => {
//         // console.log(item[1].bookType);
//         if (item[1].bookType == element) {
//             console.log(item);
//         }
//     })
// }
// console.log(dataForFetch);



const ulCategories = document.querySelector('.genres')
let arrayOfCategories = []

let clickedBefore = false;
ulCategories.addEventListener("click", (e) => {
    // console.log(e.target.matches("li.category"));
    if (e.target && e.target.matches("li.category")) {
        let element = e.target.textContent;
        dataForFetch.map(item => {
            if (item[1].bookType == element) {
                // let pushedArray = arrayOfCategories.push(item)
                // console.log(pushedArray);
                // console.log(item);
                if (arrayOfCategories.includes(item)) {
                    return item
                }
                else{
                    arrayOfCategories = []
                    arrayOfCategories.push(item)
                }
                
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
                        <h5>${item[1].author}</h5>
                        <button id = "${item[1].bookId}" class="btn">READ ME</button>
                    </li>`
            }
        })
    }
    console.log(arrayOfCategories);
    const arrOfPerCategory = arrayOfCategories.map(item => {
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
                <h5>${item[1].author}</h5>
                <button id = "${item[1].bookId}" class="btn">READ ME</button>
            </li>`
    })
    if (!clickedBefore) {
        carousel.innerHTML = arrOfPerCategory.join("")
    }
    // clickedBefore = !clickedBefore
})

console.log(dataForFetch);


// console.log(arrayOfCategories);



// ---------------------------------------------------------------

//          << carousel js codes >>

const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstCardWidth = carousel.querySelector('.items').offsetWidth;
const rightBtn = document.getElementById('right');
const timePeriod = 2000;

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






// read me buttonlara click eventi

const buttons = document.querySelectorAll('.carouselBtns');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const bookName = this.id;
        const bookDetails = Object.entries(allbooks).filter((book) => book[0] === bookName)[0][1];
        set(ref(database, `Library/detailInfo`), bookDetails);
    });
});
