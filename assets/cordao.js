const visor = document.getElementById('foto-principal');
const lista = document.querySelector('.thumbs');

// delegação: funciona para todos os botões dentro de .thumbs
lista.addEventListener('click', (e) => {
  const btn = e.target.closest('.thumb');
  if(!btn) return;

  // marca ativa
  document.querySelectorAll('.thumb').forEach(b=>b.classList.remove('is-active'));
  btn.classList.add('is-active');

  // pega o src da imagem dentro do botão clicado
  const novoSrc = btn.querySelector("img").src;

  // pré-carrega para evitar piscada
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

 const btnMais = document.querySelector('.mais');
const btnMenos = document.querySelector('.menos');
const contador = document.querySelector('.contador');

// Função para atualizar o número
function atualizarContador(valor) {
  let atual = parseInt(contador.textContent);
  atual += valor;

  // Evita números menores que 1
  if (atual < 1) atual = 1;

  contador.textContent = atual;
}

// Eventos de clique
btnMais.addEventListener('click', () => atualizarContador(1));
btnMenos.addEventListener('click', () => atualizarContador(-1));

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.conteiner-grid');
  if (!grid) return;

  const btnAntes  = grid.querySelector('.antes');
  const btnDepois = grid.querySelector('.depois');
  const produtos  = Array.from(grid.querySelectorAll('.produto'));
  if (!produtos.length) return;

  let pagina = 0;

  // 4 (≥1200), 3 (940–1199), 2 (646–939), null (≤645 = rolável)
  function getPorPagina() {
    const w = window.innerWidth;
    if (w >= 1200) return 4;
    if (w >= 940)  return 3;
    if (w >= 646)  return 2;
    return null;   // ≤645 → sem paginação
  }

  function render() {
    const porPagina = getPorPagina();

    if (porPagina === null) {
      // modo rolável: mostra todos e desativa botões
      produtos.forEach(card => { card.style.display = ''; });
      if (btnAntes)  btnAntes.disabled  = true;
      if (btnDepois) btnDepois.disabled = true;
      return;
    }

    const totalPaginas = Math.ceil(produtos.length / porPagina);
    if (pagina >= totalPaginas) pagina = totalPaginas - 1;

    const inicio = pagina * porPagina;
    const fim    = inicio + porPagina;

    produtos.forEach((card, i) => {
      card.style.display = (i >= inicio && i < fim) ? '' : 'none';
    });

    if (btnAntes)  btnAntes.disabled  = (pagina === 0);
    if (btnDepois) btnDepois.disabled = (pagina === totalPaginas - 1);
  }

  btnAntes?.addEventListener('click', () => { pagina = Math.max(0, pagina - 1); render(); });
  btnDepois?.addEventListener('click', () => { pagina = pagina + 1; render(); });

  window.addEventListener('resize', render);
  render();
});

// ====== ZOOM NO CLIQUE (sem modal) ======
document.addEventListener('DOMContentLoaded', () => {
  const visor = document.querySelector('.visor');
  const img = document.getElementById('foto-principal');

  if (!visor || !img) return;

  const SCALE = 2.5;          // nível de zoom (ajuste se quiser)
  let zoomed = false;

  function setOriginFromEvent(e) {
    const rect = visor.getBoundingClientRect();
    const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
    const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  }

  function activateZoom(e) {
    zoomed = true;
    visor.classList.add('is-zoomed');
    setOriginFromEvent(e);
    img.style.transform = `scale(${SCALE})`;
  }

  function deactivateZoom() {
    zoomed = false;
    visor.classList.remove('is-zoomed');
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
  }

  // Clique/tap: alterna o estado do zoom
  visor.addEventListener('click', (e) => {
    if (!zoomed) {
      activateZoom(e);
    } else {
      deactivateZoom();
    }
  });

  // Mouse move / touch move: move o ponto de zoom enquanto ativo
  function onMove(e) {
    if (!zoomed) return;
    setOriginFromEvent(e);
  }
  visor.addEventListener('mousemove', onMove, { passive: true });
  visor.addEventListener('touchmove', onMove, { passive: true });

  // Evita arrastar a imagem
  img.addEventListener('dragstart', (e) => e.preventDefault());

  // (Integração com thumbs) — se trocar a foto, reseta o zoom:
  const thumbs = document.querySelectorAll('.thumbs .thumb');
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      deactivateZoom();
      const full = btn.getAttribute('data-full') || btn.querySelector('img')?.src;
      if (full) img.src = full;
    });
  });
});