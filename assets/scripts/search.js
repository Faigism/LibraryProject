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

const allBookData = (await get(ref(database, "Library/books"))).val()
const searchInputSelector = document.querySelector(".searchInput")
const searchBtnSelector = document.querySelector(".searchBtn")


searchBtnSelector.addEventListener("click", () => {
    const data = Object.values(allBookData).filter(book => book.title.toLowerCase().includes(searchInputSelector.value.toLowerCase()) || book.author.toLowerCase().includes(searchInputSelector.value.toLowerCase()))

    console.log(data);
})