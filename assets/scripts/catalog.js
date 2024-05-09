
const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstCardWidth = carousel.querySelector('.items').offsetWidth;
const rightBtn = document.getElementById('right');
const timePeriod = 1000;



arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

let isDragging = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const set = setInterval(() => {
    rightBtn.click();
    // console.log(carousel.scrollLeft);
    if (carousel.scrollLeft >= (carousel.scrollWidth - 966)) {
        carousel.scrollLeft = 0;
    }
}, timePeriod);

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);