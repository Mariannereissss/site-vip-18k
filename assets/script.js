//CORROSSEL//
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

/*ABA QUE ABRE AO CLICAR*/
document.addEventListener("DOMContentLoaded", function() {
  const btnConta = document.getElementById("btn-conta");
  const dropdown = document.getElementById("dropdown-conta");

  // Mostra ou esconde ao clicar no botão
  btnConta.addEventListener("click", function(event) {
    event.stopPropagation(); // impede que o clique feche imediatamente
    dropdown.classList.toggle("show");
  });

  // Fecha se clicar fora
  document.addEventListener("click", function(event) {
    if (!dropdown.contains(event.target) && !btnConta.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });
});

/*FAZ O CARD TODO DO PRODUTO SER CLICÁVEL*/

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.produto, .produtos');

  cards.forEach(card => {
    const go = () => {
      const url = card.dataset.url;
      if (url) window.location.href = url;
    };

    // clique no card (mas ignora botões/links internos)
    card.addEventListener('click', (e) => {
      if (e.target.closest('button, a')) return; // deixa o botão/links funcionarem normal
      go();
    });

    // acessibilidade: Enter/Space também navegam
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.etiquetas');
    if (el) el.scrollLeft = 0;
  });

(function () {
  const btn = document.getElementById('btn-hamburger');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  function openNav() {
    nav.classList.add('open');
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // evita fechar no clique do próprio botão
    const isOpen = nav.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  // Fecha quando clicar fora do menu
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Fecha ao apertar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
    }
  });
})();