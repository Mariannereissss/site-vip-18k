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
  const senhaInput = document.getElementById('senha');
  const cpfInput   = document.getElementById('cpf');
  const btnEntrar  = document.getElementById('entrar');

  // se não for a página do formulário, sai
  if (!emailInput || !senhaInput || !btnEntrar) return;

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

  function isValidCPF(cpf) {
    cpf = (cpf || '').replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
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

  senhaInput.addEventListener('input', () => {
    if (senhaInput.value.trim().length >= 8) clearError(senhaInput);
  });
  senhaInput.addEventListener('blur', () => {
    if (senhaInput.value.trim().length < 8) {
      showError(senhaInput, 'A senha deve ter pelo menos 8 caracteres.');
    }
  });

  if (cpfInput) {
    cpfInput.addEventListener('input', () => {
      if (isValidCPF(cpfInput.value)) clearError(cpfInput);
    });
    cpfInput.addEventListener('blur', () => {
      if (!isValidCPF(cpfInput.value)) {
        showError(cpfInput, 'Digite um CPF válido.');
      }
    });
  }

  // concluir cadastro
  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    let ok = true;

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Informe um e-mail válido (ex.: nome@dominio.com).');
      ok = false;
    } else clearError(emailInput);

    if (senhaInput.value.trim().length < 8) {
      showError(senhaInput, 'A senha deve ter pelo menos 8 caracteres.');
      ok = false;
    } else clearError(senhaInput);

    if (cpfInput) {
      if (!isValidCPF(cpfInput.value)) {
        showError(cpfInput, 'CPF inválido. Digite um CPF válido.');
        ok = false;
      } else clearError(cpfInput);
    }

    if (!ok) return;

    // aqui você envia para o back-end ou segue o fluxo
    // alert('Cadastro válido! Agora você pode enviar os dados.');
  });
});

