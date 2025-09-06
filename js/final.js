/* Página Final con confetti básico */
document.addEventListener('DOMContentLoaded', ()=>{
  const p = Progress.load();
  if(!(p.messagesDone && p.albumDone)){
    // Si no está desbloqueado, redirigir
    location.href='index.html';
    return;
  }
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  const pieces = [];
  const COLORS = ['#ff5c8a','#ff94b8','#ffd2e2','#ffc9da','#ffffff'];
  function spawn(count=120){
    pieces.length = 0;
    for(let i=0;i<count;i++){
      pieces.push({
        x: Math.random()*w,
        y: Math.random()*h - h,
        r: (Math.random()*6)+4,
        c: COLORS[Math.floor(Math.random()*COLORS.length)],
        vy: (Math.random()*2)+2,
        vx: (Math.random()-0.5)*1.2,
        rot: Math.random()*360,
        vr: (Math.random()*6)-3
      });
    }
  }
  function update(){
    ctx.clearRect(0,0,w,h);
    pieces.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if(p.y > h+20) p.y = -20;
      drawPiece(p);
    });
    requestAnimationFrame(update);
  }
  function drawPiece(p){
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.4);
    ctx.restore();
  }
  spawn();
  update();
  document.getElementById('replay-confetti').addEventListener('click', ()=> spawn());
});

document.addEventListener('DOMContentLoaded', ()=>{
  const p = Progress.load();
  if(!(p.messagesDone && p.albumDone)){
    location.href='index.html'; return;
  }

  // Canvas confetti
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
  addEventListener('resize', resize); resize();

  const pieces = [];
  const COLORS = ['#ff5c8a','#ff94b8','#ffd2e2','#ffc9da','#ffffff'];
  function spawn(count=140){
    pieces.length = 0;
    for(let i=0;i<count;i++){
      pieces.push({
        x: Math.random()*w,
        y: Math.random()*h - h,
        r: (Math.random()*6)+4,
        c: COLORS[Math.floor(Math.random()*COLORS.length)],
        vy: (Math.random()*2)+2,
        vx: (Math.random()-0.5)*1.2,
        rot: Math.random()*360,
        vr: (Math.random()*6)-3
      });
    }
  }
  function drawPiece(p){
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.4);
    ctx.restore();
  }
  function update(){
    ctx.clearRect(0,0,w,h);
    for(const p of pieces){
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if(p.y > h+20){ p.y = -20; p.x = Math.random()*w; }
      drawPiece(p);
    }
    requestAnimationFrame(update);
  }
  spawn(); update();

  // Botón Pastel
  const cake = document.getElementById('cake');
  const btn  = document.getElementById('show-cake');
  let cakeVisible = false;

  btn.addEventListener('click', ()=>{
    cakeVisible = !cakeVisible;
    cake.classList.toggle('hidden', !cakeVisible);
    btn.textContent = cakeVisible ? 'chao tortica' : 'tortica 🎂';
    // Confetti cada vez que aparece el pastel
    if(cakeVisible) spawn();
  });
});
//??