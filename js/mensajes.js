/* Página de Mensajes */
document.addEventListener('DOMContentLoaded', ()=>{
  const data = [
    { short:"1", text:"Gracias por tu amistad incondicional 💗" },
    { short:"2", text:"Tu risa mejora cualquier día nublado." },
    { short:"3", text:"Eres fuerza y ternura en equilibrio." },
    { short:"4", text:"Nunca dejes de soñar ✨" },
    { short:"5", text:"Recuerdo especial aquí...", modalTitle:"Recuerdo #1", modalImg:"https://picsum.photos/400/220?random=11" },
    { short:"6", text:"Otra nota que atesoro 💕" },
    { short:"🎁", text:"Siempre estaré para ti.", modalTitle:"Sorpresa", modalImg:"https://picsum.photos/400/220?random=22" }
  ];
  const grid = document.getElementById('messages-grid');
  const counter = document.getElementById('messages-counter');
  let opened = 0;
  data.forEach((item,i)=>{
    const el = document.createElement('div');
    el.className='msg-box';
    el.innerHTML = `
      <div class="short">${item.short}</div>
      <div class="inner">${item.text}</div>`;
    el.addEventListener('click', ()=>{
      if(!el.classList.contains('open')){
        el.classList.add('open');
        opened++;
        updateCounter();
      }
      if(item.modalTitle || item.modalImg){
        openModal(item);
      }
    });
    grid.appendChild(el);
  });
  function updateCounter(){
    counter.textContent = opened < data.length
      ? `Has abierto ${opened}/${data.length} mensajes`
      : '¡Abriste todos! 🎉';
    if(opened === data.length){
      Progress.update('messagesDone', true);
    }
  }
  // Modal
  const modal = document.getElementById('msg-modal');
  const closeBtn = document.getElementById('msg-close');
  const msgTitle = document.getElementById('msg-title');
  const msgText = document.getElementById('msg-text');
  const msgImg = document.getElementById('msg-img');
  function openModal(item){
    msgTitle.textContent = item.modalTitle || 'Mensaje';
    msgText.textContent = item.text;
    if(item.modalImg){
      msgImg.src = item.modalImg;
      msgImg.style.display='block';
    } else {
      msgImg.style.display='none';
    }
    modal.classList.add('open');
  }
  closeBtn.onclick = ()=> modal.classList.remove('open');
  modal.onclick = e=>{ if(e.target === modal) modal.classList.remove('open'); };
  updateCounter();
});