import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'

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
const detailSectionSelector = document.querySelector('.detailSection')
const commentSection = document.querySelector('.commentComponents')
commentSection.classList.add('d-none')
const loading = document.querySelector('.loadingSection')
loading.classList.add('loading')
const detailData = (await get(ref(database, 'Library/detailInfo'))).val()

const commentInput = document.querySelector('.commentInput')
const commentButton = document.querySelector('.commentButton')
const commentsContainer = document.querySelector('.commentsContainer')
const bookDesc = document.querySelector('.bookAbout p')

const commentsKey = 'savedComments'

window.addEventListener('DOMContentLoaded', () => {
  const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || []
  savedComments.forEach((comment) => {
    addCommentToDOM(comment)
  })
})

commentButton.addEventListener('click', function (event) {
  event.preventDefault()
  const text = commentInput.value.trim()
  if (text !== '') {
    const userName = 'Anonim'
    const currentDate = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
    })

    const newComment = { id: generateId(), userName, date: currentDate, text }
    addCommentToDOM(newComment)

    const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || []
    savedComments.unshift(newComment)
    localStorage.setItem(commentsKey, JSON.stringify(savedComments))

    commentInput.value = ''
  }
})

function addCommentToDOM(comment) {
  const newDiv = document.createElement('div')
  const userNameDate = document.createElement('span')
  const commentText = document.createElement('p')
  // const deleteButton = document.createElement('button');

  userNameDate.innerHTML = `<b>${comment.userName}</b> ${comment.date}`

  commentText.textContent = comment.text

  // deleteButton.textContent = 'Delete';
  // deleteButton.addEventListener('click', () => {
  //     deleteComment(comment.id);
  //     newDiv.remove();
  // });

  newDiv.appendChild(userNameDate)
  newDiv.appendChild(commentText)
  // newDiv.appendChild(deleteButton);

  commentsContainer.insertBefore(newDiv, commentsContainer.firstChild)
}

function generateId() {
  return Math.random().toString()
}

// function deleteComment(commentId) {
//     const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
//     const updatedComments = savedComments.filter(comment => comment.id !== commentId);
//     localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
// }

function findDiffDate(bookDate) {
  let addTime = new Date(bookDate)
  let addGetTime = addTime.getTime()

  let today = new Date()
  let todayGetTime = today.getTime()

  let diffMilliseconds = todayGetTime - addGetTime
  let diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24))
  if (diffDays === 0) {
    return 'added today'
  } else if (diffDays > 7) {
    let diffWeeks = Math.floor(diffDays / 7)
    return diffWeeks + ' weeks ago added'
  } else {
    return diffDays + ' days ago added'
  }
}
detailSectionSelector.innerHTML = `          
<div class="left">
<button class="backButton">< BACK</button>
<div class="bookDate">${detailData.publishedDate.substring(0, 4)}</div>
<div class="bookName">${detailData.title}</div>
<div class="bookAddDate">${findDiffDate(detailData.addedTime)}</div>
<div class="bookAuthor">${detailData.author}</div>
<div class="bookAbout">
  <p>
   ${detailData.description}
  </p>
</div>
</div>

<div class="right">
<div class="image">
  <div class="new">NEW</div>
  <img src="${detailData.url}" alt />
</div>
</div>
`
loading.classList.remove('loading')
commentSection.classList.remove('d-none')

document.querySelector('.backButton').addEventListener('click', () => {
  window.location.href = '../../pages/catalog.html'
})
