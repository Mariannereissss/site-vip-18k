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


//---MENU-HAMBURGUER---//
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

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carrossel .slide');
  const dots = document.querySelectorAll('.dot');
  let indice = 0;
  let startX = 0;

  function mostrarSlide(n) {
    slides.forEach(s => s.classList.remove('ativo'));
    dots.forEach(d => d.classList.remove('ativo'));
    slides[n].classList.add('ativo');
    dots[n].classList.add('ativo');
  }

  function proximo() {
    indice = (indice + 1) % slides.length;
    mostrarSlide(indice);
  }

  function anterior() {
    indice = (indice - 1 + slides.length) % slides.length;
    mostrarSlide(indice);
  }

  document.querySelector('.depois').addEventListener('click', proximo);
  document.querySelector('.antes').addEventListener('click', anterior);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      indice = i;
      mostrarSlide(indice);
    });
  });

  // Suporte a swipe no mobile
  const carrossel = document.querySelector('.carrossel');
  carrossel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  carrossel.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        proximo(); // swipe para a esquerda -> próximo
      } else {
        anterior(); // swipe para a direita -> anterior
      }
    }
  });
});


