const searchInput = document.querySelector(".searchInputForAdd")
const searchIcon = document.querySelector(".searchIconForAdd")
const modalSelector = document.querySelector("#modalForSearch")
const modalContext = document.querySelector(".modalContent")
const bookNamesInModal = document.querySelectorAll(".modalLine")
let keyWord
let bookDataHaveImg
searchIcon.addEventListener("click", (e) => {
    keyWord = searchInput.value
    getData(keyWord)

})

const getData = async function (keyWord) {
    try {
        const dataFetch = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyWord}`)

        resultData = await dataFetch.json()

        bookDataHaveImg = resultData.items.filter(book => book.volumeInfo.readingModes.image != false)

        openModal(bookDataHaveImg)


    }
    catch (error) {
        console.log(error);
    }
}


modalSelector.addEventListener('click', e => {
    if (e.target.closest('.modalLine') != null) {
        let booksId = e.target.closest('.modalLine').id
        // writeInput(booksId)
        modalSelector.setAttribute("style", "display: none;")


        const bookInfo = bookDataHaveImg.filter(item => item.id == booksId)[0].volumeInfo

        const title = bookInfo.title
        const author = bookInfo.authors[0]
        const url = bookInfo.imageLinks.smallThumbnail
        const description = bookInfo.description
        const bookType = bookInfo.categories[0]


        document.querySelector(".bookName").value=title
        document.querySelector(".authorName").value = author
        document.querySelector(".bookUrl").value=url
        document.querySelector(".bookDesc").value=description
        document.querySelector(".bookType").value=bookType

        

    }

})


function openModal(allBooks) {
    modalSelector.setAttribute("style", "display: block;")
    let allBooksForModal = ""
    allBooks.filter(book => {
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

// async function writeInput(booksId) {
//     try {
//         const dataFetch = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyWord}`)

//         const resultData = await dataFetch.json()

//         const allBooksHaveImg = resultData.items.filter(book => book.volumeInfo.readingModes.image != false)

//         const bookInfo = allBooksHaveImg.filter(item => item.id == booksId)
//         console.log(bookInfo);

//     }
//     catch (error) {
//         console.log(error);
//     }
// }