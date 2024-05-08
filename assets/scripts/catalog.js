// let items = document.querySelectorAll('.carousel .carousel-inner')

// items.forEach((el) => {
//     // number of slides per carousel-item
//     const minPerSlide = 2
//     let next = el.nextElementSibling
//     for (var i=1; i<minPerSlide; i++) {
//         if (!next) {
//             // wrap carousel by using first child
//             next = items[0]
//         }
//         let cloneChild = next.cloneNode(true)
//         el.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//     }
//     // console.log({next, minPerSlide, items});
// })


const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstCardWidth = carousel.querySelector('.items').offsetWidth;




arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

let isDragging = false, startX, startScrollLeft;

const dragStart = () => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = e.pageX;
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
