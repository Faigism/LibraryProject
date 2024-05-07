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
const dragging = (e) => {
    console.log(e.pageX);
}

carousel.addEventListener('mousemove', dragging)