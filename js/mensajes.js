/* Página de Mensajes */
document.addEventListener('DOMContentLoaded', ()=>{
  const data = [
    { short:"1", text:"Te quiero mucho tefy" },
    { short:"2", text:"Eres de las personas mas marravillosas que conozco" },
    { short:"3", text:"Gracias por siempre estar ahi" },
    { short:"4", text:"Te mereces muchas cosas lindas :3" },
    { short:"5", text:"Recuerdas cuando te viste las series que te recomende?", modalTitle:"Recuerdas cuando", modalImg:"https://picsum.photos/400/220?random=11" },
    { short:"6", text:"Alessandro te manda un beso 💋" },
    { short:"🎁", text:"Espero que podamos ser amigos toda la vida", modalTitle:"Sorpresa", modalImg:"https://picsum.photos/400/220?random=22" }
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
      : 'ya puedes continuar <3';
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