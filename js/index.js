/* Maneja gating inicial y menú dinámico (versión con chequeos) */
document.addEventListener('DOMContentLoaded', () => {
  console.log("[index.js] DOMContentLoaded");

  if(!window.Progress){
    console.error("[index.js] Progress no está cargado.");
    return;
  }

  const progress = Progress.load();
  console.log("[index.js] Progreso cargado:", progress);

  const gatingEl     = document.getElementById('gating');
  const menuEl       = document.getElementById('menu');
  const gatingTextEl = document.getElementById('gating-text');
  const gatingBtn    = document.getElementById('gating-next');

  if(!gatingEl || !menuEl || !gatingTextEl || !gatingBtn){
    console.error("[index.js] Faltan elementos requeridos.",
      {gatingEl, menuEl, gatingTextEl, gatingBtn});
    return;
  }

  const gatingTexts = [
    "Hola Tefyyyyyyy, Queria regalarte algo bonito de cumpleaños",
    "Espero que te guste, me demore un buen tiempo haciendolo xd",
    "Y como estas? "
  ];

  let step = 0;

  function renderGating(){
    gatingTextEl.textContent = gatingTexts[step] || "(Texto no encontrado)";
    gatingBtn.textContent = (step === gatingTexts.length - 1) ? "Chao" : "Me caes mal";
    console.log("[index.js] Paso gating:", step);
  }

  function refreshMenuStatus(){
    const p = Progress.load();
    const mStatus   = document.getElementById('status-messages');
    const aStatus   = document.getElementById('status-album');
    const finalCard = document.getElementById('final-card');
    const finalHint = document.getElementById('final-hint');

    if(mStatus) mStatus.textContent = p.messagesDone ? "Yap" : "Pendiente";
    if(aStatus) aStatus.textContent = p.albumDone ? "Yap" : "Pendiente";

    // Evita listeners duplicados
    const clone = finalCard.cloneNode(true);
    finalCard.parentNode.replaceChild(clone, finalCard);

    if(p.messagesDone && p.albumDone){
      clone.classList.remove('locked');
      clone.innerHTML = `
        <div class="emoji">🎉</div>
        <div class="title">Final</div>
        <div class="desc">Ver mensaje</div>
        <div class="status">Desbloqueado ✓</div>`;
      clone.addEventListener('click', ()=> location.href='final.html');
      if(finalHint) finalHint.textContent = "Ya la tortica 🎂";
    } else {
      clone.classList.add('locked');
      clone.addEventListener('click', ()=> alert("Completa Mensajes y Álbum para desbloquear el final."));
    }
  }

  if(progress.gatingDone){
    gatingEl.classList.add('hidden');
    menuEl.classList.remove('hidden');
    refreshMenuStatus();
  } else {
    renderGating();
    gatingBtn.addEventListener('click', ()=>{
      step++;
      if(step >= gatingTexts.length){
        Progress.update('gatingDone', true);
        gatingEl.classList.add('hidden');
        menuEl.classList.remove('hidden');
        refreshMenuStatus();
      } else {
        renderGating();
      }
    });
  }
});
//??