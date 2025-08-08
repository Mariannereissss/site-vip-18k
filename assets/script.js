//carrossel 1//
document.addEventListener("DOMContentLoaded", () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const anterior = document.querySelector(".antes");
    const proximo = document.querySelector(".depois");

    function mostrarSlide(index) {
        slides.forEach(slide => slide.classList.remove("ativo"));
        slides[index].classList.add("ativo");
    }

    anterior.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        mostrarSlide(slideIndex);
    });

    proximo.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % slides.length;
        mostrarSlide(slideIndex);
    });
});



  //carrosel 2//