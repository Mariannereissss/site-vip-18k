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


document.addEventListener('DOMContentLoaded', function () {
  // pega elementos
  const emailInput = document.getElementById('email');
  const btnEntrar  = document.getElementById('rec');

  // se não for a página do formulário, sai
  if (!emailInput || !btnEntrar) return;

  // validações
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim());

  function showError(inputEl, message) {
    clearError(inputEl);
    inputEl.setAttribute('aria-invalid', 'true');
    const p = document.createElement('p');
    p.className = 'erro-msg';
    p.textContent = message;
    const errId = `${inputEl.id}-error`;
    p.id = errId;
    inputEl.setAttribute('aria-describedby', errId);
    inputEl.insertAdjacentElement('afterend', p);
  }

  function clearError(inputEl) {
    inputEl.removeAttribute('aria-invalid');
    inputEl.removeAttribute('aria-describedby');
    const next = inputEl.nextElementSibling;
    if (next && next.classList.contains('erro-msg')) next.remove();
  }

  // feedback em tempo real
  emailInput.addEventListener('input', () => {
    if (isValidEmail(emailInput.value)) clearError(emailInput);
  });
  emailInput.addEventListener('blur', () => {
    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Informe um e-mail válido (ex.: nome@dominio.com).');
    }
  });

  // concluir cadastro
  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    let ok = true;

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Informe um e-mail válido (ex.: nome@dominio.com).');
      ok = false;
    } else clearError(emailInput);


    if (!ok) return;

    // aqui você envia para o back-end ou segue o fluxo
    // alert('Cadastro válido! Agora você pode enviar os dados.');
  });
});