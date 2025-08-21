const visor = document.getElementById('foto-principal');
  const lista = document.querySelector('.thumbs');

  // delegação: funciona para todos os botões dentro de .thumbs
  lista.addEventListener('click', (e) => {
    const btn = e.target.closest('.thumb');
    if(!btn) return;

    // marca ativa
    document.querySelectorAll('.thumb').forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // troca imagem do visor
    const novoSrc = btn.dataset.full;
    // pré-carrega para evitar “piscada”
    const img = new Image();
    img.onload = () => { visor.src = novoSrc; };
    img.src = novoSrc;
  });

  // acessibilidade: permite Enter/Espaço
  lista.addEventListener('keydown', (e) => {
    if((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('thumb')){
      e.preventDefault();
      e.target.click();
    }
  });