/* Álbum – flip pages + música + marcar fin */
document.addEventListener('DOMContentLoaded', ()=>{
  // Coloca tus imágenes en /images/ y reemplaza las rutas.
  const pagesData = [
    { title:"Portada", text:"¡Feliz cumpleaños Tefy! Este álbum guarda recuerdos que valen oro.", img:"https://picsum.photos/520/150?random=1", song:0 },
    { title:"Recuerdo 1", text:"Aquí puedes escribir una anécdota real significativa.", img:"https://picsum.photos/520/150?random=2", song:1 },
    { title:"Recuerdo 2", text:"Otro momento: describe qué sentiste o por qué fue especial.", img:"https://picsum.photos/520/150?random=3", song:2 },
    { title:"Recuerdo 3", text:"Sigue añadiendo páginas duplicando objetos en este array.", img:"https://picsum.photos/520/150?random=4" },
    { title:"Final del Álbum", text:"Gracias por mirar cada página. Esto ayuda a desbloquear la sorpresa final.", img:"https://picsum.photos/520/150?random=5" }
  ];
  // Canciones (coloca tus archivos en /audio/). Ajusta titles y src.
  const songs = [
    { title:"Canción 1", src:"audio/01.mp3" },
    { title:"Canción 2", src:"audio/02.mp3" },
    { title:"Canción 3", src:"audio/03.mp3" }
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
          <img src="${p.img}" alt="">
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
    pageEls.forEach((p,i)=>{
      if(i < current){
        p.style.transform='rotateY(-180deg)';
      } else {
        p.style.transform='rotateY(0deg)';
      }
      // Si la página actual tiene song, se cambia
      if(i === current && pagesData[i].song != null){
        loadSong(pagesData[i].song);
      }
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pagesData.length;
    if(current === pagesData.length){
      Progress.update('albumDone', true);
    }
  }
  function updateIndicator(){
    const ind = document.getElementById('album-indicator');
    if(current < pagesData.length){
      ind.textContent = `Página ${current+1} de ${pagesData.length}`;
    } else {
      ind.textContent = 'Fin del Álbum 🎉';
    }
  }
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  nextBtn.addEventListener('click', ()=>{
    if(current < pagesData.length){ current++; updatePages(); updateIndicator(); }
  });
  prevBtn.addEventListener('click', ()=>{
    if(current > 0){ current--; updatePages(); updateIndicator(); }
  });

  // Audio controls
  const playToggle = document.getElementById('play-toggle');
  playToggle.addEventListener('click', ()=>{
    if(!songs.length) return;
    if(!isPlaying){
      audio.play().then(()=>{
        isPlaying = true;
        playToggle.textContent='⏸';
      }).catch(()=>{});
    } else {
      audio.pause();
      isPlaying = false;
      playToggle.textContent='▶';
    }
  });
  document.getElementById('next-song').addEventListener('click', ()=>{
    if(!songs.length) return;
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
  });

  createPages();
  if(songs.length){
    loadSong(0);
  } else {
    songTitle.textContent = "Sin música";
  }
});