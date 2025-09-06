/* Álbum – flip pages + música + marcar fin */
document.addEventListener('DOMContentLoaded', ()=>{
  const pagesData = [
    { title:"Cartelera", text:"Estos recuerdos siempre los atesoro en el fondo de mi corazón. Btw, te acuerdas de ese dia? KASJDASLDJASKL", img:"images/yoystefy.jpg", song:0 },
    { title:"XV De Danii", text:"nuestro primer quinceañero juntos, ñam, ese dia estabas super linda ( ignoremos que luego fuimos a tumar puertas )", img:"images/yoystefy2.jpg", song:1 },
    { title:"meow", text:"miau", img:"images/yoystefy3.jpg", song:2 },
    { title:"parecemos dos fetos", text:"Mentira, creo q este fue el primer quinceañero JSAKDJAJASLDAK, ya me estrese lo voy a dejar asi", img:"images/yoystefy4.jpg" },
    { title:"CUMPLEAÑERA PRECIOSAAAAAA", text:"Y esa guapa???????????????????????????????????????? por cierto, cada que escucho estas canciones me acuerdo de ti, por eso las escogi :3", img:"images/cumpleañera.jpg" }
  ];

  const songs = [
    { title:"Messages from the start", src:"music/01.mp3" },
    { title:"What can i do for you",  src:"music/02.mp3" },
    { title:"RATS",                   src:"music/03.mp3" }
  ];

  let currentSongIndex = 0;
  const audio = document.getElementById('audio');
  const songTitle = document.getElementById('song-title');
  function loadSong(i){
    if(!songs[i]) return;
    currentSongIndex = i;
    audio.src = songs[i].src;
    songTitle.textContent = songs[i].title;
    if(isPlaying) audio.play().catch(()=>{});
  }

  const book = document.getElementById('book');
  const pageEls = [];
  let current = 0;
  let isPlaying = false;

  function createPages(){
    pagesData.forEach((p,i)=>{
      const page = document.createElement('div');
      page.className='page';
      page.style.zIndex = (pagesData.length - i);
      page.innerHTML = `
        <div class="page-content">
          <div class="img-box">
            <img src="${p.img}" alt="${p.title}">
          </div>
          <h2>${p.title}</h2>
          <p>${p.text}</p>
        </div>`;
      book.appendChild(page);
      pageEls.push(page);
    });
    updatePages();
    updateIndicator();
  }

  function updatePages(){
    pageEls.forEach((pEl,i)=>{
      if(i < current){ pEl.style.transform='rotateY(-180deg)'; }
      else { pEl.style.transform='rotateY(0deg)'; }
      if(i === current && pagesData[i].song != null){ loadSong(pagesData[i].song); }
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pagesData.length;
    if(current === pagesData.length){ Progress.update('albumDone', true); }
  }

  function updateIndicator(){
    const ind = document.getElementById('album-indicator');
    ind.textContent = (current < pagesData.length)
      ? `Página ${current+1} de ${pagesData.length}`
      : 'Fin del Álbum 🎉';
  }

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  nextBtn.addEventListener('click', ()=>{ if(current < pagesData.length){ current++; updatePages(); updateIndicator(); }});
  prevBtn.addEventListener('click', ()=>{ if(current > 0){ current--; updatePages(); updateIndicator(); }});

  const playToggle = document.getElementById('play-toggle');
  playToggle.addEventListener('click', ()=>{
    if(!songs.length) return;
    if(!isPlaying){
      audio.play().then(()=>{ isPlaying = true; playToggle.textContent='⏸'; }).catch(()=>{});
    } else {
      audio.pause(); isPlaying = false; playToggle.textContent='▶';
    }
  });
  document.getElementById('next-song').addEventListener('click', ()=>{
    if(!songs.length) return;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
  });

  createPages();
  if(songs.length) loadSong(0); else songTitle.textContent = "Sin música";
});