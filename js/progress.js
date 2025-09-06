(() => {
  if (window.Progress) {
    // Ya estaba cargado, no volver a declararlo
    console.warn("[progress.js] Progress ya existe, se reutiliza.");
    return;
  }
  const STORAGE_KEY = 'birthdayProgress';
  function loadProgress(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        gatingDone:false,
        messagesDone:false,
        albumDone:false
      };
    } catch(e){
      console.warn("[progress.js] JSON corrupto. Reiniciando.", e);
      return {gatingDone:false,messagesDone:false,albumDone:false};
    }
  }
  //nose
  function saveProgress(p){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }
  function updateFlag(flag, value=true){
    const p = loadProgress();
    p[flag] = value;
    saveProgress(p);
    return p;
  }
  function allUnlocked(){
    const p = loadProgress();
    return p.messagesDone && p.albumDone;
  }
  window.Progress = {
    load:loadProgress,
    save:saveProgress,
    update:updateFlag,
    allUnlocked
  };
  console.log("[progress.js] Progress cargado.");
})();