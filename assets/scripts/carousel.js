document.addEventListener("DOMContentLoaded", function() {
    const sliderContainer = document.querySelector(".searchImage");
    const slider = sliderContainer.querySelector(".slider");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = sliderContainer.querySelector(".prevBtn");
    const nextBtn = sliderContainer.querySelector(".nextBtn");
    let currentIndex = 0;

 
    showSlide(currentIndex);

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

  
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    function showSlide(index) {
      
        slides.forEach(slide => {
            slide.style.display = "none";
        });
       
        slides[index].style.display = "flex";
    }
});
